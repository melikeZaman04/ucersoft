"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MotionToggle } from "@/components/motion-toggle";

const homeLinks = [
  { href: "/#xstudio", label: "XStudio" },
  { href: "/#akilli-civata", label: "Akıllı Civata" },
  { href: "/#nasil-calisir", label: "Nasıl Çalışır?" },
  { href: "/#muhendislik", label: "Teknik" },
  { href: "/#iletisim", label: "İletişim" },
];

const smartBoltLinks = [
  { href: "/#urunler", label: "Ürünler" },
  { href: "/akilli-civata#sistem", label: "Sistem" },
  { href: "/akilli-civata#donanim", label: "Donanım" },
  { href: "/akilli-civata#platform", label: "Platform" },
  { href: "/akilli-civata#hedefler", label: "Uyumluluk" },
  { href: "/akilli-civata#teknik-gorusme", label: "İletişim" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const links = pathname === "/akilli-civata" ? smartBoltLinks : homeLinks;
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className={`site-header ${compact ? "is-compact" : ""}`}>
      <div className="header-inner">
        <Link href="/#genel-bakis" className="brand" aria-label="Üçersoft ana sayfa">
          <Image
            src="/brand/ucersoft-logo-header.webp"
            alt="Üçersoft"
            width={831}
            height={360}
            priority
          />
        </Link>

        <nav className="desktop-nav" aria-label="Ana navigasyon">
          {links.map((link, index) => (
            <Link className={index === links.length - 1 ? "nav-cta" : undefined} key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-tools">
          <MotionToggle className="motion-toggle-header" />
          <button
          className="menu-button"
          type="button"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav id="mobile-navigation" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobil navigasyon" aria-hidden={!open}>
        {links.map((link, index) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
