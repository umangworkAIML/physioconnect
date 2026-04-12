import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { IS_DEMO_MODE, fallbackVideos } from "@/lib/fallbackData";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");

    // ── Demo mode: return fallback data immediately ──
    if (IS_DEMO_MODE) {
      return NextResponse.json({ videos: fallbackVideos });
    }

    const where: Record<string, unknown> = { isActive: true };

    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;

    const videos = await prisma.physioDanceVideo.findMany({
      where,
      orderBy: { views: "desc" },
    });

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Physio Dance videos error:", error);

    // ── Fallback: DB failed, serve sample data instead of 500 ──
    return NextResponse.json({ videos: fallbackVideos });
  }
}
