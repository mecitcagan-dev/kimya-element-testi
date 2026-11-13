import React from 'react';

interface StudioStripProps {
  onOpenTrendsExplorer: () => void;
  onOpenMnemonics: (initialCategory?: string) => void;
  onOpenCompoundBuilder: () => void;
  onOpenChemistryLab: (tab?: 'equilibrium' | 'electrochemistry') => void;
}

interface StudioCardConfig {
  id: string;
  tone: string;
  icon: string;
  title: string;
  desc: string;
  buttonLabel: string;
  onClick: () => void;
}

/** İnteraktif laboratuvar, atölye ve kodlama rehberleri hızlı erişim şeridi */
export const StudioStrip: React.FC<StudioStripProps> = ({
  onOpenTrendsExplorer,
  onOpenMnemonics,
  onOpenCompoundBuilder,
  onOpenChemistryLab
}) => {
  const cards: StudioCardConfig[] = [
    {
      id: 'compass',
      tone: 'tone-compass',
      icon: '🧭',
      title: 'Değişim Pusulası',
      desc: 'Soldan sağa & yukarıdan aşağıya eğilimleri ve istisnaları keşfet',
      buttonLabel: 'Pusulayı Aç ➡️',
      onClick: onOpenTrendsExplorer
    },
    {
      id: 'mnemonics',
      tone: 'tone-mnemonics',
      icon: '💡',
      title: 'Kodlamalar & Püf Noktaları',
      desc: 'DeDen TRabzonlu mu, Zengin Pabuçlu, Asit/Baz bulma kuralları',
      buttonLabel: 'Rehberi İncele 💡',
      onClick: () => onOpenMnemonics()
    },
    {
      id: 'builder',
      tone: 'tone-builder',
      icon: '🧪',
      title: 'İyon Çaprazlama & Adlandırma',
      desc: 'EBOB sadeleştirme, Romen rakamları ve Latince önek atölyesi',
      buttonLabel: 'Atölyeyi Aç 🧪',
      onClick: onOpenCompoundBuilder
    },
    {
      id: 'lab',
      tone: 'tone-lab',
      icon: '⚖️',
      title: 'Denge & Pil Laboratuvarı',
      desc: 'Le Chatelier etki grafikleri ve canlı Galvanik pil simülatörü',
      buttonLabel: 'Laboratuvarı Aç ⚗️',
      onClick: () => onOpenChemistryLab('equilibrium')
    }
  ];

  return (
    <section className="studio-strip" aria-label="İnteraktif kimya laboratuvarları">
      {cards.map(card => (
        <div key={card.id} className={`studio-card ${card.tone}`}>
          <div className="studio-card-head">
            <span className="studio-icon" aria-hidden="true">
              {card.icon}
            </span>
            <div>
              <strong className="studio-title">{card.title}</strong>
              <p className="studio-desc">{card.desc}</p>
            </div>
          </div>
          <button
            type="button"
            className="btn secondary small studio-btn"
            onClick={card.onClick}
          >
            <span>{card.buttonLabel}</span>
          </button>
        </div>
      ))}
    </section>
  );
};
