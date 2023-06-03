import { StylesheetType, defineStylesheet } from '@uix';

const menuStylesheet = defineStylesheet({
  id: 'menu',
  type: StylesheetType.Code,
  // @ts-ignore
  code: () => import('bundle-text:./menu.style.scss')
});

export { menuStylesheet };
