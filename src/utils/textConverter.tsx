import { FONTS } from '../components/characterMaps';


interface Settings {
  properNounsOnly: boolean;
  excludeAcronyms: boolean;
  excludeUrls: boolean;
}

export const transformText = (text: string, fontKey: string, settings?: Settings): string => {
  const map = FONTS[fontKey];
  if (!map) return text;

  if (settings?.properNounsOnly) {
    
  }

  return text
    .split('')
    .map((char) => map[char] || char)
    .join('');
};