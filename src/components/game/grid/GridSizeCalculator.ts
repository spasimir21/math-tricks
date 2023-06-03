import { Effect, Reactive, State, reactive } from '@reactivity';

interface GridSettings {
  width: number;
  height: number;
  cellGap: number;
  padding: number;
}

function getReactiveElementSize(element: HTMLElement) {
  const size = reactive({
    width: 0,
    height: 0
  });

  const resizeObserver = new ResizeObserver(([entry]) => {
    size.width = entry.contentRect.width;
    size.height = entry.contentRect.height;
  });

  resizeObserver.observe(element, { box: 'border-box' });

  return { size, cleanup: () => resizeObserver.disconnect() };
}

@Reactive
class GridSizeCalculator {
  @State
  containerWidth: number = 0;
  @State
  containerHeight: number = 0;
  @State
  cellSize: number = 0;

  private readonly reactiveSizeCleanup;
  private readonly elementSize;

  constructor(element: HTMLElement, public readonly gridSettings: GridSettings) {
    const reactiveSize = getReactiveElementSize(element);
    this.reactiveSizeCleanup = reactiveSize.cleanup;
    this.elementSize = reactiveSize.size;
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

  cleanup() {
    this.reactiveSizeCleanup();
  }
}

export { GridSettings, GridSizeCalculator };
