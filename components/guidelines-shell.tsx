"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import { Menu, X } from "lucide-react"

export const NAV_SECTIONS = [
  { id: "overview",             label: "Overview" },
  { id: "brand-positioning",    label: "Brand Positioning" },
  { id: "visual-dna",           label: "Visual DNA" },
  { id: "color-system",         label: "Color System" },
  { id: "typography",           label: "Typography" },
  { id: "card-system",          label: "Card System" },
  { id: "layout-grid",          label: "Layout & Grid" },
  { id: "interaction-motion",   label: "Interaction & Motion" },
  { id: "forms-booking",        label: "Forms & Booking" },
  { id: "component-inventory",  label: "Component Inventory" },
  { id: "logo-system",          label: "Logo System" },
  { id: "voice-tone",           label: "Voice & Tone" },
  { id: "implementation",       label: "Implementation" },
]

function NavLink({
  section,
  active,
  onClick,
}: {
  section: { id: string; label: string }
  active: boolean
  onClick?: () => void
}) {
  return (
    <a
      href={`#${section.id}`}
      onClick={onClick}
      className={`
        group flex items-center gap-2.5 text-[11px] py-1.5 transition-all duration-150
        ${active
          ? "text-white font-medium"
          : "text-[#555555] hover:text-[#aaaaaa] font-normal"
        }
      `}
    >
      <span
        className={`
          block w-[3px] h-3 rounded-full shrink-0 transition-all duration-150
          ${active ? "bg-[#ED4D30]" : "bg-transparent group-hover:bg-[#333333]"}
        `}
      />
      {section.label}
    </a>
  )
}

export function SideNav({ active }: { active: string }) {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[220px] border-r border-[#1F1F1F] bg-[#030303] z-40">
      {/* Logo lockup */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-[#1A1A1A]">
        <img
          src="/SDWKfav.png"
          alt="SD with Kenneth"
          style={{ width: 24, height: 24, objectFit: "contain" }}
        />
        <div>
          <p className="text-[11px] font-semibold text-white leading-tight">SD with Kenneth</p>
          <p className="text-[9px] text-[#ED4D30] uppercase tracking-[0.18em] mt-0.5">System Spec v1</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-5 py-5">
        <p className="text-[9px] font-bold text-[#333333] uppercase tracking-[0.2em] mb-3 px-[11px]">
          Contents
        </p>
        <div className="space-y-0.5">
          {NAV_SECTIONS.map((s) => (
            <NavLink key={s.id} section={s} active={active === s.id} />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[#1A1A1A]">
        <p className="text-[10px] text-[#333333]">Kenneth Castenada</p>
        <p className="text-[10px] text-[#ED4D30]">@sdwithkenneth</p>
      </div>
    </aside>
  )
}

export function MobileNav({ active }: { active: string }) {
  const [open, setOpen] = useState(false)

  // Close on scroll or section change
  useEffect(() => {
    if (open) setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return (
    <>
      {/* Sticky top bar */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-5 py-3.5 border-b border-[#1A1A1A] bg-[#030303]/95 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <img src="/SDWKfav.png" alt="SD with Kenneth" style={{ width: 22, height: 22, objectFit: "contain" }} />
          <div>
            <p className="text-[11px] font-semibold text-white leading-none">SD with Kenneth</p>
            <p className="text-[9px] text-[#ED4D30] uppercase tracking-[0.18em] mt-0.5">System Spec v1</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-1.5 text-[#666666] hover:text-white transition-colors"
          aria-label="Toggle navigation"
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* Drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 pt-[52px]">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <nav className="relative bg-[#030303] border-r border-[#1F1F1F] w-[240px] h-full overflow-y-auto px-5 py-5">
            <p className="text-[9px] font-bold text-[#333333] uppercase tracking-[0.2em] mb-3 px-[11px]">
              Contents
            </p>
            <div className="space-y-0.5">
              {NAV_SECTIONS.map((s) => (
                <NavLink
                  key={s.id}
                  section={s}
                  active={active === s.id}
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

export function GuidelinesShell({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("overview")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    )
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <MobileNav active={active} />
      <SideNav active={active} />
      <main className="lg:pl-[220px]">{children}</main>
    </div>
  )
}
