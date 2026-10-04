import { cn } from "@/lib/utils";
import { Container } from "./container";

type Ton = "blanc" | "doux" | "bleu";

const fonds: Record<Ton, string> = {
  blanc: "bg-background",
  doux: "bg-muted",
  bleu: "bg-primary text-primary-foreground",
};

/**
 * Section de page. Les sections alternent blanc et fond doux plutôt que
 * d'être séparées par des filets — c'est l'espace qui structure, comme sur
 * la maquette de référence.
 */
export function Section({
  id,
  className,
  children,
  tone = "blanc",
  size = "default",
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  tone?: Ton;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-16 sm:py-20 lg:py-24", fonds[tone], className)}
    >
      <Container size={size}>{children}</Container>
    </section>
  );
}

/** Surtitre de section — court, en bleu, précédé d'un filet. */
export function Eyebrow({
  children,
  className,
  tone = "clair",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "clair" | "sombre";
}) {
  return (
    <p
      className={cn(
        "mb-4 inline-flex items-center gap-2.5 text-sm font-semibold",
        tone === "clair" ? "text-primary" : "text-white/80",
        className,
      )}
    >
      <span
        className={cn("h-0.5 w-6 rounded-full", tone === "clair" ? "bg-primary/40" : "bg-white/40")}
        aria-hidden
      />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "clair",
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "clair" | "sombre";
  /** Élément aligné à droite du titre (bouton « Voir tout »), en alignement gauche. */
  action?: React.ReactNode;
  className?: string;
}) {
  const entete = (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className="text-[1.9rem] leading-[1.12] sm:text-4xl lg:text-[2.6rem]">{title}</h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-lg",
            tone === "clair" ? "text-muted-foreground" : "text-white/75",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );

  if (!action) return <div className={className}>{entete}</div>;

  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      {entete}
      <div className="shrink-0">{action}</div>
    </div>
  );
}
