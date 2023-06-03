import { PlayerNameInputsController } from './playerNameInputs.controller';
import { bindValue, booleanAttribute, styleProperty, view } from '@uix';
import { CONFIG } from 'config';

const playerNameInputsView = view<PlayerNameInputsController>(
  `
  <div class="player-name-input">
    <p $='player1Label'>PLAYER 1'S NAME:</p>
    <input $='player1Input' />
  </div>
  <div class="player-name-input">
    <p $='player2Label'>PLAYER 2'S NAME:</p>
    <input $='player2Input' />
  </div>
`,
  (elements, $) => [
    booleanAttribute(elements['player2Input'], 'disabled', () => $.props.vsBot),
    bindValue(
      elements['player1Input'] as any,
      false,
      () => $.nameInputValues[0],
      v => ($.nameInputValues[0] = v)
    ),
    bindValue(
      elements['player2Input'] as any,
      false,
      () => ($.props.vsBot ? 'STAMAT' : $.nameInputValues[1]),
      v => ($.nameInputValues[1] = v)
    ),
    styleProperty(elements['player1Label'], 'color', () => ($._exports.valid ? CONFIG.playerColors[0] : 'red')),
    styleProperty(elements['player2Label'], 'color', () => ($._exports.valid ? CONFIG.playerColors[1] : 'red'))
  ]
);

export { playerNameInputsView };
