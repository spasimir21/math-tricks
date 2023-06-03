import { startFaviconSwitching } from './favicon';
import { createRegistry } from '@uix';
import { Router } from '@router';
import './cellEncoding';

const FAVICON_CYCLE = 10;

const mathTricksRegistry = createRegistry('mt');

mathTricksRegistry.components.register({
  name: 'menu',
  load: () => import('./views/menu/menu.component')
});

mathTricksRegistry.components.register({
  name: 'game',
  load: () => import('./views/game/game.component')
});

const router = new Router([
  {
    name: 'menu',
    path: '/',
    component: { component: 'menu', registry: mathTricksRegistry }
  },
  {
    name: 'game',
    path: '/game',
    component: { component: 'game', registry: mathTricksRegistry }
  }
]);

window.addEventListener('DOMContentLoaded', () => {
  startFaviconSwitching(FAVICON_CYCLE * 1000);
  router.bindTo(document.querySelector('#router-view') as HTMLDivElement);
});
