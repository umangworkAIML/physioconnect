import NearbyDoctors from "@/components/NearbyDoctors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Rated Nearby Physiotherapists | PhysioJoy",
  description: "Find the best and most highly-rated physiotherapists near you in Ahmedabad. View clinics, check Google ratings, and get directions instantly.",
};

export default function NearbyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Google Rated Recommendations
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Best Physiotherapists <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Near You</span>
          </h1>
          
          <p className="text-lg text-slate-600">
            We use your location and Google Reviews to find the top-rated clinics nearby. 
            Find the perfect therapist and get directions instantly!
          </p>
        </div>

        {/* Content Section */}
        <NearbyDoctors />

      </div>
    </div>
  );
}
