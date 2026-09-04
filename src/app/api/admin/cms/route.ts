import { NextRequest, NextResponse } from "next/server";
import { getCMSContent, updateCMSContent, resetCMSContent } from "@/lib/cms";

export async function GET() {
  return NextResponse.json(getCMSContent());
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = updateCMSContent(body);
    return NextResponse.json({ ok: true, content: updated });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE() {
  const reset = resetCMSContent();
  return NextResponse.json({ ok: true, content: reset });
}
