import { ClockIcon } from "@phosphor-icons/react/ssr";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { Section, SectionHeader } from "@/components/ui/section";
import { site } from "@/content/site";
import type { IconName } from "@/content/types";
import { telUrl, whatsappUrl } from "@/lib/whatsapp";
import { ContactForm } from "./contact-form";
import { Horaires } from "./horaires";

/**
 * Section contact — reprend le dernier bloc de la maquette : coordonnées à
 * gauche, carte bleue « Envoyez-nous un message » à droite.
 */
export function ContactSection({ tone = "blanc" }: { tone?: "blanc" | "doux" }) {
  const canaux: { icon: IconName; label: string; valeur: string; href?: string; externe?: boolean }[] = [
    { icon: "telephone", label: "Téléphone", valeur: site.phoneDisplay, href: telUrl() },
    { icon: "whatsapp", label: "WhatsApp", valeur: "Le plus rapide, photos comprises", href: whatsappUrl(), externe: true },
    { icon: "sirene", label: "Urgence 7j/7", valeur: site.phoneUrgenceDisplay, href: telUrl(true) },
    { icon: "email", label: "E-mail", valeur: site.email, href: `mailto:${site.email}` },
    { icon: "localisation", label: "Adresse", valeur: `${site.address.street}, ${site.address.city}` },
  ];

  return (
    <Section id="contact" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Contact"
            title="Une question ? Contactez-nous."
            intro="Notre équipe vous répond rapidement pour étudier votre projet ou planifier une intervention, à Dakar et dans sa région."
          />

          <ul className="mt-10 space-y-5">
            {canaux.map((c) => {
              const contenu = (
                <>
                  <IconTile name={c.icon} size="sm" />
                  <span>
                    <span className="block text-xs text-subtil">{c.label}</span>
                    <span className="tnum block font-semibold text-foreground transition-colors group-hover:text-primary">
                      {c.valeur}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4"
                    >
                      {contenu}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{contenu}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-10 rounded-xl bg-card p-5 shadow-card ring-1 ring-foreground/8">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <ClockIcon weight="duotone" className="size-4 text-primary" aria-hidden />
              Horaires
            </p>
            <Horaires />
          </div>
        </div>

        <div className="lg:col-span-7">
          <Card className="relative gap-0 overflow-hidden bg-primary py-0 text-primary-foreground shadow-band ring-0">
            <CardHeader className="relative px-6 pt-8 sm:px-10 sm:pt-10">
              <CardTitle className="text-2xl font-bold sm:text-[1.7rem]">
                Envoyez-nous un message
              </CardTitle>
              <CardDescription className="text-base text-white/70">
                Trois champs, et votre demande part sur WhatsApp, déjà rédigée.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative px-6 pt-8 pb-8 sm:px-10 sm:pb-10">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
