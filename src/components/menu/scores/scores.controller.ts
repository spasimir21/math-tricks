import { Controller } from '@uix';

class ScoresController extends Controller<{}, {}, { scores: Record<string, number> }> {
  resetScores() {
    for (const player in this.shared.scores) delete this.shared.scores[player];
  }

  removeScore(player: string) {
    delete this.shared.scores[player];
  }
}

export { ScoresController };
