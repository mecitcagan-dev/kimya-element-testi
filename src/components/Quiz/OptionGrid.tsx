import React from 'react';
import { KeyBadge } from '../Common/KeyBadge';

interface OptionGridProps {
  choices: string[];
  pickedChoice: string | null;
  onSelectChoice: (choice: string) => void;
  answered: boolean;
  correctChoice?: string | null;
}

const OPT_KEYS = ['Q', 'W', 'E', 'R'];

export const OptionGrid: React.FC<OptionGridProps> = ({
  choices,
  pickedChoice,
  onSelectChoice,
  answered,
  correctChoice
}) => {
  return (
    <div className="q-choices" role="group" aria-label="Seçenekler">
      {choices.map((choice, i) => {
        const isSelected = pickedChoice === choice;
        const isRight = answered && choice === correctChoice;
        const isWrong = answered && isSelected && choice !== correctChoice;

        let statusClass = '';
        if (isRight) statusClass = 'right';
        else if (isWrong) statusClass = 'wrong';
        else if (isSelected) statusClass = 'on';

        return (
          <button
            key={choice + i}
            type="button"
            className={`opt ${statusClass}`}
            aria-pressed={isSelected}
            disabled={answered}
            onClick={() => onSelectChoice(choice)}
          >
            <span className="opt-label">{choice}</span>
            <span className="opt-trailing">
              {isRight && (
                <span className="opt-mark" aria-label="Doğru seçenek">
                  ✓
                </span>
              )}
              {isWrong && (
                <span className="opt-mark" aria-label="Yanlış seçenek">
                  ✗
                </span>
              )}
              {i < OPT_KEYS.length && <KeyBadge label={OPT_KEYS[i]} />}
            </span>
          </button>
        );
      })}
    </div>
  );
};
