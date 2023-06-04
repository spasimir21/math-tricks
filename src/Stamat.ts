import { PlayState, Player, MathTricksSimulation } from './simulation';

function evaluateState(simulation: MathTricksSimulation): number {
  if (simulation.gameState.playState === PlayState.Win)
    return simulation.gameState.currentPlayer === Player.Player1 ? Infinity : -Infinity;
  if (simulation.gameState.playState === PlayState.Draw) return 100;
  return simulation.gameState.playerScores[0] - simulation.gameState.playerScores[1];
}

// Minimax Algorithm
function minimax(
  depth: number,
  prevSimulation: MathTricksSimulation,
  evaluateState: (simulation: MathTricksSimulation) => number,
  alpha: number = -Infinity,
  beta: number = Infinity,
  lastMove?: number
): [number | null, number] {
  const simulation = prevSimulation.fork();
  if (lastMove) simulation.makePlay(lastMove);

  if (depth == 0 || simulation.gameState.playState != PlayState.Playing) return [null, evaluateState(simulation)];

  const maximizing = simulation.gameState.currentPlayer === Player.Player1;
  if (maximizing) {
    let maxEval = -Infinity;
    let maxMove = null;

    for (const move of simulation.playableCells) {
      const evaluation = minimax(depth - 1, simulation, evaluateState, alpha, beta, move)[1];

      if (evaluation >= maxEval) {
        maxEval = evaluation;
        maxMove = move;
      }

      alpha = Math.max(alpha, maxEval);
      if (maxEval >= beta) break;
    }

    return [maxMove, maxEval];
  } else {
    let minEval = Infinity;
    let minMove = null;

    for (const move of simulation.playableCells) {
      const evaluation = minimax(depth - 1, simulation, evaluateState, alpha, beta, move)[1];

      if (evaluation <= minEval) {
        minEval = evaluation;
        minMove = move;
      }

      beta = Math.min(beta, minEval);
      if (minEval <= alpha) break;
    }

    return [minMove, minEval];
  }
}

class Stamat {
  private readonly simulation: MathTricksSimulation;
  public readonly difficulty: number;

  constructor(difficulty: number, simulation: MathTricksSimulation) {
    this.simulation = simulation;
    this.difficulty = difficulty;
  }

  public makeMove() {
    const [move, _evaluation] = minimax(this.difficulty, this.simulation, evaluateState);
    this.simulation.makePlay(move ?? 0);
  }
}

export { Stamat };
