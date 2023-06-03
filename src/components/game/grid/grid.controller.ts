import { GridSettings, GridSizeCalculator } from './GridSizeCalculator';
import { Controller, ReactiveController } from '@uix';
import { Effect, reactive } from '@reactivity';

const PADDING = 10;
const CELL_GAP = 1;

@ReactiveController
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

    this.sizeCalculator = new GridSizeCalculator(this.context.gridContainer, this.gridSettings);
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

  override onKill() {
    this.sizeCalculator.cleanup();
  }
}

export { GridController };
