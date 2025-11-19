import { FONTS } from '../components/characterMaps';

export const transformText = (text: string, fontKey: string): string => {
  const map = FONTS[fontKey];
  if (!map) return text;

  return text
    .split('')
    .map((char) => map[char] || char)
    .join('');
};