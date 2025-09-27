export function fromObjectToQuerystring(obj: Record<string, unknown>): string {
  return Object.keys(obj)
    .reduce<string[]>((acc, key) => {
      acc.push(`${key}=${obj[key]}`);
      return acc;
    }, [])
    .join("&");
}
