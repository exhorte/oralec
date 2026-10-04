# PLAN DE RÉALISATION — SITE WEB ORALEC

> Document de cadrage produit & technique
> Source analysée : `01_search/Feanor.md` (note rédigée sous l'ancien nom)
> Statut : **refonte du 1er octobre 2026 livrée** dans `04_code` — 23 pages statiques, build vérifié.
> Suivi : `03_project_monitoring/ETAT_REFONTE_ORALEC.md` (et, pour l'historique, `ETAT_LOT_1.md`)
>
> **Changements du 1er octobre 2026, sur décision du dirigeant :**
> l'entreprise s'appelle désormais **Oralec** ; l'offre se resserre sur
> **l'électricité et la climatisation** (la plomberie est retirée, peut-être
> réintroduite plus tard) ; nouvelle charte de quatre couleurs ; adoption de
> **shadcn/ui** et de photos de banque libres de droits. Les sections 2, 4, 6,
> 7, 8 et 10 ont été mises à jour en conséquence ; l'analyse critique (§ 1)
> est conservée telle quelle, elle porte sur la note d'origine.

---

## 0. Résumé exécutif — les 7 décisions structurantes

| # | Décision | Raison |
|---|---|---|
| 1 | **Le site et le dashboard opérationnel sont deux produits.** On livre le site seul. | La note mélange une vitrine et un SaaS de GMAO. Mélangés, aucun des deux ne sort. |
| 2 | **Zéro base de données en v1.** Formulaire → e-mail + WhatsApp pré-rempli. | Pas de client = pas de données à stocker. PostgreSQL arrive au lot 3, quand il y a du volume à gérer. |
| 3 | **Le KPI unique du site : conversation ouverte en moins de 15 secondes.** | Sur ce marché, la vente ne se fait pas sur le site. Le site amène au téléphone ou au WhatsApp. |
| 4 | **Mobile-first au sens dur : budget de poids, pas juste responsive.** | Android milieu de gamme, 4G facturée à la donnée. Une hero vidéo coûte des clients. |
| 5 | **La différenciation est procédurale, pas esthétique.** Devis avant intervention, rapport après, garantie affichée. | Le déficit du marché est un déficit de confiance, pas de design. |
| 6 | **Une seule couleur d'accent.** Le code couleur par métier reste un liseré, jamais une identité concurrente. | 4 couleurs de marque = 0 couleur de marque. |
| 7 | **Le contenu est typé en TypeScript, pas en dur dans le JSX.** | Permet de brancher un CMS au lot 2 sans réécrire une page. |

---

## 1. Analyse critique de la note de cadrage

### 1.1 Ce que la note voit juste

**Le positionnement « partenaire technique du bâtiment » plutôt que « plombier ».**
C'est l'idée forte du document et elle tient. Un plombier vend une intervention. Un partenaire technique vend un contrat annuel. Le même travail, un modèle économique différent — et une valorisation d'entreprise différente. Toute l'architecture du site doit servir cette bascule.

**La maintenance préventive comme produit central.**
C'est le seul revenu récurrent du métier. La note a raison d'en faire un pilier et pas une ligne de service.

**La double lecture B2C / B2B.**
Deux acheteurs, deux urgences, deux niveaux de prix, deux cycles de décision. Un particulier a une fuite maintenant. Un directeur d'hôtel budgétise un contrat pour l'exercice suivant. Les mettre sur le même parcours, c'est perdre les deux.

**WhatsApp comme colonne vertébrale.**
Exact, et probablement encore sous-estimé dans la note. Au Sénégal ce n'est pas un canal de contact parmi d'autres, c'est *le* canal. Un formulaire qui n'aboutit pas à WhatsApp est un formulaire mort.

**Le parcours « J'ai un problème ».**
La meilleure idée du document. Elle transforme une page contact passive en outil de qualification.

### 1.2 Les six angles morts

**① La note décrit un SaaS et l'appelle un site.**
Section 20 : backend, clients, équipements, interventions, PostgreSQL, dashboard. C'est un logiciel de gestion de maintenance (GMAO) — plusieurs mois de travail — et il n'a aucun sens tant qu'il n'y a pas d'interventions à suivre. Le site n'en a pas besoin pour exister.
**Arbitrage : on construit la vitrine de façon à ce que le dashboard puisse s'y brancher plus tard, on ne construit pas le dashboard.**

**② La stack proposée est surdimensionnée d'un facteur 5.**
NestJS ou Spring Boot, PostgreSQL, Auth.js/Clerk, Cloudflare R2, PostHog, Sanity/Payload/Strapi — pour une entreprise qui n'a pas encore de site. Chaque brique est un coût de maintenance permanent.
**Arbitrage : Next.js seul, contenu en fichiers typés, formulaire en Server Action, e-mail transactionnel.**

**③ La hero vidéo est un piège.**
Section 5 : « Grande image/vidéo d'un technicien Feanor » (note d'origine). Sur un Android milieu de gamme en 4G payante, une vidéo de 3 Mo c'est quelques secondes d'écran vide et un visiteur parti.
**Arbitrage : image unique optimisée, budget serré, LCP sous 2 s en 4G réelle.**

