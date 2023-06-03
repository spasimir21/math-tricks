import { Controller, ReactiveController } from '@uix';
import { Effect, State } from '@reactivity';

@ReactiveController
class PlayerNameInputsController extends Controller<
  { vsBot: boolean },
  { valid: boolean },
  { player1Name: string; player2Name: string }
> {
  @State
  nameInputValues: [string, string] = ['PLAYER 1', 'PLAYER 2'];

  override init() {
    this._exports.valid = true;
  }

  @Effect
  private updateInputValues() {
    this.nameInputValues[0] = this.shared.player1Name;
    this.nameInputValues[1] = this.shared.player2Name;
  }

  @Effect
  private update() {
    if (this.nameInputValues[0].trim().length === 0 || this.nameInputValues[1].trim().length === 0) {
      this._exports.valid = false;
      return;
    }

    this.shared.player1Name = this.nameInputValues[0];
    this.shared.player2Name = this.nameInputValues[1];
    this._exports.valid = true;
  }
}

export { PlayerNameInputsController };
