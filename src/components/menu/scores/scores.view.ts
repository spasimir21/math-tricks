import { _event, _forEach, _if, textContent, view } from '@uix';
import { ScoresController } from './scores.controller';

const scoreView = view<ScoresController & { player: string }>(
  `
  <p class='button' $='score'></p>
`,
  (elements, $) => [
    textContent(elements['score'], () => `${$.player} - ${$.shared.scores[$.player] ?? 0}`),
    _event(elements['score'], 'click', () => $.removeScore($.player))
  ]
);

const noScoresView = view<ScoresController>(
  `
  <p>NO SCORES YET!</p>
`,
  (elements, $) => []
);

const resetView = view<ScoresController>(
  `
  <p class='button' $='reset'>RESET</p>
`,
  (elements, $) => [_event(elements['reset'], 'click', () => $.resetScores())]
);

const scoresView = view<ScoresController>(
  `
  <placeholder $='scores'></placeholder>
  <placeholder $='reset'></placeholder>
`,
  (elements, $) => [
    _forEach(elements['scores'], $, 'player', () => Object.keys($.shared.scores), scoreView, noScoresView),
    _if(elements['reset'], $, () => Object.keys($.shared.scores).length > 0, resetView, null)
  ]
);

export { scoresView };
