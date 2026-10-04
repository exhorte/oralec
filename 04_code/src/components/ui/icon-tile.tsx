import type { IconName } from "@/content/types";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

const tailles = {
  sm: { tuile: "size-10 rounded-lg", icone: "size-5" },
  md: { tuile: "size-12 rounded-xl", icone: "size-6" },
  lg: { tuile: "size-14 rounded-xl", icone: "size-7" },
};

const tons = {
  /* Sur fond blanc : léger dégradé bleu, liseré intérieur et ombre portée
     teintée — la tuile prend du relief, comme un bouton physique. */
  clair:
    "bg-linear-to-br from-white to-bleu-clair text-primary ring-1 ring-inset ring-primary/10 shadow-[inset_0_1px_0_rgb(255_255_255),0_10px_18px_-10px_rgb(22_35_193/0.35)]",
  /* Sur bandeau bleu */
  sombre: "bg-white/10 text-white ring-1 ring-inset ring-white/15",
  /* Aplat bleu, pour les points d'entrée forts */
  plein:
    "bg-primary text-primary-foreground shadow-[0_10px_20px_-10px_rgb(22_35_193/0.6)]",
};

/** Icône posée dans une tuile — l'unité visuelle des cartes du site. */
export function IconTile({
  name,
  size = "md",
  tone = "clair",
  className,
}: {
  name: IconName;
  size?: keyof typeof tailles;
  tone?: keyof typeof tons;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        tailles[size].tuile,
        tons[tone],
        className,
      )}
    >
      <Icon name={name} className={tailles[size].icone} />
    </span>
  );
}
