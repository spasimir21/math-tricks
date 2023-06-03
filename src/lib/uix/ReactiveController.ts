import { applyDecorations, markReactive, setRaw } from '@reactivity';

function ReactiveController<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      markReactive(this);
      setRaw(this, this);
    }

    $init() {
      // @ts-ignore
      super.$init();
      applyDecorations(this);
    }
  };
}

export { ReactiveController };
