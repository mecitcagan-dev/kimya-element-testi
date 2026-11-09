# Görev Listesi (Tasks / Todo)

## Dilim 1: Altyapı ve Veri Modülü
- [x] Task 1.1: `package.json`, `tsconfig.json`, `vite.config.ts` yapılandır ve bağımlılıkları yükle.
- [x] Task 1.2: TypeScript tip tanımlarını (`src/types/chemistry.ts`, `src/types/quiz.ts`) oluştur.
- [x] Task 1.3: Veri ve yardımcı modülleri (`src/data/elements.ts`, `src/data/compounds.ts`, `src/utils/text.ts`, `src/utils/random.ts`, `src/utils/storage.ts`) taşı ve test et.
- [x] Checkpoint 1: Vitest ile metin ve yardımcı fonksiyon testleri geçiyor mu?

## Dilim 2: Soru ve İstatistik Motoru
- [x] Task 2.1: `src/engine/quizEngine.ts` modülünü yaz (seçenek üretici, türlü/türsüz cevap değerlendirme, soru çekme kuyruğu).
- [x] Task 2.2: `src/engine/statsEngine.ts` modülünü yaz (localStorage senkronu, zayıf tespit, oturum istatistikleri).
- [x] Task 2.3: `tests/quizEngine.test.ts` ve `tests/statsEngine.test.ts` testlerini yazıp çalıştır.
- [x] Checkpoint 2: Motorun tüm birim testleri (özellikle türsüz bileşik kontrolü ve seçenekli mod) yeşil mi?

## Dilim 3: Kurulum Ekranı (Setup Screen)
- [x] Task 3.1: SegmentGroup ve SetupScreen bileşenlerini yaz.
- [x] Task 3.2: Bileşik testine "Tür Dahil mi?" ("Türlü" vs "Türsüz") ve "Cevap Şekli" ("Yazarak" vs "Seçenekli") ayarlarını entegre et.
- [x] Checkpoint 3: Kurulum ekranında ayarlar doğru seçiliyor ve state'e aktarılıyor mu?

## Dilim 4: Test Ekranı & Soru Kartı & Geri Bildirim
- [x] Task 4.1: QuestionCard, OptionGrid ve CategoryGrid bileşenlerini uygula. Türsüz modda kategori butonlarının otomatik gizlenmesini sağla.
- [x] Task 4.2: FeedbackCard bileşenini uygula (Türsüz modda sadece isim/formül başarısını göster, türlü modda ikisini de göster).
- [x] Task 4.3: useQuizSession kancasını bileşenlere bağla.
- [x] Checkpoint 4: Hem türlü hem türsüz modda sorular çözülebiliyor, seçenekli modda QWER/tık ile yanıtlanabiliyor mu?

## Dilim 5: Sonuç Ekranı, Periyodik Tablo ve Referans Tablosu
- [x] Task 5.1: ResultScreen bileşenini uygula (Türsüz modda kategori satırını gizle, yanlışları listele, "Sadece Yanlışları Çalış" butonu).
- [x] Task 5.2: PeriodicTable ve Bileşik Referans Listesi bileşenlerini uygula ('0' tuşu veya butonla açılıp kapansın).
- [x] Checkpoint 5: Sonuç ekranı ve referans modalı doğru çalışıyor mu?

## Dilim 6: Klavye Kontrolleri, Doğrulama ve Paketleme
- [x] Task 6.1: `useKeyboard` kancası ile tüm kısayolları (1-8, QWER, Enter, Space, Esc, 0) pürüzsüz bağla.
- [x] Task 6.2: Bütün `npm run typecheck`, `npm test` ve `npm run build` kontrollerini yap.
- [x] Checkpoint 6: Derleme hatasız çıkıyor, testler %100 başarılı, kullanıcı deneyimi akıcı mı?
