import defineComponent from './botToggle.view.html';
import { Controller } from '@uixjs/core';

class BotToggleController extends Controller<{}, {}, { vsBot: boolean }> {
  toggle() {
    this.shared.vsBot = !this.shared.vsBot;
  }
}

const botToggleComponent = defineComponent({
  name: 'bot-toggle',
  controller: BotToggleController
});

export default botToggleComponent;
export { botToggleComponent };
