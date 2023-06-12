import { cancelTemplateString } from './cancelTemplateString';
import { HTMLElement } from 'node-html-parser';

interface ViewData {
  name: string;
  element: HTMLElement;
  instructions: string[];
}

function createView(name: string, element: HTMLElement): ViewData {
  return { name, element, instructions: [] };
}

function compileView(view: ViewData) {
  // prettier-ignore
  return `const ${view.name}View = u.view(\`${cancelTemplateString(view.element.outerHTML)}\`, (e, $) => [${view.instructions.join(',')}]);`;
}

export { compileView, createView, ViewData };
