import { Controller, createRegistry, defineComponent, view } from '../uix';

const routerUixRegistry = createRegistry('router');

const routerFallbackComponent = defineComponent({
  name: 'fallback',
  controller: Controller,
  view: view('', () => [])
});

routerUixRegistry.components.register(routerFallbackComponent);
