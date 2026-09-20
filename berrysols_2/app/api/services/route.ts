import {NextResponse} from "next/server";
import {getServices} from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const services = await getServices();
  if (services === null) {
    return NextResponse.json(
      {error: "Services are temporarily unavailable."},
      {status: 503, headers: {"Cache-Control": "no-store"}},
    );
  }

  return NextResponse.json(services, {headers: {"Cache-Control": "no-store"}});
}