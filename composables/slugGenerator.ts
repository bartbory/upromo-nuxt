export default function slugGenerator(name: string) {
  const slug: string = name
    .toLowerCase()
    .replaceAll(new RegExp(/[\s.]/g), "-")
    .replaceAll(new RegExp(/[àáâãäåą]/g), "a")
    .replaceAll(new RegExp(/[ḃḅḇƀɓꞗᵬᶀ]/g), "b")
    .replaceAll(new RegExp(/æ/g), "ae")
    .replaceAll(new RegExp(/[ćĉčċḉƈc̈ȼç]/g), "c")
    .replaceAll(new RegExp(/[đɗḋḍḑḓďḏ]/g), "d")
    .replaceAll(new RegExp(/[éèĕêếềễểê̄ê̌ěëẽėė́ė̃ȩḝęę́ę̃ēḗḕẻȅe̋ȇẹệḙḛɇe̩è̩é̩ᶒⱸꬴꬳ]/g), "e")
    .replaceAll(new RegExp(/[ịĭîǐɨïḯíìȉįĮ̃īī̀ᶖỉȋĩḭ]/g), "i")
    .replaceAll(new RegExp(/[ĺľļḷḹl̃ḽḻłŀƚꝉⱡɫɬꞎ]/g), "l")
    .replaceAll(new RegExp(/[ńǹňñṅņṇṋṉn̈ɲŋ]/g), "n")
    .replaceAll(
      new RegExp(/[óòŏôốồỗổǒöȫőõṍṏȭȯo͘ȱøǿǫǭōṓṑỏȍȏơớờỡởợọộo̩ò̩ó̩ɵꝋꝍⱺ]/g),
      "o"
    )
    .replaceAll(new RegExp(/[śṥŝšṧs̈ṡşṣṩșs̩]/g), "s")
    .replaceAll(new RegExp(/[ťṫţṭțṱṯŧⱦƭʈẗᵵƫ]/g), "t")
    .replaceAll(new RegExp(/[ŭʉụüǜǘǚǖṳúùûṷǔȗűŭưứừửựỮủūū̀ū́ṻū̃ũṹṵųų́ų̃ȕů]/g), "u")
    .replaceAll(new RegExp(/[źẑžżẓẕƶ]/g), "z");

  return slug;
}
