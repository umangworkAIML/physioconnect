import crypto from "crypto";
import Razorpay from "razorpay";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "./env";

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