**④ Le SEO on-page est le mauvais levier en premier.**
La note liste douze mots-clés et des pages locales. Ce n'est pas faux, c'est lent : 6 à 12 mois pour ranker sur « climatisation Dakar ». Le levier immédiat, c'est **Google Business Profile** — fiche complète, photos, avis, horaires. Il capte le pack local et les recherches « près de moi » en quelques semaines.
**Arbitrage : les pages locales sont construites dès le lot 1 parce qu'elles coûtent peu, mais le plan d'acquisition doit ouvrir sur la fiche GBP, pas sur le site.**

**⑤ La page « Réalisations » est un piège à confiance.**
La note la veut « très importante ». Elle l'est — et c'est précisément pourquoi une page vide, ou pire garnie d'images de banque, fait plus de dégâts que pas de page du tout.
**Arbitrage : structure construite, dégradation propre. Tant qu'il y a moins de 3 chantiers documentés, la page ne s'affiche pas dans la navigation. Un protocole de captation photo est fourni aux techniciens.**

**⑥ La note ne dit rien de la preuve de légitimité.**
Sur les métiers techniques, la question du client n'est pas « est-ce beau » mais « est-ce que ces gens existent vraiment et est-ce que je serai facturé correctement ». NINEA, registre de commerce, adresse physique, assurance, responsable joignable : ce sont des éléments de conversion, pas des mentions légales.
**Arbitrage : bloc de légitimité en pied de page sur toutes les pages, pas enterré dans les CGV.**

### 1.3 Le nom — Feanor devient Oralec (1er octobre 2026)

Le changement de nom ne change ni le positionnement ni le ton : **« le travail
fait correctement, expliqué, et suivi »**, sobriété et refus du superlatif. Tout
le site lit le nom dans `src/content/site.ts` ; les offres dérivées suivent
(« Oralec Business », « Oralec Care »).

### 1.4 Ce qui remplace la signature proposée

La note propose « Installer. Entretenir. Dépanner. Optimiser. » — quatre verbes qui décrivent une prestation. Le client n'achète pas une prestation, il achète l'absence de problème.

**Signature retenue : « Vos installations, sous contrôle. »**
Elle fonctionne pour le particulier (le climatiseur qui ne lâche pas en juillet) comme pour le directeur technique (le parc suivi, documenté, sans arrêt d'exploitation). Les quatre verbes restent, en sous-titre fonctionnel.

---

## 2. Positionnement retenu

```
ORALEC — Électricité & Climatisation
Climatisation · Froid · Électricité

« Vos installations, sous contrôle. »
Installation, maintenance et dépannage — particuliers et professionnels, Dakar et régions.
```

**Promesse opérationnelle, affichée et tenue :**

1. Diagnostic avant devis, devis avant intervention.
2. Prix annoncé = prix facturé.
3. Rapport d'intervention écrit après chaque passage.
4. Garantie sur la main-d'œuvre.

Ces quatre points sont la vraie différenciation. Ils sont affichés en haut de la page d'accueil, pas dans une page « À propos » que personne n'ouvre.

**Les métiers** (resserrés le 1er octobre 2026) :

| Métier | Périmètre |
|---|---|
| Climatisation & froid | Split, multi-split, cassette, gainable, VRV, chambres froides, réfrigération commerciale |
| Électricité | Installation, tableaux, mise en sécurité NS 01-001, conformité COSSUEL, éclairage, secours |
| Maintenance & dépannage | Préventif, correctif, contrats, audit, urgence — sur les deux métiers |

La plomberie est retirée de l'offre. Son contenu complet (prestations, FAQ,
page locale) reste dans l'historique git — commit `586b074` — et revient par
une simple entrée dans `src/content/services.ts`.

