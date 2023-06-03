import { _event, attribute, view, textContent } from '@uix';
import { CellController } from './cell.controller';

const cellView = view<CellController>(
  `
  <p $='text'></p>
`,
  (elements, $) => [
    textContent(elements['text'], () => $.cellText),
    attribute($.component, 'class', () => $.classes.join(' ')),
    _event($.component, 'click', () => $.play())
  ]
);

export { cellView };
