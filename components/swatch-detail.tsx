"use client"

import Image from "next/image"
import type { UIDesign } from "./swatch-book"

interface SwatchDetailProps {
  design: UIDesign | null
}

export function SwatchDetail({ design }: SwatchDetailProps) {
  if (!design) {
    return (
      <aside className="hidden lg:block w-80 shrink-0 p-6 lg:p-8">
        <div className="sticky top-20">
          <div className="insert-card p-8 text-center">
            {/* Empty state — invitation to select */}
            <div className="w-12 h-12 mx-auto mb-4 border border-border/50 rounded-full flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M15 15l-2 5L9 9l11 4-5 2z" />
                <path d="M2 2l7.586 7.586" />
              </svg>
            </div>
            <p className="font-serif text-sm text-foreground mb-1 italic">Select a Design</p>
            <p className="text-[10px] font-sans text-muted-foreground leading-relaxed">
              UIスウォッチをクリックすると、<br />
              デザインの詳細が表示されます
            </p>

            {/* Card-stock feel: decorative border */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-border/40" />
              <div className="w-1 h-1 rotate-45 border border-border/40" />
              <div className="w-8 h-px bg-border/40" />
            </div>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="hidden lg:block w-80 shrink-0 p-6 lg:p-8">
      <div className="sticky top-20">
        <div className="insert-card overflow-hidden">
          {/* Decorative top edge — like a card insert notch */}
          <div className="h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          {/* Large UI preview */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={design.image}
              alt={`${design.name} UI design detail`}
              fill
              className="object-cover"
              sizes="320px"
            />
            {/* Browser chrome */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-foreground/80 backdrop-blur-sm flex items-center px-2.5 gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent/60" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              <div className="ml-3 flex-1 h-2.5 rounded-sm bg-foreground/30" />
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-serif text-lg text-foreground leading-tight italic">
                  {design.name}
                </h3>
                <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  {design.designer}
                </p>
              </div>
              <span className="text-[9px] font-sans text-muted-foreground bg-secondary/80 px-2 py-1 shrink-0 page-number">
                {design.code}
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-xs font-sans text-muted-foreground leading-relaxed">
              {design.description}
            </p>

            {/* Ornamental divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-border/40" />
              <svg className="w-3 h-3 text-muted-foreground/30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <div className="flex-1 h-px bg-border/40" />
            </div>

            <div className="space-y-3">
              <DetailRow label="Style" value={design.style} />
              <DetailRow label="Stack" value={design.stack} />
              <DetailRow label="Palette" value={design.palette} />
            </div>

            {/* Palette dots */}
            <div className="mt-4 flex items-center gap-2">
              <p className="text-[9px] font-sans uppercase tracking-wider text-muted-foreground">
                Colors
              </p>
              <div className="flex gap-1.5">
                {design.palette.split(", ").map((color) => (
                  <div
                    key={color}
                    className="w-4 h-4 rounded-full border border-border/60"
                    style={{ backgroundColor: colorNameToHex(color) }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 space-y-2">
              <button className="w-full py-2.5 px-4 bg-foreground text-background text-[11px] font-sans uppercase tracking-[0.15em] transition-colors hover:bg-foreground/90">
                Apply This Design
              </button>
              <button className="w-full py-2.5 px-4 bg-transparent text-foreground text-[11px] font-sans uppercase tracking-[0.15em] border border-border/60 transition-colors hover:bg-secondary/50">
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline border-b border-border/30 pb-2 gap-4">
      <span className="text-[10px] font-sans uppercase tracking-wider text-muted-foreground shrink-0">
        {label}
      </span>
      <span className="text-xs font-sans text-foreground text-right">{value}</span>
    </div>
  )
}

function colorNameToHex(name: string): string {
  const map: Record<string, string> = {
    Navy: "#1e3a5f",
    Cyan: "#06b6d4",
    Slate: "#64748b",
    White: "#f8f8f8",
    "Multi-accent": "#e879a8",
    Gray: "#9ca3af",
    "Soft Blue": "#93c5fd",
    "Light Blue": "#bfdbfe",
    Indigo: "#6366f1",
    Accent: "#f59e0b",
    "Dark Gray": "#374151",
    "Off-White": "#faf5f0",
    Charcoal: "#374151",
    Tan: "#d2b48c",
    "Soft Gray": "#e5e7eb",
    Teal: "#14b8a6",
    "Blue Accent": "#3b82f6",
    "Border Gray": "#d1d5db",
    Black: "#1a1a1a",
    "Vibrant Accent": "#ec4899",
    "Warm Gray": "#a8a29e",
    Dark: "#0f172a",
  }
  return map[name] || "#9ca3af"
}
