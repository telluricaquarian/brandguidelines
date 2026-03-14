"use client"

import { useState } from "react"
import { Copy, Check, Download, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const sections = [
  { id: "brand-essentials", label: "Brand Essentials" },
  { id: "logo-system", label: "Logo System" },
  { id: "color-palette", label: "Color Palette" },
  { id: "typography", label: "Typography" },
  { id: "iconography", label: "Iconography" },
  { id: "voice-tone", label: "Voice & Tone" },
]

const coreNeutrals = [
  { name: "Background", hex: "#0A0A0A", hsl: "hsl(0 0% 3.9%)" },
  { name: "Foreground", hex: "#FAFAFA", hsl: "hsl(0 0% 98%)" },
  { name: "Muted Surface", hex: "#262626", hsl: "hsl(0 0% 14.9%)" },
  { name: "Muted Text", hex: "#BFBFBF", hsl: "hsl(0 0% 75%)" },
  { name: "Ring", hex: "#D4D4D4", hsl: "hsl(0 0% 83.1%)" },
  { name: "Destructive", hex: "#7F1D1D", hsl: "hsl(0 62.8% 30.6%)" },
]

const surfacePalette = [
  { name: "Deep Background", hex: "#030303", hsl: "hsl(0 0% 1%)" },
  { name: "Card Top", hex: "#121212", hsl: "hsl(0 0% 7%)" },
  { name: "Card Bottom", hex: "#0A0A0A", hsl: "hsl(0 0% 4%)" },
  { name: "Subtle Border", hex: "#1F1F1F", hsl: "hsl(0 0% 12%)" },
  { name: "Strong Border", hex: "#333333", hsl: "hsl(0 0% 20%)" },
  { name: "Hover Border", hex: "#404040", hsl: "hsl(0 0% 25%)" },
]

const accentColors = [
  { name: "Primary Accent", hex: "#3B82F6", usage: "CTAs, links, primary actions" },
  { name: "Enterprise", hex: "#8B5CF6", usage: "Premium features, enterprise tier" },
  { name: "Success", hex: "#22C55E", usage: "Positive states, confirmations" },
  { name: "Success Light", hex: "#4ADE80", usage: "Stats, indicators" },
]

const chartColors = [
  { name: "Chart 1", hex: "#2662D9", hsl: "hsl(220 70% 50%)" },
  { name: "Chart 2", hex: "#2EB88A", hsl: "hsl(160 60% 45%)" },
  { name: "Chart 3", hex: "#E88C30", hsl: "hsl(30 80% 55%)" },
  { name: "Chart 4", hex: "#AF57DB", hsl: "hsl(280 65% 60%)" },
  { name: "Chart 5", hex: "#E23670", hsl: "hsl(340 75% 55%)" },
]

function ColorCard({ name, hex, hsl, usage }: { name: string; hex: string; hsl?: string; usage?: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isLight = hex === "#FAFAFA" || hex === "#BFBFBF" || hex === "#D4D4D4" || hex === "#4ADE80"

  return (
    <div className="group border border-[#262626] hover:border-[#404040] transition-colors">
      <div
        className="h-20 relative cursor-pointer flex items-center justify-center"
        style={{ backgroundColor: hex }}
        onClick={copyToClipboard}
      >
        <span
          className={`text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity ${isLight ? "text-black" : "text-white"}`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </span>
      </div>
      <div className="p-3 bg-[#0A0A0A]">
        <p className="text-sm font-medium text-white">{name}</p>
        <p className="text-xs font-mono text-[#BFBFBF] mt-1">{hex}</p>
        {hsl && <p className="text-xs font-mono text-[#666666] mt-0.5">{hsl}</p>}
        {usage && <p className="text-xs text-[#666666] mt-1">{usage}</p>}
      </div>
    </div>
  )
}

function SideNav() {
  return (
    <nav className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-50">
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="text-xs text-[#666666] hover:text-white transition-colors block py-1">
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function BrandGuidelines() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <SideNav />

      {/* Hero */}
      <header className="border-b border-[#1F1F1F]">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white flex items-center justify-center">
              <span className="text-black font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-medium tracking-tight">Creadefy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Brand Guidelines</h1>
          <p className="text-[#BFBFBF] text-lg max-w-xl mb-8">
            Digital achievements made beautiful. A comprehensive guide to maintaining visual consistency across all
            Creadefy touchpoints.
          </p>
          <Button
            variant="outline"
            className="border-[#333333] hover:border-[#404040] hover:bg-[#1F1F1F] text-white bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Assets
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">
        {/* Brand Essentials */}
        <section id="brand-essentials" className="py-20 border-b border-[#1F1F1F]">
          <h2 className="text-2xl font-medium tracking-tight mb-8">Brand Essentials</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Brand Name</h3>
              <p className="text-3xl font-light mb-4">Creadefy</p>
              <p className="text-[#BFBFBF] text-sm">Capital C, rest lowercase. Avoid: creadefy, CreadeFy, CreaDefy.</p>
            </div>

            <div>
              <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Tagline</h3>
              <p className="text-xl font-light text-[#BFBFBF] mb-4">"Digital achievements made beautiful"</p>
              <p className="text-sm text-[#666666]">Verifiable Digital Certificates & Badges Platform.</p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Core Attributes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Minimal", desc: "Dark-first, high-contrast design language" },
                { title: "Premium", desc: "Calm aesthetic with quiet confidence" },
                { title: "Trustworthy", desc: "Security-focused yet design-forward" },
              ].map((attr) => (
                <div key={attr.title} className="border border-[#262626] p-6 bg-[#0A0A0A]">
                  <h4 className="font-medium mb-2">{attr.title}</h4>
                  <p className="text-sm text-[#BFBFBF]">{attr.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logo System */}
        <section id="logo-system" className="py-20 border-b border-[#1F1F1F]">
          <h2 className="text-2xl font-medium tracking-tight mb-8">Logo System</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="border border-[#262626] p-8 bg-[#0A0A0A] flex flex-col items-center justify-center min-h-[200px]">
              <div className="w-16 h-16 bg-white flex items-center justify-center mb-4">
                <span className="text-black font-bold text-2xl">C</span>
              </div>
              <p className="text-sm text-[#666666]">Primary Mark</p>
            </div>
            <div className="border border-[#262626] p-8 bg-white flex flex-col items-center justify-center min-h-[200px]">
              <div className="w-16 h-16 bg-black flex items-center justify-center mb-4">
                <span className="text-white font-bold text-2xl">C</span>
              </div>
              <p className="text-sm text-[#666666]">Inverted Mark</p>
            </div>
            <div className="border border-[#262626] p-8 bg-[#0A0A0A] flex flex-col items-center justify-center min-h-[200px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white flex items-center justify-center">
                  <span className="text-black font-bold">C</span>
                </div>
                <span className="text-xl font-medium">Creadefy</span>
              </div>
              <p className="text-sm text-[#666666]">Logo + Wordmark</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Clear Space</h3>
              <p className="text-sm text-[#BFBFBF] mb-4">
                Maintain at least 0.25× the logo height as padding around the logo.
              </p>
              <div className="border border-dashed border-[#333333] p-8 inline-block">
                <div className="border border-[#3B82F6] border-dashed p-4">
                  <div className="w-12 h-12 bg-white flex items-center justify-center">
                    <span className="text-black font-bold">C</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Minimum Sizes</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-white flex items-center justify-center">
                    <span className="text-black font-bold text-xs">C</span>
                  </div>
                  <span className="text-sm text-[#BFBFBF]">24px — UI minimum</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white flex items-center justify-center">
                    <span className="text-black font-bold text-sm">C</span>
                  </div>
                  <span className="text-sm text-[#BFBFBF]">32px — Recommended</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white flex items-center justify-center">
                    <span className="text-black font-bold">C</span>
                  </div>
                  <span className="text-sm text-[#BFBFBF]">48px — Marketing headers</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Logo Misuse</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "No glows", style: "drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" },
                { label: "No stretching", style: "scale-x-150" },
                { label: "No rotation", style: "rotate-12" },
                { label: "No colors", bg: "bg-blue-500" },
              ].map((misuse, i) => (
                <div key={i} className="border border-[#7F1D1D] p-4 bg-[#0A0A0A] relative">
                  <div className="flex items-center justify-center h-16">
                    <div
                      className={`w-10 h-10 ${misuse.bg || "bg-white"} flex items-center justify-center ${misuse.style || ""}`}
                    >
                      <span className={`font-bold ${misuse.bg ? "text-white" : "text-black"}`}>C</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#7F1D1D] text-center mt-2">{misuse.label}</p>
                  <div className="absolute top-2 right-2 w-4 h-4 border border-[#7F1D1D] flex items-center justify-center">
                    <span className="text-[#7F1D1D] text-xs">✕</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section id="color-palette" className="py-20 border-b border-[#1F1F1F]">
          <h2 className="text-2xl font-medium tracking-tight mb-2">Color Palette</h2>
          <p className="text-[#666666] mb-8">Click any swatch to copy the HEX value.</p>

          <div className="space-y-12">
            <div>
              <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Core Neutrals</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {coreNeutrals.map((color) => (
                  <ColorCard key={color.name} {...color} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Surface Palette</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {surfacePalette.map((color) => (
                  <ColorCard key={color.name} {...color} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Accent Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {accentColors.map((color) => (
                  <ColorCard key={color.name} {...color} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Data Visualization</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {chartColors.map((color) => (
                  <ColorCard key={color.name} {...color} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section id="typography" className="py-20 border-b border-[#1F1F1F]">
          <h2 className="text-2xl font-medium tracking-tight mb-8">Typography</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Primary Font</h3>
              <p className="text-4xl font-light tracking-tight mb-2">Inter</p>
              <p className="text-[#BFBFBF] text-sm">Used for all UI elements across dashboard and marketing pages.</p>
            </div>
            <div>
              <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Monospace</h3>
              <p className="text-4xl font-mono tracking-tight mb-2">Mono</p>
              <p className="text-[#BFBFBF] text-sm">Used for IDs, metrics, codes, and hashes.</p>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm text-[#666666] uppercase tracking-wider">Type Scale</h3>
            <div className="space-y-6 border border-[#262626] p-8 bg-[#0A0A0A]">
              <div className="border-b border-[#1F1F1F] pb-6">
                <p className="text-xs text-[#666666] mb-2">H1 — 48px / Light / -0.02em</p>
                <p className="text-5xl font-light tracking-tight">Digital achievements</p>
              </div>
              <div className="border-b border-[#1F1F1F] pb-6">
                <p className="text-xs text-[#666666] mb-2">H2 — 36px / Light / -0.02em</p>
                <p className="text-4xl font-light tracking-tight">Made beautiful</p>
              </div>
              <div className="border-b border-[#1F1F1F] pb-6">
                <p className="text-xs text-[#666666] mb-2">H3 — 24px / Medium / -0.01em</p>
                <p className="text-2xl font-medium tracking-tight">Verifiable credentials</p>
              </div>
              <div className="border-b border-[#1F1F1F] pb-6">
                <p className="text-xs text-[#666666] mb-2">H4 — 18px / Medium / -0.01em</p>
                <p className="text-lg font-medium">Certificate templates</p>
              </div>
              <div>
                <p className="text-xs text-[#666666] mb-2">Body — 16px / Light / -0.01em</p>
                <p className="text-base font-light leading-relaxed text-[#BFBFBF]">
                  Creadefy is a platform for creating and managing digital certificates and badges. Our minimal,
                  design-forward approach ensures your achievements look as impressive as they are.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Certificate Fonts</h3>
            <p className="text-[#BFBFBF] text-sm mb-6">
              Max 2 font families per template. Script fonts only for recipient names.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-[#262626] p-6 bg-[#0A0A0A]">
                <p className="text-xs text-[#666666] mb-2">Titles</p>
                <p className="text-xl">Oswald / Montserrat</p>
              </div>
              <div className="border border-[#262626] p-6 bg-[#0A0A0A]">
                <p className="text-xs text-[#666666] mb-2">Names (Script)</p>
                <p className="text-xl italic">Dancing Script</p>
              </div>
              <div className="border border-[#262626] p-6 bg-[#0A0A0A]">
                <p className="text-xs text-[#666666] mb-2">Body / Meta</p>
                <p className="text-xl">Inter / Open Sans</p>
              </div>
            </div>
          </div>
        </section>

        {/* Iconography */}
        <section id="iconography" className="py-20 border-b border-[#1F1F1F]">
          <h2 className="text-2xl font-medium tracking-tight mb-8">Iconography</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Icon Library</h3>
              <p className="text-[#BFBFBF] text-sm mb-4">
                Lucide + Tabler outline icons. Prefer outline style only for consistent stroke feel.
              </p>
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 border border-[#262626] flex items-center justify-center">
                  <span className="text-xs text-[#666666]">16</span>
                </div>
                <div className="w-10 h-10 border border-[#262626] flex items-center justify-center">
                  <span className="text-xs text-[#666666]">20</span>
                </div>
                <div className="w-12 h-12 border border-[#262626] flex items-center justify-center">
                  <span className="text-xs text-[#666666]">24</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Icon Colors</h3>
              <p className="text-[#BFBFBF] text-sm">
                Default: neutral in light mode, near-white (#FAFAFA) in dark mode. Use accent blue (#3B82F6) for
                interactive states.
              </p>
            </div>
          </div>

          <div className="border border-[#262626] p-8 bg-[#0A0A0A]">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
              {[
                <Download key="dl" className="w-5 h-5" />,
                <Copy key="cp" className="w-5 h-5" />,
                <Check key="ch" className="w-5 h-5" />,
                <ChevronRight key="cr" className="w-5 h-5" />,
              ].map((icon, i) => (
                <div key={i} className="flex items-center justify-center h-12 border border-[#1F1F1F]">
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voice & Tone */}
        <section id="voice-tone" className="py-20 border-b border-[#1F1F1F]">
          <h2 className="text-2xl font-medium tracking-tight mb-8">Voice & Tone</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="border border-[#262626] p-8 bg-[#0A0A0A]">
              <h3 className="text-sm text-[#22C55E] uppercase tracking-wider mb-6">We Are</h3>
              <ul className="space-y-3">
                {[
                  "Clear and modern",
                  "Confident but not hype-y",
                  "Design-first + security-first",
                  "Minimal and focused",
                  "Trustworthy and professional",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#BFBFBF]">
                    <Check className="w-4 h-4 text-[#22C55E]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-[#262626] p-8 bg-[#0A0A0A]">
              <h3 className="text-sm text-[#7F1D1D] uppercase tracking-wider mb-6">We Are Not</h3>
              <ul className="space-y-3">
                {[
                  "Overly casual or playful",
                  "Buzzword-heavy",
                  "Complicated or verbose",
                  "Aggressive or pushy",
                  "Generic or templated",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#BFBFBF]">
                    <span className="text-[#7F1D1D]">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Writing Rules</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { rule: "Sentence case", example: "Create your first certificate" },
                { rule: "Short sentences", example: "Simple. Clear. Direct." },
                { rule: "No buzzword stacking", example: "Secure verification" },
              ].map((item) => (
                <div key={item.rule} className="border border-[#262626] p-6 bg-[#0A0A0A]">
                  <p className="font-medium mb-2">{item.rule}</p>
                  <p className="text-sm text-[#666666]">"{item.example}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dev Handoff */}
        <section className="py-20">
          <h2 className="text-2xl font-medium tracking-tight mb-8">Developer Reference</h2>

          <div className="border border-[#262626] p-8 bg-[#0A0A0A]">
            <h3 className="text-sm text-[#666666] uppercase tracking-wider mb-4">Tailwind Classes</h3>
            <div className="font-mono text-sm space-y-2 text-[#BFBFBF]">
              <p>
                <span className="text-[#3B82F6]">bg-background</span> text-foreground
              </p>
              <p>
                <span className="text-[#3B82F6]">bg-card</span> text-card-foreground
              </p>
              <p>
                <span className="text-[#3B82F6]">border-border</span>
              </p>
              <p>
                <span className="text-[#3B82F6]">text-muted-foreground</span>
              </p>
              <p>
                <span className="text-[#3B82F6]">bg-primary</span> text-primary-foreground
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1F1F1F] py-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <span className="text-black font-bold text-sm">C</span>
            </div>
            <span className="text-sm text-[#666666]">© 2026 Creadefy. All rights reserved.</span>
          </div>
          <p className="text-sm text-[#666666]">
            Questions? Contact <span className="text-white">mails@creadefy.com</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
