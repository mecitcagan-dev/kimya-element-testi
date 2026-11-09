import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../src/App';

describe('App Flow & Compound Türsüz Mode', () => {
  it('allows user to select Bileşik test, switch to Türsüz and Seçenekli mode, and solve without category', () => {
    render(<App />);

    // 1. Setup screen: switch to Bileşik tab
    const compoundTab = screen.getByRole('tab', { name: /Bileşik/i });
    fireEvent.click(compoundTab);

    expect(screen.getByText('Bileşik Testi')).toBeDefined();

    // 2. Click "Türsüz (Yalnızca Formül & Ad)" button
    const tursuzBtn = screen.getByRole('button', { name: /Türsüz/i });
    fireEvent.click(tursuzBtn);
    expect(tursuzBtn.getAttribute('aria-pressed')).toBe('true');

    // 3. Click "Seçenekli (Çoktan Seçmeli)" button
    const choiceBtn = screen.getByRole('button', { name: /Seçenekli/i });
    fireEvent.click(choiceBtn);
    expect(choiceBtn.getAttribute('aria-pressed')).toBe('true');

    // 4. Start the quiz
    const startBtn = screen.getByRole('button', { name: /Testi Başlat/i });
    fireEvent.click(startBtn);

    // 5. In testing screen: verify category grid is NOT rendered
    expect(screen.queryByText(/1–4 tuşları/i)).toBeNull();
    expect(screen.queryByText(/⌥1–4 tuşları/i)).toBeNull();

    // 6. 4 choices are rendered
    const choicesGroup = screen.getByRole('group', { name: /Seçenekler/i });
    expect(choicesGroup).toBeDefined();
    const optButtons = choicesGroup.querySelectorAll('button.opt');
    expect(optButtons.length).toBe(4);

    // 7. Pick the first option
    fireEvent.click(optButtons[0]);
    expect(optButtons[0].classList.contains('on')).toBe(true);

    // 8. Submit the answer
    const submitBtn = screen.getByRole('button', { name: /Gönder/i });
    fireEvent.click(submitBtn);

    // 9. Feedback appears without asking for a category!
    expect(screen.queryByText(/Lütfen bir tür\/kategori seçin/i)).toBeNull();
    const feedbackTitle = screen.getByText(/Doğru!|Yanlış/i);
    expect(feedbackTitle).toBeDefined();

    // 10. Advance to next question
    const nextBtn = screen.getByRole('button', { name: /Sonraki|Sonuçları Gör/i });
    fireEvent.click(nextBtn);
  });
});
