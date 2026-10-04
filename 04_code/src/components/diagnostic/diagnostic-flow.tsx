"use client";

import { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  LightningIcon,
  QuestionIcon,
  SnowflakeIcon,
  WhatsappLogoIcon,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

import { AirConditionerIcon } from "@/components/ui/air-conditioner-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { site, zonesIntervention } from "@/content/site";
import { telephoneValide } from "@/lib/telephone";
import { whatsappUrl, whatsappDiagnosticMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Parcours « J'ai un problème ».
 *
 * Trois étapes, pas six écrans. Décisions volontaires :
 * — pas d'upload photo (friction + données mobiles facturées ; la photo se
 *   demande dans WhatsApp, où elle coûte un tap) ;
 * — pas de description libre obligatoire (elle fait abandonner) ;
 * — pas de géolocalisation (une liste de zones suffit et n'ouvre pas de
 *   fenêtre de permission navigateur) ;
 * — aucun état serveur : tout tient en local, rien n'est envoyé avant
 *   l'action finale de l'utilisateur.
 */

type Option = {
  value: string;
  label: string;
  icon?: PhosphorIcon | typeof AirConditionerIcon;
  hint?: string;
};

const domaines: Option[] = [
  { value: "Climatisation", label: "Climatisation", icon: AirConditionerIcon, hint: "Split, cassette, gainable…" },
  { value: "Électricité", label: "Électricité", icon: LightningIcon, hint: "Panne, tableau, installation" },
  { value: "Froid commercial", label: "Froid commercial", icon: SnowflakeIcon, hint: "Chambre froide, vitrine" },
  { value: "Autre / je ne sais pas", label: "Autre", icon: QuestionIcon, hint: "Je ne sais pas" },
];

const besoins: Option[] = [
  { value: "Dépannage urgent", label: "Dépannage urgent", hint: "C'est en panne maintenant" },
  { value: "Réparation", label: "Réparation", hint: "Ça fonctionne mal" },
  { value: "Installation", label: "Installation", hint: "Nouvel équipement" },
  { value: "Entretien", label: "Entretien", hint: "Nettoyage, contrôle" },
  { value: "Diagnostic", label: "Diagnostic", hint: "Je ne sais pas d'où ça vient" },
  { value: "Devis / contrat", label: "Devis ou contrat", hint: "Projet, maintenance" },
];

const choix =
  "flex items-center gap-4 rounded-xl border p-4 text-left transition-all hover:border-primary/40 hover:bg-secondary/60 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

export function DiagnosticFlow() {
  const [etape, setEtape] = useState(0);
  const [domaine, setDomaine] = useState("");
  const [besoin, setBesoin] = useState("");
  const [zone, setZone] = useState("");
  const [telephone, setTelephone] = useState("");
  const [precision, setPrecision] = useState("");
  const [touche, setTouche] = useState(false);

  const telOk = telephoneValide(telephone);
  const etape3Ok = zone !== "" && telOk;

  const message = whatsappDiagnosticMessage({ domaine, besoin, zone, telephone, precision });

  /** Renvoie l'utilisateur vers le champ qui bloque l'envoi. */
  function signalerIncomplet() {
    setTouche(true);
    document.getElementById(zone === "" ? "zone" : "telephone")?.focus();
  }

  const mailtoHref =
    `mailto:${site.emailDevis}` +
    `?subject=${encodeURIComponent(`Demande d'intervention — ${domaine}`)}` +
    `&body=${encodeURIComponent(message)}`;

  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-float">
      {/* Progression */}
      <div className="flex items-center gap-4 border-b border-border bg-muted/60 px-5 py-4 sm:px-7">
        <div className="flex flex-1 gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn("h-1.5 flex-1 rounded-full transition-colors", i <= etape ? "bg-primary" : "bg-border")}
            />
          ))}
        </div>
        <span className="tnum shrink-0 text-xs font-semibold text-subtil">Étape {etape + 1} / 3</span>
      </div>

      <div className="p-5 sm:p-7">
        {/* ------------------------------------------------ Étape 1 */}
        {etape === 0 && (
          <fieldset>
            <legend className="font-heading text-xl font-bold">Quel est votre problème&nbsp;?</legend>
            <p className="mt-2 text-sm text-muted-foreground">
              Choisissez le domaine qui s&apos;en rapproche le plus. En cas de doute, « Autre »
              convient très bien.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {domaines.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => {
                    setDomaine(d.value);
                    setEtape(1);
                  }}
                  className={cn(
                    choix,
                    domaine === d.value ? "border-primary bg-secondary" : "border-border bg-card",
                  )}
                >
                  {d.icon && (
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-white to-bleu-clair text-primary ring-1 ring-inset ring-primary/10">
                      <d.icon weight="duotone" className="size-6" aria-hidden />
                    </span>
                  )}
                  <span>
                    <span className="block font-semibold text-foreground">{d.label}</span>
                    {d.hint && <span className="block text-sm text-subtil">{d.hint}</span>}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* ------------------------------------------------ Étape 2 */}
        {etape === 1 && (
          <fieldset>
            <legend className="font-heading text-xl font-bold">De quoi avez-vous besoin&nbsp;?</legend>
            <p className="mt-2 text-sm text-muted-foreground">
              Domaine sélectionné&nbsp;: <span className="font-semibold text-primary">{domaine}</span>
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {besoins.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => {
                    setBesoin(b.value);
                    setEtape(2);
                  }}
                  className={cn(
                    choix,
                    "block",
                    besoin === b.value ? "border-primary bg-secondary" : "border-border bg-card",
                  )}
                >
                  <span className="block font-semibold text-foreground">{b.label}</span>
                  <span className="block text-sm text-subtil">{b.hint}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* ------------------------------------------------ Étape 3 */}
        {etape === 2 && (
          <div>
            <h2 className="font-heading text-xl font-bold">Où, et comment vous joindre&nbsp;?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">{domaine}</span> ·{" "}
              <span className="font-semibold text-primary">{besoin}</span>
            </p>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="zone">Votre zone</Label>
                <NativeSelect
                  id="zone"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  aria-invalid={touche && zone === ""}
                  className="w-full [&_select]:h-11"
                >
                  <NativeSelectOption value="">Sélectionnez…</NativeSelectOption>
                  {zonesIntervention.map((z) => (
                    <NativeSelectOption key={z} value={z}>
                      {z}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Votre téléphone</Label>
                <Input
                  id="telephone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="77 123 45 67"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  onBlur={() => setTouche(true)}
                  aria-invalid={touche && !telOk}
                  aria-describedby="telephone-aide"
                  className="tnum h-11"
                />
                <p
                  id="telephone-aide"
                  className={cn("text-xs", touche && !telOk ? "font-medium text-destructive" : "text-subtil")}
                >
                  {touche && !telOk
                    ? "Numéro sénégalais attendu : 9 chiffres commençant par 7."
                    : "Nous vous rappelons sur ce numéro."}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="precision">
                  Précision <span className="font-normal text-subtil">(facultatif)</span>
                </Label>
                <Textarea
                  id="precision"
                  rows={3}
                  placeholder="Ex. : le climatiseur du salon ne refroidit plus depuis deux jours."
                  value={precision}
                  onChange={(e) => setPrecision(e.target.value)}
                />
                <p className="text-xs text-subtil">
                  Une photo vaut souvent mieux qu&apos;un paragraphe — vous pourrez l&apos;envoyer
                  directement dans la conversation WhatsApp.
                </p>
              </div>
            </div>

            {/* Actions finales.
                En état incomplet, on rend un vrai <button> plutôt qu'une ancre
                sans href : une ancre sans href sort du parcours clavier, et
                l'utilisateur au clavier ne pourrait jamais découvrir pourquoi
                l'action ne part pas. Le bouton reste focusable, annonce
                `aria-disabled` et renvoie vers le champ fautif. */}
            <div className="mt-7 flex flex-col gap-3">
              {etape3Ok ? (
                <Button asChild size="xl" className="w-full">
                  <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">
                    <WhatsappLogoIcon weight="fill" className="text-whatsapp" data-icon="inline-start" aria-hidden />
                    Ouvrir WhatsApp avec ma demande
                  </a>
                </Button>
              ) : (
                <Button
                  type="button"
                  size="xl"
                  aria-disabled="true"
                  onClick={signalerIncomplet}
                  className="w-full cursor-not-allowed bg-muted text-subtil shadow-none hover:bg-muted"
                >
                  <WhatsappLogoIcon weight="fill" data-icon="inline-start" aria-hidden />
                  Ouvrir WhatsApp avec ma demande
                </Button>
              )}

              {etape3Ok ? (
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href={mailtoHref}>
                    <EnvelopeSimpleIcon weight="duotone" data-icon="inline-start" aria-hidden />
                    Envoyer par e-mail
                  </a>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  aria-disabled="true"
                  onClick={signalerIncomplet}
                  className="w-full cursor-not-allowed text-subtil"
                >
                  <EnvelopeSimpleIcon weight="duotone" data-icon="inline-start" aria-hidden />
                  Envoyer par e-mail
                </Button>
              )}

              {!etape3Ok && (
                <p className="text-center text-xs text-subtil" role="status">
                  Complétez la zone et le téléphone pour activer l&apos;envoi.
                </p>
              )}
            </div>

            {/* Aperçu — la transparence rassure : on montre ce qui part */}
            {etape3Ok && (
              <details className="accordion-item mt-6 border-t border-border pt-4">
                <summary className="text-sm font-medium text-muted-foreground">
                  Voir le message qui sera envoyé
                </summary>
                <pre className="mt-3 overflow-x-auto rounded-lg border-l-2 border-primary bg-muted p-4 font-sans text-sm whitespace-pre-wrap text-muted-foreground">
                  {message}
                </pre>
              </details>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      {etape > 0 && (
        <div className="flex items-center justify-between border-t border-border px-5 py-4 sm:px-7">
          <Button type="button" variant="ghost" onClick={() => setEtape((e) => e - 1)}>
            <ArrowLeftIcon weight="bold" data-icon="inline-start" aria-hidden />
            Retour
          </Button>

          {etape === 1 && besoin && (
            <Button type="button" variant="ghost" onClick={() => setEtape(2)} className="text-primary">
              Continuer
              <ArrowRightIcon weight="bold" data-icon="inline-end" aria-hidden />
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
