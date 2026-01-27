export type RankingItem = { label: string; href?: string };

// 5件固定にしたいなら「satisfies」で型チェックも可
export const areaItems = [
  { label: "プロンポン", href: "/areas/setagaya" },
  { label: "トンロー",   href: "/areas/ota" },
  { label: "エカマイ",   href: "/areas/adachi" },
  { label: "アソーク",   href: "/areas/nerima" },
  { label: "プラカノン", href: "/areas/edogawa" },
] satisfies RankingItem[];

export const stationItems = [
  { label: "プロムポン駅",   href: "/stations/tachikawa" },
  { label: "トンロー駅",   href: "/stations/ogikubo" },
  { label: "アソーク駅",   href: "/stations/mitaka" },
  { label: "エカマイ駅", href: "/stations/minamiurawa" },
  { label: "アリ駅", href: "/stations/kichijoji" },
] satisfies RankingItem[];

export const lineItems = [
  { label: "JR中央本線",         href: "/lines/jr-chuo" },
  { label: "京王本線",           href: "/lines/keio" },
  { label: "JR山手線",           href: "/lines/jr-yamanote" },
  { label: "JR総武・中央緩行線", href: "/lines/jr-sobu-chuo" },
  { label: "東急東横線",         href: "/lines/tokyu-toyoko" },
] satisfies RankingItem[];