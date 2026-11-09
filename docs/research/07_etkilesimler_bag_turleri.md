# TYT Kimya: Kimyasal Türler Arası Etkileşimler ve Bağ Türleri
**MEB & ÖSYM YKS Standartlarında Kapsamlı Konu, Veri Setleri ve Test Motoru Mimarisi**

---

## 1. Müfredat Çerçevesi ve ÖSYM Önemi

### 1.1. MEB Kazanımları (9. Sınıf 3. Ünite)
- **9.3.1. Kimyasal Tür:** Kimyasal türleri (atom, molekül, iyon, radikal) sınıflandırır.
- **9.3.2. Kimyasal Türler Arası Etkileşimlerin Sınıflandırılması:** Bağlanan türler arasındaki çekme-itme kuvvetlerine ve enerji değişimine ($40 \text{ kJ/mol}$ kuralı) göre güçlü ve zayıf etkileşimleri ayırt eder.
- **9.3.3. Güçlü Etkileşimler:**
  - İyonik bağın oluşumunu elektron alışverişi ve elektrostatik çekimle açıklar; iyonik kristal örgü yapısını kavrar.
  - Kovalent bağın oluşumunu elektron ortaklaşmasıyla açıklar; apolar ve polar kovalent bağları karşılaştırır; molekül polarlığı ile bağ polarlığını ayırt eder.
  - Metalik bağı elektron denizi modeli ile açıklar; metallerin fiziksel özellikleriyle ilişkilendirir.
- **9.3.4. Zayıf Etkileşimler:**
  - Van der Waals etkileşimlerini (dipol-dipol, iyon-dipol, dipol-indüklenmiş dipol, iyon-indüklenmiş dipol, indüklenmiş dipol-indüklenmiş dipol / London) açıklar.
  - Hidrojen bağının oluşum koşullarını (F, O, N atomlarına bağlı H) ve moleküllere kazandırdığı olağanüstü özellikleri kavrar.
- **9.3.5. Fiziksel ve Kimyasal Değişimler:** Etkileşim türleri üzerinden fiziksel ve kimyasal olayları açıklar.

### 1.2. ÖSYM YKS Sınav Analizi (TYT)
- **Soru Frekansı:** İstisnasız her yıl TYT Kimya'da en az 1 (bazen 2) soru doğrudan bu üniteden gelir.
- **En Çok Çıkan Soru Tipleri:**
  1. Verilen iki kimyasal tür arasındaki **baskın etkileşim türü** ($H_2O - H_2O$, $NaCl - H_2O$, $CH_4 - CCl_4$, $HCl - HCl$ vb.).
  2. **Hidrojen bağı kuralları** ve hidrojen bağı yapabilen / yapamayan moleküllerin tespiti (Özellikle $HCl$, $H_2S$ çeldiricileri).
  3. Kaynama noktalarının **etkileşim türü ve molekül kütlesi** üzerinden kıyaslanması (Hidrürlerin kaynama noktası grafiği: $H_2O > HF > NH_3 > \dots$).
  4. İyonik, polar kovalent, apolar kovalent bağ ayrımı ve Lewis elektron nokta yapısı.
  5. İyonik kristallerin elektriği iletme durumları (katı vs sıvı/çözelti).

---

## 2. Temel Kavramlar ve Enerji Sınırı

### 2.1. Kimyasal Türler
| Kimyasal Tür | Tanım | Örnekler | MEB / ÖSYM Kritik Notu |
|---|---|---|---|
| **Atom** | Bir elementin tüm özelliklerini gösteren en küçük nötr birim. | $He, Ne, Ar, Fe, Na, Cu$ | Soygazlar doğada monoatomik gaz halinde bulunur. Metaller formül yazımında monoatomik gösterilir. |
| **Molekül** | Aynı veya farklı ametal atomlarının kovalent bağlarla bağlanmasıyla oluşan nötr atom topluluğu. | $H_2, O_2, O_3, P_4, S_8$ (Elementel); $H_2O, CO_2, NH_3, C_6H_{12}O_6$ (Bileşik) | **Tuzlar (örn. $NaCl$) molekül DEĞİLDİR!** İyonik kristal örgüdür, en küçük birimi birim hücredir. |
| **İyon** | Elektron almış (anyon) veya vermiş (katyon) yüklü tanecik. | $Na^+, Mg^{2+}, Fe^{3+}, Cl^-, O^{2-}$ (Tek atomlu); $NH_4^+, SO_4^{2-}, NO_3^-, OH^-$ (Kök) | Katyonlar elektron kaybıyla (+), anyonlar elektron kazanımıyla (-) yüklenir. Çok atomlu iyonlara "kök" denir. |
| **Radikal** | Ortaklanmamış (eşleşmemiş) serbest tek elektrona sahip, yüksek enerjili ve kararsız tanecik. | $CH_3^\bullet, \ ^\bullet OH, NO^\bullet, H^\bullet$ | MEB müfredatında sadece tanımı verilir; tepkime mekanizmalarına ve detayına girilmez. |

### 2.2. Güçlü vs Zayıf Etkileşim: 40 kJ/mol Kuralı
Kimyasal türler birbirine yaklaştığında çekirdekler ile elektron bulutları arasında elektrostatik **çekme** ve **itme** kuvvetleri oluşur:
- **Çekme Kuvvetleri $\gg$ İtme Kuvvetleri:** Güçlü etkileşim (Kimyasal bağ). Türler arasında yeni madde oluşur, kimlik değişir.
- **Çekme Kuvvetleri $\approx$ İtme Kuvvetleri:** Zayıf etkileşim (Fiziksel bağ). Türlerin kimliği değişmez, sadece fiziksel hal veya faz değişir.

> [!IMPORTANT]
> **40 kJ/mol Kuralı ve ÖSYM'nin İstisna Tuzağı:**
> Bir etkileşimi kırmak veya oluşturmak için gereken enerji genellikle **$40 \text{ kJ/mol}$** sınırına göre değerlendirilir:
> - Enerji $\ge 40 \text{ kJ/mol} \rightarrow$ **Kimyasal (Güçlü)**
> - Enerji $< 40 \text{ kJ/mol} \rightarrow$ **Fiziksel (Zayıf)**
> 
> **Kritik İstisna:** Suyun buharlaşması:
> $$H_2O(s) + 43.9\text{ kJ/mol} \rightarrow H_2O(g)$$
> Burada enerji değişimi $43.9\text{ kJ/mol} > 40\text{ kJ/mol}$ olmasına rağmen suyun kimyasal yapısı bozulmamış, sadece moleküller arası hidrojen ve dipol-dipol bağları kopmuştur. Dolayısıyla olay **kesinlikle FİZİKSEL** bir değişimdir!

---

## 3. Bölüm 1: Etkileşimlerin Kapsamlı Sınıflandırılması

