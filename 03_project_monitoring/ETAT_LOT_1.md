# État du lot 1 — Site vitrine Feanor

> **Document historique, figé au 18 septembre 2026.** L'entreprise s'appelle
> désormais **Oralec** et la plomberie a été retirée de l'offre. Le code est
> maintenant dans `04_code` (et non plus `04_code/feanor-web`), le plan dans
> `02_project_plan/PLAN_SITE_ORALEC.md`. État courant :
> `ETAT_REFONTE_ORALEC.md`.

Dernière mise à jour : 18 septembre 2026
Code : `04_code/feanor-web` · Plan : `02_project_plan/PLAN_SITE_FEANOR.md`

---

## Statut : lot 1 terminé et vérifié

Build de production : **25 pages, toutes prérendues statiquement**.
`tsc --noEmit` et `eslint` passent sans erreur.

---

## Livré

| Domaine | Détail |
|---|---|
| Socle de design | Jetons CSS (thème clair), typographie, grille technique, primitives |
| Coque | En-tête collant, menu mobile, pied de page, **barre d'action mobile fixe**, bouton WhatsApp desktop |
| Accueil | Hero, 4 engagements, grille services, bifurcation B2C/B2B, Feanor Care, pourquoi Feanor, zones, FAQ, CTA |
| Services | Page index + 4 pages métier générées (prestations, signes d'alerte, pour qui, méthode, FAQ) |
| Professionnels | Feanor Business : constat, 7 secteurs, 3 paliers de contrat, cycle Care, audit |
| Particuliers | Déroulé en 4 étapes, services domestiques, **gestes d'urgence**, FAQ |
| Contact | Parcours « J'ai un problème » en 3 étapes + canaux directs |
| Réalisations | Structure complète + état d'attente honnête (masquée tant que < 3 chantiers) |
| À propos / FAQ / Mentions légales | Rédigées, avec bloc de légitimité (NINEA, RC) |
| SEO local | 7 pages de zone générées, chacune avec un contenu propre |
| Technique SEO | Métadonnées par page, JSON-LD (LocalBusiness, Service, FAQPage, BreadcrumbList), sitemap, robots |
| 404 | Page dédiée avec rattrapage vers les services |

## Vérifications effectuées

- [x] Build de production : 25/25 pages générées
- [x] Types et lint : aucune erreur
- [x] Parcours « J'ai un problème » testé de bout en bout — message WhatsApp correctement composé, repli e-mail fonctionnel
- [x] Validation du numéro sénégalais : bloque l'envoi et renvoie au champ fautif
- [x] Apparitions au scroll : aucun bloc figé en bas de page (17/17 atteignent l'opacité pleine)
- [x] Routage : routes statiques prioritaires, pages locales servies, URL inconnue → 404
- [x] Rendu mobile (375 px) : barre d'action visible, hero lisible, aucun débordement
- [x] Poids mesuré sur le build de production

---

## En attente côté Feanor — bloquants pour la mise en ligne

| # | Élément | Où | Criticité |
|---|---|---|---|
| 1 | Numéro de téléphone principal | `src/content/site.ts` | **Bloquant** |
| 2 | Numéro WhatsApp Business | `src/content/site.ts` | **Bloquant** |
| 3 | Numéro d'urgence | `src/content/site.ts` | **Bloquant** |
| 4 | Adresse physique exacte | `src/content/site.ts` | **Bloquant** |
| 5 | NINEA et registre du commerce | `src/content/site.ts` | **Bloquant** — c'est un élément de conversion |
| 6 | Raison sociale exacte | `src/content/site.ts` | Bloquant |
| 7 | Nom de domaine | `src/content/site.ts` (`url`) | Bloquant |
| 8 | Adresses e-mail | `src/content/site.ts` | Bloquant |
| 9 | Validation des textes par le dirigeant | `src/content/*` | Important |
| 10 | Photos de chantiers | `src/content/realisations.ts` | Non bloquant — la page se comporte correctement sans |

Tant que 1 à 8 ne sont pas fournis, le site est complet mais **non publiable** :
les coordonnées affichées sont des placeholders.

---

## Décisions ouvertes (commerciales, pas techniques)

- **Afficher ou non des tarifs indicatifs pour les particuliers.** Actuellement
  aucun prix n'est affiché, et la FAQ explique pourquoi. Un ordre de grandeur
  sur les prestations courantes (entretien de climatiseur, débouchage) lèverait
  une objection réelle — mais engage commercialement.
- **Périmètre exact des contrats.** Les délais annoncés (24 h ouvrées en
  Business, 4 h sur équipement critique en Premium) doivent être validés comme
  tenables avant publication : ils sont écrits comme des engagements.
- **Photo de hero.** Le hero est actuellement typographique, sans image. C'est
  un choix assumé en l'absence de visuels propres, pas un manque à combler avec
  une image de banque.

---

## Suite — lot 2

1. Intégrer les coordonnées réelles (points 1 à 8)
2. Créer et compléter la fiche **Google Business Profile** — c'est le premier
   levier d'acquisition, avant le SEO on-page
3. Réserver le domaine et déployer
4. Lancer le protocole de captation photo sur les chantiers
5. Campagne d'avis clients
