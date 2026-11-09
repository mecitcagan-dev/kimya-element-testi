# Spec: Kimya Element & Bileşik Testi Uygulaması Revizyonu

## 1. Objective
Kimya öğrencileri (özellikle TYT/AYT ve lise kimya müfredatı) için ilk 36 element ve yaygın bileşikleri öğreten web uygulamasının React + Vite + TypeScript ile modernize edilmesi, aşağıdaki yeni özelliklerin kazandırılması:
1. **Bileşiklerde Türsüz Mod (Tür Zorunluluğu Olmadan Çözebilme):** Öğrencinin asit/baz/tuz/oksit ayrımı yapmadan yalnızca formül ve yaygın ad eşleştirmesine odaklanabilmesi.
2. **Bileşiklerde Tam Seçenekli (Multiple-Choice) Mod:** Bileşik sorularında yazma zorunluluğu olmadan 4 şıktan birini seçerek (Q, W, E, R veya 1, 2, 3, 4 tuşlarıyla / dokunarak) hızlı pratik yapabilmesi.
3. **Öğrenci Dostu Deneyim:** Zayıf noktaları tespit etme, yanlış yapılan soruları tekrar sorma, formülleri alt simgeli ($H_2SO_4$, $Ca(OH)_2$) şık ve okunaklı biçimde sunma, klavye kısayolları ve kesintisiz odak.
4. **Genişletilebilir Mimari:** Yeni kimya konuları eklenmeden yalnızca element ve bileşik konularına odaklanan, ancak ileride yeni kimya test modülleri eklemeyi kolaylaştıran modüler TypeScript mimarisi.

## 2. Tech Stack
- **Framework:** React 19 / Vite 6
- **Dil:** TypeScript 5.7+ (Strict Mode)
- **Stil:** CSS Variables & Koyu Tema odaklı modern UI (mevcut tasarım diline sadık kalarak daha temiz ve yüksek performanslı)
- **Test:** Vitest (Birim testleri, soru motoru testleri, cevap doğrulama testleri)

## 3. Commands
- `npm run dev`: Geliştirme sunucusunu başlatır (`localhost:5173`)
- `npm run build`: TypeScript derlemesi yapar ve `dist/` klasörüne statik varlıkları üretir
- `npm run preview`: Üretilen build'i yerel sunucuda önizler
- `npm test`: Vitest test paketini çalıştırır
- `npm run typecheck`: `tsc --noEmit` ile tüm tipleri doğrular

## 4. Project Structure
```
kimyaatom/
├── CLAUDE.md
├── SPEC.md
├── tasks/
│   ├── plan.md
│   └── todo.md
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── index.html
├── src/
│   ├── types/
│   │   ├── chemistry.ts      # Element, Compound, Category tip tanımları
│   │   └── quiz.ts           # QuizConfig, Question, SessionState, Stat tipleri
│   ├── data/
│   │   ├── elements.ts       # 36 Element verisi, periyot, grup, kategoriler
│   │   └── compounds.ts      # 18 Yaygın bileşik verisi, türler, formüller
│   ├── utils/
│   │   ├── text.ts           # Türkçe harf normalizasyonu, formül formatlayıcı (H2O -> H₂O)
│   │   ├── random.ts         # shuffle, rastgele sayı üreticisi
│   │   └── storage.ts        # localStorage yardımcıları (istatistik ve ayar saklama)
│   ├── engine/
│   │   ├── quizEngine.ts     # Soru oluşturma, seçenek üretme, cevap değerlendirme
│   │   └── statsEngine.ts    # Hata geçmişi ve zayıf nokta hesaplamaları
│   ├── hooks/
│   │   ├── useQuizSession.ts # Test oturumu durum yönetimi
│   │   └── useKeyboard.ts    # Global klavye kısayolları yönetimi
│   ├── components/
│   │   ├── Setup/
│   │   │   ├── SetupScreen.tsx
│   │   │   └── SegmentGroup.tsx
│   │   ├── Quiz/
│   │   │   ├── QuizScreen.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── OptionGrid.tsx
│   │   │   └── CategoryGrid.tsx
│   │   ├── Feedback/
│   │   │   └── FeedbackCard.tsx
│   │   ├── Result/
│   │   │   └── ResultScreen.tsx
│   │   ├── PeriodicTable/
│   │   │   └── PeriodicTableModal.tsx
│   │   └── Common/
│   │       ├── FormulaText.tsx
│   │       └── KeyBadge.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
└── tests/
    ├── text.test.ts
    ├── quizEngine.test.ts
    └── statsEngine.test.ts
```