```
Kimyasal Türler Arası Etkileşimler
├── 1. GÜÇLÜ ETKİLEŞİMLER (Kimyasal Bağlar - İntramoleküler / Kristal Ağ)
│   ├── İyonik Bağ (Metal-Ametal / Katyon-Anyon elektrostatik çekimi)
│   ├── Kovalent Bağ (Ametal-Ametal elektron ortaklaşması)
│   │   ├── Apolar Kovalent Bağ (Aynı ametal atomları: O2, N2, Cl2)
│   │   └── Polar Kovalent Bağ (Farklı ametal atomları: HCl, H2O, NH3)
│   └── Metalik Bağ (Metal katyonları + Serbest elektron denizi)
│
└── 2. ZAYIF ETKİLEŞİMLER (Fiziksel Bağlar - İntermoleküler)
    ├── Van der Waals Etkileşimleri
    │   ├── Dipol - Dipol (Polar - Polar)
    │   ├── İyon - Dipol (İyon - Polar)
    │   ├── Dipol - İndüklenmiş Dipol (Polar - Apolar/Soygaz)
    │   ├── İyon - İndüklenmiş Dipol (İyon - Apolar/Soygaz)
    │   └── İndüklenmiş Dipol - İndüklenmiş Dipol / London (Apolar - Apolar / Soygaz - Soygaz)
    └── Hidrojen Bağı (F, O, N atomlarına bağlı H ile komşu F, O, N arasındaki özel çekim)
```

---

### 3.1. Güçlü Etkileşimler Detayı

#### A. İyonik Bağ
- **Oluşumu:** Elektronegatiflik farkı yüksek metal katyonları ile ametal anyonları (veya amonyum gibi kökler) arasında elektron alışverişi ile oluşur.
- **Yapı:** Moleküler yapıda DEĞİLDİR. İyonların uzayda düzenli sıralanmasıyla oluşan üç boyutlu **kristal örgü (lattice)** yapısındadır.
- **Özellikleri:**
  - Oda koşullarında tamamı kristal katıdır.
  - Erime ve kaynama noktaları oldukça yüksektir ($NaCl: 801^\circ C, MgO: 2852^\circ C$).
  - **Katı halde elektrik akımını İLETMEZLER!** (İyonlar kristal kafeste sabittir, hareket edemez).
  - **Sıvı (erimiş) halde ve sulu çözeltilerinde elektrik akımını İLETİRLER** (İyonlar serbest hareket edebilir, iletkenlik kimyasal yolla gerçekleşir).
  - Sert ve kırılgandırlar; darbe aldıklarında aynı yüklü iyonlar karşı karşıya gelir, elektrostatik itme sonucu kristal kırılır.
- **İyonik Bağ Sağlamlığı vs İyonik Karakter:**
  - **İyonik Bağ Sağlamlığı:** İyon yükleri çarpımı ile doğru, iyonlar arası uzaklık (yarıçap toplamı) ile ters orantılıdır ($F \propto \frac{|q_1 \cdot q_2|}{r^2}$). İyonik bağ sağlamlığı arttıkça erime noktası yükselir ($MgO > CaO > NaCl$).
  - **İyonik Karakter:** İki atom arasındaki elektronegatiflik farkı ne kadar büyükse, bağın iyonik karakteri o kadar yüksektir ($CsF$ en yüksek iyonik karaktere sahiptir).

#### B. Kovalent Bağ
- **Oluşumu:** Ametal atomlarının değerlik elektronlarını ortaklaşa kullanması sonucu oluşur.
- **Apolar Kovalent Bağ:** Aynı ametal atomları arasında elektronların eşit çekilmesiyle oluşur. Elektronegatiflik farkı sıfırdır ($\Delta EN = 0$). Dipol momenti sıfırdır.
  - Örnekler: $H_2 (H-H), O_2 (O=O), N_2 (N\equiv N), Cl_2, F_2, Br_2, I_2$.
- **Polar Kovalent Bağ:** Farklı ametal atomları arasında elektronların elektronegatifliği yüksek atom tarafından daha güçlü çekilmesiyle oluşur ($\Delta EN > 0$). Kısmi negatif ($\delta^-$) ve kısmi pozitif ($\delta^+$) uçlar oluşur.
  - Örnekler: $H-Cl, H-F, H-O-H, N-H, C-O$.

> [!WARNING]
> **Molekül Polarlığı ile Bağ Polarlığını Karıştırmama Kuralı:**
> - Bir molekülün içindeki tüm bağlar **polar kovalent** olduğu halde, molekülün kendisi **apolar** olabilir!
> - Molekül simetrik ise, merkez atomda ortaklanmamış elektron çifti kalmamışsa ve dipol momentlerin vektörel bileşkesi sıfır ise ($\mu = 0$), molekül **apolardır**.
> - **Apolar Moleküller:** $CO_2, CCl_4, CH_4, BF_3, BH_3, CS_2, C_2H_6$ (ve tüm hidrokarbonlar $C_xH_y$).
> - **Polar Moleküller:** $H_2O, NH_3, SO_2, HCl, H_2S, CH_3Cl, CH_3OH$ (Merkez atomda ortaklanmamış elektron çifti bulunur veya asimetriktir).

#### C. Metalik Bağ
- **Oluşumu:** Metal atomlarının değerlik elektronlarının serbestçe hareket etmesiyle oluşan negatif "elektron denizi" ile pozitif metal katyonları arasındaki elektrostatik çekim kuvvetidir.
- **Metale Kazandırdığı Özellikler:**
  - Hem katı hem de sıvı halde **elektriği ve ısıyı serbest elektronlar sayesinde mükemmel iletir** (Fiziksel iletkenlik, telde kimyasal değişim olmaz).
  - Tel ve levha haline gelebilme (dövülebilme, haddelenebilme): Darbe aldığında elektron denizi iyonların kaymasına izin verir, bağ kopmaz.
  - Metalik parlaklık: Serbest elektronlar ışığı soğurup geri yansıtır.
- **Metalik Bağ Kuvveti:**
  - Değerlik elektron sayısı arttıkça ve katyon yarıçapı küçüldükçe metalik bağ kuvveti artar.
  - Periyodik cetvelde aynı periyotta sağa gidildikçe, aynı grupta yukarı çıkıldıkça metalik bağ kuvveti ve erime noktası genellikle artar ($Li > Na > K$; $Al > Mg > Na$).

---

### 3.2. Zayıf Etkileşimler Detayı

#### A. Van der Waals Etkileşimleri
Kalıcı veya geçici dipoller ile iyonlar arasındaki elektrostatik çekimlerdir:
1. **Dipol - Dipol Etkileşimi:**
   - Polar moleküllerin kalıcı dipolleri arasındaki çekimdir. Kısmi artı ($\delta^+$) uç ile kısmi eksi ($\delta^-$) uç birbirini çeker.
   - Örnek: $HCl - HCl$, $H_2S - H_2S$, $SO_2 - SO_2$, $CH_3Cl - CH_3Cl$.
2. **İyon - Dipol Etkileşimi:**
   - Bir iyon (katyon veya anyon) ile polar bir molekül arasındaki çekimdir.
   - Tuzların suda çözünmesinde (hidratasyon) gözlenir.
   - Örnek: $Na^+ \dots H_2O$, $Cl^- \dots H_2O$, $K^+ \dots C_2H_5OH$.
