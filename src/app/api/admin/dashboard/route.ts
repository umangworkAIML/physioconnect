import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateRequest, requireRole } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user || !requireRole(user.role, ["ADMIN"])) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const [
      totalUsers,
      totalTherapists,
      totalBookings,
      totalOrders,
      totalRevenue,
      recentBookings,
      recentOrders,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.therapistProfile.count(),
      prisma.booking.count(),
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: { status: "PAID" } }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          patient: { select: { name: true } },
          therapist: { include: { user: { select: { name: true } } } },
        },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true } },
          items: true,
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalTherapists,
        totalBookings,
        totalOrders,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
      },
      recentBookings,
      recentOrders,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
