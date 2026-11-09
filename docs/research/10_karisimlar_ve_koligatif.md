# MEB ve ÖSYM YKS Kimya Müfredatı Kapsamlı Araştırma: Karışımlar (TYT) ve Sıvı Çözeltiler & Koligatif Özellikler (AYT)

**MEB & ÖSYM Standartlarına Uygun Pedagojik İnceleme, Çeldirici Analizi ve Oyunlaştırılmış Veri Seti Mimarisi**

---

## 1. Yönetici Özeti ve Müfredat Çerçevesi

Kimya eğitiminde **Karışımlar (10. Sınıf / TYT)** ve **Sıvı Çözeltiler & Koligatif Özellikler (11. Sınıf / AYT)** üniteleri, ÖSYM sınavlarında istisnasız **her yıl en az 1 TYT ve 1-2 AYT sorusunun** doğrudan geldiği omurga konulardır.

- **TYT Kimya (10. Sınıf 2. Ünite):** Karışımların sınıflandırılması (homojen çözeltiler, heterojen süspansiyon, emülsiyon, aerosol, kolloid, adi karışım), tanecik boyutları ($<1\text{ nm}$, $1-1000\text{ nm}$, $>1000\text{ nm}$), Tyndall etkisi, kütlece/hacimce yüzde derişim ve ayırma teknikleri.
- **AYT Kimya (11. Sınıf 3. Ünite):** Çözeltilerde derişim birimleri (Molarite, Molalite, ppm, Mol Kesri), çözünme mekanizması, Raoult Yasası ile buhar basıncı düşmesi, Ebülyoskopi (kaynama noktası yükselmesi), Kriyoskopi (donma noktası alçalması), van 't Hoff tanecik faktörü ($i$), ozmotik basınç ve ters ozmoz (reverse osmosis).

Bu doküman, öğrencilerin sınav anında en çok karıştırdığı noktaları analiz eder, akıllı çeldirici stratejileri geliştirir ve modern interaktif web uygulamamıza (`kimyaatom`) doğrudan aktarılabilecek TypeScript tabanlı veri yapıları sunar.

---

## 2. Kısım 1: TYT Karışım Türleri ve Sınıflandırma (10. Sınıf)

### 2.1. Karışımların Temel Özellikleri
1. **Formülleri ve sembolleri yoktur.** (Saf maddeler element sembolü veya bileşik formülü ile gösterilir; karışımlar ise bir araya gelen maddelerin oranlarıyla ifade edilir).
2. **Bileşenleri kendi kimyasal özelliklerini korur.** Fiziksel yollarla oluşur ve fiziksel yollarla bileşenlerine ayrılır.
3. **Bileşenleri arasında sabit bir oran yoktur.** İstenilen oranda karıştırılabilirler (Doygunluk sınırına kadar).
4. **Erime noktası, kaynama noktası ve yoğunluk gibi ayırt edici özellikleri sabit değildir.** Derişime bağlı olarak değişir.
5. **Kütle daima korunur ($m_{\text{karışım}} = m_1 + m_2$), ancak hacim her zaman korunmayabilir ($V_{\text{karışım}} \neq V_1 + V_2$).** Moleküller arasındaki boşluklara yerleşim nedeniyle genellikle $V_{\text{toplam}} < V_1 + V_2$ gerçekleşir (örn. 50 mL su + 50 mL alkol $\approx 96$ mL çözelti).

---

### 2.2. Tanecik Boyutuna Göre Sınıflandırma ve Tyndall Etkisi

MEB müfredatında karışımlar, dağılan taneciklerin çapına göre 3 ana kategoriye ayrılır:

| Özellik | Çözelti (Homojen) | Kolloid (Heterojen) | Süspansiyon (Heterojen) |
|---|---|---|---|
| **Tanecik Çapı ($d$)** | $d < 1\text{ nm}$ ($10^{-9}\text{ m}$) | $1\text{ nm} \le d \le 1000\text{ nm}$ | $d > 1000\text{ nm}$ ($10^{-6}\text{ m}$) |
| **Gözle Görünüm** | Homojen, berrak, şeffaf | Dışarıdan homojen gibi durabilir (bulanık/yarı saydam) | Kesinlikle heterojen, bulanık |
| **Işık Demeti (Tyndall Etkisi)** | **Işığı saçmaz.** Işık demeti çözelti içinden geçerken izi görünmez. | **Işığı saçar.** Işık demetinin izi ve saçılan parçacıklar belirgin şekilde görülür. | **Işığı saçar veya tamamen bloke eder.** |
| **Süzme Kağıdı ile Ayrılma** | Süzgeç kağıdından geçer, ayrılamaz. | Normal süzgeç kağıdından geçer; ultrafiltre/santrifüj ile ayrılabilir. | Normal süzgeç kağıdıyla kolayca süzülerek ayrılır. |
| **Bekletilince Davranış** | Çökelti oluşmaz, faz ayrılmaz, süreklidir. | Yerçekimi etkisiyle kendiliğinden çökmez (koloidal stabilite). | Yerçekimi etkisiyle katı tanecikler zamanla dibe çöker. |
| **Örnekler** | Şekerli su, tuzlu su, gazoz, hava, lehim. | Kan, süt, krema, jelatin, jöle, mayonez, sis. | Ayran, çamurlu su, Türk kahvesi, tebeşir tozu-su. |

> [!IMPORTANT]
> **Tyndall Etkisi ve Sınav Tuzağı:**
> ÖSYM sorularında "çıplak gözle homojen gibi görünen ancak lazer ışığı tutulduğunda ışık saçılması (Tyndall etkisi) gözlenen karışım türü nedir?" sorusu kolloidleri ($1-1000\text{ nm}$) işaret eder. Süt ve kan bu sorunun vazgeçilmez örnekleridir.

---

### 2.3. Karışım Türleri ve Günlük Hayat Örnekleri

#### A. Homojen Karışımlar (Çözeltiler)
Her noktasında aynı özellikleri gösteren, tek bir fazdan oluşan karışımlardır.

- **Katı - Sıvı Çözeltiler:**
  * **Şekerli Su:** $C_{12}H_{22}O_{11}$ veya $C_6H_{12}O_6$ moleküllerinin suda hidrojen bağlarıyla moleküler çözünmesi.
  * **Tuzlu Su:** $NaCl$ kristallerinin suda iyonlaşarak (iyon-dipol) çözünmesi.
  * **Tentürdiyot:** Katı iyot ($I_2$) ve potasyum iyodürün ($KI$) etil alkol içindeki çözeltisi.
- **Sıvı - Sıvı Çözeltiler:**
  * **Kolonya:** Etil alkol ($C_2H_5OH$) ve su homojen karışımı (genellikle %80 veya %70 hacimce).
  * **Sirke:** Asetik asit ($CH_3COOH$) ve su homojen karışımı (yaklaşık %4-5 asetik asit).
  * **Antifriz:** Etilen glikol ($C_2H_6O_2$) ve su homojen karışımı.
- **Gaz - Sıvı Çözeltiler:**
  * **Gazoz / Maden Suyu (Soda):** Karbondioksit ($CO_2$) gazının yüksek basınç altında suda çözünmesi.
  * **Akvaryum Suyu / Deniz Suyu:** Oksijen ($O_2$) ve azot gazlarının suda çözünmüş hali.
- **Gaz - Gaz Karışımları:**
  * **Hava:** Yaklaşık %78 $N_2$, %21 $O_2$, %0.9 $Ar$, %0.04 $CO_2$ ve diğer gazlar.
  * *Kritik Kural:* **Tüm gaz karışımları gazların her oranda birbiriyle karışabilmesi nedeniyle istisnasız HOMOJENDİR.**
