import { cancelTemplateString } from './cancelTemplateString';

enum StylesheetType {
  Link,
  Code
}

interface LinkedStylesheetData {
  id: string;
  type: StylesheetType.Link;
  href: string;
}

interface CodeStylesheetData {
  id: string;
  type: StylesheetType.Code;
  code: string;
}

type StylesheetData = LinkedStylesheetData | CodeStylesheetData;

function compileStylesheet(stylesheet: StylesheetData) {
  if (stylesheet.type === StylesheetType.Link)
    return `import ${stylesheet.id}Stylesheet from 'uix-stylesheet:${stylesheet.href}';`;

  // prettier-ignore
  const stylesheetDataCode = `{ id: '${stylesheet.id}', type: u.StylesheetType.Code, code: async () => \`${cancelTemplateString(stylesheet.code)}\` }`;
  return `const ${stylesheet.id}Stylesheet = u.defineStylesheet(${stylesheetDataCode});`;
}

export { StylesheetData, StylesheetType, compileStylesheet };