## 5. Code Style
- **İsimlendirme:** PascalCase bileşenler (`QuizScreen`), camelCase fonksiyonlar ve değişkenler (`formatFormula`), UPPER_CASE sabitler (`COMPOUNDS`).
- **Saf Fonksiyonlar:** Engine ve utils fonksiyonları DOM'dan ve yan etkilerden bağımsız saf fonksiyonlar olmalıdır.
- **Tipler:** Her prop ve fonksiyon dönüş değeri açıkça tiplendirilmelidir.
```tsx
// Örnek: FormulaText bileşeni
interface FormulaTextProps {
  formula: string;
  className?: string;
}

export function FormulaText({ formula, className }: FormulaTextProps) {
  return (
    <span className={className}>
      {formatFormulaWithSub(formula)}
    </span>
  );
}
```

## 6. Testing Strategy
- Vitest ile:
  1. `text.ts`: Türkçe karakter dönüştürme, formül karşılaştırma ve alt simge üretimi.
  2. `quizEngine.ts`: Soru çekme, seçenek üretimi (çeldiricilerin benzersizliği ve doğruluğu), türsüz modda cevap kontrolü, tür içeren modda cevap kontrolü.
  3. `statsEngine.ts`: Zayıf noktaların tespiti ve hata oranlarının doğru kaydedilmesi.

## 7. Boundaries
- **Always:**
  - Türsüz mod seçildiğinde kullanıcıdan tür istemeyi engelle, sadece formül/isim cevabını zorunlu tut.
  - Seçenekli modda klavye kısayollarını (Q, W, E, R ve 1, 2, 3, 4) destekle.
  - Mobil cihazlarda ekran kaymasını engelle, rahat tıklanabilir butonlar sağla.
- **Ask First:**
  - Yeni bir kimya konusu (örneğin mol, asit-baz çözeltileri, vb.) ekleme (Kullanıcı kesin bir dille şu an sadece element ve bileşik istedi).
- **Never:**
  - Eski çalışır vaziyetteki element test mantığını bozma.
  - Ağır CSS/UI kütüphaneleri (MUI, Ant Design vb.) ekleyerek performansı düşürme.

## 8. Success Criteria
1. Kullanıcı bileşik testini kurarken "Tür Bilgisi: Dahil / Türsüz" (veya "Tür Sorulsun mu?") seçeneğini seçebilmeli.
2. "Türsüz" seçildiğinde soru ekranında tür butonları gizlenmeli veya devre dışı olmalı; cevabı gönderirken tür zorunluluğu aranmamalı.
3. Bileşiklerde "Seçenekli" mod seçildiğinde 4 seçenek (A, B, C, D / Q, W, E, R) sunulmalı ve tek tuşla veya tıkla seçim yapılabilmeli.
4. Element testi mevcut tüm özellikleriyle (1-18, 19-36, 1-36 aralıkları, 8 kategori, periyodik tablo görünümü) eksiksiz çalışmalı.
5. Zayıf noktalar ve hata istatistikleri hem element hem bileşik için hatasız çalışmalı.
6. `npm run build` hatasız sıfır uyarı ile tamamlanmalı ve `npm test` tüm testleri geçmeli.
