import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { reperes } from "@/content/accueil";

/**
 * Bandeau de repères chiffrés — la bande bleue de la maquette (« 15+ années
 * d'expérience, 1 200+ projets »), avec des valeurs que l'on peut défendre :
 * elles sont dérivées du contenu ou d'engagements écrits ailleurs.
 */
export function Reperes() {
  return (
    <section className="bg-primary text-primary-foreground">
      <Container>
        <ul className="grid grid-cols-2 gap-y-10 py-14 sm:py-16 lg:grid-cols-4">
          {reperes.map((r) => (
            <li
              key={r.label}
              className="flex flex-col items-center px-4 text-center lg:not-first:border-l lg:not-first:border-white/10"
            >
              <Icon name={r.icon} className="size-8 text-white/70" />
              <span className="tnum mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-[2.6rem]">
                {r.valeur}
              </span>
              <span className="mt-1.5 max-w-[12rem] text-sm text-white/70">{r.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
