import { Lyric, Song, Language } from '@/types';

// This is a mock service that generates lyrics for a song
export const generateLyrics = (song: Song, targetLanguage?: Language): Lyric[] => {
  // For demo purposes, we'll generate some mock lyrics
  const isTranslation = targetLanguage && targetLanguage.id !== song.language.id;
  
  // Generate different lyrics based on the song ID to make it realistic
  const songIndex = parseInt(song.id) || 1;
  let lyrics: Lyric[] = [];
  
  // Apply different templates based on the song language and target language
  if (song.language.code === 'es') {
    // Spanish song base lyrics
    lyrics = [
      {
        id: `${song.id}-1`,
        songId: song.id,
        startTime: 5,
        endTime: 15,
        text: "Sí, sabes que ya llevo un rato mirándote",
        translation: "Yes, you know I've been looking at you for a while",
        wordFocus: [
          {
            id: "1",
            word: "mirándote",
            translation: "looking at you",
            definition: "The act of visually observing someone",
            examples: ["Te estaba mirándote desde lejos", "Ella está mirándote"]
          }
        ]
      },
      {
        id: `${song.id}-2`,
        songId: song.id,
        startTime: 15,
        endTime: 25,
        text: "Tengo que bailar contigo hoy",
        translation: "I have to dance with you today",
        wordFocus: [
          {
            id: "2",
            word: "bailar",
            translation: "dance",
            definition: "To move rhythmically to music",
            examples: ["Me gusta bailar salsa", "Vamos a bailar toda la noche"]
          }
        ]
      },
      {
        id: `${song.id}-3`,
        songId: song.id,
        startTime: 25,
        endTime: 35,
        text: "Vi que tu mirada ya estaba llamándome",
        translation: "I saw that your gaze was already calling me",
        wordFocus: [
          {
            id: "3",
            word: "mirada",
            translation: "gaze",
            definition: "A steady intent look",
            examples: ["Su mirada era intensa", "Con una mirada lo dijo todo"]
          }
        ]
      },
    ];
    
    // If target language is not Spanish, translate the lyrics
    if (isTranslation) {
      // Apply different translations based on target language
      if (targetLanguage?.code === 'fr') {
        lyrics = transformLyricsForLanguage(lyrics, 'fr');
      } else if (targetLanguage?.code === 'de') {
        lyrics = transformLyricsForLanguage(lyrics, 'de');
      } else if (targetLanguage?.code === 'it') {
        lyrics = transformLyricsForLanguage(lyrics, 'it');
      } else {
        // Default to English for other languages
        // Already has English translation
      }
    }
  } else if (song.language.code === 'fr') {
    // French song lyrics
    lyrics = [
      {
        id: `${song.id}-1`,
        songId: song.id,
        startTime: 5,
        endTime: 15,
        text: "Des yeux qui font baisser les miens",
        translation: "Eyes that make mine lower",
        wordFocus: [
          {
            id: "1",
            word: "yeux",
            translation: "eyes",
            definition: "The organs of sight",
            examples: ["Ses yeux bleus", "Ferme les yeux"]
          }
        ]
      },
      {
        id: `${song.id}-2`,
        songId: song.id,
        startTime: 15,
        endTime: 25,
        text: "Un rire qui se perd sur sa bouche",
        translation: "A laugh that gets lost on his mouth",
        wordFocus: [
          {
            id: "2",
            word: "rire",
            translation: "laugh",
            definition: "To express mirth, pleasure, derision, or nervousness with an audible, vocal expulsion of air",
            examples: ["J'aime te faire rire", "Son rire est contagieux"]
          }
        ]
      },
      {
        id: `${song.id}-3`,
        songId: song.id,
        startTime: 25,
        endTime: 35,
        text: "Voilà le portrait sans retouche",
        translation: "This is the portrait without retouching",
        wordFocus: [
          {
            id: "3",
            word: "retouche",
            translation: "retouching",
            definition: "The act of modifying an image",
            examples: ["Photo sans retouche", "La retouche numérique"]
          }
        ]
      },
    ];
    
    // If target language is not French, translate the lyrics
    if (isTranslation) {
      if (targetLanguage?.code === 'es') {
        lyrics = transformLyricsForLanguage(lyrics, 'es');
      } else if (targetLanguage?.code === 'de') {
        lyrics = transformLyricsForLanguage(lyrics, 'de');
      } else if (targetLanguage?.code === 'it') {
        lyrics = transformLyricsForLanguage(lyrics, 'it');
      }
    }
  } else if (song.language.code === 'de') {
    // German song lyrics
    lyrics = [
      {
        id: `${song.id}-1`,
        songId: song.id,
        startTime: 5,
        endTime: 15,
        text: "Hast du etwas Zeit für mich",
        translation: "Do you have some time for me",
        wordFocus: [
          {
            id: "1",
            word: "Zeit",
            translation: "time",
            definition: "The indefinite continued progress of existence",
            examples: ["Ich habe keine Zeit", "Es ist Zeit zu gehen"]
          }
        ]
      },
      {
        id: `${song.id}-2`,
        songId: song.id,
        startTime: 15,
        endTime: 25,
        text: "Dann singe ich ein Lied für dich",
        translation: "Then I'll sing a song for you",
        wordFocus: [
          {
            id: "2",
            word: "singe",
            translation: "sing",
            definition: "To produce musical sounds with the voice",
            examples: ["Ich singe gerne", "Sie singt im Chor"]
          }
        ]
      },
      {
        id: `${song.id}-3`,
        songId: song.id,
        startTime: 25,
        endTime: 35,
        text: "Von 99 Luftballons auf ihrem Weg zum Horizont",
        translation: "About 99 air balloons on their way to the horizon",
        wordFocus: [
          {
            id: "3",
            word: "Luftballons",
            translation: "air balloons",
            definition: "Inflatable toys made of rubber",
            examples: ["Rote Luftballons", "Die Luftballons steigen auf"]
          }
        ]
      }
    ];
    
    // If target language is not German, translate the lyrics
    if (isTranslation) {
      if (targetLanguage?.code === 'es') {
        lyrics = transformLyricsForLanguage(lyrics, 'es');
      } else if (targetLanguage?.code === 'fr') {
        lyrics = transformLyricsForLanguage(lyrics, 'fr');
      } else if (targetLanguage?.code === 'it') {
        lyrics = transformLyricsForLanguage(lyrics, 'it');
      }
    }
  } else {
    // Default lyrics for other languages
    lyrics = [
      {
        id: `${song.id}-1`,
        songId: song.id,
        startTime: 5,
        endTime: 15,
        text: "This is the first line of the song",
        translation: "Translation of first line",
        wordFocus: [
          {
            id: "1",
            word: "first",
            translation: "primero/primera",
            definition: "Coming before all others in time or order",
            examples: ["This is my first time", "She was the first to arrive"]
          }
        ]
      },
      {
        id: `${song.id}-2`,
        songId: song.id,
        startTime: 15,
        endTime: 25,
        text: "This is the second line of the song",
        translation: "Translation of second line",
        wordFocus: [
          {
            id: "2",
            word: "second",
            translation: "segundo/segunda",
            definition: "Coming after the first in time or order",
            examples: ["This is my second attempt", "He finished second in the race"]
          }
        ]
      },
      {
        id: `${song.id}-3`,
        songId: song.id,
        startTime: 25,
        endTime: 35,
        text: "This is the third line of the song",
        translation: "Translation of third line",
        wordFocus: [
          {
            id: "3",
            word: "third",
            translation: "tercero/tercera",
            definition: "Coming after the second and before the fourth in position",
            examples: ["This is my third visit", "She lives on the third floor"]
          }
        ]
      },
    ];
    
    // If translation is needed, apply it
    if (isTranslation) {
      lyrics = transformLyricsForLanguage(lyrics, targetLanguage?.code || 'en');
    }
  }
  
  return lyrics;
};