Les couleurs par métier ont disparu avec la nouvelle charte : un seul accent,
le bleu du logo, partout.

---

## 3. Le vrai job du site

Le site n'a pas pour mission d'informer. Il a pour mission de **déclencher une conversation qualifiée**, dans cet ordre de préférence :

```
1. WhatsApp pré-rempli   ← canal prioritaire, friction quasi nulle
2. Appel direct          ← urgences
3. Formulaire qualifié   ← B2B, demandes de contrat, hors horaires
```

**Conséquence de design :** sur mobile, une action de contact est visible à tout moment, sans scroll, sur toutes les pages. Barre fixe en bas : `Appeler · WhatsApp · Urgence`. C'est l'élément le plus important du site.

**Règle de conversion :** aucune page ne se termine sans une action. Aucune page ne demande plus de trois informations avant d'ouvrir le canal.

---

## 4. Architecture de l'information

```
/                                   Accueil
│
├── /services                       Vue d'ensemble des métiers
│   ├── /services/climatisation
│   ├── /services/electricite
│   └── /services/maintenance-depannage
│
├── /professionnels                 ORALEC BUSINESS — contrats, secteurs, audit
├── /particuliers                   Dépannage, installation, entretien
│
├── /realisations                   Chantiers documentés (masqué si < 3)
├── /a-propos                       Équipe, méthode, légitimité
├── /faq                            Objections traitées (+ JSON-LD FAQPage)
├── /contact                        Parcours « J'ai un problème »
├── /mentions-legales
│
└── Pages SEO locales (issues du même moteur de contenu)
    /climatisation-dakar · /electricite-dakar · /froid-commercial-dakar
    /maintenance-technique-dakar
    puis Thiès · Saly · Diamniadio · Mbour
```

**Navigation principale — 5 entrées maximum** : Services · Professionnels · Particuliers · Réalisations · Contact.
`À propos`, `FAQ`, `Mentions légales` vivent en pied de page. Une navigation à 9 entrées est une navigation que personne ne lit.

---

## 5. Modèle de contenu

Tout le contenu éditorial est sorti du JSX et typé dans `src/content/`. C'est ce qui rend le lot 2 (CMS) possible sans réécriture.

```ts
type Service = {
  slug: string
  name: string
  tagline: string
  accent: 'cyan' | 'amber' | 'blue' | 'orange'
  intro: string
  prestations: { title: string; description: string }[]
  pourQui: { particuliers: string[]; professionnels: string[] }
  process: { step: string; detail: string }[]
  signesDAlerte: string[]      // « quand faut-il nous appeler »
  faq: { q: string; a: string }[]
  seo: { title: string; description: string }
}

type Ville = { slug: string; nom: string; region: string; quartiers: string[] }
type Realisation = { ... }    // masquée tant que < 3 entrées
type Contrat = { tier: 'Essentiel' | 'Business' | 'Premium'; inclus: string[] }
```

Les pages services et les pages locales sont **générées depuis ce modèle** via `generateStaticParams`. Ajouter une ville = une entrée dans un tableau, pas une page à écrire.

---

## 6. Design system

> **Révisé le 1er octobre 2026.** Troisième direction visuelle, sur demande
> explicite du dirigeant : charte de quatre couleurs, composants shadcn/ui,
> mise en page adaptée de la maquette « Voltéo »
> (`05_screenshot/Site entreprise électricité.jpg`), fonds et ambiance inspirés
> d'arktyk.fr. La logique de fond ne change pas : un seul accent, contenu réel
> plutôt qu'inventé.
>
> **Ajusté le 4 octobre 2026**, à la livraison du logo (`06_logos_icons`) : le
> bleu du logo `#1623C1` remplace le marine `#001969` ; plus aucune trame de
> fond (grille, points) ; mise en page élargie presque bord à bord.

