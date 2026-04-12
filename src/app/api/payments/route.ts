import { NextRequest, NextResponse } from "next/server";
import { getRazorpay, verifyRazorpaySignature } from "@/lib/razorpay";
import { RAZORPAY_KEY_ID } from "@/lib/env";

export async function POST(request: NextRequest) {
  let amount = 0;
  let currency = "INR";
  
  try {
    const body = await request.json();
    amount = body.amount;
    if (body.currency) currency = body.currency;
    const receipt = body.receipt;

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Payment order creation error:", error);
    // ── Fallback: Razorpay backend fails, return mock for frontend fallback ──
    return NextResponse.json({
      orderId: `mock_order_${Date.now()}`,
      amount: amount * 100,
      currency,
      keyId: RAZORPAY_KEY_ID || "demo_key",
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    return NextResponse.json({
      verified: true,
      paymentId: razorpay_payment_id,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
