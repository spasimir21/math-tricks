import botDifficultySelectorComponent from '../../components/menu/botDifficultySelector/botDifficultySelector.component';
import boardSizeSelectorComponent from '../../components/menu/boardSizeSelector/boardSizeSelector.component';
import playerNameInputsComponent from '../../components/menu/playerNameInputs/playerNameInputs.component';
import botToggleComponent from '../../components/menu/botToggle/botToggle.component';
import scoresComponent from '../../components/menu/scores/scores.component';
import { GameSaveData, $globalGameSave } from '../../save';
import { deepClone } from '../../helpers/deepClone';
import defineComponent from './menu.view.html';
import { Computed, State } from 'reactivity';
import { getRouter } from 'router';
import { Controller } from 'uix';

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
    getRouter(this.context).goto({ route: 'game' });
  }
}

const menuComponent = defineComponent({
  name: 'menu',
  controller: MenuController,
  dependencies: [
    botToggleComponent,
    boardSizeSelectorComponent,
    scoresComponent,
    botDifficultySelectorComponent,
    playerNameInputsComponent
  ]
});

export default menuComponent;
export { menuComponent };
