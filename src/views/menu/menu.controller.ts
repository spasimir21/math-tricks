import { GameSaveData, $globalGameSave } from '../../save';
import { Controller, ReactiveController } from '@uix';
import { deepClone } from '../../helpers/deepClone';
import { Computed, State } from '@reactivity';
import { Router } from '@router';

@ReactiveController
class MenuController extends Controller {
  @State
  gameSaveData: GameSaveData = null as any;
  @State
  isBoardSizeValid: boolean = true;
  @State
  arePlayerNamesValid: boolean = true;

  override init() {
    this.gameSaveData = deepClone($globalGameSave.data);
    this.gameSaveData.scores = $globalGameSave.data.scores; // Saves any update to the score immediately for UX
  }

  @Computed
  get valid(): boolean {
    return this.isBoardSizeValid && this.arePlayerNamesValid;
  }

  toggleBotSelector() {
    this.gameSaveData.vsBot = !this.gameSaveData.vsBot;
  }

  play() {
    if (!this.valid) return;
    $globalGameSave.data = this.gameSaveData;
    (this.context.router as Router).goto({ route: 'game' });
  }
}

export { MenuController };
