import { Player } from 'simulation';

enum Operation {
  Add,
  Sub,
  Mul,
  Div
}

interface CellData {
  isPlayerStanding: boolean; // 1 bit
  hasBeenUsed: boolean; // 1 bit
  player: Player; // 1 bit
  operation: Operation; // 2 bits
  number: number; // 3 bits
}

function encode(data: CellData) {
  // prettier-ignore
  return (data.isPlayerStanding ? 1 : 0) << 7
      | (data.hasBeenUsed ? 1 : 0) << 6
      | data.player << 5
      | data.operation << 3
      | data.number;
}

function decode(encoded: number): CellData {
  return {
    isPlayerStanding: Boolean((encoded & 0b10000000) >> 7),
    hasBeenUsed: Boolean((encoded & 0b1000000) >> 6),
    player: (encoded & 0b100000) >> 5,
    operation: (encoded & 0b11000) >> 3,
    number: encoded & 0b111
  };
}

function hasBeenUsed(encoded: number): boolean {
  return Boolean((encoded & 0b1000000) >> 6);
}

export { CellData, encode, decode, hasBeenUsed, Operation };
