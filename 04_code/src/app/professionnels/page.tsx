import Link from "next/link";
import { ArrowRightIcon, CheckIcon, MinusIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";

import { PageHeader } from "@/components/shared/page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { JsonLd } from "@/components/ui/json-ld";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

import { contrats, cycleCare } from "@/content/contrats";
import { secteurs } from "@/content/secteurs";
import { site } from "@/content/site";
import type { IconName } from "@/content/types";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Oralec Business — Maintenance électricité et climatisation pour entreprises",
  description:
    "Contrats de maintenance multi-techniques à Dakar : climatisation, froid et électricité. Hôtels, restaurants, bureaux, commerces, industrie. Un seul interlocuteur, des délais écrits au contrat.",
  path: "/professionnels",
});

const MESSAGE = `Bonjour ${site.name}, je souhaite discuter d'un contrat de maintenance pour mon établissement.`;

const constat: { icon: IconName; t: string; d: string }[] = [
  {
    icon: "inventaire",
    t: "Aucun inventaire",
    d: "Personne ne sait exactement combien d'équipements techniques compte le site, ni leur âge.",
  },
  {
    icon: "sirene",
    t: "Tout est urgent",
    d: "Les interventions sont déclenchées par la panne, jamais planifiées.",
  },
  {
    icon: "document",
    t: "Aucune trace",
    d: "Ce qui a été réparé l'an dernier n'est écrit nulle part. Les mêmes pannes reviennent.",
  },
  {
    icon: "alerte",
    t: "Responsabilité diluée",
    d: "Le frigoriste renvoie sur l'électricien, l'électricien sur le frigoriste.",
  },
];

