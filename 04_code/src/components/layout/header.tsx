"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRightIcon,
  ListIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";

import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site } from "@/content/site";
import { realisationsVisibles } from "@/content/realisations";
import { telUrl, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/professionnels", label: "Professionnels" },
  { href: "/particuliers", label: "Particuliers" },
  // La page Réalisations n'entre dans la navigation qu'une fois documentée.
  ...(realisationsVisibles ? [{ href: "/realisations", label: "Réalisations" }] : []),
  { href: "/a-propos", label: "À propos" },
];

function estActif(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Barre de navigation — une seule ligne, comme la maquette : logo à gauche,
 * cinq entrées au centre, téléphone et demande de devis à droite. Les deux
 * côtés prennent la même part de la largeur, ce qui garde le menu au milieu
 * de l'écran ; l'écart entre les entrées grandit avec l'écran. Sur mobile,
 * le menu s'ouvre dans un panneau latéral (Sheet shadcn).
 */
export function Header() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center gap-6 lg:h-20">
          <div className="flex flex-1 items-center">
            <Link href="/" aria-label={`${site.name} — accueil`} className="shrink-0">
              {/* Le descripteur n'a la place qu'à partir de 1 536 px */}
              <Logo
                prioritaire
                withDescriptor
                className="h-8 lg:h-9"
                descriptorClassName="hidden 2xl:block"
              />
            </Link>
          </div>

          <nav
            className="hidden items-center lg:flex xl:gap-4 2xl:gap-8"
            aria-label="Navigation principale"
          >
            {nav.map((item) => {
              const actif = estActif(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={actif ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-2.5 py-2 text-[0.92rem] font-medium whitespace-nowrap transition-colors xl:px-3",
                    actif ? "text-primary" : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {item.label}
                  {actif && (
                    <span
                      className="absolute inset-x-2.5 -bottom-[1.15rem] h-0.5 rounded-full bg-primary xl:inset-x-3"
                      aria-hidden
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden flex-1 items-center justify-end gap-3 lg:flex">
            {/* Entre 1 024 et 1 280 px, le numéro cède la place au menu :
                il ne reste que la pastille, nommée par aria-label */}
            <a
              href={telUrl()}
              aria-label={`Appeler le ${site.phoneDisplay}`}
              className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:text-primary"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <PhoneIcon weight="duotone" className="size-[1.1rem]" aria-hidden />
              </span>
              <span className="hidden leading-tight whitespace-nowrap xl:block">
                <span className="block text-[0.7rem] text-subtil">Appelez-nous</span>
                <span className="tnum block font-semibold text-foreground">
                  {site.phoneDisplay}
                </span>
              </span>
            </a>
            <Button asChild size="lg">
              <Link href="/contact">Demander un devis</Link>
            </Button>
          </div>

          <Sheet open={ouvert} onOpenChange={setOuvert}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-lg" className="-mr-2 lg:hidden" aria-label="Ouvrir le menu">
                <ListIcon className="size-6" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88%] gap-0 sm:max-w-sm">
              <div className="border-b border-border px-5 py-4">
                <SheetTitle asChild>
                  <span>
                    <Logo className="h-8" />
                  </span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation et contacts {site.name}
                </SheetDescription>
              </div>

              <nav className="flex flex-col px-3 py-4" aria-label="Navigation mobile">
                {[...nav, { href: "/faq", label: "Questions fréquentes" }].map((item) => {
                  const actif = estActif(pathname, item.href);
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={actif ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-3 font-heading text-lg font-semibold transition-colors",
                          actif ? "bg-secondary text-primary" : "text-foreground hover:bg-muted",
                        )}
                      >
                        {item.label}
                        <ArrowRightIcon className="size-4 text-subtil" aria-hidden />
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-3 border-t border-border p-5">
                <SheetClose asChild>
                  <Button asChild size="xl" className="w-full">
                    <Link href="/contact">Demander un devis</Link>
                  </Button>
                </SheetClose>
                <div className="grid grid-cols-2 gap-3">
                  <Button asChild variant="outline" size="lg">
                    <a href={telUrl()}>
                      <PhoneIcon weight="duotone" aria-hidden />
                      Appeler
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                      <WhatsappLogoIcon weight="fill" className="text-whatsapp" aria-hidden />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