- **Katı - Katı Homojen Karışımlar (Alaşımlar):**
  * Metallerin eritilip homojen karıştırıldıktan sonra soğutulmasıyla elde edilen metal-metal (veya metal-ametal) çözeltileridir.
  * **Lehim:** Kalay ($Sn$) + Kurşun ($Pb$)
  * **Tunç (Bronz):** Bakır ($Cu$) + Kalay ($Sn$)
  * **Pirinç:** Bakır ($Cu$) + Çinko ($Zn$)
  * **14 / 18 / 22 Ayar Altın:** Altın ($Au$) + Bakır ($Cu$) veya Gümüş ($Ag$)
  * **Çelik:** Demir ($Fe$) + Karbon ($C$)
  * **Diş Amalgamı:** Cıva ($Hg$) + Gümüş ($Ag$) / Kalay ($Sn$)

---

#### B. Heterojen Karışımlar ve Alt Sınıfları
Her yerinde aynı özelliği göstermeyen, birden fazla faza sahip karışımlardır. Dağıtan faz ve dağılan faz olmak üzere en az iki bileşenden oluşurlar.

1. **Süspansiyon (Katı - Sıvı Heterojen Karışımlar):**
   - Sıvı içerisinde çözünmeyen katı parçacıkların yerçekimine karşı geçici olarak asılı kaldığı, bekletildiğinde çöken heterojen sistemlerdir.
   - Tanecik boyutu $> 1000\text{ nm}$'dir.
   - **Örnekler:**
     * **Ayran:** Yoğurt katı partiküllerinin su içerisinde süspansiyonu (çalkalanarak içilmesinin nedeni budur!).
     * **Çamurlu Su:** Toprak/kil katı parçacıklarının suda asılı kalması.
     * **Türk Kahvesi:** Telvenin su içinde süspansiyonu (bekleyince telve dibe çöker).
     * **Tebeşir Tozu - Su:** $CaCO_3$ katısının suda çözünmeyip dibe çökmesi.
     * **Naftalin - Su:** Apolar naftalinin polar suda çözünmeyip yüzmesi/çökmesi.
     * **Taze Sıkılmış Meyve Suyu (Posa içeren portakal suyu).**

2. **Emülsiyon (Sıvı - Sıvı Heterojen Karışımlar):**
   - Birbiri içinde çözünmeyen (genellikle polar-apolar uyuşmazlığı olan) iki sıvının birbiri içinde mikroskobik damlacıklar halinde dağılmasıdır.
   - **Örnekler:**
     * **Zeytinyağı - Su:** Polar su ile apolar zeytinyağının ayrışması (yoğunluk farkıyla üstte toplanır).
     * **Benzin - Su / Mazot - Su:** Hidrokarbonların suyla karışmaması.
     * **Mayonez:** Sıvı yağ ve sirke/limon suyunun yumurta sarısındaki *lesitin* emülgatörü ile kararlı hale getirilmiş emülsiyonudur.
     * **Süt:** Su içinde süt yağı damlacıklarının dağılması (aynı zamanda kolloid yapıdır).
     * **Cıva - Su:** Metalik sıvı cıva ile su karışımı.

3. **Aerosol (Gaz Dağıtıcı Faz İçinde Katı veya Sıvı Dağılması):**
   - Dağıtan fazın kesinlikle **GAZ** olduğu heterojen sistemlerdir.
   - **Sıvı Aerosol (Gaz içinde Sıvı damlacıkları):**
     * **Sis:** Havadaki yoğunlaşmış su damlacıkları.
     * **Bulut:** Gökyüzündeki su zerrecikleri.
     * **Deodorant / Saç Spreyi:** Gaz itici faz içinde dağılan sıvı kozmetik parçacıkları.
     * **Böcek İlacı Spreyleri.**
   - **Katı Aerosol (Gaz içinde Katı parçacıkları):**
     * **Duman:** Yanma sonucu havaya karışan katı karbon ve kül tanecikleri.
     * **Tozlu Hava:** Havada uçuşan mikroskobik toz ve mineral parçacıkları.
     * **Volkanik Kül Bulutu:** Gaz içinde dağılan volkanik katı partiküller.
     * **Baca Gazı.**

4. **Kolloid (Tanecik Boyutu 1 - 1000 nm Arası Olan Sistemler):**
   - Dağılan fazın dağıtan faz içinde gözle görülemeyecek kadar küçük ($1-1000\text{ nm}$), ancak moleküler boyuttan daha büyük parçacıklar halinde asılı kaldığı heterojen karışımlardır.
   - Çıplak gözle bakıldığında çoğu zaman **homojen sanılır**, ancak optik mikroskop veya **Tyndall etkisi (ışık saçılması)** ile heterojen olduğu ispatlanır.
   - Bekletilmekle yerçekimi etkisiyle kendiliğinden çökmez; santrifüjleme, elektrik alan (elektroforez) veya koagülasyon (pıhtılaştırma) ile çöktürülür.
   - **Örnekler:**
     * **Kan:** Plazma sıvısı içinde kan hücrelerinin koloidal dağılımı.
     * **Süt:** Kazein proteinleri ve süt yağının koloidal süspansiyonu.
     * **Krema / Çırpılmış Krema:** Gazın sıvı içinde koloidal dağılımı.
     * **Jelatin ve Jöle:** Sıvının katı ağ yapısı içinde hapsedildiği koloidal jel yapılar.
     * **Mayonez:** Yağın su içinde koloidal emülsiyonu.
     * **Mürekkep ve Yağlı Boya:** Katı pigmentlerin sıvı bağlayıcı içinde koloidal dağılımı.
     * **Köpük (Tıraş Köpüğü, Sabun Köpüğü):** Sıvı içinde dağılmış gaz kabarcıkları.

5. **Adi Karışım (Kaba Heterojen Karışımlar):**
   - Genellikle katı-katı maddelerin rastgele ve düzensiz şekilde bir araya gelmesiyle oluşan kaba karışımlardır.
   - **Örnekler:**
     * **Kuruyemiş (Karışık Çerez)**
     * **Kum - Çakıl / Kum - Demir Tozu**
     * **Toprak**
     * **Salata**
     * **Kükürt Tozu - Demir Tozu**

---

### 2.4. Karışımların Ayrılması Teknikleri (Hızlı TYT Referansı)

| Ayırma Yöntemi | Temel Alınan Özellik Farkı | Tipik Örnekler |
|---|---|---|
| **Mıknatıs ile Ayırma** | Manyetik Özellik ($Fe, Co, Ni$) | Demir tozu + Kükürt tozu (Alaşımlar mıknatısla ayrılamaz!) |
| **Eleme** | Tanecik Boyutu Farkı (Katı-Katı) | Kum - Çakıl, Un - Kepek |
| **Süzme** | Tanecik Boyutu Farkı (Katı-Sıvı / Katı-Gaz) | Tebeşir tozu-su, Çamurlu su, Toz maskesi, Araç hava filtresi |
| **Diyaliz** | Tanecik Boyutu (Yarı geçirgen zarla kolloid temizliği) | Kanda metabolik atıkların (üre) temizlenmesi |
| **Ayırma Hunisi** | Yoğunluk Farkı (Birbirinde çözünmeyen Sıvı-Sıvı) | Zeytinyağı - Su, Benzin - Su |
| **Yüzdürme (Flotasyon)** | Yoğunluk Farkı (Katı-Katı veya Katı-Sıvı) | Talaş - Kum karışımı, Maden cevherlerinin zenginleştirilmesi |
| **Santrifüjleme** | Yoğunluk ve Yerçekimi İvmesi Artışı | Kan tüplerinde plazma ile kan hücrelerinin ayrılması |
| **Basit Damıtma (Destilasyon)** | Kaynama Noktası Farkı (Katı-Sıvı Homojen) | Tuzlu sudan saf su elde edilmesi |
| **Ayrımsal Damıtma** | Kaynama Noktaları Farkı (Sıvı-Sıvı Homojen) | Ham petrolün fraksiyonları, Kolonya (Etanol-Su) |
| **Ayrımsal Kristallendirme** | Çözünürlüğün Sıcaklıkla Değişimi Farkı (Katı-Katı) | $KNO_3$ ve $NaCl$ karışımının ayrılması |
| **Özütleme (Ekstraksiyon / Çekme)** | Çözünürlük Farkı (Bir çözücü yardımıyla alma) | Çayın demlenmesi, Şeker pancarından şeker üretimi, Parfüm esansı |

---

