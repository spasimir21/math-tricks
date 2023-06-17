import rootComponent from './components/root/root.component';
import { startFaviconSwitching } from './favicon';
import { createRegistry } from 'uix';
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

mathTricksRegistry.components.register(rootComponent);

window.addEventListener('DOMContentLoaded', () => {
  startFaviconSwitching(FAVICON_CYCLE * 1000);
});