3. **Dipol - İndüklenmiş Dipol Etkileşimi:**
   - Polar bir molekülün, apolar bir molekülün veya soygaz atomunun elektron bulutunu geçici olarak kutuplaması (indüklemesi) ile oluşur.
   - Zayıf bir etkileşimdir; bu tür maddeler birbiri içinde çözünmez (emülsiyon veya iki faz oluşur).
   - Örnek: $H_2O - CCl_4$, $HCl - He$, $H_2O - I_2$.
4. **İyon - İndüklenmiş Dipol Etkileşimi:**
   - Bir iyon ile apolar bir molekül veya soygaz arasındaki çekimdir.
   - Örnek: $Na^+ - CCl_4$, $K^+ - C_6H_6$ (Benzen).
5. **İndüklenmiş Dipol - İndüklenmiş Dipol (London Kuvvetleri):**
   - Apolar moleküller ve soygaz atomları arasındaki anlık (anlık simetri bozulması sonucu oluşan geçici) kutuplanmalardan kaynaklanır.
   - **Tüm moleküllerde mutlaka bulunur!** Ancak apolar moleküllerde ve soygazlarda BAŞKA HİÇBİR çekim kuvveti bulunmadığı için tek ve **baskın** olan kuvvettir.

#### B. Hidrojen Bağı (Zayıf Etkileşimlerin Şahı)
- Hidrojen atomunun elektronegatifliği çok yüksek ve atom çapı küçük olan **F, O, N (FON)** atomlarına doğrudan kovalent bağlı olduğu durumlarda; komşu molekülün F, O, N atomunun ortaklanmamış elektron çifti ile oluşturduğu güçlü dipol etkileşimidir.
- Zayıf etkileşimlerin **en kuvvetlisidir**.
- Moleküllere yüksek kaynama noktası, yüksek vizkozite ve yüksek yüzey gerilimi kazandırır.

---

## 4. Bölüm 2: Moleküller Arası Baskın Etkileşim Eşleştirmeleri

ÖSYM sorularında iki madde karıştırıldığında veya saf haldeyken aralarındaki "etkileşim türü" sorulduğunda, **daima baskın (dominant)** etkileşim hedeflenir.

### 4.1. Baskın Etkileşim Eşleştirme Kılavuzu (30 Kritik Çift)

| No | Kimyasal Tür 1 | Kimyasal Tür 2 | Tür 1 Karakteri | Tür 2 Karakteri | Baskın Etkileşim Türü | İkincil Etkileşimler | Çözünme Durumu |
|---|---|---|---|---|---|---|---|
| 1 | $H_2O$ | $H_2O$ | Polar (FON-H var) | Polar (FON-H var) | **Hidrojen bağı** | Dipol-dipol, London | Saf sıvı |
| 2 | $NH_3$ | $H_2O$ | Polar (FON-H var) | Polar (FON-H var) | **Hidrojen bağı** | Dipol-dipol, London | Çok iyi çözünür |
| 3 | $HF$ | $HF$ | Polar (FON-H var) | Polar (FON-H var) | **Hidrojen bağı** | Dipol-dipol, London | Saf sıvı |
| 4 | $CH_3OH$ (Metanol)| $H_2O$ | Polar (FON-H var) | Polar (FON-H var) | **Hidrojen bağı** | Dipol-dipol, London | Sonsuz çözünür |
| 5 | $C_2H_5OH$ (Etanol)| $H_2O$ | Polar (FON-H var) | Polar (FON-H var) | **Hidrojen bağı** | Dipol-dipol, London | Sonsuz çözünür |
| 6 | $CH_3COOH$ (Asetik Asit)| $H_2O$ | Polar (FON-H var) | Polar (FON-H var) | **Hidrojen bağı** | Dipol-dipol, London | Çok iyi çözünür |
| 7 | $CH_3-O-CH_3$ (Eter)| $H_2O$ | Polar (FON var, FON-H yok)| Polar (FON-H var) | **Hidrojen bağı** | Dipol-dipol, London | İyi çözünür |
| 8 | $CH_3COCH_3$ (Aseton)| $H_2O$ | Polar (FON var, FON-H yok)| Polar (FON-H var) | **Hidrojen bağı** | Dipol-dipol, London | Çok iyi çözünür |
| 9 | $CH_3-O-CH_3$ | $CH_3-O-CH_3$ | Polar (FON-H yok) | Polar (FON-H yok) | **Dipol - dipol** | London | Saf sıvı (H-bağı YOK!) |
| 10 | $CH_3COCH_3$ | $CH_3COCH_3$ | Polar (FON-H yok) | Polar (FON-H yok) | **Dipol - dipol** | London | Saf sıvı (H-bağı YOK!) |
| 11 | $HCl$ | $HCl$ | Polar (Cl $\notin$ FON) | Polar (Cl $\notin$ FON) | **Dipol - dipol** | London | Saf sıvı |
| 12 | $H_2S$ | $H_2S$ | Polar (S $\notin$ FON) | Polar (S $\notin$ FON) | **Dipol - dipol** | London | Saf sıvı |
| 13 | $SO_2$ | $SO_2$ | Polar (O var, H yok) | Polar (O var, H yok) | **Dipol - dipol** | London | Saf sıvı |
| 14 | $PH_3$ | $PH_3$ | Polar (P $\notin$ FON) | Polar (P $\notin$ FON) | **Dipol - dipol** | London | Saf gaz |
| 15 | $HCl$ | $H_2O$ | Polar (Cl $\notin$ FON) | Polar (FON-H var) | **Dipol - dipol** | London (İyonlaşarak çözünür)| Çok iyi çözünür |
| 16 | $NaCl$ | $H_2O$ | İyonik Kristal | Polar | **İyon - dipol** | London | Mükemmel çözünür |
| 17 | $KNO_3$ | $H_2O$ | İyonik Kristal | Polar | **İyon - dipol** | London | Mükemmel çözünür |
| 18 | $MgCl_2$ | $H_2O$ | İyonik Kristal | Polar | **İyon - dipol** | London | Mükemmel çözünür |
| 19 | $CH_4$ | $CH_4$ | Apolar | Apolar | **London (İndüklenmiş d. - İndüklenmiş d.)**| Yok | Saf gaz |
| 20 | $CO_2$ | $CCl_4$ | Apolar | Apolar | **London (İndüklenmiş d. - İndüklenmiş d.)**| Yok | Çözünür |
| 21 | $He$ | $Ne$ | Soygaz (Apolar) | Soygaz (Apolar) | **London (İndüklenmiş d. - İndüklenmiş d.)**| Yok | Gaz karışımı |
| 22 | $Br_2$ | $CCl_4$ | Apolar | Apolar | **London (İndüklenmiş d. - İndüklenmiş d.)**| Yok | Çok iyi çözünür |
| 23 | $I_2$ | $C_6H_6$ (Benzen) | Apolar | Apolar | **London (İndüklenmiş d. - İndüklenmiş d.)**| Yok | Çok iyi çözünür |
| 24 | $O_2$ | $N_2$ | Apolar | Apolar | **London (İndüklenmiş d. - İndüklenmiş d.)**| Yok | Gaz karışımı |
| 25 | $H_2O$ | $CCl_4$ | Polar | Apolar | **Dipol - indüklenmiş dipol** | London | Çözünmez (2 faz) |
| 26 | $H_2O$ | $C_6H_6$ (Benzen) | Polar | Apolar | **Dipol - indüklenmiş dipol** | London | Çözünmez (2 faz) |
| 27 | $HCl$ | $CH_4$ | Polar | Apolar | **Dipol - indüklenmiş dipol** | London | Çok az çözünür |
| 28 | $NaCl$ | $CCl_4$ | İyonik Kristal | Apolar | **İyon - indüklenmiş dipol** | London | Kesinlikle çözünmez |
| 29 | $CaCO_3$| $C_6H_{14}$ (Hekzan)| İyonik Kristal | Apolar | **İyon - indüklenmiş dipol** | London | Çözünmez |
| 30 | $C_2H_5OH$| $C_6H_{14}$ (Hekzan)| Polar (FON-H var) | Apolar | **Dipol - indüklenmiş dipol** | London | Sınırlı çözünür |

