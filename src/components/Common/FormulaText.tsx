import React from 'react';
import { formatFormula } from '../../utils/text';

interface FormulaTextProps {
  text: string;
  className?: string;
}

export const FormulaText: React.FC<FormulaTextProps> = ({ text, className = '' }) => {
  return <span className={className}>{formatFormula(text)}</span>;
};
