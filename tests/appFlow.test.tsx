import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import fs from 'node:fs';
import path from 'node:path';
import { App } from '../src/App';

describe('App Flow & Multi-Topic System', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('displays 24 topics total (8 TYT+AYT, 8 TYT, 8 AYT) and filters by exam category', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /Tüm Konular \(24\)/i })).toBeDefined();
    const tytAytTab = screen.getByRole('button', { name: /TYT \+ AYT Ortak \(8\)/i });
    const tytTab = screen.getByRole('button', { name: /TYT Kimya \(8\)/i });
    const aytTab = screen.getByRole('button', { name: /AYT Kimya \(8\)/i });

    expect(tytAytTab).toBeDefined();
    expect(tytTab).toBeDefined();
    expect(aytTab).toBeDefined();

    fireEvent.click(tytAytTab);
    expect(screen.getByText('Sistematik Bileşik Adlandırma (IUPAC)')).toBeDefined();
    expect(screen.getByText('Gazlar, Çözeltiler & Asit-Baz Dengesi')).toBeDefined();

    fireEvent.click(tytTab);
    expect(screen.getByText('Karışımlar & Ayırma Yöntemleri')).toBeDefined();
    expect(screen.getByText('Polimerler & Kimya Her Yerde')).toBeDefined();
    expect(screen.getByText('Çevre Kimyası & Su Arıtımı')).toBeDefined();

    fireEvent.click(aytTab);
    expect(screen.getByText('Modern Atom Teorisi & Orbitaller')).toBeDefined();
    expect(screen.getByText('Hız, Enerji & Kimyasal Denge')).toBeDefined();
    expect(screen.getByText('Elektrokimya & Organik Derinleşme')).toBeDefined();
  });
  it('allows user to filter by exam category, select Yaygın Bileşikler, and test with Türsüz and Seçenekli mode', () => {
    render(<App />);

    // 1. Sınav kategorileri gösteriliyor mu?
    expect(screen.getByText(/Tüm Konular/i)).toBeDefined();
    const tytAytTab = screen.getByRole('button', { name: /TYT \+ AYT Ortak/i });
    expect(tytAytTab).toBeDefined();

    // 2. TYT+AYT sekmesine tıkla
    fireEvent.click(tytAytTab);

    // 3. Yaygın Bileşikler kartına tıkla
    const compoundCard = screen.getByText('Yaygın Bileşikler');
    fireEvent.click(compoundCard);

    // 4. "Türsüz (Yalnızca Formül & Ad)" butonuna tıkla
    const tursuzBtn = screen.getByRole('button', { name: /Türsüz/i });
    fireEvent.click(tursuzBtn);
    expect(tursuzBtn.getAttribute('aria-pressed')).toBe('true');

    // 5. "Seçenekli (Çoktan Seçmeli)" butonuna tıkla
    const choiceBtn = screen.getByRole('button', { name: /Seçenekli/i });
    fireEvent.click(choiceBtn);
    expect(choiceBtn.getAttribute('aria-pressed')).toBe('true');

    // 6. Testi Başlat
    const startBtn = screen.getByRole('button', { name: /Testi Başlat/i });
    fireEvent.click(startBtn);

    // 7. Test ekranında tür butonlarının gizlendiğini doğrula
    expect(screen.queryByText(/⌥1–4 tuşları/i)).toBeNull();

    // 8. 4 seçenek gösteriliyor mu?
    const choicesGroup = screen.getByRole('group', { name: /Seçenekler/i });
    expect(choicesGroup).toBeDefined();
    const optButtons = choicesGroup.querySelectorAll('button.opt');
    expect(optButtons.length).toBe(4);

    // 9. İlk seçeneğe tıkla ve gönder
    fireEvent.click(optButtons[0]);
    const submitBtn = screen.getByRole('button', { name: /Gönder/i });
    fireEvent.click(submitBtn);

    // 10. Geri bildirim kartında tür hatası olmadan anında sonuç gösterilir
    expect(screen.queryByText(/Lütfen bir tür\/kategori seçin/i)).toBeNull();
    const feedbackTitle = screen.getByText(/Doğru!|Yanlış/i);
    expect(feedbackTitle).toBeDefined();
  });

  it('can open and close topic study reference modal', () => {
    render(<App />);

    // "Konu Listesini İncele" butonuna tıkla
    const studyBtn = screen.getByRole('button', { name: /📖 Konu Listesini İncele/i });
    expect(studyBtn).toBeDefined();
    fireEvent.click(studyBtn);

    // Modal açıldı mı?
    expect(screen.getByText(/Çalışma Kartları/i)).toBeDefined();

    // Kapat butonu ile kapat
    const closeBtns = screen.getAllByRole('button', { name: 'Kapat' });
    expect(closeBtns.length).toBeGreaterThan(0);
    fireEvent.click(closeBtns[0]);
    expect(screen.queryByText(/Çalışma Kartları/i)).toBeNull();
  });

  it('can open and switch directions in Periodic Trends Explorer (Değişim Pusulası)', () => {
    render(<App />);

    // Pusula açma butonuna tıkla
    const openCompassBtn = screen.getByRole('button', { name: /Pusulayı Aç/i });
    expect(openCompassBtn).toBeDefined();
    fireEvent.click(openCompassBtn);

    // Explorer başlığı görünüyor mu?
    expect(screen.getByText('Periyodik Sistem Değişim Pusulası')).toBeDefined();

    // Yukarıdan Aşağıya yönüne tıkla
    const downDirectionBtn = screen.getByRole('button', { name: /Yukarıdan Aşağıya/i });
    fireEvent.click(downDirectionBtn);

    // Yukarıdan aşağıya özeti ekranda mı?
    expect(screen.getByText(/Aynı Grupta \(1\. Periyot → 7\. Periyot\)/i)).toBeDefined();

    // Kapat
    const closeBtns = screen.getAllByRole('button', { name: 'Kapat' });
    fireEvent.click(closeBtns[0]);
    expect(screen.queryByText('Periyodik Sistem Değişim Pusulası')).toBeNull();
  });

  it('can open and use Chemistry Mnemonics & Tricks Modal (Kodlamalar & Püf Noktaları)', () => {
    render(<App />);

    // 1. Üst bannerdaki "Rehberi İncele 💡" butonuna tıkla
    const openMnemonicsBtn = screen.getByRole('button', { name: /Rehberi İncele 💡/i });
    expect(openMnemonicsBtn).toBeDefined();
    fireEvent.click(openMnemonicsBtn);

    // 2. Modal başlığı görünüyor mu?
    expect(screen.getByText(/Kimya Kodlamaları & Püf Noktaları Rehberi/i)).toBeDefined();

    // 3. Varsayılan olarak Bileşik Türü Püf Noktaları sekmesinde olmalı
    expect(screen.getByText(/Bileşiğin ASİT Olduğu Nasıl Anlaşılır\?/i)).toBeDefined();

    // 4. "Atom & Tarihçe" sekmesine geç
    const atomicTab = screen.getByRole('button', { name: /Atom & Tarihçe/i });
    fireEvent.click(atomicTab);

    // 5. "DeDen TRabzonlu mu?" hafıza kodu görünüyor mu?
    expect(screen.getByText(/DeDen TRabzonlu mu\?/i)).toBeDefined();
    expect(screen.getByText(/Dalton → Thomson → Rutherford → Bohr → Modern/i)).toBeDefined();

    // 6. Arama kutusuna "Zengin" yaz
    const searchInput = screen.getByPlaceholderText(/Kodlama, formül veya kural ara/i);
    fireEvent.change(searchInput, { target: { value: 'Zengin' } });

    // "Tümü" sekmesine tıkla veya filtreyi doğrula
    const allTab = screen.getByRole('button', { name: /✨ Tümü/i });
    fireEvent.click(allTab);
    expect(screen.getByText(/Zengin Pabuçlu Beyaz Karısına Alttan Sandık/i)).toBeDefined();

    // 7. Modalı kapat
    const closeBtns = screen.getAllByRole('button', { name: 'Kapat' });
    fireEvent.click(closeBtns[0]);
    expect(screen.queryByText(/Kimya Kodlamaları & Püf Noktaları Rehberi/i)).toBeNull();
  });

  it('can open mnemonics modal directly from compound type hint button', () => {
    render(<App />);

    // Yaygın Bileşikler konusuna tıkla
    const compoundCard = screen.getByText('Yaygın Bileşikler');
    fireEvent.click(compoundCard);

    // "💡 Asit/Baz/Tuz Nasıl Bulunur? (Püf Noktaları)" butonuna tıkla
    const hintBtn = screen.getByRole('button', { name: /Asit\/Baz\/Tuz Nasıl Bulunur\?/i });
    expect(hintBtn).toBeDefined();
    fireEvent.click(hintBtn);

    // Modal açıldı ve doğrudan bileşik kurallarını gösteriyor mu?
    expect(screen.getByText(/Kimya Kodlamaları & Püf Noktaları Rehberi/i)).toBeDefined();
    expect(screen.getByText(/Bileşiğin ASİT Olduğu Nasıl Anlaşılır\?/i)).toBeDefined();
  });

  it('can search and filter through rich TYT & AYT mnemonics (Denizde Yüzen On Maymun, Markovnikov, KİMYA)', () => {
    render(<App />);

    // Modalı aç
    const openMnemonicsBtn = screen.getByRole('button', { name: /Rehberi İncele 💡/i });
    fireEvent.click(openMnemonicsBtn);

    // "Tümü" sekmesine geç
    const allTab = screen.getByRole('button', { name: /✨ Tümü/i });
    fireEvent.click(allTab);

    // Arama kutusu
    const searchInput = screen.getByPlaceholderText(/Kodlama, formül veya kural ara/i);

    // 1. "Maymun" araması -> Denizde Yüzen On Maymun
    fireEvent.change(searchInput, { target: { value: 'Maymun' } });
    expect(screen.getAllByText(/Denizde Yüzen On Maymun/i).length).toBeGreaterThan(0);

    // 2. "Markovnikov" araması -> Zengine Zengin, Fakire Fakir
    fireEvent.change(searchInput, { target: { value: 'Markovnikov' } });
    expect(screen.getAllByText(/Zengine Zengin, Fakire Fakir/i).length).toBeGreaterThan(0);

    // 3. "Elektroliz" araması -> Suyun Elektrolizi
    fireEvent.change(searchInput, { target: { value: 'Elektroliz' } });
    expect(screen.getAllByText(/Suyun Elektrolizi/i).length).toBeGreaterThan(0);

    // Modalı kapat
    const closeBtns = screen.getAllByRole('button', { name: 'Kapat' });
    fireEvent.click(closeBtns[0]);
  });

  it('opens CompoundBuilderModal from SetupScreen, tests ionic cross-over, covalent tab, and starts naming quiz', () => {
    render(<App />);

    // Stüdyo bandından İyon Çaprazlama & Adlandırma Atölyesi'ni aç
    const openBuilderBtn = screen.getByRole('button', { name: /Atölyeyi Aç 🧪/i });
    fireEvent.click(openBuilderBtn);

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText(/İyon Çaprazlama & Bileşik Adlandırma Atölyesi/i)).toBeDefined();

    // 1. Fe3+ + SO4^2- -> Fe₂(SO₄)₃ / Demir(III) sülfat
    fireEvent.click(within(dialog).getByRole('button', { name: /Fe³⁺\s*Demir\(III\)/i }));
    fireEvent.click(within(dialog).getByRole('button', { name: /SO₄²⁻\s*sülfat/i }));
    expect(within(dialog).getAllByText('Fe₂(SO₄)₃').length).toBeGreaterThan(0);
    expect(within(dialog).getByText('Demir(III) sülfat')).toBeDefined();

    // 2. Ca2+ + O2- -> CaO (EBOB sadeleştirme = 2) / Kalsiyum oksit
    fireEvent.click(within(dialog).getByRole('button', { name: /Ca²⁺ \+ O²⁻/i }));
    expect(within(dialog).getByText(/EBOB\(2, 2\) = 2/i)).toBeDefined();
    expect(within(dialog).getAllByText('CaO').length).toBeGreaterThan(0);
    expect(within(dialog).getByText('Kalsiyum oksit')).toBeDefined();

    // 3. Kovalent sekmesine geç ve OF₂ molekülünü seç
    const covalentTab = within(dialog).getByRole('tab', { name: /Kovalent Bileşikler/i });
    fireEvent.click(covalentTab);
    expect(within(dialog).getByText(/Kovalent Adlandırma Altın Kuralı/i)).toBeDefined();
    expect(within(dialog).getByText('Diazot pentaoksit')).toBeDefined();

    fireEvent.click(within(dialog).getByRole('button', { name: 'OF₂' }));
    expect(within(dialog).getByText('Oksijen diflorür')).toBeDefined();

    // 4. Bileşik Adlandırma Testini Başlat CTA'sına tıkla
    const startNamingBtn = within(dialog).getByRole('button', {
      name: /Bileşik Adlandırma Testini Başlat/i
    });
    fireEvent.click(startNamingBtn);

    // Modal kapanır ve Sistematik Bileşik Adlandırma testi başlar
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByText(/Sistematik Bileşik Adlandırma \(IUPAC\)/)).toBeDefined();
    const choicesGroup = screen.getByRole('group', { name: /Seçenekler/i });
    expect(choicesGroup.querySelectorAll('button.opt').length).toBe(4);
  });

  it('opens ChemistryLabModal from SetupScreen, tests Le Chatelier & Galvanic Cell tabs, and launches both quizzes', () => {
    render(<App />);

    // 1. Stüdyo bandından Denge & Pil Laboratuvarı'nı aç
    const openLabBtn = screen.getByRole('button', { name: /Laboratuvarı Aç ⚗️/i });
    fireEvent.click(openLabBtn);

    const dialog = screen.getByRole('dialog', {
      name: /AYT İnteraktif Denge ve Pil Laboratuvarı/i
    });
    expect(dialog).toBeDefined();

    // Varsayılan Le Chatelier sekmesi: Katalizör -> Denge Bozulmaz
    fireEvent.click(within(dialog).getByRole('button', { name: /Katalizör Ekle/i }));
    expect(within(dialog).getByText(/Denge Bozulmaz/i)).toBeDefined();
    expect(within(dialog).getByText(/DEĞİŞMEZ \(Sadece sıcaklık değiştirir!\)/i)).toBeDefined();

    // Hacmi Küçült -> Haber tepkimesinde ürünler lehine
    fireEvent.click(within(dialog).getByRole('button', { name: /Hacmi Küçült/i }));
    expect(within(dialog).getByText(/Ürünler Lehine \(4 mol → 2 mol gaz\)/i)).toBeDefined();

    // Hız & Denge Testine Başla CTA
    fireEvent.click(
      within(dialog).getByRole('button', { name: /Hız & Denge Testine Başla/i })
    );
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByText(/Hız, Enerji & Kimyasal Denge/)).toBeDefined();

    // Testi bitirip kurulum ekranına dön
    fireEvent.click(screen.getByRole('button', { name: /Bitir/i }));
    fireEvent.click(screen.getByRole('button', { name: /Ayarlara dön/i }));

    // 2. Elektrokimya konusu seçilince çıkan bağlamsal CTA ile Pil Laboratuvarı'nı doğrudan Pil sekmesinde aç
    fireEvent.click(screen.getByText('Elektrokimya & Organik Derinleşme'));
    const contextualElectroBtn = screen.getByRole('button', {
      name: /Galvanik Pil & Elektroliz Laboratuvarını Aç/i
    });
    fireEvent.click(contextualElectroBtn);

    const electroDialog = screen.getByRole('dialog', {
      name: /AYT İnteraktif Denge ve Pil Laboratuvarı/i
    });
    expect(within(electroDialog).getAllByText('1.10 V').length).toBeGreaterThan(0);

    // Denge sekmesine geçip tekrar Galvanik Pil sekmesine dönerek sekme geçişini doğrula
    fireEvent.click(within(electroDialog).getByRole('button', { name: /Le Chatelier Denge Simülatörü/i }));
    expect(within(electroDialog).getByText(/Klasik ÖSYM Denge Tepkimesi Seç/i)).toBeDefined();
    fireEvent.click(within(electroDialog).getByRole('button', { name: /Galvanik Pil & Elektroliz Canlandırıcısı/i }));

    // Anot kabına su ekle -> Epil ARTAR
    fireEvent.click(within(electroDialog).getByRole('button', { name: /Anot Kabına Su Ekle/i }));
    expect(within(electroDialog).getAllByText(/Epil ARTAR/i).length).toBeGreaterThan(0);

    // Tuz köprüsünü çıkar -> Pil Durdu
    fireEvent.click(within(electroDialog).getByRole('button', { name: /Tuz Köprüsünü Çıkar/i }));
    expect(within(electroDialog).getByText(/Pil Durdu \(Epil = 0\.00 V\)/i)).toBeDefined();

    // Elektrokimya Testine Başla CTA
    fireEvent.click(
      within(electroDialog).getByRole('button', { name: /Elektrokimya Testine Başla/i })
    );
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByText(/Elektrokimya & Organik Derinleşme/)).toBeDefined();
    const choicesGroup = screen.getByRole('group', { name: /Seçenekler/i });
    expect(choicesGroup.querySelectorAll('button.opt').length).toBe(4);
  });

  it('supports theme switching, live topic search with empty state reset, and reference modal search', () => {
    render(<App />);

    // 1. Tema anahtarı: Koyu -> Açık -> Koyu
    const themeBtn = screen.getByRole('button', { name: /Açık temaya geç/i });
    fireEvent.click(themeBtn);
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(window.localStorage.getItem('elementTesti.theme')).toBe('light');

    const darkBtn = screen.getByRole('button', { name: /Koyu temaya geç/i });
    fireEvent.click(darkBtn);
    expect(document.documentElement.dataset.theme).toBe('dark');

    // 2. Konu arama kutusu ve boş durum sıfırlama
    const searchInput = screen.getByRole('searchbox', { name: /Konu veya kavram ara/i });
    fireEvent.change(searchInput, { target: { value: 'adlandırma' } });
    expect(screen.getByText('Sistematik Bileşik Adlandırma (IUPAC)')).toBeDefined();
    expect(screen.queryByText('Yaygın Bileşikler')).toBeNull();

    fireEvent.change(searchInput, { target: { value: 'olmayankonuxyz' } });
    expect(screen.getByText(/Eşleşen konu bulunamadı/i)).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: /Filtreleri Sıfırla/i }));
    expect(screen.getByText('Yaygın Bileşikler')).toBeDefined();

    // 3. Konu seçip Konu Listesini İncele modalında canlı filtreleme
    fireEvent.click(screen.getByText('Sistematik Bileşik Adlandırma (IUPAC)'));
    fireEvent.click(screen.getByRole('button', { name: /📖 Konu Listesini İncele/i }));
    const dialog = screen.getByRole('dialog');
    const modalSearch = within(dialog).getByRole('searchbox', {
      name: /Çalışma kartlarında ara/i
    });
    fireEvent.change(modalSearch, { target: { value: 'sülfat' } });
    expect(within(dialog).getAllByText(/sülfat/i).length).toBeGreaterThan(0);
    fireEvent.click(within(dialog).getAllByRole('button', { name: 'Kapat' })[0]);
  });

  it('renders custom generated icons in AppHeader, StudioStrip, and public/icons/, and navigates home via Ana sayfaya dön button', () => {
    const expectedIcons = [
      'brand-atom.jpg',
      'lab-compass.jpg',
      'lab-mnemonics.jpg',
      'lab-builder.jpg',
      'lab-battery.jpg',
      'lab-animations.jpg'
    ];
    for (const fileName of expectedIcons) {
      const iconPath = path.resolve(process.cwd(), 'public/icons', fileName);
      expect(fs.existsSync(iconPath)).toBe(true);
    }

    render(<App />);

    // AppHeader pill ve marka ikonu
    expect(screen.getByText(/24 Konu · 5 Stüdyo/i)).toBeDefined();
    const goHomeBtn = screen.getByRole('button', { name: 'Ana sayfaya dön' });
    const brandImg = goHomeBtn.querySelector('img.brand-icon-img');
    expect(brandImg).not.toBeNull();
    expect(brandImg?.getAttribute('src')).toBe('./icons/brand-atom.jpg');

    // StudioStrip 5 kart ve custom lab-*.jpg ikonları
    const studioRegion = screen.getByRole('region', { name: 'İnteraktif kimya stüdyoları' });
    const studioImgs = Array.from(studioRegion.querySelectorAll('img.studio-icon-img'));
    expect(studioImgs.map(img => img.getAttribute('src'))).toEqual([
      './icons/lab-compass.jpg',
      './icons/lab-mnemonics.jpg',
      './icons/lab-builder.jpg',
      './icons/lab-battery.jpg',
      './icons/lab-animations.jpg'
    ]);

    // Açık bir modal varken "Ana sayfaya dön" modalı kapatır ve Setup ekranında kalır
    fireEvent.click(screen.getByRole('button', { name: /Animasyonları İzle 🎬/i }));
    expect(screen.getByRole('dialog', { name: /Canlı Kimya Animasyonları Stüdyosu/i })).toBeDefined();

    fireEvent.click(goHomeBtn);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: /Testi Başlat/i })).toBeDefined();

    // Aktif bir test (QuizScreen) içindeyken "Ana sayfaya dön" Setup ekranına döndürür
    fireEvent.click(screen.getByRole('button', { name: /Testi Başlat/i }));
    expect(screen.getByRole('button', { name: /Bitir/i })).toBeDefined();
    expect(screen.queryByRole('button', { name: /Testi Başlat/i })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Ana sayfaya dön' }));
    expect(screen.getByRole('button', { name: /Testi Başlat/i })).toBeDefined();
    expect(screen.queryByRole('button', { name: /Bitir/i })).toBeNull();
  });

  it('opens ChemistryAnimationsModal, tests all 8 topics, exam filters, Galvanic controls, scene switching, and topic quiz launch', () => {
    render(<App />);

    // 1. Stüdyo bandından "Animasyonları İzle 🎬" ile modalı aç
    fireEvent.click(screen.getByRole('button', { name: /Animasyonları İzle 🎬/i }));
    const dialog = screen.getByRole('dialog', {
      name: /Canlı Kimya Animasyonları Stüdyosu/i
    });
    expect(dialog).toBeDefined();

    // 2. Tüm 8 animasyon konusu kenar çubuğunda listelenmeli
    const sidebar = within(dialog).getByRole('navigation', {
      name: 'Kimya animasyon sahneleri'
    });
    const allTopicTitles = [
      'Daniell Pili & Elektron Akışı',
      'Elektroliz & Hofmann Voltametresi',
      'Kimyasal Denge & Le Chatelier',
      'Gaz Yasaları & Graham Difüzyonu',
      'Polarite, Hidrojen Bağı & Hidratasyon',
      'Bohr Atom Modeli & Kuantum Orbitalleri',
      'Koligatif Özellikler & Ozmoz',
      'Asit–Baz Nötralleşme & Titrasyon'
    ];
    expect(within(sidebar).getAllByRole('button').length).toBe(8);
    for (const title of allTopicTitles) {
      expect(within(sidebar).getByText(title)).toBeDefined();
    }

    // 3. Sınav filtre sekmeleri (AYT, TYT / Ortak, Tümü)
    const aytTab = within(dialog).getByRole('tab', { name: /^AYT \(4\)$/i });
    fireEvent.click(aytTab);
    expect(within(sidebar).getAllByRole('button').length).toBe(4);
    expect(within(sidebar).getByText('Daniell Pili & Elektron Akışı')).toBeDefined();
    expect(within(sidebar).queryByText('Polarite, Hidrojen Bağı & Hidratasyon')).toBeNull();

    const tytTab = within(dialog).getByRole('tab', { name: /^TYT \/ Ortak \(4\)$/i });
    fireEvent.click(tytTab);
    expect(within(sidebar).getAllByRole('button').length).toBe(4);
    expect(within(sidebar).getByText('Polarite, Hidrojen Bağı & Hidratasyon')).toBeDefined();
    expect(within(sidebar).queryByText('Daniell Pili & Elektron Akışı')).toBeNull();

    const allTab = within(dialog).getByRole('tab', { name: /^Tümü \(8\)$/i });
    fireEvent.click(allTab);
    expect(within(sidebar).getAllByRole('button').length).toBe(8);

    // 4. Galvanik Hücre (Daniell Pili) sahne kontrolleri: Duraklat/Oynat, Sıfırla, Tuz Köprüsü toggle
    fireEvent.click(within(sidebar).getByText('Daniell Pili & Elektron Akışı'));
    expect(
      within(dialog).getByText(/Daniell Pili: Zn\(k\) \| Zn²⁺\(1M\) \|\| Cu²⁺\(1M\) \| Cu\(k\)/i)
    ).toBeDefined();

    const pauseBtn = within(dialog).getByRole('button', { name: /Duraklat/i });
    fireEvent.click(pauseBtn);
    const playBtn = within(dialog).getByRole('button', { name: /Oynat/i });
    expect(playBtn).toBeDefined();
    fireEvent.click(playBtn);
    expect(within(dialog).getByRole('button', { name: /Duraklat/i })).toBeDefined();

    const resetBtn = within(dialog).getByRole('button', { name: /Sıfırla/i });
    fireEvent.click(resetBtn);
    expect(within(dialog).getByText('%0')).toBeDefined();

    const removeSaltBridgeBtn = within(dialog).getByRole('button', {
      name: /Tuz Köprüsünü Çıkar/i
    });
    fireEvent.click(removeSaltBridgeBtn);
    expect(
      within(dialog).getByText(/Tuz köprüsü çıkarıldığında devre tamamlanamaz/i)
    ).toBeDefined();
    const restoreSaltBridgeBtn = within(dialog).getByRole('button', {
      name: /Tuz Köprüsünü Tak/i
    });
    fireEvent.click(restoreSaltBridgeBtn);
    expect(
      within(dialog).queryByText(/Tuz köprüsü çıkarıldığında devre tamamlanamaz/i)
    ).toBeNull();

    // 5. Diğer sahnelere geçiş (Bohr, Gazlar, Titrasyon)
    fireEvent.click(within(sidebar).getByText('Bohr Atom Modeli & Kuantum Orbitalleri'));
    expect(
      within(dialog).getByText(/Bohr Foton Geçişleri & Küresel Simetri/i)
    ).toBeDefined();

    fireEvent.click(within(sidebar).getByText('Gaz Yasaları & Graham Difüzyonu'));
    expect(
      within(dialog).getByText(/Gazların Kinetik Teorisi & Difüzyon Yasaları/i)
    ).toBeDefined();

    fireEvent.click(within(sidebar).getByText('Asit–Baz Nötralleşme & Titrasyon'));
    expect(
      within(dialog).getByText(/Asit–Baz Nötralleşme & Titrasyon Eğrisi/i)
    ).toBeDefined();

    // 6. "🎯 Bu Konunun Testini Çöz" ilgili konunun testini başlatır (Titrasyon -> Gazlar, Çözeltiler & Asit-Baz Dengesi)
    fireEvent.click(
      within(dialog).getByRole('button', { name: /🎯 Bu Konunun Testini Çöz/i })
    );
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByText(/Gazlar, Çözeltiler & Asit-Baz Dengesi/)).toBeDefined();
    const choicesGroup = screen.getByRole('group', { name: /Seçenekler/i });
    expect(choicesGroup.querySelectorAll('button.opt').length).toBe(4);
  });

  it('supports clicking anywhere on topic/studio cards, universal Escape step-back navigation, modal keyboard guards, and showTable preference', () => {
    const { container } = render(<App />);

    // 1. Konu kartının alt kısmına ("Seçmek için tıkla") basıldığında da konu seçilmeli
    const compoundCard = screen
      .getByText('Yaygın Bileşikler')
      .closest('article.topic-card') as HTMLElement;
    expect(compoundCard).not.toBeNull();
    const bottomFooter = compoundCard.querySelector('.topic-footer') as HTMLElement;
    expect(bottomFooter).not.toBeNull();
    fireEvent.click(bottomFooter);
    expect(
      screen.getByRole('heading', { name: /Yaygın Bileşikler Ayarları/i })
    ).toBeDefined();
    expect(compoundCard.classList.contains('selected')).toBe(true);

    // "📖 İncele" butonuna basıldığında TopicReferenceModal açılır ve Escape ile kapanır
    const inspectBtn = within(compoundCard).getByRole('button', { name: /📖 İncele/i });
    fireEvent.click(inspectBtn);
    expect(screen.getByRole('dialog')).toBeDefined();

    // Modal açıkken arka plandaki '0' kısayolu Periyodik Tablo çekmecesini açmamalı
    fireEvent.keyDown(window, { key: '0' });
    expect(container.querySelector('.setup-periodic-drawer')).toBeNull();

    // Escape ile TopicReferenceModal kapanır
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();

    // 2. Stüdyo kartının gövdesine (açıklama metnine) tıklamak ilgili stüdyo modalını açmalı ve Escape ile kapanmalı
    const trendsDesc = screen.getByText(/Soldan sağa & yukarıdan aşağıya eğilimleri ve istisnaları keşfet/i);
    fireEvent.click(trendsDesc);
    const trendsDialog = screen.getByRole('dialog');
    expect(
      within(trendsDialog).getByRole('button', { name: /Konu Anlatımı & Keşif Rehberi/i })
    ).toBeDefined();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();

    // Püf Noktaları modalı da kart açıklamasına basılınca açılıp Escape ile kapanmalı
    fireEvent.click(screen.getByText(/DeDen TRabzonlu mu, Zengin Pabuçlu, Asit\/Baz bulma kuralları/i));
    expect(screen.getByRole('dialog')).toBeDefined();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();

    // Setup periyodik tablo çekmecesi '0' ile açılır ve Escape ile kapanır
    fireEvent.keyDown(window, { key: '0' });
    expect(container.querySelector('.setup-periodic-drawer')).not.toBeNull();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(container.querySelector('.setup-periodic-drawer')).toBeNull();

    // 3. Element testinde showTable tercihi kapatıldığında test içinde #pt-card başlangıçta kapalı olmalı
    const elementCard = screen
      .getByText('İlk 36 Element')
      .closest('article.topic-card') as HTMLElement;
    fireEvent.click(elementCard.querySelector('.topic-footer') as HTMLElement);

    const showTableCheckbox = screen.getByRole('checkbox', {
      name: /Test esnasında periyodik tabloyu göster/i
    }) as HTMLInputElement;
    if (showTableCheckbox.checked) {
      fireEvent.click(showTableCheckbox);
    }
    expect(showTableCheckbox.checked).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: /Testi Başlat/i }));
    expect(screen.getByRole('button', { name: /Bitir/i })).toBeDefined();
    expect(container.querySelector('#pt-card')).toBeNull();

    // QuizScreen -> Escape -> ResultScreen -> Escape -> SetupScreen
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: /Ayarlara dön/i })).toBeDefined();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: /Testi Başlat/i })).toBeDefined();
  });

  it('filters compound_naming by ionic-only, covalent-only, presets, multi-select custom chips, and CompoundBuilder quick launch', () => {
    render(<App />);

    // 1. Sistematik Bileşik Adlandırma (IUPAC) konusunu seç
    fireEvent.click(screen.getByText('Sistematik Bileşik Adlandırma (IUPAC)'));
    expect(
      screen.getByRole('heading', { name: /Sistematik Bileşik Adlandırma \(IUPAC\) Ayarları/i })
    ).toBeDefined();

    // Varsayılan kapsam: Karışık (69 bileşik)
    const presetGroup = screen.getByRole('group', {
      name: /Adlandırma hazır çalışma paketleri/i
    });
    const chipsGroup = screen.getByRole('group', {
      name: /Adlandırma alt konu grupları/i
    });
    expect(within(presetGroup).getByRole('button', { name: /Karışık \(Tümü\)/i }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByText(/69 bileşik · Karışık/i)).toBeDefined();

    // 2. "Sadece İyonikler (Tümü)" seçilince sadece 42 iyonik seçili olur
    fireEvent.click(within(presetGroup).getByRole('button', { name: /Sadece İyonikler \(Tümü\)/i }));
    expect(screen.getByText(/42 bileşik · Sadece İyonikler \(Tümü\)/i)).toBeDefined();
    expect(within(chipsGroup).getByRole('button', { name: /Sabit İyonik/i }).getAttribute('aria-pressed')).toBe('true');
    expect(within(chipsGroup).getByRole('button', { name: /Romen Rakamlı İyonik/i }).getAttribute('aria-pressed')).toBe('true');
    expect(within(chipsGroup).getByRole('button', { name: /Çok Atomlu Kökler/i }).getAttribute('aria-pressed')).toBe('true');
    expect(within(chipsGroup).getByRole('button', { name: /Kovalent Ametaller/i }).getAttribute('aria-pressed')).toBe('false');
    expect(within(chipsGroup).getByRole('button', { name: /Asit & Bazlar/i }).getAttribute('aria-pressed')).toBe('false');

    // 3. Özel çoklu seçim ile "Romen Rakamlı İyonik" kapatıldığında 28 bileşiğe düşer ve "Temel İyon + Kök İyonlar" preset'i aktifleşir
    fireEvent.click(within(chipsGroup).getByRole('button', { name: /Romen Rakamlı İyonik/i }));
    expect(screen.getByText(/28 bileşik · Temel İyon \+ Kök İyonlar/i)).toBeDefined();

    // 4. "Sadece Kovalent (Ametaller)" seçilince soru sayısı Tümü (16) havuzuna göre güncellenir ve quiz sadece kovalent sorar
    fireEvent.click(within(presetGroup).getByRole('button', { name: /Sadece Kovalent \(Ametaller\)/i }));
    expect(screen.getByText(/16 bileşik · Sadece Kovalent \(Ametaller\)/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Tümü \(16\)/i })).toBeDefined();

    // En az 1 grup aktif kalmalı: son aktif chip kapatılamaz
    const covChip = within(chipsGroup).getByRole('button', { name: /Kovalent Ametaller/i });
    fireEvent.click(covChip);
    expect(covChip.getAttribute('aria-pressed')).toBe('true');

    // Çalışma kartları modalında da grup filtresi çalışmalı
    fireEvent.click(screen.getByRole('button', { name: /📖 Konu Listesini İncele/i }));
    const refDialog = screen.getByRole('dialog');
    fireEvent.click(within(refDialog).getByRole('button', { name: /🔗 Sadece Kovalent/i }));
    expect(within(refDialog).getByText('16')).toBeDefined();
    fireEvent.keyDown(window, { key: 'Escape' });

    // 5. Quiz başlat -> gelen soru mutlaka Kovalent Bileşikler kategorisinden olmalı
    fireEvent.click(screen.getByRole('button', { name: /Testi Başlat/i }));
    expect(screen.getByText(/Kovalent Bileşikler \(Latince Ekler\) ·/)).toBeDefined();

    // Setup'a dön ve Atölye içinden "Sadece İyonikleri Test Et" ile başlat
    fireEvent.keyDown(window, { key: 'Escape' });
    fireEvent.keyDown(window, { key: 'Escape' });
    fireEvent.click(
      screen.getByRole('button', { name: /İyon Çaprazlama & Adlandırma Atölyesini Aç/i })
    );
    const builderDialog = screen.getByRole('dialog');
    fireEvent.click(within(builderDialog).getByRole('button', { name: /Sadece İyonikleri Test Et \(42\)/i }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByText(/(Sabit Değerlikli İyonik|Değişken Değerlikli \(Romen Rakamlı\)|Çok Atomlu Kökler) ·/)).toBeDefined();
  });
});