**Direction :** blanc dominant, structuré par des cartes à coins arrondis et
ombre douce. Bandeaux bleus pour les moments forts (atouts sous le hero,
repères chiffrés, appels à l'action, formulaire de contact, pied de page).
Fonds en aplats, sans trame.

**Largeur :** contenu aligné sur des gouttières de 16 px (mobile) à 64 px
(grand écran), plafonné à 1 920 px (`Container`). En-tête, corps et pied de
page partagent les mêmes bords. Menu centré, l'écart entre ses entrées grandit
avec l'écran.

**Logo :** fichiers officiels dans `04_code/public/brand` (version bleue et
blanche, symbole seul), favicon, icône Apple, manifeste et image de partage
dans `04_code/src/app`. Les originaux restent dans `06_logos_icons`.

### Jetons (`src/app/globals.css`, au format shadcn/ui)

```
Charte
  bleu      #1623C1   primary — boutons, liens, icônes, bandeaux (celui du logo)
  ardoise   #393F4B   muted-foreground — texte courant
  noir      #000000   foreground — titres
  blanc     #FFFFFF   background — dominant

Teintes et ombres dérivées (rien d'autre)
  fond doux #F7F7FD   sections alternées (bleu à 3,5 % sur blanc)
  bleu clair #E5E7F8 / secondaire #EFF0FB   fonds d'icônes, survols
  bordure   #E3E5EF · champ #CDD0E0
  subtil    #5B616D   légendes (6,2:1 sur blanc)

Exceptions fonctionnelles
  WhatsApp  #25D366   logo du canal uniquement — il se reconnaît à sa couleur
  erreur    #B42318   validation de formulaire
```

Contrastes calculés : bleu sur blanc 10,3:1, ardoise 10,6:1. Sur le bleu, le
texte blanc ne descend pas sous 65 % d'opacité (5,1:1) — à 55 %, il tomberait à
4,0:1, sous le seuil AA. Le pied de page, en bleu lui aussi, suit la même règle.

### Composants et icônes

- **shadcn/ui**, style `radix-vega` : `Card` pour toutes les cartes, `Button`
  (variantes `inverse` et `outline-inverse` ajoutées pour les bandeaux, taille
  `xl`), `Sheet` (menu mobile), `Input`, `Textarea`, `NativeSelect`, `Label`,
  `Badge`, `Avatar`.
- **Icônes Phosphor**, déclarées comme bibliothèque d'icônes de shadcn, en
  graisse *duotone* — un aplat translucide sous le trait, plus de relief qu'un
  contour — dans des tuiles en léger relief. Icône climatiseur dessinée sur
  mesure (absente de Phosphor).

### Typographie

- Titres : Plus Jakarta Sans 700–800, interlettrage resserré
- Texte : Inter, 16 px minimum sur mobile, hauteur de ligne 1,65
- Typographie française : espace insécable avant `? ! : ;` et dans « »

### Images

- **Photos de banque libres de droits (Unsplash, Pexels), sujets noirs**, sur
  demande explicite : elles remplacent les emplacements vides de la V2. Elles
  illustrent ; elles ne sont jamais légendées comme « l'équipe Oralec ».
- La règle des **réalisations** est maintenue : aucune image de banque
  présentée comme un chantier. La grille « réalisations » de la maquette est
  devenue « domaines d'intervention ».
- Toutes les photos sont déclarées dans `src/content/images.ts` (source,
  auteur, licence, recadrage) : les remplacer par de vraies photos de chantier
  se fait là, sans toucher aux pages.

### Principes conservés

- **Le mouvement est fonctionnel** : apparition au scroll en CSS pur
  (`animation-timeline: view()`), états de survol. Aucune librairie d'animation.
  `prefers-reduced-motion` respecté partout.
- **Aucun chiffre ni témoignage inventé** : les repères chiffrés sont dérivés du
  contenu, la section témoignages ne s'affiche qu'à partir de trois avis réels.

---

## 7. Architecture technique

### Lot 1 — ce qui est construit

```
Next.js 16 (App Router) · React 19 · TypeScript strict
Tailwind CSS v4 (jetons shadcn déclarés en @theme inline)
shadcn/ui (style radix-vega, primitives Radix) · cn (fusion de classes)
@phosphor-icons/react — icônes, rendues côté serveur
CSS pur — apparitions au scroll, sans librairie d'animation
```

**Rendu :** statique par défaut (SSG). Aucune page n'a besoin d'être dynamique.
**Formulaires :** composés côté client, envoyés par le visiteur lui-même sur WhatsApp ou par e-mail. Aucun serveur, rien de stocké.
**Pas de base de données, pas d'authentification, pas de CMS, pas de stockage objet.**

### shadcn/ui — adopté le 1er octobre 2026

La V1 l'avait écarté pour viser une esthétique industrielle très typée. La
direction actuelle (cartes, boutons, formulaires sobres) est exactement son
terrain, et le dirigeant l'a demandé : les composants sont installés par la CLI
(`npx shadcn@latest add …`), donc possédés par le projet et modifiables. Deux
exceptions volontaires : l'accordéon reste en `<details>` natif (indexable, sans
JS), et le sélecteur de zone reste un `<select>` natif (meilleur sur mobile).

