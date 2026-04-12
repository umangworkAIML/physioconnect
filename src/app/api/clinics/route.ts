import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { IS_DEMO_MODE, fallbackClinics } from "@/lib/fallbackData";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    // ── Demo mode: return fallback data immediately ──
    if (IS_DEMO_MODE) {
      return NextResponse.json({ clinics: fallbackClinics });
    }

    const where: Record<string, unknown> = { isActive: true };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
        { services: { has: search } },
      ];
    }

    const clinics = await prisma.clinic.findMany({
      where,
      orderBy: { rating: "desc" },
    });

    return NextResponse.json({ clinics });
  } catch (error) {
    console.error("Clinics fetch error:", error);

    // ── Fallback: DB failed, serve sample data instead of 500 ──
    return NextResponse.json({ clinics: fallbackClinics });
  }
}
