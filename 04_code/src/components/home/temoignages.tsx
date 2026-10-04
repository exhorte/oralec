import { QuotesIcon, StarIcon } from "@phosphor-icons/react/ssr";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { temoignages, temoignagesVisibles } from "@/content/temoignages";

function initiales(nom: string) {
  return nom
    .split(/\s+/)
    .map((m) => m[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * « Ils nous font confiance » — la section témoignages de la maquette.
 *
 * Ne s'affiche qu'à partir de SEUIL_TEMOIGNAGES avis réels et sourcés
 * (voir src/content/temoignages.ts). Avant cela, elle ne rend rien : un
 * témoignage inventé coûte plus de confiance qu'il n'en rapporte.
 */
export function Temoignages() {
  if (!temoignagesVisibles) return null;

  return (
    <Section>
      <SectionHeader
        align="center"
        eyebrow="Témoignages"
        title="Ils nous font confiance."
        intro="Des avis recueillis auprès de nos clients, avec leur accord."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {temoignages.map((t) => (
          <Card key={t.auteur + t.texte.slice(0, 12)} className="h-full gap-0 px-0 shadow-card">
            <CardContent className="flex-1 px-6">
              <div className="flex items-center justify-between">
                <span className="flex gap-0.5 text-primary" aria-label={`Note : ${t.note} sur 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} weight={i < t.note ? "fill" : "regular"} className="size-4" aria-hidden />
                  ))}
                </span>
                <QuotesIcon weight="fill" className="size-7 text-bleu-clair" aria-hidden />
              </div>
              <blockquote className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                «&nbsp;{t.texte}&nbsp;»
              </blockquote>
            </CardContent>
            <CardFooter className="mt-6 gap-3 px-6">
              <Avatar size="lg">
                <AvatarFallback className="bg-primary font-semibold text-primary-foreground">
                  {initiales(t.auteur)}
                </AvatarFallback>
              </Avatar>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-foreground">{t.auteur}</span>
                <span className="block text-xs text-subtil">
                  {t.role} · {t.source}
                </span>
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
