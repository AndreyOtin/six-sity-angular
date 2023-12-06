export const API_BASE_URL = 'https://12.react.pages.academy/six-cities';
export const SORT_TYPE = ['popular', 'low-price', 'high-price', 'top-rated'] as const;
export const CITIES = ['paris', 'cologne', 'brussels', 'amsterdam', 'hamburg', 'dusseldorf']
export const sortTypeToName: Record<typeof SORT_TYPE[number], string> = {
  'high-price': 'Price: high to low',
  'top-rated': 'Top rated first',
  'low-price': 'Price: low to high',
  'popular': 'Popular',
};
