import botDifficultySelectorComponent from '../../components/menu/botDifficultySelector/botDifficultySelector.component';
import boardSizeSelectorComponent from '../../components/menu/boardSizeSelector/boardSizeSelector.component';
import playerNameInputsComponent from '../../components/menu/playerNameInputs/playerNameInputs.component';
import botToggleComponent from 'components/menu/botToggle/botToggle.component';
import scoresComponent from 'components/menu/scores/scores.component';
import { MenuController } from './menu.controller';
import { menuStylesheet } from './menu.style';
import { defineComponent } from '@uix';
import { menuView } from './menu.view';

const menuComponent = defineComponent({
  name: 'menu',
  controller: MenuController,
  view: menuView,
  stylesheets: [menuStylesheet],
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
