import { StylesheetType, defineStylesheet } from '@uix';

const gameStylesheet = defineStylesheet({
  id: 'game',
  type: StylesheetType.Code,
  // @ts-ignore
  code: () => import('bundle-text:./game.style.scss')
});

export { gameStylesheet };
