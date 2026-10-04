import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Bouton WhatsApp flottant — desktop uniquement.
 * Sur mobile, la barre d'action fixe remplit déjà ce rôle : deux boutons
 * WhatsApp sur le même écran, c'est un bouton de trop.
 *
 * Seule entorse assumée à la charte : le vert WhatsApp. Le canal se
 * reconnaît à sa couleur ; repeint en bleu, il ne se reconnaîtrait plus.
 */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-6 bottom-6 z-40 hidden items-center gap-2.5 rounded-full bg-whatsapp py-3 pr-5 pl-4 text-white shadow-[0_14px_30px_-10px_rgb(37_211_102/0.6)] transition-transform hover:scale-[1.04] md:inline-flex"
      aria-label="Nous écrire sur WhatsApp"
    >
      <WhatsappLogoIcon weight="fill" className="size-6" aria-hidden />
      <span className="text-sm font-semibold">WhatsApp</span>
    </a>
  );
}
