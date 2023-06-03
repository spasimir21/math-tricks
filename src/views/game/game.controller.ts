import { PlayState, Player, MathTricksSimulation } from 'simulation';
import { Controller, ReactiveController } from '@uix';
import { Computed, Effect } from '@reactivity';
import { $globalGameSave } from 'save';
import { Stamat } from 'Stamat';
import { CONFIG } from 'config';

@ReactiveController
class GameController extends Controller {
  simulation: MathTricksSimulation = null as any;
  stamat: Stamat | null = null;

  @Computed
  get gameStateText() {
    let stateText;
    if (this.simulation.gameState.playState === PlayState.Playing) stateText = 'PLAYING';
    if (this.simulation.gameState.playState === PlayState.Draw) stateText = 'DRAW!';
    else stateText = `${this.context.gameInfo.playerNames[this.simulation.gameState.currentPlayer]} WINS!`;

    return `${stateText} (${[...this.simulation.gameState.playerScores].sort((a, b) => b - a).join(' / ')})`;
  }

  @Computed
  get gameStateTextColor() {
    if (this.simulation.gameState.playState !== PlayState.Win) return 'black';
    return CONFIG.playerColors[this.simulation.gameState.currentPlayer];
  }

  @Computed
  get gameTurnText() {
    return `${this.context.gameInfo.playerNames[this.simulation.gameState.currentPlayer]}'S TURN`;
  }

  @Computed
  get gameTurnTextColor() {
    return CONFIG.playerColors[this.simulation.gameState.currentPlayer];
  }

  override init() {
    this.context.gameInfo = {
      size: [...$globalGameSave.data.boardSize],
      playerNames: [
        $globalGameSave.data.playerNames[0],
        $globalGameSave.data.vsBot ? 'STAMAT' : $globalGameSave.data.playerNames[1]
      ],
      vsBot: $globalGameSave.data.vsBot,
      botDifficulty: $globalGameSave.data.botDifficulty
    };

    this.simulation = new MathTricksSimulation(this.context.gameInfo.size);
    this.simulation.start();

    this.context.simulation = this.simulation;
    this.context.canInteract = true;

    if (this.context.gameInfo.vsBot) this.stamat = new Stamat(this.context.gameInfo.botDifficulty, this.simulation);
  }

  @Effect
  private updateScores() {
    if (this.simulation.gameState.playState !== PlayState.Win) return;
    $globalGameSave.changeScore(this.context.gameInfo.playerNames[this.simulation.gameState.currentPlayer], 1);
    $globalGameSave.changeScore(this.context.gameInfo.playerNames[1 - this.simulation.gameState.currentPlayer], 0);
  }

  @Effect
  private handleBotMoves() {
    if (this.stamat == null) return;

    if (this.simulation.gameState.currentPlayer === Player.Player1) {
      this.context.canInteract = true;
      return;
    }

    this.context.canInteract = false;

    setTimeout(() => (this.stamat as Stamat).makeMove(), 100);
  }
}

export { GameController };
