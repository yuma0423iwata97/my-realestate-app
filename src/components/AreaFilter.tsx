// src/components/AreaFilter.tsx
import { redirect } from 'next/navigation';

const TYPES = ['AIR','CHA','ONN','SIAM','SUK','TA','TB'] as const;
type Area = (typeof TYPES)[number];

export function applyAreaFilter(
  nextArea: Area | null | undefined,
  currentSearchParams: Record<string, string | string[] | undefined>,
  basePath: string = ''
) {
  // 先頭スラッシュを強制
  const path = basePath && basePath.startsWith('/') ? basePath : `/${basePath ?? ''}`;

  // 現在のQS
  const spCurrent = new URLSearchParams();
  for (const [k, v] of Object.entries(currentSearchParams ?? {})) {
    if (typeof v === 'string') spCurrent.set(k, v);
    else if (Array.isArray(v)) v.forEach((vv) => spCurrent.append(k, vv));
  }

  // 変更後QS（まずは現在値をコピー）
  const spTarget = new URLSearchParams(spCurrent);

  // 駅フィルタ有無
  const rawStation = currentSearchParams?.station;
  const hasStation =
    typeof rawStation === 'string'
      ? rawStation.trim().length > 0
      : Array.isArray(rawStation)
        ? rawStation.some((s) => String(s ?? '').trim().length > 0)
        : false;

  if (hasStation) {
    // 駅指定時は area を必ず消す
    spTarget.delete('area');
  } else if (nextArea && TYPES.includes(nextArea)) {
    // 駅が無い時のみ area を固定
    spTarget.set('area', nextArea);
  } else {
    spTarget.delete('area');
  }

  // ここがポイント：URLが変わらないなら redirect しない
  const currentHref = spCurrent.toString() ? `${path}?${spCurrent.toString()}` : path;
  const targetHref  = spTarget.toString()  ? `${path}?${spTarget.toString()}`  : path;
  if (currentHref === targetHref) return;

  redirect(targetHref);
}
