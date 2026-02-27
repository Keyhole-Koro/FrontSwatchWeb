"use client"

import { useEffect, useMemo, useState } from "react"
import { SwatchBook } from "@/components/swatch-book"

const DEFAULT_PREVIEW_URL = "https://example.com"

function sanitizeUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return DEFAULT_PREVIEW_URL

  try {
    const withProtocol = /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`
    return new URL(withProtocol).toString()
  } catch {
    return DEFAULT_PREVIEW_URL
  }
}

export function RealtimeWorkbench() {
  const [viewMode, setViewMode] = useState<"setup" | "book">("setup")
  const [repoUrl, setRepoUrl] = useState("")
  const [inputUrl, setInputUrl] = useState(DEFAULT_PREVIEW_URL)
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_PREVIEW_URL)

  const safePreviewUrl = useMemo(() => sanitizeUrl(previewUrl), [previewUrl])
  const isDev = process.env.NODE_ENV === "development"

  useEffect(() => {
    const mode = new URLSearchParams(window.location.search).get("mode")
    if (mode === "setup" || mode === "book") {
      setViewMode(mode)
      return
    }

    if (process.env.NEXT_PUBLIC_DEFAULT_VIEW_MODE === "book") {
      setViewMode("book")
    }
  }, [])

  if (viewMode === "setup") {
    return (
      <main className="h-screen overflow-hidden bg-background paper-texture">
        {isDev && (
          <div className="fixed right-3 top-3 z-50 rounded border border-border bg-card/95 p-2 shadow-sm">
            <button
              type="button"
              className="h-8 border border-border bg-foreground px-3 text-[10px] uppercase tracking-[0.12em] text-background"
              onClick={() => setViewMode("book")}
            >
              Skip to Book
            </button>
          </div>
        )}
        <div className="mx-auto flex h-full w-full max-w-[980px] items-center px-4 py-8 lg:px-6">
          <section className="w-full overflow-hidden border border-border/40 bg-card/80 shadow-lg">
            <header className="border-b border-border px-6 py-8 text-center lg:px-10">
              <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-muted-foreground">
                UI Design Swatch Book
              </p>
              <h1 className="mt-3 font-serif text-5xl italic text-foreground lg:text-6xl">
                Atelier UI
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                リポジトリを指定すると、見開きビューでデザイン比較を開始できます。
              </p>
            </header>

            <div className="space-y-5 px-6 py-6 lg:px-10">
              <div className="space-y-2">
                <label
                  htmlFor="repo-url"
                  className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Repository URL (optional)
                </label>
                <input
                  id="repo-url"
                  type="text"
                  value={repoUrl}
                  onChange={(event) => setRepoUrl(event.target.value)}
                  placeholder="https://github.com/your/repo"
                  className="h-10 w-full border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="preview-url"
                  className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Preview URL
                </label>
                <input
                  id="preview-url"
                  type="text"
                  value={inputUrl}
                  onChange={(event) => setInputUrl(event.target.value)}
                  placeholder="preview-123.example.com"
                  className="h-10 w-full border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
                <p className="text-xs text-muted-foreground">
                  {repoUrl.trim() ? "Repository selected" : "Repository can be added later"}
                </p>
                <button
                  type="button"
                  className="h-10 border border-border bg-foreground px-5 text-[11px] uppercase tracking-[0.14em] text-background transition-opacity hover:opacity-90"
                  onClick={() => {
                    setPreviewUrl(inputUrl)
                    setViewMode("book")
                  }}
                >
                  Open Book
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen overflow-hidden bg-background">
      {isDev && (
        <div className="fixed right-3 top-3 z-50 rounded border border-border bg-card/95 p-2 shadow-sm">
          <button
            type="button"
            className="h-8 border border-border bg-background px-3 text-[10px] uppercase tracking-[0.12em] text-foreground"
            onClick={() => setViewMode("setup")}
          >
            Back to Setup
          </button>
        </div>
      )}
      <SwatchBook
        showCoverHeader={false}
        sidebar={
          <aside className="flex-1 min-h-0 border-t border-border/40 p-6 lg:border-l lg:border-t-0 lg:p-10">
            <div className="relative h-full min-h-0 overflow-hidden border border-border/40 bg-card/60">
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 h-px bg-border/20"
                    style={{ top: `${(i + 1) * 44}px` }}
                  />
                ))}
              </div>

              <div className="relative flex h-full flex-col">
                <header className="flex items-center justify-between border-b border-border px-5 py-4">
                  <div>
                    <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                      Right Page
                    </p>
                    <h3 className="font-serif text-xl italic text-foreground">User Site Preview</h3>
                  </div>
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] tracking-wide text-muted-foreground">
                    READY
                  </span>
                </header>

                <div className="border-b border-border px-5 py-3">
                  <form
                    className="flex gap-2"
                    onSubmit={(event) => {
                      event.preventDefault()
                      setPreviewUrl(inputUrl)
                    }}
                  >
                    <input
                      className="h-9 flex-1 border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                      type="text"
                      value={inputUrl}
                      onChange={(event) => setInputUrl(event.target.value)}
                      placeholder="Preview URL"
                      aria-label="Preview URL"
                    />
                    <button
                      type="submit"
                      className="h-9 border border-border bg-foreground px-3 text-[10px] uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-90"
                    >
                      Reflect
                    </button>
                  </form>
                </div>

                <div className="border-b border-border px-5 py-2">
                  <button
                    type="button"
                    className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground"
                    onClick={() => setViewMode("setup")}
                  >
                    Change Repository / Setup
                  </button>
                </div>

                <div className="flex-1 p-4">
                  <div className="relative h-full overflow-hidden border border-border bg-card shadow-sm">
                    <iframe
                      key={safePreviewUrl}
                      title="User site preview"
                      src={safePreviewUrl}
                      className="h-full w-full bg-white"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        }
      />
    </main>
  )
}
