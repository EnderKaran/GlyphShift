// Ortak Tip Tanımları
export type Language = 'EN' | 'TR' | 'FR' | 'ES' | 'DE';

export interface ConversionSettings {
  properNounsOnly: boolean;
  excludeAcronyms: boolean;
  excludeUrls: boolean;
}

export interface FontStyle {
  key: string;
  label: string;
  example: string;
}