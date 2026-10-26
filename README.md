# Kimya Element Testi

İlk 36 elementin sembolünü görüp Türkçe adını ve türünü (ör. alkali metal, halojen, soy gaz) yazarak test eden, tarayıcıda çalışan tek sayfalık bir uygulama. Sembol ekranda gösterilir; adı yazıp 1–8 tuşuyla türü seçersin ve Enter ile gönderirsin. Yanlış cevaplar birkaç soru sonra yeniden sorulur.

**Kısayollar**

- Kurulum: `Q` `W` `E` aralık (1–18, 19–36, tümü) · `A` `S` `D` `F` soru sayısı · `R` yanlışları tekrar sor · `Z` zayıf noktalarım · `Enter` başlat
- Test: `1`–`8` tür seç · `Enter` gönder, sonra `Enter` veya `Space` ile ilerle · `Esc` bitir
- Her ekranda `0`: periyodik tabloyu gizle veya göster

**Dosya yapısı**

- `index.html`: yalnızca işaretleme; `css/` dosyalarını ve `js/main.js` modülünü yükler
- `css/`: `base.css` (renkler, düğmeler, kartlar), `setup.css`, `quiz.css`, `periodic-table.css`, `result.css`
- `js/data/`: element ve bileşik verileri · `js/utils/`: yardımcılar · `js/state/`: durum ve hata istatistikleri
- `js/quiz/`: oturum akışı, cevap değerlendirme, klavye · `js/ui/`: kurulum, test, sonuç ve periyodik tablo ekranları
- `js/app.js` düğmeleri bağlayıp uygulamayı başlatır. ES modülleri `file://` ile açılmaz; yerelde `python3 -m http.server` gibi bir sunucu kullanın.

**Canlı site:** https://kimya-element-testi.vercel.app
**GitHub Pages:** https://mecitcagan-dev.github.io/kimya-element-testi/
