import { cn } from "@/lib/cn";

const VERSION = 4;
const SIZE = VERSION * 4 + 17;
const QUIET_ZONE = 4;
const DATA_CODEWORDS = 80;
const EC_CODEWORDS = 20;
const MAX_BYTE_LENGTH = Math.floor((DATA_CODEWORDS * 8 - 4 - 8) / 8);
const ALIGNMENT_CENTER = 26;
const FORMAT_ERROR_CORRECTION_LEVEL_L = 1;
const FORMAT_GENERATOR = 0x537;
const FORMAT_MASK = 0x5412;

type Matrix = boolean[][];

export interface QrCodeSvgProps {
  value: string;
  label: string;
  className?: string;
}

export function QrCodeSvg({ value, label, className }: QrCodeSvgProps) {
  const modules = createQrModules(value);
  if (!modules) return null;

  const viewBoxSize = SIZE + QUIET_ZONE * 2;
  const cells = modules.flatMap((row, y) =>
    row.map((dark, x) =>
      dark ? <rect key={`${x}-${y}`} x={x + QUIET_ZONE} y={y + QUIET_ZONE} width={1} height={1} /> : null,
    ),
  );

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      shapeRendering="crispEdges"
      className={cn("block aspect-square h-36 w-36 rounded-md bg-white text-black", className)}
    >
      <rect width={viewBoxSize} height={viewBoxSize} fill="white" />
      <g fill="currentColor">{cells}</g>
    </svg>
  );
}

function createQrModules(value: string): Matrix | null {
  const dataCodewords = encodeDataCodewords(value);
  if (!dataCodewords) return null;

  const codewords = [...dataCodewords, ...reedSolomonRemainder(dataCodewords, EC_CODEWORDS)];
  const bits = codewords.flatMap((codeword) => bitsOf(codeword, 8));
  const { modules, reserved } = makeBaseMatrix();
  drawCodewords(modules, reserved, bits);

  let bestModules: Matrix | null = null;
  let bestPenalty = Number.POSITIVE_INFINITY;
  for (let mask = 0; mask < 8; mask += 1) {
    const candidate = modules.map((row) => row.slice());
    applyMask(candidate, reserved, mask);
    drawFormatBits(candidate, mask);
    const penalty = penaltyScore(candidate);
    if (penalty < bestPenalty) {
      bestModules = candidate;
      bestPenalty = penalty;
    }
  }
  return bestModules;
}

function encodeDataCodewords(value: string): number[] | null {
  const bytes = Array.from(new TextEncoder().encode(value));
  if (bytes.length > MAX_BYTE_LENGTH) return null;

  const bits: number[] = [];
  appendBits(bits, 0b0100, 4);
  appendBits(bits, bytes.length, 8);
  for (const byte of bytes) appendBits(bits, byte, 8);

  const capacityBits = DATA_CODEWORDS * 8;
  appendBits(bits, 0, Math.min(4, capacityBits - bits.length));
  while (bits.length % 8 !== 0) bits.push(0);

  const codewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let codeword = 0;
    for (let j = 0; j < 8; j += 1) codeword = (codeword << 1) | (bits[i + j] ?? 0);
    codewords.push(codeword);
  }
  for (let i = 0; codewords.length < DATA_CODEWORDS; i += 1) codewords.push(i % 2 === 0 ? 0xec : 0x11);
  return codewords;
}

function makeBaseMatrix(): { modules: Matrix; reserved: Matrix } {
  const modules = blankMatrix();
  const reserved = blankMatrix();
  const setFunction = (x: number, y: number, dark: boolean) => {
    if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return;
    modules[y]![x] = dark;
    reserved[y]![x] = true;
  };

  drawFinder(setFunction, 0, 0);
  drawFinder(setFunction, SIZE - 7, 0);
  drawFinder(setFunction, 0, SIZE - 7);
  drawAlignment(setFunction, ALIGNMENT_CENTER, ALIGNMENT_CENTER);

  for (let i = 8; i < SIZE - 8; i += 1) {
    const dark = i % 2 === 0;
    setFunction(i, 6, dark);
    setFunction(6, i, dark);
  }

  reserveFormatBits(setFunction);
  setFunction(8, SIZE - 8, true);
  return { modules, reserved };
}

