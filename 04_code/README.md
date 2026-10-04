# ORALEC — Site web

Site vitrine d'Oralec, entreprise sénégalaise d'électricité et de climatisation
(installation, maintenance, dépannage), à Dakar et dans sa région.

Plan produit et arbitrages : [`02_project_plan/PLAN_SITE_ORALEC.md`](../02_project_plan/PLAN_SITE_ORALEC.md)
Suivi de la refonte : [`03_project_monitoring/ETAT_REFONTE_ORALEC.md`](../03_project_monitoring/ETAT_REFONTE_ORALEC.md)

**Design** — refonte du 1er octobre 2026 : nom Oralec, charte de quatre
couleurs (`#1623c1` bleu du logo, `#393f4b` ardoise, `#000000`, `#ffffff`
dominant), composants shadcn/ui, icônes Phosphor, photos de techniciennes et
techniciens noirs. Logo officiel intégré le 4 octobre 2026 (`public/brand`). Mise en page adaptée de la maquette « Voltéo »
(`05_screenshot/Site entreprise électricité.jpg`) ; fonds et ambiance
inspirés d'[arktyk.fr](https://arktyk.fr/climatisation-confort-thermique/).

---

## Démarrer

```bash
npm install
npm run dev
```

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (23 pages statiques) |
| `npm start` | Sert le build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Vérification de types |

---

## Ce qu'il faut faire avant la mise en ligne

### 1. Coordonnées — un seul fichier : [`src/content/site.ts`](src/content/site.ts)

- [ ] `phone`, `phoneDisplay` — numéro principal
- [ ] `phoneUrgence`, `phoneUrgenceDisplay` — ligne d'urgence
- [ ] `whatsapp` — numéro WhatsApp Business, format international **sans `+`**
- [ ] `email`, `emailDevis`
- [ ] `address.street` et coordonnées `lat` / `lng`
- [ ] `legal.ninea`, `legal.rc` — **éléments de confiance majeurs**, pas de simples mentions légales
- [ ] `legalName` — raison sociale exacte
- [ ] `url` — domaine définitif (sert au sitemap, aux URL canoniques et au JSON-LD)

### 2. Droits des images — [`src/content/images.ts`](src/content/images.ts)

- **Photos Unsplash et Pexels** (12) : licences libres, usage commercial
  autorisé sans attribution. Rien à faire ; les crédits figurent tout de même
  en mentions légales.
- **Deux images déposées dans `05_screenshot`** sont utilisées
  (`public/images/climatisation-toiture.jpg`, `public/images/froid-commercial.jpg`) :
  leurs droits sont à confirmer. La première porte la signature d'une image
  générée par IA (Gemini, filigrane retiré au recadrage) ; la seconde vient
  d'une recherche Google, sans source connue.
- **Non utilisées** : les fichiers `depositphotos_*` et `istockphoto_*` de
  `05_screenshot` sont des aperçus de banques payantes, sans licence, et en
  basse définition (600 px). Pour les utiliser : acheter la licence, déposer la
  version HD dans `public/images/`, puis remplacer l'entrée voulue dans
  `images.ts` — une ligne.
- **À terme** : remplacer les photos de banque par de vraies photos de chantier
  Oralec, au même endroit. Les personnes visibles sur les photos de banque ne
  doivent jamais être présentées comme l'équipe.

### 3. Héberger les photos chez soi (recommandé en production)

Les photos Unsplash/Pexels sont aujourd'hui récupérées sur leur CDN par
l'optimiseur de Next.js (puis mises en cache et servies en AVIF/WebP depuis
notre domaine). Pour ne dépendre d'aucun service tiers : télécharger chaque
URL de `images.ts` dans `public/images/` et remplacer `src` par le chemin local.

---

## Organisation

```
src/
├── app/                    Routes (App Router, tout est statique)
│   ├── page.tsx            Accueil
│   ├── services/[slug]/    3 pages métier, générées depuis le contenu
│   ├── [zone]/             6 pages SEO locales, générées depuis le contenu
│   ├── sitemap.ts · robots.ts
│
├── content/                ⚠️ TOUT le contenu éditorial vit ici
│   ├── site.ts             Coordonnées, engagements, zones
│   ├── accueil.ts          Contenu de la page d'accueil
│   ├── images.ts           Photothèque : sources, licences, crédits, recadrages
│   ├── services.ts         Climatisation, électricité, maintenance
│   ├── contrats.ts         Paliers de maintenance
│   ├── secteurs.ts         Secteurs professionnels
│   ├── zones.ts            Pages locales
│   ├── faq.ts              FAQ transverse
│   ├── parcours.ts         Parcours client en 4 étapes
│   ├── realisations.ts     Chantiers (vide — voir la règle de publication)
│   └── temoignages.ts      Avis clients (vide — même règle)
│
├── components/
│   ├── ui/                 shadcn/ui (button, card, badge, input, sheet…) + primitives maison
│   ├── layout/             En-tête, pied de page, barre d'action mobile, bouton WhatsApp
│   ├── home/               Sections de la page d'accueil
│   ├── shared/             Blocs réutilisés (en-tête de page, bandeau d'appel, FAQ, contact)
│   └── diagnostic/         Parcours « J'ai un problème »
│
├── lib/                    WhatsApp, téléphone, métadonnées, JSON-LD
└── fonts/                  Polices auto-hébergées (Inter, Plus Jakarta Sans)
```

