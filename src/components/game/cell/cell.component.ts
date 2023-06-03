import { CellController } from './cell.controller';
import { defineComponent } from '@uix';
import { cellView } from './cell.view';

const cellComponent = defineComponent({
  name: 'cell',
  controller: CellController,
  view: cellView
});

export default cellComponent;
export { cellComponent };
