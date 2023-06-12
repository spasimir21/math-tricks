import { Operation } from './cellEncoding';

interface Cell {
  operation: Operation;
  number: number;
}

function generateBoardWithAddSub(count: number) {
  const board: Cell[] = new Array(count).fill(0);

  for (let i = 0; i < count; i++) {
    const operation = Math.random() < 0.5 ? Operation.Sub : Operation.Add;
    const number = operation === Operation.Add ? Math.floor(Math.random() * 8) : Math.ceil(Math.random() * 7);
    board[i] = { operation, number };
  }

  return board;
}

function copy(
  target: Cell[],
  targetWidth: number,
  source: Cell[],
  x: number,
  y: number,
  width: number,
  height: number
) {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const targetPosition = (y + i) * targetWidth + x + j;
      const sourcePosition = i * width + j;
      target[targetPosition] = source[sourcePosition];
    }
  }
}

function generateFullBoard(width: number, height: number) {
  const base = generateBoardWithAddSub(width * height);

  const quarterWidth = Math.floor(width / 2);
  const quarterHeight = Math.floor(height / 2);
  const quarterSize = quarterWidth * quarterHeight;

  const q1 = generateBoardWithAddSub(quarterSize);
  const q2 = generateBoardWithAddSub(quarterSize);
  const q3 = [...q1].sort(() => Math.random() - 0.5);
  const q4 = [...q2].sort(() => Math.random() - 0.5);

  copy(base, width, q1, 0, 0, quarterWidth, quarterHeight);
  copy(base, width, q2, Math.ceil(width / 2), 0, quarterWidth, quarterHeight);
  copy(base, width, q3, Math.ceil(width / 2), Math.ceil(height / 2), quarterWidth, quarterHeight);
  copy(base, width, q4, 0, Math.ceil(height / 2), quarterWidth, quarterHeight);

  const specialCount = Math.floor(Math.max(1, Math.pow(width * height, 1 / 4)));
  for (let i = 0; i < specialCount; i++) {
    base[Math.floor(Math.random() * base.length)] = { operation: Operation.Mul, number: 0 };
    base[Math.floor(Math.random() * base.length)] = { operation: Operation.Mul, number: 2 };
    base[Math.floor(Math.random() * base.length)] = { operation: Operation.Div, number: 2 };
  }

  return base;
}

export { generateFullBoard };
