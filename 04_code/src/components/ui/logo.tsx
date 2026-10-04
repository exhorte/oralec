import Image from "next/image";

import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/* Rapport largeur / hauteur des fichiers officiels (viewBox des SVG). */
const RATIO_LOGO = 35374642 / 9130000;

/**
 * Marque Oralec — les fichiers officiels de `06_logos_icons`, copiés dans
 * `public/brand` : le symbole (deux arcs qui forment un « O ») et le nom.
 *
 * Servis en `<img>` plutôt qu'en SVG inline : chaque fichier déclare un
 * masque `id="m"`, et deux logos inline sur une même page (en-tête et pied)
 * se disputeraient cet identifiant.
 *
 * La hauteur se règle par `className` (`h-8`, `h-9`…), la largeur suit.
 */
export function Logo({
  className,
  withDescriptor = false,
  descriptorClassName,
  tone = "bleu",
  prioritaire = false,
}: {
  className?: string;
  /** Ajoute « Électricité & Climatisation » à droite, après un filet. */
  withDescriptor?: boolean;
  /** Pour n'afficher le descripteur qu'à partir d'une largeur d'écran. */
  descriptorClassName?: string;
  /** `bleu` sur fond clair, `blanc` sur fond bleu. */
  tone?: "bleu" | "blanc";
  /** Logo de l'en-tête, visible dès le chargement. */
  prioritaire?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-3.5">
      <Image
        src={tone === "bleu" ? "/brand/oralec-logo.svg" : "/brand/oralec-logo-blanc.svg"}
        alt={site.name}
        width={Math.round(36 * RATIO_LOGO)}
        height={36}
        // max-w-none : sans lui, le `max-width: 100%` de Tailwind laisse un
        // conteneur flex comprimer le logo
        className={cn("h-9 w-auto max-w-none shrink-0", className)}
        {...(prioritaire ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
      />
      {withDescriptor && (
        <span
          className={cn(
            "border-l pl-3.5 text-[0.62rem] leading-[1.35] font-semibold tracking-[0.16em] uppercase",
            tone === "bleu" ? "border-border text-subtil" : "border-white/20 text-white/70",
            descriptorClassName,
          )}
        >
          {site.descriptor.split(" & ").map((mot, i) => (
            <span key={mot} className="block">
              {i > 0 && "& "}
              {mot}
            </span>
          ))}
        </span>
      )}
    </span>
  );
}
