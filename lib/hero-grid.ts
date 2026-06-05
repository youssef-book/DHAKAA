export const HERO_COLUMN_COUNT = 8;
export const HERO_ROW_COUNT = 6;
export const HERO_COLUMN_WEIGHTS = [0.7, 0.86, 1.04, 1.3, 1.3, 1.04, 0.86, 0.7];

export type HeroFrameRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

export type HeroGrid = {
  verticalLines: number[];
  horizontalLines: number[];
  frame: HeroFrameRect;
};

export function buildWeightedPositions(
  span: number,
  count: number,
  weights?: number[],
): number[] {
  const w = weights ?? Array.from({ length: count }, () => 1);
  const total = w.reduce((sum, weight) => sum + weight, 0);
  const lines = [0];
  let cursor = 0;

  for (let i = 0; i < count; i++) {
    cursor += (w[i]! / total) * span;
    if (i < count - 1) lines.push(cursor);
  }

  lines.push(span);
  return lines;
}

export type HeroGridOptions = {
  columnCount?: number;
  rowCount?: number;
  columnWeights?: number[];
};

export function getHeroGrid(
  width: number,
  height: number,
  options: HeroGridOptions = {},
): HeroGrid {
  const columnCount = options.columnCount ?? HERO_COLUMN_COUNT;
  const rowCount = options.rowCount ?? HERO_ROW_COUNT;
  const columnWeights =
    options.columnWeights ??
    (columnCount === HERO_COLUMN_COUNT ? HERO_COLUMN_WEIGHTS : undefined);

  const verticalLines = buildWeightedPositions(
    width,
    columnCount,
    columnWeights,
  );
  const horizontalLines = buildWeightedPositions(height, rowCount);

  const left = verticalLines[2] ?? 0;
  const right = verticalLines[verticalLines.length - 3] ?? width;
  const top = horizontalLines[1] ?? 0;
  const bottom = horizontalLines[horizontalLines.length - 2] ?? height;

  return {
    verticalLines,
    horizontalLines,
    frame: {
      left,
      right,
      top,
      bottom,
      width: right - left,
      height: bottom - top,
    },
  };
}

export function isHeroFrameVertical(index: number, lineCount: number): boolean {
  return index === 2 || index === lineCount - 3;
}

export function isHeroFrameHorizontal(index: number, lineCount: number): boolean {
  return index === 1 || index === lineCount - 2;
}
