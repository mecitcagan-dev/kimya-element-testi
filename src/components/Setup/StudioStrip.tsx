import React from 'react';
import { AnimationSceneId } from '../Animations/ChemistryAnimationsModal';

interface StudioStripProps {
  onOpenTrendsExplorer: () => void;
  onOpenMnemonics: (initialCategory?: string) => void;
  onOpenCompoundBuilder: () => void;
  onOpenChemistryLab: (tab?: 'equilibrium' | 'electrochemistry') => void;
  onOpenAnimations: (scene?: AnimationSceneId) => void;
}

interface StudioCardConfig {
  id: string;
  tone: string;
  iconSrc: string;
  title: string;
  desc: string;
  buttonLabel: string;
  onClick: () => void;
}

/** İnteraktif laboratuvar, atölye, animasyon ve kodlama rehberleri hızlı erişim şeridi */
export const StudioStrip: React.FC<StudioStripProps> = ({
  onOpenTrendsExplorer,
  onOpenMnemonics,
  onOpenCompoundBuilder,
  onOpenChemistryLab,
  onOpenAnimations
}) => {
  const cards: StudioCardConfig[] = [
    {
      id: 'compass',
      tone: 'tone-compass',
      iconSrc: './icons/lab-compass.jpg',
      title: 'Değişim Pusulası',
      desc: 'Soldan sağa & yukarıdan aşağıya eğilimleri ve istisnaları keşfet',
      buttonLabel: 'Pusulayı Aç ➡️',
      onClick: onOpenTrendsExplorer
    },
    {
      id: 'mnemonics',
      tone: 'tone-mnemonics',
      iconSrc: './icons/lab-mnemonics.jpg',
      title: 'Kodlamalar & Püf Noktaları',
      desc: 'DeDen TRabzonlu mu, Zengin Pabuçlu, Asit/Baz bulma kuralları',
      buttonLabel: 'Rehberi İncele 💡',
      onClick: () => onOpenMnemonics()
    },
    {
      id: 'builder',
      tone: 'tone-builder',
      iconSrc: './icons/lab-builder.jpg',
      title: 'İyon Çaprazlama & Adlandırma',
      desc: 'EBOB sadeleştirme, Romen rakamları ve Latince önek atölyesi',
      buttonLabel: 'Atölyeyi Aç 🧪',
      onClick: onOpenCompoundBuilder
    },
    {
      id: 'lab',
      tone: 'tone-lab',
      iconSrc: './icons/lab-battery.jpg',
      title: 'Denge & Pil Laboratuvarı',
      desc: 'Le Chatelier etki grafikleri ve canlı Galvanik pil simülatörü',
      buttonLabel: 'Laboratuvarı Aç ⚗️',
      onClick: () => onOpenChemistryLab('equilibrium')
    },
    {
      id: 'animations',
      tone: 'tone-animations',
      iconSrc: './icons/lab-animations.jpg',
      title: 'Canlı Kimya Animasyonları',
      desc: 'Daniell pili, elektroliz, gaz yasaları, titrasyon ve orbital sahneleri',
      buttonLabel: 'Animasyonları İzle 🎬',
      onClick: () => onOpenAnimations('galvanic_cell')
    }
  ];

  return (
    <section className="studio-strip" aria-label="İnteraktif kimya stüdyoları">
      {cards.map(card => (
        <div
          key={card.id}
          className={`studio-card ${card.tone}`}
          onClick={card.onClick}
        >
          <div className="studio-card-head">
            <span className="studio-icon" aria-hidden="true">
              <img src={card.iconSrc} alt="" className="studio-icon-img" />
            </span>
            <div>
              <strong className="studio-title">{card.title}</strong>
              <p className="studio-desc">{card.desc}</p>
            </div>
          </div>
          <button
            type="button"
            className="btn secondary small studio-btn"
            onClick={(e) => {
              e.stopPropagation();
              card.onClick();
            }}
          >
            <span>{card.buttonLabel}</span>
          </button>
        </div>
      ))}
    </section>
  );
};
