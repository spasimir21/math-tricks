import { _event, _export, _if, prop, shared, styleProperty, view, component, initComponent } from '@uix';
import { MenuController } from './menu.controller';

const botDifficultySelectorView = view<MenuController>(`<placeholder $='botDifficultySelector'></placeholder>`, (elements, $) => [
  component(elements, 'botDifficultySelector', $, 'bot-difficulty-selector'),
  prop(elements['botDifficultySelector'] as any, 'cells', () => $.gameSaveData.boardSize[0] * $.gameSaveData.boardSize[1]),
  shared(
    elements['botDifficultySelector'] as any,
    'difficulty',
    () => $.gameSaveData.botDifficulty,
    v => ($.gameSaveData.botDifficulty = v)
  ),
  initComponent(elements['botDifficultySelector'] as any)
]);

const menuView = view<MenuController>(
  `
  <h1>MATH TRICKS</h1>
  <placeholder $='boardSizeSelector'></placeholder>
  <placeholder $='scores'></placeholder>
  <placeholder $='botSelectButton'></placeholder>
  <placeholder $='botDifficultySelector'></placeholder>
  <placeholder $='playerNameInputs'></placeholder>
  <p class='button play-button' $='playButton'>PLAY</p>
`,
  (elements, $) => [
    _event(elements['playButton'], 'click', () => $.play()),
    component(elements, 'botSelectButton', $, 'bot-toggle'),
    shared(
      elements['botSelectButton'] as any,
      'vsBot',
      () => $.gameSaveData.vsBot,
      v => ($.gameSaveData.vsBot = v)
    ),
    initComponent(elements['botSelectButton'] as any),
    component(elements, 'scores', $, 'scores'),
    shared(
      elements['scores'] as any,
      'scores',
      () => $.gameSaveData.scores,
      v => ($.gameSaveData.scores = v)
    ),
    initComponent(elements['scores'] as any),
    component(elements, 'boardSizeSelector', $, 'board-size-selector'),
    shared(
      elements['boardSizeSelector'] as any,
      'width',
      () => $.gameSaveData.boardSize[0],
      v => ($.gameSaveData.boardSize[0] = v)
    ),
    shared(
      elements['boardSizeSelector'] as any,
      'height',
      () => $.gameSaveData.boardSize[1],
      v => ($.gameSaveData.boardSize[1] = v)
    ),
    initComponent(elements['boardSizeSelector'] as any),
    _export<boolean>(elements['boardSizeSelector'] as any, 'valid', v => ($.isBoardSizeValid = v)),
    styleProperty(elements['playButton'], 'color', () => ($.valid ? 'black' : 'red')),
    _if(elements['botDifficultySelector'], $, () => $.gameSaveData.vsBot, botDifficultySelectorView, null),
    component(elements, 'playerNameInputs', $, 'player-name-inputs'),
    prop(elements['playerNameInputs'] as any, 'vsBot', () => $.gameSaveData.vsBot),
    shared(
      elements['playerNameInputs'] as any,
      'player1Name',
      () => $.gameSaveData.playerNames[0],
      v => ($.gameSaveData.playerNames[0] = v)
    ),
    shared(
      elements['playerNameInputs'] as any,
      'player2Name',
      () => $.gameSaveData.playerNames[1],
      v => ($.gameSaveData.playerNames[1] = v)
    ),
    initComponent(elements['playerNameInputs'] as any),
    _export<boolean>(elements['playerNameInputs'] as any, 'valid', v => ($.arePlayerNamesValid = v))
  ]
);

export { menuView };
