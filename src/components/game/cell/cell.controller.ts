import { MathTricksSimulation } from 'simulation';
import { decode, Operation } from 'cellEncoding';
import { Computed } from '@reactivity';
import { Controller } from '@uix';

class CellController extends Controller<{ position: number }> {
  @Computed
  get cellData() {
    return decode((this.context.simulation as MathTricksSimulation).cells.get(this.props.position));
  }

  @Computed
  get classes() {
    const classes: string[] = [];

    if (this.cellData.hasBeenUsed) {
      classes.push(`player${this.cellData.player + 1}`);
      if (this.cellData.isPlayerStanding) classes.push('player-standing');
    }

    if (this.isPlayable) classes.push('active');

    return classes;
  }

  @Computed
  get cellText() {
    // prettier-ignore
    const operationText = 
        this.cellData.operation === Operation.Add ? ''
      : this.cellData.operation === Operation.Sub ? '-'
      : this.cellData.operation === Operation.Mul ? '*'
      : '/';

    return operationText + this.cellData.number.toString();
  }

  @Computed
  get isPlayable() {
    return (
      this.context.canInteract &&
      (this.context.simulation as MathTricksSimulation).playableCells.has(this.props.position)
    );
  }

  play() {
    if (!this.isPlayable) return;
    (this.context.simulation as MathTricksSimulation).makePlay(this.props.position, true);
  }
}

export { CellController };
