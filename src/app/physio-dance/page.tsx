"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play, Clock, Eye, Flame, Sparkles, Music, Filter, X,
} from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  category: string;
  difficulty: string;
  instructor: string;
  views: number;
}

const categories = ["All", "Back Pain", "Knee Recovery", "Shoulder", "Neck & Spine", "Hip & Leg", "General Mobility"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const difficultyColors: Record<string, string> = {
  Beginner: "badge-success",
  Intermediate: "badge-warning",
  Advanced: "badge-destructive",
};

export default function PhysioDancePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [playing, setPlaying] = useState<Video | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (selectedDifficulty !== "All") params.set("difficulty", selectedDifficulty);

    fetch(`/api/physio-dance?${params}`)
      .then((res) => res.json())
      .then((data) => setVideos(data.videos || []))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, [selectedCategory, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-border/50">
        <div className="container-custom py-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="badge badge-destructive">New</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Physio <span className="gradient-text">Dance</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Fun, rhythmic therapy sessions designed to improve your mobility, reduce pain,
              and boost your mood. Guided by certified physiotherapists.
            </p>

            <div className="flex gap-6 mt-8">
              {[
                { icon: Flame, label: "Burn Calories" },
                { icon: Sparkles, label: "Improve Mobility" },
                { icon: Music, label: "Music Therapy" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-pink-500" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container-custom py-8">
        <div className="flex flex-wrap gap-6 mb-8">
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-md"
                      : "bg-secondary text-muted-foreground hover:bg-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">Difficulty</label>
            <div className="flex gap-2">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedDifficulty === d
                      ? "bg-primary text-white shadow-md"
                      : "bg-secondary text-muted-foreground hover:bg-border"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Videos Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="aspect-video skeleton" />
                <div className="p-5 space-y-2">
                  <div className="h-5 w-48 skeleton" />
                  <div className="h-4 w-32 skeleton" />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20">
            <Music className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-muted-foreground mb-4">Videos will appear here once added by admin.</p>
            <p className="text-sm text-muted-foreground">Check back soon for exciting PhysioDance sessions!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden card-hover group cursor-pointer"
                onClick={() => setPlaying(video)}
              >
                <div className="aspect-video relative bg-gradient-to-br from-pink-100 to-rose-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-pink-500 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md">
                      {video.duration}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`badge ${difficultyColors[video.difficulty] || "badge-primary"}`}>
                      {video.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold mb-1 line-clamp-1">{video.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{video.description}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="font-medium text-foreground">{video.instructor}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {video.views.toLocaleString()}
                      </span>
                      <span className="badge badge-primary text-[10px]">{video.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {playing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setPlaying(null)}>
          <div className="w-full max-w-4xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">{playing.title}</h3>
              <button onClick={() => setPlaying(null)} className="text-white/70 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video bg-black rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Play className="w-20 h-20 text-white/30 mx-auto mb-4" />
                <p className="text-white/50 text-sm">
                  Video player — Configure video hosting to enable playback
                </p>
                <p className="text-white/30 text-xs mt-2">URL: {playing.videoUrl}</p>
              </div>
            </div>
            <div className="mt-4 text-white/60 text-sm">
              <p>Instructor: <strong className="text-white/80">{playing.instructor}</strong></p>
              <p className="mt-1">{playing.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
