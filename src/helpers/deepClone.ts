function deepClone<T>(object: T): T {
  if (object == null || typeof object !== 'object') return object;

  if (Array.isArray(object)) {
    const clone = new Array(object.length) as any[];
    for (let i = 0; i < object.length; i++) clone[i] = deepClone(object[i]);
    return clone as T;
  }

  const clone = {} as any;
  for (const key in object) clone[key] = deepClone(object[key]);
  return clone as T;
}

export { deepClone };
