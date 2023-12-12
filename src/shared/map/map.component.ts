import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { Feature, Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Offer } from '../../types/api';
import { CombinedReducers } from '../../store';
import { Store } from '@ngrx/store';
import { offersReducerSelector } from '../../store/offers/offers.selectors';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import VectorSource from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import PointerInteraction from 'ol/interaction/Pointer.js';
import { filter, map, mergeAll, Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit, OnDestroy {
  map: Map | null = null;
  offers: Offer[] = [];
  destroyer$ = new Subject<any>();
  vectorSource!: VectorSource<Feature<Point>>;
  pointsLayer!: LayerVector<VectorSource<Feature<Point>>>;
  points: Feature<Point>[] = [];
  city$: Observable<string> = this.route.params.pipe(map((param) => param['city'] || 'paris'));

  constructor(
    private zone: NgZone,
    private store: Store<CombinedReducers>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnDestroy() {
    this.destroyer$.next({});
    this.destroyer$.complete();
    this.map?.dispose();
  }

  private initMap() {
    this.zone.runOutsideAngular(() => {
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
      });
    });
  }

  private createPoints() {
    this.points = this.offers.map(offer => {
      const point = new Feature({
        geometry: new Point(fromLonLat([offer.location.longitude, offer.location.latitude])),
      });

      point.setStyle(new Style({
        image: new Icon({
          src: 'assets/img/pin.svg',
        }),

      }));
      point.setId(offer.id);

      return point;
    });
  }

  private createSource() {
    this.vectorSource = new VectorSource({
      features: this.points,
    });
  }

  private createLayer() {
    this.pointsLayer = new LayerVector({
      source: this.vectorSource,
    });
  }

  private setListeners() {
    if (!this.map) {
      return;
    }

    this.map.getViewport().addEventListener('click', (e) => {
      this.map?.forEachFeatureAtPixel(this.map?.getEventPixel(e), (feature) => {
        void this.router.navigate(['/offer', feature.getId()]);
      });
    });

    this.map.addInteraction(new PointerInteraction({
      handleMoveEvent: (e) => {
        if (!this.map) {
          return;
        }

        const hit = this.map.hasFeatureAtPixel(e.pixel);
        this.map.getViewport().style.cursor = hit ? 'pointer' : '';

        if (!hit) {
          this.vectorSource.forEachFeature((f) => {
            f.setStyle(new Style({
              image: new Icon({
                src: 'assets/img/pin.svg',
              }),
            }));
          });
        }

        this.map?.forEachFeatureAtPixel(e.pixel, (feature) => {
          const id = feature.getId();
          const f = this.vectorSource.getFeatureById(id as number);

          if (f instanceof Feature) {
            f.setStyle(new Style({
              image: new Icon({
                src: 'assets/img/pin-active.svg',
              }),
            }));
          }
        });
      },
    }));
  }

  ngAfterViewInit() {
    this.initMap();

    this.city$.pipe(
      map((city) => this.store.select(offersReducerSelector.selectOffers)
        .pipe(takeUntil(this.destroyer$))
        .pipe(filter((offers) => !!offers.length))
        .pipe(map((offers) => offers.filter(offer => offer.city.name.toLowerCase() === city.toLowerCase()))),
      ),
      mergeAll(),
    )
      .subscribe((offers) => {
        this.offers = offers;
        this.createPoints();
        this.createSource();
        this.createLayer();
        this.setListeners();

        this.map?.addLayer(this.pointsLayer);
        this.map?.setView(new View({
          center: fromLonLat([offers[0].location.longitude, offers[0].location.latitude]),
          zoom: 12,
        }));
      });
  }
}
