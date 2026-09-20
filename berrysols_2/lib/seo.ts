export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://berrysols.com").replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonicalUrl(path = "/") {
  return absoluteUrl(path);
}