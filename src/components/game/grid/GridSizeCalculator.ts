import { Effect, Reactive, ReactiveDependency, State, reactive, registerDependency } from '@uixjs/reactivity';

interface GridSettings {
  width: number;
  height: number;
  cellGap: number;
  padding: number;
}

function getReactiveElementSize(element: HTMLElement): ReactiveDependency<{ width: number; height: number }> {
  const size = reactive({
    width: 0,
    height: 0
  });

  const resizeObserver = new ResizeObserver(([entry]) => {
    if (entry == null) return;
    size.width = entry.contentRect.width;
    size.height = entry.contentRect.height;
  });

  resizeObserver.observe(element, { box: 'border-box' });

  return {
    dependency: size,
    cleanup: () => resizeObserver.disconnect()
  };
}

@Reactive
class GridSizeCalculator {
  @State
  containerWidth: number = 0;
  @State
  containerHeight: number = 0;
  @State
  cellSize: number = 0;

  private readonly elementSize;

  constructor(element: HTMLElement, public readonly gridSettings: GridSettings) {
    this.elementSize = registerDependency(this, getReactiveElementSize(element));
  }

  @Effect
  private calculateSizes() {
    const canvasAspectRatio = this.elementSize.width / this.elementSize.height;
    const gridAspectRatio = this.gridSettings.width / this.gridSettings.height;

    const isHeightLeading = canvasAspectRatio > gridAspectRatio;
    const maxWidth = this.elementSize.width - this.gridSettings.padding * 2;
    const maxHeight = this.elementSize.height - this.gridSettings.padding * 2;

    const width = isHeightLeading ? Math.floor(gridAspectRatio * maxHeight) : maxWidth;

    this.cellSize = Math.floor(
      (width - this.gridSettings.cellGap) / this.gridSettings.width - this.gridSettings.cellGap
    );

    this.containerWidth =
      this.gridSettings.cellGap + (this.cellSize + this.gridSettings.cellGap) * this.gridSettings.width;
    this.containerHeight =
      this.gridSettings.cellGap + (this.cellSize + this.gridSettings.cellGap) * this.gridSettings.height;
  }
}

export { GridSettings, GridSizeCalculator };
