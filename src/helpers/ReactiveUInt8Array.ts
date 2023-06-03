import { SubscribableNode, TrackStack } from '@reactivity';

class ReactiveUInt8Array {
  private readonly nodes = {} as Record<number, SubscribableNode>;
  private readonly array: Uint8Array;

  constructor(public readonly length: number, source?: Uint8Array) {
    this.array = source ? source : new Uint8Array(length);
  }

  copy() {
    return new ReactiveUInt8Array(this.length, this.array.slice());
  }

  set(index: number, value: number) {
    if (value === this.array[index]) return;
    this.array[index] = value;
    if (index in this.nodes) this.nodes[index].emitChange();
  }

  get(index: number): number {
    if (TrackStack.isTracking) {
      if (!(index in this.nodes)) this.nodes[index] = new SubscribableNode();
      this.nodes[index].track();
    }

    return this.array[index];
  }
}

export { ReactiveUInt8Array };