// Helper function to transform lyrics based on target language
function transformLyricsForLanguage(lyrics: Lyric[], targetCode: string): Lyric[] {
  // Create a copy of the lyrics with translated text
  const translatedLyrics = lyrics.map(lyric => {
    const newLyric = { ...lyric };
    
    // The original text becomes the translation
    const originalText = lyric.text;
    const originalTranslation = lyric.translation;
    
    // Update word focus with translations for the target language
    const updatedWordFocus = lyric.wordFocus ? 
      lyric.wordFocus.map(wf => ({
        ...wf,
        translation: getTranslationForWord(wf.word, targetCode)
      })) : [];
    
    // Set new text based on target language
    switch (targetCode) {
      case 'es':
        newLyric.text = getSpanishText(lyric.id);
        newLyric.translation = originalText;
        break;
      case 'fr':
        newLyric.text = getFrenchText(lyric.id);
        newLyric.translation = originalText;
        break;
      case 'de':
        newLyric.text = getGermanText(lyric.id);
        newLyric.translation = originalText;
        break;
      case 'it':
        newLyric.text = getItalianText(lyric.id);
        newLyric.translation = originalText;
        break;
      default:
        // Keep original if no translation available
        break;
    }
    
    newLyric.wordFocus = updatedWordFocus;
    return newLyric;
  });
  
  return translatedLyrics;
}

// Helper functions to provide translated text
function getSpanishText(lyricId: string): string {
  // Mock translations to Spanish
  const translations: Record<string, string> = {
    '1-1': 'Sí, sabes que ya llevo un rato mirándote',
    '1-2': 'Tengo que bailar contigo hoy',
    '1-3': 'Vi que tu mirada ya estaba llamándome',
    '2-1': 'Ojos que hacen bajar los míos',
    '2-2': 'Una risa que se pierde en su boca',
    '2-3': 'Este es el retrato sin retocar',
    '3-1': '¿Tienes algo de tiempo para mí?',
    '3-2': 'Entonces cantaré una canción para ti',
    '3-3': 'De 99 globos en su camino hacia el horizonte',
    '4-1': 'Esta es la primera línea de la canción',
    '4-2': 'Esta es la segunda línea de la canción',
    '4-3': 'Esta es la tercera línea de la canción',
  };
  
  return translations[lyricId] || 'Texto en español no disponible';
}

