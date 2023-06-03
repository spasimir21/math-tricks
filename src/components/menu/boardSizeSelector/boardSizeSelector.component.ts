import { BoardSizeSelectorController } from './boardSizeSelector.controller';
import { boardSizeSelectorView } from './boardSizeSelector.view';
import { defineComponent } from '@uix';

const boardSizeSelectorComponent = defineComponent({
  name: 'board-size-selector',
  controller: BoardSizeSelectorController,
  view: boardSizeSelectorView
});

export default boardSizeSelectorComponent;
export { boardSizeSelectorComponent };
