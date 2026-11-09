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
});
