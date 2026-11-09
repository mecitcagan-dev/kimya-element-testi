# Spec: TYT & AYT Kimya Kapsamlı Ezber Modülleri ve Kategori Mimarisi

## 1. Objective
Kimya öğrencileri için uygulamanın TYT, AYT ve TYT+AYT olmak üzere 3 ana sınav kategorisine ayrılması; her kategoride ÖSYM ve MEB müfredatında yer alan kilit ezber konularının oyunlaştırılmış, klavye dostu ve öğrenci odaklı bir modül yapısıyla sunulması.

### Kategori ve Modül Haritası:
1. **TYT + AYT (Ortak Temel Konular):**
   - `element`: İlk 36 Element (Sembol, Ad, Periyot, Grup, Kategori)
   - `compound`: Yaygın Bileşikler (Formül, Yaygın Ad, Türlü/Türsüz mod)
   - `polyatomic`: Çok Atomlu İyonlar / Kökler (Katyonlar & Anyonlar: $NH_4^+, OH^-, NO_3^-, SO_4^{2-}, CO_3^{2-}, PO_4^{3-}$, vb. - Formül, Ad, Yük)
   - `safety`: Kimya Güvenlik Piktogramları (Yanıcı, Yakıcı, Korozif, Toksik, Tahriş Edici, vb. - Sembol, Anlam, Önlem)

2. **TYT (Temel Yeterlilik Testi):**
   - `lab`: Laboratuvar Malzemeleri (Beherglas, Erlenmayer, Mezür, Büret, Pipet, Ayırma Hunisi, vb. - Şekil, İşlev, Kullanım)
   - `indicators`: Asit-Baz İndikatörleri (Turnusol, Fenolftalein, Metil Oranj, Bromtimol Mavisi - Asit/Nötr/Baz Renkleri)
   - `alchemists`: Simyadan Kimyaya / Bilim İnsanları (Empedokles, Democritus, Aristo, Cabir bin Hayyan, Ebubekir er-Razi, Robert Boyle, Lavoisier)

3. **AYT (Alan Yeterlilik Testi):**
   - `valence`: Değişken Değerlikli Metaller (Demir, Bakır, Cıva, Kalay, Kurşun, Krom, Mangan vb. - Değerlikler ve Romen Rakamı Kuralları)
   - `functional_groups`: Organik Fonksiyonel Gruplar (Alkol, Eter, Aldehit, Keton, Karboksilik Asit, Ester, Amin, Amit - Yapı, Genel Formül, Sonek)
   - `organic_common`: Yaygın Organik Bileşikler (Asetilen, Formaldehit, Aseton, Formik asit, Gliserin, Benzen, Fenol, Anilin)

## 2. Tech Stack
- **Framework:** React 19 / Vite 6
- **Dil:** TypeScript 5.7+ (Strict Mode)
- **Stil:** CSS Variables & Dark Theme UI
- **Test:** Vitest + React Testing Library

## 3. Architecture & Data Model
Unified Quiz Data Interface:
```ts
export type ExamCategory = 'all' | 'tyt_ayt' | 'tyt' | 'ayt';

export interface TopicDefinition {
  id: string;
  title: string;
  category: 'tyt_ayt' | 'tyt' | 'ayt';
  icon: string;
  description: string;
  questionCountDefault: number;
  hasTypeToggle?: boolean;      // Bileşiklerdeki gibi türlü/türsüz desteği
  directions?: { id: string; label: string; keyBadge?: string }[];
  categories?: { key: string; rgb: string }[];
}

export interface QuizItem {
  id: string | number;
  prompt: string;               // Ekranda gösterilen soru (sembol, formül, isim veya piktogram)
  promptSub?: string;           // Alt başlık (örn: "Atom No: 24" veya "Katyon")
  answer: string;               // Doğru cevap
  synonyms?: string[];          // Alternatif kabul edilen cevaplar
  category?: string;            // Tür veya kategori
  infoChips: { label: string; value: string }[];
  hint?: string;
}
```

## 4. Commands
- `npm run dev`: Geliştirme sunucusu
- `npm run build`: Production build (`dist/`)
- `npm test`: Vitest birim ve entegrasyon testleri
- `npm run typecheck`: TypeScript tip denetimi
- `npm run deploy`: GitHub Pages yayını

## 5. Testing Strategy
- Her yeni konunun veri seti (data integrity) test edilecek (boş alan yok, benzersiz ID'ler, doğru formatlama).
- Quiz motoru her 10 konuyu hatasız çeldirici ve soru üretecek şekilde test edilecek.
- Kategori sekme geçişleri (`Tümü`, `TYT + AYT`, `TYT`, `AYT`) React Testing Library ile test edilecek.
- Zayıf noktalar ve hata istatistikleri test edilecek.

## 6. Boundaries
- **Always:**
  - Mevcut Element ve Bileşik testlerinin kısayolları ve çalışma mantığı korunacak.
  - Bileşiklerdeki "Türsüz Mod" ve "Seçenekli Mod" her zaman çalışacak.
  - Her yeni konu için hızlı başvuru / inceleme modalı (`📖 Konu Listesini İncele`) sağlanacak.
- **Never:**
  - TypeScript `any` kullanma.
  - Öğrenciyi yavaşlatacak ağır kütüphaneler ekleme.
