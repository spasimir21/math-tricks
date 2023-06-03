// TODO: Add more options: once, preventDefault...
function _event(element: HTMLElement, eventType: string, callback: () => void) {
  element.addEventListener(eventType, callback);
}

export { _event };
