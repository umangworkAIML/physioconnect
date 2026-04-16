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
    text: "PhysioJoy changed my recovery journey. The home visit option was incredibly convenient after my knee surgery.",
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
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] opacity-70 mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] opacity-60 mix-blend-multiply" />

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
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 text-primary text-sm font-semibold shadow-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  #1 Physiotherapy Platform
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-[1.1] tracking-tight text-foreground"
              >
                Your Path to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-accent">
                  Pain-Free
                </span>{" "}
                Living Starts Here
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
              >
                Book certified physiotherapists, discover clinics, join therapeutic dance sessions,
                and shop premium recovery products — all in one platform.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Link href="/therapists" className="btn btn-primary btn-lg rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 py-4 px-8 text-lg w-full sm:w-auto">
                  Find a Therapist
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/consultation" className="btn shadow-sm bg-white hover:bg-slate-50 text-foreground border border-border btn-lg rounded-full py-4 px-8 text-lg w-full sm:w-auto">
                  <Video className="w-5 h-5 text-primary" />
                  Online Consult
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-white bg-gradient-to-br from-primary-light to-primary flex items-center justify-center text-white text-sm font-bold shadow-md"
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

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Floating Abstract Element */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[2.5rem] blur opacity-20" />
                
                {/* Main Card */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white/50">
                  <div className="bg-gradient-to-br from-primary to-primary-light rounded-[1.5rem] p-8 text-white mb-8 shadow-lg shadow-primary/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
                    <Stethoscope className="w-14 h-14 mb-5 text-white/90" />
                    <h3 className="text-3xl font-heading font-bold mb-2">Expert Care,<br/>Your Way</h3>
                    <p className="text-white/80 font-medium">Home visits • Clinic • Online</p>
                  </div>

                  <div className="space-y-5">
                    {["Licensed & Verified Therapists", "Flexible Scheduling Options", "Secure Online Payments"].map((item) => (
                      <div key={item} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-foreground font-medium">{item}</span>
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
      <section className="py-12 bg-white border-y border-border/20 z-20 relative shadow-sm">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-3xl font-heading font-extrabold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeInUp}>
                <Link
                  href={service.href}
                  className="group block bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-primary/10 transition-all duration-300 h-full relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-bl-full`} />
                  <div
                    className={`w-16 h-16 rounded-[1.25rem] bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-md shadow-${service.color.split("-")[1]}/30 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6 font-medium">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wide group-hover:gap-3 transition-all">
                    <span>Explore Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section bg-gradient-to-b from-white to-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className="badge bg-secondary text-primary border border-primary/10 mb-4 inline-block px-4 py-2 text-sm font-semibold">
                Why PhysioJoy
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading font-extrabold mb-6 tracking-tight">
                Trusted by Thousands in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Ahmedabad</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10 leading-relaxed font-medium">
                We connect you with the best physiotherapists in the city, ensuring quality care,
                transparent pricing, and a seamless booking experience.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-6">
                {[
                  { icon: Shield, title: "Verified Professionals", desc: "Every therapist is licensed and background-verified" },
                  { icon: Clock, title: "Flexible Scheduling", desc: "Book sessions that fit your lifestyle — mornings, evenings, weekends" },
                  { icon: Heart, title: "Affordable Care", desc: "Transparent pricing with no hidden charges" },
                  { icon: Phone, title: "24/7 Support", desc: "Our care team is always available to help you" },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    className="flex gap-5 items-start p-4 rounded-3xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-border/50"
                  >
                    <div className="w-14 h-14 rounded-[1.25rem] bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-border/50">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg mb-1 text-foreground">{item.title}</h4>
                      <p className="text-base text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative bg-[#0284c7] rounded-[2.5rem] p-12 text-white shadow-2xl overflow-hidden border border-white/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8] rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0369a1] rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl opacity-50" />
                
                <div className="relative z-10">
                  <h3 className="text-4xl font-heading font-extrabold mb-6 leading-tight">Quick & Simple<br/>Booking</h3>
                  <p className="text-white/90 text-lg mb-10 leading-relaxed font-medium">
                    Get started with a professional physiotherapy session today. Our top-rated therapists are ready to help.
                  </p>
                  
                  <div className="space-y-6 mb-10">
                    {[
                      { title: "Choose a therapist", desc: "Browse profiles and reviews" },
                      { title: "Pick preferred time", desc: "Select a slot that works for you" },
                      { title: "Get treated instantly", desc: "At home, clinic, or online" }
                    ].map((step, i) => (
                      <div key={step.title} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary text-xl font-bold shadow-lg">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{step.title}</p>
                          <p className="text-white/70 text-sm">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    href="/therapists"
                    className="flex w-full justify-center items-center gap-2 bg-white text-[#0369a1] font-bold text-lg px-8 py-4 rounded-full hover:bg-white/90 hover:scale-[1.02] transition-all shadow-xl"
                  >
                    Book Your First Session
                    <ArrowRight className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="badge bg-secondary text-primary border border-primary/10 mb-4 inline-block px-4 py-2 text-sm font-semibold">
              Testimonials
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading font-extrabold mb-4 tracking-tight">
              Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Success Stories</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                className="bg-white rounded-[2rem] p-8 shadow-md border border-border/30 hover:shadow-xl transition-shadow duration-300 relative"
              >
                <div className="absolute top-6 right-8 text-6xl text-primary/10 font-heading leading-none">"</div>
                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-lg text-foreground leading-relaxed mb-8 font-medium">
                  {t.text}
                </p>
                <div className="flex items-center gap-4 mt-auto border-t border-border/50 pt-6">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border-2 border-white shadow-sm">
                    <span className="text-lg font-bold text-primary">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground font-medium">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="bg-[#0284c7] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Soft decorative background circles */}
            <div className="absolute top-[-50%] left-[-10%] w-[800px] h-[800px] bg-[#38bdf8] opacity-20 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-50%] right-[-10%] w-[600px] h-[600px] bg-[#0369a1] opacity-40 rounded-full blur-[80px]" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 leading-tight">
                Ready to Start Your Recovery?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed font-medium">
                Join thousands of patients in Ahmedabad who have found relief and recovery
                through PhysioJoy. Book your first session today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#0369a1] font-bold text-lg px-10 py-5 rounded-full hover:bg-white/90 hover:scale-105 transition-all shadow-xl"
                >
                  Create Free Account
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link
                  href="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold text-lg px-10 py-5 rounded-full hover:bg-white/20 transition-all border border-white/30 backdrop-blur-md"
                >
                  <ShoppingBag className="w-6 h-6" />
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
