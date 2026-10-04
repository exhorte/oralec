import { ArrowRightIcon, FileTextIcon } from "@phosphor-icons/react/ssr";

import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { Photo } from "@/components/ui/photo";
import { Section, SectionHeader } from "@/components/ui/section";
import { aPropos } from "@/content/accueil";
import { site } from "@/content/site";

/**
 * À propos — texte, liste d'engagements et photo, comme la section
 * « Une entreprise d'électricité engagée et passionnée » de la maquette.
 * La liste reprend les quatre engagements procéduraux d'Oralec plutôt que
 * des qualités génériques : ce sont eux qui se vérifient.
 */
export function APropos() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeader eyebrow={aPropos.surtitre} title={aPropos.titre} intro={aPropos.texte} />

          <ul className="mt-9 grid gap-4 sm:grid-cols-2">
            {site.engagements.map((e) => (
              <li key={e.title} className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon name={e.icon} className="size-[1.1rem]" />
                </span>
                <span className="pt-1 text-[0.95rem] leading-snug font-semibold text-foreground">
                  {e.title}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <ButtonLink href="/a-propos" size="xl">
              En savoir plus
              <ArrowRightIcon weight="bold" data-icon="inline-end" aria-hidden />
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -top-4 -left-4 h-3/5 w-3/5 rounded-3xl bg-bleu-clair" aria-hidden />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-float lg:aspect-[5/4]">
              <Photo name={aPropos.photo} sizes="(min-width: 1024px) 46vw, 94vw" />
            </div>

            {/* Encart : la preuve concrète, pas un slogan */}
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-float ring-1 ring-black/5 sm:left-10">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <FileTextIcon weight="duotone" className="size-6" aria-hidden />
              </span>
              <span className="leading-tight">
                <span className="block font-heading font-bold text-foreground">{aPropos.encart.titre}</span>
                <span className="block text-sm text-muted-foreground">{aPropos.encart.detail}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