export default function ProfessionnelsPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${site.name} Business`}
        title="La maintenance technique de vos bâtiments, sans interruption."
        intro="La climatisation, le froid et l'électricité sur un seul contrat, avec un interlocuteur unique et des délais d'intervention écrits. Plus de renvoi de responsabilité quand une panne se situe à la frontière de deux métiers."
        breadcrumb={[{ label: "Professionnels", href: "/professionnels" }]}
        photo="technicienneArmoire"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="xl">
            Demander une étude
            <ArrowRightIcon weight="bold" data-icon="inline-end" aria-hidden />
          </ButtonLink>
          <ButtonLink href={whatsappUrl(MESSAGE)} variant="outline" size="xl" external>
            <WhatsappLogoIcon weight="fill" className="text-whatsapp" data-icon="inline-start" aria-hidden />
            En parler sur WhatsApp
          </ButtonLink>
        </div>
      </PageHeader>

      {/* ------------------------------------------------ Le constat */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Le constat"
              title="Le budget technique est presque toujours subi."
              intro="Sur la plupart des sites que nous reprenons, on paie des urgences, jamais des visites. C'est le mode le plus cher qui existe."
            />
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-2">
              {constat.map((item) => (
                <li key={item.t}>
                  <Card className="h-full gap-0 px-6 py-6 shadow-card">
                    <IconTile name={item.icon} size="sm" />
                    <h3 className="mt-4 text-base font-bold">{item.t}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{item.d}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ Secteurs */}
      <Section tone="doux">
        <SectionHeader
          eyebrow="Secteurs"
          title="Chaque activité a son point de rupture."
          intro="Nous ne vendons pas la même chose à un hôtel et à un entrepôt. Ce qui change, ce n'est pas la prestation : c'est ce qui se casse en premier, et ce que ça coûte."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {secteurs.map((s, i) => (
            <Reveal key={s.slug} delay={i * 40} className="h-full">
              <Card className="h-full gap-0 py-0 shadow-card">
                <CardHeader className="flex-row items-center gap-4 px-6 pt-6">
                  <IconTile name={s.icon} />
                  <CardTitle className="text-lg font-bold">{s.nom}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 px-6 pt-5 pb-6">
                  <p className="border-l-2 border-primary pl-4 text-sm text-muted-foreground">{s.enjeu}</p>
                  <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                    {s.interventions.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <CheckIcon weight="bold" className="mt-1 size-3.5 shrink-0 text-primary" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------ Contrats */}
      <Section id="contrats">
        <SectionHeader
          align="center"
          eyebrow="Contrats de maintenance"
          title="Trois niveaux, un seul principe."
          intro="Plus le coût d'un arrêt est élevé, plus le délai d'intervention garanti doit être court. C'est le seul critère qui détermine vraiment le palier."
        />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {contrats.map((c) => (
            <Card
              key={c.tier}
              className={cn(
                "gap-0 py-0 shadow-card",
                c.featured && "bg-primary text-primary-foreground shadow-band ring-0 lg:-translate-y-3",
              )}
            >
              <CardHeader className="gap-0 px-7 pt-8">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-2xl font-extrabold">{c.tier}</CardTitle>
                  {c.featured && (
                    <Badge className="bg-white px-2.5 text-[0.68rem] tracking-wide text-primary uppercase">
                      Le plus choisi
                    </Badge>
                  )}
                </div>
                <CardDescription className={cn("mt-2 text-[0.95rem] font-semibold", c.featured ? "text-white" : "text-primary")}>
                  {c.pitch}
                </CardDescription>
                <p className={cn("mt-3 text-sm", c.featured ? "text-white/70" : "text-muted-foreground")}>{c.cible}</p>
              </CardHeader>

              <CardContent className="px-7 pt-6">
                <ul className={cn("space-y-2.5 border-t pt-6", c.featured ? "border-white/15" : "border-border")}>
                  {c.inclus.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <CheckIcon
                        weight="bold"
                        className={cn("mt-0.5 size-4 shrink-0", c.featured ? "text-white" : "text-primary")}
                        aria-hidden
                      />
                      <span className={c.featured ? "text-white/85" : "text-muted-foreground"}>{item}</span>
                    </li>
                  ))}
                  {c.exclus?.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <MinusIcon
                        weight="bold"
                        className={cn("mt-0.5 size-4 shrink-0", c.featured ? "text-white/60" : "text-subtil")}
                        aria-hidden
                      />
                      <span className={c.featured ? "text-white/70" : "text-subtil"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="px-7 pt-8 pb-8">
                <ButtonLink href="/contact" variant={c.featured ? "inverse" : "outline"} size="lg" className="w-full">
                  Demander un devis
                </ButtonLink>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pourquoi pas de prix — l'objection arrive ici, on la traite ici. */}
        <Card className="mx-auto mt-10 max-w-4xl gap-0 px-7 py-6 shadow-card">
          <h3 className="text-base font-bold">Pourquoi aucun prix n&apos;est affiché</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Parce qu&apos;il serait faux. Un contrat se calcule sur le nombre d&apos;équipements, leur
            type, leur âge, l&apos;intensité d&apos;usage et le délai d&apos;intervention attendu — dix
            climatiseurs de bureau et dix climatiseurs d&apos;hôtel en bord de mer n&apos;ont pas le
            même coût d&apos;entretien. Nous chiffrons après la visite d&apos;évaluation, qui est
            gratuite et sans engagement.
          </p>
        </Card>
      </Section>

      {/* ------------------------------------------------ Cycle Care */}
      <Section tone="doux">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow={`${site.name} Care`}
              title="Ce qui se passe, concrètement, pendant un contrat."
              intro="Un contrat de maintenance qui se résume à « on passe de temps en temps » n'en est pas un. Voici la séquence, à chaque site, à chaque passage."
            />
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-2xl shadow-float lg:block">
              <Photo name="groupesExterieurs" sizes="(min-width: 1024px) 36vw, 1px" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="grid gap-3 sm:grid-cols-2">
              {cycleCare.map((etape, i) => (
                <li key={etape.step} className={cn(i === cycleCare.length - 1 && "sm:col-span-2")}>
                  <Card className="h-full flex-row items-start gap-4 px-5 py-5 shadow-card">
                    <span className="tnum flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary font-heading text-xs font-extrabold text-primary-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-semibold text-foreground">{etape.step}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{etape.detail}</span>
                    </span>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ Audit */}
      <Section>
        <Card className="relative gap-0 overflow-hidden px-8 py-10 shadow-card sm:px-12 sm:py-12">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-primary" aria-hidden />
          <h2 className="text-2xl sm:text-3xl">Commencez par un audit, pas par un contrat.</h2>
          <p className="mt-5 max-w-3xl text-muted-foreground">
            Nous venons voir le site, inventorier les équipements et relever leur état réel. Vous en
            ressortez avec un document&nbsp;: ce que vous possédez, ce qui est en fin de vie, ce qui
            présente un risque, et ce qu&apos;il faut budgéter sur les douze prochains mois. Ce
            document vous appartient, que vous signiez un contrat avec nous ou non.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" size="xl">
              Demander une visite d&apos;évaluation
              <ArrowRightIcon weight="bold" data-icon="inline-end" aria-hidden />
            </ButtonLink>
            <Link
              href="/services/maintenance-depannage"
              className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-primary hover:underline hover:underline-offset-4"
            >
              En savoir plus sur la maintenance
              <ArrowRightIcon weight="bold" className="size-4" aria-hidden />
            </Link>
          </div>
        </Card>
      </Section>

      <CtaBand
        titre="Parlons de votre site."
        intro="Décrivez-nous votre parc en deux lignes. Nous vous dirons franchement si un contrat se justifie — et si ce n'est pas le cas, nous vous le dirons aussi."
        message={MESSAGE}
        photo="technicienUniforme"
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Professionnels", path: "/professionnels" },
        ])}
      />
    </>
  );
}