## 3. Kısım 2: AYT Sıvı Çözeltiler ve Koligatif Özellikler (11. Sınıf)

### 3.1. Koligatif Özellik Nedir?
Çözeltide çözünen maddenin **kimyasal yapısına, formülüne veya türüne bağlı OLMAYAN**, sadece ve sadece çözeltideki **toplam tanecik (iyon veya molekül) derişimine (sayısına)** bağlı olan fiziksel özelliklere **Koligatif Özellikler** denir.

4 Temel Koligatif Özellik vardır:
1. **Buhar Basıncı Düşmesi** (Raoult Yasası)
2. **Kaynama Noktası Yükselmesi** (Ebülyoskopi)
3. **Donma Noktası Alçalması** (Kriyoskopi)
4. **Ozmotik Basınç ve Ters Ozmoz**

---

### 3.2. van 't Hoff Faktörü ($i$) ve İyonlaşma Mantığı

van 't Hoff faktörü ($i$), bir bileşiğin 1 molü suya atıldığında ortama verdiği **serbest tanecik (molekül veya iyon) mol sayısını** gösterir.

$$\text{Toplam Tanecik Derişimi} = \text{Bileşiğin Derişimi} \times i$$

#### Kural 1: Kovalent / Moleküler Çözünenler ($i = 1$)
Moleküler yapılı organik bileşikler suda iyonlarına ayrışmaz, molekül bütünlüğünü koruyarak hidratize olurlar.
- **Glikoz:** $C_6H_{12}O_6(k) \xrightarrow{H_2O} C_6H_{12}O_6(suda) \implies i = 1$
- **Sakkaroz (Çay Şekeri):** $C_{12}H_{22}O_{11}(k) \xrightarrow{H_2O} C_{12}H_{22}O_{11}(suda) \implies i = 1$
- **Etil Alkol:** $C_2H_5OH(s) \xrightarrow{H_2O} C_2H_5OH(suda) \implies i = 1$
- **Üre:** $CO(NH_2)_2(k) \xrightarrow{H_2O} CO(NH_2)_2(suda) \implies i = 1$
- **Gliserin (Gliserol):** $C_3H_8O_3(s) \xrightarrow{H_2O} C_3H_8O_3(suda) \implies i = 1$

#### Kural 2: İki İyonlu Elektrolitler ($i = 2$)
1 katyon ve 1 anyon veren tuzlar, tek protonlu kuvvetli asitler ve bazlar:
- $NaCl(k) \rightarrow Na^+(suda) + Cl^-(suda) \implies i = 1 + 1 = 2$
- $KNO_3(k) \rightarrow K^+(suda) + NO_3^-(suda) \implies i = 1 + 1 = 2$
- $MgSO_4(k) \rightarrow Mg^{2+}(suda) + SO_4^{2-}(suda) \implies i = 1 + 1 = 2$
- $HCl(g) \rightarrow H^+(suda) + Cl^-(suda) \implies i = 1 + 1 = 2$
- $NaOH(k) \rightarrow Na^+(suda) + OH^-(suda) \implies i = 1 + 1 = 2$
- $AgNO_3(k) \rightarrow Ag^+(suda) + NO_3^-(suda) \implies i = 1 + 1 = 2$

#### Kural 3: Üç İyonlu Elektrolitler ($i = 3$)
1 katyon + 2 anyon veya 2 katyon + 1 anyon veren bileşikler:
- $CaCl_2(k) \rightarrow Ca^{2+}(suda) + 2Cl^-(suda) \implies i = 1 + 2 = 3$
- $Mg(NO_3)_2(k) \rightarrow Mg^{2+}(suda) + 2NO_3^-(suda) \implies i = 1 + 2 = 3$
- $Na_2SO_4(k) \rightarrow 2Na^+(suda) + SO_4^{2-}(suda) \implies i = 2 + 1 = 3$
- $K_2CO_3(k) \rightarrow 2K^+(suda) + CO_3^{2-}(suda) \implies i = 2 + 1 = 3$
- $Ba(OH)_2(k) \rightarrow Ba^{2+}(suda) + 2OH^-(suda) \implies i = 1 + 2 = 3$

#### Kural 4: Dört İyonlu Elektrolitler ($i = 4$)
1 katyon + 3 anyon veya 3 katyon + 1 anyon veren bileşikler:
- $AlCl_3(k) \rightarrow Al^{3+}(suda) + 3Cl^-(suda) \implies i = 1 + 3 = 4$
- $Fe(NO_3)_3(k) \rightarrow Fe^{3+}(suda) + 3NO_3^-(suda) \implies i = 1 + 3 = 4$
- $Na_3PO_4(k) \rightarrow 3Na^+(suda) + PO_4^{3-}(suda) \implies i = 3 + 1 = 4$
- $FeCl_3(k) \rightarrow Fe^{3+}(suda) + 3Cl^-(suda) \implies i = 1 + 3 = 4$

#### Kural 5: Beş İyonlu Elektrolitler ($i = 5$)
2 katyon + 3 anyon veren tuzlar:
- $Al_2(SO_4)_3(k) \rightarrow 2Al^{3+}(suda) + 3SO_4^{2-}(suda) \implies i = 2 + 3 = 5$
- $Ca_3(PO_4)_2(k) \rightarrow 3Ca^{2+}(suda) + 2PO_4^{3-}(suda) \implies i = 3 + 2 = 5$

---

### 3.3. Dört Koligatif Özelliğin Detaylı Mekanizması

#### 1. Buhar Basıncı Düşmesi (Raoult Yasası)
- **Mekanizma:** Bir sıvının buharlaşması yüzeydeki moleküller aracılığıyla gerçekleşir. Sıvıda uçucu olmayan katı bir madde ($NaCl$, şeker vb.) çözündüğünde, yüzeydeki su moleküllerinin bir kısmının yerini çözünen tanecikleri alır. Ayrıca çözünen-çözücü arasındaki çekim kuvvetleri (iyon-dipol veya hidrojen bağı) su moleküllerinin gaz fazına geçişini zorlaştırır.
- Bu nedenle, **uçucu olmayan katı içeren bir çözeltinin buhar basıncı, aynı sıcaklıktaki saf çözücünün buhar basıncından DAİMA DÜŞÜKTÜR.**
- **Raoult Yasası Formülü:**
  $$P_{\text{çözelti}} = P^\circ_{\text{çözücü}} \cdot X_{\text{çözücü}}$$
  *(Burada $P^\circ_{\text{çözücü}}$ saf çözücünün o sıcaklıktaki buhar basıncı, $X_{\text{çözücü}} = \frac{n_{\text{çözücü}}}{n_{\text{toplam}}}$ ise çözücünün mol kesridir).*
- Uçucu iki sıvının ($A$ ve $B$) ideal karışımında toplam buhar basıncı:
  $$P_{\text{toplam}} = P^\circ_A \cdot X_A + P^\circ_B \cdot X_B$$

#### 2. Kaynama Noktası Yükselmesi (Ebülyoskopi)
- **Mekanizma:** Kaynama, bir sıvının iç buhar basıncının dış açık hava basıncına eşitlendiği anda başlar. Uçucu olmayan katı çözündüğünde buhar basıncı düştüğü için, çözeltinin buhar basıncının dış basınca ulaşabilmesi için sıcaklığın saf sıvının kaynama noktasının üzerine çıkarılması gerekir.
- **Formül:**
  $$\Delta T_k = K_k \cdot m \cdot i$$
  * $\Delta T_k$: Kaynama noktası yükselme miktarı ($T_{\text{çözelti}} - T^\circ_{\text{saf su}}$)
  * $K_k$: Molal kaynama noktası yükselme sabiti (Su için $K_k = 0{,}52\ ^\circ\text{C} \cdot \text{kg/mol}$)
  * $m$: Çözeltinin molalitesi ($m = \frac{n_{\text{çözünen}}}{m_{\text{çözücü(kg)}}}$)
  * $i$: van 't Hoff faktörü
