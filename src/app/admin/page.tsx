"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Users, Calendar, Package, DollarSign, TrendingUp,
  Clock, ShoppingBag, Stethoscope, BarChart3,
} from "lucide-react";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";

interface DashboardData {
  stats: {
    totalUsers: number;
    totalTherapists: number;
    totalBookings: number;
    totalOrders: number;
    totalRevenue: number;
  };
  recentBookings: {
    id: string;
    date: string;
    timeSlot: string;
    status: string;
    amount: number;
    patient: { name: string };
    therapist: { user: { name: string } };
  }[];
  recentOrders: {
    id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    user: { name: string };
  }[];
}

const statusColors: Record<string, string> = {
  PENDING: "badge-warning",
  CONFIRMED: "badge-primary",
  COMPLETED: "badge-success",
  CANCELLED: "badge-destructive",
  PAID: "badge-success",
  PROCESSING: "badge-primary",
  SHIPPED: "badge-accent",
  DELIVERED: "badge-success",
};

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "ADMIN")) {
      router.push("/dashboard");
      return;
    }
    if (user && user.role === "ADMIN") {
      fetch("/api/admin/dashboard")
        .then((r) => r.json())
        .then(setData)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user, authLoading, router]);

  if (authLoading || loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (user.role !== "ADMIN") return null;

  const stats = data?.stats || {
    totalUsers: 0,
    totalTherapists: 0,
    totalBookings: 0,
    totalOrders: 0,
    totalRevenue: 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-muted-foreground">Platform overview and management</p>
          </div>
          <span className="badge badge-accent">Admin</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Users", value: stats.totalUsers, color: "text-blue-500", bg: "bg-blue-50" },
            { icon: Stethoscope, label: "Therapists", value: stats.totalTherapists, color: "text-teal-500", bg: "bg-teal-50" },
            { icon: Calendar, label: "Bookings", value: stats.totalBookings, color: "text-purple-500", bg: "bg-purple-50" },
            { icon: Package, label: "Orders", value: stats.totalOrders, color: "text-amber-500", bg: "bg-amber-50" },
            { icon: DollarSign, label: "Revenue", value: formatPrice(stats.totalRevenue), color: "text-green-500", bg: "bg-green-50" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl border border-border p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Management Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { href: "/admin/therapists", icon: Stethoscope, label: "Manage Therapists" },
            { href: "/admin/products", icon: ShoppingBag, label: "Manage Products" },
            { href: "/admin/bookings", icon: Calendar, label: "View Bookings" },
            { href: "/admin/orders", icon: Package, label: "View Orders" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-card rounded-2xl border border-border p-5 card-hover flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <link.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium text-sm">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" /> Recent Bookings
            </h2>
            <div className="space-y-3">
              {(data?.recentBookings || []).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                  <div>
                    <p className="text-sm font-medium">{booking.patient.name}</p>
                    <p className="text-xs text-muted-foreground">
                      with {booking.therapist.user.name} • {formatDate(booking.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${statusColors[booking.status]} text-[10px]`}>{booking.status}</span>
                    <p className="text-xs font-medium mt-1">{formatPrice(booking.amount)}</p>
                  </div>
                </div>
              ))}
              {(!data?.recentBookings || data.recentBookings.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">No bookings yet</p>
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" /> Recent Orders
            </h2>
            <div className="space-y-3">
              {(data?.recentOrders || []).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                  <div>
                    <p className="text-sm font-medium">{order.user.name}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${statusColors[order.status]} text-[10px]`}>{order.status}</span>
                    <p className="text-xs font-medium mt-1">{formatPrice(order.totalAmount)}</p>
                  </div>
                </div>
              ))}
              {(!data?.recentOrders || data.recentOrders.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">No orders yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
