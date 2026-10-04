import { ArrowRightIcon, LightningIcon, PhoneIcon, SnowflakeIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { site } from "@/content/site";
import type { PhotoKey } from "@/content/types";
import { telUrl, whatsappUrl } from "@/lib/whatsapp";

/**
 * Bandeau d'appel de fin de page — « Un projet électrique ? Parlons-en. »
 * sur la maquette : bloc bleu, photo fondue à droite, grand pictogramme
 * en filigrane. Règle du site : aucune page ne se termine sans une action.
 */
export function CtaBand({
  titre = "Un projet électrique ou de climatisation ? Parlons-en.",
  intro = "Décrivez-nous la situation : nous vous répondons rapidement, et le devis est gratuit et sans engagement.",
  message,
  photo = "electricienCoffret",
  className,
}: {
  titre?: string;
  intro?: string;
  /** Message WhatsApp pré-rempli, contextualisé à la page. */
  message?: string;
  photo?: PhotoKey;
  className?: string;
}) {
  return (
    <section className={className ?? "py-16 sm:py-20"}>
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-band">
          {/* Photo fondue dans le bleu, côté droit */}
          <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
            <Photo name={photo} sizes="(min-width: 768px) 45vw, 1px" alt="" />
            <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/60 to-primary/10" aria-hidden />
          </div>

          {/* Filigranes : l'éclair et le flocon, les deux métiers */}
          <LightningIcon
            weight="thin"
            className="absolute top-1/2 left-[42%] hidden size-72 -translate-y-1/2 text-white/[0.07] md:block"
            aria-hidden
          />
          <SnowflakeIcon
            weight="thin"
            className="absolute -bottom-16 -left-16 size-64 text-white/[0.05]"
            aria-hidden
          />

          <div className="relative px-6 py-12 sm:px-12 sm:py-16 md:w-3/5 lg:px-16 lg:py-20">
            <h2 className="text-3xl leading-[1.12] sm:text-4xl">{titre}</h2>
            <p className="mt-5 max-w-lg text-lg text-white/75">{intro}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/contact" variant="inverse" size="xl">
                Demander un devis
                <ArrowRightIcon weight="bold" data-icon="inline-end" aria-hidden />
              </ButtonLink>
              <ButtonLink href={whatsappUrl(message)} variant="outline-inverse" size="xl" external>
                <WhatsappLogoIcon weight="fill" className="text-whatsapp" data-icon="inline-start" aria-hidden />
                WhatsApp
              </ButtonLink>
            </div>

            <p className="mt-6 text-sm text-white/65">
              Ou appelez le{" "}
              <a href={telUrl()} className="tnum inline-flex items-center gap-1.5 font-semibold text-white underline-offset-4 hover:underline">
                <PhoneIcon weight="duotone" className="size-4" aria-hidden />
                {site.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
