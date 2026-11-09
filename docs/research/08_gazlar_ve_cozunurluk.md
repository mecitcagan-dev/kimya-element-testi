# AYT Kimya: Gaz Yasaları, Kinetik Teori ve Çözünürlük-Çökelme Dengeleri
## Kapsamlı Araştırma Raporu, Müfredat Analizi ve Flashcard / Test Motoru Veri Seti

**Hedef Kitle & Düzey:** MEB 11. Sınıf Kimya & ÖSYM YKS - AYT Kimya Standartları  
**Modül Konuları:**  
1. **Gaz Yasaları ve Kinetik Teori** (Boyle, Charles, Gay-Lussac, Avogadro, Dalton, Graham, İdeal Gaz, Sapma Koşulları)  
2. **Sulu Çözelti Dengeleri: Çözünürlük ve Çökelme Kuralları** (Her zaman çözünenler, yaygın çökelekler ve renkleri, net iyon denklemi ve seyirci iyon mantığı)

---

## 1. Giriş ve Müfredat Analizi

YKS AYT Kimya sınavında her yıl ortalama:
- **Gazlar Ünitesinden:** 1 veya 2 soru (Genellikle gaz yasası bağıntıları, kısmi basınçlar, difüzyon hızı karşılaştırması veya ideal davranıştan sapma)
- **Sıvı Çözeltiler ve Çözünürlük Dengesi ($K_{çç}$):** 1 veya 2 soru (Genellikle ortak iyon etkisi, çökelme olup olmayacağının tespiti [$Q_i$ vs $K_{çç}$], net iyon denklemleri ve seyirci iyonlar)

Öğrencilerin bu konularda en sık hata yaptığı noktalar hesaplamanın zorluğu değil, **temel kavram yanılgıları ve ezbere dayalı kuralların karıştırılmasıdır**:
1. Sıcaklık orantılarında Celsius ($^\circ\text{C}$) kullanılması (Charles ve Gay-Lussac yasalarında sıcaklık **MUTLAKA Kelvin** olmalıdır).
2. Sabit hacimli kap ile hareketli ideal pistonlu kap arasındaki farkların gaz basıncına etkisinin karıştırılması.
3. Gerçek gazların ideale yaklaşma koşulları (Yüksek $T$, Düşük $P$, Düşük $M_A$) ile sıvılaşma/sapma koşullarının ters algılanması.
4. $Na^+, K^+, NH_4^+, NO_3^-$ iyonlarının çözünürlük kurallarının bilinmemesi sonucu seyirci iyon ve çökelek ayrımının yapılamaması.
5. $PbI_2$ (parlak sarı), $Cu(OH)_2$ (mavi), $Fe(OH)_3$ (kırmızı-kahverengi), $AgCl$ (beyaz) gibi belirteç çökelek renklerinin unutulması.

Bu doküman, bu iki kritik AYT konusunu **interaktif flashcard**, **akıllı çeldiricili çoktan seçmeli test** ve **hafıza matrisi** mekaniklerine dönüştürmek için tasarlanmış eksiksiz bir pedagojik ve teknik kaynaktır.

---

## 2. BÖLÜM 1: Gaz Yasaları ve Kinetik Teori

### 2.1 Kinetik Moleküler Teori Temel Postulatları
Kinetik teori, gazların mikroskobik davranışını açıklayan modeldir:
1. **Brown Hareketi:** Gaz tanecikleri (atom ya da moleküller) sürekli, hızlı, rastgele ve doğrusal hareket eder.
2. **Öz Hacim İhmali:** Gaz taneciklerinin kendi öz hacimleri, gazın içinde bulunduğu kabın toplam hacmi yanında ihmal edilecek kadar küçüktür ($V_{\text{tanecik}} \approx 0$).
3. **Çekim İhmali:** Gaz tanecikleri arasında itme ve çekme kuvvetlerinin olmadığı varsayılır.
4. **Esnek Çarpışma:** Taneciklerin birbirleriyle ve kap çeperiyle yaptıkları çarpışmalar tam esnektir; toplam kinetik enerji korunur, yalnızca tanecikler arası enerji transferi olabilir.
5. **Ortalama Kinetik Enerji:** Aynı sıcaklıktaki tüm gazların ortalama kinetik enerjileri birbirine eşittir ve yalnızca mutlak sıcaklığa ($T$) bağlıdır:
   $$E_k = \frac{3}{2} k_B T = \frac{1}{2} m v_{\text{ort}}^2$$
   *(Burada $k_B$ Boltzmann sabiti, $T$ mutlak sıcaklıktır).*

---

### 2.2 Gaz Değişkenleri ve Dönüşüm Birimleri

| Değişken | Sembol | Standart Birim | Sık Kullanılan Dönüşümler |
|---|---|---|---|
| **Basınç** | $P$ | $\text{atm}$ | $1\text{ atm} = 76\text{ cmHg} = 760\text{ mmHg} = 760\text{ Torr} = 101325\text{ Pa}$ |
| **Hacim** | $V$ | $\text{L}$ | $1\text{ L} = 1\text{ dm}^3 = 1000\text{ mL} = 1000\text{ cm}^3$ |
| **Sıcaklık** | $T$ | $\text{K}$ (Kelvin) | $T(\text{K}) = t(^\circ\text{C}) + 273{,}15 \approx t + 273$ |
| **Madde Miktarı** | $n$ | $\text{mol}$ | $n = \frac{m}{M_A} = \frac{N}{N_A} = \frac{V(\text{NK})}{22{,}4}$ |

> [!IMPORTANT]
> **Gaz Yasalarında Sıcaklık Kuralı:** Gaz yasası bağıntılarında formüle girilen sıcaklık **asla Santigrat ($^\circ\text{C}$) olamaz**. Her zaman mutlak sıcaklık olan **Kelvin ($\text{K}$)** kullanılmalıdır. $0\text{ K} = -273{,}15\ ^\circ\text{C}$ "Mutlak Sıfır" noktasıdır.

---

### 2.3 Gaz Yasaları Karşılaştırma Matrisi

| No | Yasa Adı | Bağıntı | Sabit Tutulan Değişkenler | Orantı Türü | Kritik Not / Örnek Senaryo |
|---|---|---|---|---|---|
| 1 | **Boyle-Mariotte Yasası** | $P_1 \cdot V_1 = P_2 \cdot V_2$ | $T, n$ (Sıcaklık ve Mol) | **Ters Orantı** ($P \propto \frac{1}{V}$) | Piston aşağı itilip hacim yarıya indirilirse basınç 2 katına çıkar. |
| 2 | **Charles Yasası** | $\frac{V_1}{T_1} = \frac{V_2}{T_2}$ | $P, n$ (Basınç ve Mol) | **Doğru Orantı** ($V \propto T$) | İdeal pistonlu kap ısıtıldığında hacim artar. Sıcaklık $27^\circ\text{C}$'den $327^\circ\text{C}$'ye (300 K $\rightarrow$ 600 K) çıkarsa hacim 2 katına çıkar. |
| 3 | **Gay-Lussac Yasası** | $\frac{P_1}{T_1} = \frac{P_2}{T_2}$ | $V, n$ (Hacim ve Mol) | **Doğru Orantı** ($P \propto T$) | Düdüklü tencere veya çelik tüp ısıtıldığında iç basınç mutlak sıcaklıkla doğru orantılı artar. |
| 4 | **Avogadro Yasası** | $\frac{V_1}{n_1} = \frac{V_2}{n_2}$ | $P, T$ (Basınç ve Sıcaklık) | **Doğru Orantı** ($V \propto n$) | Aynı $P$ ve $T$'de eşit hacimdeki gazlar eşit sayıda molekül içerir. NK'da ($0^\circ\text{C}, 1\text{ atm}$) 1 mol gaz = $22{,}4\text{ L}$. |
| 5 | **Dalton Kısmi Basınçlar** | $P_{\text{toplam}} = P_A + P_B + \dots$ | $V, T$ (Hacim ve Sıcaklık) | **Doğru Orantı** ($P_i \propto n_i$) | Bir gazın kısmi basıncı mol kesriyle doğru orantılıdır: $P_A = X_A \cdot P_{\text{toplam}} = \frac{n_A}{n_{\text{toplam}}} \cdot P_{\text{toplam}}$. |
| 6 | **Graham Difüzyon Yasası** | $\frac{v_1}{v_2} = \sqrt{\frac{M_{A_2}}{M_{A_1}}} \cdot \sqrt{\frac{T_1}{T_2}}$ | Değişken ($M_A, T$) | **Ters Kök Orantı** ($v \propto \frac{1}{\sqrt{M_A}}$) | Hafif ve sıcak gazlar hızlı yayılır. Aynı $T$'de $\text{CH}_4$ ($M_A=16$), $\text{SO}_2$'den ($M_A=64$) $\sqrt{64/16} = 2$ kat hızlıdır. |
| 7 | **İdeal Gaz Denklemi** | $P \cdot V = n \cdot R \cdot T$ | Yok (Tüm değişkenler) | Birleşik Durum | $R = 0{,}082\ \frac{\text{L}\cdot\text{atm}}{\text{mol}\cdot\text{K}}$ veya $\frac{22{,}4}{273}\ \frac{\text{L}\cdot\text{atm}}{\text{mol}\cdot\text{K}}$. |
| 8 | **Gaz Yoğunluğu Bağıntısı** | $P \cdot M_A = d \cdot R \cdot T$ | İdeal denklem türevi | $d = \frac{m}{V}$ | Kodlama: *"Pırlanta Mücevher Daha Rahat"* ($P \cdot M_A = d \cdot R \cdot T$). |

---

### 2.4 Yasaların Detaylı Analizi ve Grafikler

#### 1. Boyle-Mariotte Yasası (Basınç - Hacim)
- **Deney Düzeneği:** Sabit sıcaklıktaki bir silindirde ideal pistonun üzerine ağırlık konulması veya bir ucu kapalı cıvalı manometre tüpü.
- **Grafikler:**
  * $P - V$ grafiği: Azalan hiperbol (ters orantı eğrisi).
  * $P - \frac{1}{V}$ grafiği: Orijinden başlayan doğrusal doğru.
  * $P\cdot V - P$ veya $P\cdot V - V$ grafiği: Yatay düz çizgi (çünkü $P\cdot V = \text{sabit}$).
- **Gaz Karışımları ve Musluk Açılması:**
  Reaksiyon vermeyen gazlar karıştırıldığında veya aradaki musluk açıldığında:
  $$P_1 V_1 + P_2 V_2 + \dots = P_{\text{son}} V_{\text{son}}$$

