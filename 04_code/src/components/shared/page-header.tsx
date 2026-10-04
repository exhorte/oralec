import Link from "next/link";
import { CaretRightIcon } from "@phosphor-icons/react/ssr";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { Photo } from "@/components/ui/photo";
import type { PhotoKey } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * En-tête des pages intérieures, en trois mises en page :
 *
 * — `simple`     : texte seul sur fond doux ;
 * — `vignette`   : texte à gauche, photo encadrée à droite ;
 * — `couverture` : photo pleine largeur, lumineuse, voilée de blanc côté
 *                  texte — le parti pris d'arktyk.fr, qui vend une ambiance
 *                  plutôt qu'un appareil. Sur mobile, la photo passe sous le
 *                  texte : un voile blanc sur un petit écran l'effacerait.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumb,
  children,
  photo,
  layout = photo ? "vignette" : "simple",
  mirrored = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumb?: { label: string; href: string }[];
  children?: React.ReactNode;
  photo?: PhotoKey;
  layout?: "simple" | "vignette" | "couverture";
  mirrored?: boolean;
}) {
  const texte = (
    <>
      {breadcrumb && <FilAriane items={breadcrumb} />}
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="max-w-3xl text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
        {title}
      </h1>
      {intro && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      {children && <div className="mt-9">{children}</div>}
    </>
  );

  if (layout === "couverture" && photo) {
    return (
      <section className="relative overflow-hidden border-b border-border bg-white">
        <Container className="relative z-10">
          <div className="py-14 sm:py-16 lg:max-w-[38rem] lg:py-28">{texte}</div>
        </Container>

        {/* Une seule image : dans le flux sur mobile, en fond sur desktop */}
        <div className="relative mx-4 mb-10 aspect-[16/10] overflow-hidden rounded-2xl sm:mx-6 lg:absolute lg:inset-0 lg:m-0 lg:aspect-auto lg:rounded-none">
          <Photo name={photo} sizes="(min-width: 1024px) 100vw, 92vw" mirrored={mirrored} prioritaire />
          <div
            className="absolute inset-0 hidden bg-linear-to-r from-white from-30% via-white/75 via-45% to-white/0 to-70% lg:block"
            aria-hidden
          />
        </div>
      </section>
    );
  }

  if (layout === "vignette" && photo) {
    return (
      <section className="relative overflow-hidden border-b border-border bg-linear-to-b from-white to-muted">
        <Container className="relative">
          <div className="grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
            <div className="lg:col-span-7">{texte}</div>
            <div className="lg:col-span-5">
              <div className="relative">
                <div
                  className="absolute -right-3 -bottom-3 h-2/3 w-2/3 rounded-2xl bg-primary"
                  aria-hidden
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-float ring-1 ring-foreground/5">
                  <Photo
                    name={photo}
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    mirrored={mirrored}
                    prioritaire
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-muted">
      <Container className="relative">
        <div className="py-14 sm:py-20">{texte}</div>
      </Container>
    </section>
  );
}

function FilAriane({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-7">
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-xs text-subtil")}>
        <li>
          <Link href="/" className="transition-colors hover:text-primary">
            Accueil
          </Link>
        </li>
        {items.map((b, i) => (
          <li key={b.href} className="flex items-center gap-1.5">
            <CaretRightIcon className="size-3" aria-hidden />
            {i === items.length - 1 ? (
              <span className="font-medium text-foreground" aria-current="page">
                {b.label}
              </span>
            ) : (
              <Link href={b.href} className="transition-colors hover:text-primary">
                {b.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
