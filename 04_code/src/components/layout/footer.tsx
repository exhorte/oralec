import Link from "next/link";
import {
  ClockIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";

import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { zonesLocales } from "@/content/zones";
import { realisationsVisibles } from "@/content/realisations";
import { telUrl, whatsappUrl } from "@/lib/whatsapp";

const lienClasse = "text-white/75 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-12 md:gap-8 lg:py-20">
          {/* Marque et coordonnées */}
          <div className="md:col-span-4">
            <Logo tone="blanc" withDescriptor />
            <p className="mt-5 max-w-xs text-sm text-white/75">
              {site.tagline} Installation, maintenance et dépannage en électricité et en
              climatisation, à Dakar et dans tout le Sénégal.
            </p>

            <ul className="mt-7 space-y-3 text-sm">
              <li>
                <a href={telUrl()} className="inline-flex items-center gap-3 text-white hover:text-white/80">
                  <PhoneIcon weight="duotone" className="size-[1.1rem] text-white/60" aria-hidden />
                  <span className="tnum">{site.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white hover:text-white/80"
                >
                  <WhatsappLogoIcon weight="fill" className="size-[1.1rem] text-whatsapp" aria-hidden />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-white hover:text-white/80">
                  <EnvelopeSimpleIcon weight="duotone" className="size-[1.1rem] text-white/60" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/75">
                <MapPinIcon weight="duotone" className="mt-0.5 size-[1.1rem] shrink-0 text-white/60" aria-hidden />
                <span>
                  {site.address.street}, {site.address.city}, {site.address.countryName}
                </span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h2 className="font-heading text-sm font-semibold tracking-normal text-white">Services</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={lienClasse}>
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/professionnels#contrats" className={lienClasse}>
                  Contrats de maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Entreprise */}
          <div className="md:col-span-2">
            <h2 className="font-heading text-sm font-semibold tracking-normal text-white">Entreprise</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/professionnels" className={lienClasse}>
                  {site.name} Business
                </Link>
              </li>
              <li>
                <Link href="/particuliers" className={lienClasse}>
                  Particuliers
                </Link>
              </li>
              {realisationsVisibles && (
                <li>
                  <Link href="/realisations" className={lienClasse}>
                    Réalisations
                  </Link>
                </li>
              )}
              <li>
                <Link href="/a-propos" className={lienClasse}>
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/faq" className={lienClasse}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className={lienClasse}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Zones et horaires */}
          <div className="md:col-span-4">
            <h2 className="font-heading text-sm font-semibold tracking-normal text-white">
              Zones d&apos;intervention
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2 text-sm">
              {zonesLocales.map((z) => (
                <li key={z.slug}>
                  <Link
                    href={`/${z.slug}`}
                    className="inline-flex rounded-full border border-white/20 px-3 py-1 text-white/75 transition-colors hover:border-white/40 hover:text-white"
                  >
                    {z.service} · {z.ville}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-3 rounded-xl bg-white/[0.07] p-4 text-sm ring-1 ring-inset ring-white/15">
              <ClockIcon weight="duotone" className="mt-0.5 size-5 shrink-0 text-white/60" aria-hidden />
              <div className="text-white/75">
                <p>{site.hours.semaine}</p>
                <p>{site.hours.samedi}</p>
                <p className="mt-1 font-semibold text-white">{site.hours.urgence}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bloc de légitimité — élément de conversion, pas mention légale.
            Un prestataire technique qui affiche son NINEA et son RC lève
            la première objection du marché. */}
        <div className="flex flex-col gap-4 border-t border-white/15 py-7 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <span>
              © {new Date().getFullYear()} {site.legalName}
            </span>
            <span className="tnum">NINEA {site.legal.ninea}</span>
            <span className="tnum">RC {site.legal.rc}</span>
          </div>
          <Link href="/mentions-legales" className="transition-colors hover:text-white">
            Mentions légales
          </Link>
        </div>
      </Container>
    </footer>
  );
}
