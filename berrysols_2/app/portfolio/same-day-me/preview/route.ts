const LIVE_SITE_URL = "https://www.samedayme.com/";

export async function GET() {
  const response = await fetch(LIVE_SITE_URL, {
    headers: { "User-Agent": "Mozilla/5.0" },
    cache: "no-store",
  });

  if (!response.ok) {
    return new Response("Unable to load the live preview.", { status: 502 });
  }

  let html = await response.text();
  const baseTag = `<base href="${LIVE_SITE_URL}">`;
  html = html.replace(/<head([^>]*)>/i, `<head$1>${baseTag}`);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
