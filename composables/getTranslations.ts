const translationsArray = [
  {
    id: 1,
    translations: [
      { lang: "en", translation: "Artist" },
      { lang: "pl", translation: "Artysta" },
      { lang: "de", translation: "Künstler" },
      { lang: "es", translation: "Artista" },
    ],
  },
  {
    id: 2,
    translations: [
      { lang: "en", translation: "Album" },
      { lang: "pl", translation: "Album" },
      { lang: "de", translation: "Album" },
      { lang: "es", translation: "Álbum" },
    ],
  },
  {
    id: 3,
    translations: [
      { lang: "en", translation: "Release" },
      { lang: "pl", translation: "Premiera" },
      { lang: "de", translation: "Premiere" },
      { lang: "es", translation: "Estreno" },
    ],
  },
  {
    id: 4,
    translations: [
      { lang: "en", translation: "Label" },
      { lang: "pl", translation: "Wydawnictwo" },
      { lang: "de", translation: "Verlag" },
      { lang: "es", translation: "Editorial" },
    ],
  },
  {
    id: 5,
    translations: [
      { lang: "en", translation: "Press note" },
      { lang: "pl", translation: "Notka prasowa" },
      { lang: "de", translation: "Pressenotiz" },
      { lang: "es", translation: "Nota de prensa" },
    ],
  },
  {
    id: 6,
    translations: [
      { lang: "en", translation: "Tour" },
      { lang: "pl", translation: "Trasa koncertowa" },
      { lang: "de", translation: "Eine Konzerttournee" },
      { lang: "es", translation: "Una gira de conciertos" },
    ],
  },
  {
    id: 7,
    translations: [
      { lang: "en", translation: "Promo materials" },
      { lang: "pl", translation: "Materialy promocyjne" },
      { lang: "de", translation: "Werbematerial" },
      { lang: "es", translation: "Materiales promocionales" },
    ],
  },
  {
    id: 8,
    translations: [
      { lang: "en", translation: "Management" },
      { lang: "pl", translation: "Opieka nad artystą" },
      { lang: "de", translation: "Kümmert sich um den Künstler" },
      { lang: "es", translation: "Cuidando al artista" },
    ],
  },
];

export default function getTranslations(id: number, language: string) {
  const word = translationsArray
    .find((w) => w.id === id)
    ?.translations.find((l) => l.lang === language.toLowerCase());
  return word?.translation;
}