---

## 5. Bölüm 3: Hidrojen Bağı Kuralları, Mekanizması ve Tuzaklar

### 5.1. Hidrojen Bağı Oluşum Kuralı (FON Şartı)
Hidrojen bağının oluşabilmesi için iki temel şart vardır:
1. **Donör (Verici) Şartı:** Molekülde en az bir hidrojen atomunun periyodik tablonun en elektronegatif ve en küçük çaplı üç ametali olan **Flor ($F$), Oksijen ($O$) veya Azot ($N$)** atomlarından birine doğrudan kovalent bağlı olması gerekir ($H-F, O-H, N-H$).
2. **Akseptör (Alıcı) Şartı:** Komşu molekülde ortaklanmamış elektron çiftine sahip en az bir F, O veya N atomu bulunmalıdır.

```
       H                        H
       │                        │
 R ─── O :  - - - - - - - - -  H ─── O ─── R
           \                  /
            Ortaklanmamış      Kısmi pozitif (δ+)
            elektron çifti     hidrojen (FON'a bağlı)
            (Akseptör)         (Donör)
```

### 5.2. Kritik İstisnalar ve Kavram Yanılgıları

#### Yanılgı 1: "$HCl$ veya $H_2S$ molekülleri hidrojen bağı yapar." (KESİNLİKLE YANLIŞ!)
- **Açıklama:** Klor ($Cl$) elementinin elektronegatifliği ($3.16$), azot ($N$) ile ($3.04$) hemen hemen aynıdır. Ancak Klor ve Kükürt 3. periyot elementleridir. Atom yarıçapları ($r_{Cl} = 99\text{ pm}, r_{S} = 104\text{ pm}$), Azot ($70\text{ pm}$) ve Oksijen ($66\text{ pm}$)'e göre çok daha büyüktür.
- Yarıçap büyük olduğu için elektron yoğunluğu seyrektir; küçük $H^+$ çekirdeğini yeterince güçlü çekemez.
- **Sonuç:** $HCl, H_2S, PH_3, HBr, HI$ molekülleri arasında **HİDROJEN BAĞI YOKTUR!** Bu moleküller arasındaki baskın etkileşim **Dipol-Dipol**'dür.

