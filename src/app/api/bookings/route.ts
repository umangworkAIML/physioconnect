import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json();
    const { therapistId, date, timeSlot, type, address, notes, amount } = body;

    if (!therapistId || !date || !timeSlot || !type || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (type === "HOME_VISIT" && !address) {
      return NextResponse.json({ error: "Address required for home visits" }, { status: 400 });
    }

    const therapist = await prisma.therapistProfile.findUnique({
      where: { id: therapistId },
    });

    if (!therapist) {
      return NextResponse.json({ error: "Therapist not found" }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        patientId: user.id,
        therapistId,
        date: new Date(date),
        timeSlot,
        type,
        address: address || null,
        notes: notes || null,
        amount,
        status: "PENDING",
      },
      include: {
        therapist: {
          include: { user: { select: { name: true } } },
        },
      },
    });

    return NextResponse.json({ booking, message: "Booking created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: { patientId: user.id },
      include: {
        therapist: {
          include: {
            user: { select: { name: true, avatar: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Bookings fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