**Aucun contenu éditorial ne doit être écrit en dur dans le JSX.** C'est ce qui
permettra de brancher un CMS sans réécrire une page.

Ajouter un métier ou une ville = une entrée dans un tableau de `content/`.
Les pages correspondantes sont générées au build. La plomberie, retirée de
l'offre le 1er octobre 2026, peut revenir ainsi : son contenu complet est dans
l'historique git (commit `586b074`, `04_code/feanor-web/src/content/services.ts`).

---

## Système de design

**Couleurs** — jetons shadcn/ui mappés sur la charte, dans
[`src/app/globals.css`](src/app/globals.css). Le bleu du logo porte la marque
(boutons, liens, icônes, bandeaux), l'ardoise le texte courant, le noir les
titres, le blanc le fond. Les autres valeurs ne sont que des teintes de ces quatre
couleurs, plus deux exceptions fonctionnelles : le vert WhatsApp (logo du canal
uniquement) et le rouge d'erreur de formulaire. Contrastes vérifiés par calcul
(bleu sur blanc 10,3:1, ardoise 10,6:1 ; texte blanc sur bleu jamais sous 65 %
d'opacité). Fonds en aplats : pas de trame.

**Logo** — fichiers officiels de `06_logos_icons`, copiés dans `public/brand`
(logo bleu, logo blanc, symbole seul, icônes 192 et 512 px) et dans `src/app`
(`favicon.ico`, `icon.svg`, `apple-icon.png`, `opengraph-image.png`, que Next.js
déclare tout seul). Composant : `components/ui/logo.tsx`.

**Largeur** — `components/ui/container.tsx` : gouttières de 16 à 64 px, plafond
1 920 px. En-tête, corps et pied de page s'alignent sur les mêmes bords.

**Composants** — shadcn/ui, style `radix-vega` (voir `components.json`) :
`Card` pour toutes les cartes, `Button` (variantes ajoutées : `inverse`,
`outline-inverse`, taille `xl`), `Sheet` pour le menu mobile, `Input`,
`Textarea`, `NativeSelect`, `Label`, `Badge`, `Avatar`. Ajouter un composant :
`npx shadcn@latest add <nom>`.

**Icônes** — Phosphor, graisse *duotone* (un aplat translucide sous le trait,
plus de relief qu'un simple contour), posées dans des tuiles en léger relief
(`IconTile`). Le contenu nomme une icône par clé (`IconName`, dans
`content/types.ts`), résolue dans `components/ui/icon.tsx`. Phosphor n'ayant pas
de climatiseur, `air-conditioner-icon.tsx` en dessine un dans sa grammaire.
Composants serveur : import depuis `@phosphor-icons/react/ssr` (0 Ko de JS).

**Typographie** — Plus Jakarta Sans (titres, licence OFL) et Inter (texte),
fichiers variables auto-hébergés. Typographie française respectée : espace
insécable avant `? ! : ;` et dans les guillemets.

---

## Choix techniques notables

**Pas de base de données, pas d'authentification, pas de CMS.**
Les formulaires ne passent par aucun serveur : ils composent un message que
l'utilisateur envoie lui-même par WhatsApp ou par e-mail. Rien n'est stocké.

**Aucune librairie d'animation.** Les apparitions au scroll utilisent
`animation-timeline: view()` — CSS pur. Les navigateurs sans support affichent
simplement le contenu.

**Accordéons en `<details>`/`<summary>` natifs** plutôt que l'Accordion Radix :
accessibles, fonctionnels sans JavaScript, et indexables (Radix démonte le
contenu replié).

**Le site fonctionne sans JavaScript** pour ce qui compte : la barre d'action
mobile (appel, WhatsApp, urgence) et les boutons d'appel sont des ancres natives.

**Témoignages et réalisations ne s'affichent qu'une fois réels** (3 minimum,
sourcés). Aucun avis ni chantier fictif, aucun chiffre inventé.

---

## Poids réel (build de production, page d'accueil)

| | gzip |
|---|---|
| HTML | ≈ 47 Ko (dont ≈ 25 Ko de données RSC, inhérentes à l'App Router) |
| CSS | 14 Ko |
| Polices (2 fichiers variables) | 74 Ko |
| JavaScript | 216 Ko, dont ≈ 180 Ko de runtime React 19 + App Router |
| Photos | AVIF/WebP redimensionnées à la taille d'affichage — ≈ 10 à 60 Ko chacune sur mobile |

Le JS ne conditionne aucune action de conversion : la page s'affiche et les
canaux de contact fonctionnent avant l'hydratation.

---

## Règle de publication des réalisations et des témoignages

Voir l'en-tête de [`src/content/realisations.ts`](src/content/realisations.ts) et de
[`src/content/temoignages.ts`](src/content/temoignages.ts). Tant qu'il y a moins de
3 entrées réelles, la section ne s'affiche pas.

---

## Environnement de développement — points constatés

- **Prévisualisation** — la configuration `.claude/launch.json` pointe sur
  `04_code` (le projet a été remonté d'un niveau depuis `04_code/feanor-web`).
- **SWC natif** — en cas de blocage de `@next/swc-win32-x64-msvc` par une
  stratégie de sécurité Windows : `next build --webpack`.
- **Polices** — locales (`next/font/local`) : un build qui dépend de Google
  Fonts échoue dès que le réseau est capricieux.
