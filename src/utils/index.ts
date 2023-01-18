export function getTimestamp(): number {
  return Math.round(new Date().getTime() / 1000);
}
