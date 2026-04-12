"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  Video, Clock, Calendar, CheckCircle2, Monitor, Shield,
  ArrowRight, Star, MessageSquare,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Therapist {
  id: string;
  specializations: string[];
  experience: number;
  qualifications: string;
  hourlyRate: number;
  onlineConsult: boolean;
  rating: number;
  reviewCount: number;
  verified: boolean;
  user: { name: string; avatar: string | null };
}

const features = [
  { icon: Video, title: "HD Video Call", desc: "Crystal clear video consultations" },
  { icon: Shield, title: "100% Private", desc: "End-to-end encrypted sessions" },
  { icon: Clock, title: "Flexible Timing", desc: "Book slots that suit your schedule" },
  { icon: MessageSquare, title: "Chat Support", desc: "Message your therapist anytime" },
];

export default function ConsultationPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingModal, setBookingModal] = useState<Therapist | null>(null);
  const [bookingForm, setBookingForm] = useState({ date: "", time: "" });
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    fetch("/api/therapists?onlineConsult=true")
      .then((res) => res.json())
      .then((data) => setTherapists(data.therapists || []))
      .catch(() => setTherapists([]))
      .finally(() => setLoading(false));
  }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { router.push("/login"); return; }
    if (!bookingModal) return;

    const scheduledAt = `${bookingForm.date}T${bookingForm.time}:00`;

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          therapistId: bookingModal.id,
          scheduledAt,
          amount: bookingModal.hourlyRate,
          duration: 30,
        }),
      });
      if (res.ok) {
        setBooked(true);
        setTimeout(() => {
          setBookingModal(null);
          setBooked(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-border/50">
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge badge-accent mb-4 inline-block">Online Consultation</span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Expert Physio Care,{" "}
                <span className="gradient-text">From Home</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Connect with certified physiotherapists via secure video call.
                Get professional diagnosis, exercise prescriptions, and follow-up care.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{f.title}</p>
                      <p className="text-xs text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-border/50">
                <div className="bg-gradient-to-br from-accent to-purple-600 rounded-2xl p-8 text-white text-center">
                  <Monitor className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Video Consultation</h3>
                  <p className="text-white/70">Starting from ₹500</p>
                </div>
                <div className="mt-6 space-y-3">
                  {["Choose your therapist", "Select date & time", "Join video call"].map((step, i) => (
                    <div key={step} className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">
                        {i + 1}
                      </div>
                      <span className="text-sm font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Therapists */}
      <div className="container-custom py-12">
        <h2 className="text-2xl font-bold mb-2">Available for Online Consultation</h2>
        <p className="text-muted-foreground mb-8">Book a video session with our top-rated therapists</p>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full skeleton" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-32 skeleton" />
                    <div className="h-4 w-48 skeleton" />
                  </div>
                </div>
                <div className="h-10 skeleton" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapists.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border/50 p-6 card-hover"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">{t.user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t.user.name}</h3>
                    <p className="text-xs text-muted-foreground">{t.qualifications}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium">{t.rating.toFixed(1)}</span>
                      <span className="text-xs text-muted-foreground">• {t.experience} yrs</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.specializations.slice(0, 2).map((s) => (
                    <span key={s} className="badge badge-accent text-[10px]">{s}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div>
                    <span className="text-lg font-bold text-accent">{formatPrice(t.hourlyRate)}</span>
                    <span className="text-xs text-muted-foreground"> / 30 min</span>
                  </div>
                  <button
                    onClick={() => setBookingModal(t)}
                    className="btn btn-accent btn-sm"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => !booked && setBookingModal(null)}>
          <div className="bg-card rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
            {booked ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Consultation Booked!</h3>
                <p className="text-muted-foreground">A meeting link will be shared soon.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-1">Book Consultation</h3>
                <p className="text-sm text-muted-foreground mb-6">with {bookingModal.user.name}</p>

                <form onSubmit={handleBook} className="space-y-4">
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
                    <label className="text-sm font-medium mb-1 block">Time</label>
                    <input
                      type="time"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                    <span className="text-sm font-medium">Session Fee</span>
                    <span className="font-bold text-accent">{formatPrice(bookingModal.hourlyRate)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="btn btn-accent flex-1">
                      <Calendar className="w-4 h-4" /> Confirm
                    </button>
                    <button type="button" onClick={() => setBookingModal(null)} className="btn btn-ghost">
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
