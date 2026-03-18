"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { Copy, Check, ChevronRight, ArrowRight, Menu } from "lucide-react"
import { GuidelinesShell } from "@/components/guidelines-shell"

// ── Shared primitives ─────────────────────────────────────────────────────────

function MetaLabel({ children, red }: { children: React.ReactNode; red?: boolean }) {
  return (
    <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${red ? "text-[#ED4D30]" : "text-[#555555]"}`}>
      {children}
    </p>
  )
}

function SectionWrapper({
  id,
  children,
  last,
}: {
  id: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <section
      id={id}
      className={`py-20 px-6 md:px-10 lg:px-16 max-w-4xl ${last ? "" : "border-b border-[#1A1A1A]"}`}
    >
      {children}
    </section>
  )
}

function SectionHeading({
  tag,
  title,
  sub,
}: {
  tag: string
  title: string
  sub?: string
}) {
  return (
    <div className="mb-10">
      <MetaLabel>{tag}</MetaLabel>
      <h2 className="text-2xl font-light tracking-tight text-white mb-2">{title}</h2>
      {sub && <p className="text-sm text-[#666666] max-w-xl">{sub}</p>}
    </div>
  )
}

// ── Color System ──────────────────────────────────────────────────────────────

const coreNeutrals = [
  { name: "Black / Base",      hex: "#000000", token: "--background",       usage: "Page base, outermost shell" },
  { name: "Near Black",        hex: "#080808", token: "--",                  usage: "Card tops, layered surfaces" },
  { name: "Deep Surface",      hex: "#0A0A0A", token: "--surface-card",      usage: "Card backgrounds, panels" },
  { name: "Elevated Surface",  hex: "#111111", token: "--surface-elevated",  usage: "Hover cards, elevated panels" },
  { name: "Muted Text",        hex: "#BFBFBF", token: "--text-secondary",    usage: "Body copy, descriptors" },
  { name: "Foreground",        hex: "#FAFAFA", token: "--text-primary",      usage: "Primary text, headings" },
]

const surfacePalette = [
  { name: "Subtle Border",  hex: "#1F1F1F", token: "--border-subtle",   usage: "Section dividers, quiet rules" },
  { name: "Default Border", hex: "#262626", token: "--border-default",  usage: "Standard card borders" },
  { name: "Strong Border",  hex: "#333333", token: "--border-strong",   usage: "Dashed rules, emphasis" },
  { name: "Hover Border",   hex: "#404040", token: "--border-hover",    usage: "Interactive hover state" },
  { name: "Label Text",     hex: "#666666", token: "--text-muted",      usage: "Meta labels, captions" },
  { name: "Ghost State",    hex: "#404040", token: "--text-ghost",      usage: "Placeholder, disabled" },
]

const accentColors = [
  { name: "SD Red",       hex: "#ED4D30", token: "--sd-red",         usage: "Primary CTA, active nav, button fills" },
  { name: "Red Hover",    hex: "#DC2626", token: "--sd-red-hover",   usage: "Hover / pressed state" },
  { name: "Red Glow",     hex: "rgba(220,38,38,0.18)", token: "--sd-glow", usage: "Ambient glow, backdrop treatment" },
  { name: "Red Dim",      hex: "#7F1D1D", token: "--sd-red-dim",     usage: "Error states, misuse indicators" },
]

function ColorCard({ name, hex, token, usage }: { name: string; hex: string; token: string; usage: string }) {
  const [copied, setCopied] = useState(false)
  const isLight = hex === "#FAFAFA" || hex === "#BFBFBF"
  const isGradient = hex.startsWith("rgba")
  const displayHex = isGradient ? undefined : hex

  return (
    <div className="border border-[#262626] hover:border-[#333333] transition-colors rounded-lg overflow-hidden group">
      <div
        className="h-16 cursor-pointer flex items-center justify-center relative"
        style={displayHex ? { backgroundColor: hex } : { background: "radial-gradient(circle, rgba(220,38,38,0.4) 0%, transparent 70%)" }}
        onClick={() => {
          if (!displayHex) return
          navigator.clipboard.writeText(hex)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
      >
        {displayHex && (
          <span className={`opacity-0 group-hover:opacity-100 transition-opacity ${isLight ? "text-black" : "text-white"}`}>
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </span>
        )}
      </div>
      <div className="p-3 bg-[#0A0A0A]">
        <p className="text-xs font-medium text-white mb-0.5">{name}</p>
        <p className="text-[10px] font-mono text-[#BFBFBF]">{hex}</p>
        <p className="text-[10px] font-mono text-[#404040] mt-0.5">{token}</p>
        <p className="text-[10px] text-[#555555] mt-1 leading-snug">{usage}</p>
      </div>
    </div>
  )
}

// ── SECTION: Overview ─────────────────────────────────────────────────────────

function OverviewSection() {
  return (
    <section id="overview" className="py-20 px-6 md:px-10 lg:px-16 max-w-4xl border-b border-[#1A1A1A]">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-8">
          <img src="/sdnavbarlogo.png" alt="SD with Kenneth" style={{ height: 32, width: "auto" }} />
        </div>
        <MetaLabel red>Brand System · Version 1 · 2025</MetaLabel>
        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
          System Specification
        </h1>
        <p className="text-[#BFBFBF] text-base max-w-lg leading-relaxed">
          The visual and structural language of SD with Kenneth — documented for
          consistent execution across every touchpoint in the ecosystem.
        </p>
        <div className="flex items-center gap-2 mt-6 text-xs text-[#555555]">
          <ChevronRight className="w-3 h-3 text-[#ED4D30]" />
          <span>Kenneth Castenada · SD with Kenneth</span>
        </div>
      </div>

      {/* What this document covers */}
      <div className="mb-14">
        <MetaLabel>Document scope</MetaLabel>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { cat: "Identity",  items: ["Brand positioning", "Visual DNA", "Typography system", "Color system"] },
            { cat: "Interface", items: ["Card system", "Layout & grid", "Component inventory", "Interaction patterns"] },
            { cat: "Product",   items: ["Forms & booking", "Voice & tone", "Implementation rules", "Logo usage"] },
          ].map(({ cat, items }) => (
            <div key={cat} className="border border-[#1F1F1F] rounded-xl bg-[#0A0A0A] p-5">
              <p className="text-[10px] font-bold text-[#ED4D30] uppercase tracking-[0.18em] mb-3">{cat}</p>
              <ul className="space-y-1.5">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-[#BFBFBF]">
                    <span className="w-1 h-1 rounded-full bg-[#333333] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* System overview stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { val: "5",       label: "Typefaces in system" },
          { val: "Black+Red", label: "Core palette" },
          { val: "13",      label: "Documented sections" },
          { val: "v1",      label: "Spec version" },
        ].map(({ val, label }) => (
          <div key={label} className="border border-[#1F1F1F] rounded-lg p-4 bg-[#0A0A0A]">
            <p className="text-xl font-light text-white mb-1">{val}</p>
            <p className="text-[10px] text-[#555555] uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── SECTION: Brand Positioning ────────────────────────────────────────────────

function BrandPositioningSection() {
  return (
    <SectionWrapper id="brand-positioning">
      <SectionHeading
        tag="02 · Brand Positioning"
        title="Positioning & Archetype"
        sub="SD with Kenneth occupies a precise position: rebel-guide. Not a wellness brand. Not a hustle coach. A sovereignty-first system with evidence at the core."
      />

      {/* Archetype + positioning */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="border border-[#262626] rounded-xl bg-[#0A0A0A] p-6">
          <MetaLabel red>Archetype</MetaLabel>
          <p className="text-2xl font-light text-white mb-3">The Rebel Guide</p>
          <p className="text-sm text-[#BFBFBF] leading-relaxed">
            Questions systems, provides alternatives, leads by example.
            The brand exists in the tension between critique and construction —
            breaking down conventional health narratives while building a
            committed, evidence-literate community.
          </p>
        </div>
        <div className="border border-[#262626] rounded-xl bg-[#0A0A0A] p-6">
          <MetaLabel red>Perceived tier</MetaLabel>
          <p className="text-2xl font-light text-white mb-3">Premium Independent</p>
          <p className="text-sm text-[#BFBFBF] leading-relaxed">
            Not mass-market. Not institutional. Premium in restraint and
            consistency — cinematic, dark-first, high-signal. The visual
            language communicates that this is a deliberate system, not
            a side hustle aesthetic.
          </p>
        </div>
      </div>

      {/* Tone descriptors */}
      <div className="mb-10">
        <MetaLabel>Tone descriptors</MetaLabel>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { tone: "Assertive",    desc: "Direct. No hedging. No softened CTAs." },
            { tone: "Evidence-led", desc: "Claims are grounded. Proof-of-system is visible." },
            { tone: "Disciplined",  desc: "Consistent voice, spacing, and structure." },
            { tone: "Cinematic",    desc: "Every layout should feel authored, not assembled." },
            { tone: "Sovereign",    desc: "Builds agency in the reader. Not dependency." },
            { tone: "Understated",  desc: "Premium signals through restraint, not volume." },
          ].map(({ tone, desc }) => (
            <div key={tone} className="border border-[#1F1F1F] rounded-lg p-5 bg-[#0A0A0A]">
              <div className="w-1 h-3.5 bg-[#ED4D30] mb-3 rounded-full" />
              <p className="text-sm font-semibold text-white mb-1.5">{tone}</p>
              <p className="text-xs text-[#666666] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Audience */}
      <div className="mb-10">
        <MetaLabel>Audience orientation</MetaLabel>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-white mb-3">Primary</p>
            <ul className="space-y-2">
              {[
                "High-agency individuals seeking non-institutional health alternatives",
                "Existing Kangen Water community members and distributors",
                "People frustrated by conventional medicine's limitations",
                "Commitment-oriented buyers — value consultation over impulse",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#BFBFBF]">
                  <ChevronRight className="w-3 h-3 text-[#ED4D30] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-white mb-3">Positioning against</p>
            <ul className="space-y-2">
              {[
                "Generic wellness influencer content",
                "Soft-sell, low-commitment wellness funnels",
                "Trend-driven health aesthetics",
                "Over-polished institutional health brands",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#BFBFBF]">
                  <span className="text-[#7F1D1D] mt-0.5 shrink-0 text-xs">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Brand pillars */}
      <div>
        <MetaLabel>Brand pillars</MetaLabel>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { pillar: "Stay Dangerous",   sub: "Mindset · Merch · Identity system" },
            { pillar: "Stay Hydrated",    sub: "Kangen Water · Education · Community" },
            { pillar: "Join the Wake",    sub: "Hydrated Community · Global map" },
          ].map(({ pillar, sub }) => (
            <div key={pillar} className="border border-[#262626] hover:border-[#ED4D30]/30 transition-colors rounded-xl p-5 bg-[#0A0A0A]">
              <p className="text-sm font-semibold text-white mb-1">{pillar}</p>
              <p className="text-xs text-[#555555]">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ── SECTION: Visual DNA ───────────────────────────────────────────────────────

function VisualDNASection() {
  return (
    <SectionWrapper id="visual-dna">
      <SectionHeading
        tag="03 · Visual DNA"
        title="Aesthetic Language"
        sub="Dark luxury + rebel-guide energy. The visual system should feel like a premium system manual, not a consumer brand."
      />

      {/* Core aesthetic */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {[
          {
            heading: "Dark-first always",
            body: "Every surface starts black. Elevation is expressed through slight lightening — never through bright backgrounds. Light mode doesn't exist in this system.",
          },
          {
            heading: "High-contrast hierarchy",
            body: "White (#FAFAFA) over black (#030303). Maximum legibility. Red (#ED4D30) used as a precision accent — never decoratively.",
          },
          {
            heading: "Cinematic restraint",
            body: "Layouts are considered, not assembled. Generous vertical rhythm. Selective use of red. Cards have structure. Nothing feels accidental.",
          },
          {
            heading: "Evidence-first presentation",
            body: "The visual system supports trust. Cards read like structured evidence. Proof elements have deliberate spacing. Metadata labels create credibility.",
          },
        ].map(({ heading, body }) => (
          <div key={heading} className="border border-[#262626] rounded-xl bg-[#0A0A0A] p-6">
            <div className="w-1 h-3.5 bg-[#ED4D30] mb-4 rounded-full" />
            <h4 className="text-sm font-semibold text-white mb-2">{heading}</h4>
            <p className="text-sm text-[#BFBFBF] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* Photography rules */}
      <div className="mb-10">
        <MetaLabel>Photography treatment</MetaLabel>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ul className="space-y-3">
              {[
                "Black-dominant base — always dark, high-contrast",
                "Selective red overlay or gradient treatment on imagery",
                "Cinematic framing — editorial, not stock",
                "Subject matter: water, discipline, community, movement",
                "Edge blur / gradient fade at card boundaries",
              ].map((rule) => (
                <li key={rule} className="flex items-start gap-3 text-sm text-[#BFBFBF]">
                  <ChevronRight className="w-3 h-3 text-[#ED4D30] mt-0.5 shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-[#262626] rounded-xl overflow-hidden">
              <img src="/holisticallopathic.png" alt="Holistic editorial visual" className="w-full h-auto block" />
              <div className="p-2.5 bg-[#0A0A0A]">
                <p className="text-[10px] text-[#555555]">Editorial · black-first composition</p>
              </div>
            </div>
            <div className="border border-[#262626] rounded-xl overflow-hidden">
              <img src="/fitness.png" alt="War Room discipline visual" className="w-full h-auto block" />
              <div className="p-2.5 bg-[#0A0A0A]">
                <p className="text-[10px] text-[#555555]">War Room · discipline register</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Atmosphere spec */}
      <div className="border border-[#1F1F1F] rounded-xl p-6 bg-[#0A0A0A]">
        <MetaLabel>Atmosphere spec</MetaLabel>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-[#BFBFBF]">
          <div>
            <p className="text-[10px] text-[#555555] uppercase tracking-wider mb-2">Feel</p>
            <p className="leading-relaxed">Premium underground. Not minimalist sterility — contained energy. Like a well-lit war room, not a SaaS dashboard.</p>
          </div>
          <div>
            <p className="text-[10px] text-[#555555] uppercase tracking-wider mb-2">Contrast logic</p>
            <p className="leading-relaxed">White on black at full opacity. Red at 100% only on CTAs and active states. Never at opacity for text — only for borders and glows.</p>
          </div>
          <div>
            <p className="text-[10px] text-[#555555] uppercase tracking-wider mb-2">Texture</p>
            <p className="leading-relaxed">No noise, no grain overlays, no glassmorphism. The depth comes from layered dark surfaces with precise border treatments.</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

// ── SECTION: Color System ─────────────────────────────────────────────────────

function ColorSystemSection() {
  return (
    <SectionWrapper id="color-system">
      <SectionHeading
        tag="04 · Color System"
        title="Color System"
        sub="Click any swatch to copy the hex. Token names map directly to app/globals.css variables."
      />

      <div className="space-y-10">
        <div>
          <MetaLabel>Core neutrals</MetaLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {coreNeutrals.map((c) => <ColorCard key={c.name} {...c} />)}
          </div>
        </div>

        <div>
          <MetaLabel>Surface & border palette</MetaLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {surfacePalette.map((c) => <ColorCard key={c.name} {...c} />)}
          </div>
        </div>

        <div>
          <MetaLabel>Accent — SD Red system</MetaLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {accentColors.map((c) => <ColorCard key={c.name} {...c} />)}
          </div>
        </div>

        <div className="border border-[#1F1F1F] rounded-xl p-6 bg-[#0A0A0A]">
          <MetaLabel>Gradient tokens</MetaLabel>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "Metallic Headline", preview: "linear-gradient(to right, #fff, #888)", usage: "Large display / blackletter text gradients" },
              { name: "Veil Gradient",     preview: "linear-gradient(to bottom, transparent, #000)", usage: "Scroll veil above footer, image fade-outs" },
              { name: "Red-to-dark",       preview: "linear-gradient(to right, #ED4D30, #000)", usage: "Sectional transitions, cinematic overlays" },
              { name: "Surface Gradient",  preview: "linear-gradient(135deg, #121212, #0A0A0A)", usage: "Card inner gradient treatment" },
            ].map(({ name, preview, usage }) => (
              <div key={name} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg shrink-0" style={{ background: preview }} />
                <div>
                  <p className="text-xs font-medium text-white">{name}</p>
                  <p className="text-[10px] text-[#555555] mt-0.5">{usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contrast rules */}
        <div>
          <MetaLabel>Contrast rules</MetaLabel>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { pair: "#FAFAFA on #030303", ratio: "19.5:1", use: "Primary text — always pass" },
              { pair: "#BFBFBF on #0A0A0A", ratio: "9.1:1",  use: "Body copy — AA large pass" },
              { pair: "#ED4D30 on #030303", ratio: "4.6:1",  use: "CTA elements — AA pass" },
              { pair: "#666666 on #0A0A0A", ratio: "3.9:1",  use: "Labels only — not body copy" },
            ].map(({ pair, ratio, use }) => (
              <div key={pair} className="border border-[#1F1F1F] rounded-lg p-4 bg-[#0A0A0A]">
                <p className="text-xs font-mono text-[#BFBFBF] mb-1">{pair}</p>
                <p className="text-lg font-light text-white mb-1">{ratio}</p>
                <p className="text-[10px] text-[#555555]">{use}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

// ── SECTION: Typography ───────────────────────────────────────────────────────

function TypographySection() {
  return (
    <SectionWrapper id="typography">
      <SectionHeading
        tag="05 · Typography"
        title="Typography System"
        sub="Five typefaces. Each has a specific role. No mixing outside those roles."
      />

      {/* Type roles */}
      <div className="space-y-3 mb-12">
        {[
          {
            role: "Display",
            face: "Archking",
            sample: "Stay Dangerous",
            sampleStyle: {
              fontFamily: "Archking, serif",
              background: "linear-gradient(to right, #fff 60%, #888)",
              WebkitBackgroundClip: "text" as const,
              WebkitTextFillColor: "transparent" as const,
              fontSize: "2.5rem",
              lineHeight: 1.1,
            },
            usage: "Major headings, hero statements, identity-defining moments. Never used for body copy.",
            guidance: "Gradient fill only for hero context. White flat for secondary display use.",
          },
          {
            role: "Interface",
            face: "Inter",
            sample: "Evidence-driven consultation",
            sampleStyle: { fontFamily: "Inter, sans-serif", fontSize: "1.5rem", fontWeight: 300, letterSpacing: "-0.02em" },
            usage: "All UI elements, body copy, navigation, form labels, descriptors.",
            guidance: "font-light for headings, font-normal for body, font-semibold for UI labels only.",
          },
          {
            role: "Editorial Accent",
            face: "RedactionItalic",
            sample: "Quiet discipline.",
            sampleStyle: { fontFamily: "RedactionItalic, Georgia, serif", fontStyle: "italic", fontSize: "1.75rem", color: "#BFBFBF" },
            usage: "Pull quotes, bylines, high-impact single-word editorial moments. Used sparingly.",
            guidance: "Never use for navigation, forms, or body paragraphs. One use per composition.",
          },
          {
            role: "Metadata Label",
            face: "PexelGrotesk",
            sample: "EVIDENCE · COMMUNITY",
            sampleStyle: { fontFamily: "PexelGrotesk, sans-serif", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.2em", textTransform: "uppercase" as const },
            usage: "Overlines, metadata tags, pill labels, category markers, section identifiers.",
            guidance: "Always uppercase. Always tracked at 0.18–0.22em. Text-[#ED4D30] or text-[#555555].",
          },
          {
            role: "PP Editorial",
            face: "PPEditorial",
            sample: "High-agency health.",
            sampleStyle: { fontFamily: "PPEditorial, Georgia, serif", fontSize: "1.5rem", fontWeight: 300, letterSpacing: "-0.01em", fontStyle: "italic" },
            usage: "Long-form editorial sections, feature headlines, premium contextual moments.",
            guidance: "Shares editorial register with Redaction. Distinguish by context — Redaction is accent, PP Editorial is sustained editorial.",
          },
        ].map(({ role, face, sample, sampleStyle, usage, guidance }) => (
          <div key={role} className="border border-[#1F1F1F] rounded-xl bg-[#0A0A0A] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#1A1A1A]">
              <div className="flex items-center gap-4">
                <p className="text-[10px] font-bold text-[#ED4D30] uppercase tracking-[0.18em]">{role}</p>
                <p className="text-[10px] text-[#444444] font-mono">{face}</p>
              </div>
            </div>
            <div className="px-6 py-6 border-b border-[#1A1A1A]">
              <p style={sampleStyle} className="text-white">{sample}</p>
            </div>
            <div className="grid md:grid-cols-2 divide-x divide-[#1A1A1A]">
              <div className="px-6 py-4">
                <p className="text-[10px] text-[#444444] uppercase tracking-wider mb-1.5">Usage</p>
                <p className="text-xs text-[#BFBFBF] leading-relaxed">{usage}</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-[10px] text-[#444444] uppercase tracking-wider mb-1.5">Guidance</p>
                <p className="text-xs text-[#BFBFBF] leading-relaxed">{guidance}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Type scale */}
      <div>
        <MetaLabel>Type scale</MetaLabel>
        <div className="border border-[#1F1F1F] rounded-xl bg-[#0A0A0A] overflow-hidden divide-y divide-[#1A1A1A]">
          {[
            { label: "Display / Hero",  size: "text-5xl",   weight: "font-light", spec: "48px · Light · −0.03em · Archking", example: "Stay Dangerous", style: { fontFamily: "Archking, serif", background: "linear-gradient(to right, #fff 60%, #888)", WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const } },
            { label: "H1",              size: "text-4xl",   weight: "font-light", spec: "36px · Light · −0.02em · Inter",    example: "Hydrated Community" },
            { label: "H2",              size: "text-3xl",   weight: "font-light", spec: "30px · Light · −0.02em · Inter",    example: "Join the Wake" },
            { label: "H3",              size: "text-2xl",   weight: "font-medium", spec: "24px · Medium · −0.01em · Inter",  example: "War Room Check-ins" },
            { label: "H4 / UI Label",   size: "text-lg",    weight: "font-semibold", spec: "18px · Semibold · Inter",        example: "Book a Call Now" },
            { label: "Body",            size: "text-base",  weight: "font-light",  spec: "16px · Light · relaxed · Inter",   example: "Routine is dues paid in the war room. Weekly workouts. Check-ins. Quiet discipline.", textColor: "text-[#BFBFBF]" },
            { label: "Caption / Label", size: "text-xs",    weight: "font-bold",   spec: "11px · Bold · 0.2em tracking",     example: "EVIDENCE · COMMUNITY · SYSTEM", style: { letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#555555" } },
          ].map(({ label, size, weight, spec, example, style, textColor }) => (
            <div key={label} className="flex items-baseline gap-6 px-6 py-4">
              <div className="w-28 shrink-0">
                <p className="text-[10px] text-[#444444]">{label}</p>
                <p className="text-[10px] font-mono text-[#333333] mt-0.5 leading-snug">{spec}</p>
              </div>
              <p className={`${size} ${weight} tracking-tight ${textColor || "text-white"} flex-1 min-w-0`} style={style}>
                {example}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ── SECTION: Card System ──────────────────────────────────────────────────────

function CardSystemSection() {
  return (
    <SectionWrapper id="card-system">
      <SectionHeading
        tag="06 · Card System"
        title="Card System"
        sub="Cards are the primary trust container in the SD system. Each card communicates structure, credibility, and intent."
      />

      {/* Card anatomy */}
      <div className="mb-12">
        <MetaLabel>Canonical anatomy</MetaLabel>
        <div className="border border-[#ED4D30]/30 rounded-xl bg-[#0A0A0A] overflow-hidden">
          {/* Anatomy diagram */}
          <div className="p-6 space-y-3 border-b border-[#1A1A1A]">
            <div className="border border-dashed border-[#333333] rounded p-3">
              <p className="text-[10px] text-[#ED4D30] font-bold uppercase tracking-[0.18em]">Metadata label ← zone 1: uppercase, tracked, #ED4D30 or #555555</p>
            </div>
            <div className="border border-dashed border-[#333333] rounded p-3">
              <p className="text-sm font-semibold text-white">Card title ← zone 2: font-semibold, text-white</p>
            </div>
            <div className="border border-dashed border-[#333333] rounded p-3">
              <p className="text-sm text-[#BFBFBF]">Subtext / descriptor copy ← zone 3: text-[#BFBFBF], text-sm, leading-relaxed</p>
            </div>
            <div className="border border-dashed border-[#333333] rounded p-3">
              <p className="text-xs text-[#555555]">Footer / attribution / CTA ← zone 4: text-xs, text-[#555555] or button</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 divide-x divide-[#1A1A1A]">
            {[
              { prop: "Background",  val: "#0A0A0A → #111111 on hover" },
              { prop: "Border",      val: "1px solid #262626 → #333333 hover" },
              { prop: "Radius",      val: "rounded-xl (12px)" },
              { prop: "Padding",     val: "p-5 (20px) or p-6 (24px)" },
              { prop: "Glow state",  val: "box-shadow: 0 0 24px var(--sd-glow)" },
              { prop: "Transition",  val: "transition-all duration-200" },
            ].map(({ prop, val }) => (
              <div key={prop} className="px-5 py-3">
                <p className="text-[10px] text-[#444444] uppercase tracking-wider mb-1">{prop}</p>
                <p className="text-xs font-mono text-[#BFBFBF]">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card variants */}
      <div className="mb-12">
        <MetaLabel>Card variants</MetaLabel>
        <div className="grid md:grid-cols-2 gap-4">

          {/* Research / Info card */}
          <div className="border border-[#262626] hover:border-[#333333] transition-all duration-200 rounded-xl bg-[#0A0A0A] p-6 group hover:bg-[#0D0D0D]">
            <p className="text-[10px] font-bold text-[#555555] uppercase tracking-[0.18em] mb-3">Research · Evidence</p>
            <h4 className="text-base font-semibold text-white mb-2">Alkaline Water & pH Regulation</h4>
            <p className="text-sm text-[#BFBFBF] leading-relaxed mb-4">
              Consistent alkaline water intake has been associated with improved
              electrolyte balance and cellular hydration efficiency in peer-reviewed study.
            </p>
            <p className="text-xs text-[#555555]">Source · Baroody, 2023 · The Hydrated Community Library</p>
          </div>

          {/* Proof / Evidence card */}
          <div className="border border-[#262626] hover:border-[#ED4D30]/30 transition-all duration-200 rounded-xl bg-[#0A0A0A] p-6 group hover:bg-[#0D0D0D]">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[10px] font-bold text-[#ED4D30] uppercase tracking-[0.18em]">Proof · Community</p>
              <img src="/verified.png" alt="Verified" style={{ width: 16, height: 16, objectFit: "contain" }} />
            </div>
            <p className="text-sm font-light text-[#BFBFBF] italic leading-relaxed mb-4" style={{ fontFamily: "RedactionItalic, Georgia, serif" }}>
              "Three months in the War Room. My inflammation markers dropped significantly.
              Kenneth's system is the real thing."
            </p>
            <p className="text-xs text-[#555555]">@hydrated_member · Hydrated Community · ✓ Verified</p>
          </div>

          {/* CTA / Booking card */}
          <div className="border border-[#ED4D30]/25 hover:border-[#ED4D30]/50 transition-all duration-200 rounded-xl bg-[#0A0A0A] p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ED4D30]/5 to-transparent pointer-events-none" />
            <p className="text-[10px] font-bold text-[#ED4D30] uppercase tracking-[0.18em] mb-3">Consultation · Book</p>
            <h4 className="text-lg font-semibold text-white mb-2">Book a Strategy Call</h4>
            <p className="text-sm text-[#BFBFBF] mb-6 leading-relaxed">
              30-minute intake. High signal. No upsell pressure. You come knowing what you want.
            </p>
            <button className="bg-[#ED4D30] hover:bg-white hover:text-black transition-colors text-white text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-[0.1em]">
              Book a Call Now
            </button>
          </div>

          {/* Content / Media card */}
          <div className="border border-[#262626] hover:border-[#333333] transition-all duration-200 rounded-xl bg-[#0A0A0A] overflow-hidden group">
            <div className="relative h-32 bg-[#111111] overflow-hidden">
              <img src="/fitness.png" alt="War Room visual" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
              <span className="absolute top-3 left-3 text-[9px] font-bold text-white bg-[#ED4D30] px-2 py-1 rounded-full uppercase tracking-[0.15em]">War Room</span>
            </div>
            <div className="p-5">
              <p className="text-[10px] font-bold text-[#555555] uppercase tracking-[0.18em] mb-2">Content · Media</p>
              <h4 className="text-sm font-semibold text-white mb-1.5">Stay Dangerous Mindset</h4>
              <p className="text-xs text-[#BFBFBF] leading-relaxed">Weekly discipline protocol. Workout structure, check-in rhythm, community accountability.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Border treatment guide */}
      <div>
        <MetaLabel>Border treatment logic</MetaLabel>
        <div className="grid md:grid-cols-4 gap-3">
          {[
            { label: "Default",     border: "border border-[#262626]",              desc: "All cards at rest" },
            { label: "Hover",       border: "border border-[#404040]",              desc: "Neutral hover state" },
            { label: "Red accent",  border: "border border-[#ED4D30]/30",           desc: "CTA or active card" },
            { label: "Red hover",   border: "border border-[#ED4D30]/60",           desc: "CTA card on hover" },
          ].map(({ label, border, desc }) => (
            <div key={label} className={`rounded-xl ${border} p-5 bg-[#0A0A0A]`}>
              <p className="text-xs font-medium text-white mb-1">{label}</p>
              <p className="text-[10px] font-mono text-[#555555] mb-2">{border.split(" ").pop()}</p>
              <p className="text-[10px] text-[#444444]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ── SECTION: Layout + Grid ────────────────────────────────────────────────────

function LayoutGridSection() {
  return (
    <SectionWrapper id="layout-grid">
      <SectionHeading
        tag="07 · Layout & Grid"
        title="Layout & Grid Rules"
        sub="Constrained columns, generous vertical rhythm, and a fixed shell hierarchy on desktop."
      />

      {/* Shell hierarchy */}
      <div className="mb-12">
        <MetaLabel>Shell hierarchy</MetaLabel>
        <div className="border border-[#1F1F1F] rounded-xl bg-[#0A0A0A] overflow-hidden">
          {/* Visual shell diagram */}
          <div className="flex h-40 overflow-hidden rounded-t-xl" style={{ borderBottom: "1px solid #1A1A1A" }}>
            <div className="w-[80px] bg-[#070707] border-r border-[#1A1A1A] flex flex-col items-center justify-center shrink-0">
              <p className="text-[8px] text-[#333333] uppercase tracking-wider text-center px-1">Left nav<br/>220px</p>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-x-0 top-0 h-8 bg-[#0A0A0A] border-b border-[#1A1A1A] flex items-center px-4">
                <p className="text-[8px] text-[#333333]">Mobile sticky header (lg: hidden)</p>
              </div>
              <div className="absolute inset-0 top-8 flex items-center justify-center">
                <div className="border border-dashed border-[#333333] px-6 py-3 rounded">
                  <p className="text-[9px] text-[#555555] text-center">Content column<br/>max-w-4xl (896px) · px-6</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 divide-x divide-[#1A1A1A]">
            {[
              { label: "Sidebar",        val: "220px · fixed · left-0 · h-screen" },
              { label: "Content",        val: "flex-1 · pl-[220px] on lg+" },
              { label: "Content column", val: "max-w-4xl · mx-auto · px-6/10/16" },
            ].map(({ label, val }) => (
              <div key={label} className="px-5 py-4">
                <p className="text-[10px] text-[#444444] uppercase tracking-wider mb-1">{label}</p>
                <p className="text-xs font-mono text-[#BFBFBF]">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content widths */}
      <div className="mb-12">
        <MetaLabel>Content width constraints</MetaLabel>
        <div className="space-y-3">
          {[
            { label: "Full section max-width",  val: "max-w-4xl (896px)",  use: "All section wrappers" },
            { label: "Body copy max",            val: "max-w-xl (576px)",   use: "Prose, descriptions, sub-headings" },
            { label: "Hero text max",            val: "max-w-lg (512px)",   use: "Hero subtext, lede copy" },
            { label: "Card grid",                val: "grid gap-3 or gap-4", use: "md:grid-cols-2 or md:grid-cols-3" },
          ].map(({ label, val, use }) => (
            <div key={label} className="flex items-center gap-4">
              <div
                className="h-5 rounded bg-[#1A1A1A] border border-[#262626] shrink-0"
                style={{ width: label.includes("Full") ? "100%" : label.includes("Body") ? "64%" : label.includes("Hero") ? "57%" : "72%", maxWidth: 200 }}
              />
              <div className="min-w-0">
                <p className="text-xs text-white">{label}</p>
                <p className="text-[10px] font-mono text-[#555555]">{val} · {use}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section spacing */}
      <div className="mb-12">
        <MetaLabel>Vertical spacing rhythm</MetaLabel>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { label: "Section padding",     val: "py-20 (80px top + bottom)",   use: "Every major section" },
            { label: "Heading to content",  val: "mb-10 (40px)",                use: "SectionHeading bottom margin" },
            { label: "Card group gap",      val: "gap-3 (12px) · gap-4 (16px)", use: "Tight vs default card grids" },
            { label: "Card inner padding",  val: "p-5 (20px) · p-6 (24px)",     use: "Compact vs standard cards" },
            { label: "Sub-group spacing",   val: "mb-10 (40px) to mb-12 (48px)", use: "Between groups within section" },
            { label: "Label bottom margin", val: "mb-4 (16px)",                 use: "MetaLabel before content" },
          ].map(({ label, val, use }) => (
            <div key={label} className="border border-[#1F1F1F] rounded-lg p-4 bg-[#0A0A0A]">
              <p className="text-xs font-medium text-white mb-1">{label}</p>
              <p className="text-[10px] font-mono text-[#ED4D30] mb-1">{val}</p>
              <p className="text-[10px] text-[#555555]">{use}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid patterns */}
      <div>
        <MetaLabel>Grid patterns</MetaLabel>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "2-col equal",    class: "grid-cols-2",         use: "Side-by-side comparisons, voice/tone pairs" },
            { label: "3-col equal",    class: "grid-cols-3",         use: "Attributes, pillars, feature triplets" },
            { label: "4-col tight",    class: "grid-cols-4",         use: "Color swatches, icon sizes, small metadata" },
            { label: "2+1 asymmetric", class: "grid-cols-2 md:grid-cols-[2fr_1fr]", use: "Feature + sidebar callout" },
          ].map(({ label, class: cls, use }) => (
            <div key={label} className="border border-[#1F1F1F] rounded-lg p-4 bg-[#0A0A0A]">
              <p className="text-xs font-medium text-white mb-1">{label}</p>
              <p className="text-[10px] font-mono text-[#BFBFBF] mb-1.5">{cls}</p>
              <p className="text-[10px] text-[#555555]">{use}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ── SECTION: Interaction + Motion ─────────────────────────────────────────────

function InteractionMotionSection() {
  return (
    <SectionWrapper id="interaction-motion">
      <SectionHeading
        tag="08 · Interaction & Motion"
        title="Interaction & Motion Language"
        sub="Motion is used as emphasis, not decoration. The system is restrained — animation draws attention only where intent is clear."
      />

      {/* Live hover demos */}
      <div className="mb-12">
        <MetaLabel>Hover states — live examples</MetaLabel>
        <div className="grid md:grid-cols-3 gap-3">

          <div className="group border border-[#262626] hover:border-[#404040] hover:bg-[#0D0D0D] transition-all duration-200 rounded-xl p-5 bg-[#0A0A0A] cursor-pointer">
            <p className="text-[10px] font-bold text-[#ED4D30] uppercase tracking-[0.18em] mb-2">Standard card</p>
            <p className="text-sm font-medium text-[#BFBFBF] group-hover:text-white transition-colors duration-150">Border lifts to #404040</p>
            <p className="text-xs text-[#444444] mt-1.5">bg shifts from #0A→#0D surface</p>
          </div>

          <div className="group border border-[#262626] hover:border-[#ED4D30]/40 hover:bg-[#0D0D0D] transition-all duration-200 rounded-xl p-5 bg-[#0A0A0A] cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#ED4D30]/5 to-transparent pointer-events-none" />
            <p className="text-[10px] font-bold text-[#ED4D30] uppercase tracking-[0.18em] mb-2">CTA card</p>
            <p className="text-sm font-medium text-[#BFBFBF] group-hover:text-white transition-colors duration-150">Red glow enters on hover</p>
            <p className="text-xs text-[#444444] mt-1.5">Border → #ED4D30 at 40% opacity</p>
          </div>

          <div className="group border border-[#1F1F1F] hover:border-[#333333] transition-all duration-200 rounded-xl p-5 bg-[#0A0A0A] cursor-pointer">
            <p className="text-[10px] font-bold text-[#555555] uppercase tracking-[0.18em] mb-2">Quiet card</p>
            <p className="text-sm font-medium text-[#555555] group-hover:text-[#BFBFBF] transition-colors duration-200">Subtle — text only lifts</p>
            <p className="text-xs text-[#333333] group-hover:text-[#444444] transition-colors mt-1.5">No surface change, minimal border</p>
          </div>
        </div>
      </div>

      {/* Button states */}
      <div className="mb-12">
        <MetaLabel>Button interaction states</MetaLabel>
        <div className="flex flex-wrap gap-4 items-center">
          <button className="bg-[#ED4D30] text-white text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-colors duration-150">
            Primary CTA
          </button>
          <button className="border border-[#ED4D30]/50 text-[#ED4D30] text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-[0.1em] hover:border-[#ED4D30] hover:bg-[#ED4D30]/10 transition-all duration-150">
            Ghost Red
          </button>
          <button className="border border-[#333333] text-[#BFBFBF] text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-[0.1em] hover:border-[#555555] hover:text-white transition-all duration-150">
            Ghost Neutral
          </button>
          <button className="text-[#555555] text-xs font-medium hover:text-white transition-colors duration-150 flex items-center gap-1.5 group">
            Text link
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-150" />
          </button>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {[
            { label: "Primary fill → White on hover",    note: "bg-[#ED4D30] → hover:bg-white hover:text-black — inversion for premium feel" },
            { label: "Ghost borders → opacity increase",  note: "border opacity 50% → 100% on hover — signals interactivity without noise" },
            { label: "Arrow nudge",                       note: "translate-x-0.5 on hover — 2px nudge, duration-150 — minimal motion cue" },
            { label: "No scaling",                        note: "The system does not use scale transforms on interaction — too consumer-brand" },
          ].map(({ label, note }) => (
            <div key={label} className="border border-[#1F1F1F] rounded-lg px-4 py-3 bg-[#0A0A0A]">
              <p className="text-xs font-medium text-white mb-0.5">{label}</p>
              <p className="text-[10px] text-[#555555] leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Motion principles */}
      <div>
        <MetaLabel>Motion principles</MetaLabel>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-[#262626] rounded-xl bg-[#0A0A0A] p-6">
            <h4 className="text-sm font-semibold text-white mb-4">When to use motion</h4>
            <ul className="space-y-2">
              {[
                "Border color transitions on interactive cards",
                "Text color lift on hover (secondary → primary)",
                "Background surface shift on card hover",
                "Arrow/icon position nudge on link hover",
                "Opacity fade on mobile nav overlay",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-[#BFBFBF]">
                  <ChevronRight className="w-3 h-3 text-[#ED4D30] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-[#7F1D1D]/40 rounded-xl bg-[#0A0A0A] p-6">
            <h4 className="text-sm font-semibold text-white mb-4">When to restrain motion</h4>
            <ul className="space-y-2">
              {[
                "No entrance animations on page load — static first render",
                "No continuous animations unless data-driven",
                "No scale or bounce transforms — not this brand's register",
                "No parallax scrolling effects",
                "No animated backgrounds or gradients",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-[#BFBFBF]">
                  <span className="text-[#7F1D1D] mt-0.5 shrink-0 text-xs">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 border border-[#1F1F1F] rounded-xl p-5 bg-[#0A0A0A]">
          <MetaLabel>Transition spec</MetaLabel>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {[
              { prop: "Default",  val: "transition-all duration-200", note: "Standard card hover — color + border" },
              { prop: "Fast",     val: "transition-colors duration-150", note: "Button fills, text color changes" },
              { prop: "Slow",     val: "transition-opacity duration-300", note: "Glow fade-in, overlay entrance" },
            ].map(({ prop, val, note }) => (
              <div key={prop}>
                <p className="text-[10px] text-[#444444] uppercase tracking-wider mb-1">{prop}</p>
                <p className="text-xs font-mono text-[#ED4D30] mb-1">{val}</p>
                <p className="text-[10px] text-[#555555]">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

// ── SECTION: Forms + Booking ──────────────────────────────────────────────────

function FormsBookingSection() {
  return (
    <SectionWrapper id="forms-booking">
      <SectionHeading
        tag="09 · Forms & Booking"
        title="Forms & Booking Patterns"
        sub="The consultation booking flow is conversion-critical. Every pattern communicates premium, intentional UX — not mass-market form defaults."
      />

      {/* Consultation flow stages */}
      <div className="mb-12">
        <MetaLabel>Booking flow stages</MetaLabel>
        <div className="grid md:grid-cols-4 gap-3">
          {[
            { step: "01", label: "Intent Signal",    desc: "User selects consultation type. Intent toggle or category selector." },
            { step: "02", label: "Identity Capture", desc: "Name, contact, background. Minimal fields — quality over quantity." },
            { step: "03", label: "Context",          desc: "Goals, current situation, referral source. Qualification layer." },
            { step: "04", label: "Time Selection",   desc: "Date/time picker. Confirmation state. Booking summary card." },
          ].map(({ step, label, desc }) => (
            <div key={step} className="border border-[#1F1F1F] rounded-xl bg-[#0A0A0A] p-5">
              <p className="text-[10px] font-bold text-[#ED4D30] uppercase tracking-[0.18em] mb-2">{step}</p>
              <p className="text-sm font-semibold text-white mb-2">{label}</p>
              <p className="text-xs text-[#BFBFBF] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Intake form pattern */}
      <div className="mb-12">
        <MetaLabel>Intake field pattern</MetaLabel>
        <div className="border border-[#262626] rounded-xl bg-[#0A0A0A] p-6 md:p-8">
          <p className="text-[10px] font-bold text-[#ED4D30] uppercase tracking-[0.18em] mb-6">Booking · Intake Form</p>

          {/* Step header */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#1A1A1A]">
            <div className="w-7 h-7 rounded-full bg-[#ED4D30] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">1</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Identity Capture</p>
              <p className="text-xs text-[#555555]">Step 1 of 3 · Required fields</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {[
              { label: "First Name", placeholder: "Kenneth" },
              { label: "Last Name",  placeholder: "Castenada" },
            ].map(({ label, placeholder }) => (
              <div key={label}>
                <label className="text-[10px] font-bold text-[#555555] uppercase tracking-[0.15em] block mb-2">{label}</label>
                <div className="border border-[#262626] bg-[#111111] h-11 rounded-lg px-4 flex items-center hover:border-[#333333] transition-colors">
                  <span className="text-[#333333] text-sm">{placeholder}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="text-[10px] font-bold text-[#555555] uppercase tracking-[0.15em] block mb-2">Email</label>
            <div className="border border-[#262626] bg-[#111111] h-11 rounded-lg px-4 flex items-center hover:border-[#333333] transition-colors">
              <span className="text-[#333333] text-sm">kenneth@sdwithkenneth.com</span>
            </div>
          </div>

          {/* Intent toggle */}
          <div className="mb-6">
            <label className="text-[10px] font-bold text-[#555555] uppercase tracking-[0.15em] block mb-3">Consultation type</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {["Kangen Water",  "Hydration Protocol", "War Room Membership", "Stay Dangerous Mindset", "General Inquiry", "Partnership"].map((opt, i) => (
                <div
                  key={opt}
                  className={`border rounded-lg px-3 py-2.5 cursor-pointer transition-all text-xs ${
                    i === 0
                      ? "border-[#ED4D30]/50 bg-[#ED4D30]/10 text-white"
                      : "border-[#262626] bg-transparent text-[#555555] hover:border-[#333333] hover:text-[#BFBFBF]"
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>

          {/* Date/time pattern */}
          <div className="mb-6">
            <label className="text-[10px] font-bold text-[#555555] uppercase tracking-[0.15em] block mb-3">Preferred time</label>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div
                  key={day}
                  className={`border rounded-lg py-2 text-center cursor-pointer transition-all ${
                    i === 2
                      ? "border-[#ED4D30]/50 bg-[#ED4D30]/10 text-white"
                      : "border-[#1F1F1F] text-[#444444] hover:border-[#333333] hover:text-[#BFBFBF]"
                  }`}
                >
                  <p className="text-[9px] uppercase tracking-wider">{day}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <button className="w-full bg-[#ED4D30] hover:bg-white hover:text-black transition-colors text-white text-xs font-bold py-3.5 rounded-full uppercase tracking-[0.12em]">
            Book a Call Now
          </button>
        </div>
      </div>

      {/* Field patterns */}
      <div>
        <MetaLabel>Field pattern rules</MetaLabel>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { rule: "Label format",      spec: "10px · Bold · Uppercase · 0.15em tracking · #555555" },
            { rule: "Input resting",     spec: "border-[#262626] · bg-[#111111] · h-11 · rounded-lg" },
            { rule: "Input hover",       spec: "border-[#333333] · transition-colors duration-150" },
            { rule: "Input focus",       spec: "border-[#ED4D30]/60 · ring-0 (no default ring)" },
            { rule: "Selected state",    spec: "border-[#ED4D30]/50 · bg-[#ED4D30]/10 · text-white" },
            { rule: "Submit button",     spec: "Full width · rounded-full · bg-[#ED4D30] → white inversion" },
            { rule: "Payload structure", spec: "name · email · consultationType · preferredTime · context" },
            { rule: "Qualification",     spec: "context + referral fields for intent scoring before booking" },
          ].map(({ rule, spec }) => (
            <div key={rule} className="border border-[#1F1F1F] rounded-lg px-4 py-3 bg-[#0A0A0A]">
              <p className="text-xs font-medium text-white mb-0.5">{rule}</p>
              <p className="text-[10px] font-mono text-[#BFBFBF]">{spec}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ── SECTION: Component Inventory ──────────────────────────────────────────────

function ComponentInventorySection() {
  return (
    <SectionWrapper id="component-inventory">
      <SectionHeading
        tag="10 · Component Inventory"
        title="Component Inventory"
        sub="Curated primitives used in this system. Not an exhaustive library dump — only what's actively relevant to SD with Kenneth interfaces."
      />

      {/* Buttons */}
      <div className="mb-12">
        <MetaLabel>Buttons</MetaLabel>
        <div className="border border-[#1F1F1F] rounded-xl bg-[#0A0A0A] p-6">
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="bg-[#ED4D30] hover:bg-white hover:text-black transition-colors text-white text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-[0.1em]">
              Primary CTA
            </button>
            <button className="border border-[#333333] hover:border-[#555555] hover:text-white transition-all text-[#BFBFBF] text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-[0.1em]">
              Secondary
            </button>
            <button className="border border-[#ED4D30]/40 hover:border-[#ED4D30] text-[#ED4D30] text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-[0.1em] transition-all">
              Ghost Red
            </button>
            <button className="text-[#555555] hover:text-white transition-colors text-xs font-medium flex items-center gap-1.5 group">
              Text link <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-3 pt-4 border-t border-[#1A1A1A]">
            {[
              { name: "Primary",   use: "Main CTA only. One per view maximum." },
              { name: "Secondary", use: "Supporting actions. Neutral register." },
              { name: "Ghost Red", use: "Inline CTAs, card actions, secondary conversion." },
            ].map(({ name, use }) => (
              <div key={name}>
                <p className="text-xs font-medium text-white mb-0.5">{name}</p>
                <p className="text-[10px] text-[#555555]">{use}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Labels + badges */}
      <div className="mb-12">
        <MetaLabel>Labels & badges</MetaLabel>
        <div className="border border-[#1F1F1F] rounded-xl bg-[#0A0A0A] p-6">
          <div className="flex flex-wrap gap-3 mb-5">
            <span className="text-[9px] font-bold text-[#ED4D30] uppercase tracking-[0.18em] border border-[#ED4D30]/30 px-3 py-1.5 rounded-full">Red accent pill</span>
            <span className="text-[9px] font-bold text-[#BFBFBF] uppercase tracking-[0.18em] border border-[#333333] px-3 py-1.5 rounded-full">Neutral pill</span>
            <span className="text-[9px] font-bold text-white bg-[#ED4D30] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full">Filled pill</span>
            <span className="text-[10px] font-bold text-[#555555] uppercase tracking-[0.2em]">Overline label</span>
            <span className="text-[10px] font-bold text-[#ED4D30] uppercase tracking-[0.2em]">Red overline</span>
          </div>
          <p className="text-xs text-[#555555] pt-4 border-t border-[#1A1A1A]">
            Pills use rounded-full · px-3 py-1.5 · text-[9px]. Overlines are inline text only — no border.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="mb-12">
        <MetaLabel>Input primitives</MetaLabel>
        <div className="border border-[#1F1F1F] rounded-xl bg-[#0A0A0A] p-6 space-y-4">
          <div>
            <label className="text-[10px] font-bold text-[#555555] uppercase tracking-[0.15em] block mb-2">Text input</label>
            <div className="border border-[#262626] hover:border-[#333333] focus-within:border-[#ED4D30]/60 transition-colors bg-[#111111] h-11 rounded-lg px-4 flex items-center">
              <span className="text-[#333333] text-sm">Placeholder text</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-[#555555] uppercase tracking-[0.15em] block mb-2">Textarea</label>
            <div className="border border-[#262626] hover:border-[#333333] transition-colors bg-[#111111] rounded-lg px-4 py-3 h-20">
              <span className="text-[#333333] text-sm">Multi-line input...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section wrapper */}
      <div className="mb-12">
        <MetaLabel>Section wrappers</MetaLabel>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { name: "SectionWrapper",   code: "py-20 px-6 border-b border-[#1A1A1A] max-w-4xl" },
            { name: "SectionHeading",   code: "MetaLabel + h2 font-light + optional sub" },
            { name: "Content column",   code: "max-w-4xl mx-auto px-6 md:px-10 lg:px-16" },
            { name: "Card grid",        code: "grid md:grid-cols-2 gap-3 or gap-4" },
          ].map(({ name, code }) => (
            <div key={name} className="border border-[#1F1F1F] rounded-lg px-4 py-3 bg-[#0A0A0A]">
              <p className="text-xs font-semibold text-white mb-1">{name}</p>
              <p className="text-[10px] font-mono text-[#BFBFBF]">{code}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation elements */}
      <div>
        <MetaLabel>Navigation elements</MetaLabel>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-[#1F1F1F] rounded-xl bg-[#0A0A0A] p-5">
            <p className="text-xs font-semibold text-white mb-3">Sidebar nav item</p>
            <div className="space-y-1">
              {[{ label: "Brand Positioning", active: false }, { label: "Card System", active: true }, { label: "Typography", active: false }].map(({ label, active }) => (
                <div key={label} className={`flex items-center gap-2.5 py-1.5 ${active ? "text-white" : "text-[#444444]"}`}>
                  <div className={`w-[3px] h-3 rounded-full shrink-0 ${active ? "bg-[#ED4D30]" : "bg-transparent"}`} />
                  <span className="text-[11px]">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-[#1F1F1F] rounded-xl bg-[#0A0A0A] p-5">
            <p className="text-xs font-semibold text-white mb-3">Mobile header</p>
            <div className="border border-[#1A1A1A] rounded-lg px-4 py-3 flex items-center justify-between bg-[#030303]">
              <div className="flex items-center gap-2">
                <img src="/SDWKfav.png" alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />
                <div>
                  <p className="text-[10px] font-semibold text-white">SD with Kenneth</p>
                  <p className="text-[8px] text-[#ED4D30] uppercase tracking-wider">System Spec v1</p>
                </div>
              </div>
              <Menu className="w-4 h-4 text-[#444444]" />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

// ── SECTION: Logo System ──────────────────────────────────────────────────────

function LogoSystemSection() {
  return (
    <SectionWrapper id="logo-system">
      <SectionHeading
        tag="11 · Logo System"
        title="Logo System"
        sub="Version 1 guidance. Formal clearspace rules to be finalized in v2."
      />

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {[
          { src: "/sdnavbarlogo.png", label: "Primary Mark", file: "sdnavbarlogo.png", size: "h-12" },
          { src: "/SDWKfav.png",      label: "App / Favicon Mark", file: "SDWKfav.png", size: "w-12 h-12" },
          { src: "/verified.png",     label: "Trust / Verified Indicator", file: "verified.png", size: "w-10 h-10" },
        ].map(({ src, label, file, size }) => (
          <div key={file} className="border border-[#262626] rounded-xl bg-[#0A0A0A] p-8 flex flex-col items-center justify-center min-h-[160px]">
            <img src={src} alt={label} className={`${size} object-contain mb-4`} />
            <p className="text-xs text-[#666666]">{label}</p>
            <p className="text-[10px] font-mono text-[#333333] mt-1">{file}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <MetaLabel>Clear space rule</MetaLabel>
          <p className="text-sm text-[#BFBFBF] mb-4 leading-relaxed">
            Maintain at least 0.5× the logo height as padding on all sides.
            Never crowd the mark with other elements or place it over busy
            imagery without a dark backing layer.
          </p>
          <div className="inline-block border border-dashed border-[#333333] p-6">
            <div className="border border-dashed border-[#ED4D30]/40 p-4">
              <img src="/SDWKfav.png" alt="Clearspace demo" style={{ width: 36, height: 36, objectFit: "contain" }} />
            </div>
          </div>
          <p className="text-[10px] text-[#555555] mt-2">Dashed zone = minimum clearspace boundary</p>
        </div>
        <div>
          <MetaLabel>Minimum sizes</MetaLabel>
          <div className="space-y-4">
            {[
              { size: 20, label: "20px — Inline / caption minimum" },
              { size: 32, label: "32px — UI navigation recommended" },
              { size: 48, label: "48px — Marketing / hero headers" },
            ].map(({ size, label }) => (
              <div key={label} className="flex items-center gap-4">
                <img src="/SDWKfav.png" alt="" style={{ width: size, height: size, objectFit: "contain", flexShrink: 0 }} />
                <span className="text-sm text-[#BFBFBF]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <MetaLabel>Logo misuse</MetaLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "No glow effects",   style: { filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" } },
            { label: "No stretching",     style: { transform: "scaleX(1.7)" } },
            { label: "No rotation",       style: { transform: "rotate(20deg)" } },
            { label: "No color overlays", style: { filter: "hue-rotate(180deg) saturate(6)" } },
          ].map((misuse, i) => (
            <div key={i} className="border border-[#7F1D1D]/60 rounded-lg p-4 bg-[#0A0A0A] relative">
              <div className="flex items-center justify-center h-14">
                <img src="/SDWKfav.png" alt="misuse" style={{ width: 28, height: 28, objectFit: "contain", ...misuse.style }} />
              </div>
              <p className="text-[10px] text-[#7F1D1D] text-center mt-2">{misuse.label}</p>
              <div className="absolute top-2 right-2 w-4 h-4 border border-[#7F1D1D] flex items-center justify-center rounded">
                <span className="text-[#7F1D1D] text-[9px]">✕</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ── SECTION: Voice + Tone ─────────────────────────────────────────────────────

function VoiceToneSection() {
  return (
    <SectionWrapper id="voice-tone">
      <SectionHeading
        tag="12 · Voice & Tone"
        title="Voice & Tone"
        sub="The voice is consistent across consultation CTAs, community messaging, and educational content. It never hedges."
      />

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="border border-[#262626] rounded-xl bg-[#0A0A0A] p-6">
          <MetaLabel red>We are</MetaLabel>
          <ul className="space-y-2.5">
            {[
              "Assertive but not reckless",
              "Premium but not sterile",
              "Educational without sounding academic",
              "Persuasive without hard-sell pressure",
              "Independent, resilient, and systems-aware",
              "Community-oriented and conversion-conscious",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#BFBFBF]">
                <Check className="w-3.5 h-3.5 text-[#ED4D30] mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-[#7F1D1D]/40 rounded-xl bg-[#0A0A0A] p-6">
          <MetaLabel>We are not</MetaLabel>
          <ul className="space-y-2.5">
            {[
              "Overly casual or clout-chasing",
              "Buzzword-heavy or trend-following",
              "Verbose or over-explained",
              "Aggressive or high-pressure",
              "Generic or interchangeable",
              "Fake-urgent or manipulative",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#BFBFBF]">
                <span className="text-[#7F1D1D] mt-0.5 shrink-0 text-xs">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <MetaLabel>CTA language</MetaLabel>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { cta: "Book a Call",       ctx: "Primary consultation CTA" },
            { cta: "Book a Call Now",   ctx: "Elevated urgency variant" },
            { cta: "Enquire Now",       ctx: "Lead inquiry entry point" },
            { cta: "Apply Now",         ctx: "Gated community / high-intent" },
            { cta: "Join Email List",   ctx: "Newsletter / community entry" },
            { cta: "View Post",         ctx: "Social proof / evidence cards" },
          ].map(({ cta, ctx }) => (
            <div key={cta} className="border border-[#1F1F1F] rounded-lg p-4 bg-[#0A0A0A]">
              <p className="text-sm font-semibold text-white mb-1">{cta}</p>
              <p className="text-[10px] text-[#555555]">{ctx}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <MetaLabel>Writing rules</MetaLabel>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { rule: "Direct first",         ex: "'Book a Call Now' — not 'If you'd like, you can schedule...'" },
            { rule: "Sentence case",         ex: "'Stay dangerous, stay hydrated' — not STAY DANGEROUS in body" },
            { rule: "No buzzword stacking",  ex: "'Quiet discipline' — not 'transformative high-performance synergy'" },
          ].map(({ rule, ex }) => (
            <div key={rule} className="border border-[#262626] rounded-xl p-5 bg-[#0A0A0A]">
              <p className="text-sm font-medium text-white mb-2">{rule}</p>
              <p className="text-[10px] text-[#555555] leading-relaxed">{ex}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

// ── SECTION: Implementation ───────────────────────────────────────────────────

function ImplementationSection() {
  return (
    <SectionWrapper id="implementation" last>
      <SectionHeading
        tag="13 · Implementation"
        title="Implementation Principles"
        sub="The final word on how to use this system. Not rules for their own sake — principles that protect the quality bar."
      />

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {[
          {
            n: "01",
            title: "Consistency over novelty",
            body: "Do not introduce new card styles, colors, or type treatments because a design feels fresh. The system gains power through repetition. Use what exists. If something is genuinely missing, document it before using it.",
          },
          {
            n: "02",
            title: "Premium restraint",
            body: "Fewer elements. More space. The dark system looks premium through what is not there as much as what is. Resist the urge to fill empty space. Resist the urge to add another shade of gray.",
          },
          {
            n: "03",
            title: "Evidence + emotion balance",
            body: "SD with Kenneth converts through both systems. The evidence gives permission. The emotion gives motivation. Design should serve both — structured proof containers, emotionally resonant copy register.",
          },
          {
            n: "04",
            title: "Dark surfaces with legible hierarchy",
            body: "Every surface is dark. Legibility depends on precise tonal separation: white text, muted gray subtext, ghost gray labels — each with a specific role. Never compress the hierarchy.",
          },
          {
            n: "05",
            title: "Cards as modular trust containers",
            body: "The card is the system's primary trust vehicle. Metadata label + title + subtext + optional CTA. Always structured. Never freeform. The structure of the card communicates that the information inside is reliable.",
          },
          {
            n: "06",
            title: "Motion as emphasis, not decoration",
            body: "Hover states signal interactivity. Transitions are fast and purposeful. Nothing enters on scroll. Nothing bounces. The system moves with intention — like someone who knows where they're going.",
          },
        ].map(({ n, title, body }) => (
          <div key={n} className="border border-[#1F1F1F] rounded-xl bg-[#0A0A0A] p-6">
            <p className="text-[10px] font-bold text-[#ED4D30] uppercase tracking-[0.18em] mb-3">{n}</p>
            <h4 className="text-sm font-semibold text-white mb-2">{title}</h4>
            <p className="text-sm text-[#BFBFBF] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* Closing mark */}
      <div className="border border-[#1A1A1A] rounded-xl p-8 text-center">
        <img src="/SDWKfav.png" alt="SD with Kenneth" style={{ width: 36, height: 36, objectFit: "contain", margin: "0 auto 16px" }} />
        <p className="text-[10px] font-bold text-[#ED4D30] uppercase tracking-[0.2em] mb-2">SD with Kenneth · System Spec v1</p>
        <p className="text-sm text-[#555555]">
          This document is a living specification. Update it when the system evolves.<br />
          Do not build outside its rules without documenting why.
        </p>
      </div>
    </SectionWrapper>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A] py-10 px-6 md:px-10 lg:px-16">
      <div className="max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <img src="/SDWKfav.png" alt="SD with Kenneth" style={{ width: 24, height: 24, objectFit: "contain" }} />
          <span className="text-xs text-[#444444]">
            © {new Date().getFullYear()} SD with Kenneth. All rights reserved.
          </span>
        </div>
        <p className="text-xs text-[#444444]">
          Kenneth Castenada ·{" "}
          <span className="text-[#ED4D30]">@sdwithkenneth</span>{" "}
          · System Spec v1
        </p>
      </div>
    </footer>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function BrandGuidelines() {
  return (
    <GuidelinesShell>
      <div className="max-w-4xl">
        <OverviewSection />
        <BrandPositioningSection />
        <VisualDNASection />
        <ColorSystemSection />
        <TypographySection />
        <CardSystemSection />
        <LayoutGridSection />
        <InteractionMotionSection />
        <FormsBookingSection />
        <ComponentInventorySection />
        <LogoSystemSection />
        <VoiceToneSection />
        <ImplementationSection />
      </div>
      <Footer />
    </GuidelinesShell>
  )
}
