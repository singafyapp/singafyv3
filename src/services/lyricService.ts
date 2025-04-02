
import { Song, Lyric, WordFocus, PracticeExercise } from "@/types";

/**
 * Generate sample lyrics based on the song and its language
 */
export const generateLyrics = (song: Song): Lyric[] => {
  // In a real app, these would come from an API or database
  const sampleLyrics: Lyric[] = [
    {
      id: "1",
      songId: song.id,
      startTime: 15,
      endTime: 18,
      text: song.language.code === "es" ? "Sí, sabes que ya llevo un rato mirándote" : 
            song.language.code === "fr" ? "Oui, tu sais que je te regarde depuis un moment" :
            song.language.code === "de" ? "Ja, du weißt, ich schaue dich schon eine Weile an" :
            song.language.code === "it" ? "Sì, sai che ti guardo da un po'" :
            song.language.code === "ko" ? "네, 내가 한동안 너를 바라보고 있다는 걸 알지" :
            song.language.code === "ja" ? "はい、しばらく見ていたのを知っていますね" :
            song.language.code === "pt" ? "Sim, você sabe que estou te observando há um tempo" :
            song.language.code === "ru" ? "Да, ты знаешь, что я смотрю на тебя уже некоторое время" :
            "Yes, you know I've been looking at you for a while",
      translation: "Yes, you know I've been looking at you for a while",
      wordFocus: [
        {
          id: "1",
          word: song.language.code === "es" ? "sabes" : 
                song.language.code === "fr" ? "sais" :
                song.language.code === "de" ? "weißt" : 
                song.language.code === "it" ? "sai" :
                song.language.code === "ko" ? "알지" :
                song.language.code === "ja" ? "知っています" :
                song.language.code === "pt" ? "sabe" :
                song.language.code === "ru" ? "знаешь" : "know",
          translation: "you know",
          definition: "To have information in your mind",
          examples: ["¿Sabes la respuesta?", "Sabes que te quiero."]
        },
        {
          id: "2",
          word: song.language.code === "es" ? "mirándote" : 
                song.language.code === "fr" ? "regarde" :
                song.language.code === "de" ? "schaue" : 
                song.language.code === "it" ? "guardo" :
                song.language.code === "ko" ? "바라보고" :
                song.language.code === "ja" ? "見ています" :
                song.language.code === "pt" ? "observando" :
                song.language.code === "ru" ? "смотрю" : "looking",
          translation: "looking at you",
          definition: "To direct your eyes in order to see",
          examples: ["Estoy mirándote.", "Él está mirándote desde lejos."]
        }
      ]
    },
    {
      id: "2",
      songId: song.id,
      startTime: 19,
      endTime: 22,
      text: song.language.code === "es" ? "Tengo que bailar contigo hoy" : 
            song.language.code === "fr" ? "Je dois danser avec toi aujourd'hui" :
            song.language.code === "de" ? "Ich muss heute mit dir tanzen" :
            song.language.code === "it" ? "Devo ballare con te oggi" :
            song.language.code === "ko" ? "오늘 너와 춤을 춰야 해" :
            song.language.code === "ja" ? "今日はあなたと踊らなければなりません" :
            song.language.code === "pt" ? "Tenho que dançar com você hoje" :
            song.language.code === "ru" ? "Я должен танцевать с тобой сегодня" :
            "I have to dance with you today",
      translation: "I have to dance with you today",
      wordFocus: [
        {
          id: "3",
          word: song.language.code === "es" ? "Tengo" : 
                song.language.code === "fr" ? "dois" :
                song.language.code === "de" ? "muss" :
                song.language.code === "it" ? "Devo" :
                song.language.code === "ko" ? "해야" :
                song.language.code === "ja" ? "なければなりません" :
                song.language.code === "pt" ? "Tenho" :
                song.language.code === "ru" ? "должен" : "have",
          translation: "I have to",
          definition: "To be obliged to do something",
          examples: ["Tengo un coche.", "Tengo que ir."]
        },
        {
          id: "4",
          word: song.language.code === "es" ? "bailar" : 
                song.language.code === "fr" ? "danser" :
                song.language.code === "de" ? "tanzen" :
                song.language.code === "it" ? "ballare" :
                song.language.code === "ko" ? "춤을" :
                song.language.code === "ja" ? "踊ら" :
                song.language.code === "pt" ? "dançar" :
                song.language.code === "ru" ? "танцевать" : "dance",
          translation: "to dance",
          definition: "To move rhythmically to music",
          examples: ["Me gusta bailar.", "¿Quieres bailar conmigo?"]
        }
      ]
    },
    {
      id: "3",
      songId: song.id,
      startTime: 23,
      endTime: 26,
      text: song.language.code === "es" ? "Vi que tu mirada ya estaba llamándome" : 
            song.language.code === "fr" ? "J'ai vu que ton regard m'appelait déjà" :
            song.language.code === "de" ? "Ich sah, dass dein Blick mich schon rief" :
            song.language.code === "it" ? "Ho visto che il tuo sguardo mi stava già chiamando" :
            song.language.code === "ko" ? "너의 눈빛이 이미 나를 부르고 있었어" :
            song.language.code === "ja" ? "あなたの視線がすでに私を呼んでいるのを見た" :
            song.language.code === "pt" ? "Vi que seu olhar já estava me chamando" :
            song.language.code === "ru" ? "Я увидел, что твой взгляд уже звал меня" :
            "I saw that your look was already calling me",
      translation: "I saw that your look was already calling me",
      wordFocus: [
        {
          id: "6",
          word: song.language.code === "es" ? "mirada" : 
                song.language.code === "fr" ? "regard" :
                song.language.code === "de" ? "Blick" :
                song.language.code === "it" ? "sguardo" :
                song.language.code === "ko" ? "눈빛" :
                song.language.code === "ja" ? "視線" :
                song.language.code === "pt" ? "olhar" :
                song.language.code === "ru" ? "взгляд" : "look",
          translation: "look/gaze",
          definition: "A particular expression in someone's eyes",
          examples: ["Su mirada era intensa.", "Una mirada puede decir mucho."]
        },
        {
          id: "7",
          word: song.language.code === "es" ? "llamándome" : 
                song.language.code === "fr" ? "m'appelait" :
                song.language.code === "de" ? "rief" :
                song.language.code === "it" ? "chiamando" :
                song.language.code === "ko" ? "부르고" :
                song.language.code === "ja" ? "呼んでいる" :
                song.language.code === "pt" ? "chamando" :
                song.language.code === "ru" ? "звал" : "calling",
          translation: "calling me",
          definition: "To cry out to someone",
          examples: ["Está llamándome por teléfono.", "Siento que estás llamándome."]
        }
      ]
    },
  ];
  
  return sampleLyrics;
};

