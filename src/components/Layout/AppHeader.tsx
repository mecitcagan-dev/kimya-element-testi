import React from 'react';

export type AppTheme = 'dark' | 'light';

interface AppHeaderProps {
  theme: AppTheme;
  onToggleTheme: () => void;
  totalTopics: number;
  totalWeakItems: number;
  isSetupView: boolean;
}

/** Üst uygulama şeridi: marka kimliği, genel özet rozetleri ve tema anahtarı */
export const AppHeader: React.FC<AppHeaderProps> = ({
  theme,
  onToggleTheme,
  totalTopics,
  totalWeakItems,
  isSetupView
}) => {
  return (
    <header className="app-header">
      <div className="app-brand">
        <div className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 64 64" width="28" height="28">
            <g fill="none" stroke="currentColor" strokeWidth="2.8">
              <ellipse cx="32" cy="32" rx="26" ry="10" />
              <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(60 32 32)" />
              <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(-60 32 32)" />
            </g>
            <circle cx="32" cy="32" r="5.5" fill="var(--accent)" />
          </svg>
        </div>
        <div className="brand-copy">
          {isSetupView ? (
            <h1 className="brand-title">TYT & AYT Kimya Stüdyosu</h1>
          ) : (
            <span className="brand-title">TYT & AYT Kimya Stüdyosu</span>
          )}
          <p className="brand-sub">
            YKS kimya formüllerini, adlandırmaları ve temel kuralları aktif pratikle refleks haline getir.
          </p>
        </div>
      </div>

      <div className="app-header-actions">
        <span className="header-pill">
          <span className="header-dot ok" aria-hidden="true" />
          {totalTopics} Konu · 4 Laboratuvar
        </span>
        {totalWeakItems > 0 && (
          <span className="header-pill warn">
            <span className="header-dot warn" aria-hidden="true" />
            {totalWeakItems} Zayıf Madde
          </span>
        )}
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}
          title={theme === 'dark' ? 'Açık Kağıt Teması' : 'Koyu Lab Teması'}
        >
          <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span>{theme === 'dark' ? 'Açık Tema' : 'Koyu Tema'}</span>
        </button>
      </div>
    </header>
  );
};
