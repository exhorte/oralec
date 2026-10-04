import { cn } from "@/lib/utils";

/**
 * Conteneur de page. La mise en page court presque d'un bord à l'autre :
 * de simples gouttières (16 px sur mobile, 64 px sur grand écran) et un
 * plafond à 1 920 px pour les écrans très larges — en-tête, contenu et pied
 * de page s'alignent sur les mêmes bords.
 */
export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16",
        // Texte long (mentions légales) : une colonne de lecture
        size === "narrow" && "max-w-[52rem]",
        size === "default" && "max-w-[120rem]",
        size === "wide" && "max-w-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
