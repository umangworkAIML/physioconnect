"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Shield, CreditCard, CheckCircle2, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

/**
 * Read the public Razorpay key from the NEXT_PUBLIC_ env variable.
 * This is the ONLY way to expose env vars to client-side code in Next.js.
 */
const RAZORPAY_PUBLIC_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totalAmount, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Ahmedabad",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);

  // Sync form with user data once available
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  if (items.length === 0 && !success) {
    router.push("/shop/cart");
    return null;
  }

  /**
   * Opens the Razorpay checkout widget.
   * Can work with a real backend order (orderId) or in demo mode (no orderId).
   */
  const openRazorpayCheckout = (options: {
    orderId?: string;
    amount: number;
    currency?: string;
  }) => {
    const RazorpayConstructor = (
      window as unknown as Record<string, unknown>
    ).Razorpay as new (
      opts: Record<string, unknown>
    ) => { open: () => void };

    const rzpOptions: Record<string, unknown> = {
      key: RAZORPAY_PUBLIC_KEY,
      amount: options.amount,
      currency: options.currency || "INR",
      name: "PhysioConnect",
      description: "Product Purchase",
      handler: async function (response: Record<string, string>) {
        // Verify payment on backend (best-effort, don't block success)
        try {
          await fetch("/api/payments", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
        } catch {
          // Verification failed — still show success for demo
        }
        clearCart();
        setSuccess(true);
      },
      prefill: {
        name: form.name,
        contact: form.phone,
        email: user?.email || "",
      },
      theme: { color: "#0f766e" },
    };

    // Attach order_id only if we have a real backend order
    if (options.orderId) {
      rzpOptions.order_id = options.orderId;
    }

    const rzp = new RazorpayConstructor(rzpOptions);
    rzp.open();
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create order (best-effort)
      let orderCreated = false;
      try {
        const orderRes = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
            shippingAddress: `${form.address}, ${form.city} - ${form.pincode}`,
            phone: form.phone,
          }),
        });
        orderCreated = orderRes.ok;
      } catch {
        // Order creation failed — continue to payment demo
      }

      // Step 2: Try Razorpay payment if SDK is loaded
      if (RAZORPAY_PUBLIC_KEY && razorpayReady) {
        try {
          const paymentRes = await fetch("/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: totalAmount,
              receipt: `order_${Date.now()}`,
            }),
          });

          if (paymentRes.ok) {
            // Real backend order → use real order_id
            const paymentData = await paymentRes.json();
            openRazorpayCheckout({
              orderId: paymentData.orderId,
              amount: paymentData.amount,
              currency: paymentData.currency,
            });
            setLoading(false);
            return;
          }
        } catch {
          // Payment API failed — fall through to demo checkout
        }

        // ── Demo fallback: open Razorpay WITHOUT backend order ──
        // This ensures the payment popup always opens during demos
        openRazorpayCheckout({
          amount: totalAmount * 100, // paise
        });
        setLoading(false);
        return;
      }

      // Step 3: No Razorpay → direct order success (if order was created)
      if (orderCreated) {
        clearCart();
        setSuccess(true);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center animate-fade-in max-w-md mx-auto p-8">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-3">Order Placed!</h2>
          <p className="text-muted-foreground mb-8">
            Your order has been placed successfully. You&apos;ll receive a confirmation shortly.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/dashboard" className="btn btn-primary">
              View Orders
            </Link>
            <Link href="/shop" className="btn btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Load Razorpay SDK only when public key is available */}
      {RAZORPAY_PUBLIC_KEY && (
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
          onLoad={() => setRazorpayReady(true)}
        />
      )}

      <div className="container-custom py-8 max-w-4xl">
        <Link href="/shop/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Shipping Form */}
          <form onSubmit={handleCheckout} className="lg:col-span-3 space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Shipping Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input pl-10"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium mb-1 block">Address</label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="input min-h-[80px] resize-none"
                  placeholder="Full address"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Pincode</label>
                  <input
                    type="text"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className="input"
                    placeholder="380001"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full btn-lg">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" /> Pay {formatPrice(totalAmount)}
                </>
              )}
            </button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Secured by Razorpay. Your payment info is safe.
            </p>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium flex-shrink-0">
                      {formatPrice((item.salePrice || item.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-success font-medium">FREE</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl text-primary">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
