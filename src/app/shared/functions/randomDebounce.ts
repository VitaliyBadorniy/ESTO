export function getRandomDebounce(minValueMS: number, maxValueMS: number): number {
  // tslint:disable-next-line:no-bitwise
  return Math.random() * (maxValueMS - minValueMS) + minValueMS | 0;
}
