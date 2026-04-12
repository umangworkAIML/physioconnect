"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, Filter, Star, MapPin, Clock, Home, Monitor,
  ChevronDown, X, ArrowRight, Stethoscope,
} from "lucide-react";
import { formatPrice, SPECIALIZATIONS } from "@/lib/utils";

interface Therapist {
  id: string;
  specializations: string[];
  experience: number;
  bio: string;
  qualifications: string;
  hourlyRate: number;
  homeVisit: boolean;
  onlineConsult: boolean;
  rating: number;
  reviewCount: number;
  verified: boolean;
  address: string | null;
  user: { id: string; name: string; avatar: string | null };
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function TherapistsPage() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [homeVisitOnly, setHomeVisitOnly] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchTherapists();
  }, [specialization, homeVisitOnly, onlineOnly]);

  const fetchTherapists = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (specialization) params.set("specialization", specialization);
    if (homeVisitOnly) params.set("homeVisit", "true");
    if (onlineOnly) params.set("onlineConsult", "true");

    try {
      const res = await fetch(`/api/therapists?${params}`);
      const data = await res.json();
      setTherapists(data.therapists || []);
    } catch {
      setTherapists([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTherapists();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50">
        <div className="container-custom py-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Therapist</h1>
          <p className="text-muted-foreground">Certified physiotherapists in Ahmedabad, ready to help you recover</p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 flex gap-3 max-w-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, specialization..."
                className="input pl-11"
              />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-secondary lg:hidden"
            >
              <Filter className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="bg-card rounded-2xl border border-border p-5 sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                <button
                  className="lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Specialization */}
              <div>
                <label className="text-sm font-medium mb-2 block">Specialization</label>
                <div className="relative">
                  <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="input appearance-none pr-10"
                  >
                    <option value="">All Specializations</option>
                    {SPECIALIZATIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={homeVisitOnly}
                    onChange={(e) => setHomeVisitOnly(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm">Home Visit Available</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlineOnly}
                    onChange={(e) => setOnlineOnly(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm">Online Consultation</span>
                </label>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  setSpecialization("");
                  setHomeVisitOnly(false);
                  setOnlineOnly(false);
                  setSearch("");
                }}
                className="btn btn-ghost text-sm w-full"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {loading ? "Loading..." : `${therapists.length} therapists found`}
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-full skeleton" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-40 skeleton" />
                        <div className="h-4 w-60 skeleton" />
                        <div className="h-4 w-32 skeleton" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : therapists.length === 0 ? (
              <div className="text-center py-20">
                <Stethoscope className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No therapists found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {therapists.map((t, i) => (
                  <motion.div
                    key={t.id}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/therapists/${t.id}`}
                      className="block bg-card rounded-2xl border border-border/50 p-6 card-hover"
                    >
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <span className="text-xl font-bold text-white">
                            {t.user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-lg">{t.user.name}</h3>
                              <p className="text-sm text-muted-foreground">{t.qualifications}</p>
                            </div>
                            {t.verified && (
                              <span className="badge badge-success text-[10px] flex-shrink-0">Verified</span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {t.specializations.slice(0, 3).map((s) => (
                              <span key={s} className="badge badge-primary">{s}</span>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              {t.rating.toFixed(1)} ({t.reviewCount})
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {t.experience} yrs
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                            <div className="flex gap-2">
                              {t.homeVisit && (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Home className="w-3.5 h-3.5" /> Home
                                </span>
                              )}
                              {t.onlineConsult && (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Monitor className="w-3.5 h-3.5" /> Online
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary">
                                {formatPrice(t.hourlyRate)}
                              </span>
                              <span className="text-xs text-muted-foreground">/session</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
