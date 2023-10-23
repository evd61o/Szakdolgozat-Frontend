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
  Tipus?: string;
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
  Energiahatekonysagi_osztaly?: string;
  Fogyasztas_100_eco_program?: number;
}
export interface Dehumidifier {
  Marka?: string;
  Modell?: string;
  Energiahatekonysagi_osztaly?: string;
  Teljesitmeny?: number;
  Fogyasztas?: number;
}
export interface Oven {
  Marka?: string;
  Modell?: string;
  Energiahatekonysagi_osztaly?: string;
  Teljesitmeny?: number;
  Egy_uzemciklusra_vetitett_energiafogyasztas_hagyomanyos?: number;
  Egy_uzemciklusra_vetitett_energiafogyasztas_legkevereses?: number;
}
export interface Washing_machine {
  Marka?: string;
  Modell?: string;
  Tipus?: string;
  Energiahatekonysagi_osztaly?: string;
  Max_toltetsuly?: number;
  Max_cent_ford?: number;
  Fogyasztas_100_eco_40_60_program?: number;
}
export interface Dryer {
  Marka?: string;
  Modell?: string;
  Tipus?: string;
  Energiahatekonysagi_osztaly?: string;
  Max_toltetsuly?: number;
  Fogyasztasev?: number;
  Fogyasztasnap?: number;
}

export interface Profiles {
  searchValueRefrigerator?: string;
  searchValueFreezer?: string;
  searchValueHot_plate?: string;
  searchValueMicrowave?: string;
  searchValueDishwasher?: string;
  searchValueDehumidifier?: string;
  searchValueOven?: string;
  searchValueWashing_machine?: string;
  searchValueDryer?: string;
  email?: string;
}

export interface Registration {
  username?: string;
  email?: string;
  password?: string;
  action?: string;
}

export interface Login {
  email?: string;
  password?: string;
  action?: string;
}
