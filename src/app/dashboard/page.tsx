"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Calendar, Package, Video, Clock, CheckCircle2,
  AlertCircle, ChevronRight, User, MapPin,
} from "lucide-react";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";

interface Booking {
  id: string;
  date: string;
  timeSlot: string;
  type: string;
  status: string;
  amount: number;
  therapist: { user: { name: string } };
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: { product: { name: string } }[];
}

const statusColors: Record<string, string> = {
  PENDING: "badge-warning",
  CONFIRMED: "badge-primary",
  IN_PROGRESS: "badge-accent",
  COMPLETED: "badge-success",
  CANCELLED: "badge-destructive",
  PAID: "badge-success",
  PROCESSING: "badge-primary",
  SHIPPED: "badge-accent",
  DELIVERED: "badge-success",
  SCHEDULED: "badge-primary",
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }
    if (user) {
      Promise.all([
        fetch("/api/bookings").then((r) => r.json()).catch(() => ({ bookings: [] })),
        fetch("/api/orders").then((r) => r.json()).catch(() => ({ orders: [] })),
      ]).then(([bookingsData, ordersData]) => {
        setBookings(bookingsData.bookings || []);
        setOrders(ordersData.orders || []);
        setLoading(false);
      });
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const upcomingBookings = bookings.filter((b) => ["PENDING", "CONFIRMED"].includes(b.status));
  const activeOrders = orders.filter((o) => ["PENDING", "PAID", "PROCESSING", "SHIPPED"].includes(o.status));

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Welcome back, {user.name.split(" ")[0]}!</h1>
          <p className="text-muted-foreground">Here&apos;s an overview of your activity</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Calendar, label: "Bookings", value: bookings.length, color: "text-primary" },
            { icon: Clock, label: "Upcoming", value: upcomingBookings.length, color: "text-amber-500" },
            { icon: Package, label: "Orders", value: orders.length, color: "text-accent" },
            { icon: Video, label: "Active Orders", value: activeOrders.length, color: "text-green-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl border border-border p-5">
              <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bookings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Bookings</h2>
              <Link href="/therapists" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                Book New <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-xl border border-border p-4">
                    <div className="h-4 w-40 skeleton mb-2" />
                    <div className="h-3 w-32 skeleton" />
                  </div>
                ))
              ) : bookings.length === 0 ? (
                <div className="bg-card rounded-2xl border border-border p-8 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
                  <p className="font-medium mb-1">No bookings yet</p>
                  <p className="text-sm text-muted-foreground mb-4">Find a therapist and book your first session</p>
                  <Link href="/therapists" className="btn btn-primary btn-sm">Find Therapists</Link>
                </div>
              ) : (
                bookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{booking.therapist.user.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(booking.date)}
                          </span>
                          <span>{booking.timeSlot}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`badge ${statusColors[booking.status]} text-[10px]`}>
                            {booking.status}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {booking.type.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                      <span className="font-semibold text-primary">{formatPrice(booking.amount)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Orders */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Orders</h2>
              <Link href="/shop" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                Shop More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-xl border border-border p-4">
                    <div className="h-4 w-40 skeleton mb-2" />
                    <div className="h-3 w-32 skeleton" />
                  </div>
                ))
              ) : orders.length === 0 ? (
                <div className="bg-card rounded-2xl border border-border p-8 text-center">
                  <Package className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
                  <p className="font-medium mb-1">No orders yet</p>
                  <p className="text-sm text-muted-foreground mb-4">Browse our shop for recovery products</p>
                  <Link href="/shop" className="btn btn-primary btn-sm">Browse Shop</Link>
                </div>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">
                          {order.items.map((i) => i.product.name).join(", ").substring(0, 50)}
                          {order.items.map((i) => i.product.name).join(", ").length > 50 ? "..." : ""}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(order.createdAt)} • {order.items.length} item(s)
                        </p>
                        <span className={`badge ${statusColors[order.status]} text-[10px] mt-2 inline-block`}>
                          {order.status}
                        </span>
                      </div>
                      <span className="font-semibold text-primary">{formatPrice(order.totalAmount)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: "/therapists", icon: User, label: "Find Therapist", color: "from-teal-500 to-emerald-500" },
              { href: "/consultation", icon: Video, label: "Online Consult", color: "from-purple-500 to-violet-500" },
              { href: "/physio-dance", icon: Calendar, label: "Physio Dance", color: "from-pink-500 to-rose-500" },
              { href: "/shop", icon: Package, label: "Shop Products", color: "from-amber-500 to-orange-500" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="bg-card rounded-2xl border border-border p-5 text-center card-hover"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium">{action.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
