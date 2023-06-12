import { Node } from 'node-html-parser';

const $IS_REMOVED = Symbol('$IS_REMOVED');

function markRemoved(object: any) {
  object[$IS_REMOVED] = true;
}

function isRemoved(object: any) {
  return object[$IS_REMOVED] === true;
}

function processRemoved(node: Node) {
  return isRemoved(node);
}

export { markRemoved, isRemoved, processRemoved };
