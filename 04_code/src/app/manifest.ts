import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Manifeste web : nom et icônes quand le site est ajouté à l'écran d'accueil. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.descriptor}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1623c1",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
