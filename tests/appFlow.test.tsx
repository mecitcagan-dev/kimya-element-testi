import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../src/App';

describe('App Flow & Multi-Topic System', () => {
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
    const allTab = screen.getByRole('button', { name: /Tümü/i });
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
    const allTab = screen.getByRole('button', { name: /Tümü/i });
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
});
