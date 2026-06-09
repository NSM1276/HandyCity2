"use client";

import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

export default function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Hallo Handy City 2, ich möchte eine Reparatur anfragen:")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Per WhatsApp anfragen"
      className="btn-gold fixed bottom-5 left-1/2 z-50 -translate-x-1/2 inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold md:hidden"
    >
      <WhatsAppIcon className="h-5 w-5" />
      Per WhatsApp anfragen
    </a>
  );
}