#### Yanılgı 2: "Molekülünde O veya N bulunan her madde kendi molekülleri arasında hidrojen bağı yapar." (YANLIŞ!)
- **Açıklama:** Molekülde oksijen veya azot bulunması tek başına yetmez; **H atomunun bu oksijen veya azota doğrudan bağlı olması şarttır.**
- **Eterler ($CH_3-O-CH_3$):** Oksijen atomuna bağlı H yoktur (tüm H'ler karbonlara bağlıdır). Bu nedenle saf dimetil eter molekülleri kendi arasında hidrojen bağı YAPAMAZ (Baskın bağ: Dipol-dipol).
- **Ketonlar ($CH_3-CO-CH_3$ / Aseton):** Oksijen karbona çift bağla bağlıdır. Oksijene bağlı H yoktur. Kendi molekülleri arasında hidrojen bağı YAPAMAZ (Baskın bağ: Dipol-dipol).
- **Aldehitler ($CH_3-CHO$):** Karbonil oksijeni vardır ancak H karbona bağlıdır ($C-H$). Kendi molekülleri arasında hidrojen bağı YAPAMAZ.
- **ANCAK BU MOLEKÜLLER SUYLA KARIŞTIRILIRSA:** Suyun $O-H$ hidrojeni donör, eter/keton/aldehitin oksijeni akseptör olur ve su ile aralarında **HİDROJEN BAĞI OLUŞUR!** Bu nedenle aseton ve eter suda çok iyi çözünür!

#### Yanılgı 3: "Molekül İçi Kovalent Bağ ile Moleküller Arası Hidrojen Bağı Aynıdır." (EN BÜYÜK SINAV TUZAĞI!)
- $H_2O$ molekülünün kendi içindeki $O-H$ bağı **Polar Kovalent Bağdır** ($\sim 460\text{ kJ/mol}$, Güçlü etkileşim).
- İki farklı $H_2O$ molekülü arasındaki bağ ise **Hidrojen Bağıdır** ($\sim 20\text{ kJ/mol}$, Zayıf etkileşim).
- Su kaynarken veya buharlaşırken hidrojen bağları kopar; kovalent bağlar ASLA kopmaz!

### 5.3. Suyun Olağanüstü Durumu (4 Hidrojen Bağı Kapasitesi)
- Bir $H_2O$ molekülünde:
  - 2 adet kısmi pozitif yüklü hidrojen atomu (2 bağ verme / donör potansiyeli),
  - Oksijen atomu üzerinde 2 çift ortaklanmamış elektron (2 bağ alma / akseptör potansiyeli) bulunur.
- Dolayısıyla 1 su molekülü komşularıyla aynı anda **4 adet hidrojen bağı** kurabilir (Tetrahedral kristal ağ).
- **$HF$ Kıyası:** $HF$'de 3 çift ortaklanmamış elektron vardır fakat sadece 1 adet H vardır; ortalama bağ sayısı molekül başına 1'dir.
- **$NH_3$ Kıyası:** $NH_3$'te 3 adet H vardır fakat azotta sadece 1 çift ortaklanmamış elektron vardır; ortalama bağ sayısı molekül başına 1'dir.
- **Sonuç:** $H_2O$'nun kaynama noktası ($100^\circ C$), $HF$ ($19.5^\circ C$) ve $NH_3$ ($-33^\circ C$)'ten çok daha yüksektir!
- **Buzun Yoğunluğu Anomalisi:** Su donarken kurulan 4 hidrojen bağı, molekülleri altıgen kafes yapısına kilitler. Kafesin ortasında büyük boşluklar kalır; hacim artar ($\sim \%9$), özkütle düşer ($d_{buz} = 0.92 \text{ g/cm}^3 < d_{su} = 1.00 \text{ g/cm}^3$). Buz suyun üstünde yüzer ve su altı canlılığı korunur. ($+4^\circ C$ suyun yoğunluğunun en yüksek olduğu sıcaklıktır).

---

## 6. Bölüm 4: Kaynama Noktası ve Erime Noktası Kıyaslama Mantığı

Maddelerin kaynama noktaları kıyaslanırken şu deterministik algoritma takip edilir:

```
[Maddeleri İncele]
       │
       ▼
[1. Adım: Genel Etkileşim Sınıfı Kıyası]
  Ağ Örgülü Kovalent (Elmas/SiO2) > İyonik Katı (Tuzlar) ≈ Metal > Moleküler Katı/Sıvı
       │
       ▼ (Eğer moleküler maddeler kıyaslanıyorsa)
[2. Adım: Moleküller Arası Baskın Çekim Kuvveti]
  Hidrojen Bağı > Dipol - Dipol > London Kuvvetleri
       │
       ▼
[3. Adım: Aynı Tür Bağ Yapanlar Arasında Kıyas]
  - Hidrojen bağı yapanlar: Molekül başına H-bağı sayısı ve dimerleşme (Karboksilik asit > Alkol > Eter)
  - Dipol-dipol yapanlar: Dipol moment büyüklüğü ve London katkısı
  - London yapanlar: Toplam elektron sayısı (Mol kütlesi) arttıkça KN artar
  - İzomer alkanlar: Düz zincir > Dallanmış (Temas yüzeyi azaldıkça KN düşer)
```

---

### 6.1. Periyodik Tabloda Hidrürlerin Kaynama Noktası Grafiği
MEB ders kitaplarında ve ÖSYM sınavlarında en meşhur grafik 4A, 5A, 6A ve 7A gruplarının hidrojenli bileşiklerinin ($XH_n$) kaynama noktaları grafiğidir:

```
Kaynama Noktası (°C)
  ▲
100│         H2O (Hidrojen Bağı Anomalisı)
   │          *
 50│
   │                    HF (*)
   │
  0│                                      H2Te
   │                              SbH3     *
   │                               *     HI *
-50│             NH3 (*)  H2Se *  SnH4 *  HBr *
   │              *         *      *
   │       H2S *   AsH3 *  GeH4 * HCl *
-100│        *       *
   │       PH3 *   SiH4 *
   │         *
-150│  CH4 *
   └────────────────────────────────────────► Periyot (2, 3, 4, 5)
```

#### Grupların Analizi:
1. **4A Grubu ($CH_4, SiH_4, GeH_4, SnH_4$):**
   - Tamamı düzgün dörtyüzlü ve apolardır ($\mu = 0$).
   - Moleküller arasında **sadece London kuvvetleri** vardır.
   - Grupta yukarıdan aşağı inildikçe periyot, proton ve toplam elektron sayısı artar $\rightarrow$ Polarize edilebilirlik artar $\rightarrow$ London çekimi artar $\rightarrow$ Kaynama noktası düzenli olarak yükselir:
     $$CH_4 (-161^\circ C) < SiH_4 (-112^\circ C) < GeH_4 (-88^\circ C) < SnH_4 (-52^\circ C)$$
2. **6A Grubu ($H_2O, H_2S, H_2Se, H_2Te$):**
   - Tamamı kırık doğru geometrisine sahip polar moleküllerdir.
   - **$H_2O$ Anomalisi:** $H_2O$'da oksijen FON grubunda olduğu için moleküller arasında güçlü **hidrojen bağları** vardır. Bu yüzden kaynama noktası grubun diğer üyelerinden anormal derecede yüksektir ($100^\circ C$).
   - $H_2S, H_2Se, H_2Te$ moleküllerinde hidrojen bağı yoktur; baskın etkileşim dipol-dipoldür. Grupta aşağı inildikçe elektron sayısı arttığı için London kuvveti artar ve kaynama noktası artar:
     $$H_2S (-60^\circ C) < H_2Se (-41^\circ C) < H_2Te (-2^\circ C) \ll H_2O (100^\circ C)$$
3. **7A Grubu ($HF, HCl, HBr, HI$):**
   - $HF$'de hidrojen bağı bulunduğu için kaynama noktası ($19.5^\circ C$) beklenenden çok yüksektir.
   - $HCl, HBr, HI$'da hidrojen bağı yoktur. Elektron sayısı arttıkça:
     $$HCl (-85^\circ C) < HBr (-66^\circ C) < HI (-35^\circ C) < HF (19.5^\circ C)$$
4. **5A Grubu ($NH_3, PH_3, AsH_3, SbH_3$):**
   - $NH_3$'te hidrojen bağı vardır ($-33^\circ C$).
   - $PH_3, AsH_3, SbH_3$'te hidrojen bağı yoktur. Sıralama:
     $$PH_3 (-88^\circ C) < AsH_3 (-62^\circ C) < NH_3 (-33^\circ C) < SbH_3 (-17^\circ C)$$

---

### 6.2. London Kuvvetlerinin Kıyaslama Kuralları

#### 1. Elektron Sayısı / Mol Kütlesi (Polarize Edilebilirlik)
Tanecikteki toplam elektron sayısı ne kadar fazlaysa, elektron bulutu çekirdekten o kadar uzaktır, gevşektir ve kolayca kutuplanabilir (polarize edilebilir). Dolayısıyla geçici dipollerin çekim gücü artar.
- **Halojenler (7A):**
  $$F_2 (18e^-, \text{gaz}) < Cl_2 (34e^-, \text{gaz}) < Br_2 (70e^-, \text{sıvı}) < I_2 (106e^-, \text{katı})$$
  *(Oda koşullarında $F_2, Cl_2$ gaz, $Br_2$ sıvı, $I_2$ katıdır).*
- **Soygazlar (8A):**
  $$He (2e^-, -269^\circ C) < Ne (10e^-, -246^\circ C) < Ar (18e^-, -186^\circ C) < Kr (36e^-, -153^\circ C) < Xe (54e^-, -108^\circ C)$$

#### 2. Molekül Geometrisi ve Temas Yüzeyi (Dallanma Etkisi)
Aynı kapalı formüle (aynı karbon ve hidrojen sayısına, dolayısıyla aynı elektron sayısına) sahip alkan izomerlerinde:
- **Düz zincirli moleküller:** Silindirik yapıdadır, moleküllerin birbirine değme (temas) yüzeyi geniştir $\rightarrow$ London kuvvetleri daha etkilidir $\rightarrow$ **Kaynama noktası daha yüksektir**.
- **Dallanmış moleküller:** Küresel yapıya yaklaşır, moleküllerin birbirine temas yüzeyi küçülür $\rightarrow$ London kuvvetleri zayıflar $\rightarrow$ **Kaynama noktası düşer**.

> **Örnek: Pentan ($C_5H_{12}$) İzomerleri:**
> 1. $n$-Pentan ($CH_3-CH_2-CH_2-CH_2-CH_3$, Düz zincir): $\text{KN} = 36.1^\circ C$
> 2. İzopentan ($CH_3-CH(CH_3)-CH_2-CH_3$, 1 dallanma): $\text{KN} = 27.8^\circ C$
> 3. Neopentan ($C(CH_3)_4$, 2 dallanma, küresel): $\text{KN} = 9.5^\circ C$
> 
> Sıralama: **$n$-Pentan > İzopentan > Neopentan**

---

### 6.3. Organik Fonksiyonel Gruplarda Kaynama Noktası Kıyası (Aynı Karbon Sayılı)

$$\text{Karboksilik Asit} > \text{Alkol} > \text{Keton} \approx \text{Aldehit} > \text{Eter} > \text{Alkan}$$

1. **Karboksilik Asitler ($R-COOH$):** Moleküller arasında **çift hidrojen bağı** kurarak dimerleşir. Kaynama noktası çok yüksektir.
2. **Alkoller ($R-OH$):** Moleküller arasında tek hidrojen bağı kurar.
3. **Keton ve Aldehitler ($R-CO-R, R-CHO$):** Kendi aralarında hidrojen bağı kuramaz, **dipol-dipol** etkileşimi yaparlar.
4. **Eterler ($R-O-R$):** Zayıf dipol-dipol yaparlar.
5. **Alkanlar ($R-H$):** Tamamen apolardır, yalnızca **London** kuvvetleri içerirler.

---

## 7. Bölüm 5: Flashcard & Test Motoru Veri Mimarisi

Bu araştırma dosyasındaki verilerin React + TypeScript test motoruna dönüştürülebilmesi için veri modeli aşağıda tasarlanmıştır.

### 7.1. TypeScript Tip Tanımları (`src/types/interactions.ts`)

```typescript
// Etkileşim Genel Sınıfı
export type InteractionCategory = 'strong' | 'weak';

// Güçlü Bağ Türleri
export type StrongBondType = 
  | 'ionic'              // İyonik Bağ
  | 'covalent_polar'     // Polar Kovalent Bağ
  | 'covalent_nonpolar'  // Apolar Kovalent Bağ
  | 'metallic';          // Metalik Bağ

// Zayıf Etkileşim Türleri (Baskın Türler)
export type WeakInteractionType =
  | 'hydrogen_bond'      // Hidrojen Bağı
  | 'dipole_dipole'      // Dipol - Dipol
  | 'ion_dipole'         // İyon - Dipol
  | 'dipole_induced'     // Dipol - İndüklenmiş Dipol
  | 'ion_induced'        // İyon - İndüklenmiş Dipol
  | 'london';            // İndüklenmiş Dipol - İndüklenmiş Dipol (London)

// Kimyasal Tür Karakteri
export type SpeciesPolarity = 'polar' | 'nonpolar' | 'ionic' | 'noble_gas' | 'metallic';

// İki Tür Arasındaki Etkileşim Veri Öğesi
export interface InteractionPairItem {
  id: string;
  speciesA: {
    formula: string;
    name: string;
    polarity: SpeciesPolarity;
    hasFonH: boolean; // F, O veya N'ye doğrudan bağlı H var mı?
  };
  speciesB: {
    formula: string;
    name: string;
    polarity: SpeciesPolarity;
    hasFonH: boolean;
  };
  dominantInteraction: WeakInteractionType;
  secondaryInteractions: WeakInteractionType[];
  isSoluble: boolean; // Birbiri içinde çözünür mü?
  explanation: string;
  distractors: WeakInteractionType[];
}

// Güçlü / Zayıf Sınıflandırma Flashcard Öğesi
export interface BondClassificationItem {
  id: string;
  name: string; // örn: "H2O molekülündeki O-H bağı", "H2O molekülleri arasındaki bağ"
  formulaExample: string;
  category: InteractionCategory;
  specificType: StrongBondType | WeakInteractionType;
  energyScale: string; // "> 40 kJ/mol" veya "< 40 kJ/mol"
  eventExample: string; // örn: "Suyun elektrolizi", "Suyun buharlaşması"
  keyTakeaway: string;
}

// Kaynama Noktası Kıyaslama Sorusu Öğesi
export interface BoilingPointComparisonItem {
  id: string;
  questionPrompt: string;
  substances: {
    formula: string;
    name: string;
    boilingPointC: number;
    dominantForce: string;
  }[];
  correctOrder: string[]; // Formül dizisi (yüksekten düşüğe)
  rankingReason: string;
}
```

---

### 7.2. Test Motoru Soru Mekanikleri (4 Temel Mod)

1. **Mod 1: Baskın Etkileşim Türü Eşleştirme (Multiple Choice / QWER)**
   - *Soru:* "$NH_3(s)$ ile $H_2O(s)$ molekülleri arasındaki en etkin (baskın) etkileşim türü hangisidir?"
   - *Doğru Cevap:* Hidrojen Bağı
   - *Çeldiriciler:* Dipol-dipol, İyon-dipol, London kuvvetleri
   - *Geri Bildirim:* "Her iki molekülde de elektronegatifliği yüksek F, O, N atomlarına bağlı H atomu bulunduğu için baskın etkileşim hidrojen bağıdır. Dipol-dipol ve London da mevcuttur ancak hidrojen bağı baskındır."

2. **Mod 2: Güçlü mü Zayıf mı? (Fiziksel vs Kimyasal / 1-2 Tuşları)**
   - *Soru:* "$CH_4$ molekülündeki $C-H$ bağı" $\rightarrow$ Güçlü (Polar Kovalent Bağ).
   - *Soru:* "$CH_4$ moleküllerini bir arada tutan bağ" $\rightarrow$ Zayıf (London kuvvetleri).
   - *Soru:* "$H_2O(s) \rightarrow H_2O(g)$ olayında kopan bağ" $\rightarrow$ Zayıf (Hidrojen bağı ve dipol-dipol).
   - *Soru:* "$2H_2O(s) \rightarrow 2H_2(g) + O_2(g)$ olayında kopan bağ" $\rightarrow$ Güçlü (Kovalent bağ).

3. **Mod 3: Hidrojen Bağı Dedektifi ("Yapar mı / Yapmaz mı?")**
   - *Soru:* "Aşağıdaki moleküllerden hangisi KENDİ molekülleri arasında hidrojen bağı OLUŞTURAMAZ?"
   - *Seçenekler:* A) $HF$ | B) $C_2H_5OH$ | C) $CH_3OCH_3$ (Doğru) | D) $NH_3$
   - *Geri Bildirim:* "$CH_3OCH_3$ (dimetil eter) molekülünde oksijen vardır ancak oksijene doğrudan bağlı H yoktur. Bu nedenle kendi molekülleri arasında hidrojen bağı kuramaz (dipol-dipol kurar). Ancak su ile hidrojen bağı kurabilir!"