- **Kritik Isınma Eğrisi Analizi:**
  * **Saf Su:** $100^\circ\text{C}$'de kaynamaya başlar ve kaynama süresince sıcaklık SABİT kalır.
  * **Doymamış Tuzlu Su:** $100 + \Delta T_k^\circ\text{C}$'de kaynamaya başlar. Kaynarken su buharlaşır, çözelti derişimi arttıkça kaynama sıcaklığı YÜKSELMEYE DEVAM EDER.
  * **Doygun Tuzlu Su:** Çözelti doygunluğa ulaştığında artık derişim değişmeyeceğinden sıcaklık SABİTLENİR.

#### 3. Donma Noktası Alçalması (Kriyoskopi)
- **Mekanizma:** Donma olayı, sıvı moleküllerinin düzenli bir kristal örgü katı yapısına geçmesidir. Çözünen yabancı tanecikler çözücü moleküllerinin arasına girerek onların düzenli bir kristal kafes oluşturmasını zorlaştırır. Donmanın gerçekleşebilmesi için taneciklerin kinetik enerjisinin daha da düşürülmesi (sıcaklığın daha da azaltılması) gerekir.
- **Formül:**
  $$\Delta T_d = K_d \cdot m \cdot i$$
  * $\Delta T_d$: Donma noktası alçalma miktarı ($T^\circ_{\text{saf su}} - T_{\text{çözelti}}$)
  * $K_d$: Molal donma noktası alçalma sabiti (Su için $K_d = 1{,}86\ ^\circ\text{C} \cdot \text{kg/mol}$)
  * $m$: Molalite
  * $i$: van 't Hoff faktörü
- *Dikkat:* Çözünenin uçucu olup olmaması donma noktasını etkilemez! Uçucu olan etil alkol de suya eklendiğinde donma noktasını düşürür.
- **Günlük Yaşam Örnekleri:**
  1. **Kışın yollara tuz ($NaCl$ veya $CaCl_2$) atılması:** Kar ve buzun erime sıcaklığını $0^\circ\text{C}$'nin altına düşürerek donmayı engellemek. ($CaCl_2$, $i=3$ olduğu için $NaCl$'ye ($i=2$) göre daha etkilidir).
  2. **Araç radyatörlerine antifriz (Etilen Glikol) konulması:** Radyatördeki suyun kışın donup motor bloğunu çatlatmasını önlemek.
  3. **Uçakların kanat ve gövdelerinin kışın alkol/glikol ile yıkanması:** Kalkış ve uçuş sırasında donmayı engellemek.
  4. **Denizlerin tatlı su göllerine göre çok daha geç donması:** Deniz suyunda çözünmüş tuzların donma noktasını düşürmesi (Karadeniz $\approx -1^\circ\text{C}$, Akdeniz $\approx -2^\circ\text{C}$).
  5. **Turşu ve peynir salamurasının donmaması:** Yüksek tuz derişiminin donma noktasını derin dondurucu derecelerine çekmesi.
  6. **Kışın soğukta yaşayan böcek ve kurbağaların kanında glikoz/gliserol biriktirmesi (biyolojik antifriz).**

#### 4. Ozmotik Basınç ve Ters Ozmoz (Reverse Osmosis)
- **Ozmoz:** Yarı geçirgen bir zar (semipermeable membrane) ile ayrılmış iki çözeltiden, sadece çözücü moleküllerinin (su) **derişimi az olan ortamdan (seyreltik) derişimi çok olan ortama (derişik)** doğru kendiliğinden geçişine ozmoz denir.
- **Ozmotik Basınç ($\Pi$):** Derişik çözeltinin saf çözücüyü veya seyreltik çözeltiyi emme kuvveti/isteğidir.
  $$\Pi = M \cdot R \cdot T \cdot i$$
- **Ters Ozmoz (Reverse Osmosis - RO):**
  * Eğer derişik çözelti tarafına **ozmotik basınçtan daha büyük harici bir mekanik basınç** uygulanırsa, süreç tersine döner: Su molekülleri çok yoğun (tuzlu) ortamdan az yoğun (saf) tarafa geçmeye zorlanır. Yarı geçirgen zar tuzları ve mikroorganizmaları tutar, sadece saf suyu geçirir.
  * **Kullanım Alanları:**
    1. **Deniz suyundan içme suyu eldesi (Desalinasyon - Çöl ve ada ülkelerinin ana su kaynağı).**
    2. **Böbrek hastalarında Hemodiyaliz makineleri.**
    3. **Ev tipi tezgah altı su arıtma filtreleri.**
    4. **Endüstriyel atık suların geri kazanımı.**

---

## 4. Kısım 3: Derişim Birimleri Atlası (AYT 11. Sınıf)

| Derişim Birimi | Sembol | Tanım Formülü | Birimi | Sınav İpuçları & Kritik Not |
|---|---|---|---|---|
| **Molarite** | $M$ | $M = \frac{n}{V}$ | $\text{mol/L}$ veya $\text{M}$ | $V$ çözeltinin toplam hacmidir (Litre). Sıcaklıkla değişir (hacim genleştiği için). |
| **Molalite** | $m$ | $m = \frac{n_{\text{çözünen}}}{m_{\text{çözücü (kg)}}}$ | $\text{mol/kg}$ veya $\text{m}$ | **Çözücünün kütlesi kg alınır!** Sıcaklıktan bağımsızdır. Koligatif özellik formüllerinde kullanılır. |
| **Kütlece Yüzde** | $\%C$ | $\%C = \frac{m_{\text{çözünen}}}{m_{\text{çözelti}}} \times 100$ | Birimsiz (%) | $m_{\text{çözelti}} = m_{\text{çözünen}} + m_{\text{çözücü}}$. Sıcaklıkla değişmez. |
| **Hacimce Yüzde** | $\%V$ | $\%V = \frac{V_{\text{çözünen}}}{V_{\text{çözelti}}} \times 100$ | Birimsiz (%) | Sıvı-sıvı çözeltilerde (kolonya, alkollü içecekler). Kolonyadaki derece ($80^\circ$) hacimce yüzdeyi belirtir. |
| **Milyonda Bir** | $\text{ppm}$ | $\text{ppm} = \frac{m_{\text{çözünen}}}{m_{\text{çözelti}}} \times 10^6$ | $\text{mg/kg}$ veya $\text{mg/L}$ | Eser miktardaki kirleticiler, içme suyu analizleri. $1\text{ ppm} = 1\text{ mg/kg} = 1\text{ mg/L}$ (su için). |
| **Mol Kesri** | $X_A$ | $X_A = \frac{n_A}{n_{\text{toplam}}}$ | Birimsiz ($0 \le X \le 1$) | Tüm bileşenlerin mol kesirleri toplamı daima 1'dir ($\sum X = 1$). Raoult yasasında kullanılır. |
| **Özkütle - Yüzde Dönüşümü** | $M$ | $M = \frac{d \cdot 10 \cdot \%}{M_A}$ | $\text{mol/L}$ | Akılda tutma kodlaması: **"Denizde Yüzen On Maymun"** ($d$: özkütle, $\%$: kütlece yüzde, $M_A$: mol kütlesi). |

---

## 5. Kısım 4: ÖSYM Sınav Çıkmış Soru Analizi & Kritik Çeldirici / Kavram Yanılgıları

### Tuzak 1: Kaynayan Çözeltilerin Buhar Basıncı Eşitliği
- **Kavram Yanılgısı:** Öğrenciler, tuzlu suyun kaynama noktası daha yüksek olduğu için ($105^\circ\text{C}$), saf suya göre ($100^\circ\text{C}$) buhar basıncının da farklı olacağını zannederler.
- **ÖSYM Gerçeği:** **Aynı ortamda (aynı dış basınçta) kaynamakta olan TÜM sıvıların iç buhar basınçları birbirine EŞİTTİR ve o ortamdaki açık hava basıncına eşittir!** (Örn: Deniz seviyesinde kaynayan saf suyun da buhar basıncı 1 atm'dir, kaynayan doymamış tuzlu suyun da 1 atm'dir).

