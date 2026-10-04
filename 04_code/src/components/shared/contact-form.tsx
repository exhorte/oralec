"use client";

import { useState } from "react";
import { EnvelopeSimpleIcon, WhatsappLogoIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/content/site";
import { telephoneValide } from "@/lib/telephone";
import { whatsappContactMessage, whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const demandes = [
  "Installation de climatisation",
  "Entretien ou dépannage de climatisation",
  "Installation ou rénovation électrique",
  "Mise aux normes / panne électrique",
  "Froid commercial / chambre froide",
  "Contrat de maintenance",
  "Autre demande",
];

/* Champs sur fond bleu : l'aplat est éclairci plutôt que d'ajouter une
   couleur — la carte reste dans la charte. */
const champ =
  "h-11 border-white/15 bg-white/[0.07] text-white placeholder:text-white/65 focus-visible:border-white/50 focus-visible:ring-white/20";

/**
 * Formulaire « Envoyez-nous un message » — la carte bleue de la maquette.
 *
 * Rien n'est envoyé à un serveur : le formulaire compose le message que le
 * visiteur envoie lui-même, par WhatsApp (action principale) ou par e-mail.
 * Pas de base de données, donc rien à sécuriser ni à purger.
 */
export function ContactForm() {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [service, setService] = useState(demandes[0]);
  const [message, setMessage] = useState("");
  const [tente, setTente] = useState(false);

  const nomOk = nom.trim().length >= 2;
  const telOk = telephoneValide(telephone);
  const complet = nomOk && telOk;

  const texte = whatsappContactMessage({ nom, telephone, service, message });
  const mailto =
    `mailto:${site.emailDevis}` +
    `?subject=${encodeURIComponent(`Demande — ${service}`)}` +
    `&body=${encodeURIComponent(texte)}`;

  function envoyer(canal: "whatsapp" | "email") {
    setTente(true);
    if (!complet) {
      document.getElementById(nomOk ? "contact-telephone" : "contact-nom")?.focus();
      return;
    }
    if (canal === "whatsapp") {
      window.open(whatsappUrl(texte), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = mailto;
    }
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        envoyer("whatsapp");
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="contact-nom" className="text-white/85">
          Nom complet
        </Label>
        <Input
          id="contact-nom"
          autoComplete="name"
          placeholder="Ex. : Aminata Diop"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          aria-invalid={tente && !nomOk}
          className={champ}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-telephone" className="text-white/85">
          Téléphone
        </Label>
        <Input
          id="contact-telephone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="77 123 45 67"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          aria-invalid={tente && !telOk}
          aria-describedby="contact-telephone-aide"
          className={cn(champ, "tnum")}
        />
        <p
          id="contact-telephone-aide"
          className={cn("text-xs", tente && !telOk ? "font-semibold text-white" : "text-white/70")}
        >
          {tente && !telOk
            ? "Numéro sénégalais attendu : 9 chiffres commençant par 7."
            : "Nous vous rappelons sur ce numéro."}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-service" className="text-white/85">
          Votre demande
        </Label>
        <NativeSelect
          id="contact-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full [&_select]:h-11 [&_select]:border-white/15 [&_select]:bg-white/[0.07] [&_select]:text-white [&_svg]:text-white/60"
        >
          {demandes.map((d) => (
            <NativeSelectOption key={d} value={d}>
              {d}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message" className="text-white/85">
          Message <span className="font-normal text-white/70">(facultatif)</span>
        </Label>
        <Textarea
          id="contact-message"
          rows={3}
          placeholder="Ex. : le climatiseur du salon ne refroidit plus depuis deux jours."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(champ, "h-auto min-h-24")}
        />
      </div>

      <div className="space-y-3 pt-2">
        <Button type="submit" variant="inverse" size="xl" className="w-full">
          <WhatsappLogoIcon weight="fill" className="text-whatsapp" data-icon="inline-start" aria-hidden />
          Envoyer sur WhatsApp
        </Button>
        <Button
          type="button"
          variant="outline-inverse"
          size="lg"
          className="w-full"
          onClick={() => envoyer("email")}
        >
          <EnvelopeSimpleIcon weight="duotone" data-icon="inline-start" aria-hidden />
          Envoyer par e-mail
        </Button>
        {tente && !complet && (
          <p role="status" className="text-center text-xs font-medium text-white">
            Indiquez votre nom et un numéro valide pour envoyer la demande.
          </p>
        )}
      </div>
    </form>
  );
}
