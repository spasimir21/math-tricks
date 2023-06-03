import { BoardSizeSelectorController } from './boardSizeSelector.controller';
import { bindValue, styleProperty, view } from '@uix';

const boardSizeSelectorView = view<BoardSizeSelectorController>(
  `
  <p $='boardText'>BOARD SIZE:</p>
  <input $='widthInput' />
  <p $='xText'>X</p>
  <input $='heightInput' />
`,
  (elements, $) => [
    bindValue(
      elements['widthInput'] as any,
      false,
      () => $.sizeInputValues[0],
      v => ($.sizeInputValues[0] = v)
    ),
    bindValue(
      elements['heightInput'] as any,
      false,
      () => $.sizeInputValues[1],
      v => ($.sizeInputValues[1] = v)
    ),
    styleProperty(elements['boardText'], 'color', () => ($._exports.valid ? 'black' : 'red')),
    styleProperty(elements['xText'], 'color', () => ($._exports.valid ? 'black' : 'red'))
  ]
);

export { boardSizeSelectorView };
