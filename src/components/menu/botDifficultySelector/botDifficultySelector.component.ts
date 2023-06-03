import { BotDifficultySelectorController } from './botDifficultySelector.controller';
import { botDifficultySelectorView } from './botDifficultySelector.view';
import { defineComponent } from '@uix';

const botDifficultySelectorComponent = defineComponent({
  name: 'bot-difficulty-selector',
  controller: BotDifficultySelectorController,
  view: botDifficultySelectorView
});

export default botDifficultySelectorComponent;
export { botDifficultySelectorComponent };