4. **Mod 4: Kaynama Noktası Kıyaslama (Yüksekten Düşüğe Sıralama)**
   - *Soru:* "$NaCl$, $H_2O$, $HCl$, $CH_4$ maddelerinin aynı ortamdaki kaynama noktalarını büyükten küçüğe sıralayınız."
   - *Cevap:* $NaCl > H_2O > HCl > CH_4$
   - *Neden:* İyonik bağ ($NaCl$) $\gg$ Hidrojen bağı ($H_2O$) $>$ Dipol-dipol ($HCl$) $>$ London ($CH_4$).

---

### 7.3. Test Motoru İçin Hazır Veri Seti (JSON / TypeScript Veri Bloğu)

```typescript
export const INTERACTION_PAIRS: InteractionPairItem[] = [
  {
    id: 'int_h2o_h2o',
    speciesA: { formula: 'H2O', name: 'Su', polarity: 'polar', hasFonH: true },
    speciesB: { formula: 'H2O', name: 'Su', polarity: 'polar', hasFonH: true },
    dominantInteraction: 'hydrogen_bond',
    secondaryInteractions: ['dipole_dipole', 'london'],
    isSoluble: true,
    explanation: 'Her iki molekülde de O atomuna doğrudan bağlı H bulunduğu için moleküller arası baskın etkileşim Hidrojen bağıdır.',
    distractors: ['dipole_dipole', 'ion_dipole', 'london']
  },
  {
    id: 'int_nh3_h2o',
    speciesA: { formula: 'NH3', name: 'Amonyak', polarity: 'polar', hasFonH: true },
    speciesB: { formula: 'H2O', name: 'Su', polarity: 'polar', hasFonH: true },
    dominantInteraction: 'hydrogen_bond',
    secondaryInteractions: ['dipole_dipole', 'london'],
    isSoluble: true,
    explanation: 'NH3 ve H2O arasında hidrojen bağı kurulur. Bu nedenle amonyak gazı suda olağanüstü yüksek oranda çözünür.',
    distractors: ['dipole_dipole', 'ion_dipole', 'dipole_induced']
  },
  {
    id: 'int_hf_hf',
    speciesA: { formula: 'HF', name: 'Hidrojen Florür', polarity: 'polar', hasFonH: true },
    speciesB: { formula: 'HF', name: 'Hidrojen Florür', polarity: 'polar', hasFonH: true },
    dominantInteraction: 'hydrogen_bond',
    secondaryInteractions: ['dipole_dipole', 'london'],
    isSoluble: true,
    explanation: 'H atomu periyodun en elektronegatif elementi olan Flor atomuna bağlı olduğundan çok kuvvetli hidrojen bağları içerir.',
    distractors: ['dipole_dipole', 'london', 'ion_dipole']
  },
  {
    id: 'int_ch3oh_h2o',
    speciesA: { formula: 'CH3OH', name: 'Metanol', polarity: 'polar', hasFonH: true },
    speciesB: { formula: 'H2O', name: 'Su', polarity: 'polar', hasFonH: true },
    dominantInteraction: 'hydrogen_bond',
    secondaryInteractions: ['dipole_dipole', 'london'],
    isSoluble: true,
    explanation: 'Metanoldeki -OH grubu su molekülleriyle hidrojen bağı oluşturur. Su ile her oranda homojen karışır.',
    distractors: ['dipole_dipole', 'dipole_induced', 'london']
  },
  {
    id: 'int_hcl_hcl',
    speciesA: { formula: 'HCl', name: 'Hidrojen Klorür', polarity: 'polar', hasFonH: false },
    speciesB: { formula: 'HCl', name: 'Hidrojen Klorür', polarity: 'polar', hasFonH: false },
    dominantInteraction: 'dipole_dipole',
    secondaryInteractions: ['london'],
    isSoluble: true,
    explanation: 'Klor (Cl) atomu FON grubu elementi olmadığı için moleküller arasında hidrojen bağı OLUŞMAZ. Baskın etkileşim dipol-dipoldür.',
    distractors: ['hydrogen_bond', 'london', 'ion_dipole']
  },
  {
    id: 'int_nacl_h2o',
    speciesA: { formula: 'NaCl', name: 'Sodyum Klorür', polarity: 'ionic', hasFonH: false },
    speciesB: { formula: 'H2O', name: 'Su', polarity: 'polar', hasFonH: true },
    dominantInteraction: 'ion_dipole',
    secondaryInteractions: ['london'],
    isSoluble: true,
    explanation: 'İyonik tuz (Na+ ve Cl- iyonları) ile polar su molekülleri arasındaki elektrostatik çekim İyon-Dipol etkileşimidir (Hidratasyon).',
    distractors: ['hydrogen_bond', 'dipole_dipole', 'ion_induced']
  },
  {
    id: 'int_ch4_ch4',
    speciesA: { formula: 'CH4', name: 'Metan', polarity: 'nonpolar', hasFonH: false },
    speciesB: { formula: 'CH4', name: 'Metan', polarity: 'nonpolar', hasFonH: false },
    dominantInteraction: 'london',
    secondaryInteractions: [],
    isSoluble: true,
    explanation: 'Metan molekülü simetrik ve apolardır. Apolar moleküller arasında var olan tek ve baskın etkileşim London kuvvetleridir.',
    distractors: ['dipole_dipole', 'hydrogen_bond', 'dipole_induced']
  },
  {
    id: 'int_co2_ccl4',
    speciesA: { formula: 'CO2', name: 'Karbondioksit', polarity: 'nonpolar', hasFonH: false },
    speciesB: { formula: 'CCl4', name: 'Karbon Tetraklorür', polarity: 'nonpolar', hasFonH: false },
    dominantInteraction: 'london',
    secondaryInteractions: [],
    isSoluble: true,
    explanation: 'Her iki molekül de apolardır (indüklenmiş dipol). Apolar moleküller arasındaki baskın etkileşim London kuvvetleridir.',
    distractors: ['dipole_dipole', 'dipole_induced', 'hydrogen_bond']
  },
  {
    id: 'int_he_ne',
    speciesA: { formula: 'He', name: 'Helyum', polarity: 'noble_gas', hasFonH: false },
    speciesB: { formula: 'Ne', name: 'Neon', polarity: 'noble_gas', hasFonH: false },
    dominantInteraction: 'london',
    secondaryInteractions: [],
    isSoluble: true,
    explanation: 'Soygaz atomları apolar kabul edilir. Soygazlar arasında yalnızca anlık kutuplanma sonucu London kuvvetleri oluşur.',
    distractors: ['dipole_dipole', 'hydrogen_bond', 'ion_induced']
  },
  {
    id: 'int_h2o_ccl4',
    speciesA: { formula: 'H2O', name: 'Su', polarity: 'polar', hasFonH: true },
    speciesB: { formula: 'CCl4', name: 'Karbon Tetraklorür', polarity: 'nonpolar', hasFonH: false },
    dominantInteraction: 'dipole_induced',
    secondaryInteractions: ['london'],
    isSoluble: false,
    explanation: 'Polar su (dipol) ile apolar CCl4 (indüklenmiş dipol) arasında dipol-indüklenmiş dipol oluşur. Çekim zayıf olduğundan birbiri içinde çözünmezler.',
    distractors: ['dipole_dipole', 'london', 'hydrogen_bond']
  },
  {
    id: 'int_ch3och3_h2o',
    speciesA: { formula: 'CH3OCH3', name: 'Dimetil Eter', polarity: 'polar', hasFonH: false },
    speciesB: { formula: 'H2O', name: 'Su', polarity: 'polar', hasFonH: true },
    dominantInteraction: 'hydrogen_bond',
    secondaryInteractions: ['dipole_dipole', 'london'],
    isSoluble: true,
    explanation: 'Dimetil eterin oksijeni ile suyun hidrojeni arasında hidrojen bağı kurulur. Bu nedenle suda çözünür.',
    distractors: ['dipole_dipole', 'dipole_induced', 'london']
  },
  {
    id: 'int_ch3och3_ch3och3',
    speciesA: { formula: 'CH3OCH3', name: 'Dimetil Eter', polarity: 'polar', hasFonH: false },
    speciesB: { formula: 'CH3OCH3', name: 'Dimetil Eter', polarity: 'polar', hasFonH: false },
    dominantInteraction: 'dipole_dipole',
    secondaryInteractions: ['london'],
    isSoluble: true,
    explanation: 'Dimetil eterde oksijene doğrudan bağlı H bulunmadığı için kendi molekülleri arasında H-bağı kurulamaz! Baskın etkileşim dipol-dipoldür.',
    distractors: ['hydrogen_bond', 'london', 'dipole_induced']
  }
];
```

