
import { Song, Lyric, WordFocus, PracticeExercise } from "@/types";

/**
 * Generate sample lyrics based on the song and its language
 */
export const generateLyrics = (song: Song): Lyric[] => {
  console.log(`Generating lyrics for "${song.title}" in ${song.language.name}`);
  
  // Define base lyrics for different songs
  const songSpecificLyrics: { [key: string]: Lyric[] } = {
    // Despacito lyrics
    "Despacito": [
      {
        id: "1",
        songId: song.id,
        startTime: 15,
        endTime: 18,
        text: "Sí, sabes que ya llevo un rato mirándote",
        translation: "Yes, you know I've been looking at you for a while",
        wordFocus: [
          {
            id: "1",
            word: "sabes",
            translation: "you know",
            definition: "To have information in your mind",
            examples: ["¿Sabes la respuesta?", "Sabes que te quiero."]
          },
          {
            id: "2",
            word: "mirándote",
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
        text: "Tengo que bailar contigo hoy",
        translation: "I have to dance with you today",
        wordFocus: [
          {
            id: "3",
            word: "Tengo",
            translation: "I have to",
            definition: "To be obliged to do something",
            examples: ["Tengo un coche.", "Tengo que ir."]
          },
          {
            id: "4",
            word: "bailar",
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
        text: "Vi que tu mirada ya estaba llamándome",
        translation: "I saw that your look was already calling me",
        wordFocus: [
          {
            id: "6",
            word: "mirada",
            translation: "look/gaze",
            definition: "A particular expression in someone's eyes",
            examples: ["Su mirada era intensa.", "Una mirada puede decir mucho."]
          },
          {
            id: "7",
            word: "llamándome",
            translation: "calling me",
            definition: "To cry out to someone",
            examples: ["Está llamándome por teléfono.", "Siento que estás llamándome."]
          }
        ]
      },
      {
        id: "4",
        songId: song.id,
        startTime: 27,
        endTime: 30,
        text: "Muéstrame el camino que yo voy",
        translation: "Show me the way I'm going",
        wordFocus: [
          {
            id: "8",
            word: "Muéstrame",
            translation: "Show me",
            definition: "To display or point out something to someone",
            examples: ["Muéstrame tu casa.", "¿Puedes mostrarme el camino?"]
          },
          {
            id: "9",
            word: "camino",
            translation: "way/path",
            definition: "A track or road that leads somewhere",
            examples: ["Este es el camino correcto.", "Vamos por este camino."]
          }
        ]
      }
    ],
    
    // La Vie En Rose lyrics
    "La Vie En Rose": [
      {
        id: "1",
        songId: song.id,
        startTime: 12,
        endTime: 15,
        text: "Des yeux qui font baisser les miens",
        translation: "Eyes that make mine look down",
        wordFocus: [
          {
            id: "1",
            word: "yeux",
            translation: "eyes",
            definition: "The organs of sight",
            examples: ["Ses yeux sont bleus.", "Ferme tes yeux."]
          },
          {
            id: "2",
            word: "baisser",
            translation: "to lower/look down",
            definition: "To move something to a lower position",
            examples: ["Baissez le volume.", "Il a baissé la tête."]
          }
        ]
      },
      {
        id: "2",
        songId: song.id,
        startTime: 16,
        endTime: 19,
        text: "Un rire qui se perd sur sa bouche",
        translation: "A laugh that gets lost on his lips",
        wordFocus: [
          {
            id: "3",
            word: "rire",
            translation: "laugh",
            definition: "The action or sound of laughing",
            examples: ["Son rire est contagieux.", "J'aime ton rire."]
          },
          {
            id: "4",
            word: "bouche",
            translation: "mouth/lips",
            definition: "The opening in the face through which food is taken",
            examples: ["Ouvre la bouche.", "Elle a mis du rouge à lèvres sur sa bouche."]
          }
        ]
      },
      {
        id: "3",
        songId: song.id,
        startTime: 20,
        endTime: 23,
        text: "Voilà le portrait sans retouche",
        translation: "This is the unretouched portrait",
        wordFocus: [
          {
            id: "5",
            word: "portrait",
            translation: "portrait",
            definition: "A painting, drawing, or photograph of a person",
            examples: ["C'est un beau portrait.", "L'artiste a peint son portrait."]
          },
          {
            id: "6",
            word: "retouche",
            translation: "retouching/editing",
            definition: "A small change made to improve something",
            examples: ["Cette photo a besoin de retouches.", "Sans retouche, c'est plus naturel."]
          }
        ]
      }
    ],
    
    // 99 Luftballons lyrics
    "99 Luftballons": [
      {
        id: "1",
        songId: song.id,
        startTime: 10,
        endTime: 14,
        text: "Hast du etwas Zeit für mich",
        translation: "Do you have some time for me",
        wordFocus: [
          {
            id: "1",
            word: "Zeit",
            translation: "time",
            definition: "The indefinite continued progress of existence",
            examples: ["Ich habe keine Zeit.", "Zeit ist Geld."]
          },
          {
            id: "2",
            word: "für mich",
            translation: "for me",
            definition: "Indicating the recipient of an action",
            examples: ["Das ist für mich.", "Machst du das für mich?"]
          }
        ]
      },
      {
        id: "2",
        songId: song.id,
        startTime: 15,
        endTime: 18,
        text: "Dann singe ich ein Lied für dich",
        translation: "Then I'll sing a song for you",
        wordFocus: [
          {
            id: "3",
            word: "singe",
            translation: "sing",
            definition: "To make musical sounds with the voice",
            examples: ["Ich singe gerne.", "Sie singt in einem Chor."]
          },
          {
            id: "4",
            word: "Lied",
            translation: "song",
            definition: "A short poem or musical piece",
            examples: ["Das ist mein Lieblingslied.", "Er schreibt ein neues Lied."]
          }
        ]
      },
      {
        id: "3",
        songId: song.id,
        startTime: 19,
        endTime: 23,
        text: "Von neunundneunzig Luftballons",
        translation: "About ninety-nine balloons",
        wordFocus: [
          {
            id: "5",
            word: "neunundneunzig",
            translation: "ninety-nine",
            definition: "The number 99",
            examples: ["Ich habe neunundneunzig Probleme.", "Neunundneunzig ist fast hundert."]
          },
          {
            id: "6",
            word: "Luftballons",
            translation: "balloons",
            definition: "Inflated rubber sacs used as toys or decorations",
            examples: ["Die Kinder spielen mit Luftballons.", "Wir brauchen mehr Luftballons für die Party."]
          }
        ]
      }
    ]
  };
  
  // Try to find song-specific lyrics
  for (const songName in songSpecificLyrics) {
    if (song.title.includes(songName)) {
      console.log(`Found specific lyrics for "${songName}"`);
      return songSpecificLyrics[songName];
    }
  }
  
  // If no specific lyrics found, generate generic lyrics based on language
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
  console.log(`Generating exercises for "${song.title}" in ${song.language.name}`);
  
  // Define song-specific exercises
  const songSpecificExercises: { [key: string]: PracticeExercise[] } = {
    // Despacito exercises
    "Despacito": [
      {
        id: "1",
        type: "multiple-choice",
        question: "In the song Despacito, what does the phrase 'Despacito' mean?",
        options: ["Slowly", "Quickly", "Loudly", "Softly"],
        correctAnswer: "Slowly",
        songId: song.id
      },
      {
        id: "2",
        type: "fill-in-blank",
        question: "Complete this lyric from Despacito: 'Quiero respirar tu cuello _________'",
        correctAnswer: "despacito",
        hint: "It's the title of the song",
        songId: song.id
      },
      {
        id: "3",
        type: "multiple-choice",
        question: "Which phrase appears in the chorus of Despacito?",
        options: [
          "Pasito a pasito, suave suavecito",
          "Vamos a bailar esta noche",
          "Yo te quiero ver",
          "Mira mi corazón"
        ],
        correctAnswer: "Pasito a pasito, suave suavecito",
        songId: song.id
      },
      {
        id: "4",
        type: "listening",
        question: "Listen to this clip from the song and identify what Luis Fonsi is saying:",
        options: [
          "The chorus",
          "The first verse",
          "A love declaration",
          "The bridge section"
        ],
        correctAnswer: "The first verse",
        songId: song.id
      },
      {
        id: "5",
        type: "speaking",
        question: "Try to pronounce this phrase from Despacito: 'Quiero ver bailar tu pelo'",
        correctAnswer: "Quiero ver bailar tu pelo",
        hint: "Focus on the 'r' sound in 'Quiero' and the 'l' sound in 'bailar' and 'pelo'",
        songId: song.id
      },
      {
        id: "6",
        type: "multiple-choice",
        question: "What common Spanish verb conjugation is demonstrated in 'Quiero ver bailar tu pelo'?",
        options: [
          "Present tense first person singular (yo)",
          "Past tense third person (él/ella)",
          "Imperative form",
          "Future tense"
        ],
        correctAnswer: "Present tense first person singular (yo)",
        songId: song.id
      },
      {
        id: "7",
        type: "fill-in-blank",
        question: "In Spanish, the word for 'slowly' is __________.",
        correctAnswer: "despacito",
        hint: "It's the title of this famous song",
        songId: song.id
      },
      {
        id: "8",
        type: "multiple-choice",
        question: "Which of these expressions would you use to say 'I want to dance with you' in Spanish?",
        options: [
          "Quiero bailar contigo",
          "Me gusta la música",
          "¿Dónde está la fiesta?",
          "Tengo que irme"
        ],
        correctAnswer: "Quiero bailar contigo",
        songId: song.id
      }
    ],
    
    // La Vie En Rose exercises
    "La Vie En Rose": [
      {
        id: "1",
        type: "multiple-choice",
        question: "What does 'La Vie En Rose' translate to in English?",
        options: ["Life in Pink", "The Pink Rose", "Rosy Life", "Pink View"],
        correctAnswer: "Life in Pink",
        songId: song.id
      },
      {
        id: "2",
        type: "fill-in-blank",
        question: "Complete this lyric from La Vie En Rose: 'Des yeux qui font baisser les ______'",
        correctAnswer: "miens",
        hint: "It refers to 'mine' (my eyes)",
        songId: song.id
      },
      {
        id: "3",
        type: "multiple-choice",
        question: "In French, what does 'yeux' mean?",
        options: ["Eyes", "Yours", "Heart", "Soul"],
        correctAnswer: "Eyes",
        songId: song.id
      },
      {
        id: "4",
        type: "listening",
        question: "Listen to this clip from La Vie En Rose and identify what Edith Piaf is singing about:",
        options: [
          "Her lover's eyes",
          "A beautiful garden",
          "The city of Paris",
          "Her childhood"
        ],
        correctAnswer: "Her lover's eyes",
        songId: song.id
      },
      {
        id: "5",
        type: "speaking",
        question: "Try to pronounce this phrase from La Vie En Rose: 'Quand il me prend dans ses bras'",
        correctAnswer: "Quand il me prend dans ses bras",
        hint: "Focus on the nasal sounds in 'Quand' and 'dans'",
        songId: song.id
      },
      {
        id: "6",
        type: "multiple-choice",
        question: "Which French expression from La Vie En Rose means 'he speaks words of love to me'?",
        options: [
          "Il me dit des mots d'amour",
          "Il me parle tout bas",
          "Des nuits d'amour à plus finir",
          "Mon cœur qui bat"
        ],
        correctAnswer: "Il me dit des mots d'amour",
        songId: song.id
      }
    ],
    
    // 99 Luftballons exercises
    "99 Luftballons": [
      {
        id: "1",
        type: "multiple-choice",
        question: "What is the meaning of 'Luftballons' in English?",
        options: ["Balloons", "Airplanes", "Clouds", "Satellites"],
        correctAnswer: "Balloons",
        songId: song.id
      },
      {
        id: "2",
        type: "fill-in-blank",
        question: "Complete this lyric from 99 Luftballons: 'Hast du etwas _____ für mich'",
        correctAnswer: "Zeit",
        hint: "It means 'time' in English",
        songId: song.id
      },
      {
        id: "3",
        type: "multiple-choice",
        question: "What theme does the song 99 Luftballons primarily address?",
        options: [
          "Cold War tensions and nuclear war fears",
          "Childhood memories and nostalgia",
          "Romantic relationships",
          "Environmental pollution"
        ],
        correctAnswer: "Cold War tensions and nuclear war fears",
        songId: song.id
      },
      {
        id: "4",
        type: "listening",
        question: "Listen to this clip from 99 Luftballons and identify what Nena is singing about:",
        options: [
          "Releasing balloons into the sky",
          "Military misunderstanding the balloons",
          "A birthday celebration",
          "Flying in an airplane"
        ],
        correctAnswer: "Releasing balloons into the sky",
        songId: song.id
      },
      {
        id: "5",
        type: "speaking",
        question: "Try to pronounce this phrase from 99 Luftballons: 'Neunundneunzig Luftballons'",
        correctAnswer: "Neunundneunzig Luftballons",
        hint: "Focus on the 'eu' sound in 'Neun' and the 'ons' sound at the end",
        songId: song.id
      }
    ]
  };
  
  // Check if we have specific exercises for this song
  for (const songName in songSpecificExercises) {
    if (song.title.includes(songName)) {
      console.log(`Found specific exercises for "${songName}"`);
      return songSpecificExercises[songName];
    }
  }
  
  // If no specific exercises are found, generate generic ones based on the song's language
  // Map language name to native phrase
  const getCommonPhrases = (code: string) => {
    const phrases: Record<string, string[]> = {
      "es": ["Hola, ¿cómo estás?", "Me gusta esta canción", "¿Quieres bailar conmigo?"],
      "fr": ["Bonjour, comment ça va?", "J'aime cette chanson", "Veux-tu danser avec moi?"],
      "de": ["Hallo, wie geht es dir?", "Ich mag dieses Lied", "Willst du mit mir tanzen?"],
      "it": ["Ciao, come stai?", "Mi piace questa canzone", "Vuoi ballare con me?"],
      "ko": ["안녕, 어떻게 지내?", "난 이 노래가 좋아", "나랑 춤출래?"],
      "ja": ["こんにちは、お元気ですか？", "この曲が好きです", "私と踊りませんか？"],
      "pt": ["Olá, como você está?", "Eu gosto desta música", "Quer dançar comigo?"],
      "ru": ["Привет, как дела?", "Мне нравится эта песня", "Хочешь потанцевать со мной?"],
      "zh": ["你好，你好吗？", "我喜欢这首歌", "想和我跳舞吗？"],
      "ar": ["مرحبا كيف حالك؟", "أنا أحب هذه الأغنية", "هل تريد الرقص معي؟"],
      "nl": ["Hallo, hoe gaat het?", "Ik hou van dit lied", "Wil je met me dansen?"],
      "sv": ["Hej, hur mår du?", "Jag gillar den här låten", "Vill du dansa med mig?"]
    };
    
    return phrases[code] || ["Hello, how are you?", "I like this song", "Would you like to dance with me?"];
  };
  
  // Cultural vocabulary related to music in each language
  const getMusicVocabulary = (code: string) => {
    const vocab: Record<string, {word: string, translation: string}[]> = {
      "es": [
        { word: "ritmo", translation: "rhythm" },
        { word: "baile", translation: "dance" },
        { word: "cantante", translation: "singer" }
      ],
      "fr": [
        { word: "rythme", translation: "rhythm" },
        { word: "danse", translation: "dance" },
        { word: "chanteur", translation: "singer" }
      ],
      "de": [
        { word: "Rhythmus", translation: "rhythm" },
        { word: "Tanz", translation: "dance" },
        { word: "Sänger", translation: "singer" }
      ],
      "it": [
        { word: "ritmo", translation: "rhythm" },
        { word: "ballo", translation: "dance" },
        { word: "cantante", translation: "singer" }
      ],
      "ko": [
        { word: "리듬", translation: "rhythm" },
        { word: "춤", translation: "dance" },
        { word: "가수", translation: "singer" }
      ],
      "ja": [
        { word: "リズム", translation: "rhythm" },
        { word: "ダンス", translation: "dance" },
        { word: "歌手", translation: "singer" }
      ],
      "pt": [
        { word: "ritmo", translation: "rhythm" },
        { word: "dança", translation: "dance" },
        { word: "cantor", translation: "singer" }
      ],
      "ru": [
        { word: "ритм", translation: "rhythm" },
        { word: "танец", translation: "dance" },
        { word: "певец", translation: "singer" }
      ]
    };
    
    return vocab[code] || [{ word: "rhythm", translation: "rhythm" }];
  };

  // Generate language-specific exercises based on the song
  const phrases = getCommonPhrases(song.language.code);
  const musicVocab = getMusicVocabulary(song.language.code);
  
  console.log(`Generating generic exercises for ${song.language.name} language`);
  
  // Enhanced exercise set with more engaging content
  const mockExercises: PracticeExercise[] = [
    {
      id: "1",
      type: "multiple-choice",
      question: `Which of these phrases means "I like listening to music" in ${song.language.name}?`,
      options: [
        song.language.code === "es" ? "Me gusta escuchar música" : 
        song.language.code === "fr" ? "J'aime écouter de la musique" :
        song.language.code === "de" ? "Ich höre gerne Musik" :
        song.language.code === "it" ? "Mi piace ascoltare la musica" :
        song.language.code === "ko" ? "음악 듣는 것을 좋아해요" :
        song.language.code === "ja" ? "音楽を聴くのが好きです" :
        song.language.code === "pt" ? "Eu gosto de ouvir música" :
        song.language.code === "ru" ? "Я люблю слушать музыку" :
        "I like listening to music",
        
        "I don't like this song",
        "Where is the concert?",
        "What time is it?"
      ],
      correctAnswer: song.language.code === "es" ? "Me gusta escuchar música" : 
                    song.language.code === "fr" ? "J'aime écouter de la musique" :
                    song.language.code === "de" ? "Ich höre gerne Musik" :
                    song.language.code === "it" ? "Mi piace ascoltare la musica" :
                    song.language.code === "ko" ? "음악 듣는 것을 좋아해요" :
                    song.language.code === "ja" ? "音楽を聴くのが好きです" :
                    song.language.code === "pt" ? "Eu gosto de ouvir música" :
                    song.language.code === "ru" ? "Я люблю слушать музыку" :
                    "I like listening to music",
      songId: song.id
    },
    {
      id: "2",
      type: "fill-in-blank",
      question: `Complete this popular phrase in ${song.language.name}: "${phrases[0].split(',')[0]}, ________"`,
      correctAnswer: phrases[0].split(',')[1]?.trim() || phrases[0].split(' ')[1] || phrases[0],
      hint: "It's a common greeting",
      songId: song.id
    },
    {
      id: "3",
      type: "multiple-choice",
      question: `What does "${musicVocab[0]?.word || 'rhythm'}" mean in ${song.language.name}?`,
      options: [
        musicVocab[0]?.translation || "rhythm",
        "melody",
        "lyrics",
        "beat"
      ],
      correctAnswer: musicVocab[0]?.translation || "rhythm",
      songId: song.id
    },
    {
      id: "4",
      type: "listening",
      question: `Listen to this clip from "${song.title}" and identify what the artist is saying:`,
      options: [
        "The chorus",
        "The first verse",
        "A love declaration",
        "A farewell message"
      ],
      correctAnswer: "The first verse",
      songId: song.id
    },
    {
      id: "5",
      type: "speaking",
      question: `Try to pronounce this phrase from the song: "${phrases[2]}"`,
      correctAnswer: phrases[2],
      hint: "Listen to the audio sample first and then try to mimic the pronunciation",
      songId: song.id
    },
    {
      id: "6",
      type: "multiple-choice",
      question: `Which of the following words would you use to describe ${song.artist}'s music style?`,
      options: [
        "Rhythmic",
        "Classical",
        "Folk",
        "All of the above"
      ],
      correctAnswer: "Rhythmic",
      songId: song.id
    },
    {
      id: "7",
      type: "fill-in-blank",
      question: `In the ${song.language.name} music scene, the word for "dance" is __________.`,
      correctAnswer: musicVocab[1]?.word || "dance",
      hint: "It's a common activity associated with music",
      songId: song.id
    },
    {
      id: "8",
      type: "multiple-choice",
      question: `Which of these expressions would you use to say "This song is amazing!" in ${song.language.name}?`,
      options: [
        song.language.code === "es" ? "¡Esta canción es increíble!" : 
        song.language.code === "fr" ? "Cette chanson est incroyable !" :
        song.language.code === "de" ? "Dieses Lied ist unglaublich!" :
        song.language.code === "it" ? "Questa canzone è incredibile!" :
        song.language.code === "ko" ? "이 노래는 놀라워요!" :
        song.language.code === "ja" ? "この曲は素晴らしいです！" :
        song.language.code === "pt" ? "Esta música é incrível!" :
        song.language.code === "ru" ? "Эта песня потрясающая!" :
        "This song is amazing!",
        
        "The music is too loud",
        "I don't understand the lyrics",
        "When does the concert start?"
      ],
      correctAnswer: song.language.code === "es" ? "¡Esta canción es increíble!" : 
                    song.language.code === "fr" ? "Cette chanson est incroyable !" :
                    song.language.code === "de" ? "Dieses Lied ist unglaublich!" :
                    song.language.code === "it" ? "Questa canzone è incredibile!" :
                    song.language.code === "ko" ? "이 노래는 놀라워요!" :
                    song.language.code === "ja" ? "この曲は素晴らしいです！" :
                    song.language.code === "pt" ? "Esta música é incrível!" :
                    song.language.code === "ru" ? "Эта песня потрясающая!" :
                    "This song is amazing!",
      songId: song.id
    }
  ];
  
  return mockExercises;
};