function blankMatrix(): Matrix {
  return Array.from({ length: SIZE }, () => Array<boolean>(SIZE).fill(false));
}

function drawFinder(setFunction: (x: number, y: number, dark: boolean) => void, left: number, top: number): void {
  for (let dy = -1; dy <= 7; dy += 1) {
    for (let dx = -1; dx <= 7; dx += 1) {
      const x = left + dx;
      const y = top + dy;
      const inFinder = dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6;
      const border = dx === 0 || dx === 6 || dy === 0 || dy === 6;
      const center = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
      setFunction(x, y, inFinder && (border || center));
    }
  }
}

function drawAlignment(setFunction: (x: number, y: number, dark: boolean) => void, centerX: number, centerY: number): void {
  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      const distance = Math.max(Math.abs(dx), Math.abs(dy));
      setFunction(centerX + dx, centerY + dy, distance !== 1);
    }
  }
}

function reserveFormatBits(setFunction: (x: number, y: number, dark: boolean) => void): void {
  for (let i = 0; i <= 5; i += 1) setFunction(8, i, false);
  setFunction(8, 7, false);
  setFunction(8, 8, false);
  setFunction(7, 8, false);
  for (let i = 9; i < 15; i += 1) setFunction(14 - i, 8, false);
  for (let i = 0; i < 8; i += 1) setFunction(SIZE - 1 - i, 8, false);
  for (let i = 8; i < 15; i += 1) setFunction(8, SIZE - 15 + i, false);
}

function drawCodewords(modules: Matrix, reserved: Matrix, bits: readonly number[]): void {
  let bitIndex = 0;
  let upward = true;
  for (let right = SIZE - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vertical = 0; vertical < SIZE; vertical += 1) {
      const y = upward ? SIZE - 1 - vertical : vertical;
      for (let column = 0; column < 2; column += 1) {
        const x = right - column;
        if (!reserved[y]![x]) {
          modules[y]![x] = (bits[bitIndex] ?? 0) === 1;
          bitIndex += 1;
        }
      }
    }
    upward = !upward;
  }
}

function applyMask(modules: Matrix, reserved: Matrix, mask: number): void {
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      if (!reserved[y]![x] && maskBit(mask, x, y)) modules[y]![x] = !modules[y]![x];
    }
  }
}

