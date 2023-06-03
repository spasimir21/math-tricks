function context(object: any, prevContext: any) {
  return new Proxy(object, {
    get(_, prop) {
      if (Reflect.has(object, prop)) return Reflect.get(object, prop);
      return Reflect.get(prevContext, prop);
    },
    set(_, prop, newValue) {
      return Reflect.set(object, prop, newValue);
    },
    has(_, prop) {
      return Reflect.has(object, prop) || Reflect.has(prevContext, prop);
    },
    ownKeys(_) {
      return Array.from(new Set([...Reflect.ownKeys(object), ...Reflect.ownKeys(prevContext)]));
    },
    deleteProperty(_, prop) {
      return Reflect.deleteProperty(object, prop);
    }
  });
}

export { context };
