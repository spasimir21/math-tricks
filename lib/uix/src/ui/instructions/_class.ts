import { effect } from 'reactivity';

function _class(element: HTMLElement, _class: string, predicate: () => boolean) {
  return effect(() => {
    if (predicate()) {
      element.classList.add(_class);
    } else {
      element.classList.remove(_class);
    }
  }).cleanup;
}

export { _class };
