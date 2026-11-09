import { ElementData, CompoundData, QuizTopic } from './chemistry';

export type AnswerMode = 'type' | 'choice';
export type CompoundDirection = 'ad-formul' | 'formul-ad' | 'karisik';
export type ElementRangeKey = '1-18' | '19-36' | '1-36';

export interface QuizConfig {
  quiz: QuizTopic;
  kind: 'range' | 'weak' | 'list';
  range?: ElementRangeKey;
  zs?: number[];
  total: number;                        // Sayı veya Infinity
  retry: boolean;                       // Yanlışları tekrar sor
  mode: AnswerMode;                     // 'type' (yazarak) | 'choice' (seçenekli)
  dir?: CompoundDirection;              // Bileşik soru yönü
  includeCompoundType: boolean;         // Bileşiklerde tür (Asit/Baz/Tuz/Oksit) sorulsun mu?
}

export interface QuestionItem {
  data: ElementData | CompoundData;
  quiz: QuizTopic;
  retry: boolean;
  dir: 'ad-formul' | 'formul-ad';       // Bu sorudaki kesin yön
  includeType: boolean;                 // Bu soruda tür seçimi gerekiyor mu?
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
  z: number;
  typed: string;
  pickedCat: string;
  resolved: boolean;
}

export interface SessionResult {
  quiz: QuizTopic;
  answered: number;
  full: number;
  nameOk: number;
  catOk: number;
  bestStreak: number;
  answers: number;
  missed: MissedQuestion[];
  missedZs: number[];
  includeCompoundType: boolean;
}
