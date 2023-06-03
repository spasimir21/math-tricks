import cellComponent from '../cell/cell.component';
import { GridController } from './grid.controller';
import { defineComponent } from '@uix';
import { gridView } from './grid.view';

const gridComponent = defineComponent({
  name: 'grid',
  controller: GridController,
  view: gridView,
  dependencies: [cellComponent]
});

export default gridComponent;
export { gridComponent };