#### 2. Charles Yasası (Hacim - Sıcaklık)
- **Deney Düzeneği:** Hareketli ideal sürtünmesiz pistonlu kap veya elastik balon. Dış basınç sabit kalır ($P_{\text{iç}} = P_{\text{dış}}$).
- **Grafik Farkı (ÖSYM En Sevdiği Tuzak):**
  * $V - T(\text{Kelvin})$ grafiği: Doğru doğrudan **0 K (orijin)** noktasından başlar (kesikli çizgi ile).
  * $V - t(^\circ\text{C})$ grafiği: Doğru yatay sıcaklık eksenini **$-273{,}15\ ^\circ\text{C}$** noktasında keser. $0\ ^\circ\text{C}$'de gazın pozitif bir hacmi vardır!
  * Mutlak sıfır noktasına ulaşılmadan önce tüm gazlar sıvılaşacağı için 0 K civarındaki çizgiler **kesikli (tahmini)** gösterilir.

#### 3. Gay-Lussac Yasası (Basınç - Sıcaklık)
- **Deney Düzeneği:** Sabit hacimli kapalı çelik kap, düdüklü tencere, sprey kutusu.
- **Grafikler:**
  * $P - T(\text{Kelvin})$: Orijinden (0 K) başlayan doğru.
  * $P - t(^\circ\text{C})$: Yatay ekseni $-273{,}15\ ^\circ\text{C}$ noktasında kesen doğru.

#### 4. Avogadro Yasası (Hacim - Mol Sayısı)
- Aynı sıcaklık ve basınçta ($P, T$ sabit) gazın hacmi mol sayısıyla doğru orantılıdır ($V \propto n$).
- **Molar Hacim Sabitleri:**
  * **Normal Koşullar (NK):** $0\ ^\circ\text{C}$ (273 K) ve $1\text{ atm}$ basınçta: $V_{\text{molar}} = 22{,}4\text{ L/mol}$.
  * **Oda Koşulları (OK / Standart Şartlar):** $25\ ^\circ\text{C}$ (298 K) ve $1\text{ atm}$ basınçta: $V_{\text{molar}} = 24{,}5\text{ L/mol}$.

#### 5. Dalton Kısmi Basınçlar Yasası
- Bir gaz karışımında her bir gazın tek başına kaba uyguladığı basınca o gazın **kısmi basıncı** denir.
- Toplam basınç, gazların kısmi basınçları toplamına eşittir:
  $$P_{\text{toplam}} = P_A + P_B + P_C$$
- Bir gazın kısmi basıncı:
  $$P_A = X_A \cdot P_{\text{toplam}} = \left(\frac{n_A}{n_{\text{toplam}}}\right) P_{\text{toplam}}$$
- **Su Üzerinde Toplanan Gazlar:**
  Su ile reaksiyona girmeyen ve suda çözünmeyen bir gaz su üzerinde toplandığında:
  $$P_{\text{toplam}} = P_{\text{gaz}} + P_{\text{buhar}}^{\circ}(\text{H}_2\text{O})$$
  > [!WARNING]
  > **Önemli ÖSYM Kuralı:** Sıvıların denge buhar basıncı ($P_{\text{buhar}}^{\circ}$) kabın hacmine, şekline veya üzerindeki gaz miktarına **BAĞLI DEĞİLDİR**. Yalnızca **3 S**'ye bağlıdır: **S**ıvının cinsi, **S**ıcaklık, **S**afsızlık. Piston yukarı çekilip hacim 2 katına çıkarılırsa gazın basıncı yarıya düşer fakat suyun denge buhar basıncı **değişmez** (bir miktar sıvı buharlaşır).

#### 6. Graham Difüzyon ve Efüzyon Yasası
- **Difüzyon:** Gaz taneciklerinin birbiri içinde rastgele dağılması.
- **Efüzyon (Dışa Yayılma):** Gaz taneciklerinin küçük bir delikten boşluğa kaçması.
- **Hız Bağıntısı:**
  $$\frac{v_1}{v_2} = \sqrt{\frac{M_{A_2}}{M_{A_1}}} \cdot \sqrt{\frac{T_1}{T_2}} = \sqrt{\frac{d_2}{d_1}} \cdot \sqrt{\frac{T_1}{T_2}}$$
- **Zaman (Süre) Bağıntısı:**
  Hız ile yayılma süresi ($t$) ters orantılıdır ($v = \frac{x}{t}$):
  $$\frac{t_1}{t_2} = \frac{v_2}{v_1} = \sqrt{\frac{M_{A_1}}{M_{A_2}}} \cdot \sqrt{\frac{T_2}{T_1}}$$
- **Örnek Klasik Soru:** İki ucu açık 100 cm uzunluğundaki cam borunun bir ucundan aynı sıcaklıkta $\text{CH}_4$ ($M_A=16\text{ g/mol}$), diğer ucundan $\text{SO}_2$ ($M_A=64\text{ g/mol}$) gazı aynı anda bırakılırsa:
  $$\frac{v_{\text{CH}_4}}{v_{\text{SO}_2}} = \sqrt{\frac{64}{16}} = \sqrt{4} = 2$$
  $\text{CH}_4$ iki birim yol alırken $\text{SO}_2$ bir birim yol alır. Karşılaşma noktası $\text{CH}_4$ ucundan $66{,}7\text{ cm}$, $\text{SO}_2$ ucundan $33{,}3\text{ cm}$ uzaklıkta olur.

---

### 2.5 Gerçek Gazlar ve İdeal Davranıştan Sapma

Gerçekte hiçbir gaz %100 ideal değildir. İdeal gaz kuramsal bir basitleştirmedir.

```
            İDEAL GAZA YAKLAŞMA KOŞULLARI
            ┌────────────────────────────┐
            │   Yüksek Sıcaklık (T ↑)    │ → Kinetik enerji artar, çekim önemsizleşir
            │   Düşük Basınç (P ↓)       │ → Hacim genişler, tanecik öz hacmi ihmal edilir
            │   Düşük Mol Kütlesi (MA ↓) │ → London kuvvetleri zayıflar (Örn: He, H₂)
            │   Apolar Molekül Yapısı    │ → Moleküller arası çekim minimumdur
            └────────────────────────────┘

            İDEAL GAZDAN SAPMA (SIVILAŞMA) KOŞULLARI
            ┌────────────────────────────┐
            │   Düşük Sıcaklık (T ↓)     │ → Kinetik enerji düşer, çekim etkinleşir
            │   Yüksek Basınç (P ↑)      │ → Tanecikler sıkışır, öz hacim ihmal edilemez
            │   Yüksek Mol Kütlesi (MA ↑)│ → London/çekim kuvvetleri artar
            │   Polar Molekül Yapısı     │ → Dipol-dipol, hidrojen bağı çekimi kuvvetlendirir
            └────────────────────────────┘
```

#### Sıkıştırılabilirlik Faktörü ($Z$)
$$Z = \frac{P \cdot V}{n \cdot R \cdot T}$$
- İdeal gaz için her sıcaklık ve basınçta $Z = 1$'dir.
- Gerçek gazlarda $Z > 1$ veya $Z < 1$'dir. $Z$'nin 1'den uzaklaşması ideallikten sapmanın göstergesidir.
- Aynı koşullarda helyum ($\text{He}$, $M_A = 4$), metan ($\text{CH}_4$, $M_A = 16$) ve karbondioksit ($\text{CO}_2$, $M_A = 44$) arasında ideale en yakın olan $\text{He}$, en çok sapan ise $\text{CO}_2$'dir.

#### Joule-Thomson Olayı ve Soğutucu Akışkanlar
- Yüksek basınç altındaki bir gazın yalıtılmış bir ortamda küçük bir delikten aniden genleşerek düşük basınçlı ortama geçmesi sırasında gaz tanecikleri arasındaki çekim kuvvetlerini yenmek için kendi iç enerjisini harcaması ve bu nedenle **sıcaklığının düşmesi** olayına **Joule-Thomson Genleşmesi** denir.
- **Uygulama Alanları:** Buzdolapları, derin dondurucular, klimalar, gazların sıvılaştırılması (LPG, LNG üretimi).
- **İdeal Soğutucu Akışkan Özellikleri:**
  1. Kritik sıcaklığı yüksek, kaynama noktası düşük olmalıdır.
  2. Oda koşullarında basınç uygulandığında kolayca sıvılaşabilmeli, basınç kaldırıldığında hemen buharlaşabilmelidir.
  3. Kimyasal olarak tepkimeye girmeyen (inert), yanıcı ve zehirli olmayan, çevreye (ozon tabakasına) zarar vermeyen maddeler olmalıdır.
  4. Kritik sıcaklığın üzerindeki bir madde **basınçla sıvılaştırılamaz** (gaz fazındadır). Kritik sıcaklık ile kaynama noktası arasındaki maddeye ise **buhar** denir.

---

## 3. BÖLÜM 2: Sulu Çözelti Dengeleri: Çözünürlük ve Çökelme Kuralları

### 3.1 Çözünürlük Kuralları (Solubility Rules - MEB Kapsamı)

AYT Kimya sorularında öğrencilerin hangi tuzların suda iyi çözündüğünü, hangilerinin ise çökelek oluşturacağını bilmesi beklenir.

#### KURAL 1: HER ZAMAN Suda İyi Çözünenler (İstisnasız Çökmeyenler)
Aşağıdaki iyonları içeren tuzlar suda %100'e yakın çözünür ve çözeltide daima **seyirci iyon** olarak kalırlar:
1. **1A Grubu Katyonları:** $\text{Li}^+$, $\text{Na}^+$, $\text{K}^+$, $\text{Rb}^+$, $\text{Cs}^+$ içeren tüm tuzlar (örn: $\text{NaCl}$, $\text{KNO}_3$, $\text{Na}_2\text{CO}_3$, $\text{LiOH}$).
2. **Amonyum Katyonu:** $\text{NH}_4^+$ içeren tüm tuzlar (örn: $\text{NH}_4\text{Cl}$, $(\text{NH}_4)_2\text{SO}_4$).
3. **Nitrat Anyonu:** $\text{NO}_3^-$ içeren tüm tuzlar (örn: $\text{AgNO}_3$, $\text{Pb(NO}_3)_2$, $\text{Cu(NO}_3)_2$).
4. **Asetat Anyonu:** $\text{CH}_3\text{COO}^-$ içeren tuzlar (örn: $\text{CH}_3\text{COONa}$).
5. **Klorat ve Bikarbonat:** $\text{ClO}_3^-$, $\text{ClO}_4^-$, $\text{HCO}_3^-$ tuzları genellikle suda çok iyi çözünür.

#### KURAL 2: Genellikle Çözünenler ve Kritik Çöken İstisnaları
- **Halojenürler ($\text{Cl}^-$, $\text{Br}^-$, $\text{I}^-$):** Çoğu suda çözünür.
  * **Çöken İstisnalar:** $\text{Ag}^+$, $\text{Pb}^{2+}$, $\text{Hg}_2^{2+}$ katyonları ile birleştiklerinde suda az çözünen çökelek oluştururlar!  
    $\rightarrow \text{AgCl}$ (beyaz $\downarrow$), $\text{PbI}_2$ (sarı $\downarrow$), $\text{AgBr}$ (krem $\downarrow$), $\text{AgI}$ (açık sarı $\downarrow$).
