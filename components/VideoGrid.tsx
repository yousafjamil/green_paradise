"use client";
import Image from "next/image";
import { useState } from "react";
import type { GalleryVideo } from "./Gallery";
import { Play } from "./icons";

/** Poster tiles that load and play the video only when tapped, so pages stay light. */
export default function VideoGrid({ videos, playLabel, className = "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4" }: { videos: GalleryVideo[]; playLabel: string; className?: string }) {
  const [playing, setPlaying] = useState<string | null>(null);
  return (
    <ul className={className}>
      {videos.map((v) => (
        <li key={v.id} className="relative aspect-[9/16] overflow-hidden rounded-xl bg-ink">
          {playing === v.id ? (
            <video src={v.src} poster={v.poster} controls autoPlay playsInline preload="none" className="size-full object-cover" onEnded={() => setPlaying(null)} />
          ) : (
            <button type="button" onClick={() => setPlaying(v.id)} aria-label={`${playLabel}: ${v.label}`} className="group relative block size-full text-start">
              <Image src={v.poster} alt={v.label} fill sizes="(min-width:1024px) 25vw,(min-width:768px) 33vw,50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" aria-hidden />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.4s]" /><span className="relative flex size-14 items-center justify-center rounded-full bg-white/90 text-forest shadow-lg transition-transform duration-300 group-hover:scale-110"><Play width={24} height={24} /></span></span>
              <span className="absolute inset-x-0 bottom-0 p-3 text-sm font-medium text-white">{v.label}</span>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
