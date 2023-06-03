import { ScoresController } from './scores.controller';
import { scoresView } from './scores.view';
import { defineComponent } from '@uix';

const scoresComponent = defineComponent({
  name: 'scores',
  controller: ScoresController,
  view: scoresView
});

export default scoresComponent;
export { scoresComponent };
