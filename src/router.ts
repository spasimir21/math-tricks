import { Router } from 'router';
import { Registry } from 'uix';

function createRouter(registry: Registry) {
  return new Router([
    {
      name: 'menu',
      path: '/',
      component: { component: 'menu', registry }
    },
    {
      name: 'game',
      path: '/game',
      component: { component: 'game', registry }
    }
  ]);
}

export { createRouter };