### Tuzak 2: Molarite vs Toplam İyon Derişimi Tuzağı
- **Soru:** $0.5\text{ M } AlCl_3$ mü yoksa $1.0\text{ M } NaCl$ mi daha yüksek sıcaklıkta kaynar?
- **Çözüm:**
  * $0.5\text{ M } AlCl_3 \implies 0.5 \times (1 + 3) = 0.5 \times 4 = \mathbf{2.0\text{ M iyon}}$.
  * $1.0\text{ M } NaCl \implies 1.0 \times (1 + 1) = 1.0 \times 2 = \mathbf{2.0\text{ M iyon}}$.
  * Toplam iyon derişimleri eşit ($2.0\text{ M}$) olduğu için her iki çözeltinin de kaynama noktası yükselmesi ve donma noktası alçalması **EŞİTTİR!** Sadece molariteye bakan öğrenci elenir.

### Tuzak 3: Kolloidlerin Homojen Sanılması
- Süt, kan, mayonez, jöle gibi karışımlar çıplak gözle tek faz gibi görünür. Öğrenci "homojen çözelti" derse yanılır. Doğrusu: **Kolloiddir ve heterojendir.** Tyndall ışık saçılması ile ayırt edilir.

### Tuzak 4: Gaz Karışımlarının Heterojen Sanılması
- Öğrenci sis ve dumanı görünce gazların da heterojen karışabileceğini sanır. Oysa sis gaz-sıvı, duman gaz-katıdır. **Tüm gaz-gaz karışımları (hava vb.) istisnasız HOMOJENDİR.**

### Tuzak 5: Doymamış Tuzlu Suyun Kaynama Sıcaklığı Grafiği
- Saf su kaynarken sıcaklık sabittir. Doymamış tuzlu su kaynarken ise su buharlaştıkça derişim arttığı için **sıcaklık kaynama boyunca artmaya devam eder; ancak çözelti doygunluğa ulaştığında sıcaklık sabitlenir.**

---

## 6. Kısım 5: Oyunlaştırma (Gamification) Mimarisi ve Quiz Mekanikleri

Uygulamamızın mimarisine uygun iki tamamlayıcı konu modülü kurgulanmıştır:

### Modül 1 (TYT): `mixtures` — Karışımlar ve Türleri
- **Kategori:** `tyt`
- **İkon:** `🧪` veya `🥤`
- **Soru Yönleri (Directions):**
  1. `example_to_type` (Örnek $\rightarrow$ Karışım Türü): Örn: "Sis" $\rightarrow$ "Aerosol (Sıvı-Gaz)"
  2. `type_to_example` (Karışım Türü $\rightarrow$ Tipik Örnek): Örn: "Emülsiyon" $\rightarrow$ "Zeytinyağı - Su"
  3. `particle_size` (Tanecik Boyutu & Tyndall): Örn: "Kolloid" $\rightarrow$ "$1 - 1000\text{ nm}$, Işığı saçar"
  4. `separation_tech` (Karışım $\rightarrow$ Ayırma Tekniği): Örn: "Zeytinyağı - Su" $\rightarrow$ "Ayırma Hunisi"