---

## 8. Bölüm 6: MEB / ÖSYM Sınav Çeldiricileri ve 10 Kritik Hata

ÖSYM Kimya komisyonunun soru yazarken öğrencileri düşürmek için en sık kullandığı 10 çeldirici tuzak:

1. **"Tuz molekülleri..." ifadesi:**
   - *Hata:* $NaCl$, $KNO_3$, $CaO$ gibi iyonik bileşiklere "molekül" denmesi.
   - *Doğrusu:* İyonik bileşikler **molekül değildir**, kristal örgü yapısındadır. En küçük birimleri birim hücredir.
2. **"$HCl$ veya $H_2S$ kendi molekülleri arasında hidrojen bağı yapar."**
   - *Hata:* $Cl$ veya $S$ elementini hidrojen bağı yapabilir sanmak.
   - *Doğrusu:* Hidrojen bağı SADECE ve SADECE **F, O, N** atomlarına bağlı H varsa oluşur! $HCl$ ve $H_2S$'de baskın bağ dipol-dipoldür.
3. **"$40\text{ kJ/mol}$'den büyük tüm olaylar kimyasaldır."**
   - *Hata:* Enerji $40\text{ kJ}$'ü geçti diye fiziksel değişimi kimyasal sanmak.
   - *Doğrusu:* $H_2O(s) \rightarrow H_2O(g)$ olayında $\Delta H = 43.9\text{ kJ/mol}$'dür ancak olay **fizikseldir**.
