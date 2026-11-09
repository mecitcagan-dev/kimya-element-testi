# Kimya Element & Bileşik Testi

Kimya öğrencileri (TYT, AYT ve lise kimya müfredatı) için ilk 36 element ve 18 yaygın bileşiği en hızlı ve etkili şekilde öğrenmeyi sağlayan modern, klavye dostu ve yüksek performanslı React + TypeScript web uygulaması.

## 🚀 Yeni Özellikler

1. **Bileşiklerde Türsüz Mod:** Bileşik sorularında tür (Asit/Baz/Tuz/Oksit) zorunluluğu olmadan yalnızca formül ve yaygın ad eşleştirmesine odaklanabilme.
2. **Bileşiklerde Çoktan Seçmeli (Seçenekli) Mod:** Bileşik sorularında yazma zorunluluğu olmadan 4 şıktan birini Q, W, E, R tuşlarıyla veya tıklayarak hızlıca çözebilme.
3. **Öğrenci Çalışma Listeleri:**
   - 18 Yaygın Bileşik Referans Listesi (`📖 Bileşik Listesini İncele`).
   - İlk 36 Element Periyodik Tablosu (`0` kısayolu veya butonla açılıp kapanabilir).
4. **Zayıf Noktalar & Tekrar Kuyruğu:** Yanlış yapılan sorular aralıklarla tekrar sorulur; geçmiş hatalara göre zayıf noktalar listelenir.

---

## ⌨️ Kısayollar

- **Sekmeler:** `1` Element · `2` Bileşik
- **Element Kurulumu:** `Q` `W` `E` aralık (1–18, 19–36, tümü) · `A` `S` `D` `F` soru sayısı · `X` cevap şekli (yazarak/seçenekli) · `R` yanlışları tekrar sor · `Z` zayıf noktalarım · `Enter` başlat
- **Bileşik Kurulumu:** `H` `J` `K` yön (Ad→Formül, Formül→Ad, Karışık) · `T` Türsüz mod · `Y` Türlü mod · `A` `S` `D` `F` soru sayısı · `X` cevap şekli · `Enter` başlat
- **Test:**
  - Seçenekli Mod: `Q` `W` `E` `R` şık seçimi · `1`–`8` tür seçimi (tür aktifse)
  - Yazarak Mod: Metin yazılır (bileşikte Alt+1–4 tür seçer)
  - `Enter` gönder · `Enter` veya `Space` ile sonraki soruya geç · `Esc` bitir
- **Her Ekranda `0`:** Periyodik tabloyu aç / kapat (element testinde)

---

## 🛠️ Geliştirici Komutları

```bash
# Bağımlılıkları yükle
npm install

# Yerel geliştirme sunucusu (localhost:5173)
npm run dev

# Vitest birim ve entegrasyon testlerini çalıştır
npm test

# TypeScript tip denetimi
npm run typecheck

# Üretim (production) derlemesi
npm run build
```

---

## 📁 Proje Yapısı

- `CLAUDE.md`: Proje içi yapay zeka ajanları için `using-agent-skills` talimatları ve kalite standartları
- `SPEC.md`: Şartname ve kabul kriterleri
- `tasks/`: `plan.md` ve `todo.md` uygulama adımları
- `src/types/`: Kesin TypeScript tip tanımları (`chemistry.ts`, `quiz.ts`)
- `src/data/`: 36 element ve 18 bileşik veri tabloları
- `src/utils/`: Metin normalizasyonu, formül alt simgeleri (`H₂O`), yerel depolama
- `src/engine/`: Soru, çeldirici ve istatistik hesaplama motoru
- `src/components/`: Modüler React bileşenleri (Setup, Quiz, Feedback, Result, PeriodicTable, Reference)
- `tests/`: Kapsamlı Vitest testleri
