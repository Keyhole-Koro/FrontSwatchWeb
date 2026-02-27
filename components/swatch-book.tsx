"use client"

import { useState, type ReactNode } from "react"
import { UISwatch } from "./ui-swatch"
import { SwatchDetail } from "./swatch-detail"

export interface UIDesign {
  name: string
  designer: string
  style: string
  stack: string
  palette: string
  image: string
  code: string
  description: string
}

const UI_COLLECTIONS = [
  {
    category: "Dashboard",
    categoryJa: "ダッシュボード",
    designs: [
      {
        name: "Dark Analytics",
        designer: "Studio Noire",
        style: "Dark Mode / Data-Dense",
        stack: "Next.js, Recharts, Tailwind",
        palette: "Navy, Cyan, Slate",
        image: "/images/ui-dashboard-dark.jpg",
        code: "DS-001",
        description:
          "データ密度の高いダーク系アナリティクスダッシュボード。サイドバーナビゲーションとカードベースのKPI表示。",
      },
      {
        name: "Kanban Board",
        designer: "Flow Studio",
        style: "Productivity / Colorful",
        stack: "React, DnD Kit, Tailwind",
        palette: "White, Multi-accent, Gray",
        image: "/images/ui-kanban-board.jpg",
        code: "DS-002",
        description:
          "ドラッグ&ドロップ対応のカンバンボード。カラフルなタグとアバターで直感的なタスク管理。",
      },
      {
        name: "Calendar App",
        designer: "Chronos Labs",
        style: "Scheduling / Clean",
        stack: "Next.js, date-fns, Tailwind",
        palette: "White, Soft Blue, Gray",
        image: "/images/ui-calendar-app.jpg",
        code: "DS-003",
        description:
          "月表示カレンダーにイベントブロックを配置。サイドバーに予定リストを表示するスケジューリングUI。",
      },
    ],
  },
  {
    category: "Marketing",
    categoryJa: "マーケティング",
    designs: [
      {
        name: "Gradient Landing",
        designer: "Pixel Craft",
        style: "Hero / Gradient",
        stack: "Next.js, Framer Motion",
        palette: "White, Light Blue, Indigo",
        image: "/images/ui-landing-gradient.jpg",
        code: "MK-001",
        description:
          "大胆なヘッドラインとCTAボタンのヒーローセクション。グラデーション背景にプロダクトモックアップが浮遊。",
      },
      {
        name: "Pricing Cards",
        designer: "SaaS Studio",
        style: "Comparison / Cards",
        stack: "React, Tailwind CSS",
        palette: "White, Accent, Dark Gray",
        image: "/images/ui-pricing-cards.jpg",
        code: "MK-002",
        description:
          "3つのプランカードが並ぶ料金ページ。機能比較チェックマークとアクセントカラーで差別化。",
      },
      {
        name: "Editorial Blog",
        designer: "Type Foundry",
        style: "Editorial / Serif",
        stack: "Next.js, MDX, Tailwind",
        palette: "Off-White, Charcoal, Tan",
        image: "/images/ui-blog-editorial.jpg",
        code: "MK-003",
        description:
          "大きなセリフ体と美しい余白で構成された雑誌風ブログ。記事カードにフィーチャー画像を配置。",
      },
    ],
  },
  {
    category: "Application",
    categoryJa: "アプリケーション",
    designs: [
      {
        name: "AI Chat",
        designer: "Neural Works",
        style: "Conversational / Modern",
        stack: "Next.js, AI SDK, Tailwind",
        palette: "White, Soft Gray, Teal",
        image: "/images/ui-chat-app.jpg",
        code: "AP-001",
        description:
          "メッセージバブルと入力フィールドのAIチャットUI。サイドバーに会話履歴を表示。",
      },
      {
        name: "Social Feed",
        designer: "Connect Studio",
        style: "Feed / Card-Based",
        stack: "React, SWR, Tailwind",
        palette: "White, Blue Accent, Gray",
        image: "/images/ui-social-feed.jpg",
        code: "AP-002",
        description:
          "カードベースのソーシャルフィード。ユーザーアバター、いいね、コメントボタンを配置した投稿UI。",
      },
      {
        name: "Settings Panel",
        designer: "Config Labs",
        style: "Form / Organized",
        stack: "React, Radix UI, Tailwind",
        palette: "White, Border Gray, Accent",
        image: "/images/ui-settings-panel.jpg",
        code: "AP-003",
        description:
          "トグル、ドロップダウン、フォームフィールドで構成された設定画面。セクション分割で整理。",
      },
    ],
  },
  {
    category: "Creative",
    categoryJa: "クリエイティブ",
    designs: [
      {
        name: "Portfolio Grid",
        designer: "Mono Studio",
        style: "Gallery / Minimal",
        stack: "Next.js, CSS Grid, Tailwind",
        palette: "Black, White, Gray",
        image: "/images/ui-portfolio-grid.jpg",
        code: "CR-001",
        description:
          "モノクロームのメイソンリーグリッドポートフォリオ。ホバーでオーバーレイが出現するアーティスティックなデザイン。",
      },
      {
        name: "E-Commerce",
        designer: "Cart Collective",
        style: "Shop / Minimal",
        stack: "Next.js, Shopify, Tailwind",
        palette: "White, Black, Warm Gray",
        image: "/images/ui-ecommerce-minimal.jpg",
        code: "CR-002",
        description:
          "ミニマルな商品グリッドレイアウト。クリーンな余白とシンプルなタイポグラフィのECデザイン。",
      },
      {
        name: "Music Player",
        designer: "Sound Wave",
        style: "Media / Dark",
        stack: "React, Web Audio API",
        palette: "Dark, Vibrant Accent, Gray",
        image: "/images/ui-music-player.jpg",
        code: "CR-003",
        description:
          "アルバムアート表示と再生コントロール。ダークテーマにビビッドなアクセントカラーの音楽プレーヤー。",
      },
    ],
  },
]

