const path = require('path');
const fs = require('fs');

function camelCaseToKebab(name) {
  return name
    .split(/(?=[A-Z])/)
    .map(part => part.toLowerCase())
    .join('-');
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const componentName = process.argv[2];
const componentDir = path.join(process.argv[3], componentName);
const hasStyle = process.argv[4] === '--style';

fs.mkdirSync(componentDir, { recursive: true });

fs.writeFileSync(
  path.join(componentDir, `${componentName}.controller.ts`),
  `import { Controller } from '@uix';

class ${capitalize(componentName)}Controller extends Controller {
}

export { ${capitalize(componentName)}Controller };
`
);

fs.writeFileSync(
  path.join(componentDir, `${componentName}.view.ts`),
  `import { ${capitalize(componentName)}Controller } from './${componentName}.controller';
import { view } from '@uix';
  
const ${componentName}View = view<${capitalize(componentName)}Controller>(
  \`
\`,
  (elements, $) => []
);
  
export { ${componentName}View };  
`
);

fs.writeFileSync(
  path.join(componentDir, `${componentName}.component.ts`),
  `import { ${capitalize(componentName)}Controller } from './${componentName}.controller';
${hasStyle ? `import { ${componentName}Stylesheet } from './${componentName}.style';` : ''}
import { ${componentName}View } from './${componentName}.view';
import { defineComponent } from '@uix';
  
const ${componentName}Component = defineComponent({
  name: '${camelCaseToKebab(componentName)}',
  controller: ${capitalize(componentName)}Controller,
  view: ${componentName}View,
  ${hasStyle ? `stylesheets: [${componentName}Stylesheet]` : ''}
});
  
export default ${componentName}Component;
export { ${componentName}Component }; 
`
);

if (hasStyle) {
  fs.writeFileSync(path.join(componentDir, `${componentName}.style.scss`), '');
  fs.writeFileSync(
    path.join(componentDir, `${componentName}.style.ts`),
    `import { StylesheetType, defineStylesheet } from '@uix';

const ${componentName}Stylesheet = defineStylesheet({
  id: '${camelCaseToKebab(componentName)}',
  type: StylesheetType.Code,
  // @ts-ignore
  code: () => import('bundle-text:./${componentName}.style.scss')
});
  
export { ${componentName}Stylesheet };
`
  );
}
