import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { IS_DEMO_MODE, fallbackTherapists } from "@/lib/fallbackData";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get("specialization");
    const homeVisit = searchParams.get("homeVisit");
    const onlineConsult = searchParams.get("onlineConsult");
    const minRate = searchParams.get("minRate");
    const maxRate = searchParams.get("maxRate");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    // ── Demo mode: return fallback data immediately ──
    if (IS_DEMO_MODE) {
      return NextResponse.json({
        therapists: fallbackTherapists.slice((page - 1) * limit, page * limit),
        pagination: {
          page,
          limit,
          total: fallbackTherapists.length,
          totalPages: Math.ceil(fallbackTherapists.length / limit),
        },
      });
    }

    const where: Record<string, unknown> = { verified: true };

    if (specialization) {
      where.specializations = { has: specialization };
    }
    if (homeVisit === "true") where.homeVisit = true;
    if (onlineConsult === "true") where.onlineConsult = true;
    if (minRate || maxRate) {
      where.hourlyRate = {};
      if (minRate) (where.hourlyRate as Record<string, number>).gte = parseInt(minRate);
      if (maxRate) (where.hourlyRate as Record<string, number>).lte = parseInt(maxRate);
    }
    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: "insensitive" } } },
        { specializations: { has: search } },
        { bio: { contains: search, mode: "insensitive" } },
      ];
    }

    const [therapists, total] = await Promise.all([
      prisma.therapistProfile.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true, avatar: true },
          },
        },
        orderBy: { rating: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.therapistProfile.count({ where }),
    ]);

    return NextResponse.json({
      therapists,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Therapists fetch error:", error);

    // ── Fallback: DB failed, serve sample data instead of 500 ──
    return NextResponse.json({
      therapists: fallbackTherapists,
      pagination: {
        page: 1,
        limit: 12,
        total: fallbackTherapists.length,
        totalPages: 1,
      },
    });
  }
}
