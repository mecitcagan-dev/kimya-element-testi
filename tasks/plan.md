# Uygulama Planı: TYT & AYT Kimya Çoklu Modül ve Kategori Sistemi

## Hedef ve Kapsam
Uygulamayı TYT, AYT ve TYT+AYT sınav kategorilerine ayırmak; ÖSYM ve MEB müfredatında yer alan 10 kilit ezber konusunu (Elementler, Yaygın Bileşikler, Kökler/Çok Atomlu İyonlar, Piktogramlar, Lab Malzemeleri, İndikatörler, Simyacılar, Değişken Değerlikler, Organik Fonksiyonel Gruplar, Yaygın Organik Bileşikler) oyunlaştırılmış test sistemine entegre etmek.

## Dikey Dilimler (Vertical Slices)

### Dilim A: Veri ve Tip Katmanı
- [ ] Task A.1: `src/types/topics.ts` içerisinde birleşik konu ve soru tiplerini tanımla.
- [ ] Task A.2: `src/data/` altında 8 yeni konu veri setini oluştur:
  - `polyatomicIons.ts` (Kökler: $NH_4^+, SO_4^{2-}, NO_3^-, CO_3^{2-}, PO_4^{3-}$ vb.)
  - `safetyPictograms.ts` (9 GHS Güvenlik Piktogramı)
  - `labEquipment.ts` (18 Laboratuvar Malzemesi)
  - `indicators.ts` (8 Asit-Baz İndikatörü ve Renkleri)
  - `alchemists.ts` (7 Önemli Simyacı ve Kimyacı)
  - `variableValence.ts` (Değişken Değerlikli Metaller)
  - `functionalGroups.ts` (13 Organik Fonksiyonel Grup)
  - `organicCommon.ts` (21 Yaygın Organik Bileşik)
- [ ] Task A.3: `src/data/topics.ts` konu kayıt defterini (registry) oluştur.
- [ ] Checkpoint A: Tüm veri setleri hatasız yükleniyor ve birim testler geçiyor.

### Dilim B: Çoklu Konu Motoru (Quiz & Stats Engine)
- [ ] Task B.1: `src/engine/quizEngine.ts` dosyasını tüm konuları destekleyecek şekilde genişlet.
- [ ] Task B.2: `src/engine/statsEngine.ts` dosyasını her konu ID'si için dinamik istatistik ve zayıf nokta takibi yapacak şekilde güncelle.
- [ ] Checkpoint B: Her konu için soru ve seçenek üretimi birim testlerle doğrulanır.

### Dilim C: Kurulum Arayüzü (TYT / AYT Kategori Sekmeleri & Konu Kartları)
- [ ] Task C.1: `SetupScreen.tsx` ekranına `TYT + AYT`, `TYT`, `AYT` ana kategori filtre sekmelerini ekle.
- [ ] Task C.2: Seçili kategoriye ait konuları listeleyen interaktif konu seçim ızgarasını (Topic Grid) uygula.
- [ ] Task C.3: Her konu için "📖 Konu Özetini İncele" çalışma modalını dinamik hale getir.
- [ ] Checkpoint C: Kullanıcı sınav kategorisini seçip istediği konuyu başlatabiliyor ve referans listesini inceleyebiliyor.

### Dilim D: Test & Geri Bildirim & Sonuç Entegrasyonu
- [ ] Task D.1: `QuestionCard.tsx` ve `FeedbackCard.tsx` bileşenlerini yeni soru formatları (üst simgeli iyonlar, piktogramlar, lab aletleri vb.) için uyarla.
- [ ] Task D.2: `ResultScreen.tsx` bileşenini konuya göre dinamik yanlış analizini gösterecek şekilde güncelle.
- [ ] Task D.3: Klavye kısayollarını (1-8, QWER, Enter, Space, Esc, 0) tüm konularda sorunsuz çalıştır.
- [ ] Checkpoint D: Testler tam akışta çözülüyor ve sonuç ekranında zayıf noktalar listeleniyor.

### Dilim E: Testler, Doğrulama ve Canlı Yayın
- [ ] Task E.1: Tüm konuları kapsayan Vitest entegrasyon testlerini yaz ve çalıştır.
- [ ] Task E.2: `npm run typecheck`, `npm test` ve `npm run build` kontrollerini tamamla.
- [ ] Task E.3: `npm run deploy` ile GitHub Pages canlısına yayınla.
