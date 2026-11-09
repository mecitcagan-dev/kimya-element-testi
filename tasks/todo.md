# Görev Listesi (Tasks / Todo)

## Dilim A: Veri ve Tip Katmanı
- [x] Task A.1: `src/types/topics.ts` oluştur ve birleşik konu ve soru tiplerini tanımla.
- [x] Task A.2: `src/data/` altında 8 yeni konu veri setini oluştur.
- [x] Task A.3: `src/data/topics.ts` konu kayıt defterini (registry) oluştur.
- [x] Checkpoint A: Tüm veri setleri hatasız yükleniyor ve birim testler geçiyor.

## Dilim B: Çoklu Konu Motoru (Quiz & Stats Engine)
- [x] Task B.1: `src/engine/quizEngine.ts` dosyasını tüm konuları destekleyecek şekilde genişlet.
- [x] Task B.2: `src/engine/statsEngine.ts` dosyasını her konu ID'si için dinamik istatistik ve zayıf nokta takibi yapacak şekilde güncelle.
- [x] Checkpoint B: Her konu için soru ve seçenek üretimi birim testlerle doğrulanır.

## Dilim C: Kurulum Arayüzü (TYT / AYT Kategori Sekmeleri & Konu Kartları)
- [x] Task C.1: `SetupScreen.tsx` ekranına `TYT + AYT`, `TYT`, `AYT` ana kategori filtre sekmelerini ekle.
- [x] Task C.2: Seçili kategoriye ait konuları listeleyen interaktif konu seçim ızgarasını (Topic Grid) uygula.
- [x] Task C.3: Her konu için "📖 Konu Özetini İncele" çalışma modalını dinamik hale getir.
- [x] Checkpoint C: Kullanıcı sınav kategorisini seçip istediği konuyu başlatabiliyor ve referans listesini inceleyebiliyor.

## Dilim D: Test & Geri Bildirim & Sonuç Entegrasyonu
- [x] Task D.1: `QuestionCard.tsx` ve `FeedbackCard.tsx` bileşenlerini yeni soru formatları için uyarla.
- [x] Task D.2: `ResultScreen.tsx` bileşenini konuya göre dinamik yanlış analizini gösterecek şekilde güncelle.
- [x] Task D.3: Klavye kısayollarını tüm konularda sorunsuz çalıştır.
- [x] Checkpoint D: Testler tam akışta çözülüyor ve sonuç ekranında zayıf noktalar listeleniyor.

## Dilim E: Testler, Doğrulama ve Canlı Yayın
- [x] Task E.1: Tüm konuları kapsayan Vitest entegrasyon testlerini yaz ve çalıştır.
- [x] Task E.2: `npm run typecheck`, `npm test` ve `npm run build` kontrollerini tamamla.
- [x] Task E.3: `npm run deploy` ile GitHub Pages canlısına yayınla.
