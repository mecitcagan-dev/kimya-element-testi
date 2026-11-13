import React, { useEffect, useMemo, useState } from 'react';
import { ExamCategory, TopicId } from '../../types/topics';
import { AnswerMode, ElementRangeKey, QuizConfig } from '../../types/quiz';
import { ALL_TOPICS, TOPIC_MAP } from '../../data/topics';
import { readStored, writeStored, KEYS } from '../../utils/storage';
import { getWeakTopicIds } from '../../engine/statsEngine';
import { StudioStrip } from './StudioStrip';
import { TopicExplorer } from './TopicExplorer';
import { SetupInspector } from './SetupInspector';
import { AnimationSceneId } from '../Animations/ChemistryAnimationsModal';
import {
  ALL_COMPOUND_NAMING_CATEGORIES,
  CompoundNamingCategory,
  getCompoundNamingCountChoices,
  getFilteredCompoundNamingItems,
  normalizeNamingCategories
} from '../../data/compoundNaming';

interface SetupScreenProps {
  onStartQuiz: (cfg: QuizConfig) => void;
  onOpenPeriodicTable: () => void;
  onOpenTopicReference: (topicId: TopicId) => void;
  onOpenTrendsExplorer: () => void;
  onOpenMnemonics: (initialCategory?: string) => void;
  onOpenCompoundBuilder: () => void;
  onOpenChemistryLab: (tab?: 'equilibrium' | 'electrochemistry') => void;
  onOpenAnimations: (scene?: AnimationSceneId) => void;
}

