import { Effect, Reactive, State } from 'reactivity';

interface GameSaveData {
  boardSize: [number, number];
  playerNames: string[];
  botDifficulty: number;
  vsBot: boolean;
  scores: Record<string, number>;
}

function getDefaultGameSave(): GameSaveData {
  return {
    boardSize: [7, 9],
    playerNames: ['PLAYER 1', 'PLAYER 2'],
    botDifficulty: 1,
    vsBot: false,
    scores: {}
  };
}

@Reactive
class GameSave {
  @State
  data: GameSaveData = null as any;

  constructor(public readonly saveKey: string) {
    this.load();
  }

  load() {
    const saved = localStorage.getItem(this.saveKey);

    if (saved == null) {
      this.data = getDefaultGameSave();
      return;
    }

    this.data = JSON.parse(saved);
  }

  @Effect
  private save() {
    localStorage.setItem(this.saveKey, JSON.stringify(this.data));
  }

  changeScore(player: string, delta: number) {
    if (this.data.scores[player] == null) this.data.scores[player] = 0;
    this.data.scores[player] += delta;
  }
}

const GAME_SAVE_KEY = '$MATH_TRICKS_GAME_SAVE';

const $globalGameSave = new GameSave(GAME_SAVE_KEY);

export { GameSave, GameSaveData, $globalGameSave };
