import { View, ViewInstance, viewToElement } from '../view';
import { TrackStack, effect, reactive } from 'reactivity';
import { Fragment } from '../fragment/Fragment';
import { scope } from '../../helpers/scope';

function _forEach(
  placeholder: HTMLElement,
  data: any,
  iteratorKey: string,
  getValues: () => any[],
  entryView: View<any>,
  emptyView: View<any> | null
) {
  const emptyViewInstance = emptyView ? emptyView.instantiate(data) : null;
  const viewInstances: ViewInstance<any>[] = [];
  const fragment = new Fragment([]);

  const emptyViewElement = emptyViewInstance ? viewToElement(emptyViewInstance) : document.createComment('');

  let currentMounted = placeholder as ChildNode;

  const effectCleanup = effect(() => {
    const array = getValues();

    const lengthDelta = array.length - viewInstances.length;

    TrackStack.push();
    if (lengthDelta > 0) {
      for (let i = viewInstances.length; i < array.length; i++) {
        const viewInstance = entryView.instantiate(scope(reactive({ [iteratorKey]: array[i] }), data));
        fragment.appendChild(viewToElement(viewInstance));
        viewInstances.push(viewInstance);
      }
    } else if (lengthDelta < 0) {
      for (let i = 0; i > lengthDelta; i--) {
        fragment.removeChildAtIndex(fragment.nodes.length - 1);
        viewInstances[viewInstances.length - 1].cleanup();
        viewInstances.pop();
      }
    }
    TrackStack.pop();

    for (let i = 0; i < array.length; i++) viewInstances[i].data[iteratorKey] = array[i];

    const newMounted = array.length === 0 ? emptyViewElement : fragment;
    currentMounted.replaceWith(newMounted);
    currentMounted = newMounted;
  }).cleanup;

  return () => {
    effectCleanup();

    for (let i = 0; i < viewInstances.length; i++) fragment.removeChild(fragment.nodes[fragment.nodes.length - 1]);
    if (emptyViewInstance) emptyViewInstance.cleanup();
    for (const view of viewInstances) view.cleanup();
  };
}

export { _forEach };