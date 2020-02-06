
/**
 * I can't think of any other way to add key value pair to object
 * this is stright out of typescript doc
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#example-1
 * 
 * @param obj 
 * @param key 
 * @param value 
 */
export function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
  obj[key] = value;
}
