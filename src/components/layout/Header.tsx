"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { primaryNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLLIElement>(null);

  // Solid once the hero is behind us; transparent while over it (§7).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any navigation closes everything.
  useEffect(() => {
    setDrawerOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Lock body scroll behind the mobile drawer.
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setDrawerOpen(false);
      setOpenMenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Click outside the dropdown closes it.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  const isActive = useCallback(
    (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href)),
    [pathname],
  );

  const solid = scrolled || drawerOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
        solid
          ? "bg-white text-ink shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
          : "bg-transparent text-white",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6 md:h-[88px]">
        <Logo href="/" size="sm" className="text-current" />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {primaryNav.map((item) =>
              item.children ? (
                <li key={item.label} ref={menuRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu((current) => (current === item.label ? null : item.label))
                    }
                    onMouseEnter={() => setOpenMenu(item.label)}
                    className={cn(
                      "flex items-center gap-1.5 py-2 text-[15px] font-medium transition-colors",
                      solid ? "hover:text-brand-dark" : "hover:text-brand-light",
                      isActive("/services") && (solid ? "text-brand-dark" : "text-brand-light"),
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "size-4 transition-transform duration-200",
                        openMenu === item.label && "rotate-180",
                      )}
                    />
                  </button>

                  {openMenu === item.label ? (
                    <div
                      onMouseLeave={() => setOpenMenu(null)}
                      className="absolute left-1/2 top-full w-[360px] -translate-x-1/2 pt-3"
                    >
                      <ul className="overflow-hidden rounded-card bg-white p-2 text-ink shadow-[0_16px_48px_rgba(0,0,0,0.14)]">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-[10px] px-4 py-3 transition-colors hover:bg-mint-field"
                            >
                              <span className="block text-[15px] font-semibold text-ink">
                                {child.label}
                              </span>
                              {child.description ? (
                                <span className="mt-0.5 block text-[13px] leading-snug text-muted">
                                  {child.description}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "py-2 text-[15px] font-medium transition-colors",
                      solid ? "hover:text-brand-dark" : "hover:text-brand-light",
                      isActive(item.href) && (solid ? "text-brand-dark" : "text-brand-light"),
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/#contact" className="px-6 py-3.5">
            Reinstate Now
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-button lg:hidden"
        >
          <Menu aria-hidden="true" className="size-6" />
        </button>
      </Container>

      {/* Full-screen mobile drawer */}
      <div
        hidden={!drawerOpen}
        className="fixed inset-0 z-50 bg-white text-ink lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <Container className="flex h-[72px] items-center justify-between">
          <Logo href="/" size="sm" />
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-button"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
        </Container>

        <Container className="flex h-[calc(100dvh-72px)] flex-col overflow-y-auto pb-10">
          <nav aria-label="Mobile" className="flex-1">
            <ul className="divide-y divide-mint">
              {primaryNav.map((item) => (
                <li key={item.label} className="py-1">
                  {item.children ? (
                    <div className="py-3">
                      <span className="eyebrow">{item.label}</span>
                      <ul className="mt-3 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-[10px] px-3 py-2.5 text-[17px] font-medium hover:bg-mint-field"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-4 text-[19px] font-semibold hover:text-brand-dark"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 space-y-3">
            <ButtonLink href="/#contact" fullWidth>
              Reinstate Now
            </ButtonLink>
            <a
              href={site.phoneHref}
              className="btn-label flex w-full items-center justify-center gap-2.5 rounded-button border-2 border-brand-light py-4 text-brand-dark"
            >
              <Phone aria-hidden="true" className="size-4" />
              {site.phoneDisplay}
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
