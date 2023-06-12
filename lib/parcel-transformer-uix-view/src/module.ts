import { StylesheetData, compileStylesheet } from './stylesheet';
import { ViewData, compileView } from './view';

interface ViewModuleData {
  inserts: string[];
  views: ViewData[];
  stylesheets: StylesheetData[];
}

function createViewModule(): ViewModuleData {
  return { inserts: [], views: [], stylesheets: [] };
}

function compileViewModule(viewModule: ViewModuleData) {
  // prettier-ignore
  const dataCode = `{ view: rootView, stylesheets: [${viewModule.stylesheets.map(s => s.id + 'Stylesheet').join(',')}] }`;

  // prettier-ignore
  return "import { range } from 'uix';\nimport * as u from 'uix';\n" +
          viewModule.inserts.join('\n') + '\n' +
          viewModule.views.map(compileView).join('\n') + '\n' +
          viewModule.stylesheets.map(compileStylesheet).join('\n') + '\n' +
          `const data = ${dataCode};\n` +
          'const defineComponent = info => u.defineComponent({ ...info, ...data });\n' +
          'export default defineComponent;\n' +
          'export { defineComponent };\n';
}

export { ViewModuleData, createViewModule, compileViewModule };
