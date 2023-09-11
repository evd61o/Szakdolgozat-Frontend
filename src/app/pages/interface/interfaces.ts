export interface Refrigerator {
  Marka?: string;
  Modell?: string;
  Tipus?: string;
  Meret?: number;
  Energiahatekonysagi_osztaly?: string;
  Fogyasztasev?: number;
  Fogyasztasnap?: number;
}
export interface Freezer {
  Marka?: string;
  Modell?: string;
  Meret?: number;
  Energiahatekonysagi_osztaly?: string;
  Fogyasztasev?: number;
  Fogyasztasnap?: number;
}
export interface Hot_plate {
  Marka?: string;
  Modell?: string;
  Tipus?: string;
  Teljesitmeny?: number;
  Fogyasztas?: number;
}
export interface Microwave {
  Marka?: string;
  Modell?: string;
  Tipus?: string;
  Teljesitmeny?: number;
  Fogyasztas?: number;
}
export interface Dishwasher {
  Marka?: string;
  Modell?: string;
  Tipus?: string;
  Fogyasztas_kWh_eco_program?: number;
}
export interface Dehumidifier {
  Marka?: string;
  Tipus?: string;
  Energiahatekonysagi_osztaly?: string;
  Teljesitmeny?: number;
  Fogyasztas?: number;
}
export interface Oven {
  Marka?: string;
  Tipus?: string;
  Energiahatekonysagi_osztaly?: string;
  Teljesitmeny?: number;
  Fogyasztas?: number;
}
