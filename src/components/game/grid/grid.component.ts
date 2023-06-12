import { GridSettings, GridSizeCalculator } from './GridSizeCalculator';
import { Effect, reactive, registerDependency } from 'reactivity';
import { cellComponent } from '../cell/cell.component';
import defineComponent from './grid.view.html';
import { Controller } from 'uix';

const PADDING = 10;
const CELL_GAP = 1;

class GridController extends Controller {
  private sizeCalculator: GridSizeCalculator = null as any;
  gridSettings: GridSettings = null as any;

  override init() {
    this.gridSettings = reactive({
      width: this.context.gameInfo.size[0],
      height: this.context.gameInfo.size[1],
      cellGap: CELL_GAP,
      padding: PADDING
    });

    this.sizeCalculator = registerDependency(
      this,
      new GridSizeCalculator(this.context.gridContainer, this.gridSettings)
    );
  }

  @Effect
  updateGridSettings() {
    this.gridSettings.width = this.context.gameInfo.size[0];
    this.gridSettings.height = this.context.gameInfo.size[1];
  }

  @Effect
  updateCSSVariables() {
    const root = document.querySelector(':root') as HTMLElement;
    root.style.setProperty('--cell-gap', `${this.gridSettings.cellGap}px`);

    root.style.setProperty('--grid-width', `${this.sizeCalculator.containerWidth}px`);
    root.style.setProperty('--grid-height', `${this.sizeCalculator.containerHeight}px`);
    root.style.setProperty('--cell-size', `${this.sizeCalculator.cellSize}px`);
  }
}

const gridComponent = defineComponent({
  name: 'grid',
  controller: GridController,
  dependencies: [cellComponent]
});

export default gridComponent;
export { gridComponent };
