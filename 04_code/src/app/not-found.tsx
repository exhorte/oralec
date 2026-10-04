import Link from "next/link";
import { ArrowRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { services } from "@/content/services";
import { whatsappUrl } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <section className="bg-muted">
      <Container>
        <div className="py-24 sm:py-32">
          <p className="tnum text-sm font-semibold tracking-[0.18em] text-primary uppercase">Erreur 404</p>
          <h1 className="mt-4 text-4xl sm:text-5xl">Cette page n&apos;existe pas.</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Le lien est peut-être ancien, ou comporte une faute de frappe. Voici par où reprendre.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="xl">
              Retour à l&apos;accueil
              <ArrowRightIcon weight="bold" data-icon="inline-end" aria-hidden />
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} variant="outline" size="xl" external>
              <WhatsappLogoIcon weight="fill" className="text-whatsapp" data-icon="inline-start" aria-hidden />
              Nous écrire sur WhatsApp
            </ButtonLink>
          </div>

          <div className="mt-14 border-t border-border pt-8">
            <h2 className="text-sm font-semibold tracking-normal text-subtil">Nos services</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-3 rounded-xl bg-white p-3 font-semibold text-foreground shadow-card ring-1 ring-foreground/8 transition-colors hover:text-primary"
                  >
                    <IconTile name={s.icon} size="sm" />
                    {s.longName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
