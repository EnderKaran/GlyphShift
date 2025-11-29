import { FONTS, type CharMap } from '../components/characterMaps';
import type { ConversionSettings } from './types';

const applyFontToWord = (word: string, map: CharMap, fontKey?: string): string => {
  if (fontKey === 'upsideDown') {
    return word.split('').reverse().map((char) => map[char] || char).join('');
  }

  if (fontKey === 'emojiMix') {
    const emojis = ['✨', '💖', '🌸', '🔥', '💀', '🤡', '👻', '👽', '🦄', '🌟'];
    return word
      .split('')
      .map((char) => char + (Math.random() > 0.7 ? emojis[Math.floor(Math.random() * emojis.length)] : ''))
      .join('');
  }

  return word.split('').map((char) => map[char] || char).join('');
};

export const transformText = (
  text: string, 
  fontKey: string, 
  settings?: ConversionSettings
): string => {
  
  if (fontKey === 'upsideDown') {
    const map = FONTS[fontKey];
    if (!map) return text;
    return text.split('').reverse().map((char) => map[char] || char).join('');
  }

  const map = FONTS[fontKey];
  if (!map && fontKey !== 'emojiMix') return text;

  if (!settings || (!settings.properNounsOnly && !settings.excludeAcronyms && !settings.excludeUrls)) {
    return applyFontToWord(text, map || {}, fontKey);
  }

  const tokens = text.split(/((?:https?:\/\/|www\.)[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9À-ÿ]+)/g);

  const processedText = tokens.map((token) => {
    if (!token.trim() || !/[a-zA-Z0-9À-ÿ]/.test(token)) return token;

    let shouldConvert = true;

    const isUrl = /^(https?:\/\/|www\.)/i.test(token) || /\.[a-z]{2,}$/i.test(token);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(token);
    
    if (settings.excludeUrls && (isUrl || isEmail)) shouldConvert = false;
    if (settings.excludeAcronyms && shouldConvert && token.length > 1 && /^[A-Z0-9]+$/.test(token)) shouldConvert = false;
    if (settings.properNounsOnly && shouldConvert) {
      const isCapitalized = /^[A-Z]/.test(token);
      if (!isCapitalized) shouldConvert = false;
    }

    return shouldConvert ? applyFontToWord(token, map || {}, fontKey) : token;
  });

  return processedText.join('');
};