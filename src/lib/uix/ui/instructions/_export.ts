import { UixComponent } from '../component/Component';
import { effect } from '../../../reactivity';

function _export<T>(uixComponent: UixComponent, _exportName: string, setter: (value: T) => void) {
  return effect(() => {
    if (!uixComponent.isInitialized || uixComponent.isKilled) return;
    setter(uixComponent._exports[_exportName]);
  }).cleanup;
}

export { _export };
