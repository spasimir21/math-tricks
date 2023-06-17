import defineComponent from './boardSizeSelector.view.html';
import { Effect, State } from '@uixjs/reactivity';
import { Controller } from '@uixjs/core';

class BoardSizeSelectorController extends Controller<{}, { valid: boolean }, { width: number; height: number }> {
  @State
  sizeInputValues: [string, string] = ['0', '0'];

  override init() {
    this._exports.valid = true;
  }

  @Effect
  private updateInputValues() {
    this.sizeInputValues[0] = this.shared.width.toString();
    this.sizeInputValues[1] = this.shared.height.toString();
  }

  @Effect
  private update() {
    this.sizeInputValues[0] = this.sizeInputValues[0].slice(0, 2);
    this.sizeInputValues[1] = this.sizeInputValues[1].slice(0, 2);

    if (this.sizeInputValues[0].match(/^\d{1,2}$/) == null || this.sizeInputValues[1].match(/^\d{1,2}$/) == null) {
      this._exports.valid = false;
      return;
    }

    const boardWidth = parseInt(this.sizeInputValues[0]);
    const boardHeight = parseInt(this.sizeInputValues[1]);

    if (
      isNaN(boardWidth) ||
      isNaN(boardHeight) ||
      boardWidth < 4 ||
      boardWidth > 20 ||
      boardHeight < 4 ||
      boardHeight > 20
    ) {
      this._exports.valid = false;
      return;
    }

    this.shared.width = boardWidth;
    this.shared.height = boardHeight;
    this._exports.valid = true;
  }
}

const boardSizeSelectorComponent = defineComponent({
  name: 'board-size-selector',
  controller: BoardSizeSelectorController
});

export default boardSizeSelectorComponent;
export { boardSizeSelectorComponent };
