import { _event, _if, component, initComponent, ref, styleProperty, textContent, view } from '@uix';
import { GameController } from './game.controller';
import { PlayState } from 'simulation';
import { Router } from '@router';

const turnTextView = view<GameController>(
  `
  <p class='game-text' $='gameTurnText'></p>
`,
  (elements, $) => [
    textContent(elements['gameTurnText'], () => $.gameTurnText),
    styleProperty(elements['gameTurnText'], 'color', () => $.gameTurnTextColor)
  ]
);

const scoresView = view<GameController>(
  `
  <p class='game-text' style='color: var(--color-player1)' $='player1Score'></p>
  <p class='game-text' style='color: var(--color-player2)' $='player2Score'></p>
`,
  (elements, $) => [
    textContent(
      elements['player1Score'],
      () => `${$.context.gameInfo.playerNames[0]}: ${$.context.simulation.gameState.playerScores[0]}`
    ),
    textContent(
      elements['player2Score'],
      () => `${$.context.gameInfo.playerNames[1]}: ${$.context.simulation.gameState.playerScores[1]}`
    )
  ]
);

const gameStateView = view<GameController>(
  `
  <p class='game-text' $='gameStateTest'></p>
`,
  (elements, $) => [
    textContent(elements['gameStateTest'], () => $.gameStateText),
    styleProperty(elements['gameStateTest'], 'color', () => $.gameStateTextColor)
  ]
);

const gameEndControlsView = view<GameController>(
  `
  <p class='game-end-button' $='rematchButton'>REMATCH</p>
  <p class='game-end-button' $='menuButton'>MENU</p>
`,
  (elements, $) => [
    _event(elements['rematchButton'], 'click', () => ($.context.router as Router).refresh()),
    _event(elements['menuButton'], 'click', () => ($.context.router as Router).goto({ route: 'menu' }))
  ]
);

const gameView = view<GameController>(
  `
  <div class='game-top'>
  <placeholder $='gameTop'></placeholder>
  </div>
  <div class='grid-container' $='grid-container'>
    <placeholder $='grid'></placeholder>
  </div>
  <div class='game-bottom'>
    <placeholder $='gameBottom'></placeholder>
  </div>
`,
  (elements, $) => [
    ref(elements['grid-container'], element => ($.context.gridContainer = element)),
    _if(
      elements['gameBottom'],
      $,
      () => $.simulation.gameState.playState === PlayState.Playing,
      turnTextView,
      gameEndControlsView
    ),
    _if(elements['gameTop'], $, () => $.simulation.gameState.playState === PlayState.Playing, scoresView, gameStateView),
    component(elements, 'grid', $, 'grid'),
    initComponent(elements['grid'] as any)
  ]
);

export { gameView };
