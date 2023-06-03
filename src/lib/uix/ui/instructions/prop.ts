import { UixComponent } from '../component/Component';
import { effect } from '../../../reactivity';

function prop<T>(uixComponent: UixComponent, prop: string, getter: () => T) {
  return effect(() => {
    uixComponent.props[prop] = getter();
  }).cleanup;
}

export { prop };
