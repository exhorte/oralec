import { ArrowRightIcon, LightningIcon, SnowflakeIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { IconTile } from "@/components/ui/icon-tile";
import { Photo } from "@/components/ui/photo";
import { atouts, hero } from "@/content/accueil";
import { site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/whatsapp";

/**
 * Hero — adapté de la maquette « Voltéo » (05_screenshot/Site entreprise
 * électricité.jpg).
 *
 * Repris : texte à gauche avec mot-clé coloré, photo de technicien en
 * pleine hauteur à droite fondue dans le blanc, et bandeau d'atouts bleu
 * qui chevauche le bas de la photo.
 *
 * Adapté : la photo est retournée pour que le technicien regarde vers le
 * texte ; l'action secondaire est WhatsApp plutôt qu'un lien vers les
 * services — à Dakar, la conversation commence là. Le fond reprend la
 * douceur d'arktyk.fr : un fond blanc, sans trame.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-14 lg:pb-16">
      <div className="relative">
        <Container className="relative">
          <div className="grid items-center lg:min-h-[600px] lg:grid-cols-12">
            {/* Colonne texte — le bas est réservé au bandeau d'atouts */}
            <div className="relative z-10 pt-12 pb-10 sm:pt-16 lg:col-span-6 lg:pt-20 lg:pb-32 xl:col-span-5">
              <Eyebrow className="text-[0.72rem] tracking-[0.14em] uppercase">{hero.surtitre}</Eyebrow>

              <h1 className="text-[2.4rem] leading-[1.06] sm:text-[3.2rem] lg:text-[3.4rem]">
                {hero.titre} <span className="text-primary">{hero.titreAccent}</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg text-muted-foreground">{hero.intro}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="xl">
                  Demander un devis
                  <ArrowRightIcon weight="bold" data-icon="inline-end" aria-hidden />
                </ButtonLink>
                <ButtonLink href={whatsappUrl()} variant="outline" size="xl" external>
                  <WhatsappLogoIcon weight="fill" className="text-whatsapp" data-icon="inline-start" aria-hidden />
                  Écrire sur WhatsApp
                </ButtonLink>
              </div>

              <p className="mt-6 text-sm text-subtil">
                Ou appelez directement le{" "}
                <a
                  href={telUrl()}
                  className="tnum font-semibold text-foreground underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                >
                  {site.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
        </Container>

        {/* Photo : sous le texte sur mobile, pleine hauteur à droite sur desktop */}
        <div className="relative mx-4 aspect-[4/3] overflow-hidden rounded-2xl sm:mx-6 sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:aspect-auto lg:w-[52%] lg:rounded-none lg:rounded-bl-[2.5rem]">
          <Photo name={hero.photo} sizes="(min-width: 1024px) 52vw, 94vw" mirrored prioritaire quality={85} />
          {/* Fondu vers le texte, à la manière de la maquette */}
          <div
            className="absolute inset-y-0 left-0 hidden w-3/5 bg-linear-to-r from-white via-white/50 to-transparent lg:block"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-primary/40 to-transparent" aria-hidden />

          {/* Badge : les deux métiers, une seule équipe */}
          <div className="absolute top-4 right-4 flex items-center gap-3 rounded-xl bg-white/90 px-3.5 py-2.5 shadow-float ring-1 ring-black/5 backdrop-blur-md sm:top-6 sm:right-6">
            <span className="flex -space-x-1.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-white ring-2 ring-white">
                <LightningIcon weight="fill" className="size-4" aria-hidden />
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-bleu-clair text-primary ring-2 ring-white">
                <SnowflakeIcon weight="bold" className="size-4" aria-hidden />
              </span>
            </span>
            <span className="max-w-[11rem] text-xs leading-snug font-semibold text-foreground">
              {hero.badge}
            </span>
          </div>
        </div>
      </div>

      {/* Bandeau d'atouts — chevauche le bas de la photo */}
      <Container className="relative z-10 -mt-10 lg:-mt-14">
        <ul className="grid grid-cols-2 overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-band lg:grid-cols-4">
          {atouts.map((a) => (
            <li
              key={a.titre}
              className="flex flex-col items-start gap-3 border-white/10 px-4 py-5 max-lg:odd:border-r max-lg:nth-[-n+2]:border-b sm:flex-row sm:items-center sm:gap-4 sm:px-6 lg:py-7 lg:not-first:border-l"
            >
              <IconTile name={a.icon} tone="sombre" />
              <span className="leading-tight">
                <span className="block text-[0.92rem] font-semibold sm:text-base">{a.titre}</span>
                <span className="mt-1 block text-xs text-white/70 sm:text-sm">{a.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
