import { ElementRangeKey } from '../types/chemistry';
export type { ElementRangeKey };
import { TopicId, StandardQuizItem } from './topics';
import { ElementData, CompoundData } from './chemistry';

export type AnswerMode = 'type' | 'choice';

export interface QuizConfig {
  quiz: TopicId;
  kind: 'range' | 'weak' | 'list';
  range?: ElementRangeKey;
  zs?: (number | string)[];
  total: number;                        // Sayı veya Infinity
  retry: boolean;                       // Yanlışları tekrar sor
  mode: AnswerMode;                     // 'type' (yazarak) | 'choice' (seçenekli)
  dir?: string;                         // Soru yönü (ad-formul, form-name, vb.)
  includeCompoundType: boolean;         // Bileşiklerde tür (Asit/Baz/Tuz/Oksit) sorulsun mu?
}

export interface QuestionItem {
  id: number | string;
  data: ElementData | CompoundData | StandardQuizItem;
  standard: StandardQuizItem;
  quiz: TopicId;
  retry: boolean;
  dir: string;
  includeType: boolean;
}

export interface AnswerResult {
  nameOk: boolean;
  catOk: boolean;
  full: boolean;
  correctText: string;
  userText: string;
  correctCat: string;
  userCat: string;
  includeType: boolean;
}

export interface MissedQuestion {
  z: number | string;
  title: string;
  prompt: string;
  correctText: string;
  typed: string;
  pickedCat: string;
  resolved: boolean;
}

export interface SessionResult {
  quiz: TopicId;
  topicTitle: string;
  answered: number;
  full: number;
  nameOk: number;
  catOk: number;
  bestStreak: number;
  answers: number;
  missed: MissedQuestion[];
  missedZs: (number | string)[];
  includeCompoundType: boolean;
}
