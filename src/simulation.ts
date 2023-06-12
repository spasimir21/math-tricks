import { CellData, decode, encode, hasBeenUsed, Operation } from './cellEncoding';
import { ReactiveUInt8Array } from './helpers/ReactiveUInt8Array';
import { generateFullBoard } from './generator';
import { deepClone } from './helpers/deepClone';
import { Reactive, State } from 'reactivity';

enum PlayState {
  Playing,
  Win,
  Draw
}

enum Player {
  Player1,
  Player2
}

type GameState = {
  currentPlayer: Player;
  playState: PlayState;
  playerPositions: [number, number];
  playerScores: [number, number];
};

@Reactive
class MathTricksSimulation {
  readonly size: [number, number];
  cells: ReactiveUInt8Array;

  @State
  playableCells = new Set<number>();
  @State
  gameState: GameState;

  constructor(size: [number, number], cells?: ReactiveUInt8Array) {
    this.size = size;
    this.cells = cells ? cells : new ReactiveUInt8Array(this.size[0] * this.size[1]);

    this.gameState = {
      currentPlayer: Math.round(Math.random()),
      playState: PlayState.Playing,
      playerPositions: [0, this.cells.length - 1],
      playerScores: [0, 0]
    };
  }

  fork() {
    const fork = new MathTricksSimulation(this.size, this.cells.copy());
    fork.playableCells = new Set(this.playableCells);
    fork.gameState = deepClone(this.gameState);
    return fork;
  }

  start() {
    const boardData = generateFullBoard(...this.size);

    for (let i = 0; i < this.cells.length; i++) {
      this.setCellState(i, {
        hasBeenUsed: false,
        isPlayerStanding: false,
        player: Player.Player1,
        operation: boardData[i].operation,
        number: boardData[i].number
      });
    }

    this.setCellState(this.gameState.playerPositions[0], {
      hasBeenUsed: true,
      isPlayerStanding: true,
      player: Player.Player1,
      operation: Operation.Add,
      number: 0
    });

    this.setCellState(this.gameState.playerPositions[1], {
      hasBeenUsed: true,
      isPlayerStanding: true,
      player: Player.Player2,
      operation: Operation.Add,
      number: 0
    });

    this.updatePlayableCells();
  }

  private movePlayer(player: Player, destination: number) {
    const initialPosition = this.gameState.playerPositions[player];

    this.setCellState(initialPosition, {
      ...decode(this.cells.get(initialPosition)),
      isPlayerStanding: false
    });

    const destinationCellState = {
      ...decode(this.cells.get(destination)),
      isPlayerStanding: true,
      hasBeenUsed: true,
      player
    };

    this.setCellState(destination, destinationCellState);

    this.gameState.playerPositions[player] = destination;

    this.updateScore(player, destinationCellState.operation, destinationCellState.number);
  }

  private updateScore(player: Player, operation: Operation, number: number) {
    let score = this.gameState.playerScores[player];

    switch (operation) {
      case Operation.Add:
        score += number;
        break;
      case Operation.Sub:
        score -= number;
        break;
      case Operation.Mul:
        score *= number;
        break;
      case Operation.Div:
        score /= number;
        break;
      default:
        break;
    }

    this.gameState.playerScores[player] = score;
  }

  private updatePlayableCells() {
    this.playableCells.clear();
    for (const cell of this.getDestinationCells(this.gameState.currentPlayer)) this.playableCells.add(cell);
  }

  public makePlay(cell: number, unsafe: boolean = false): boolean {
    if (this.gameState.playState !== PlayState.Playing) return false;
    if (!unsafe && !this.isLegalPlay(cell)) return false;

    this.movePlayer(this.gameState.currentPlayer, cell);

    this.setGameState(PlayState.Playing, 1 - this.gameState.currentPlayer); // 1 - currentPlayer (Flip current player)

    this.updatePlayableCells();

    const [playState, winner] = this.checkEnd();

    this.setGameState(playState, playState === PlayState.Win ? winner : this.gameState.currentPlayer);

    return true;
  }

  private getDestinationCells(player: Player) {
    const playerPosition = this.gameState.playerPositions[player];
    const cells = new Set<number>();

    const x = playerPosition % this.size[0];
    const y = Math.floor(playerPosition / this.size[0]);

    if (y > 0) {
      if (x > 0 && !hasBeenUsed(this.cells.get(playerPosition - this.size[0] - 1)))
        cells.add(playerPosition - this.size[0] - 1);

      if (!hasBeenUsed(this.cells.get(playerPosition - this.size[0]))) cells.add(playerPosition - this.size[0]);

      if (x < this.size[0] - 1 && !hasBeenUsed(this.cells.get(playerPosition - this.size[0] + 1)))
        cells.add(playerPosition - this.size[0] + 1);
    }

    if (x > 0 && !hasBeenUsed(this.cells.get(playerPosition - 1))) cells.add(playerPosition - 1);

    if (x < this.size[0] - 1 && !hasBeenUsed(this.cells.get(playerPosition + 1))) cells.add(playerPosition + 1);

    if (y < this.size[1] - 1) {
      if (x > 0 && !hasBeenUsed(this.cells.get(playerPosition + this.size[0] - 1)))
        cells.add(playerPosition + this.size[0] - 1);

      if (!hasBeenUsed(this.cells.get(playerPosition + this.size[0]))) cells.add(playerPosition + this.size[0]);

      if (x < this.size[0] - 1 && !hasBeenUsed(this.cells.get(playerPosition + this.size[0] + 1)))
        cells.add(playerPosition + this.size[0] + 1);
    }

    return cells;
  }

  private isLegalPlay(cell: number): boolean {
    return this.playableCells.has(cell);
  }

  private checkEnd(): [PlayState, Player] {
    // prettier-ignore
    const playState = this.playableCells.size > 0 ? PlayState.Playing
                    : this.gameState.playerScores[0] === this.gameState.playerScores[1] ? PlayState.Draw
                    : PlayState.Win;

    return [
      playState,
      this.gameState.playerScores[0] > this.gameState.playerScores[1] ? Player.Player1 : Player.Player2
    ];
  }

  private setCellState(cell: number, data: CellData) {
    this.cells.set(cell, encode(data));
  }

  private setGameState(playState: PlayState, player: Player) {
    this.gameState.playState = playState;
    this.gameState.currentPlayer = player;
  }
}

export { MathTricksSimulation, PlayState, GameState, Player };
