import { effect } from '../../../reactivity';

function bindValue(element: HTMLInputElement, delayed: boolean, getter: () => string, setter: (value: string) => void) {
  element.addEventListener(delayed ? 'change' : 'input', () => setter(element.value));

  return effect(() => {
    element.value = getter();
  }).cleanup;
}

export { bindValue };
