import React from 'react';

interface KeyBadgeProps {
  label: string;
  className?: string;
}

export const KeyBadge: React.FC<KeyBadgeProps> = ({ label, className = '' }) => {
  return (
    <kbd className={`kb-key ${className}`} aria-hidden="true">
      {label}
    </kbd>
  );
};
