import { effect } from 'reactivity';

function attribute(element: HTMLElement, attribute: string, getter: () => string) {
  return effect(() => {
    element.setAttribute(attribute, getter());
  }).cleanup;
}

export { attribute };