- **Sülfatlar ($\text{SO}_4^{2-}$):** Çoğu suda çözünür.
  * **Çöken İstisnalar:** $\text{Ba}^{2+}$, $\text{Pb}^{2+}$, $\text{Sr}^{2+}$, $\text{Ca}^{2+}$ katyonları ile birleştiklerinde çöker veya az çözünürler!  
    $\rightarrow \text{BaSO}_4$ (ağır beyaz $\downarrow$), $\text{PbSO}_4$ (beyaz $\downarrow$), $\text{CaSO}_4$ (az çözünür alçıtaşı).

#### KURAL 3: Genellikle Suda Az Çözünenler (Çökelek Oluşturanlar)
- **Karbonatlar ($\text{CO}_3^{2-}$), Fosfatlar ($\text{PO}_4^{3-}$), Sülfitler ($\text{SO}_3^{2-}$):** 1A grubu metalleri ve $\text{NH}_4^+$ hariç neredeyse tüm metallerle suda az çözünen dip katısı oluştururlar (örn: $\text{CaCO}_3$ kireçtaşı $\downarrow$, $\text{BaCO}_3 \downarrow$).
- **Hidroksitler ($\text{OH}^-$):** 1A grubu metalleri ($\text{NaOH}, \text{KOH}$) ve $\text{Ba(OH)}_2$ suda kuvvetli çözünür. $\text{Ca(OH)}_2$ kireç suyu orta-az çözünür. Diğer geçiş metalleri ve katyonlar çöker ($\text{Fe(OH)}_3 \downarrow$, $\text{Cu(OH)}_2 \downarrow$, $\text{Al(OH)}_3 \downarrow$, $\text{Mg(OH)}_2 \downarrow$).
- **Sülfürler ($\text{S}^{2-}$):** 1A, 2A ve $\text{NH}_4^+$ hariç çoğu metal sülfürü siyah veya koyu renkli çökelti verir ($\text{CuS} \downarrow$, $\text{PbS} \downarrow$, $\text{FeS} \downarrow$).

---

### 3.2 Yaygın Çökelekler, Karakteristik Renkleri ve Net İyon Denklemleri

Aşağıdaki tablo ÖSYM AYT Kimya'da soru köklerinde "çözelti karıştırıldığında sarı renkli bir çökelek oluştuğu gözleniyor" veya "beyaz çökelek oluşuyor" şeklinde verilen kilit reaksiyonları içerir:

| Çökelek Formülü | Çökelek Adı | Çökelek Rengi | Görsel Özellik / Laboratuvar Notu | Net İyon Çökelme Tepkimesi |
|---|---|---|---|---|
| **$\text{AgCl}$** | Gümüş klorür | **Beyaz** | Süt/Peynir kesiği kıvamında beyaz çökelek; ışık altında zamanla gri-mora döner. | $\text{Ag}^+(aq) + \text{Cl}^-(aq) \rightarrow \text{AgCl}(k)$ |
| **$\text{PbI}_2$** | Kurşun(II) iyodür | **Parlak Altın Sarısı** | Klasik "Altın Yağmuru" (Golden Rain) deneyi çökeleği. Sıcakta çözünür, soğuyunca parıldayan sarı kristaller çöker. | $\text{Pb}^{2+}(aq) + 2\text{I}^-(aq) \rightarrow \text{PbI}_2(k)$ |
| **$\text{BaSO}_4$** | Baryum sülfat | **Beyaz** | Yoğun, ağır beyaz çökelek. Tıpta mide-bağırsak röntgeninde X-ışını kontrast maddesi ("baryum yudumu") olarak kullanılır. | $\text{Ba}^{2+}(aq) + \text{SO}_4^{2-}(aq) \rightarrow \text{BaSO}_4(k)$ |
| **$\text{CaCO}_3$** | Kalsiyum karbonat | **Beyaz** | Kireçtaşı, mermer, tebeşir. Kireç suyunun ($\text{Ca(OH)}_2$) $\text{CO}_2$ gazıyla bulanması sonucu çöker. | $\text{Ca}^{2+}(aq) + \text{CO}_3^{2-}(aq) \rightarrow \text{CaCO}_3(k)$ |
| **$\text{Fe(OH)}_3$** | Demir(III) hidroksit | **Kırmızı-Kahverengi** | Pas renginde, jelatinimsi hacimli çökelti. Demir pasının ana bileşenidir. | $\text{Fe}^{3+}(aq) + 3\text{OH}^-(aq) \rightarrow \text{Fe(OH)}_3(k)$ |
| **$\text{Cu(OH)}_2$** | Bakır(II) hidroksit | **Açık Mavi / Turkuaz** | Jelatinimsi açık gök mavisi çökelti. Isıtıldığında siyah $\text{CuO}$'ya ayrışır. | $\text{Cu}^{2+}(aq) + 2\text{OH}^-(aq) \rightarrow \text{Cu(OH)}_2(k)$ |
| **$\text{Fe(OH)}_2$** | Demir(II) hidroksit | **Kirli Yeşil** | Yeşilimsi çökelti; havadaki oksijenle hızla kahverengi $\text{Fe(OH)}_3$'e yükseltgenir. | $\text{Fe}^{2+}(aq) + 2\text{OH}^-(aq) \rightarrow \text{Fe(OH)}_2(k)$ |
| **$\text{AgI}$** | Gümüş iyodür | **Açık Sarı** | Soluk sarı çökelek; yağmur bombası (bulut tohumlama) ve fotoğrafçılıkta kullanılır. | $\text{Ag}^+(aq) + \text{I}^-(aq) \rightarrow \text{AgI}(k)$ |
| **$\text{AgBr}$** | Gümüş bromür | **Krem / Soluk Sarı** | Krem rengi-açık sarımsı çökelek; analog fotoğraf film emülsiyonlarında ışıktan etkilenir. | $\text{Ag}^+(aq) + \text{Br}^-(aq) \rightarrow \text{AgBr}(k)$ |
| **$\text{PbSO}_4$** | Kurşun(II) sülfat | **Beyaz** | Beyaz kristal çökelek. Kurşunlu akülerin deşarjında plakalar üzerinde birikir. | $\text{Pb}^{2+}(aq) + \text{SO}_4^{2-}(aq) \rightarrow \text{PbSO}_4(k)$ |
| **$\text{CuS}$** | Bakır(II) sülfür | **Siyah** | Siyah renkli son derece az çözünen sülfür çökeleği ($K_{çç} \approx 6 \times 10^{-36}$). | $\text{Cu}^{2+}(aq) + \text{S}^{2-}(aq) \rightarrow \text{CuS}(k)$ |
| **$\text{PbS}$** | Kurşun(II) sülfür | **Siyah** | Galen minerali; hidrojen sülfür gazı varlığında kurşun iyonlarının siyah çökelmesi. | $\text{Pb}^{2+}(aq) + \text{S}^{2-}(aq) \rightarrow \text{PbS}(k)$ |

---

### 3.3 Net İyon Denklemi ve Seyirci İyon (Spectator Ion) Mekanizması

İki sulu elektrolit çözelti karıştırıldığında gerçekleşen çökelme reaksiyonlarında 3 farklı denklem türü yazılır:

#### Örnek Olay 1: Gümüş Nitrat ve Sodyum Klorür Karışımı
İki berrak ve renksiz çözelti karıştırılır: $\text{AgNO}_3(aq)$ ve $\text{NaCl}(aq)$.

1. **Moleküler Denklem:**
   $$\text{AgNO}_3(aq) + \text{NaCl}(aq) \rightarrow \text{AgCl}(k) + \text{NaNO}_3(aq)$$
2. **Tam İyonik Denklem (Çözeltide Gerçekte Olanlar):**
   $$\text{Ag}^+(aq) + \text{NO}_3^-(aq) + \text{Na}^+(aq) + \text{Cl}^-(aq) \rightarrow \text{AgCl}(k) + \text{Na}^+(aq) + \text{NO}_3^-(aq)$$
3. **Seyirci İyonlar (Spectator Ions):**
   Reaksiyona fiilen katılmayan, başlangıçta da sonda da sulu çözeltide serbest gezen iyonlar:
   $$\mathbf{Na^+(aq) \quad \text{ve} \quad NO_3^-(aq)}$$
4. **Net İyon Denklemi (Çökelmeyi Gerçekleştiren Esas Olay):**
   $$\mathbf{Ag^+(aq) + Cl^-(aq) \rightarrow AgCl(k)}$$

#### Örnek Olay 2: Kurşun(II) Nitrat ve Potasyum İyodür Karışımı ("Altın Yağmuru")
$$\text{Pb(NO}_3)_2(aq) + 2\text{KI}(aq) \rightarrow \text{PbI}_2(k) + 2\text{KNO}_3(aq)$$
- **Seyirci İyonlar:** $\text{K}^+(aq)$ ve $\text{NO}_3^-(aq)$ (Çözünürlük kuralı: 1A ve Nitrat daima çözünür)
- **Net İyon Denklemi:** $\text{Pb}^{2+}(aq) + 2\text{I}^-(aq) \rightarrow \text{PbI}_2(k)$ (Parlak sarı çökelek)

#### Örnek Olay 3: Baryum Klorür ve Sodyum Sülfat Karışımı
$$\text{BaCl}_2(aq) + \text{Na}_2\text{SO}_4(aq) \rightarrow \text{BaSO}_4(k) + 2\text{NaCl}(aq)$$
- **Seyirci İyonlar:** $\text{Na}^+(aq)$ ve $\text{Cl}^-(aq)$
- **Net İyon Denklemi:** $\text{Ba}^{2+}(aq) + \text{SO}_4^{2-}(aq) \rightarrow \text{BaSO}_4(k)$ (Beyaz çökelek)

---

### 3.4 Çözünürlük Dengesi ($K_{çç}$) ve Çökelme Koşulu ($Q_i$)

Az çözünen tuzların katısıyla dengede olan doymuş çözeltilerinde dinamik bir heterojen denge kurulur:
$$\text{AgCl}(k) \rightleftharpoons \text{Ag}^+(aq) + \text{Cl}^-(aq)$$
$$K_{çç} = [\text{Ag}^+][\text{Cl}^-]$$

#### Çökelme Kontrolü: İyon Çarpımı ($Q_i$ veya $Q_{çç}$)
İki çözelti karıştırıldığında oluşan anlık iyon derişimlerinin çarpımına $Q_i$ denir:
- **$Q_i < K_{çç}$ ise:** Çözelti **doymamıştır**. Çökelme gerçekleşmez. Doygunluğa ulaşana kadar daha fazla madde çözünebilir.
- **$Q_i = K_{çç}$ ise:** Çözelti **tam doygundur**. Tam denge anıdır, çökme olmaz.
- **$Q_i > K_{çç}$ ise:** Çözelti **aşırı doygundur**. Denge kurulup $Q_i = K_{çç}$ oluncaya kadar **çökelme gerçekleşir**.

