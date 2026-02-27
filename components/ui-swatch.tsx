"use client"

import { useState } from "react"
import Image from "next/image"

interface UISwatchProps {
  name: string
  designer: string
  style: string
  stack: string
  palette: string
  image: string
  code: string
  description: string
  index?: number
  isSelected?: boolean
  onSelect?: () => void
}

const ROTATION_CLASSES = [
  "swatch-rotate-1",
  "swatch-rotate-2",
  "swatch-rotate-3",
  "swatch-rotate-4",
  "swatch-rotate-5",
  "swatch-rotate-6",
  "swatch-rotate-7",
  "swatch-rotate-8",
  "swatch-rotate-9",
]

export function UISwatch({
  name,
  designer,
  style,
  stack,
  palette,
  image,
  code,
  description,
  index = 0,
  isSelected = false,
  onSelect,
}: UISwatchProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  const rotationClass = ROTATION_CLASSES[index % ROTATION_CLASSES.length]

  return (
    <div
      className={`group relative cursor-pointer ${rotationClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`${name} UI design by ${designer}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect?.()
        }
      }}
      style={{ transition: "transform 0.3s ease" }}
    >
      <div
        className={`relative photo-mount transition-all duration-500 ease-out ${isHovered ? "-translate-y-2 shadow-xl" : "shadow-md"
          } ${isSelected ? "ring-2 ring-accent ring-offset-2 ring-offset-card" : ""}`}
        style={{ perspective: "1000px" }}
      >
        {/* Photo mount corner elements */}
        <div className="mount-bl" />
        <div className="mount-br" />

        <div
          className="relative transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
          }}
        >
          {/* Front side - UI screenshot */}
          <div
            className="relative aspect-[4/3] overflow-hidden bg-muted"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src={image}
              alt={`${name} UI design screenshot`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 260px"
            />

            {/* Browser chrome bar */}
            <div className="absolute top-0 left-0 right-0 h-5 bg-foreground/80 backdrop-blur-sm flex items-center px-2 gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
              <div className="ml-2 flex-1 h-2 rounded-sm bg-foreground/30" />
            </div>

            {/* Bottom label strip */}
            <div className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-sm px-2 py-1.5 border-t border-border/30">
              <p className="text-[10px] font-sans uppercase tracking-widest text-muted-foreground">
                {code}
              </p>
            </div>
          </div>

          {/* Back side - details */}
          <div
            className="absolute inset-0 aspect-[4/3] bg-card flex flex-col justify-center p-4 border border-border"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="font-serif text-sm text-foreground leading-relaxed italic">{name}</p>
            <div className="mt-2 space-y-1.5">
              <p className="text-[10px] font-sans uppercase tracking-wider text-muted-foreground">
                {designer}
              </p>
              <p className="text-[10px] font-sans text-muted-foreground">{style}</p>
              <p className="text-[10px] font-sans text-muted-foreground">{stack}</p>
              <div className="pt-1.5 border-t border-border/50">
                <p className="text-[10px] font-sans text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Label below — handwritten-style caption */}
      <div className="mt-3 text-center">
        <p className="font-serif text-sm text-foreground leading-tight italic">{name}</p>
        <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
          {designer}
        </p>
      </div>

      {/* Flip button */}
      <button
        className={`absolute top-1 right-1 z-20 w-6 h-6 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
          }`}
        onClick={(e) => {
          e.stopPropagation()
          setIsFlipped(!isFlipped)
        }}
        aria-label="Flip to see design details"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 1l4 4-4 4" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <path d="M7 23l-4-4 4-4" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      </button>
    </div>
  )
}
