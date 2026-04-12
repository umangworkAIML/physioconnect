"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Stethoscope,
  MapPin,
  Video,
  ShoppingBag,
  Star,
  ArrowRight,
  CheckCircle2,
  Users,
  Clock,
  Shield,
  Home,
  Monitor,
  Music,
  ChevronRight,
  Heart,
  Phone,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  {
    icon: Home,
    title: "Home Visits",
    description: "Certified physiotherapists at your doorstep in Ahmedabad. Convenient, personalized care at home.",
    href: "/therapists",
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50",
  },
  {
    icon: MapPin,
    title: "Find Clinics",
    description: "Discover top-rated physiotherapy clinics near you with real-time maps and ratings.",
    href: "/clinics",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Monitor,
    title: "Online Consultation",
    description: "Connect with expert physiotherapists via video call. Professional advice from anywhere.",
    href: "/consultation",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Music,
    title: "Physio Dance",
    description: "Fun, guided therapeutic dance sessions designed to improve mobility and reduce pain.",
    href: "/physio-dance",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
  },
  {
    icon: ShoppingBag,
    title: "Recovery Shop",
    description: "Premium pain relief products, massage guns, and posture correctors delivered to you.",
    href: "/shop",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
  },
];

const stats = [
  { value: "500+", label: "Therapists", icon: Users },
  { value: "50K+", label: "Sessions Completed", icon: CheckCircle2 },
  { value: "4.9", label: "Average Rating", icon: Star },
  { value: "24/7", label: "Support", icon: Clock },
];

const testimonials = [
  {
    name: "Priya Patel",
    role: "Patient",
    text: "PhysioConnect changed my recovery journey. The home visit option was incredibly convenient after my knee surgery.",
    rating: 5,
  },
  {
    name: "Dr. Rajesh Sharma",
    role: "Physiotherapist",
    text: "As a therapist, this platform helps me reach more patients efficiently. The booking system is seamless.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Patient",
    text: "The Physio Dance sessions are amazing! They make therapy fun and I've seen real improvement in my mobility.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <span className="badge badge-primary text-sm px-4 py-2 mb-4 inline-block">
                  🏥 #1 Physiotherapy Platform in Ahmedabad
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
              >
                Your Path to{" "}
                <span className="gradient-text">Pain-Free</span>{" "}
                Living Starts Here
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                Book certified physiotherapists, discover clinics, join therapeutic dance sessions,
                and shop premium recovery products — all in one platform.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/therapists" className="btn btn-primary btn-lg">
                  Find a Therapist
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/consultation" className="btn btn-outline btn-lg">
                  <Video className="w-5 h-5" />
                  Online Consultation
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trusted by <strong className="text-foreground">50,000+</strong> patients
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content — Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-border/50">
                  <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 text-white mb-6">
                    <Stethoscope className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Expert Care, Your Way</h3>
                    <p className="text-white/80">Home visits • Clinic • Online</p>
                  </div>

                  <div className="space-y-4">
                    {["Licensed & Verified Therapists", "Flexible Scheduling", "Secure Online Payments"].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Card 1 */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-lg border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Booking Confirmed</p>
                      <p className="text-sm font-semibold">Dr. Sarah K.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Card 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-6 bg-white rounded-2xl p-4 shadow-lg border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Patient Rating</p>
                      <p className="text-sm font-semibold">4.9 / 5.0</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-6 border-y border-border/50 bg-white/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 justify-center py-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="section bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="badge badge-primary mb-4 inline-block">
              Our Services
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for{" "}
              <span className="gradient-text">Recovery</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
              From home visits to therapeutic dance — we offer a complete physiotherapy ecosystem
              designed for your convenience and recovery.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeInUp}>
                <Link
                  href={service.href}
                  className="group block bg-card rounded-2xl p-6 border border-border/50 card-hover h-full"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className="badge badge-accent mb-4 inline-block">
                Why PhysioConnect
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
                Trusted by Thousands in{" "}
                <span className="gradient-text">Ahmedabad</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground mb-8 leading-relaxed">
                We connect you with the best physiotherapists in the city, ensuring quality care,
                transparent pricing, and a seamless booking experience.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-5">
                {[
                  { icon: Shield, title: "Verified Professionals", desc: "Every therapist is licensed and background-verified" },
                  { icon: Clock, title: "Flexible Scheduling", desc: "Book sessions that fit your lifestyle — mornings, evenings, weekends" },
                  { icon: Heart, title: "Affordable Care", desc: "Transparent pricing with no hidden charges" },
                  { icon: Phone, title: "24/7 Support", desc: "Our care team is always available to help you" },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="relative bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-10 text-white">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl" />
                <h3 className="text-3xl font-bold mb-6">Book Your First Session</h3>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Get started with a professional physiotherapy session today. Our top-rated therapists are ready to help.
                </p>
                <div className="space-y-4 mb-8">
                  {["Choose a therapist", "Pick your preferred time", "Get treated at home or clinic"].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </div>
                      <span className="text-white/90">{step}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/therapists"
                  className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="badge badge-primary mb-4 inline-block">
              Testimonials
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="gradient-text">Patients</span> Say
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                className="bg-card rounded-2xl p-6 border border-border/50 card-hover"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Recovery?
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                Join thousands of patients in Ahmedabad who have found relief and recovery
                through PhysioConnect. Book your first session today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors shadow-lg"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Browse Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
