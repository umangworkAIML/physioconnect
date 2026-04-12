"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Star, MapPin, Clock, Home, Monitor, Shield, ArrowLeft,
  Calendar, CheckCircle2, Phone,
} from "lucide-react";
import { formatPrice, DAYS_OF_WEEK, generateTimeSlots } from "@/lib/utils";

interface TherapistDetail {
  id: string;
  specializations: string[];
  experience: number;
  bio: string;
  qualifications: string;
  hourlyRate: number;
  homeVisit: boolean;
  clinicVisit: boolean;
  onlineConsult: boolean;
  rating: number;
  reviewCount: number;
  verified: boolean;
  address: string | null;
  user: { id: string; name: string; email: string; avatar: string | null };
  availability: { dayOfWeek: number; startTime: string; endTime: string; isActive: boolean }[];
  reviews: { id: string; rating: number; comment: string; user: { name: string } }[];
}

export default function TherapistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const [therapist, setTherapist] = useState<TherapistDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: "",
    timeSlot: "",
    type: "HOME_VISIT" as string,
    address: "",
    notes: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/therapists/${id}`)
      .then((res) => res.json())
      .then((data) => setTherapist(data.therapist))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    setBookingLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          therapistId: therapist!.id,
          date: bookingForm.date,
          timeSlot: bookingForm.timeSlot,
          type: bookingForm.type,
          address: bookingForm.address,
          notes: bookingForm.notes,
          amount: therapist!.hourlyRate,
        }),
      });

      if (res.ok) {
        setBookingSuccess(true);
        setTimeout(() => {
          setShowBooking(false);
          setBookingSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Therapist not found</h2>
          <Link href="/therapists" className="btn btn-primary mt-4">Browse Therapists</Link>
        </div>
      </div>
    );
  }

  const availableSlots = therapist.availability.length > 0
    ? generateTimeSlots(therapist.availability[0].startTime, therapist.availability[0].endTime)
    : generateTimeSlots("09:00", "18:00");

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <Link href="/therapists" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Therapists
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-white">{therapist.user.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">{therapist.user.name}</h1>
                      <p className="text-muted-foreground">{therapist.qualifications}</p>
                    </div>
                    {therapist.verified && (
                      <span className="badge badge-success flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {therapist.specializations.map((s) => (
                      <span key={s} className="badge badge-primary">{s}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mt-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <strong>{therapist.rating.toFixed(1)}</strong>
                      <span className="text-muted-foreground">({therapist.reviewCount} reviews)</span>
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" /> {therapist.experience} years exp
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">{therapist.bio}</p>

              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {therapist.homeVisit && (
                  <div className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                    <Home className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Home Visit</span>
                  </div>
                )}
                {therapist.clinicVisit && (
                  <div className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Clinic Visit</span>
                  </div>
                )}
                {therapist.onlineConsult && (
                  <div className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                    <Monitor className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Online Consult</span>
                  </div>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {therapist.availability.length > 0 ? (
                  therapist.availability.map((a, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                      <span className="text-sm font-medium">{DAYS_OF_WEEK[a.dayOfWeek]}</span>
                      <span className="text-sm text-muted-foreground">{a.startTime} - {a.endTime}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">Contact for availability</p>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              {therapist.reviews.length > 0 ? (
                <div className="space-y-4">
                  {therapist.reviews.map((r) => (
                    <div key={r.id} className="p-4 bg-secondary rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{r.user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{r.user.name}</p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: r.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No reviews yet</p>
              )}
            </div>
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-primary">{formatPrice(therapist.hourlyRate)}</p>
                <p className="text-sm text-muted-foreground">per session</p>
              </div>

              {!showBooking ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowBooking(true)}
                    className="btn btn-primary w-full btn-lg"
                  >
                    <Calendar className="w-5 h-5" /> Book Session
                  </button>
                  <a
                    href={`tel:+919876543210`}
                    className="btn btn-outline w-full"
                  >
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                </div>
              ) : bookingSuccess ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Booking Confirmed!</h3>
                  <p className="text-sm text-muted-foreground">You&apos;ll receive a confirmation shortly</p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Date</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="input"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Time Slot</label>
                    <select
                      value={bookingForm.timeSlot}
                      onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                      className="input"
                      required
                    >
                      <option value="">Select a time</option>
                      {availableSlots.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Session Type</label>
                    <select
                      value={bookingForm.type}
                      onChange={(e) => setBookingForm({ ...bookingForm, type: e.target.value })}
                      className="input"
                    >
                      {therapist.homeVisit && <option value="HOME_VISIT">Home Visit</option>}
                      {therapist.clinicVisit && <option value="CLINIC_VISIT">Clinic Visit</option>}
                      {therapist.onlineConsult && <option value="ONLINE">Online</option>}
                    </select>
                  </div>

                  {bookingForm.type === "HOME_VISIT" && (
                    <div>
                      <label className="text-sm font-medium mb-1 block">Address</label>
                      <textarea
                        value={bookingForm.address}
                        onChange={(e) => setBookingForm({ ...bookingForm, address: e.target.value })}
                        className="input min-h-[80px] resize-none"
                        placeholder="Your address in Ahmedabad"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium mb-1 block">Notes (Optional)</label>
                    <textarea
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      className="input min-h-[60px] resize-none"
                      placeholder="Any specific concerns..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <button type="submit" disabled={bookingLoading} className="btn btn-primary flex-1">
                      {bookingLoading ? "Booking..." : "Confirm Booking"}
                    </button>
                    <button type="button" onClick={() => setShowBooking(false)} className="btn btn-ghost">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