### Trajectoire d'évolution

| Lot | Contenu | Déclencheur métier |
|---|---|---|
| 2 | CMS (Sanity), galerie de réalisations réelle, blog technique | ≥ 3 chantiers documentés |
| 3 | PostgreSQL + espace client : historique, équipements, rapports | ≥ 10 contrats actifs |
| 4 | Dashboard interne (GMAO) : planning, techniciens, interventions | ≥ 3 techniciens |
| 5 | WhatsApp Business API, notifications, suivi d'intervention | Volume ingérable en manuel |

Chaque lot a un déclencheur métier. Aucun ne se lance parce que c'est techniquement intéressant.

---

## 8. Parcours « J'ai un problème »

Idée de la note, resserrée pour le mobile. **Trois étapes, pas six écrans.**

```
Étape 1 — Quel domaine ?    Climatisation · Électricité · Froid commercial · Autre
Étape 2 — Quel besoin ?     Urgence · Réparation · Installation · Entretien · Devis
Étape 3 — Où + téléphone    Zone (liste) + numéro
          ↓
   [ Ouvrir WhatsApp avec ma demande ]   ← action principale
   [ Envoyer par e-mail ]                ← secondaire
```

Le message WhatsApp est pré-rédigé à partir des réponses :

> *Bonjour Oralec. J'ai besoin d'une **réparation** en **climatisation** à **Ouakam**. Mon numéro : 77 XXX XX XX.*

**Décisions volontaires :**

- **Pas d'upload photo dans le parcours.** C'est de la friction et de la donnée facturée. La photo se demande dans WhatsApp, où elle coûte un tap.
- **Pas de description libre obligatoire.** Elle fait abandonner : optionnelle, repliée.
- **Pas de géolocalisation.** Une liste de zones suffit et n'ouvre pas de fenêtre de permission navigateur.
- **Sans état serveur** : tout tient dans le state local. Aucun aller-retour avant l'envoi.

---

## 9. SEO local

**Ordre de priorité réel — le site est le troisième levier, pas le premier :**

1. **Google Business Profile** — fiche complète, catégories, zone de service, photos réelles, horaires, campagne d'avis. C'est ce qui capte le pack local. Semaines, pas mois.
2. **Cohérence NAP** (Nom, Adresse, Téléphone) identique partout : GBP, site, annuaires, réseaux sociaux.
3. **Site** — structure, balisage, pages locales. Effet à 6–12 mois, mais c'est le socle qui rend les deux premiers crédibles.

**Implémenté dès le lot 1 :**

- `metadata` par page, titres uniques, descriptions rédigées à la main
- JSON-LD : `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`
- `sitemap.ts` et `robots.ts` générés
- Pages locales issues du moteur de contenu — **chaque page a un contenu propre** (quartiers, contraintes locales, délais). Dupliquer un gabarit en changeant le nom de la ville est pénalisé, pas récompensé.
- URLs stables, en français, sans paramètres

---

## 10. Performance & contraintes de marché

Ce ne sont pas des objectifs de confort. Sur cette cible, ce sont des objectifs de conversion.

