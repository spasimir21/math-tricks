import { BotDifficultySelectorController } from './botDifficultySelector.controller';
import { _if, attribute, bindValue, textContent, view } from '@uix';

const sliderView = view<BotDifficultySelectorController>(
  `<input $='slider' class="slider" type="range" min="1" max="4" />`,
  (elements, $) => [
    attribute(elements['slider'], 'max', () => $.maxDifficulty.toString()),
    bindValue(
      elements['slider'] as any,
      false,
      () => $.difficultyInputValue,
      v => ($.difficultyInputValue = v)
    )
  ]
);

const botDifficultySelectorView = view<BotDifficultySelectorController>(
  `
  <p>Bot Difficulty: </p>
  <placeholder $='slider'></placeholder>
  <p $='value'></p>
`,
  (elements, $) => [
    textContent(elements['value'], () => $.difficultyInputValue),
    _if(elements['slider'], $, () => $.maxDifficulty > 1, sliderView, null)
  ]
);

export { botDifficultySelectorView };
