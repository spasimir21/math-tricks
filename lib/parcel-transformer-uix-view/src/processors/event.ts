import { getElementViewSelector } from '../elementViewId';
import { Node, HTMLElement } from 'node-html-parser';
import { ViewData } from '../view';

function processEvents(element: Node, view: ViewData) {
  if (!(element instanceof HTMLElement)) return false;

  const attribsToBeProcessed = Object.keys(element.attributes).filter(attrib => attrib.startsWith('@'));
  if (attribsToBeProcessed.length === 0) return false;

  const viewSelector = getElementViewSelector(element);

  for (const attribName of attribsToBeProcessed) {
    let attribNameParts = attribName.split(':');

    let eventName = attribNameParts[0].slice(1);
    const preventDefault = eventName.endsWith('#');
    if (preventDefault) eventName = eventName.slice(0, -1);

    const eventProps = new Set(attribNameParts.slice(1));
    const once = eventProps.has('once');

    const code = element.getAttribute(attribName);

    const callbackCode = preventDefault ? `{e.preventDefault();${code}}` : `(${code})`;

    view.instructions.push(`u._event(${viewSelector}, '${eventName}', e => ${callbackCode}, { once: ${once} })`);

    element.removeAttribute(attribName);
  }

  return false;
}

export { processEvents };
