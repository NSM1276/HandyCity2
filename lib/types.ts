export type Kategorie = "smartphone" | "zubehoer";

export interface Produkt {
  id: number;
  kategorie: Kategorie;
  name: string;
  preis: number;
  bild: string;
  hidden?: boolean;
}

export interface ReparaturPreis {
  display: number;
  akku: number;
  charging: number;
}

/** Marke -> Modell -> Preise */
export type ReparaturPreise = Record<string, Record<string, ReparaturPreis>>;

export interface SiteData {
  reparaturPreise: ReparaturPreise;
  produkte: Produkt[];
}

export type Reparaturart = keyof ReparaturPreis;