function maskBit(mask: number, x: number, y: number): boolean {
  switch (mask) {
    case 0:
      return (x + y) % 2 === 0;
    case 1:
      return y % 2 === 0;
    case 2:
      return x % 3 === 0;
    case 3:
      return (x + y) % 3 === 0;
    case 4:
      return (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0;
    case 5:
      return ((x * y) % 2) + ((x * y) % 3) === 0;
    case 6:
      return (((x * y) % 2) + ((x * y) % 3)) % 2 === 0;
    default:
      return (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
  }
}

function drawFormatBits(modules: Matrix, mask: number): void {
  const bits = formatBits(mask);
  const set = (x: number, y: number, bit: number) => {
    modules[y]![x] = ((bits >>> bit) & 1) !== 0;
  };

  for (let i = 0; i <= 5; i += 1) set(8, i, i);
  set(8, 7, 6);
  set(8, 8, 7);
  set(7, 8, 8);
  for (let i = 9; i < 15; i += 1) set(14 - i, 8, i);
  for (let i = 0; i < 8; i += 1) set(SIZE - 1 - i, 8, i);
  for (let i = 8; i < 15; i += 1) set(8, SIZE - 15 + i, i);
  modules[SIZE - 8]![8] = true;
}

function formatBits(mask: number): number {
  const data = (FORMAT_ERROR_CORRECTION_LEVEL_L << 3) | mask;
  let remainder = data;
  for (let i = 0; i < 10; i += 1) remainder = (remainder << 1) ^ (((remainder >>> 9) & 1) * FORMAT_GENERATOR);
  return ((data << 10) | remainder) ^ FORMAT_MASK;
}

function penaltyScore(modules: Matrix): number {
  let score = 0;
  for (let y = 0; y < SIZE; y += 1) score += linePenalty(modules[y]!);
  for (let x = 0; x < SIZE; x += 1) score += linePenalty(modules.map((row) => row[x]!));

  for (let y = 0; y < SIZE - 1; y += 1) {
    for (let x = 0; x < SIZE - 1; x += 1) {
      const color = modules[y]![x];
      if (modules[y]![x + 1] === color && modules[y + 1]![x] === color && modules[y + 1]![x + 1] === color) score += 3;
    }
  }

  const finderPattern = [true, false, true, true, true, false, true, false, false, false, false];
  const reverseFinderPattern = [false, false, false, false, true, false, true, true, true, false, true];
  for (let y = 0; y < SIZE; y += 1) score += finderPenalty(modules[y]!, finderPattern, reverseFinderPattern);
  for (let x = 0; x < SIZE; x += 1) score += finderPenalty(modules.map((row) => row[x]!), finderPattern, reverseFinderPattern);

  const dark = modules.flat().filter(Boolean).length;
  const total = SIZE * SIZE;
  return score + Math.floor(Math.abs(dark * 20 - total * 10) / total) * 10;
}

function linePenalty(line: readonly boolean[]): number {
  let score = 0;
  let runColor = line[0];
  let runLength = 1;
  for (let i = 1; i <= line.length; i += 1) {
    if (i < line.length && line[i] === runColor) {
      runLength += 1;
    } else {
      if (runLength >= 5) score += runLength - 2;
      runColor = line[i];
      runLength = 1;
    }
  }
  return score;
}

function finderPenalty(line: readonly boolean[], pattern: readonly boolean[], reversePattern: readonly boolean[]): number {
  let score = 0;
  for (let i = 0; i <= line.length - pattern.length; i += 1) {
    const window = line.slice(i, i + pattern.length);
    if (matches(window, pattern) || matches(window, reversePattern)) score += 40;
  }
  return score;
}

function matches(values: readonly boolean[], pattern: readonly boolean[]): boolean {
  return pattern.every((value, index) => values[index] === value);
}

const EXP_TABLE = makeExpTable();
const LOG_TABLE = makeLogTable(EXP_TABLE);

function reedSolomonRemainder(data: readonly number[], degree: number): number[] {
  const generator = reedSolomonGenerator(degree);
  const result = Array<number>(degree).fill(0);
  for (const byte of data) {
    const factor = byte ^ result.shift()!;
    result.push(0);
    for (let i = 0; i < degree; i += 1) result[i] = result[i]! ^ gfMultiply(generator[i + 1]!, factor);
  }
  return result;
}

function reedSolomonGenerator(degree: number): number[] {
  let result = [1];
  for (let i = 0; i < degree; i += 1) {
    const next = Array<number>(result.length + 1).fill(0);
    for (let j = 0; j < result.length; j += 1) {
      next[j] = next[j]! ^ result[j]!;
      next[j + 1] = next[j + 1]! ^ gfMultiply(result[j]!, EXP_TABLE[i]!);
    }
    result = next;
  }
  return result;
}

function gfMultiply(x: number, y: number): number {
  return x === 0 || y === 0 ? 0 : EXP_TABLE[LOG_TABLE[x]! + LOG_TABLE[y]!]!;
}

function makeExpTable(): number[] {
  const table = Array<number>(512).fill(0);
  let value = 1;
  for (let i = 0; i < 255; i += 1) {
    table[i] = value;
    value <<= 1;
    if (value >= 0x100) value ^= 0x11d;
  }
  for (let i = 255; i < table.length; i += 1) table[i] = table[i - 255]!;
  return table;
}

function makeLogTable(exp: readonly number[]): number[] {
  const table = Array<number>(256).fill(0);
  for (let i = 0; i < 255; i += 1) table[exp[i]!] = i;
  return table;
}

function appendBits(bits: number[], value: number, length: number): void {
  for (let i = length - 1; i >= 0; i -= 1) bits.push((value >>> i) & 1);
}

function bitsOf(value: number, length: number): number[] {
  const bits: number[] = [];
  appendBits(bits, value, length);
  return bits;
}
