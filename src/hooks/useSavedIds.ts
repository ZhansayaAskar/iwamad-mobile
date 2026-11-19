import { useState, useEffect } from 'react';
import { loadSavedIds, storeSavedIds } from '../lib/savedStorage';

export function useSavedIds() {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    loadSavedIds().then(setSavedIds);
  }, []);

  const toggleSaved = (id: number) => {
    const isSaved = savedIds.includes(id);
    const next = isSaved
      ? savedIds.filter((savedId) => savedId !== id)
      : [...savedIds, id];
    
    setSavedIds(next);
    storeSavedIds(next);
  };

  return { savedIds, toggleSaved };
}