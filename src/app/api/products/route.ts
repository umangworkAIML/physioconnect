import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { IS_DEMO_MODE, fallbackProducts } from "@/lib/fallbackData";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    // ── Demo mode: return fallback data immediately ──
    if (IS_DEMO_MODE) {
      return NextResponse.json({
        products: fallbackProducts.slice((page - 1) * limit, page * limit),
        pagination: {
          page,
          limit,
          total: fallbackProducts.length,
          totalPages: Math.ceil(fallbackProducts.length / limit),
        },
      });
    }

    const where: Record<string, unknown> = { inStock: true };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    let orderBy: Record<string, string> = {};
    switch (sort) {
      case "price-low":
        orderBy = { price: "asc" };
        break;
      case "price-high":
        orderBy = { price: "desc" };
        break;
      case "rating":
        orderBy = { rating: "desc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Products fetch error:", error);

    // ── Fallback: DB failed, serve sample data instead of 500 ──
    return NextResponse.json({
      products: fallbackProducts,
      pagination: {
        page: 1,
        limit: 12,
        total: fallbackProducts.length,
        totalPages: 1,
      },
    });
  }
}
