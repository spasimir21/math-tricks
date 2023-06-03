import { BotToggleController } from './botToggle.controller';
import { botToggleView } from './botToggle.view';
import { defineComponent } from '@uix';

const botToggleComponent = defineComponent({
  name: 'bot-toggle',
  controller: BotToggleController,
  view: botToggleView
});

export default botToggleComponent;
export { botToggleComponent };
