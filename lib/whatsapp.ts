import { WHATSAPP_NUMBER } from "./config";

/** Erzeugt einen wa.me-Link mit vorausgefülltem Text. */
export function waLink(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
