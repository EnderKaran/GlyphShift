import nlp from 'compromise';
import { FONTS, type CharMap } from '../components/characterMaps';

interface ConversionSettings {
  properNounsOnly: boolean;
  excludeAcronyms: boolean;
  excludeUrls: boolean;
}

const applyFontToWord = (word: string, map: CharMap): string => {
  return word
    .split('')
    .map((char) => map[char] || char)
    .join('');
};

export const transformText = (
  text: string, 
  fontKey: string, 
  settings?: ConversionSettings
): string => {
  const map = FONTS[fontKey];
  if (!map) return text;

  if (!settings || (!settings.properNounsOnly && !settings.excludeAcronyms && !settings.excludeUrls)) {
    return applyFontToWord(text, map);
  }

  // --- NLP ANALİZİ ---
  
  const doc = nlp(text);
  const terms = doc.termList();

  const processedText = terms.map((term: any) => {
    const originalWord = term.text;
    
    const tags = Array.from(term.tags || []) as string[];
    
    let shouldConvert = true;

    // KURAL 1: URL ve Email Koruması
    if (settings.excludeUrls) {
      if (tags.includes('Url') || tags.includes('Email') || tags.includes('Hashtag')) {
        shouldConvert = false;
      }
    }

    // KURAL 2: Kısaltma (Acronym) Koruması
    if (settings.excludeAcronyms && shouldConvert) {
      if (tags.includes('Acronym') || (originalWord.length > 1 && /^[A-Z0-9]+$/.test(originalWord))) {
        shouldConvert = false;
      }
    }

    // KURAL 3: Sadece Özel İsimleri Çevir
    if (settings.properNounsOnly && shouldConvert) {
      const isProper = tags.includes('ProperNoun') || 
                       tags.includes('Person') || 
                       tags.includes('Place') || 
                       tags.includes('Organization');
      
      if (!isProper) {
        shouldConvert = false;
      }
    }

    const finalWord = shouldConvert ? applyFontToWord(originalWord, map) : originalWord;

    return (term.pre || '') + finalWord + (term.post || '');
  });

  return processedText.join('');
};