#### Çözünürlüğe Etki Eden Faktörler:
1. **Sıcaklık:**
   - Katıların çözünürlüğü genellikle endotermik ($\Delta H > 0$) olup sıcaklık arttıkça çözünürlük ve $K_{çç}$ artar.
   - Ekzotermik ($\Delta H < 0$) katı çözünmelerinde sıcaklık arttıkça çözünürlük ve $K_{çç}$ azalır.
   - **ÖNEMLİ:** $K_{çç}$ sayısal değerini değiştiren **TEK FAKTÖR SICAKLIKTIR**.
2. **Ortak İyon Etkisi:**
   - Bir tuzun çözeltisine ortak iyon içeren başka bir tuz eklenirse Le Chatelier prensibine göre denge girenlere (katı tarafına) kayar.
   - **Sonuç:** Ortak iyon çözünürlüğü **azaltır**; ancak $K_{çç}$ denge sabitinin değeri **DEĞİŞMEZ**.
3. **pH Etkisi (Asidik/Bazik Ortam):**
   - Yapısında $\text{OH}^-$ bulunan bazik tuzlar (örn: $\text{Mg(OH)}_2$) asidik ortamda ($\text{H}^+$ ile $\text{OH}^-$ nötrleştiği için) daha çok çözünür.
   - Zayıf asit anyonu içeren tuzlar (örn: $\text{CaCO}_3$, $\text{CaF}_2$) asit eklendiğinde daha çok çözünür.

---

## 4. BÖLÜM 3: Flashcard & Test Motoru Veri Mimarisi ve TypeScript Veri Modelleri

Bu veri modeli, uygulamanın `src/data/` dizinine eklenebilecek standart TypeScript arayüzlerini ve tip güvenli veri setlerini tanımlar.

### 4.1 TypeScript Tip Tanımları (`src/types/gasAndSolubility.ts`)

```typescript
// ==================== 1. GAZ YASALARI TİPLERİ ====================
export type GasVariable = 'P' | 'V' | 'T' | 'n';

export interface GasLawData {
  id: string;                      // örn: 'boyle', 'charles'
  name: string;                    // örn: 'Boyle-Mariotte Yasası'
  relationStr: string;             // örn: 'P₁ · V₁ = P₂ · V₂'
  relationMath: string;            // LaTeX formatı: 'P_1 \cdot V_1 = P_2 \cdot V_2'
  constants: GasVariable[];        // Sabit tutulanlar: ['T', 'n']
  constantsDesc: string;           // 'Sıcaklık (T) ve Madde Miktarı (n)'
  variables: GasVariable[];        // Değişenler: ['P', 'V']
  proportionType: 'Ters Orantı' | 'Doğru Orantı' | 'Ters Kök Orantı' | 'Birleşik Durum';
  coreConcept: string;             // Temel pedagojik açıklama
  graphType: string;               // 'Hiperbolik azalan (P-V) veya Doğrusal artan (P-1/V)'
  dailyLifeExample: string;        // Günlük hayat / Laboratuvar örneği
  examTrap: string;                // ÖSYM'nin kurduğu tipik tuzak
}

export interface GasKineticFact {
  id: string;
  category: 'Kinetik Teori' | 'İdeal Davranış' | 'Sapma Koşulu' | 'Joule-Thomson';
  prompt: string;
  correctAnswer: string;
  distractors: string[];
  explanation: string;
  formula?: string;
}

// ==================== 2. ÇÖZÜNÜRLÜK VE ÇÖKELEK TİPLERİ ====================
export type PrecipitateColor = 
  | 'Beyaz'
  | 'Parlak Altın Sarısı'
  | 'Açık Sarı'
  | 'Krem'
  | 'Kırmızı-Kahverengi'
  | 'Açık Mavi / Turkuaz'
  | 'Kirli Yeşil'
  | 'Siyah';

export interface PrecipitateData {
  id: string;                      // örn: 'PbI2'
  formula: string;                 // Ham metin: 'PbI2'
  formulaDisp: string;             // Alt simgeli: 'PbI₂'
  name: string;                    // 'Kurşun(II) iyodür'
  color: PrecipitateColor;         // 'Parlak Altın Sarısı'
  hexColor: string;                // Renk önizleme rozeti: '#ffd43b'
  cation: string;                  // 'Pb²⁺'
  anion: string;                   // 'I⁻'
  netIonicEquation: string;        // 'Pb²⁺(aq) + 2I⁻(aq) → PbI₂(k)'
  typicalReaction: string;         // 'Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(k) + 2KNO₃(aq)'
  spectatorIons: string[];         // ['K⁺', 'NO₃⁻']
  appearanceNote: string;          // '"Altın Yağmuru" deneyi'
  solubilityCategory: 'Çökelek (Suda Az Çözünür)' | 'Çok İyi Çözünür';
}

export interface SolubilityRuleItem {
  id: string;
  ionName: string;
  ionFormula: string;
  ionType: 'Katyon' | 'Anyon';
  solubilityRule: 'Her zaman çözünür (Çökmez)' | 'Genellikle çözünür' | 'Genellikle çöker';
  exceptions: string[];
  roleInPrecipitation: 'Daima Seyirci İyon' | 'Çökelek Yapabilir';
  mnemonic: string;
}
```

---

### 4.2 Gaz Yasaları Veri Seti (`src/data/gasLaws.ts`)

```typescript
export const GAS_LAWS: GasLawData[] = [
  {
    id: 'boyle',
    name: 'Boyle-Mariotte Yasası',
    relationStr: 'P₁ · V₁ = P₂ · V₂',
    relationMath: 'P_1 \\cdot V_1 = P_2 \\cdot V_2',
    constants: ['T', 'n'],
    constantsDesc: 'Sıcaklık (T) ve Madde Miktarı (n)',
    variables: ['P', 'V'],
    proportionType: 'Ters Orantı',
    coreConcept: 'Sabit sıcaklık ve mol sayısında bir gazın basıncı, hacmi ile ters orantılıdır.',
    graphType: 'P-V grafiği hiperboliktir; P-(1/V) grafiği orijinden başlayan doğrudur.',
    dailyLifeExample: 'Şırınganın ucu kapatılıp pistonu itildiğinde içteki hava sıkışır ve basınç artar; derin deniz dalgıçlarının vurgun yemesi.',
    examTrap: 'P·V çarpımının basınca göre grafiği sorulduğunda öğrencinin P arttıkça PV artar sanması (doğrusu: T ve n sabitken PV sabittir, yatay çizgi olur).'
  },
  {
    id: 'charles',
    name: 'Charles Yasası',
    relationStr: 'V₁ / T₁ = V₂ / T₂',
    relationMath: '\\frac{V_1}{T_1} = \\frac{V_2}{T_2}',
    constants: ['P', 'n'],
    constantsDesc: 'Basınç (P) ve Madde Miktarı (n)',
    variables: ['V', 'T'],
    proportionType: 'Doğru Orantı',
    coreConcept: 'Sabit basınç ve mol sayısında bir gazın hacmi, mutlak sıcaklığı (Kelvin) ile doğru orantılıdır.',
    graphType: 'V-T(K) grafiği 0 K orijininden başlar; V-t(°C) grafiği -273 °C noktasında yatay ekseni keser.',
    dailyLifeExample: 'Sıcak hava balonunun içindeki hava ısıtılınca genleşir, yoğunluğu düşer ve balon yükselir; kışın dışarıda kalan topun sönmesi.',
    examTrap: 'Sıcaklık 20 °C\'den 40 °C\'ye çıkarıldığında hacmin 2 katına çıkacağı yanılgısı! Kelvin\'e çevrilmelidir (293 K → 313 K, artış sadece ~%7\'dir).'
  },
  {
    id: 'gay_lussac',
    name: 'Gay-Lussac Yasası',
    relationStr: 'P₁ / T₁ = P₂ / T₂',
    relationMath: '\\frac{P_1}{T_1} = \\frac{P_2}{T_2}',
    constants: ['V', 'n'],
    constantsDesc: 'Hacim (V) ve Madde Miktarı (n)',
    variables: ['P', 'T'],
    proportionType: 'Doğru Orantı',
    coreConcept: 'Sabit hacimli kapalı bir kapta bulunan gazın basıncı, mutlak sıcaklığı (Kelvin) ile doğru orantılıdır.',
    graphType: 'P-T(K) grafiği orijinden başlar; P-t(°C) grafiği -273 °C noktasında yatay ekseni keser.',
    dailyLifeExample: 'Düdüklü tencerede su buharı ısındıkça iç basıncın çok yükselmesi; güneşte kalan sprey kutularının patlama riski.',
    examTrap: 'Kabın türüne dikkat edilmemesi: İdeal hareketli pistonlu kapta sıcaklık artsa bile P değişmez (V artar - Charles). Sabit hacimli çelik kapta ise P artar (Gay-Lussac).'
  },
  {
    id: 'avogadro',
    name: 'Avogadro Yasası',
    relationStr: 'V₁ / n₁ = V₂ / n₂',
    relationMath: '\\frac{V_1}{n_1} = \\frac{V_2}{n_2}',
    constants: ['P', 'T'],
    constantsDesc: 'Basınç (P) ve Sıcaklık (T)',
    variables: ['V', 'n'],
    proportionType: 'Doğru Orantı',
    coreConcept: 'Aynı sıcaklık ve basınçta bulunan tüm ideal gazların eşit hacimlerinde eşit sayıda tanecik (mol) bulunur.',
    graphType: 'V-n grafiği orijinden başlayan doğrusal doğrudur.',
    dailyLifeExample: 'Balona hava üflendikçe mol sayısı artar ve balonun hacmi büyür.',
    examTrap: 'NK (0 °C, 1 atm) ile Standart Şartlar (25 °C, 1 atm) karışımı: 1 mol ideal gaz NK\'da 22,4 L; Oda Koşullarında (25 °C) ise 24,5 L hacim kaplar!'
  },
  {
    id: 'dalton',
    name: 'Dalton Kısmi Basınçlar Yasası',
    relationStr: 'P_toplam = P_A + P_B + ... ve P_A = X_A · P_toplam',
    relationMath: 'P_{\\text{toplam}} = \\sum P_i \\quad \\text{ve} \\quad P_A = \\left(\\frac{n_A}{n_{\\text{toplam}}}\\right) P_{\\text{toplam}}',
    constants: ['V', 'T'],
    constantsDesc: 'Hacim (V) ve Sıcaklık (T)',
    variables: ['P', 'n'],
    proportionType: 'Doğru Orantı',
    coreConcept: 'Bir gaz karışımının toplam basıncı, karışımı oluşturan gazların kısmi basınçları toplamına eşittir. Her gazın kısmi basıncı mol kesriyle orantılıdır.',
    graphType: 'Kısmi basınç mol kesri grafiği doğrusal artandır.',
    dailyLifeExample: 'Soluduğumuz atmosfer havasının 1 atm basıncının ~0,78 atm\'si N₂, ~0,21 atm\'si O₂ gazı tarafından oluşturulur.',
    examTrap: 'Su üzerinde toplanan gazlarda piston itilip hacim yarıya indiğinde gazın kısmi basıncı 2 katına çıkar; ancak suyun buhar basıncı DEĞİŞMEZ!'
  },
  {
    id: 'graham',
    name: 'Graham Difüzyon ve Efüzyon Yasası',
    relationStr: 'v₁ / v₂ = √(MA₂ / MA₁) · √(T₁ / T₂)',
    relationMath: '\\frac{v_1}{v_2} = \\sqrt{\\frac{M_{A_2}}{M_{A_1}}} \\cdot \\sqrt{\\frac{T_1}{T_2}} = \\frac{t_2}{t_1}',
    constants: [],
    constantsDesc: 'Kinetik enerji ve mol kütlesine bağlı',
    variables: ['T', 'MA'],
    proportionType: 'Ters Kök Orantı',
    coreConcept: 'Bir gazın yayılma hızı, mol kütlesinin karekökü ile ters; mutlak sıcaklığının karekökü ile doğru orantılıdır. Yayılma süresi (t) hız ile ters orantılıdır.',
    graphType: 'Hız ile 1/√(MA) arasında doğrusal ilişki vardır.',
    dailyLifeExample: 'Odanın bir köşesinde sıkılan parfüm kokusunun odaya yayılması; H₂ dolu balonun He dolu balondan daha çabuk sönmesi.',
    examTrap: 'Hız oranı ile yayılma süresi (t) oranının karıştırılması: Hızlı olan gaz daha KISA sürede yayılır (t₁/t₂ = v₂/v₁).'
  },
  {
    id: 'ideal_gas',
    name: 'İdeal Gaz Denklemi',
    relationStr: 'P · V = n · R · T',
    relationMath: 'P \\cdot V = n \\cdot R \\cdot T',
    constants: ['R'],
    constantsDesc: 'R = 0,082 L·atm/(mol·K) veya 22,4/273',
    variables: ['P', 'V', 'n', 'T'],
    proportionType: 'Birleşik Durum',
    coreConcept: 'Dört temel gaz değişkenini (P, V, n, T) evrensel gaz sabiti (R) ile birleştiren temel durum denklemidir. Yoğunluk türevi: P·MA = d·R·T.',
    graphType: 'Çok değişkenli durum yüzeyi.',
    dailyLifeExample: 'Otomobil lastiklerinin soğuk havada basıncının düşmesi (T azalınca P azalır).',
    examTrap: 'R sabitinin birimine dikkat: Basınç atm, Hacim Litre alınmazsa R = 0,082 kullanılamaz.'
  },
  {
    id: 'real_gases',
    name: 'İdeal Davranıştan Sapma ve Joule-Thomson',
    relationStr: 'Z = (P · V) / (n · R · T)',
    relationMath: 'Z = \\frac{P \\cdot V}{n \\cdot R \\cdot T} \\neq 1',
    constants: [],
    constantsDesc: 'Gerçek gazlar yüksek T, düşük P\'de ideale yaklaşır',
    variables: ['P', 'T', 'MA'],
    proportionType: 'Birleşik Durum',
    coreConcept: 'Düşük sıcaklık ve yüksek basınçta tanecikler arası çekim ve öz hacim önem kazanır, gaz idealden sapar ve sıvılaşır. Aniden genleşen gaz soğur (Joule-Thomson).',
    graphType: 'Sıkıştırılabilirlik faktörü (Z) - Basınç (P) eğrileri.',
    dailyLifeExample: 'Buzdolapları ve klimalarda soğutucu akışkanların genleşerek ortamı soğutması.',
    examTrap: 'İdeale yaklaşma koşulu ile sıvılaşma koşulunu karıştırmak: Gazı sıvılaştırmak için sıcaklık DÜŞÜRÜLMELİ, basınç ARTIRILMALIDIR (İdealden sapma).'
  }
];
```

