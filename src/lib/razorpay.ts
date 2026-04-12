import crypto from "crypto";
import Razorpay from "razorpay";
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

let razorpayInstance: Razorpay | null = null;

/**
 * Returns a singleton Razorpay instance.
 * Throws at startup if RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET are missing.
 */
export function getRazorpay(): Razorpay {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayInstance;
}

/**
 * Verifies a Razorpay payment signature using HMAC SHA256.
 * Returns `true` if the signature matches, `false` otherwise.
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}
