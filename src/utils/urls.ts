export function withBasePath(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalizedPath = path.replace(/^\/+/, '');
  return `${base}${normalizedPath}`;
}

export function resolvePublicAssetUrl(src: string): string {
  if (!src) return src;
  if (/^(?:https?:)?\/\//.test(src) || src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  const publicPath = src.replace(/^\.?\/*/, '');
  const baseUrl = withBasePath(publicPath);
  if (typeof window !== 'undefined') {
    return new URL(baseUrl, window.location.origin).href;
  }
  return baseUrl;
}
