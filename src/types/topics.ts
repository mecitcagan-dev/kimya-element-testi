export type ExamCategory = 'all' | 'tyt_ayt' | 'tyt' | 'ayt';

export type TopicId =
  | 'element'
  | 'compound'
  | 'polyatomic'
  | 'safety'
  | 'lab'
  | 'indicators'
  | 'alchemists'
  | 'valence'
  | 'functional_groups'
  | 'organic_common'
  | 'solids'
  | 'interactions'
  | 'vsepr'
  | 'metal_reactions'
  | 'organic_tests'
  | 'periodic_trends';

export interface TopicDirection {
  id: string;
  label: string;
  keyBadge?: string;
}

export interface TopicCategoryOption {
  key: string;
  rgb: string;
}

export interface TopicDefinition {
  id: TopicId;
  title: string;
  examCategory: 'tyt_ayt' | 'tyt' | 'ayt';
  icon: string;
  tag: string;
  badgeColor: string;
  description: string;
  defaultCount: number;
  directions?: TopicDirection[];
  hasTypeToggle?: boolean;
  typeToggleLabel?: string;
  categories?: TopicCategoryOption[];
  hasRangeSelector?: boolean;
  hasPeriodicTable?: boolean;
}

export interface StandardQuizItem {
  id: string | number;
  prompt: string;
  promptSub?: string;
  answer: string;
  synonyms?: string[];
  category?: string;
  infoChips: { label: string; value: string }[];
  distractors?: string[];
  hint?: string;
}
