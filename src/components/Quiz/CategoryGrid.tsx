import React from 'react';
import { CategoryInfo } from '../../types/chemistry';

interface CategoryGridProps {
  categories: CategoryInfo[];
  pickedCategory: string | null;
  onSelectCategory: (catKey: string) => void;
  answered: boolean;
  correctCategory?: string | null;
  altBadges?: boolean;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  pickedCategory,
  onSelectCategory,
  answered,
  correctCategory,
  altBadges = false
}) => {
  return (
    <div className="q-cats">
      <div className="cat-head">
        <span>Tür</span>
        <span className="kb-hint">
          {altBadges ? '⌥1–4 tuşları' : `1–${categories.length} tuşları`}
        </span>
      </div>
      <div className="cat-grid">
        {categories.map((cat, i) => {
          const isSelected = pickedCategory === cat.key;
          const isRight = answered && cat.key === correctCategory;
          const isWrong = answered && isSelected && cat.key !== correctCategory;

          let statusClass = '';
          if (isRight) statusClass = 'right';
          else if (isWrong) statusClass = 'wrong';
          else if (isSelected) statusClass = 'on';

          const badge = altBadges ? `⌥${i + 1}` : String(i + 1);

          return (
            <button
              key={cat.key}
              type="button"
              className={`cat ${statusClass}`}
              style={{ '--rgb': cat.rgb } as React.CSSProperties}
              aria-pressed={isSelected}
              disabled={answered}
              onClick={() => onSelectCategory(isSelected ? '' : cat.key)}
            >
              <span className="dot" aria-hidden="true" />
              <span className="cat-label">{cat.key}</span>
              <kbd>{badge}</kbd>
            </button>
          );
        })}
      </div>
    </div>
  );
};