4. **"Polar kovalent bağ içeren tüm moleküller polardır."**
   - *Hata:* $CO_2, CCl_4, CH_4$ bileşiklerindeki bağlar polar kovalent olduğu için molekülü polar sanmak.
   - *Doğrusu:* Molekül simetrik ve yük dağılımı dengeli ise molekül **apolardır**.
5. **"Kendi arasında hidrojen bağı yapamayan moleküller suyla da yapamaz."**
   - *Hata:* Aseton ve dimetil eterin suyla H-bağı yapamayacağını düşünmek.
   - *Doğrusu:* Aseton ve eter kendi arasında H-bağı yapamaz, ancak suyun hidrojeni ile **hidrojen bağı kurarlar** ve suda çok iyi çözünürler.
6. **"London kuvvetleri sadece apolar moleküllerde bulunur."**
   - *Hata:* Polar moleküllerde London olmadığını zannetmek.
   - *Doğrusu:* London kuvvetleri elektron içeren **İSTİSNASIZ TÜM TANECİKLERDE** vardır! Ancak polar moleküllerde dipol-dipol veya H-bağı daha güçlü olduğu için London baskın değildir.
7. **"İyonik katılar elektriği iyi iletir."**
   - *Hata:* Katı yemek tuzunun iletken olduğunu varsaymak.
   - *Doğrusu:* İyonik katılar katı halde **asla iletmez**. Yalnızca **sıvı (eriyik)** ve **sulu çözelti** fazında iyon hareketiyle iletir.
8. **"Metallerin elektriği iletmesi kimyasal bir olaydır."**
   - *Hata:* Bakır telin elektriği iletmesini elektroliz gibi kimyasal sanmak.
   - *Doğrusu:* Metallerin iletkenliği serbest elektron denizi hareketiyle olur ve **fizikseldir** (telde kimyasal değişim olmaz).
9. **"HF molekülünün kaynama noktası H2O'dan yüksektir çünkü F daha elektronegatiftir."**
   - *Hata:* Elektronegatifliği tek kriter sanmak.
   - *Doğrusu:* F daha elektronegatiftir fakat $H_2O$ molekül başına 4 H-bağı yapabilirken, $HF$ molekül başına ortalama 1 H-bağı yapar. Bu yüzden $H_2O$'nun kaynama noktası ($100^\circ C$), $HF$'den ($19.5^\circ C$) çok daha yüksektir.
10. **"Aynı formüllü alkanlarda dallanma arttıkça kaynama noktası yükselir."**
    - *Hata:* Dallanmanın sağlamlık kattığını ve kaynama noktasını artırdığını düşünmek.
    - *Doğrusu:* Dallanma arttıkça temas yüzeyi küçülür, London zayıflar ve **kaynama noktası DÜŞER** ($n$-pentan > izopentan > neopentan).

---

## 9. Sonuç ve Test Motoruna Entegrasyon Yol Haritası

Bu araştırma dokümanı, Kimya Atom projesine yeni bir ana modül olan `TYT_INTERACTION` (Kimyasal Türler Arası Etkileşimler) konusunu eklemek için gereken tüm bilimsel, pedagojik ve teknik altyapıyı eksiksiz sağlamaktadır:

1. **Veri Katmanı:** `src/data/interactions.ts` dosyası açılarak yukarıdaki 30'luk çift listesi ve güçlü/zayıf sınıflandırma verileri eklenecektir.
2. **Tip Katmanı:** `src/types/topics.ts` içerisine `TopicId = ... | 'interactions'` ve `InteractionPairItem` eklenecektir.
3. **Quiz Engine:** Soru oluşturucu `quizEngine.ts`, rastgele 2 kimyasal tür seçip kullanıcıya baskın etkileşim türünü (Hidrojen bağı, Dipol-dipol, İyon-dipol, London) 4 seçenekli (QWER) sunacaktır.
4. **Referans İnceleme Modalı:** Kullanıcı soru çözmeden önce yukarıdaki hidrürler grafiği ve 30'luk etkileşim tablosunu inceleyebilecektir.