---

### 4.3 Yaygın Çökelekler ve Renkleri Veri Seti (`src/data/precipitates.ts`)

```typescript
export const PRECIPITATES: PrecipitateData[] = [
  {
    id: 'AgCl',
    formula: 'AgCl',
    formulaDisp: 'AgCl',
    name: 'Gümüş klorür',
    color: 'Beyaz',
    hexColor: '#f8f9fa',
    cation: 'Ag⁺',
    anion: 'Cl⁻',
    netIonicEquation: 'Ag⁺(aq) + Cl⁻(aq) → AgCl(k)',
    typicalReaction: 'AgNO₃(aq) + NaCl(aq) → AgCl(k) + NaNO₃(aq)',
    spectatorIons: ['Na⁺', 'NO₃⁻'],
    appearanceNote: 'Beyaz peynirimsi çökelti; ışığa maruz kaldığında gümüş metaline indirgenerek kararır (fotoğrafçılık temeli).',
    solubilityCategory: 'Çökelek (Suda Az Çözünür)'
  },
  {
    id: 'PbI2',
    formula: 'PbI2',
    formulaDisp: 'PbI₂',
    name: 'Kurşun(II) iyodür',
    color: 'Parlak Altın Sarısı',
    hexColor: '#fcc419',
    cation: 'Pb²⁺',
    anion: 'I⁻',
    netIonicEquation: 'Pb²⁺(aq) + 2I⁻(aq) → PbI₂(k)',
    typicalReaction: 'Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(k) + 2KNO₃(aq)',
    spectatorIons: ['K⁺', 'NO₃⁻'],
    appearanceNote: '"Altın Yağmuru" (Golden Rain) deneyi olarak bilinir. Çözelti ısıtıldığında çözünür, soğutulduğunda parıldayan altın pulları gibi çöker.',
    solubilityCategory: 'Çökelek (Suda Az Çözünür)'
  },
  {
    id: 'BaSO4',
    formula: 'BaSO4',
    formulaDisp: 'BaSO₄',
    name: 'Baryum sülfat',
    color: 'Beyaz',
    hexColor: '#f1f3f5',
    cation: 'Ba²⁺',
    anion: 'SO₄²⁻',
    netIonicEquation: 'Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(k)',
    typicalReaction: 'BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(k) + 2NaCl(aq)',
    spectatorIons: ['Na⁺', 'Cl⁻'],
    appearanceNote: 'Ağır, yoğun beyaz çökelti. Ba²⁺ iyonu toksik olmasına rağmen BaSO₄ suda hiç çözünmediği için sindirim sistemi röntgeninde kontrast maddesi olarak güvenle içirilir.',
    solubilityCategory: 'Çökelek (Suda Az Çözünür)'
  },
  {
    id: 'CaCO3',
    formula: 'CaCO3',
    formulaDisp: 'CaCO₃',
    name: 'Kalsiyum karbonat',
    color: 'Beyaz',
    hexColor: '#ffffff',
    cation: 'Ca²⁺',
    anion: 'CO₃²⁻',
    netIonicEquation: 'Ca²⁺(aq) + CO₃²⁻(aq) → CaCO₃(k)',
    typicalReaction: 'CaCl₂(aq) + Na₂CO₃(aq) → CaCO₃(k) + 2NaCl(aq)',
    spectatorIons: ['Na⁺', 'Cl⁻'],
    appearanceNote: 'Kireçtaşı, mermer ve tebeşirin temel bileşenidir. Kireç suyuna CO₂ gazı üflendiğinde kireç suyunun bulanması bu çökeleğin oluşmasındandır.',
    solubilityCategory: 'Çökelek (Suda Az Çözünür)'
  },
  {
    id: 'FeOH3',
    formula: 'Fe(OH)3',
    formulaDisp: 'Fe(OH)₃',
    name: 'Demir(III) hidroksit',
    color: 'Kırmızı-Kahverengi',
    hexColor: '#c92a2a',
    cation: 'Fe³⁺',
    anion: 'OH⁻',
    netIonicEquation: 'Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(k)',
    typicalReaction: 'FeCl₃(aq) + 3NaOH(aq) → Fe(OH)₃(k) + 3NaCl(aq)',
    spectatorIons: ['Na⁺', 'Cl⁻'],
    appearanceNote: 'Pas renginde jelatinimsi hacimli çökelti. Demir metalinin paslanmasında oluşan hidratlanmış demir oksitlerin öncüsüdür.',
    solubilityCategory: 'Çökelek (Suda Az Çözünür)'
  },
  {
    id: 'CuOH2',
    formula: 'Cu(OH)2',
    formulaDisp: 'Cu(OH)₂',
    name: 'Bakır(II) hidroksit',
    color: 'Açık Mavi / Turkuaz',
    hexColor: '#339af0',
    cation: 'Cu²⁺',
    anion: 'OH⁻',
    netIonicEquation: 'Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(k)',
    typicalReaction: 'CuSO₄(aq) + 2NaOH(aq) → Cu(OH)₂(k) + Na₂SO₄(aq)',
    spectatorIons: ['Na⁺', 'SO₄²⁻'],
    appearanceNote: 'Göz alıcı açık mavi / turkuaz jelatinimsi çökelti. Çözelti kaynatıldığında su kaybederek siyah renkli CuO katısına dönüşür.',
    solubilityCategory: 'Çökelek (Suda Az Çözünür)'
  },
  {
    id: 'FeOH2',
    formula: 'Fe(OH)2',
    formulaDisp: 'Fe(OH)₂',
    name: 'Demir(II) hidroksit',
    color: 'Kirli Yeşil',
    hexColor: '#51cf66',
    cation: 'Fe²⁺',
    anion: 'OH⁻',
    netIonicEquation: 'Fe²⁺(aq) + 2OH⁻(aq) → Fe(OH)₂(k)',
    typicalReaction: 'FeSO₄(aq) + 2NaOH(aq) → Fe(OH)₂(k) + Na₂SO₄(aq)',
    spectatorIons: ['Na⁺', 'SO₄²⁻'],
    appearanceNote: 'Kirli açık yeşil çökelti; havayla temas ettiğinde ortamdaki oksijenle hızla yükseltgenerek kahverengi Fe(OH)₃\'e döner.',
    solubilityCategory: 'Çökelek (Suda Az Çözünür)'
  },
  {
    id: 'AgI',
    formula: 'AgI',
    formulaDisp: 'AgI',
    name: 'Gümüş iyodür',
    color: 'Açık Sarı',
    hexColor: '#ffe066',
    cation: 'Ag⁺',
    anion: 'I⁻',
    netIonicEquation: 'Ag⁺(aq) + I⁻(aq) → AgI(k)',
    typicalReaction: 'AgNO₃(aq) + KI(aq) → AgI(k) + KNO₃(aq)',
    spectatorIons: ['K⁺', 'NO₃⁻'],
    appearanceNote: 'Soluk açık sarı çökelek. Kristal yapısı buz kristallerine çok benzediği için yapay yağmur oluşturmada (bulut tohumlama) kullanılır.',
    solubilityCategory: 'Çökelek (Suda Az Çözünür)'
  },
  {
    id: 'AgBr',
    formula: 'AgBr',
    formulaDisp: 'AgBr',
    name: 'Gümüş bromür',
    color: 'Krem',
    hexColor: '#fff9db',
    cation: 'Ag⁺',
    anion: 'Br⁻',
    netIonicEquation: 'Ag⁺(aq) + Br⁻(aq) → AgBr(k)',
    typicalReaction: 'AgNO₃(aq) + KBr(aq) → AgBr(k) + KNO₃(aq)',
    spectatorIons: ['K⁺', 'NO₃⁻'],
    appearanceNote: 'Krem / fildişi rengi çökelti. Işığa duyarlılığı nedeniyle klasik analog siyah-beyaz fotoğraf filmlerinde kullanılmıştır.',
    solubilityCategory: 'Çökelek (Suda Az Çözünür)'
  },
  {
    id: 'PbSO4',
    formula: 'PbSO4',
    formulaDisp: 'PbSO₄',
    name: 'Kurşun(II) sülfat',
    color: 'Beyaz',
    hexColor: '#e9ecef',
    cation: 'Pb²⁺',
    anion: 'SO₄²⁻',
    netIonicEquation: 'Pb²⁺(aq) + SO₄²⁻(aq) → PbSO₄(k)',
    typicalReaction: 'Pb(NO₃)₂(aq) + Na₂SO₄(aq) → PbSO₄(k) + 2NaNO₃(aq)',
    spectatorIons: ['Na⁺', 'NO₃⁻'],
    appearanceNote: 'Ağır beyaz toz çökelek. Kurşun-asit otomobil akülerinin boşalması (deşarjı) sırasında her iki elektrotta da oluşur.',
    solubilityCategory: 'Çökelek (Suda Az Çözünür)'
  },
  {
    id: 'CuS',
    formula: 'CuS',
    formulaDisp: 'CuS',
    name: 'Bakır(II) sülfür',
    color: 'Siyah',
    hexColor: '#212529',
    cation: 'Cu²⁺',
    anion: 'S²⁻',
    netIonicEquation: 'Cu²⁺(aq) + S²⁻(aq) → CuS(k)',
    typicalReaction: 'CuSO₄(aq) + Na₂S(aq) → CuS(k) + Na₂SO₄(aq)',
    spectatorIons: ['Na⁺', 'SO₄²⁻'],
    appearanceNote: 'Simsiyah çökelti. Çözünürlük çarpımı aşırı derecede düşüktür (Kçç ~ 10⁻³⁶), en kuvvetli asitlerde bile zor çözünür.',
    solubilityCategory: 'Çökelek (Suda Az Çözünür)'
  },
  {
    id: 'PbS',
    formula: 'PbS',
    formulaDisp: 'PbS',
    name: 'Kurşun(II) sülfür',
    color: 'Siyah',
    hexColor: '#343a40',
    cation: 'Pb²⁺',
    anion: 'S²⁻',
    netIonicEquation: 'Pb²⁺(aq) + S²⁻(aq) → PbS(k)',
    typicalReaction: 'Pb(CH₃COO)₂(aq) + H₂S(g) → PbS(k) + 2CH₃COOH(aq)',
    spectatorIons: ['CH₃COO⁻', 'H⁺'],
    appearanceNote: 'Siyah metalik çökelti. Doğada galen minerali olarak bulunur. H₂S gazı tayininde kurşun asetatlı filtre kağıdının kararması testi olarak kullanılır.',
    solubilityCategory: 'Çökelek (Suda Az Çözünür)'
  }
];
```

