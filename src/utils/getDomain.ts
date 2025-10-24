export function getDomain(url?: string) {
  if (!url) return undefined;
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, '');
  } catch {
    return undefined;
  }
}
