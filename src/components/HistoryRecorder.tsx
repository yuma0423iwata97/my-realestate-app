"use client";

import { useEffect } from "react";
import { useHistory } from "@/context/HistoryContext";
import type { Property } from "@/components/Property";

export default function HistoryRecorder({ property }: { property: Property }) {
  const { addHistory } = useHistory();

  useEffect(() => {
    if (property) {
      addHistory(property);
    }
    // propertyが変わった時（別の物件ページに遷移した時）だけ実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property.ID]); 

  return null; // 画面には何も表示しない
}