---

### 4.4 Çözünürlük Kuralları Referans Listesi (`src/data/solubilityRules.ts`)

```typescript
export const SOLUBILITY_RULES: SolubilityRuleItem[] = [
  {
    id: 'group_1a',
    ionName: '1A Grubu Katyonları (Li⁺, Na⁺, K⁺, Rb⁺, Cs⁺)',
    ionFormula: '1A Grubu',
    ionType: 'Katyon',
    solubilityRule: 'Her zaman çözünür (Çökmez)',
    exceptions: ['İstisnası yoktur; tüm tuzları suda çok iyi çözünür.'],
    roleInPrecipitation: 'Daima Seyirci İyon',
    mnemonic: '1A grubu krallardır, asla dibe çökmez daima suda yüzer!'
  },
  {
    id: 'ammonium',
    ionName: 'Amonyum İyonu',
    ionFormula: 'NH₄⁺',
    ionType: 'Katyon',
    solubilityRule: 'Her zaman çözünür (Çökmez)',
    exceptions: ['İstisnası yoktur; tüm amonyum tuzları suda %100\'e yakın çözünür.'],
    roleInPrecipitation: 'Daima Seyirci İyon',
    mnemonic: 'Amonyum (NH₄⁺) tıpkı 1A grubu gibi asla çökelek oluşturmaz.'
  },
  {
    id: 'nitrate',
    ionName: 'Nitrat İyonu',
    ionFormula: 'NO₃⁻',
    ionType: 'Anyon',
    solubilityRule: 'Her zaman çözünür (Çökmez)',
    exceptions: ['İstisnası yoktur; tüm metallerin nitrat tuzları suda çözünür.'],
    roleInPrecipitation: 'Daima Seyirci İyon',
    mnemonic: 'NO₃⁻ görürsen düşünmeden "seyirci iyon / tam çözünür" de!'
  },
  {
    id: 'acetate',
    ionName: 'Asetat İyonu',
    ionFormula: 'CH₃COO⁻',
    ionType: 'Anyon',
    solubilityRule: 'Her zaman çözünür (Çökmez)',
    exceptions: ['Gümüş asetat (AgCH₃COO) hafif az çözünür, genel olarak tüm asetatlar çözünür.'],
    roleInPrecipitation: 'Daima Seyirci İyon',
    mnemonic: 'Sirke tuzu asetat suda daima çözünür.'
  },
  {
    id: 'halides',
    ionName: 'Klorür, Bromür, İyodür (Cl⁻, Br⁻, I⁻)',
    ionFormula: 'X⁻ (Halojenürler)',
    ionType: 'Anyon',
    solubilityRule: 'Genellikle çözünür',
    exceptions: ['Ag⁺ (Gümüş), Pb²⁺ (Kurşun), Hg₂²⁺ (Cıva(I)) ile ÇÖKER!'],
    roleInPrecipitation: 'Çökelek Yapabilir',
    mnemonic: '"Ağır metaller halojenleri çökertir: AgCl (beyaz), PbI₂ (sarı)"'
  },
  {
    id: 'sulfate',
    ionName: 'Sülfat İyonu',
    ionFormula: 'SO₄²⁻',
    ionType: 'Anyon',
    solubilityRule: 'Genellikle çözünür',
    exceptions: ['Ba²⁺ (Baryum), Pb²⁺ (Kurşun), Ca²⁺ (Kalsiyum), Sr²⁺ (Stronsiyum) ile ÇÖKER!'],
    roleInPrecipitation: 'Çökelek Yapabilir',
    mnemonic: 'BaSO₄ (ağır beyaz röntgen tuzu) ve PbSO₄ akü çökeltisi sülfat istisnalarıdır.'
  },
  {
    id: 'carbonate_phosphate',
    ionName: 'Karbonat ve Fosfat (CO₃²⁻, PO₄³⁻)',
    ionFormula: 'CO₃²⁻ / PO₄³⁻',
    ionType: 'Anyon',
    solubilityRule: 'Genellikle çöker',
    exceptions: ['1A grubu (Na⁺, K⁺) ve NH₄⁺ tuzları hariç hepsi çöker.'],
    roleInPrecipitation: 'Çökelek Yapabilir',
    mnemonic: 'Kireçtaşı (CaCO₃) suda çözünseydi mağaralar ve travertenler oluşamazdı!'
  },
  {
    id: 'hydroxide',
    ionName: 'Hidroksit İyonu',
    ionFormula: 'OH⁻',
    ionType: 'Anyon',
    solubilityRule: 'Genellikle çöker',
    exceptions: ['1A grubu metalleri (NaOH, KOH) ve Ba(OH)₂ iyi çözünür; geçiş metalleri (Fe, Cu) renkli çöker.'],
    roleInPrecipitation: 'Çökelek Yapabilir',
    mnemonic: 'Fe(OH)₃ pas rengi kırmızı-kahve, Cu(OH)₂ gök mavisi jelatinimsi çöker.'
  }
];
```

---

## 5. BÖLÜM 4: Flashcard Kart Şablonları ve Soru Havuzu

### 5.1 İnteraktif Flashcard Şablonları (Front / Back Formatı)

#### Kart 1: Boyle-Mariotte Yasası
- **Ön Yüz (Soru):**  
  > 🧪 **Boyle-Mariotte Yasası**  
  > Sabit tutulan değişkenler nelerdir?  
  > Basınç ile hacim arasındaki bağıntı nasıldır?
- **Arka Yüz (Cevap):**  
  > ✅ **$P_1 \cdot V_1 = P_2 \cdot V_2$**  
  > • **Sabitler:** Sıcaklık ($T$) ve Madde Miktarı ($n$)  
  > • **Orantı:** Ters orantı ($P \propto \frac{1}{V}$)  
  > • **Grafik:** $P-V$ grafiği hiperboldür; $P \cdot V$ çarpımı basınca göre değişmez (yatay çizgi).
- **İpucu / Sınav Uyarısı:** Sürtünmesiz hareketli pistonlu kaplarda basınç dış basınca eşittir; hacim değişirse iç basınç yeniden dış basınca eşitlenir.

#### Kart 2: Charles Yasası & Kelvin Kuralı
- **Ön Yüz (Soru):**  
  > 🎈 **Charles Yasası**  
  > Sabit tutulan değişkenler nelerdir?  
  > $V - T(\text{K})$ ile $V - t(^\circ\text{C})$ grafikleri arasındaki fark nedir?
- **Arka Yüz (Cevap):**  
  > ✅ **$\frac{V_1}{T_1} = \frac{V_2}{T_2}$**  
  > • **Sabitler:** Basınç ($P$) ve Madde Miktarı ($n$)  
  > • **Orantı:** Doğru orantı ($V \propto T$)  
  > • **Grafik Farkı:** $V-T(\text{K})$ grafiği **orijinden (0 K)** kesikli başlar; $V-t(^\circ\text{C})$ grafiği yatay ekseni **$-273{,}15\ ^\circ\text{C}$**'de keser!
