import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { parcoursClient } from "@/content/parcours";

/** Le parcours client en quatre étapes — même source que la page Particuliers. */
export function Methode() {
  return (
    <Section>
      <SectionHeader
        align="center"
        eyebrow="Comment ça se passe"
        title="Quatre étapes, aucune surprise."
        intro="La même séquence à chaque fois, du dépannage chez un particulier au chantier d'entreprise. C'est ce qui rend le devis prévisible."
      />

      <div className="relative mt-14">
        {/* Fil qui relie les étapes, visible entre les cartes sur une ligne */}
        <span
          className="absolute top-[3.25rem] right-[12%] left-[12%] hidden border-t-2 border-dashed border-primary/20 lg:block"
          aria-hidden
        />
        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {parcoursClient.map((e, i) => (
            <li key={e.titre}>
              <Reveal delay={i * 70} className="h-full">
                <Card className="h-full items-start gap-0 px-6 py-6 shadow-card">
                  <span className="tnum flex size-14 items-center justify-center rounded-2xl bg-primary font-heading text-xl font-extrabold text-primary-foreground shadow-[0_12px_24px_-12px_rgb(22_35_193/0.7)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <CardContent className="mt-5 px-0">
                    <CardTitle className="text-base leading-snug font-bold">{e.titre}</CardTitle>
                    <CardDescription className="mt-2 text-[0.92rem] leading-relaxed">
                      {e.detail}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