interface SwatchBookProps {
  sidebar?: ReactNode
  showCoverHeader?: boolean
}

export function SwatchBook({ sidebar, showCoverHeader = true }: SwatchBookProps) {
  const [selectedDesign, setSelectedDesign] = useState<UIDesign | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredCollections = activeCategory
    ? UI_COLLECTIONS.filter((c) => c.category === activeCategory)
    : UI_COLLECTIONS

  // Running page number counter
  let pageCounter = 0
  const totalDesigns = UI_COLLECTIONS.reduce((acc, c) => acc + c.designs.length, 0)

  return (
    <div className="h-full overflow-hidden bg-background paper-texture">
      {/* Background desk surface */}
      <div className="h-full overflow-hidden flex flex-col">
        {/* ── BOOK COVER / TITLE PAGE ── */}
        {showCoverHeader && (
          <header className="shrink-0 px-4 pb-3 pt-4 lg:px-6 lg:pb-4 lg:pt-6">
            <div className="mx-auto w-full max-w-[1600px] text-center">
            {/* Ornamental top rule */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-foreground/20" />
              <svg className="w-5 h-5 text-foreground/30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <div className="w-16 h-px bg-foreground/20" />
            </div>

            <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-muted-foreground mb-4">
              UI Design Swatch Book — Curated Collection
            </p>
            <h1 className="font-serif text-5xl lg:text-7xl font-light text-foreground tracking-tight text-balance italic">
              Atelier UI
            </h1>
            <p className="mt-4 font-sans text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
              厳選されたWebフロントエンドデザインのコレクション。<br />
              あなたのプロジェクトにぴったりの一着を見つけてください。
            </p>

            {/* Colophon line */}
            <div className="mt-6 flex items-center justify-center gap-6 text-muted-foreground">
              <div className="text-center">
                <p className="text-[9px] font-sans uppercase tracking-[0.2em]">Collection</p>
                <p className="font-serif text-base text-foreground mt-0.5">2026 S/S</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-[9px] font-sans uppercase tracking-[0.2em]">Designs</p>
                <p className="font-serif text-base text-foreground mt-0.5">{totalDesigns}</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-[9px] font-sans uppercase tracking-[0.2em]">Chapters</p>
                <p className="font-serif text-base text-foreground mt-0.5">{UI_COLLECTIONS.length}</p>
              </div>
            </div>

            {/* Bottom ornament */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="w-24 h-px bg-foreground/15" />
              <div className="w-1.5 h-1.5 rotate-45 border border-foreground/20" />
              <div className="w-24 h-px bg-foreground/15" />
            </div>
            </div>
          </header>
        )}

        {/* ── BOOK BODY ── */}
        <div className="flex-1 min-h-0 px-3 pb-4 lg:px-8">
          <div className="mx-auto h-full w-full max-w-[1800px]">
            {/* Book container with spine */}
            <div className="book-container relative h-full overflow-hidden">
              {/* Spine */}
              <div className="book-spine hidden lg:block">
                <span className="book-spine-title font-sans">Atelier UI</span>
              </div>

              {/* Bookmark ribbon */}
              <div className="bookmark-ribbon hidden lg:block" />

              {/* Page content area (offset for spine) */}
              <div className="h-full lg:ml-9 flex flex-col">
                {/* Chapter tabs */}
                <nav className="border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-40">
                  <div className="flex items-center gap-0.5 overflow-x-auto px-4 lg:px-8 pt-2">
                    <button
                      className={`chapter-tab text-[10px] font-sans uppercase tracking-[0.18em] whitespace-nowrap transition-colors ${activeCategory === null
                          ? "active text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                        }`}
                      onClick={() => setActiveCategory(null)}
                    >
                      All Designs
                    </button>
                    {UI_COLLECTIONS.map((collection) => (
                      <button
                        key={collection.category}
                        className={`chapter-tab text-[10px] font-sans uppercase tracking-[0.18em] whitespace-nowrap transition-colors ${activeCategory === collection.category
                            ? "active text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                          }`}
                        onClick={() => setActiveCategory(collection.category)}
                      >
                        {collection.category}
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Page content */}
                <main className="page-curl flex-1 min-h-0">
                  <div className="flex h-full min-h-0 flex-col lg:flex-row">
                    {/* Main page area */}
                    <div className="page-content min-h-0 flex-1 overflow-y-auto p-6 lg:p-10" key={activeCategory || "all"}>
                      {filteredCollections.map((collection, ci) => {
                        const sectionStart = pageCounter
                        pageCounter += collection.designs.length

                        return (
                          <section key={collection.category} className="mb-16 last:mb-0">
                            {/* Chapter title */}
                            <div className="mb-10">
                              <div className="ornament-divider mb-4">
                                <div className="text-center px-6">
                                  <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-muted-foreground mb-1">
                                    Chapter {ci + 1}
                                  </p>
                                  <h2 className="font-serif text-2xl lg:text-3xl text-foreground italic">
                                    {collection.category}
                                  </h2>
                                  <p className="text-[11px] font-sans text-muted-foreground mt-1">
                                    {collection.categoryJa}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Swatch page area — elevated paper look */}
                            <div className="relative bg-card/50 border border-border/40 p-6 lg:p-10">
                              {/* Ruled lines for notebook feel */}
                              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                {Array.from({ length: 20 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className="h-px bg-border/20 absolute left-0 right-0"
                                    style={{ top: `${(i + 1) * 44}px` }}
                                  />
                                ))}
                              </div>

                              <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-14">
                                {collection.designs.map((design, di) => (
                                  <UISwatch
                                    key={design.code}
                                    {...design}
                                    index={di}
                                    isSelected={selectedDesign?.code === design.code}
                                    onSelect={() =>
                                      setSelectedDesign(
                                        selectedDesign?.code === design.code ? null : design
                                      )
                                    }
                                  />
                                ))}
                              </div>

                              {/* Corner decorations */}
                              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-border/40" />
                              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-border/40" />
                              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-border/40" />
                              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-border/40" />
                            </div>

                            {/* Page number */}
                            <div className="flex justify-between items-center mt-6 px-2">
                              <div className="text-[9px] font-sans text-muted-foreground/50 page-number">
                                {sectionStart + 1}—{sectionStart + collection.designs.length}
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-px bg-border/30" />
                                <div className="text-[9px] font-serif text-muted-foreground/40 italic page-number">
                                  p. {ci + 1}
                                </div>
                              </div>
                            </div>
                          </section>
                        )
                      })}
                    </div>

                    {/* Right sidebar area */}
                    {sidebar ?? <SwatchDetail design={selectedDesign} />}
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>

        {/* ── COLOPHON / BACK COVER ── */}
        <footer className="hidden pb-12 px-6">
          <div className="mx-auto w-full max-w-[1600px] text-center">
            {/* Ornamental rule */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-px bg-foreground/10" />
              <div className="w-1 h-1 rotate-45 bg-foreground/15" />
              <div className="w-20 h-px bg-foreground/10" />
            </div>

            <p className="font-serif text-lg text-foreground italic">Atelier UI</p>
            <p className="text-[9px] font-sans uppercase tracking-[0.25em] text-muted-foreground mt-1">
              Frontend Design Collection · 2026 Spring/Summer
            </p>
            <p className="text-[9px] font-sans text-muted-foreground/60 mt-4 max-w-sm mx-auto leading-relaxed">
              All designs are customizable. Colors and layouts may be adjusted to your brand.
              This collection is for reference and inspiration purposes.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