/** Kurulum ekranı: Üstte 5'li stüdyo şeridi, altta 2 sütunlu Master-Detail çalışma alanı */
export const SetupScreen: React.FC<SetupScreenProps> = ({
  onStartQuiz,
  onOpenPeriodicTable,
  onOpenTopicReference,
  onOpenTrendsExplorer,
  onOpenMnemonics,
  onOpenCompoundBuilder,
  onOpenChemistryLab,
  onOpenAnimations
}) => {
  const [examCat, setExamCat] = useState<ExamCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyWeakTopics, setOnlyWeakTopics] = useState(false);

  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>(() => {
    const saved = readStored(KEYS.tab);
    if (saved && TOPIC_MAP.has(saved as TopicId)) {
      return saved as TopicId;
    }
    return 'element';
  });

  const [elementRange, setElementRange] = useState<ElementRangeKey>('1-36');
  const [direction, setDirection] = useState<string>('ad-formul');

  const [includeCompoundType, setIncludeCompoundType] = useState<boolean>(() => {
    const saved = readStored(KEYS.compoundIncludeType);
    return saved !== null ? saved === 'true' : true;
  });

  const [questionCount, setQuestionCount] = useState<number | 'inf'>(20);
  const [answerMode, setAnswerMode] = useState<AnswerMode>(() => {
    const saved = readStored(KEYS.answerMode);
    if (saved === 'type' || saved === 'choice') return saved;
    try {
      return window.matchMedia('(pointer: coarse)').matches ? 'choice' : 'type';
    } catch {
      return 'choice';
    }
  });
  const [retryWrong, setRetryWrong] = useState<boolean>(true);
  const [showTableSetting, setShowTableSetting] = useState<boolean>(() => {
    const saved = readStored(KEYS.showTable);
    return saved !== null ? saved === 'true' : true;
  });

  const [namingCategories, setNamingCategories] = useState<CompoundNamingCategory[]>(() => {
    const saved = readStored(KEYS.namingCategories);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter((c): c is CompoundNamingCategory =>
            ALL_COMPOUND_NAMING_CATEGORIES.includes(c as CompoundNamingCategory)
          );
          if (valid.length > 0) return normalizeNamingCategories(valid);
        }
      } catch {
        /* yoksay */
      }
    }
    return ALL_COMPOUND_NAMING_CATEGORIES;
  });

  const selectedTopic = TOPIC_MAP.get(selectedTopicId) || ALL_TOPICS[0];

  const weakIdsByTopic = useMemo(() => {
    const map: Record<string, (string | number)[]> = {};
    for (const topic of ALL_TOPICS) {
      map[topic.id] = getWeakTopicIds(topic.id);
    }
    return map;
  }, [selectedTopicId]);

  const weakCountsByTopic = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const topic of ALL_TOPICS) {
      counts[topic.id] = weakIdsByTopic[topic.id]?.length ?? 0;
    }
    return counts;
  }, [weakIdsByTopic]);

  const weakItems = weakIdsByTopic[selectedTopicId] || [];

  useEffect(() => {
    if (selectedTopic.directions && selectedTopic.directions.length > 0) {
      setDirection(selectedTopic.directions[0].id);
    }
  }, [selectedTopic]);

  const handleTopicSelect = (id: TopicId) => {
    setSelectedTopicId(id);
    writeStored(KEYS.tab, id);
    const nextTopic = TOPIC_MAP.get(id);
    if (id === 'compound_naming') {
      const poolCount = getFilteredCompoundNamingItems(namingCategories).length;
      const validNums = getCompoundNamingCountChoices(poolCount);
      if (questionCount !== 'inf' && !validNums.includes(questionCount)) {
        setQuestionCount(poolCount);
      }
      return;
    }
    if (
      nextTopic &&
      questionCount !== 10 &&
      questionCount !== 20 &&
      questionCount !== 'inf'
    ) {
      setQuestionCount(nextTopic.defaultCount);
    }
  };

  const handleNamingCategoriesChange = (next: CompoundNamingCategory[]) => {
    const normalized = normalizeNamingCategories(next);
    setNamingCategories(normalized);
    writeStored(KEYS.namingCategories, JSON.stringify(normalized));
    const poolCount = getFilteredCompoundNamingItems(normalized).length;
    const validNums = getCompoundNamingCountChoices(poolCount);
    if (questionCount !== 'inf' && !validNums.includes(questionCount)) {
      setQuestionCount(poolCount);
    }
  };

  const handleModeChange = (mode: AnswerMode) => {
    setAnswerMode(mode);
    writeStored(KEYS.answerMode, mode);
  };

  const handleIncludeCompoundTypeChange = (include: boolean) => {
    setIncludeCompoundType(include);
    writeStored(KEYS.compoundIncludeType, String(include));
  };

  const handleShowTableChange = (show: boolean) => {
    setShowTableSetting(show);
    writeStored(KEYS.showTable, String(show));
  };

  const supportsTypeQuestion =
    selectedTopicId === 'element' ||
    selectedTopicId === 'polyatomic' ||
    Boolean(selectedTopic.hasTypeToggle);

  const handleStart = () => {
    const totalCount = questionCount === 'inf' ? Infinity : questionCount;
    onStartQuiz({
      quiz: selectedTopicId,
      kind: 'range',
      range: selectedTopicId === 'element' ? elementRange : undefined,
      total: totalCount,
      retry: retryWrong,
      mode: answerMode,
      dir: direction,
      includeCompoundType: supportsTypeQuestion ? includeCompoundType : false,
      namingCategories: selectedTopicId === 'compound_naming' ? namingCategories : undefined
    });
  };

  const handleStartWeak = () => {
    if (weakItems.length === 0) return;
    const totalCount = questionCount === 'inf' ? Infinity : questionCount;
    onStartQuiz({
      quiz: selectedTopicId,
      kind: 'weak',
      zs: weakItems,
      total: Math.min(totalCount, weakItems.length),
      retry: retryWrong,
      mode: answerMode,
      dir: direction,
      includeCompoundType: supportsTypeQuestion ? includeCompoundType : false
    });
  };

  return (
    <section id="view-setup">
      <StudioStrip
        onOpenTrendsExplorer={onOpenTrendsExplorer}
        onOpenMnemonics={onOpenMnemonics}
        onOpenCompoundBuilder={onOpenCompoundBuilder}
        onOpenChemistryLab={onOpenChemistryLab}
        onOpenAnimations={onOpenAnimations}
      />

      <div className="setup-workspace">
        <TopicExplorer
          examCat={examCat}
          onExamCatChange={setExamCat}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onlyWeakTopics={onlyWeakTopics}
          onToggleOnlyWeak={() => setOnlyWeakTopics(prev => !prev)}
          weakCountsByTopic={weakCountsByTopic}
          selectedTopicId={selectedTopicId}
          onSelectTopic={handleTopicSelect}
          onOpenTopicReference={onOpenTopicReference}
        />

        <SetupInspector
          selectedTopic={selectedTopic}
          elementRange={elementRange}
          onElementRangeChange={setElementRange}
          direction={direction}
          onDirectionChange={setDirection}
          includeCompoundType={includeCompoundType}
          onIncludeCompoundTypeChange={handleIncludeCompoundTypeChange}
          namingCategories={namingCategories}
          onNamingCategoriesChange={handleNamingCategoriesChange}
          questionCount={questionCount}
          onQuestionCountChange={setQuestionCount}
          answerMode={answerMode}
          onAnswerModeChange={handleModeChange}
          retryWrong={retryWrong}
          onRetryWrongChange={setRetryWrong}
          showTableSetting={showTableSetting}
          onShowTableSettingChange={handleShowTableChange}
          weakCount={weakItems.length}
          onStart={handleStart}
          onStartWeak={handleStartWeak}
          onOpenPeriodicTable={onOpenPeriodicTable}
          onOpenTopicReference={onOpenTopicReference}
          onOpenTrendsExplorer={onOpenTrendsExplorer}
          onOpenMnemonics={onOpenMnemonics}
          onOpenCompoundBuilder={onOpenCompoundBuilder}
          onOpenChemistryLab={onOpenChemistryLab}
          onOpenAnimations={onOpenAnimations}
        />
      </div>
    </section>
  );
};
