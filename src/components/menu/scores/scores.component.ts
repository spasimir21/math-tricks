import defineComponent from './scores.view.html';
import { Controller } from '@uixjs/core';

class ScoresController extends Controller<{}, {}, { scores: Record<string, number> }> {
  resetScores() {
    for (const player in this.shared.scores) delete this.shared.scores[player];
  }

  removeScore(player: string) {
    delete this.shared.scores[player];
  }
}

const scoresComponent = defineComponent({
  name: 'scores',
  controller: ScoresController
});

export default scoresComponent;
export { scoresComponent };
