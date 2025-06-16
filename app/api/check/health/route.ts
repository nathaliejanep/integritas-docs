import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const status = "OK";
  console.log("Health test response: ", status);

  return NextResponse.json(status, { status: 200 });
}
