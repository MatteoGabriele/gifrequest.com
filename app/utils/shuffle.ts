export function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  const result: T[] = [];

  while (copy.length > 0) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    const spliced = copy.splice(randomIndex, 1);
    if (spliced.length > 0 && spliced[0]) {
      result.push(spliced[0]);
    }
  }

  return result;
}
