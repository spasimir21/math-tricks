import defineComponent from './botDifficultySelector.view.html';
import { Computed, Effect, State } from '@uixjs/reactivity';
import { Controller } from '@uixjs/core';

class BotDifficultySelectorController extends Controller<{ cells: number }, {}, { difficulty: number }> {
  @State
  difficultyInputValue: string = '1';

  @Computed
  get maxDifficulty(): number {
    return this.props.cells <= 100 ? 4 : this.props.cells <= 250 ? 3 : this.props.cells <= 500 ? 2 : 1;
  }

  @Effect
  private ensureMaxDifficulty() {
    if (this.shared.difficulty > this.maxDifficulty) this.shared.difficulty = this.maxDifficulty;
  }

  @Effect
  private updateInputValues() {
    this.difficultyInputValue = this.shared.difficulty.toString();
  }

  @Effect
  private update() {
    this.shared.difficulty = parseInt(this.difficultyInputValue);
  }
}

const botDifficultySelectorComponent = defineComponent({
  name: 'bot-difficulty-selector',
  controller: BotDifficultySelectorController
});

export default botDifficultySelectorComponent;
export { botDifficultySelectorComponent };