function getFrenchText(lyricId: string): string {
  // Mock translations to French
  const translations: Record<string, string> = {
    '1-1': 'Oui, tu sais que je te regarde depuis un moment',
    '1-2': 'Je dois danser avec toi aujourd\'hui',
    '1-3': 'J\'ai vu que ton regard m\'appelait déjà',
    '2-1': 'Des yeux qui font baisser les miens',
    '2-2': 'Un rire qui se perd sur sa bouche',
    '2-3': 'Voilà le portrait sans retouche',
    '3-1': 'As-tu un peu de temps pour moi',
    '3-2': 'Alors je chanterai une chanson pour toi',
    '3-3': 'De 99 ballons sur leur chemin vers l\'horizon',
    '4-1': 'Voici la première ligne de la chanson',
    '4-2': 'Voici la deuxième ligne de la chanson',
    '4-3': 'Voici la troisième ligne de la chanson',
  };
  
  return translations[lyricId] || 'Texte français non disponible';
}

function getGermanText(lyricId: string): string {
  // Mock translations to German
  const translations: Record<string, string> = {
    '1-1': 'Ja, du weißt, dass ich dich schon eine Weile anschaue',
    '1-2': 'Ich muss heute mit dir tanzen',
    '1-3': 'Ich sah, dass dein Blick mich schon rief',
    '2-1': 'Augen, die meine senken lassen',
    '2-2': 'Ein Lachen, das sich auf seinem Mund verliert',
    '2-3': 'Das ist das Porträt ohne Retusche',
    '3-1': 'Hast du etwas Zeit für mich',
    '3-2': 'Dann singe ich ein Lied für dich',
    '3-3': 'Von 99 Luftballons auf ihrem Weg zum Horizont',
    '4-1': 'Dies ist die erste Zeile des Liedes',
    '4-2': 'Dies ist die zweite Zeile des Liedes',
    '4-3': 'Dies ist die dritte Zeile des Liedes',
  };
  
  return translations[lyricId] || 'Deutscher Text nicht verfügbar';
}

function getItalianText(lyricId: string): string {
  // Mock translations to Italian
  const translations: Record<string, string> = {
    '1-1': 'Sì, sai che ti sto guardando da un po\'',
    '1-2': 'Devo ballare con te oggi',
    '1-3': 'Ho visto che il tuo sguardo mi stava già chiamando',
    '2-1': 'Occhi che fanno abbassare i miei',
    '2-2': 'Una risata che si perde sulla sua bocca',
    '2-3': 'Ecco il ritratto senza ritocchi',
    '3-1': 'Hai un po\' di tempo per me',
    '3-2': 'Allora canterò una canzone per te',
    '3-3': 'Di 99 palloncini sulla loro strada verso l\'orizzonte',
    '4-1': 'Questa è la prima riga della canzone',
    '4-2': 'Questa è la seconda riga della canzone',
    '4-3': 'Questa è la terza riga della canzone',
  };
  
  return translations[lyricId] || 'Testo italiano non disponibile';
}

function getTranslationForWord(word: string, targetCode: string): string {
  // Mock word translations to different languages
  const wordTranslations: Record<string, Record<string, string>> = {
    'mirándote': { 'en': 'looking at you', 'fr': 'te regardant', 'de': 'dich anschauend', 'it': 'guardandoti' },
    'bailar': { 'en': 'dance', 'fr': 'danser', 'de': 'tanzen', 'it': 'ballare' },
    'mirada': { 'en': 'gaze', 'fr': 'regard', 'de': 'Blick', 'it': 'sguardo' },
    'yeux': { 'en': 'eyes', 'es': 'ojos', 'de': 'Augen', 'it': 'occhi' },
    'rire': { 'en': 'laugh', 'es': 'risa', 'de': 'Lachen', 'it': 'risata' },
    'retouche': { 'en': 'retouching', 'es': 'retoque', 'de': 'Retusche', 'it': 'ritocco' },
    'Zeit': { 'en': 'time', 'es': 'tiempo', 'fr': 'temps', 'it': 'tempo' },
    'singe': { 'en': 'sing', 'es': 'canto', 'fr': 'chante', 'it': 'canto' },
    'Luftballons': { 'en': 'air balloons', 'es': 'globos', 'fr': 'ballons', 'it': 'palloncini' },
    'first': { 'es': 'primero', 'fr': 'premier', 'de': 'erste', 'it': 'primo' },
    'second': { 'es': 'segundo', 'fr': 'deuxième', 'de': 'zweite', 'it': 'secondo' },
    'third': { 'es': 'tercero', 'fr': 'troisième', 'de': 'dritte', 'it': 'terzo' },
  };
  
  return wordTranslations[word]?.[targetCode] || word;
}
