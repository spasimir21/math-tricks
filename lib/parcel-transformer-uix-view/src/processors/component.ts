import { getElementViewId, getElementViewSelector } from '../elementViewId';
import { Node, HTMLElement } from 'node-html-parser';
import { HTML_ELEMENTS } from '../htmlElements';
import { ViewData } from '../view';

const $IS_COMPONENT = Symbol('$IS_COMPONENT');

function processComponent(element: Node, view: ViewData) {
  if (!(element instanceof HTMLElement) || element.tagName == null) return false;

  const tagName = element.tagName.toLowerCase();
  if (HTML_ELEMENTS.has(tagName) || tagName === 'component' || tagName === 'placeholder') return false;

  const viewId = getElementViewId(element);

  element.tagName = 'PLACEHOLDER';
  (element as any)[$IS_COMPONENT] = true;

  const tagNameParts = tagName.split(':');
  const registryName = tagNameParts.length === 1 ? null : tagNameParts.shift();
  const componentName = tagNameParts.join(':');

  view.instructions.push(
    `u.component(e, '${viewId}', $, '${componentName}'${registryName ? `, '${registryName}'` : ''})`
  );

  return false;
}

function processComponentInit(element: Node, view: ViewData) {
  if (!(element instanceof HTMLElement) || (element as any)[$IS_COMPONENT] !== true) return false;

  const viewSelector = getElementViewSelector(element);
  view.instructions.push(`u.initComponent(${viewSelector})`);

  return false;
}

export { processComponent, processComponentInit };
