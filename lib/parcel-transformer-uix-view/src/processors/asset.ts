import { Node, HTMLElement } from 'node-html-parser';
import { ViewModuleData } from '../module';
import { ViewData } from '../view';
import { id } from '../id';

function processAsset(element: Node, view: ViewData, viewModule: ViewModuleData) {
  if (!(element instanceof HTMLElement) || element.tagName !== 'ASSET') return false;

  const assetId = id();

  viewModule.inserts.push(`import ${assetId} from '${element.getAttribute('src')}';`);

  view.instructions.push(`void ($['${element.getAttribute('name')}'] = ${assetId})`);

  element.remove();
  return true;
}

export { processAsset };