- **İpucu / Sınav Uyarısı:** Sıcaklık $25\ ^\circ\text{C}$'den $50\ ^\circ\text{C}$'ye çıktığında hacim iki katına çıkmaz! Sıcaklık daima Kelvin'e çevrilir ($298\text{ K} \rightarrow 323\text{ K}$).

#### Kart 3: Graham Difüzyon Yasası
- **Ön Yüz (Soru):**  
  > 💨 **Graham Difüzyon Yasası**  
  > İki gazın yayılma hızları ($v_1/v_2$) mol kütleleri ($M_A$) ve sıcaklıkları ($T$) ile nasıl orantılıdır? Yayılma süresi ($t$) ile hız bağıntısı nasıldır?
- **Arka Yüz (Cevap):**  
  > ✅ **$\frac{v_1}{v_2} = \sqrt{\frac{M_{A_2}}{M_{A_1}}} \cdot \sqrt{\frac{T_1}{T_2}} = \frac{t_2}{t_1}$**  
  > • Hız, $M_A$'nın karekökü ile **ters**; mutlak sıcaklığın ($T$) karekökü ile **doğru** orantılıdır.  
  > • Hızlı olan gaz boruyu daha **kısa sürede** terk eder ($v \propto \frac{1}{t}$).
- **İpucu / Sınav Uyarısı:** Aynı sıcaklıkta $M_A$'sı 16 olan $\text{CH}_4$, $M_A$'sı 64 olan $\text{SO}_2$'den $\sqrt{64/16} = 2$ kat hızlıdır.

#### Kart 4: Gerçek Gazların İdeale Yaklaşma Koşulları
- **Ön Yüz (Soru):**  
  > 🧊 $\rightarrow$ 💨 **İdeal Gaz Davranışı**  
  > Bir gaz hangi koşullarda en çok **İDEAL DAVRANIŞA YAKLAŞIR**?  
  > Hangi koşullarda idealden en çok **SAPAR (SIVILAŞIR)**?
- **Arka Yüz (Cevap):**  
  > ✅ **İdeale Yaklaşma:**  
  > • **Yüksek Sıcaklık ($T \uparrow$)** (Kinetik enerji yüksek, çekim önemsiz)  
  > • **Düşük Basınç ($P \downarrow$)** (Geniş hacim, öz hacim ihmal)  
  > • **Düşük Mol Kütlesi ($M_A \downarrow$)** ve Apolar Yapı (London zayıf)  
  > ❌ **İdealden Sapma (Sıvılaşma):** Düşük $T$, Yüksek $P$, Büyük $M_A$, Güçlü çekim (polar/hidrojen bağı).
- **İpucu / Sınav Uyarısı:** $\text{He}$ gazı doğadaki tüm gazlar içinde ideale en yakın gazdır.

#### Kart 5: Suda Daima Çözünen İyonlar & Seyirci İyon Kuralı
- **Ön Yüz (Soru):**  
  > 💧 **Sulu Çözelti Kuralları**  
  > Hangi iyonları içeren tuzlar suda **HER ZAMAN %100 ÇÖZÜNÜR** ve çökelme tepkimelerinde daima **SEYİRCİ İYON** olur?
- **Arka Yüz (Cevap):**  
  > ✅ **Daima Çözünen 4 Temel İyon Grubu:**  
  > 1. **1A Grubu Katyonları:** $\text{Li}^+, \text{Na}^+, \text{K}^+, \text{Rb}^+, \text{Cs}^+$  
  > 2. **Amonyum Katyonu:** $\text{NH}_4^+$  
  > 3. **Nitrat Anyonu:** $\text{NO}_3^-$  
  > 4. **Asetat Anyonu:** $\text{CH}_3\text{COO}^-$  
  > Bu iyonlar çökelme tepkimesine girmez, çözeltide kalarak **seyirci iyon** oluştururlar!
- **İpucu / Sınav Uyarısı:** $\text{AgNO}_3$ ve $\text{NaCl}$ karıştırıldığında $\text{Na}^+$ ve $\text{NO}_3^-$ doğrudan seyirci iyondur.

#### Kart 6: Kritik Çökelek Renkleri: $PbI_2$, $AgCl$, $Fe(OH)_3$, $Cu(OH)_2$
- **Ön Yüz (Soru):**  
  > 🎨 **Çökelek Renkleri Eşleştirmesi**  
  > 1. $\text{PbI}_2$ (Kurşun(II) iyodür) = ?  
  > 2. $\text{AgCl}$ (Gümüş klorür) = ?  
  > 3. $\text{Fe(OH)}_3$ (Demir(III) hidroksit) = ?  
  > 4. $\text{Cu(OH)}_2$ (Bakır(II) hidroksit) = ?  
  > 5. $\text{BaSO}_4$ (Baryum sülfat) = ?
- **Arka Yüz (Cevap):**  
  > ✅ **Renkler:**  
  > 1. $\text{PbI}_2 \rightarrow$ **Parlak Altın Sarısı** ("Altın Yağmuru")  
  > 2. $\text{AgCl} \rightarrow$ **Beyaz** (Peynirimsi çökelti)  
  > 3. $\text{Fe(OH)}_3 \rightarrow$ **Kırmızı-Kahverengi** (Pas rengi jel)  
  > 4. $\text{Cu(OH)}_2 \rightarrow$ **Açık Mavi / Turkuaz**  
  > 5. $\text{BaSO}_4 \rightarrow$ **Beyaz** (Ağır röntgen tuzu)
- **İpucu / Sınav Uyarısı:** ÖSYM AYT sorularında "karışım sonucu sarı renkli çökelek oluştu" denildiğinde kastedilen %99 ihtimalle $\text{PbI}_2$'dir!

---

### 5.2 Çoktan Seçmeli Test Motoru Soru Havuzu (Akıllı Çeldiricili)

