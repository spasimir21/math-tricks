import { _event, placeholder, textContent, view } from '@uix';
import { BotToggleController } from './botToggle.controller';

const botToggleView = view<BotToggleController>(
  `
  <p class='button' $='botSelectButton'>PLAYER VS <placeholder $='botSelectText'></placeholder></p>
`,
  (elements, $) => [
    placeholder(elements, 'botSelectText', document.createTextNode('') as any),
    textContent(elements['botSelectText'], () => ($.shared.vsBot ? 'BOT' : 'PLAYER')),
    _event(elements['botSelectButton'], 'click', () => $.toggle())
  ]
);

export { botToggleView };
