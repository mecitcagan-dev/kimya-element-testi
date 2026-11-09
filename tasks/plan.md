# Uygulama Planı: Kimya Element & Bileşik Testi React Geçişi ve Türsüz/Seçenekli Modlar

## Hedef ve Kapsam
Mevcut vanilla JS uygulamasını modern React 19 + TypeScript + Vite mimarisine taşırken:
- Bileşik testlerine "Türsüz Mod" seçeneği ekleme (tür seçme zorunluluğu olmadan pratik).
- Bileşik testlerinde "Seçenekli Mod" (4 şıklı soru) desteğini mükemmelleştirme.
- Öğrenci dostu hızlı klavye kontrolleri ve zayıf nokta analizi sağlama.
- İleride eklenebilecek konular için modüler zemin oluşturma (ancak şu an YALNIZCA Element ve Bileşik konuları yer alacaktır).

## Mimari ve Bağımlılık Grafiği
```
types/ (chemistry.ts, quiz.ts)
    │
    ├── data/ (elements.ts, compounds.ts)
    │
    ├── utils/ (text.ts, random.ts, storage.ts)
    │       │
    │       └── engine/ (quizEngine.ts, statsEngine.ts)
    │               │
    │               ├── hooks/ (useQuizSession.ts, useKeyboard.ts)
    │               │       │
    │               │       └── components/ (Setup, Quiz, Feedback, Result, PeriodicTable)
    │               │
    │               └── tests/ (text.test.ts, quizEngine.test.ts, statsEngine.test.ts)
```

## Dikey Dilimler (Vertical Slices)
1. **Dilim 1: Altyapı ve Veri Modülü (Foundation & Data)**
   - Vite + React + TypeScript + Vitest kurulumu
   - Tip tanımları (`types/chemistry.ts`, `types/quiz.ts`)
   - Veri dosyaları ve yardımcılar (`data/`, `utils/text.ts`, `utils/storage.ts`, `utils/random.ts`)
   - Vitest testlerinin temel yardımcılar için çalıştırılması

2. **Dilim 2: Soru ve İstatistik Motoru (Quiz & Stats Engine)**
   - `quizEngine.ts`: Soru üretimi, seçenek oluşturma (Element ve Bileşik), cevap doğrulama (türlü ve türsüz)
   - `statsEngine.ts`: Hata takibi, zayıf element/bileşik listeleme
   - Birim testleri ile motorun %100 doğrulanması

3. **Dilim 3: Kurulum Ekranı (Setup Screen)**
   - Element / Bileşik sekmesi
   - Aralık seçimi (1-18, 19-36, 1-36)
   - Soru sayısı seçimi (10, 20, Tümü, Sonsuz)
   - Soru yönü (Ad → Formül, Formül → Ad, Karışık)
   - **YENİ:** Tür Dahil mi? ("Türleri Sor" / "Türsüz - Yalnızca Ad & Formül")
   - Cevap şekli (Yazarak / Seçenekli)
   - Yanlışları tekrar sor ve periyodik tablo onay kutuları
   - Zayıf noktalarım butonu

4. **Dilim 4: Test Ekranı & Geri Bildirim (Quiz & Feedback UI)**
   - İlerleme çubuğu, sayaçlar, seri takibi
   - Soru kartı: Element sembolü veya Bileşik adı/formülü (düzgün alt simgelerle)
   - Seçenekli modda 4 seçenek (Q/W/E/R veya 1-4)
   - Yazarak modda otomatik alt simge formatlaması
   - Tür butonları: Türsüz modda gizli; türlü modda açık ve renkli
   - Geri bildirim kartı: Anında doğru/yanlış, detaylı açıklama, sonraki soruya geçiş (Enter / Space)

5. **Dilim 5: Sonuç Ekranı & Periyodik Tablo (Results & Reference)**
   - Başarı yüzdesi, isim/tür doğruluk oranları, en iyi seri
   - Yanlış yapılan soruların detaylı listesi ve tekrar çözme imkanı ("Sadece yanlışları çalış")
   - Periyodik tablo modal/görünümü ('0' kısayoluyla her an açılıp kapanabilir)
   - Bileşikler referans listesi / hızlı çalışma tablosu

6. **Dilim 6: Klavye Entegrasyonu & Bütünleştirme (Integration & Polish)**
   - Masaüstü için tam klavye kısayolları (Q, W, E, R, 1-8, Enter, Space, Esc, 0)
   - Mobil ve dokunmatik optimizasyonları
   - Derleme (`npm run build`) ve test (`npm test`) doğrulamaları
