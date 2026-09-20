import { NextRequest } from "next/server";

const LIVE_SITES: Record<string, string> = {
  "atf-movers": "https://atfmovers.ae/",
  "same-day-me": "https://www.samedayme.com/",
  telehealth: "https://www.telehealthnp.com/",
  "clock-log-is-a-tracker-application": "https://clocklog-git-dev-abdulrehman-ceativecou.vercel.app/",
};

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  const liveSite = LIVE_SITES[params.slug];
  if (!liveSite) return new Response("Preview unavailable.", { status: 404 });

  const response = await fetch(liveSite, {
    headers: { "User-Agent": "Mozilla/5.0" },
    cache: "no-store",
  });

  if (!response.ok) return new Response("Unable to load the live preview.", { status: 502 });

  let html = await response.text();
  html = html.replace(/<head([^>]*)>/i, `<head$1><base href="${liveSite}">`);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}