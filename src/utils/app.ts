// export const isKeyInObj = <T extends Record<string, any>>(obj: T, key: string): key is keyof T=> {
//   return Object.hasOwn(obj, key);
// };

export const isKeyInObj = <Obj extends object>(obj: Obj, key: PropertyKey): key is keyof Obj =>
  Object.hasOwn(obj, key);