/**
 * Generate practice exercises for a song
 */
export const generateExercises = (song: Song): PracticeExercise[] => {
  // In a real app, these would come from an API or database
  const mockExercises: PracticeExercise[] = [
    {
      id: "1",
      type: "multiple-choice",
      question: `What language is "${song.title}" by ${song.artist} in?`,
      options: ["English", song.language.name, "Italian", "French"].filter(lang => lang !== song.language.name).slice(0, 3).concat([song.language.name]),
      correctAnswer: song.language.name,
      songId: song.id
    },
    {
      id: "2",
      type: "fill-in-blank",
      question: `Complete this sentence: "${song.title}" was performed by _______.`,
      correctAnswer: song.artist,
      songId: song.id
    },
    {
      id: "3",
      type: "multiple-choice",
      question: `Which word would you likely hear in a ${song.language.name} song?`,
      options: [
        song.language.code === "es" ? "amor" : 
        song.language.code === "fr" ? "amour" :
        song.language.code === "de" ? "liebe" :
        song.language.code === "it" ? "amore" :
        song.language.code === "ko" ? "사랑" :
        song.language.code === "ja" ? "愛" :
        song.language.code === "pt" ? "amor" :
        song.language.code === "ru" ? "любовь" : "love",
        
        "computer",
        "weekend",
        "internet"
      ],
      correctAnswer: song.language.code === "es" ? "amor" : 
                    song.language.code === "fr" ? "amour" :
                    song.language.code === "de" ? "liebe" :
                    song.language.code === "it" ? "amore" :
                    song.language.code === "ko" ? "사랑" :
                    song.language.code === "ja" ? "愛" :
                    song.language.code === "pt" ? "amor" :
                    song.language.code === "ru" ? "любовь" : "love",
      songId: song.id
    },
    {
      id: "4",
      type: "listening",
      question: "Listen to the clip and select what you hear:",
      options: ["Phrase 1", "Phrase 2", "Phrase 3", "Phrase 4"],
      correctAnswer: "Phrase 2",
      songId: song.id
    },
    {
      id: "5",
      type: "speaking",
      question: "Repeat the following phrase:",
      correctAnswer: "Sample phrase in " + song.language.name,
      songId: song.id
    }
  ];
  
  return mockExercises;
};
