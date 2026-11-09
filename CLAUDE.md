# Kimya Atom - Element & Bileşik Testi

Bu proje kimya öğrencileri için ilk 36 element ve yaygın bileşikleri hızlı, verimli ve klavye dostu biçimde öğrenmeyi sağlayan modern bir web test uygulamasıdır.

## ⚠️ Zorunlu Agent Skills Rehberi Kuralı

Bu depoda çalışan her yapay zeka ajanı, **HER İŞLEMDE** `/Users/mecitmac/.gemini/config/plugins/agent-skills/skills/using-agent-skills/SKILL.md` meta-becerisini ve ilgili alt becerileri (agent-skills) takip etmek **ZORUNDADIR**. Kullanıcının bunu her seferinde hatırlatmasına gerek yoktur.

### Temel Çalışma Davranışları (Non-Negotiable)
1. **Varsayımları Açığa Çıkar (Surface Assumptions):** Kod yazmadan önce gereksinim, mimari ve kapsam varsayımlarını açıkça belirt.
2. **Belirsizlikleri Yönet (Manage Confusion):** Çelişkili veya eksik gereksinimlerde tahmin yürütme; sor ve netleştir.
3. **Gerektiğinde Karşı Çık (Push Back When Warranted):** Kötü tasarım veya gereksiz karmaşıklık gördüğünde alternatif sun.
4. **Sadelik İlkesi (Enforce Simplicity):** Gereksiz soyutlama ve kütüphanelerden kaçın. En yalın, okunabilir çözümü uygula.
5. **Kapsam Disiplini (Scope Discipline):** Sadece istenen kimya konularını (Element & Bileşik) kapsa; istenmeyen yeni kimya konuları ekleme.
6. **Doğrula, Tahmin Etme (Verify, Don't Assume):** Her değişiklik testlerle ve derleme (build) çıktısıyla doğrulanmalıdır.

### Beceri Yaşam Döngüsü (Agent Skills Lifecycle)
- Yeni özellik/büyük değişiklik: `spec-driven-development` (`SPEC.md`)
- Görev planlama: `planning-and-task-breakdown` (`tasks/plan.md`, `tasks/todo.md`)
- Arayüz geliştirme: `frontend-ui-engineering`
- Arayüz ve tip tasarımı: `api-and-interface-design`
- Adım adım uygulama: `incremental-implementation`
- Test geliştirme: `test-driven-development` (Vitest)
- Kod inceleme ve kalite: `code-review-and-quality`
- Kod sadeleştirme: `code-simplification`
- Dokümantasyon: `documentation-and-adrs`

---

## Teknoloji Yığını (Tech Stack)
- **Framework:** React 19 / Vite
- **Dil:** TypeScript (Strict mode)
- **Stil:** Modern CSS / Vanilla CSS Variables & Utility sınıfları (Hızlı, hafif, koyu tema uyumlu)
- **Test:** Vitest (`npm test`)
- **Paket Yöneticisi:** npm

## Komutlar (Commands)
- Geliştirme Sunucusu: `npm run dev`
- Derleme: `npm run build`
- Önizleme: `npm run preview`
- Testleri Çalıştır: `npm test`
- Tip Denetimi: `npm run typecheck`

## Proje Yapısı (Project Structure)
```
kimyaatom/
├── CLAUDE.md              # Kalıcı ajan talimatları ve standartlar
├── SPEC.md                # Özellik ve sistem şartnamesi
├── tasks/
│   ├── plan.md            # Uygulama planı
│   └── todo.md            # Görev listesi ve kontrol noktaları
├── src/
│   ├── data/              # Element ve bileşik verileri (saf veri & sabitler)
│   ├── types/             # TypeScript tip tanımları
│   ├── utils/             # Metin formatlama, formül işleme, rastgele seçim, depolama
│   ├── state/             # Zustand veya React Context ile oturum & istatistik durumu
│   ├── hooks/             # Klavye kısayolları ve ses/efekt kancaları
│   ├── components/        # React bileşenleri
│   │   ├── Setup/         # Test kurulum ekranı (seçenekler, sekmeler, modlar)
│   │   ├── Quiz/          # Soru kartı, seçenekler, tür butonları, giriş alanı
│   │   ├── Feedback/      # Doğru/Yanlış geri bildirim kartı
│   │   ├── Result/        # Sonuç ekranı, istatistikler ve analiz
│   │   ├── PeriodicTable/ # Periyodik tablo modal/görünümü
│   │   └── Common/        # Buton, Badge, FormulaRenderer ortak bileşenleri
│   ├── App.tsx            # Ana uygulama sarmalayıcısı
│   └── main.tsx           # Giriş noktası
├── tests/                 # Vitest birim ve entegrasyon testleri
└── index.html             # HTML şablonu
```

## Kod Standartları (Code Conventions)
- Fonksiyonel bileşenler ve React Hook'ları kullanılmalıdır.
- Tüm veri yapıları TypeScript `interface` veya `type` ile kesin tiplendirilmelidir.
- Kimyasal formüllerde alt simgeler (`sub`) erişilebilir ve doğru formatta render edilmelidir ($H_2O, Ca(OH)_2$).
- Klavye kısayolları masaüstü kullanıcıları için kesintisiz çalışmalı (1-8, QWER, Enter, Space, Esc, 0).
- Mobil ve dokunmatik cihazlarda dokunmatik hedefler minimum 44px olmalı ve yazma yerine seçenekli mod kolayca seçilebilmelidir.

## Sınırlar (Boundaries)
- **Her Zaman Yap:** Kod değişikliklerinden sonra testleri ve derlemeyi çalıştır, klavye kısayollarının çalıştığını doğrula, localStorage saklama yapısının geriye uyumluluğunu gözet.
- **Önce Sor:** Kapsam dışı yeni bir kimya konusu ekleme (şu an sadece Element ve Bileşik vardır), harici ağır kütüphane ekleme.
- **Asla Yapma:** `any` tipi kullanma, testleri atlama veya sessize alma, klavye kontrollerini bozma.
