import { applyDecorations, cleanupDecorations } from './decorations';
import { markReactive, setRaw } from '../flags';

function Reactive<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      markReactive(this);
      setRaw(this, this);

      applyDecorations(this);
    }

    cleanup() {
      // @ts-ignore
      if (super.cleanup != null) super.cleanup();
      cleanupDecorations(this);
    }
  };
}

export { Reactive };
