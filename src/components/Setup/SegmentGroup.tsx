import { KeyBadge } from '../Common/KeyBadge';

export interface SegmentOption<T extends string | number> {
  value: T;
  label: string;
  keyBadge?: string;
}

interface SegmentGroupProps<T extends string | number> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (val: T) => void;
  columns?: 2 | 3 | 4;
  id?: string;
}

export function SegmentGroup<T extends string | number>({
  options,
  value,
  onChange,
  columns = 3,
  id
}: SegmentGroupProps<T>) {
  const colClass = columns === 4 ? 'four' : columns === 2 ? 'two' : '';

  return (
    <div className={`seg ${colClass}`} role="group" id={id}>
      {options.map(opt => {
        const isPressed = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            aria-pressed={isPressed}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
            {opt.keyBadge && <KeyBadge label={opt.keyBadge} />}
          </button>
        );
      })}
    </div>
  );
}
