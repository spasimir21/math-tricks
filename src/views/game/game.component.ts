import gridComponent from 'components/game/grid/grid.component';
import { GameController } from './game.controller';
import { gameStylesheet } from './game.style';
import { defineComponent } from '@uix';
import { gameView } from './game.view';

const gameComponent = defineComponent({
  name: 'game',
  controller: GameController,
  view: gameView,
  stylesheets: [gameStylesheet],
  dependencies: [gridComponent]
});

export default gameComponent;
export { gameComponent };
