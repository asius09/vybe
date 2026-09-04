import { NextRequest, NextResponse } from "next/server";
import { getCMSContent, updateCMSContent, resetCMSContent } from "@/lib/cms";

export async function GET() {
  const content = await getCMSContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = await updateCMSContent(body);
    return NextResponse.json({ ok: true, content: updated });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE() {
  const reset = await resetCMSContent();
  return NextResponse.json({ ok: true, content: reset });
}
