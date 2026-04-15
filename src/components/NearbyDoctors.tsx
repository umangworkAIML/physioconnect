"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { MapPin, Star, Navigation, Clock } from "lucide-react";
import Link from "next/link";

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
const LIBRARIES: ("places")[] = ["places"];

// Default to center of Ahmedabad
const DEFAULT_LAT = 23.0225;
const DEFAULT_LNG = 72.5714;

export interface PlaceResult {
  id: string;
  name: string;
  rating: number;
  userRatingsTotal: number;
  address: string;
  openNow?: boolean;
  photoUrl?: string;
  lat: number;
  lng: number;
}

export default function NearbyDoctors() {
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries: LIBRARIES,
  });

  const fetchNearbyPlaces = useCallback((lat: number, lng: number) => {
    if (!isLoaded || !mapRef.current || !window.google) return;

    const location = new window.google.maps.LatLng(lat, lng);

    // We create a dummy map element to initialize the PlacesService
    const map = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 13,
    });

    const service = new window.google.maps.places.PlacesService(map);

    const request: google.maps.places.PlaceSearchRequest = {
      location,
      radius: 5000, // 5km radius
      keyword: "physiotherapist", // Could also use type: "doctor"
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const topPlaces = results
          .filter(p => p.rating && p.rating >= 4.0) // Only highly rated
          .map(p => ({
            id: p.place_id || Math.random().toString(),
            name: p.name || "Unknown",
            rating: p.rating || 0,
            userRatingsTotal: p.user_ratings_total || 0,
            address: p.vicinity || "",
            openNow: p.opening_hours?.isOpen?.() ?? undefined,
            photoUrl: p.photos && p.photos.length > 0 ? p.photos[0].getUrl({ maxWidth: 400 }) : undefined,
            lat: p.geometry?.location?.lat() || 0,
            lng: p.geometry?.location?.lng() || 0,
          }))
          .sort((a, b) => b.rating - a.rating) // Sort by highest rating
          .slice(0, 10); // Top 10

        setPlaces(topPlaces);
        setLoading(false);
      } else {
        setLoading(false);
        // If ZERO_RESULTS or error
        setPlaces([]);
      }
    });
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchNearbyPlaces(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.warn("Geolocation blocked or failed. Using default location.", err);
          setLocationError("Location access denied. Showing top clinics in Ahmedabad.");
          fetchNearbyPlaces(DEFAULT_LAT, DEFAULT_LNG);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
      fetchNearbyPlaces(DEFAULT_LAT, DEFAULT_LNG);
    }
  }, [isLoaded, fetchNearbyPlaces]);

  if (loadError) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center">
        Failed to load Google Maps. Please configure the GOOGLE_MAPS_API_KEY.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hidden map div required for PlacesService */}
      <div ref={mapRef} style={{ display: "none" }}></div>

      {locationError && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-sm text-blue-700 flex items-start gap-3">
          <MapPin className="w-5 h-5 shrink-0" />
          <p>{locationError}</p>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
          <p className="text-muted-foreground animate-pulse">Finding the best physiotherapists near you...</p>
        </div>
      ) : places.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">No clinics found nearby</h3>
          <p className="text-muted-foreground">Try increasing your search distance or using a different location.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {places.map((place) => (
            <div key={place.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col">
              <div className="h-48 relative bg-slate-100 overflow-hidden">
                {place.photoUrl ? (
                   // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={place.photoUrl} 
                    alt={place.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <MapPin className="w-12 h-12 text-primary/30" />
                  </div>
                )}
                {place.openNow !== undefined && (
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-md ${place.openNow ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"}`}>
                    {place.openNow ? "Open Now" : "Closed"}
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-2 text-slate-800 line-clamp-1">{place.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-700">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-sm">{place.rating}</span>
                  </div>
                  <span className="text-sm text-slate-500">
                    {place.userRatingsTotal} Google Reviews
                  </span>
                </div>

                <div className="flex items-start gap-2 text-sm text-slate-600 mb-6 line-clamp-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                  <span>{place.address}</span>
                </div>

                <div className="mt-auto">
                  <Link 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all py-3 rounded-xl font-medium"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
