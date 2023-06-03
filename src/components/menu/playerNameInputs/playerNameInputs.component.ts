import { PlayerNameInputsController } from './playerNameInputs.controller';
import { playerNameInputsView } from './playerNameInputs.view';
import { defineComponent } from '@uix';

const playerNameInputsComponent = defineComponent({
  name: 'player-name-inputs',
  controller: PlayerNameInputsController,
  view: playerNameInputsView
});

export default playerNameInputsComponent;
export { playerNameInputsComponent };
