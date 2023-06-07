import { _event, attribute, view, textContent } from '@uix';
import { CellController } from './cell.controller';

const cellView = view<CellController>(
  `
  <p class='debug' $='debugText'></p>
  <p $='text'></p>
`,
  (elements, $) => [
    textContent(elements['text'], () => $.cellText),
    textContent(elements['debugText'], () => $.debugText),
    attribute($.component, 'class', () => $.classes.join(' ')),
    _event($.component, 'click', () => $.play())
  ]
);

export { cellView };