### Modül 2 (AYT): `colligative` — Çözeltiler & Koligatif Özellikler
- **Kategori:** `ayt`
- **İkon:** `❄️` veya `🌡️`
- **Soru Yönleri (Directions):**
  1. `formula_to_vanthoff` (Formül $\rightarrow$ van 't Hoff Faktörü $i$): Örn: $Al_2(SO_4)_3 \rightarrow i = 5$
  2. `phenomenon_to_principle` (Günlük Yaşam $\rightarrow$ Koligatif İlke): Örn: "Yollara tuz atılması" $\rightarrow$ "Donma Noktası Alçalması"
  3. `colligative_duel` (Karşılaştırma Düellosu): "Hangisinin donma noktası daha düşüktür?" $\rightarrow$ İyon derişimi en yüksek olan.
  4. `concentration_formula` (Derişim Birimi $\rightarrow$ Formül/Tanım): Örn: "Molalite" $\rightarrow$ "$\text{mol çözünen} / \text{kg çözücü}$"

---

## 7. Kısım 6: Doğrudan Koda Aktarılabilir TypeScript Veri Modelleri ve Veri Setleri

Aşağıdaki veri setleri `src/data/mixtures.ts` ve `src/data/colligative.ts` olarak projeye doğrudan entegre edilebilir niteliktedir.

### 7.1. TYT Karışımlar Veri Seti (`src/data/mixtures.ts`)

```typescript
import { StandardQuizItem } from '../types/topics';

export interface MixtureData {
  id: number;
  name: string;
  type: 'Homojen (Çözelti)' | 'Süspansiyon' | 'Emülsiyon' | 'Aerosol' | 'Kolloid' | 'Adi Karışım';
  phases: string;                 // örn: "Sıvı - Sıvı", "Gaz - Katı"
  particleSize: '< 1 nm' | '1 - 1000 nm' | '> 1000 nm';
  tyndallEffect: boolean;         // Işığı saçar mı?
  separationMethod: string;       // Temel ayırma yöntemi
  dailyContext: string;           // Günlük hayat önemi / sınav dipnotu
}

export const MIXTURES: MixtureData[] = [
  // --- HOMOJEN KARIŞIMLAR (ÇÖZELTİLER) ---
  {
    id: 1,
    name: 'Gazoz',
    type: 'Homojen (Çözelti)',
    phases: 'Sıvı - Gaz',
    particleSize: '< 1 nm',
    tyndallEffect: false,
    separationMethod: 'Isıtma / Basıncı Düşürme',
    dailyContext: 'Karbondioksit gazının yüksek basınç altında suda çözünmesiyle oluşur.'
  },
  {
    id: 2,
    name: 'Hava',
    type: 'Homojen (Çözelti)',
    phases: 'Gaz - Gaz',
    particleSize: '< 1 nm',
    tyndallEffect: false,
    separationMethod: 'Ayrımsal Damıtma (Sıvılaştırılmış havanın)',
    dailyContext: 'Tüm gaz karışımları istisnasız homojendir. %78 N2, %21 O2 içerir.'
  },
  {
    id: 3,
    name: 'Lehim',
    type: 'Homojen (Çözelti)',
    phases: 'Katı - Katı (Alaşım)',
    particleSize: '< 1 nm',
    tyndallEffect: false,
    separationMethod: 'Erime Noktası Farkı',
    dailyContext: 'Kalay (Sn) ve Kurşun (Pb) metallerinin homojen katı-katı çözeltisidir.'
  },
  {
    id: 4,
    name: 'Tunç (Bronz)',
    type: 'Homojen (Çözelti)',
    phases: 'Katı - Katı (Alaşım)',
    particleSize: '< 1 nm',
    tyndallEffect: false,
    separationMethod: 'Erime Noktası Farkı',
    dailyContext: 'Bakır (Cu) ve Kalay (Sn) metallerinin homojen karışımıdır.'
  },
  {
    id: 5,
    name: 'Kolonya (%80)',
    type: 'Homojen (Çözelti)',
    phases: 'Sıvı - Sıvı',
    particleSize: '< 1 nm',
    tyndallEffect: false,
    separationMethod: 'Ayrımsal Damıtma',
    dailyContext: 'Etanol ve suyun hidrojen bağları oluşturarak her oranda homojen karışmasıdır.'
  },
  {
    id: 6,
    name: 'Şekerli Su',
    type: 'Homojen (Çözelti)',
    phases: 'Sıvı - Katı',
    particleSize: '< 1 nm',
    tyndallEffect: false,
    separationMethod: 'Basit Damıtma / Kristallendirme',
    dailyContext: 'Glikoz veya sakkaroz moleküllerinin suda moleküler çözünmesiyle oluşur.'
  },
  {
    id: 7,
    name: 'Tentürdiyot',
    type: 'Homojen (Çözelti)',
    phases: 'Sıvı - Katı',
    particleSize: '< 1 nm',
    tyndallEffect: false,
    separationMethod: 'Buharlaştırma / Damıtma',
    dailyContext: 'Katı iyot (I2) ve KI tuzunun etil alkolde çözünmesiyle oluşan antiseptik çözeltidir.'
  },

  // --- HETEROJEN: SÜSPANSİYON ---
  {
    id: 8,
    name: 'Ayran',
    type: 'Süspansiyon',
    phases: 'Katı - Sıvı',
    particleSize: '> 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Süzme / Santrifüj',
    dailyContext: 'Yoğurt partiküllerinin suda asılı kalmasıdır; bekletilince çöker, çalkalanarak içilir.'
  },
  {
    id: 9,
    name: 'Çamurlu Su',
    type: 'Süspansiyon',
    phases: 'Katı - Sıvı',
    particleSize: '> 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Süzme / Dinlendirme (Dekantasyon)',
    dailyContext: 'Toprak ve kil parçacıklarının suda çözünmeyip yerçekimiyle çökmesidir.'
  },
  {
    id: 10,
    name: 'Türk Kahvesi',
    type: 'Süspansiyon',
    phases: 'Katı - Sıvı',
    particleSize: '> 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Süzme / Çöktürme',
    dailyContext: 'İnce öğütülmüş kahve tanecikleri (telve) fincanın dibine çöker.'
  },
  {
    id: 11,
    name: 'Tebeşir Tozu - Su',
    type: 'Süspansiyon',
    phases: 'Katı - Sıvı',
    particleSize: '> 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Süzgeç Kağıdı ile Süzme',
    dailyContext: 'Kalsiyum karbonat (CaCO3) suda çözünmez ve süzgeç kağıdında kalır.'
  },

  // --- HETEROJEN: EMÜLSİYON ---
  {
    id: 12,
    name: 'Zeytinyağı - Su',
    type: 'Emülsiyon',
    phases: 'Sıvı - Sıvı',
    particleSize: '> 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Ayırma Hunisi (Yoğunluk Farkı)',
    dailyContext: 'Polar su ile apolar yağ moleküllerinin karışmayıp faz oluşturmasıdır.'
  },
  {
    id: 13,
    name: 'Mayonez',
    type: 'Emülsiyon',
    phases: 'Sıvı - Sıvı',
    particleSize: '1 - 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Santrifüj / Isıtarak Faz Ayırma',
    dailyContext: 'Yumurta sarısındaki lesitin maddesi emülgatör görevi görerek yağı suda askıda tutar.'
  },
  {
    id: 14,
    name: 'Benzin - Su',
    type: 'Emülsiyon',
    phases: 'Sıvı - Sıvı',
    particleSize: '> 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Ayırma Hunisi',
    dailyContext: 'Apolar hidrokarbonlar su ile karışmaz; özkütlesi küçük olan benzin üstte toplanır.'
  },
  {
    id: 15,
    name: 'Süt',
    type: 'Emülsiyon',
    phases: 'Sıvı - Sıvı (ve Kolloid)',
    particleSize: '1 - 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Santrifüjleme (Krema Ayırma)',
    dailyContext: 'Dışarıdan homojen görünür ancak süt yağı damlacıkları içerdiğinden koloidal emülsiyondur.'
  },

  // --- HETEROJEN: AEROSOL ---
  {
    id: 16,
    name: 'Sis',
    type: 'Aerosol',
    phases: 'Gaz içinde Sıvı',
    particleSize: '1 - 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Yoğuşturma / Isıtma',
    dailyContext: 'Hava gazı içinde mikroskobik su damlacıklarının asılı kalmasıdır (Sıvı Aerosol).'
  },
  {
    id: 17,
    name: 'Duman',
    type: 'Aerosol',
    phases: 'Gaz içinde Katı',
    particleSize: '1 - 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Elektrostatik Filtreleme (Cottrell Bacası)',
    dailyContext: 'Yanma sonucu oluşan gaz fazı içinde katı karbon/kül tanecikleridir (Katı Aerosol).'
  },
  {
    id: 18,
    name: 'Bulut',
    type: 'Aerosol',
    phases: 'Gaz içinde Sıvı',
    particleSize: '1 - 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Yağışa Dönüşme (Doğal Yoğuşma)',
    dailyContext: 'Gökyüzündeki havanın içinde asılı kalan mikron altı su zerrecikleridir.'
  },
  {
    id: 19,
    name: 'Deodorant / Sprey Boya',
    type: 'Aerosol',
    phases: 'Gaz içinde Sıvı/Katı',
    particleSize: '1 - 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Filtreleme',
    dailyContext: 'İtici gaz basıncıyla sıvı veya katı boya taneciklerinin püskürtülmesidir.'
  },

  // --- HETEROJEN: KOLLOİD ---
  {
    id: 20,
    name: 'Kan',
    type: 'Kolloid',
    phases: 'Sıvı içinde Katı Hücreler',
    particleSize: '1 - 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Santrifüj (Plazma ve Hücre Ayrımı)',
    dailyContext: 'ÖSYM klasiği: Homojen gibi görünür ama kolloiddir, Tyndall etkisi gösterir.'
  },
  {
    id: 21,
    name: 'Jelatin / Jöle',
    type: 'Kolloid',
    phases: 'Katı Ağ İçinde Sıvı (Jel)',
    particleSize: '1 - 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Isıtarak Sıvılaştırma',
    dailyContext: 'Protein liflerinin sıvıyı hapsederek oluşturduğu koloidal jel sistemidir.'
  },
  {
    id: 22,
    name: 'Krema',
    type: 'Kolloid',
    phases: 'Sıvı içinde Gaz / Yağ',
    particleSize: '1 - 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Santrifüjleme',
    dailyContext: 'Çırpılmış krema gaz kabarcıklarının yağ ve su fazında stabil koloidal dağılımıdır.'
  },

  // --- HETEROJEN: ADİ KARIŞIM ---
  {
    id: 23,
    name: 'Kuruyemiş (Karışık Çerez)',
    type: 'Adi Karışım',
    phases: 'Katı - Katı',
    particleSize: '> 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Ayıklama / Eleme',
    dailyContext: 'Katı parçacıkların rastgele karışımıdır, faz farkı gözle net görülür.'
  },
  {
    id: 24,
    name: 'Demir Tozu - Kükürt Tozu',
    type: 'Adi Karışım',
    phases: 'Katı - Katı',
    particleSize: '> 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Mıknatıs ile Ayırma',
    dailyContext: 'Demir mıknatıs tarafından çekilirken kükürt geride kalır.'
  },
  {
    id: 25,
    name: 'Kum - Çakıl',
    type: 'Adi Karışım',
    phases: 'Katı - Katı',
    particleSize: '> 1000 nm',
    tyndallEffect: true,
    separationMethod: 'Elek Kullanarak Eleme',
    dailyContext: 'İnşaatlarda kullanılan tanecik boyutu farkıyla ayırma örneğidir.'
  }
];

export function mixtureToQuizItem(m: MixtureData): StandardQuizItem {
  return {
    id: m.id,
    prompt: m.name,
    promptSub: `Faz: ${m.phases} | Tanecik Boyutu: ${m.particleSize}`,
    answer: m.type,
    synonyms: [m.type.toLowerCase()],
    category: m.type,
    infoChips: [
      { label: 'Karışım', value: m.name },
      { label: 'Tür', value: m.type },
      { label: 'Faz', value: m.phases },
      { label: 'Tanecik Çapı', value: m.particleSize },
      { label: 'Tyndall Etkisi', value: m.tyndallEffect ? 'Işığı Saçar' : 'Işığı Saçmaz' },
      { label: 'Ayırma Yolu', value: m.separationMethod }
    ],
    hint: `${m.dailyContext} (Tanecik boyutu: ${m.particleSize})`
  };
}
```

---

### 7.2. AYT Koligatif Özellikler & van 't Hoff Veri Seti (`src/data/colligative.ts`)

```typescript
import { StandardQuizItem } from '../types/topics';

export interface SoluteData {
  id: number;
  formula: string;
  name: string;
  vanTHoff_i: number;
  dissociationEquation: string;
  soluteType: 'Moleküler (İletmez)' | 'Kuvvetli Elektrolit (İletir)';
  cations: string;
  anions: string;
}

export const SOLUTES: SoluteData[] = [
  // --- i = 1 (MOLEKÜLER) ---
  {
    id: 1,
    formula: 'C6H12O6',
    name: 'Glikoz (Şeker)',
    vanTHoff_i: 1,
    dissociationEquation: 'C6H12O6(k) -> C6H12O6(suda)',
    soluteType: 'Moleküler (İletmez)',
    cations: 'Yok',
    anions: 'Yok'
  },
  {
    id: 2,
    formula: 'C12H22O11',
    name: 'Sakkaroz (Çay Şekeri)',
    vanTHoff_i: 1,
    dissociationEquation: 'C12H22O11(k) -> C12H22O11(suda)',
    soluteType: 'Moleküler (İletmez)',
    cations: 'Yok',
    anions: 'Yok'
  },
  {
    id: 3,
    formula: 'C2H5OH',
    name: 'Etil Alkol (Etanol)',
    vanTHoff_i: 1,
    dissociationEquation: 'C2H5OH(s) -> C2H5OH(suda)',
    soluteType: 'Moleküler (İletmez)',
    cations: 'Yok',
    anions: 'Yok'
  },
  {
    id: 4,
    formula: 'CO(NH2)2',
    name: 'Üre',
    vanTHoff_i: 1,
    dissociationEquation: 'CO(NH2)2(k) -> CO(NH2)2(suda)',
    soluteType: 'Moleküler (İletmez)',
    cations: 'Yok',
    anions: 'Yok'
  },

  // --- i = 2 (2 İYONLU ELEKTROLİT) ---
  {
    id: 5,
    formula: 'NaCl',
    name: 'Sodyum Klorür (Yemek Tuzu)',
    vanTHoff_i: 2,
    dissociationEquation: 'NaCl(k) -> Na+(suda) + Cl-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '1x Na+',
    anions: '1x Cl-'
  },
  {
    id: 6,
    formula: 'KNO3',
    name: 'Potasyum Nitrat (Güherçile)',
    vanTHoff_i: 2,
    dissociationEquation: 'KNO3(k) -> K+(suda) + NO3-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '1x K+',
    anions: '1x NO3-'
  },
  {
    id: 7,
    formula: 'MgSO4',
    name: 'Magnezyum Sülfat (İngiliz Tuzu)',
    vanTHoff_i: 2,
    dissociationEquation: 'MgSO4(k) -> Mg2+(suda) + SO4 2-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '1x Mg2+',
    anions: '1x SO4 2-'
  },
  {
    id: 8,
    formula: 'HCl',
    name: 'Hidroklorik Asit (Tuz Ruhu)',
    vanTHoff_i: 2,
    dissociationEquation: 'HCl(g) -> H+(suda) + Cl-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '1x H+',
    anions: '1x Cl-'
  },

  // --- i = 3 (3 İYONLU ELEKTROLİT) ---
  {
    id: 9,
    formula: 'CaCl2',
    name: 'Kalsiyum Klorür',
    vanTHoff_i: 3,
    dissociationEquation: 'CaCl2(k) -> Ca2+(suda) + 2Cl-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '1x Ca2+',
    anions: '2x Cl-'
  },
  {
    id: 10,
    formula: 'Mg(NO3)2',
    name: 'Magnezyum Nitrat',
    vanTHoff_i: 3,
    dissociationEquation: 'Mg(NO3)2(k) -> Mg2+(suda) + 2NO3-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '1x Mg2+',
    anions: '2x NO3-'
  },
  {
    id: 11,
    formula: 'Na2SO4',
    name: 'Sodyum Sülfat',
    vanTHoff_i: 3,
    dissociationEquation: 'Na2SO4(k) -> 2Na+(suda) + SO4 2-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '2x Na+',
    anions: '1x SO4 2-'
  },
  {
    id: 12,
    formula: 'K2CO3',
    name: 'Potasyum Karbonat (Potas)',
    vanTHoff_i: 3,
    dissociationEquation: 'K2CO3(k) -> 2K+(suda) + CO3 2-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '2x K+',
    anions: '1x CO3 2-'
  },

  // --- i = 4 (4 İYONLU ELEKTROLİT) ---
  {
    id: 13,
    formula: 'AlCl3',
    name: 'Alüminyum Klorür',
    vanTHoff_i: 4,
    dissociationEquation: 'AlCl3(k) -> Al3+(suda) + 3Cl-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '1x Al3+',
    anions: '3x Cl-'
  },
  {
    id: 14,
    formula: 'Fe(NO3)3',
    name: 'Demir(III) Nitrat',
    vanTHoff_i: 4,
    dissociationEquation: 'Fe(NO3)3(k) -> Fe3+(suda) + 3NO3-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '1x Fe3+',
    anions: '3x NO3-'
  },
  {
    id: 15,
    formula: 'Na3PO4',
    name: 'Sodyum Fosfat (Trisodyum Fosfat)',
    vanTHoff_i: 4,
    dissociationEquation: 'Na3PO4(k) -> 3Na+(suda) + PO4 3-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '3x Na+',
    anions: '1x PO4 3-'
  },

  // --- i = 5 (5 İYONLU ELEKTROLİT) ---
  {
    id: 16,
    formula: 'Al2(SO4)3',
    name: 'Alüminyum Sülfat',
    vanTHoff_i: 5,
    dissociationEquation: 'Al2(SO4)3(k) -> 2Al3+(suda) + 3SO4 2-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '2x Al3+',
    anions: '3x SO4 2-'
  },
  {
    id: 17,
    formula: 'Ca3(PO4)2',
    name: 'Kalsiyum Fosfat (Kemik Külü)',
    vanTHoff_i: 5,
    dissociationEquation: 'Ca3(PO4)2(k) -> 3Ca2+(suda) + 2PO4 3-(suda)',
    soluteType: 'Kuvvetli Elektrolit (İletir)',
    cations: '3x Ca2+',
    anions: '2x PO4 3-'
  }
];

export function soluteToQuizItem(s: SoluteData): StandardQuizItem {
  return {
    id: s.id,
    prompt: s.formula,
    promptSub: `${s.name} (${s.soluteType})`,
    answer: `i = ${s.vanTHoff_i}`,
    synonyms: [`${s.vanTHoff_i}`, `i=${s.vanTHoff_i}`, `${s.vanTHoff_i} iyon`],
    category: `i = ${s.vanTHoff_i}`,
    infoChips: [
      { label: 'Formül', value: s.formula },
      { label: 'Bileşik Adı', value: s.name },
      { label: "van 't Hoff (i)", value: `${s.vanTHoff_i}` },
      { label: 'Katyonlar', value: s.cations },
      { label: 'Anyonlar', value: s.anions },
      { label: 'İyonlaşma', value: s.dissociationEquation }
    ],
    hint: `İyonlaşma denklemi: ${s.dissociationEquation}`
  };
}
```

---

### 7.3. Günlük Hayat Fenomenleri & Koligatif İlke Veri Seti

```typescript
export interface ColligativePhenomenon {
  id: number;
  phenomenon: string;
  category: 'Donma Noktası Alçalması' | 'Kaynama Noktası Yükselmesi' | 'Buhar Basıncı Düşmesi' | 'Ozmoz / Ters Ozmoz';
  mechanism: string;
  examNote: string;
}

export const COLLIGATIVE_PHENOMENA: ColligativePhenomenon[] = [
  {
    id: 101,
    phenomenon: 'Kışın karlı yollara tuz (NaCl, CaCl2) dökülmesi',
    category: 'Donma Noktası Alçalması',
    mechanism: 'Tuz iyonları su moleküllerinin düzenli buz kristali oluşturmasını engeller ve donma noktasını 0°C altına çeker.',
    examNote: 'CaCl2 (i=3) tuzu NaCl (i=2) tuzuna göre donma noktasını daha fazla düşürür.'
  },
  {
    id: 102,
    phenomenon: 'Otomobil radyatörlerine kışın antifriz (etilen glikol) eklenmesi',
    category: 'Donma Noktası Alçalması',
    mechanism: 'Glikol molekülleri su ile hidrojen bağı kurarak suyun donma sıcaklığını -20°C ila -40°C seviyesine indirir.',
    examNote: 'Antifriz yazın kaynamayı geciktirir, kışın donmayı önler.'
  },
  {
    id: 103,
    phenomenon: 'Kış aylarında uçak gövde ve kanatlarına glikol-su çözeltisi püskürtülmesi (De-icing)',
    category: 'Donma Noktası Alçalması',
    mechanism: 'Kanatlarda buzlanma kaldırma kuvvetini bozar; alkol-glikol karışımı donmayı engeller.',
    examNote: 'Uçucu veya uçucu olmayan her yabancı madde donma noktasını düşürür.'
  },
  {
    id: 104,
    phenomenon: 'Denizlerin göllere göre çok daha düşük sıcaklıklarda donması',
    category: 'Donma Noktası Alçalması',
    mechanism: 'Deniz suyundaki yüksek tuz derişimi donma noktasını yaklaşık -1.9°C ila -2.5°C civarına çeker.',
    examNote: 'Tuzluluk oranı arttıkça donma noktası daha da düşer (Akdeniz > Karadeniz).'
  },
  {
    id: 105,
    phenomenon: 'Makarna pişirirken kaynayan suya tuz atıldığında kaynamanın anlık durması',
    category: 'Kaynama Noktası Yükselmesi',
    mechanism: 'Tuz eklenince çözeltinin kaynama noktası yükselir; mevcut sıcaklık yeni kaynama noktasının altında kaldığı için kaynama anlık durur.',
    examNote: 'Doymamış tuzlu suyun kaynama süresince derişimi arttıkça sıcaklığı yükselmeye devam eder.'
  },
  {
    id: 106,
    phenomenon: 'Deniz suyundan yarı geçirgen membran ve yüksek basınçla içme suyu üretilmesi (Desalinasyon)',
    category: 'Ozmoz / Ters Ozmoz',
    mechanism: 'Tuzlu suya ozmotik basıncından daha yüksek basınç uygulanarak su moleküllerinin tatlı su tarafına geçirilmesidir.',
    examNote: 'Ters ozmozda elektrik enerjisi harcanır, doğal ozmoz ise kendiliğindendir (enerji harcanmaz).'
  },
  {
    id: 107,
    phenomenon: 'Böbrek yetmezliği olan hastalarda kanın hemodiyaliz cihazı ile arındırılması',
    category: 'Ozmoz / Ters Ozmoz',
    mechanism: 'Yarı geçirgen zardan küçük moleküller (üre, ürik asit) geçerken, proteinler ve kan hücreleri tutulur.',
    examNote: 'Diyaliz bir membran süzme ve konsantrasyon farkı prosesidir.'
  },
  {
    id: 108,
    phenomenon: 'Reçel, bal ve pekmezin içinde bakteri üreyememesi ve bozulmadan yıllarca kalması',
    category: 'Ozmoz / Ters Ozmoz',
    mechanism: 'Çok yüksek şeker konsantrasyonu aşırı ozmotik basınç oluşturarak bakterinin suyunu çeker ve büzüştürür (plazmoliz).',
    examNote: 'Aşırı hipertonik ortam mikrobiyal büyümeyi durdurur.'
  },
  {
    id: 109,
    phenomenon: 'Tuzlu suyun aynı sıcaklıktaki saf suya göre daha yavaş buharlaşması',
    category: 'Buhar Basıncı Düşmesi',
    mechanism: 'Yüzeyde yer alan tuz iyonları su moleküllerinin gaz fazına geçiş alanını ve buharlaşma hızını sınırlar.',
    examNote: 'Raoult Yasası: Uçucu olmayan katı çözündükçe buhar basıncı düşer.'
  }
];
```

---

### 7.4. AYT Derişim Birimleri Veri Seti

```typescript
export interface ConcentrationUnitData {
  id: number;
  name: string;
  symbol: string;
  formula: string;
  unit: string;
  temperatureDependent: boolean;
  coreRule: string;
}

export const CONCENTRATION_UNITS: ConcentrationUnitData[] = [
  {
    id: 201,
    name: 'Molarite',
    symbol: 'M',
    formula: 'M = n / V(L)',
    unit: 'mol / L',
    temperatureDependent: true,
    coreRule: '1 Litre ÇÖZELTİDE çözünmüş maddenin mol sayısıdır. Sıcaklıkla hacim genleştiği için değeri değişir.'
  },
  {
    id: 202,
    name: 'Molalite',
    symbol: 'm',
    formula: 'm = n_çözünen / m_çözücü(kg)',
    unit: 'mol / kg',
    temperatureDependent: false,
    coreRule: '1 KİLOGRAM ÇÖZÜCÜDE çözünmüş maddenin mol sayısıdır. Kütle sıcaklıkla değişmediğinden sabittir. Koligatif formüllerde kullanılır.'
  },
  {
    id: 203,
    name: 'Kütlece Yüzde Derişim',
    symbol: '%C',
    formula: '%C = (m_çözünen / m_çözelti) * 100',
    unit: '% (Birimsiz)',
    temperatureDependent: false,
    coreRule: '100 gram çözeltideki çözünmüş madde gramıdır. m_çözelti = m_çözünen + m_çözücü.'
  },
  {
    id: 204,
    name: 'Hacimce Yüzde Derişim',
    symbol: '%V',
    formula: '%V = (V_çözünen / V_çözelti) * 100',
    unit: '% (Derece °)',
    temperatureDependent: true,
    coreRule: '100 birim hacim çözeltideki çözünmüş sıvı hacmidir. Kolonyadaki 80° değeri %80 hacimce etanol demektir.'
  },
  {
    id: 205,
    name: 'Milyonda Bir (ppm)',
    symbol: 'ppm',
    formula: 'ppm = (m_çözünen / m_çözelti) * 10^6',
    unit: 'mg / kg veya mg / L',
    temperatureDependent: false,
    coreRule: '1 kg (veya 1 milyon mg) çözeltideki miligram çözünendir. İçme suyu analizleri ve hava kirliliğinde kullanılır.'
  },
  {
    id: 206,
    name: 'Mol Kesri',
    symbol: 'X',
    formula: 'X_A = n_A / n_toplam',
    unit: 'Birimsiz (0 <= X <= 1)',
    temperatureDependent: false,
    coreRule: 'Bir bileşenin mol sayısının toplam mol sayısına oranıdır. Karışımdaki tüm mol kesirleri toplamı daima 1 e eşittir.'
  },
  {
    id: 207,
    name: 'Yoğunluk - Molarite İlişkisi',
    symbol: 'M-d-% Formülü',
    formula: 'M = (d * 10 * %C) / M_A',
    unit: 'mol / L',
    temperatureDependent: true,
    coreRule: 'Denizde Yüzen On Maymun tekerlemesi ile kodlanır. Çözeltinin özkütlesi (d, g/mL), kütlece yüzdesi (%C) ve mol kütlesi (M_A) ile molarite hesaplanır.'
  }
];
```

---

## 8. Sonuç ve Önerilen Uygulama Adımları

1. **TYT ve AYT Kapsamı Ayrımı:**
   - 10. Sınıf `mixtures` konusu TYT sekmesine eklenmeli, heterojen türler (süspansiyon, emülsiyon, aerosol, kolloid) ve ayırma yöntemleri görselleştirilmelidir.
   - 11. Sınıf `colligative` konusu AYT sekmesine eklenmeli, van 't Hoff faktörü ($i$) hesaplama antrenmanları ve günlük hayat olayları eşleştirme soruları sunulmalıdır.
2. **Akıllı Çeldirici Algoritması:**
   - $AlCl_3$ sorulduğunda seçeneklere $i=3$ ve $i=1$ mutlaka eklenmeli; öğrencinin formüldeki alüminyum ($1$) ile klor ($3$) toplamını ($1+3=4$) ayırt etmesi sağlanmalıdır.
   - Kolloid sorulduğunda seçeneklere daima "Homojen Çözelti" çeldiricisi konulmalıdır.
3. **Grafiksel ve Renkli İpuçları:**
   - Tyndall etkisi sorularında lazer ışığının saçıldığı ve saçılmadığı şematik ipuçları verilmeli; donma noktası grafikleri interaktif hale getirilmelidir.
