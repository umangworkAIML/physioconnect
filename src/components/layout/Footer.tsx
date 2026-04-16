import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  AtSign,
  ExternalLink,
  Heart,
} from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Find Doctors Nearby", href: "/nearby" },
    { label: "Home Visits", href: "/therapists" },
    { label: "Find Clinics", href: "/clinics" },
    { label: "Online Consultation", href: "/consultation" },
    { label: "Physio Dance", href: "/physio-dance" },
  ],
  Shop: [
    { label: "Pain Relief", href: "/shop?category=PAIN_RELIEF" },
    { label: "Massage Guns", href: "/shop?category=MASSAGE_GUNS" },
    { label: "Posture Slippers", href: "/shop?category=SLIPPERS" },
    { label: "All Products", href: "/shop" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#0f172a] text-white/90 mt-auto pt-16">
      {/* Decorative Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      {/* Main Footer */}
      <div className="container-custom pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="bg-white p-1 rounded-[14px]">
                <Image
                  src="/logo.png"
                  alt="PhysioJoy Logo"
                  width={38}
                  height={38}
                  className="rounded-lg group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-2xl font-heading font-extrabold tracking-tight">
                <span className="text-[#38bdf8]">Physio</span>
                <span className="text-white">Joy</span>
              </span>
            </Link>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-sm font-medium">
              PhysioJoy by Joyal — Ahmedabad&apos;s premier physiotherapy platform. Book certified therapists,
              discover clinics, and shop premium recovery products — all in one place.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/60 font-medium">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                </div>
                <span>Ahmedabad, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60 font-medium">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                </div>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60 font-medium">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                </div>
                <span>hello@physiojoy.in</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="mt-2">
              <h4 className="font-heading font-bold text-white mb-6 text-sm uppercase tracking-widest opacity-90">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-white/50 hover:text-[#38bdf8] transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white/40 mr-2 uppercase tracking-wider">Follow us</span>
            {[
              { icon: Globe, href: "#" },
              { icon: AtSign, href: "#" },
              { icon: ExternalLink, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0284c7] flex items-center justify-center transition-colors duration-300 border border-white/5 hover:border-transparent"
              >
                <Icon className="w-4 h-4 text-white/80" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0b1120] border-t border-white/5">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-white/40">
            © {new Date().getFullYear()} PhysioJoy by Joyal. All rights reserved.
          </p>
          <p className="text-sm font-medium text-white/40 flex items-center gap-1.5">
            Crafted with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> by{" "}
            <a
              href="https://github.com/umxng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38bdf8] font-bold hover:underline"
            >
              Umxng
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
