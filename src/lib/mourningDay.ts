const KAZAKHSTAN_UTC_OFFSET_MS = 5 * 60 * 60 * 1000; // UTC+5, fixed year-round

interface MourningPeriod {
  start: number;
  end: number;
}

function kzMidnight(year: number, monthIndex0: number, day: number): number {
  return Date.UTC(year, monthIndex0, day, 0, 0, 0) - KAZAKHSTAN_UTC_OFFSET_MS;
}

const MOURNING_PERIODS: MourningPeriod[] = [
  {
    start: kzMidnight(2026, 8, 25), 
    end: kzMidnight(2026, 8, 26), 
  },
];

export function isNationalMourningDayActive(date: Date = new Date()): boolean {
  const t = date.getTime();
  return MOURNING_PERIODS.some((p) => t >= p.start && t < p.end);
}

export const MOURNING_BANNER_TEXT: Record<'ru' | 'kz' | 'en', string> = {
  ru: '25 сентября 2026 года — День общенационального траура в Республике Казахстан',
  kz: '2026 жылғы 25 қыркүйек — Қазақстан Республикасында жалпыұлттық аза тұту күні',
  en: 'September 25, 2026 — National Day of Mourning in the Republic of Kazakhstan',
};

export const MOURNING_BANNER_LINK =
  'https://www.inform.kz/ru/25-sentyabrya-v-kazahstane-obyavlen-obshenatsionalniy-traur-1139d54a';