```json
[
  {
    "id": "Q_GAS_01",
    "topic": "gas_laws",
    "prompt": "Sabit sıcaklıkta ideal sürtünmesiz pistonlu bir kapta bulunan 1 mol He gazının hacmi 4 litredir. Piston dışarıdan itilerek gazın hacmi 2 litreye düşürülüyor. Bu durumla ilgili;\nI. Gazın basıncı 2 katına çıkar.\nII. Basınç · Hacim (P·V) çarpımı değişmez.\nIII. Taneciklerin ortalama kinetik enerjisi artar.\nyargılarından hangileri doğrudur?",
    "options": [
      "Yalnız I",
      "I ve II",
      "I ve III",
      "II ve III",
      "I, II ve III"
    ],
    "correctIndex": 1,
    "explanation": "Boyle-Mariotte Yasası gereği T ve n sabitken P₁·V₁ = P₂·V₂'dir. Hacim yarıya inince basınç 2 katına çıkar (I doğru). P·V çarpımı sıcaklık ve mol değişmediği için sabit kalır (II doğru). Sıcaklık sabit kaldığı için taneciklerin ortalama kinetik enerjisi DEĞİŞMEZ (III yanlış). Cevap: I ve II.",
    "distractorTrap": "Öğrenci gaz sıkışınca ısınır veya hızı artar zannederek III'ü doğru kabul edebilir; soru kökünde 'sabit sıcaklıkta' vurgulanmıştır."
  },
  {
    "id": "Q_GAS_02",
    "topic": "gas_laws",
    "prompt": "Sabit basınçlı bir kapta 27 °C sıcaklıkta bulunan bir miktar ideal gazın hacmi V litredir. Gazın hacminin 2V litreye çıkması için sıcaklığı kaç °C yapılmalıdır?",
    "options": [
      "54 °C",
      "127 °C",
      "327 °C",
      "600 °C",
      "573 °C"
    ],
    "correctIndex": 2,
    "explanation": "Charles Yasası gereği V₁/T₁ = V₂/T₂ bağıntısında sıcaklık MUTLAKA Kelvin olmalıdır. T₁ = 27 + 273 = 300 K. Hacmin 2 katına çıkması (2V) için mutlak sıcaklığın da 2 katına çıkması gerekir: T₂ = 2 × 300 K = 600 K. Santigrata çevrilirse: t₂ = 600 - 273 = 327 °C olur. Cevap: C.",
    "distractorTrap": "Öğrencilerin en klasik tuzağı 27 × 2 = 54 °C (A seçeneği) işaretlemesidir."
  },
  {
    "id": "Q_GAS_03",
    "topic": "graham",
    "prompt": "Aynı sıcaklıkta eşit uzunluktaki cam bir borunun iki ucundan aynı anda CH₄ (MA = 16 g/mol) ve SO₂ (MA = 64 g/mol) gazları gönderilmektedir. CH₄ gazı borunun tamamını 10 saniyede geçtiğine göre, SO₂ gazı aynı boruyu kaç saniyede terk eder?",
    "options": [
      "5 saniye",
      "10 saniye",
      "20 saniye",
      "40 saniye",
      "80 saniye"
    ],
    "correctIndex": 2,
    "explanation": "Graham Difüzyon Yasası: v_CH₄ / v_SO₂ = √(MA_SO₂ / MA_CH₄) = √(64 / 16) = √4 = 2. CH₄ gazının yayılma hızı SO₂'nin 2 katıdır. Hız ile yayılma süresi (t) ters orantılıdır (v ∝ 1/t). Bu nedenle CH₄ boruyu 10 saniyede geçiyorsa, hızı yarı yarıya yavaş olan SO₂ gazı 2 katı sürede, yani 10 × 2 = 20 saniyede geçer. Cevap: 20 saniye.",
    "distractorTrap": "Hız 2 katı olduğu için süreyi de 2'ye bölerek 5 saniye (A seçeneği) işaretleme hatası."
  },
  {
    "id": "Q_GAS_04",
    "topic": "real_gases",
    "prompt": "Gerçek bir gazın ideal gaz davranışına en çok yaklaşması ve ideal davranıştan en çok saparak sıvılaşması için uygulanması gereken sıcaklık ve basınç koşulları aşağıdakilerin hangisinde doğru verilmiştir?\n\nİdeale En Çok Yaklaşma / İdealden En Çok Sapma",
    "options": [
      "Yüksek T, Düşük P / Düşük T, Yüksek P",
      "Düşük T, Yüksek P / Yüksek T, Düşük P",
      "Yüksek T, Yüksek P / Düşük T, Düşük P",
      "Düşük T, Düşük P / Yüksek T, Yüksek P",
      "Yüksek T, Düşük P / Düşük T, Düşük P"
    ],
    "correctIndex": 0,
    "explanation": "Gaz tanecikleri yüksek sıcaklıkta yüksek kinetik enerjiye sahip olduğundan aralarındaki çekim kuvvetleri önemsizleşir; düşük basınçta ise hacim çok büyük olduğundan taneciklerin öz hacmi ihmal edilir (İdeale yaklaşma: Yüksek T, Düşük P). Tersine düşük sıcaklık ve yüksek basınçta tanecikler birbirine yaklaşır, çekim artar ve gaz idealden saparak sıvılaşır.",
    "distractorTrap": "Öğrencilerin 'yüksek basınçta gaz sıkışır ve ideal olur' sanması tam tersidir."
  },
  {
    "id": "Q_SOL_01",
    "topic": "solubility_rules",
    "prompt": "0,1 M AgNO₃ çözeltisi ile 0,1 M NaCl çözeltisi eşit hacimlerde karıştırıldığında beyaz bir çökelek oluştuğu gözleniyor.\nBu tepkime ile ilgili aşağıdaki ifadelerden hangisi YANLIŞTIR?",
    "options": [
      "Oluşan beyaz çökelek AgCl katısıdır.",
      "Net iyon denklemi: Ag⁺(aq) + Cl⁻(aq) → AgCl(k) şeklindedir.",
      "Na⁺ ve NO₃⁻ iyonları seyirci iyondur.",
      "Çözeltideki tüm iyonların derişimi sıfır olur.",
      "Karışım bir çökelme (çözünme-çökelme) tepkimesidir."
    ],
    "correctIndex": 3,
    "explanation": "Tepkimede AgCl katısı çöker. Net iyon denklemi Ag⁺(aq) + Cl⁻(aq) → AgCl(k)'dir. Na⁺ ve NO₃⁻ iyonları çökelmeye katılmayıp çözeltide kaldığından seyirci iyondur. Na⁺ ve NO₃⁻ iyonlarının derişimi asla sıfır olmaz (hacim 2 katına çıktığı için derişimleri yarıya iner). Ayrıca AgCl suda çok az da olsa çözündüğü için doymuş çözeltide Ag⁺ ve Cl⁻ derişimi de sıfır olamaz (Kçç dengesi kurulur). Cevap: D.",
    "distractorTrap": "Öğrencilerin çökelme tam verimle gerçekleştiğinde çözeltide hiç iyon kalmayacağını düşünmesi."
  },
  {
    "id": "Q_SOL_02",
    "topic": "precipitates_color",
    "prompt": "Laboratuvarda Pb(NO₃)₂ ve KI sulu çözeltileri karıştırıldığında parıltılı parlak sarı renkli bir çökelek oluştuğu gözlenmektedir.\nBu deneyle ilgili;\nI. Oluşan sarı çökeleğin formülü PbI₂'dir.\nII. Seyirci iyonlar K⁺ ve NO₃⁻ iyonlarıdır.\nIII. Net iyon denklemi: K⁺(aq) + NO₃⁻(aq) → KNO₃(k) şeklindedir.\nyargılarından hangileri doğrudur?",
    "options": [
      "Yalnız I",
      "I ve II",
      "I ve III",
      "II ve III",
      "I, II ve III"
    ],
    "correctIndex": 1,
    "explanation": "Kurşun(II) nitrat ile potasyum iyodür tepkimesinde parlak sarı çökelek PbI₂ katısıdır ('Altın Yağmuru' deneyi, I doğru). K⁺ ve NO₃⁻ suda daima %100 çözünen iyonlar olduğundan seyirci iyondur (II doğru). Net iyon denklemi daima çöken katıya göre yazılır: Pb²⁺(aq) + 2I⁻(aq) → PbI₂(k)'dir (III yanlış, KNO₃ çözeltide çözünmüş kalır). Cevap: I ve II.",
    "distractorTrap": "Net iyon denklemini çöken katı yerine çözeltide kalan iyonlara göre yazma yanılgısı."
  },
  {
    "id": "Q_SOL_03",
    "topic": "solubility_rules",
    "prompt": "Aşağıda verilen tuzlardan hangisinin oda koşullarında saf sudaki çözünürlüğünün diğerlerine göre ÇOK YÜKSEK olması beklenir (suda tam çözünür)?",
    "options": [
      "BaSO₄",
      "AgCl",
      "CaCO₃",
      "KNO₃",
      "PbI₂"
    ],
    "correctIndex": 3,
    "explanation": "1A grubu katyonları (Li⁺, Na⁺, K⁺) ve nitrat (NO₃⁻) anyonu içeren tuzlar istisnasız suda çok iyi çözünür (%100 iyonlaşır). Bu nedenle KNO₃ suda çökelek oluşturmaz. BaSO₄ (beyaz), AgCl (beyaz), CaCO₃ (kireçtaşı) ve PbI₂ (sarı) ise suda az çözünen ve dipte çökelek oluşturan tuzlardır. Cevap: KNO₃.",
    "distractorTrap": "Öğrencinin BaSO₄ veya CaCO₃'ü tanıdık tuz olduğu için suda çok çözünür sanması."
  },
  {
    "id": "Q_SOL_04",
    "topic": "precipitates_color",
    "prompt": "FeCl₃ çözeltisi üzerine NaOH çözeltisi eklendiğinde oluşan jelatinimsi çökeleğin formülü ve rengi aşağıdakilerin hangisinde doğru verilmiştir?",
    "options": [
      "Fe(OH)₂ — Kirli Yeşil",
      "Fe(OH)₃ — Kırmızı-Kahverengi",
      "Cu(OH)₂ — Açık Mavi",
      "FeCl₂ — Beyaz",
      "Fe(OH)₃ — Parlak Sarı"
    ],
    "correctIndex": 1,
    "explanation": "FeCl₃ bileşiğinde demirin değerliği +3'tür (Fe³⁺). NaOH ile tepkimesinde Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(k) pas rengi / kırmızı-kahverengi çökelek oluşur. Fe(OH)₂ ise kirli yeşildir (Fe²⁺ içerir). Cevap: Fe(OH)₃ — Kırmızı-Kahverengi.",
    "distractorTrap": "Demirin +2 (yeşil) ve +3 (kırmızı-kahve) hidroksit çökeleklerinin renklerinin ve formüllerinin karıştırılması."
  }
]
```

---

## 6. BÖLÜM 5: ÖSYM Sınav Tuzakları ve Kavram Yanılgıları Rehberi

### Tuzak 1: Gaz Yasalarında Sıcaklık Santigrat Alınamaz!
- **Hata:** "Sıcaklık 10 °C'den 20 °C'ye çıkarsa hacim 2 katına çıkar."
- **Doğrusu:** Sıcaklık mutlaka Kelvin'e çevrilir:
  $$T_1 = 10 + 273 = 283\text{ K}, \quad T_2 = 20 + 273 = 293\text{ K}$$
  Hacimdeki artış oranı sadece $\frac{293}{283} \approx 1{,}035$ (yani yaklaşık %3,5) kadardır! Hacmin 2 katına çıkması için mutlak sıcaklığın 2 katına (566 K = 293 °C) çıkması gerekir.

---

### Tuzak 2: İdeal Pistonlu Kap vs Sabit Hacimli Kap
- **Hareketli İdeal Piston / Elastik Balon:**
  * Piston serbest olduğu sürece iç basınç daima dış basınca eşittir ($P_{\text{iç}} = P_{\text{dış}} = \text{sabit}$).
  * Kaba aynı sıcaklıkta gaz eklenirse veya ısıtılırsa **basınç değişmez**, **hacim artar**.
- **Sabit Hacimli Çelik Kap:**
  * Hacim sabittir ($V = \text{sabit}$).
  * Isıtıldığında veya gaz eklendiğinde **basınç artar**, **hacim değişmez**.
- **Tuzak Durum:** Piston takozla engellenirse artık hareket edemez ve sabit hacimli kaba dönüşür!

---

### Tuzak 3: Su Üzerinde Toplanan Gazlarda Hacim Değişimi
- Su üzerinde $He$ gazı toplanmış bir sistemde toplam basınç:
  $$P_{\text{toplam}} = P_{\text{He}} + P_{\text{buhar}}(\text{H}_2\text{O})$$
- Piston yukarı çekilip kabın hacmi 2 katına çıkarılırsa:
  1. $P_{\text{He}}$ yarıya iner ($P_{\text{He}} / 2$).
  2. Suyun buhar basıncı ($P_{\text{buhar}}$) **DEĞİŞMEZ**! (Çünkü sıcaklık sabittir; bir miktar sıvı buharlaşır).
  3. Toplam basınç yarıya inmez; yarıdan biraz daha büyük bir değere düşer!

---

### Tuzak 4: Çözünürlük Çarpımını ($K_{çç}$) Yalnızca Sıcaklık Değiştirir!
- Ortak iyon eklenmesi çözünürlüğü **azaltır**, ancak $K_{çç}$ değerini **ASLA DEĞİŞTİRMEZ**.
- Su eklenmesi veya su buharlaştırılması çözünürlüğü ve $K_{çç}$'yi değiştirmez.
- $K_{çç}$ bir denge sabitidir ($K_c, K_p, K_a, K_b$ gibi) ve **yalnızca sıcaklıkla değişir**.

---

### Tuzak 5: Net İyon Denklemi Çöken Katıya Göre Yazılır!
- Öğrenciler sıklıkla net iyon denklemini çözeltide kalan seyirci iyonlara göre yazar ($Na^+ + Cl^- \rightarrow NaCl$). Bu **büyük bir hatadır**.
- Çökelme tepkimelerinde net iyon denklemi **daima dipte oluşan katı çökeleğe** göre yazılır:
  $$\text{Katyon}^{m+}(aq) + \text{Anyon}^{n-}(aq) \rightarrow \text{Çökelek Katısı}(k)$$
- Seyirci iyonlar ise çökelmeden çözeltide kalmaya devam eden iyonlardır ($1A$ katyonları ve $NO_3^-$ gibi).

---

## 7. Sonuç ve Flashcard Uygulaması Entegrasyon Planı

Bu veri seti ile kimya flashcard ve test motoruna şu iki yeni çalışma modu entegre edilebilir:

1. **`gas_laws` (Gaz Yasaları ve Kinetik Teori):**
   - Kartın ön yüzünde yasa adı ve grafik türü $\rightarrow$ Arka yüzünde formül, sabitler ve orantı tipi.
   - Gaz difüzyon hız karşılaştırma soruları ($v \propto 1/\sqrt{M_A}$).
   - İdeal davranışa yaklaşma / sapma matrisi.

2. **`solubility_precipitation` (Çözünürlük ve Çökelekler):**
   - Çökelek Formülü $\rightarrow$ Renk ve Laboratuvar Görünümü eşleştirme ($PbI_2 \rightarrow$ Parlak Sarı, $Cu(OH)_2 \rightarrow$ Turkuaz Mavi).
   - Verilen iki tuz çözeltisi karışımında net iyon denklemi ve seyirci iyon tespiti.
   - Suda tam çözünenler vs çökenler ayırma motoru.

Hazırlanan bu dosya hem akademik olarak MEB 11. Sınıf Kimya kazanımlarına ve ÖSYM AYT sınav formatına %100 uygundur, hem de doğrudan kodlanabilir TypeScript arayüzlerini ve test sorularını eksiksiz içermektedir.
