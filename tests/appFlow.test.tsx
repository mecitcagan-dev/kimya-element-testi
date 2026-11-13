import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
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
});