| Métrique | Cible | Mesuré (lot 1) | Commentaire |
|---|---|---|---|
| Chemin de rendu critique | < 120 Ko | **≈ 135 Ko** — HTML 47 Ko + CSS 14 Ko + polices 74 Ko | Mesuré au 1er octobre 2026 (lot 1 : 100 Ko). La page d'accueil est deux fois plus riche ; la moitié du HTML est la charge RSC de l'App Router |
| JS envoyé au client | *voir ci-dessous* | **216 Ko gzip** | Dont ~180 Ko de runtime React 19 + App Router ; le reste : menu mobile (Radix), formulaires |
| Photos | — | **≈ 10 à 60 Ko** chacune sur mobile | AVIF/WebP, redimensionnées à la taille d'affichage ; paresseuses sauf la photo du hero |
| CLS | < 0,05 | à mesurer en conditions réelles | Dimensions réservées, polices en `swap` |
| Fonctionne sans JavaScript | Téléphone + WhatsApp opérationnels | **oui** | Barre d'action mobile en ancres natives |

> **Correction d'un objectif erroné.** Une version antérieure de ce plan fixait
> « JS < 90 Ko gzip ». Ce seuil n'est pas atteignable avec l'App Router : le
> runtime React 19 est envoyé quelle que soit la discipline du code applicatif.
> Mesure réelle : 190 Ko gzip, dont environ 10 Ko nous appartiennent.
>
> Ce n'est pas bloquant, pour une raison précise : **le JavaScript ne conditionne
> aucune action de conversion**. La page s'affiche avec 100 Ko (HTML + CSS +
> polices), et les deux canaux qui comptent — l'appel et WhatsApp — sont des
> ancres `tel:` et `wa.me` qui fonctionnent avant et sans hydratation. Le JS
> n'apporte que le menu mobile et le parcours de qualification.
>
> Si ce plancher devenait inacceptable, le seul vrai levier serait d'abandonner
> React pour un générateur de HTML statique — un arbitrage à poser
> explicitement, pas une optimisation.

**Conséquences directes :**

- Aucune vidéo en page d'accueil
- Polices auto-hébergées, `font-display: swap`, deux graisses maximum
- Images en AVIF/WebP, dimensions explicites, `priority` sur la seule image LCP
- Aucune librairie d'animation : apparitions au scroll en IntersectionObserver + CSS

---

## 11. Roadmap

### Lot 1 — Site vitrine complet *(livré)*

Design system · Mise en page et navigation · Barre d'action mobile · Accueil · 4 pages services · Professionnels · Particuliers · Réalisations (structure) · À propos · FAQ · Contact avec parcours « J'ai un problème » · Pages SEO locales · Métadonnées et JSON-LD · Sitemap et robots

### Lot 2 — Contenu réel

Photos de chantiers · Textes validés par le dirigeant · Fiche Google Business Profile · Nom de domaine et déploiement · Tarifs indicatifs si la décision est prise de les afficher

### Lot 3 — Acquisition

Blog technique (« pourquoi un climatiseur perd en froid », « quand détartrer un chauffe-eau ») · Villes supplémentaires · Campagne d'avis clients · Suivi analytique

### Lot 4+ — Outillage métier

Voir la trajectoire d'évolution en §7.

---

## 12. Indicateurs

| Indicateur | Cible à 3 mois |
|---|---|
| Taux de clic WhatsApp (mobile) | > 12 % des sessions |
| Parcours « J'ai un problème » terminé | > 35 % des démarrages |
| Demandes de contrat B2B | ≥ 5 / mois |
| Position moyenne « climatisation Dakar » | Top 20 |
| Fiche GBP — appels | ≥ 40 / mois |

Le taux de rebond n'est pas suivi : un visiteur qui arrive, clique sur WhatsApp et part est une conversion — comptée comme un rebond.

---

## 13. Périmètre du lot 1

**Livré**
Site complet, statique, responsive, optimisé, en français, avec contenu rédigé, prêt à recevoir les photos réelles et à être déployé.

**Volontairement hors périmètre**
Base de données · Authentification · Dashboard · Espace client · CMS · Paiement en ligne · Prix publics (décision commerciale, pas technique) · WhatsApp Business API · Contenu photo réel

**Dépendances côté Oralec**
Numéro WhatsApp Business · Numéro d'urgence · NINEA et registre de commerce · Adresse physique · Photos de chantiers · Validation des textes · Nom de domaine
