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
    const { therapistId, scheduledAt, duration = 30, amount } = body;

    if (!therapistId || !scheduledAt || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const therapist = await prisma.therapistProfile.findUnique({
      where: { id: therapistId },
    });

    if (!therapist || !therapist.onlineConsult) {
      return NextResponse.json({ error: "Therapist not available for online consultation" }, { status: 400 });
    }

    const meetingLink = `https://meet.physioconnect.in/${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const consultation = await prisma.consultation.create({
      data: {
        patientId: user.id,
        therapistId,
        scheduledAt: new Date(scheduledAt),
        duration,
        amount,
        meetingLink,
        status: "SCHEDULED",
      },
      include: {
        therapist: { include: { user: { select: { name: true } } } },
      },
    });

    return NextResponse.json({ consultation, message: "Consultation scheduled" }, { status: 201 });
  } catch (error) {
    console.error("Consultation creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const consultations = await prisma.consultation.findMany({
      where: { patientId: user.id },
      include: {
        therapist: { include: { user: { select: { name: true, avatar: true } } } },
      },
      orderBy: { scheduledAt: "desc" },
    });

    return NextResponse.json({ consultations });
  } catch (error) {
    console.error("Consultations fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
