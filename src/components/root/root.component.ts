import { registerDependency } from 'reactivity';
import defineComponent from './root.view.html';
import { createRouter } from '../../router';
import { Controller } from 'uix';
import { Router } from 'router';

class RootController extends Controller {
  router: Router = null as any;

  protected override init() {
    this.router = registerDependency(this, createRouter(this.component.registry));
  }
}

const rootComponent = defineComponent({
  name: 'root',
  controller: RootController
});

export default rootComponent;
export { rootComponent };
