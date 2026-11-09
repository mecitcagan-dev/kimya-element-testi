# TYT & AYT Kimya: Periyodik Özelliklerin Değişimi ve ÖSYM İstisnaları
**MEB Müfredatı ve ÖSYM Sınav Standartlarına Dayalı Kapsamlı Araştırma, Kural Seti ve Flashcard Veri Modeli**

---

## 1. Giriş ve Sınav Analizi

Periyodik sistem ve periyodik özelliklerin değişimi, TYT Kimya'da istisnasız **her yıl 1 soru**, AYT Kimya'da ise "Modern Atom Teorisi" ünitesi kapsamında **her yıl en az 1 soru** olarak karşımıza çıkmaktadır. ÖSYM, standart periyodik eğilimlerden ziyade **kural dışı sapmaları (istisnaları), küresel simetri etkilerini ve kavram yanılgılarını** ölçmeyi tercih eder.

### Temel Kavram Yanılgıları ve ÖSYM'nin Yokladığı Alanlar:
1. İyonlaşma enerjisinde $2A$ ve $5A$ gruplarının küresel simetri kaynaklı yerel tepe noktaları oluşturması ("3 aşağı, 5 yukarı").
2. 7A grubunda elektron ilgisi en yüksek elementin $F$ değil, $Cl$ olması ($Cl > F$).
3. Elektronegatiflikte soy gazların genel olarak değerlendirilmemesi ve en yüksek değerin Flor'a ($F=4.0$) ait olması.
4. İzoelektronik taneciklerde çap sıralamasında elektron sayısının değil, proton sayısının ($p/e^-$ oranının) belirleyici olması.
5. Ametal oksitlerde oksijen sayısının ametal sayısından fazla olmaması durumunda oksidin nötr özellik göstermesi ($CO, NO, N_2O$).
6. Halojen asitlerinde asitlik kuvvetinin periyodik tablodaki elektronegatiflik artışının tersine, aşağı doğru ($HF < HCl < HBr < HI$) artması ve $HF$'nin zayıf asit olmasına rağmen camı aşındırması.

---

## 2. Derinlemesine Konu Analizi ve ÖSYM Kuralları

---

### BÖLÜM 1: İYONLAŞMA ENERJİSİ (İE)

#### 1.1. Tanım ve Termodinamik Karakter
- **Tanım:** Gaz fazında, nötr ve uyarılmamış (temel haldeki) bir atomdan bir elektron kopararak pozitif yüklü gaz iyonu oluşturmak için verilmesi gereken minimum enerjidir.
- **Termokimyasal Denklem:**
  $$X(g) + \text{İE}_1 \rightarrow X^+(g) + e^- \quad (\Delta H > 0, \text{Her zaman ENDOTERMİK})$$
  $$X^+(g) + \text{İE}_2 \rightarrow X^{2+}(g) + e^- \quad (\Delta H > 0, \text{Her zaman ENDOTERMİK})$$
- **Kritik Sıralama:**
  $$\text{İE}_1 < \text{İE}_2 < \text{İE}_3 < \text{İE}_4 < \dots < \text{İE}_n$$
  *Açıklama:* Bir elektron koptuğunda atomun çekirdek yükü (proton sayısı) değişmez, ancak elektron sayısı azalır. Elektron başına düşen çekirdek çekim gücü artar, kalan elektronlar çekirdeğe daha çok yaklaşır (çap küçülür). Bu nedenle sonraki elektronu koparmak daima daha zordur.
- **ÖSYM Tuzağı 1:** 
  - $X(k) + Q \rightarrow X^+(g) + e^-$ $\Rightarrow$ $Q$ değeri 1. İyonlaşma Enerjisi **DEĞİLDİR** (Süblimleşme enerjisi + $\text{İE}_1$'dir, çünkü madde katı fazdadır).
  - $X(g) + Q \rightarrow X^{2+}(g) + 2e^-$ $\Rightarrow$ $Q$ değeri $\text{İE}_2$ **DEĞİLDİR** ($\text{İE}_1 + \text{İE}_2$ toplamıdır).

#### 1.2. Aynı Periyotta Değişim: "3 Aşağı 5 Yukarı" Kuralı
Aynı periyotta soldan sağa gidildikçe çekirdek yükü ($Z$) artar, katman sayısı değişmez, atom yarıçapı küçülür. Çekirdeğin değerlik elektronlarına uyguladığı çekim arttığından iyonlaşma enerjisi **genellikle** artar.

Fakat **küresel simetri kararlılığı** nedeniyle 2A ve 5A grupları kendilerinden bir sonraki gruptan daha yüksek iyonlaşma enerjisine sahiptir:

$$\mathbf{1A < 3A < 2A < 4A < 6A < 5A < 7A < 8A}$$

```
İE (kJ/mol)
 ^
 |                     8A (Soy Gaz)
 |               7A   /
 |         5A   / \  /
 |   2A   / \  /   6A
 |  / \  /   4A
 | /   3A
 |/
 1A
 +-------------------------> Atom Numarası (Z)
```

- **Neden 2A > 3A?**
  - $2A$: Son orbital $ns^2$ $\rightarrow$ Tam dolu orbital, küresel simetriktir, kararlıdır. Elektron koparmak zordur.
  - $3A$: Son orbital $ns^2 np^1$ $\rightarrow$ $p$ orbitalindeki tek elektron küresel simetriden yoksundur, perdeleme etkisi fazladır, daha kolay koparılır.
  - *Örnek:* $_{4}Be$ ($899 \text{ kJ/mol}$) > $_{5}B$ ($800 \text{ kJ/mol}$); $_{12}Mg$ ($738 \text{ kJ/mol}$) > $_{13}Al$ ($578 \text{ kJ/mol}$).
- **Neden 5A > 6A?**
  - $5A$: Son orbital $ns^2 np^3$ $\rightarrow$ Yarı dolu $p$ orbitalleri, küresel simetriktir.
  - $6A$: Son orbital $ns^2 np^4$ $\rightarrow$ $p$ orbitallerinden birinde 2 elektron eşleşmiştir; eşleşmiş elektronlar arasındaki elektrostatik itme (spin-pair repulsion) nedeniyle bir elektronu koparmak daha az enerji gerektirir.
  - *Örnek:* $_{7}N$ ($1402 \text{ kJ/mol}$) > $_{8}O$ ($1314 \text{ kJ/mol}$); $_{15}P$ ($1012 \text{ kJ/mol}$) > $_{16}S$ ($1000 \text{ kJ/mol}$).

#### 1.3. İyonlaşma Enerjisi Grafiğinde Ani Düşüşler (Periyot Geçişi)
Ardışık atom numaralarına karşı İE grafiğinde:
- Çok büyük bir düşüş varsa (örneğin He $\rightarrow$ Li veya Ne $\rightarrow$ Na veya Ar $\rightarrow$ K), kesinlikle **yeni bir periyoda (katmana)** geçilmiştir ($8A \rightarrow 1A$).
- Küçük düşüşler ise periyot içi küresel simetri kaynaklıdır ($2A \rightarrow 3A$ veya $5A \rightarrow 6A$).

#### 1.4. Değerlik Elektron Sayısı ve Grup Tespiti (Tablo Soruları)
Bir atomun ardışık iyonlaşma enerjileri incelendiğinde, bir iç katmandaki soy gaz kararlılığına ulaşıldığında elektron koparmak aşırı derecede zorlaşır:
- İki ardışık iyonlaşma enerjisi arasındaki artış oranı **en az 3.5 - 4 kat** ise bu noktada katman değişmiştir.
- Sıçramanın gerçekleştiği adımdan önceki elektron sayısı, atomun **değerlik elektron sayısını** ve baş grup (A grubu) numarasını verir.

| Element | $\text{İE}_1$ | $\text{İE}_2$ | $\text{İE}_3$ | $\text{İE}_4$ | $\text{İE}_5$ | Sıçrama Yeri | Değerlik e⁻ | Grup |
|---|---|---|---|---|---|---|---|---|
| **X** | 496 | **4562** | 6912 | 9540 | — | $\text{İE}_1 \rightarrow \text{İE}_2$ ($\approx 9.2$ kat) | 1 | **1A** |
| **Y** | 738 | 1451 | **7733** | 10540 | 13630 | $\text{İE}_2 \rightarrow \text{İE}_3$ ($\approx 5.3$ kat) | 2 | **2A** |
| **Z** | 578 | 1817 | 2745 | **11577** | 14830 | $\text{İE}_3 \rightarrow \text{İE}_4$ ($\approx 4.2$ kat) | 3 | **3A** |
| **T** | 520 | 7298 | 11815 | — | — | $\text{İE}_1 \rightarrow \text{İE}_2$ ($\approx 14$ kat) | 1 | **1A ($Z=3$)** |

- **ÖSYM Tuzağı 2 (Tire "—" İşareti):**
  Tabloda bir elementin iyonlaşma enerjisi sütununda tire ("—") olması, enerjisinin ölçülemediği anlamına gelmez; **o elementin başka elektronunun kalmadığı** anlamına gelir!
  Örneğin $T$ elementinin sadece $\text{İE}_1, \text{İE}_2, \text{İE}_3$ değerleri verilmiş ve sonrası boşsa, $T$'nin toplam 3 elektronu vardır $\rightarrow Z=3$ ($Li$ atomu).

---

### BÖLÜM 2: ELEKTRON İLGİSİ (Eİ)

#### 2.1. Tanım ve Termokimyasal Nitelik
- **Tanım:** Gaz fazındaki nötr bir atomun bir elektron alarak negatif yüklü bir gaza (anyon) dönüşmesi sırasındaki enerji değişimidir.
- **Denklem:**
  $$X(g) + e^- \rightarrow X^-(g) + Eİ$$
- **Ekzotermik / Endotermik Ayrımı:**
  - Ametallerin çoğu için 1. elektron ilgisi **ekzotermiktir** ($\Delta H < 0$, enerji açığa çıkar). Açığa çıkan enerji ne kadar büyükse, elektron ilgisi o kadar yüksektir.
  - Soy gazlar, 2A grubu metalleri ($Be, Mg, Ca$) ve Azot ($_{7}N$) atomunun elektron ilgisi **endotermiktir** ($\Delta H > 0$) veya sıfıra çok yakındır. Kararlı/küresel simetrik alt kabukları elektron almayı zorlaştırır.
  - **2. Elektron İlgisi:** Anyona ikinci bir negatif elektron eklemek elektrostatik itmeden dolayı **DAİMA ENDOTERMİKTİR** ($\Delta H > 0$):
    $$O^-(g) + e^- + Q \rightarrow O^{2-}(g)$$

#### 2.2. Periyodik Trend ve Kritik İstisna: Klor (Cl) > Flor (F)
- **Genel Trend:** Aynı periyotta sağa gidildikçe artar. Aynı grupta yukarı çıkıldıkça katman sayısı azaldığı için artar.
- **ÖSYM KRİTİK İSTİSNASI:**
  Genel kurala göre halojenlerde en yukarıda olan Flor'un ($F$) elektron ilgisinin en yüksek olması gerekirdi. Ancak **periyodik tablonun elektron ilgisi en yüksek elementi KLOR (Cl)'dur!**

$$\mathbf{Cl > F > Br > I}$$

| Halojen | Atom No ($Z$) | Elektron Dizilimi | Elektron İlgisi ($\Delta H$, kJ/mol) | Açığa Çıkan Enerji |
|---|---|---|---|---|
| **Flor (F)** | 9 | $1s^2 2s^2 2p^5$ | $-328$ | $328 \text{ kJ/mol}$ |
| **Klor (Cl)** | 17 | $[Ne] 3s^2 3p^5$ | **$-349$** | **$349 \text{ kJ/mol}$ (EN YÜKSEK)** |
| **Brom (Br)** | 35 | $[Ar] 4s^2 3d^{10} 4p^5$ | $-325$ | $325 \text{ kJ/mol}$ |
| **İyot (I)** | 53 | $[Kr] 5s^2 4d^{10} 5p^5$ | $-295$ | $295 \text{ kJ/mol}$ |

- **Neden Klor > Flor? (MEB & ÖSYM Gerekçesi):**
  Flor atomu 2. periyottadır ve atom yarıçapı aşırı derecede küçüktür. $2p$ alt kabuğundaki 7 elektron daracık bir hacme sıkışmıştır ve çok yüksek elektron yoğunluğuna sahiptir. Gelen yeni elektron, mevcut elektronlar tarafından şiddetle itilir (elektron-elektron itmesi).
  Klor ise 3. periyottadır; $3p$ orbital hacmi daha geniştir, elektron yoğunluğu daha düşüktür. Gelen elektron çekirdeğe daha az itmeyle yerleşir ve daha fazla net enerji açığa çıkar.

---

### BÖLÜM 3: ELEKTRONEGATİFLİK (EN)

#### 3.1. Tanım ve Özellikleri
- **Tanım:** Kimyasal bir bağ oluşturan atomların, **bağ elektronlarını (ortaklaşa kullanılan elektron çiftini) kendine doğru çekme gücünün** bağıl bir ölçüsüdür.
- **Birim:** Bir enerji değeri değildir, **birimi yoktur**. Pauling ölçeğine göre $0.7$ (Fransiyum) ile $4.0$ (Flor) arasında bağıl sayılarla ifade edilir.

#### 3.2. Periyodik Eğilim ve Şampiyon Element
- **Trend:** Aynı periyotta sağa doğru çap küçüldüğü ve çekirdek çekimi arttığı için artar. Aynı grupta yukarı doğru katman sayısı azaldığı için artar.
- **En Elektronegatif Element:** **Flor ($F = 4.0$)**. Bileşiklerinde daima sadece $-1$ yükseltgenme basamağı alır!
- **Soy Gazlar:** Soy gazlar (He, Ne, Ar...) kimyasal bağ yapma eğiliminde olmadıkları için elektronegatiflikleri **genel olarak TANIMLANMAZ / YOKTUR**. (ÖSYM sorusu: "Elektronegatifliği en yüksek olan grup 8A'dır" ifadesi KESİNLİKLE YANLIŞTIR; en yüksek grup 7A'dır!).
- **Önemli Elementlerin Elektronegatiflik Sıralaması:**
  $$F(4.0) > O(3.5) > N(3.0) \approx Cl(3.0) > Br(2.8) > I(2.5) \approx C(2.5) \approx S(2.5) > P(2.1) \approx H(2.1)$$
  *(Not: F, O, N elementleri yüksek elektronegatiflikleri sayesinde Hidrojen bağı oluşturur).*

#### 3.3. Elektronegatiflik Farkı ve Bağ Karakteri
İki bağlı atom arasındaki elektronegatiflik farkı ($\Delta EN$):
- $\Delta EN$ arttıkça:
  - Bağın **iyonik karakteri** artar.
  - Bağın **polaritesi** artar.
  - Bağın kovalent karakteri azalır.
- Periyodik sistemde aralarında en yüksek elektronegatiflik farkı olan ve en iyonik bağı oluşturan metal-ametal çifti: Sol alt köşe (Fr/Cs) ile sağ üst köşe (F) $\rightarrow \mathbf{CsF}$ veya $\mathbf{FrF}$.

---

### BÖLÜM 4: ATOM VE İYON YARIÇAPI

#### 4.1. "Kardan Adam" Kuralı (Genel Eğilim)
- **Aynı Grupta (Yukarıdan Aşağıya):** Katman (temel enerji seviyesi/yörünge) sayısı artar. Katman sayısı arttığı için atom yarıçapı belirgin şekilde **ARTAR** (Kardan adamın gövdesi gibi genişler).
- **Aynı Periyotta (Soldan Sağa):** Katman sayısı aynı kalır, ancak çekirdekteki proton sayısı artar. Çekirdeğin elektron bulutuna uyguladığı çekim arttığından yarıçap **AZALIR** (Kardan adamın havuç burnu gibi incelir).

```
   ( o )       Sağa doğru çap AZALIR (Havuç burun)
  (     )      ------>
 (       )     Aşağı doğru çap ARTAR (Kardan adamın gövdesi)
(         )    |
               V
```

- **Kıyaslama Algoritması:**
  1. Önce katman (periyot) sayısına bakılır: Katmanı büyük olanın çapı daima daha büyüktür.
  2. Katman sayıları eşitse proton sayısına ($Z$) bakılır: Proton sayısı küçük olanın çapı daha büyüktür.

#### 4.2. Yarıçap Türleri
1. **Kovalent Yarıçap:** Kovalent bağla bağlanmış iki özdeş ametal atomunun çekirdekleri arasındaki mesafenin yarısıdır ($r_{kov}$, örn: $Cl_2, O_2$).
2. **Van der Waals Yarıçapı:** Kimyasal bağ yapmamış, birbiriyle temas halindeki iki soy gaz atomu veya apolar molekülün en yakın iki çekirdeği arasındaki mesafenin yarısıdır ($r_{vdw}$).
   - **Kural:** $r_{vdw} > r_{kov}$ (Kovalent bağda elektron orbitalleri üst üste bindiği için bağ kısalır).
3. **İyonik Yarıçap:** İyonik kristal örgüsünde katyon veya anyonun yarıçapıdır.

#### 4.3. Nötr Atom ile İyonunun Yarıçapı
- **Katyon Oluşumu ($e^-$ verme):** Çap **KÜÇÜLÜR**.
  - Proton sayısı sabit, elektron sayısı azalır $\rightarrow p/e^-$ oranı artar $\rightarrow$ Birim elektron başına düşen çekim artar $\rightarrow$ Çap büzülür.
  - Örnek: $Fe^{3+} < Fe^{2+} < Fe$
- **Anyon Oluşumu ($e^-$ alma):** Çap **BÜYÜR**.
  - Proton sayısı sabit, elektron sayısı artar $\rightarrow p/e^-$ oranı azalır $\rightarrow$ Elektronlar arası itme artar $\rightarrow$ Çap genişler.
  - Örnek: $Cl < Cl^-$

#### 4.4. İzoelektronik Taneciklerde Çap Sıralaması (ÖSYM Klasiği)
Elektron sayıları ve dizilimleri aynı olan taneciklere **izoelektronik** denir.
- **Kural:** Elektron sayıları eşit olan taneciklerde, **proton sayısı ($Z$) büyük olanın çekirdeği elektronları daha güçlü çeker, dolayısıyla çapı EN KÜÇÜK olur!**
- Proton sayısı az olanın çekim kuvveti daha zayıf kalır, çapı EN BÜYÜK olur.
- **10 Elektronlu İzoelektronik Seri (MEB Standart Örneği):**
  $$_{7}N^{3-} >\ _{8}O^{2-} >\ _{9}F^- >\ _{10}Ne >\ _{11}Na^+ >\ _{12}Mg^{2+} >\ _{13}Al^{3+}$$
  - Anyonların çapı nötr atomdan ve katyonlardan her zaman daha büyüktür.
  - Yük ne kadar negatifse çap o kadar büyük, yük ne kadar pozitifse çap o kadar küçüktür.

---

### BÖLÜM 5: OKSİTLERİN ASİTLİK VE BAZLIK KARAKTERİ

Elementlerin oksijenle oluşturduğu ikili bileşiklere **oksit** denir (oksijenin $-2$ değerliğinde olduğu bileşikler; $OF_2$ hariç).

#### 5.1. Metal Oksitler (Bazik Oksit)
- Metallerin oksijenli bileşikleridir: $Na_2O, K_2O, CaO, MgO, BaO \dots$
- Su ile tepkimeye girerek bazları (hidroksitleri) oluştururlar:
  $$Na_2O(k) + H_2O(s) \rightarrow 2NaOH(suda)$$
  $$CaO(k) + H_2O(s) \rightarrow Ca(OH)_2(suda)$$
- Asitlerle tepkimeye girerek tuz ve su oluştururlar:
  $$MgO(k) + 2HCl(suda) \rightarrow MgCl_2(suda) + H_2O(s)$$
- **Periyodik Trend:** Metalik aktiflik arttıkça oksidin bazlık kuvveti artar.
  - Periyotta sola, grupta **aşağı doğru** bazlık kuvveti artar ($Cs_2O > K_2O > Na_2O > Li_2O$; $BaO > CaO > MgO$).

#### 5.2. Ametal Oksitler - Asidik Oksitler (Asit Anhidritleri)
- Ametallerin **oksijence zengin** ($n_O > n_{Ametal}$) bileşikleridir:
  $$CO_2, SO_2, SO_3, N_2O_5, NO_2, P_2O_5$$
- Su ile tepkimeye girerek asitleri oluştururlar (asit yağmurlarının kaynağı):
  $$SO_3(g) + H_2O(s) \rightarrow H_2SO_4(suda)$$
  $$CO_2(g) + H_2O(s) \rightleftharpoons H_2CO_3(suda)$$
  $$N_2O_5(g) + H_2O(s) \rightarrow 2HNO_3(suda)$$
- Bazlarla nötralleşme tepkimesi verirler:
  $$CO_2(g) + 2NaOH(suda) \rightarrow Na_2CO_3(suda) + H_2O(s)$$
- **Periyodik Trend:** Ametalik karakter arttıkça asitlik kuvveti artar.
  - Periyotta sağa, grupta **yukarı doğru** asidik oksitlerin asitlik kuvveti artar ($Cl_2O_7 > SO_3 > P_2O_5$).

#### 5.3. Nötr Oksitler (ÖSYM'nin En Sevdiği Çeldirici)
- Ametallerin **oksijence fakir veya eşit** ($n_O \le n_{Ametal}$) bileşikleridir:
  $$\mathbf{CO, NO, N_2O}$$
  *(Not: $H_2O$ da bir nötr oksittir).*
- **Özellikleri:**
  - Asitlerle tepkime **VERMEZLER**.
  - Bazlarla tepkime **VERMEZLER**.
  - Su ile tepkime **VERMEZLER** (suda çözündüklerinde $pH$ değişmez, $pH = 7$).
  - Oksijenle yanarak asidik oksitlere dönüşebilirler:
    $$2CO(g) + O_2(g) \rightarrow 2CO_2(g)$$
    $$2NO(g) + O_2(g) \rightarrow 2NO_2(g)$$
    *(Dikkat: $N_2O_5$ veya $SO_3$ gibi oksijence doymuş olanlar yanmaz!).*

#### 5.4. Amfoter Oksitler ve Hidroksitler
- **Amfoter Metaller:** **Al, Zn, Cr, Pb, Sn, Be**
  - *Mnemonic Kodlama:* **Al** **Sa**na **Pa**buç **Zan**netme **Ç**arık **Be** *(Alüminyum, Kalay, Kurşun, Çinko, Krom, Berilyum)* veya **Z**engin **S**inan **B**eyaz **P**abuç **Al**dı **Ç**arşıdan.
- **Amfoter Oksitler:** $Al_2O_3, ZnO, Cr_2O_3, SnO, PbO, BeO$
- **Özellikleri:**
  - Asite karşı baz, baza karşı asit gibi davranırlar.
  - **Suda ÇÖZÜNMEZLER** (su ile tepkime vermezler).
  - Hem kuvvetli asitlerle hem de kuvvetli bazlarla tepkimeye girerek tuz ve su oluştururlar:
    $$ZnO + 2HCl \rightarrow ZnCl_2 + H_2O$$
    $$ZnO + 2NaOH \rightarrow Na_2ZnO_2 + H_2O \quad (\text{Sodyum Çinkat tuzu})$$
    $$Al_2O_3 + 6HCl \rightarrow 2AlCl_3 + 3H_2O$$
    $$Al_2O_3 + 2NaOH + 3H_2O \rightarrow 2Na[Al(OH)_4] \quad (\text{Sodyum Alüminat tuzu})$$
  - **ÖSYM Tuzağı 3:** Amfoter metaller ve oksitleri **zayıf bazlarla (örn: $NH_3$) TEPKİME VERMEZ!** Sadece kuvvetli bazlarla ($NaOH, KOH$) tepkime verirler.

---

### BÖLÜM 6: HALOJEN ASİTLERİNİN KUVVETİ (HX ve Oksiasitler)

#### 6.1. Hidrojenli Halojen Asitleri ($HX$)
Halojenlerin hidrojenli bileşikleri suda çözündüğünde asidik özellik gösterir: $HF, HCl, HBr, HI$.

- **Asitlik Kuvveti Sıralaması:**
  $$\mathbf{HF < HCl < HBr < HI}$$

```
   HF   : Zayıf Asit (Ka ≈ 6.8 x 10⁻⁴)
   HCl  : Kuvvetli Asit
   HBr  : Daha Kuvvetli Asit
   HI   : En Kuvvetli Asit (Ka ≈ 10⁹)
```

- **Asitlik Kuvvetinin Aşağı Doğru Artış Nedeni:**
  - Bir asidin kuvveti, sulu çözeltiye $H^+$ iyonunu ne kadar kolay verebildiğine bağlıdır.
  - Grupta aşağı doğru inildikçe halojen atomunun yarıçapı artar ($F < Cl < Br < I$).
  - Yarıçap arttıkça $H-X$ bağ uzunluğu artar ve bağ kuvveti (bağ ayrışma enerjisi) zayıflar:
    $$\text{Bağ Enerjisi: } H-F (567 \text{ kJ}) > H-Cl (431 \text{ kJ}) > H-Br (366 \text{ kJ}) > H-I (299 \text{ kJ})$$
  - $H-I$ bağı en zayıf olduğu için su molekülleri $H^+$ protonunu çok kolay koparır $\rightarrow$ Yüzde yüz iyonlaşır $\rightarrow$ **$HI$ en kuvvetli asittir.**
  - $H-F$ bağı çok sağlam olduğu ve $F^-$ iyonu küçük çapından dolayı protonu sıkı tuttuğu için iyonlaşma yüzdesi düşüktür $\rightarrow$ **$HF$ zayıf asittir.**

#### 6.2. HF'nin Özel Durumu: Camı Aşındırma
- $HF$ zayıf bir asit olmasına rağmen, silisyum dioksit ($SiO_2$) ile kimyasal tepkimeye giren **tek asittir**:
  $$SiO_2(k) + 4HF(suda) \rightarrow SiF_4(g) + 2H_2O(s)$$
  $$SiO_2(k) + 6HF(suda) \rightarrow H_2[SiF_6](suda) + 2H_2O(s)$$
- Cam ve porselenin ana hammaddesi $SiO_2$ olduğu için $HF$, cam kapları deler ve matlaştırır (cam işleme ve gravürde kullanılır).
- **Laboratuvar Güvenlik Kuralı:** $HF$ asidi kesinlikle cam veya porselen şişelerde saklanmaz; **plastik (polietilen) veya teflon kaplarda** muhafaza edilir!

#### 6.3. Halojen Oksiasitlerinin Kuvveti (AYT / İleri Düzey ÖSYM Kuralı)
1. **Aynı Halojenin Farklı Sayıda Oksijen İçeren Asitleri ($HClO_n$):**
   - Oksijen sayısı arttıkça halojenin yükseltgenme basamağı artar.
   - Oksijen atomları elektronları çekerek $O-H$ bağındaki elektron yoğunluğunu zayıflatır ve $H^+$ kopmasını kolaylaştırır:
     $$\mathbf{HClO < HClO_2 < HClO_3 < HClO_4}$$
     *(Hipokloröz < Kloröz < Klorik < Perklorik asit. $HClO_4$ bilinen en kuvvetli inorganik asitlerdendir).*
2. **Farklı Halojenlerin Aynı Sayıda Oksijen İçeren Asitleri ($HXO$):**
   - Halojenin elektronegatifliği arttıkça elektron bulutunu daha çok kendine çeker, $O-H$ bağı zayıflar ve asitlik artar:
     $$\mathbf{HIO < HBrO < HClO}$$
     $$\mathbf{HIO_4 < HBrO_4 < HClO_4}$$

---

## 3. Büyük Özet Tablosu: Periyodik Özelliklerin Değişimi

| Periyodik Özellik | Aynı Periyotta (Soldan Sağa $\rightarrow$) | Aynı Grupta (Yukarıdan Aşağıya $\downarrow$) | Kritik İstisna / ÖSYM Uyarısı |
|---|---|---|---|
| **Atom Yarıçapı** | Azalır | Artar | Katman sayısı proton sayısından önce gelir. İzoelektroniklerde protonu çok olan küçüktür. |
| **İyonlaşma Enerjisi** | Genellikle artar | Azalır | **3 aşağı 5 yukarı** ($1A < 3A < 2A < 4A < 6A < 5A < 7A < 8A$). |
| **Elektron İlgisi** | Genellikle artar | Genellikle azalır | **$Cl > F$** istisnası! Soy gazlar, 2A ve Azot endotermiktir. |
| **Elektronegatiflik** | Artar | Azalır | En yüksek **$F (4.0)$**. 8A soy gazların elektronegatifliği tanımlanmaz! |
| **Metalik Aktiflik** | Azalır | Artar | En aktif metal Fr / Cs (Sol alt). |
| **Ametalik Aktiflik** | Artar (8A hariç) | Azalır | En aktif ametal Flor ($F$, Sağ üst). |
| **Oksitlerin Bazlığı** | Azalır | Artar | Metalik özellikle paraleldir ($Cs_2O$ en kuvvetli bazik oksit). |
| **Oksitlerin Asitliği** | Artar | Azalır | Ametalik özellikle paraleldir ($O > Ametal$ şartı; $Cl_2O_7$ çok asidiktir). |
| **Halojen Asitliği ($HX$)**| — | **Artar** ($\downarrow$) | $HF < HCl < HBr < HI$. Elektronegatifliğin tersine bağ enerjisi belirler! |

---

## 4. ÖSYM Sınavlarında En Çok Düşülen 10 Tuzak

1. **"Periyotta sağa doğru 1. iyonlaşma enerjisi daima artar":** YANLIŞ. $2A > 3A$ ve $5A > 6A$ istisnası vardır.
2. **"Elektron ilgisi en yüksek element Flor'dur":** YANLIŞ. Elektron ilgisi en yüksek element **Klor ($Cl$)**'dur. Elektronegatifliği en yüksek olan Flor'dur.
3. **"Soy gazların elektronegatifliği 8A olduğu için en büyüktür":** YANLIŞ. Soy gazlar normalde bağ yapmadığı için elektronegatiflikleri tanımlanmaz.
4. **"$CO_2$ asidik oksit, $CO$ da asidik oksittir":** YANLIŞ. $CO$ ametalin oksijence fakir/eşit oksidi olduğu için **nötr oksittir**, suyla veya bazla tepkime vermez.
5. **"İzoelektronik taneciklerde elektronu fazla olanın çapı büyüktür":** KAVRAM YANILGISI. İzoelektronik taneciklerde elektron sayıları zaten eşittir! **Proton sayısı az olanın çapı büyüktür** ($N^{3-} > Al^{3+}$).
6. **"$HF$ camı erittiğine göre çok kuvvetli bir asittir":** YANLIŞ. $HF$ zayıf asittir. Camı eritmesi kuvvetinden değil, $SiO_2$ ile özel kimyasal tepkime ($SiF_4$ gazı oluşumu) vermesindendir.
7. **"$HX$ halojen asitlerinde elektronegatifliği en yüksek olan $HF$ en kuvvetlidir":** YANLIŞ. $H-X$ asit kuvvetini elektronegatiflik değil bağ sağlamlığı belirler; $HF < HCl < HBr < HI$.
8. **"Amfoter metaller ($Al, Zn$) amonyakla ($NH_3$) tepkime verir":** YANLIŞ. Amfoter metaller sadece **kuvvetli bazlarla** tepkime verir, $NH_3$ zayıf baz olduğu için tepkime vermez.
9. **"İkinci iyonlaşma enerjisi ekzotermiktir":** YANLIŞ. İyonlaşma enerjisinin her basamağı ($\text{İE}_1, \text{İE}_2, \text{İE}_n$) **daima ENDOTERMİKTİR**.
10. **"2. elektron ilgisi de ekzotermiktir":** YANLIŞ. Negatif yüklü anyona bir elektron daha eklemek itmeden dolayı **daima ENDOTERMİKTİR** ($O^- + e^- \rightarrow O^{2-}$).

---

## 5. Flashcard & Soru Bankası Veri Modeli

Bu veriler, mevcut TypeScript altyapısına (`src/types/topics.ts`) doğrudan eklenebilir veya genişletilebilir bir şemaya sahiptir.

### 5.1. TypeScript Veri Tipi Tanımları

```typescript
export type PeriodicTopicCategory =
  | 'ion_energy'       // İyonlaşma Enerjisi
  | 'electron_affinity'// Elektron İlgisi
  | 'electronegativity'// Elektronegatiflik
  | 'atomic_radius'    // Yarıçap & İzoelektronik
  | 'oxide_character'  // Oksitlerin Asitlik-Bazlığı
  | 'halogen_acids';   // Halojen Asitleri

export interface PeriodicRuleItem {
  id: string;
  category: PeriodicTopicCategory;
  title: string;
  ruleStatement: string;       // Temel Kural
  exception: string;           // İstisna / ÖSYM Tuzağı
  reason: string;              // Bilimsel Gerekçe
  sampleOrder: string;         // Örnek Sıralama / Formül
  tags: string[];
}

export interface PeriodicQuizQuestion {
  id: string;
  category: PeriodicTopicCategory;
  questionType: 'multiple_choice' | 'true_false' | 'ordering' | 'table_jump';
  prompt: string;
  promptContext?: string;      // Tablo veya grafik verisi
  answer: string;
  distractors: string[];
  explanation: string;         // Çözüm ve ipucu
  difficulty: 'kolay' | 'orta' | 'osym_tuzak';
}
```

---

### 5.2. Kapsamlı Flashcard & Test Veri Seti (40 Soru / Kart)

Aşağıdaki liste, quiz motoru için doğrudan JSON veya TypeScript dizisi olarak derlenebilecek niteliktedir:

```json
[
  {
    "id": "PQ_IE_01",
    "category": "ion_energy",
    "questionType": "ordering",
    "prompt": "2. periyot elementleri olan ₄Be, ₅B ve ₆C'nin 1. iyonlaşma enerjilerini küçükten büyüğe sıralayınız.",
    "answer": "B < Be < C",
    "distractors": ["Be < B < C", "B < C < Be", "C < Be < B"],
    "explanation": "2A grubundaki Be (2s²), küresel simetriye sahip olduğu için 3A grubundaki B (2s² 2p¹) elementinden daha yüksek iyonlaşma enerjisine sahiptir ('3 aşağı 5 yukarı').",
    "difficulty": "orta"
  },
  {
    "id": "PQ_IE_02",
    "category": "ion_energy",
    "questionType": "ordering",
    "prompt": "Aynı periyottaki baş grup elementlerinin 1. iyonlaşma enerjilerinin artış sırası nasıldır?",
    "answer": "1A < 3A < 2A < 4A < 6A < 5A < 7A < 8A",
    "distractors": [
      "1A < 2A < 3A < 4A < 5A < 6A < 7A < 8A",
      "1A < 2A < 3A < 5A < 4A < 6A < 7A < 8A",
      "8A < 7A < 5A < 6A < 2A < 4A < 3A < 1A"
    ],
    "explanation": "'3 aşağı 5 yukarı' kuralı: 2A ve 5A grupları küresel simetriden dolayı kendilerinden sonraki 3A ve 6A gruplarından daha yüksektir.",
    "difficulty": "kolay"
  },
  {
    "id": "PQ_IE_03",
    "category": "ion_energy",
    "questionType": "multiple_choice",
    "prompt": "Aynı periyottaki ₇N ve ₈O elementlerinden Azot'un (N) 1. iyonlaşma enerjisinin Oksijen'den (O) büyük olmasının temel nedeni nedir?",
    "answer": "Azot atomunun küresel simetrik elektron dizilimine sahip olması",
    "distractors": [
      "Azot'un elektronegatifliğinin daha yüksek olması",
      "Oksijen'in katman sayısının daha fazla olması",
      "Azot'un proton sayısının daha fazla olması"
    ],
    "explanation": "₇N: 1s² 2s² 2p³ (p yarı dolu, küresel simetrik). ₈O: 1s² 2s² 2p⁴ (küresel simetrik değil, p'deki elektron itmesi koparmayı kolaylaştırır).",
    "difficulty": "orta"
  },
  {
    "id": "PQ_IE_04",
    "category": "ion_energy",
    "questionType": "table_jump",
    "prompt": "X baş grup elementinin ardışık iyonlaşma enerjileri (kJ/mol): İE₁=496, İE₂=4562, İE₃=6910, İE₄=9540. Buna göre X hangi gruptadır?",
    "answer": "1A (Grup 1)",
    "distractors": ["2A (Grup 2)", "3A (Grup 13)", "4A (Grup 14)"],
    "explanation": "İE₁'den İE₂'ye geçerken yaklaşık 9.2 kat sıçrama (≥ 3.5 kat) meydana gelmiştir. Dolayısıyla değerlik elektron sayısı 1'dir ve grup 1A'dır.",
    "difficulty": "kolay"
  },
  {
    "id": "PQ_IE_05",
    "category": "ion_energy",
    "questionType": "table_jump",
    "prompt": "Y elementinin iyonlaşma enerjileri: İE₁=738, İE₂=1451, İE₃=7733, İE₄=10540 kJ/mol. Y elementi kararlı bileşiklerinde hangi değerliği alır?",
    "answer": "+2",
    "distractors": ["+1", "+3", "+4"],
    "explanation": "En büyük sıçrama İE₂ ile İE₃ arasında (yaklaşık 5.3 kat) gerçekleşmiştir. Değerlik elektron sayısı 2'dir (2A grubu). 2 elektron vererek +2 yüklü katyon oluşturur.",
    "difficulty": "orta"
  },
  {
    "id": "PQ_IE_06",
    "category": "ion_energy",
    "questionType": "table_jump",
    "prompt": "Z elementinin İE değerleri: İE₁=520, İE₂=7298, İE₃=11815 verilmiş ve İE₄ sütununda '—' işareti konulmuştur. Z hakkında hangisi KESİNDİR?",
    "answer": "Atom numarası 3'tür (Lityum).",
    "distractors": [
      "4. periyot elementidir.",
      "Soy gazdır.",
      "4. iyonlaşma enerjisi ölçülemeyecek kadar küçüktür."
    ],
    "explanation": "Tabloda 4. iyonlaşma enerjisinin olmaması, atomun toplam 3 elektronu olduğunu kanıtlar. Nötr halde Z = 3 (Li) elementidir.",
    "difficulty": "osym_tuzak"
  },
  {
    "id": "PQ_IE_07",
    "category": "ion_energy",
    "questionType": "true_false",
    "prompt": "X(k) + Q₁ → X⁺(g) + e⁻ denklemindeki Q₁ değeri X'in 1. iyonlaşma enerjisidir.",
    "answer": "Yanlış",
    "distractors": ["Doğru"],
    "explanation": "İyonlaşma enerjisi tanımı gereği atomun GAZ fazında olması şarttır. Katı fazdan elektron koparılırken harcanan enerji, süblimleşme enerjisi + İE₁ toplamıdır.",
    "difficulty": "osym_tuzak"
  },
  {
    "id": "PQ_IE_08",
    "category": "ion_energy",
    "questionType": "multiple_choice",
    "prompt": "Periyodik tablonun 1. iyonlaşma enerjisi EN YÜKSEK olan elementi hangisidir?",
    "answer": "Helyum (He)",
    "distractors": ["Flor (F)", "Neon (Ne)", "Hidrojen (H)"],
    "explanation": "He (1s²) 1. periyot soy gazıdır. Yarıçapı çok küçüktür ve tam dolu 1s kabuğuna sahiptir. Tüm periyodik tablonun İE₁'si en yüksek elementidir (2372 kJ/mol).",
    "difficulty": "orta"
  },
  {
    "id": "PQ_EA_01",
    "category": "electron_affinity",
    "questionType": "multiple_choice",
    "prompt": "Periyodik tabloda elektron ilgisi EN YÜKSEK olan element hangisidir?",
    "answer": "Klor (Cl)",
    "distractors": ["Flor (F)", "Oksijen (O)", "Brom (Br)"],
    "explanation": "ÖSYM'nin en meşhur istisnası: Normalde grupta yukarı çıkıldıkça elektron ilgisi artar ancak Klor'un elektron ilgisi Flor'dan büyüktür (Cl > F).",
    "difficulty": "osym_tuzak"
  },
  {
    "id": "PQ_EA_02",
    "category": "electron_affinity",
    "questionType": "multiple_choice",
    "prompt": "Klor'un elektron ilgisinin Flor'dan daha yüksek olmasının nedeni nedir?",
    "answer": "Flor'un küçük hacmindeki elektron-elektron itmesinin yeni elektronu zorlaştırması",
    "distractors": [
      "Klor'un elektronegatifliğinin daha yüksek olması",
      "Flor'un soy gaz düzeninde olması",
      "Klor'un katman sayısının daha az olması"
    ],
    "explanation": "Flor atomunun 2p orbitali çok küçük bir hacme sahiptir. Yüksek elektron yoğunluğu gelen elektronu iter. Klor'un 3p orbitali daha geniştir ve elektronu daha rahat kabul eder.",
    "difficulty": "orta"
  },
  {
    "id": "PQ_EA_03",
    "category": "electron_affinity",
    "questionType": "true_false",
    "prompt": "Gaz halindeki bir atoma ikinci bir elektron eklenmesi (2. elektron ilgisi) her zaman endotermiktir.",
    "answer": "Doğru",
    "distractors": ["Yanlış"],
    "explanation": "Negatif yüklü bir anyona (X⁻) yeni bir negatif elektron yaklaştırılırken elektrostatik itme kuvveti oluşur. Bu itmeyi yenmek için sisteme enerji verilmesi zorunludur (ΔH > 0).",
    "difficulty": "orta"
  },
  {
    "id": "PQ_EA_04",
    "category": "electron_affinity",
    "questionType": "ordering",
    "prompt": "7A grubu halojenlerinin elektron ilgisi büyüklük sıralaması nasıldır?",
    "answer": "Cl > F > Br > I",
    "distractors": ["F > Cl > Br > I", "I > Br > Cl > F", "Cl > Br > F > I"],
    "explanation": "Cl (349 kJ/mol) > F (328 kJ/mol) > Br (325 kJ/mol) > I (295 kJ/mol).",
    "difficulty": "orta"
  },
  {
    "id": "PQ_EN_01",
    "category": "electronegativity",
    "questionType": "multiple_choice",
    "prompt": "Pauling ölçeğine göre periyodik cetvelde elektronegatifliği EN YÜKSEK olan element hangisidir?",
    "answer": "Flor (F)",
    "distractors": ["Klor (Cl)", "Helyum (He)", "Oksijen (O)"],
    "explanation": "Flor'un elektronegatiflik değeri 4.0 kabul edilmiştir ve periyodik sistemin en yüksek elektronegatifliğe sahip elementidir. (Klor elektron ilgisinde, Flor elektronegatiflikte liderdir).",
    "difficulty": "kolay"
  },
  {
    "id": "PQ_EN_02",
    "category": "electronegativity",
    "questionType": "true_false",
    "prompt": "8A grubu soy gazlar periyodik tablonun en yüksek elektronegatifliğe sahip grubudur.",
    "answer": "Yanlış",
    "distractors": ["Doğru"],
    "explanation": "Elektronegatiflik kimyasal bağdaki elektronları çekme yeteneğidir. Soy gazlar normalde bağ yapmadığı için elektronegatiflikleri tanımlanmaz.",
    "difficulty": "kolay"
  },
  {
    "id": "PQ_EN_03",
    "category": "electronegativity",
    "questionType": "multiple_choice",
    "prompt": "Aşağıdaki bileşiklerden hangisinin bağ iyonik karakteri EN YÜKSEKTİR?",
    "answer": "CsF",
    "distractors": ["NaCl", "LiF", "HF"],
    "explanation": "İki atom arasındaki elektronegatiflik farkı ne kadar büyükse iyonik karakter o kadar fazladır. Cs (veya Fr) en elektropozitif, F en elektronegatif elementtir.",
    "difficulty": "orta"
  },
  {
    "id": "PQ_AR_01",
    "category": "atomic_radius",
    "questionType": "multiple_choice",
    "prompt": "Aynı periyotta soldan sağa doğru gidildikçe atom yarıçapının küçülmesinin temel sebebi nedir?",
    "answer": "Katman sayısı aynı kalırken çekirdek yükünün (proton sayısının) artması",
    "distractors": [
      "Elektron sayısının azalması",
      "Kütle numarasının artması",
      "Elektron ilgisinin azalması"
    ],
    "explanation": "Proton sayısı arttıkça elektron başına düşen çekirdek çekim kuvveti artar ve elektron bulutu içeriye doğru büzülerek çapı küçültür.",
    "difficulty": "kolay"
  },
  {
    "id": "PQ_AR_02",
    "category": "atomic_radius",
    "questionType": "ordering",
    "prompt": "İzoelektronik tanecikler olan ₇N³⁻, ₉F⁻ ve ₁₁Na⁺ yarıçaplarını büyükten küçüğe sıralayınız.",
    "answer": "N³⁻ > F⁻ > Na⁺",
    "distractors": ["Na⁺ > F⁻ > N³⁻", "F⁻ > N³⁻ > Na⁺", "N³⁻ > Na⁺ > F⁻"],
    "explanation": "Hepsinde 10 elektron vardır. Proton sayısı en küçük olan ₇N³⁻ elektronları en zayıf çeker (çap en büyük). Proton sayısı en büyük olan ₁₁Na⁺ en sıkı çeker (çap en küçük).",
    "difficulty": "orta"
  },
  {
    "id": "PQ_AR_03",
    "category": "atomic_radius",
    "questionType": "ordering",
    "prompt": "Nötr demir atomu ve iyonlarının (₂₆Fe, ₂₆Fe²⁺, ₂₆Fe³⁺) yarıçap sıralaması nasıldır?",
    "answer": "Fe > Fe²⁺ > Fe³⁺",
    "distractors": ["Fe³⁺ > Fe²⁺ > Fe", "Fe²⁺ > Fe³⁺ > Fe", "Fe > Fe³⁺ > Fe²⁺"],
    "explanation": "Elektron verdikçe proton başına düşen çekim artar ve katyonun çapı daima nötr atomdan küçüktür. Yük arttıkça çap küçülür.",
    "difficulty": "kolay"
  },
  {
    "id": "PQ_AR_04",
    "category": "atomic_radius",
    "questionType": "multiple_choice",
    "prompt": "₂He gazının Van der Waals yarıçapı ile Cl₂ molekülündeki klor atomunun kovalent yarıçapı kıyaslandığında hangisi doğrudur?",
    "answer": "Aynı atom için Van der Waals yarıçapı kovalent yarıçaptan daima büyüktür.",
    "distractors": [
      "Kovalent yarıçap daima daha büyüktür.",
      "İki yarıçap türü daima birbirine eşittir.",
      "Van der Waals yarıçapı sadece metallerde ölçülür."
    ],
    "explanation": "Kovalent bağda elektron orbitalleri iç içe geçer (örtüşür), bu nedenle çekirdekler birbirine daha çok yaklaşır. Van der Waals temas halindedir, örtüşme yoktur.",
    "difficulty": "orta"
  },
  {
    "id": "PQ_OX_01",
    "category": "oxide_character",
    "questionType": "multiple_choice",
    "prompt": "Aşağıdaki oksitlerden hangisi su ile tepkimeye girerek ASİT oluşturur?",
    "answer": "SO₃",
    "distractors": ["Na₂O", "CO", "Al₂O₃"],
    "explanation": "SO₃ ametalin oksijence zengin oksitidir (asidik oksit/asit anhidriti). SO₃ + H₂O → H₂SO₄ tepkimesini verir. Na₂O bazik, CO nötr, Al₂O₃ amfoterdir.",
    "difficulty": "kolay"
  },
  {
    "id": "PQ_OX_02",
    "category": "oxide_character",
    "questionType": "multiple_choice",
    "prompt": "Aşağıdaki oksitlerden hangisi NÖTR oksittir ve suyla tepkime vermez?",
    "answer": "NO",
    "distractors": ["NO₂", "N₂O₅", "CaO"],
    "explanation": "Ametalin oksijen sayısı ametal sayısına eşit veya az ise nötr oksittir (CO, NO, N₂O). Asit, baz ve suyla normal koşullarda tepkime vermezler.",
    "difficulty": "orta"
  },
  {
    "id": "PQ_OX_03",
    "category": "oxide_character",
    "questionType": "multiple_choice",
    "prompt": "Hem HCl asidiyle hem de NaOH bazıyla tepkime vererek tuz ve su oluşturan oksit hangisidir?",
    "answer": "Al₂O₃",
    "distractors": ["CaO", "SO₂", "CO"],
    "explanation": "Alüminyum (Al) amfoter metaldir; oksidi olan Al₂O₃ de amfoter oksittir. Hem kuvvetli asitlerle hem de kuvvetli bazlarla tepkime verir.",
    "difficulty": "orta"
  },
  {
    "id": "PQ_OX_04",
    "category": "oxide_character",
    "questionType": "multiple_choice",
    "prompt": "Hangisi amfoter metal DEĞİLDİR?",
    "answer": "Magnezyum (Mg)",
    "distractors": ["Çinko (Zn)", "Alüminyum (Al)", "Kurşun (Pb)"],
    "explanation": "Amfoter metaller: Al, Zn, Cr, Pb, Sn, Be ('Zengin Sinan Beyaz Pabuç Aldı Çarşıdan'). Magnezyum (Mg) aktif bir toprak alkali metaldir, amfoter değildir; oksidi (MgO) baziktir.",
    "difficulty": "orta"
  },
  {
    "id": "PQ_OX_05",
    "category": "oxide_character",
    "questionType": "true_false",
    "prompt": "Amfoter bir metal olan Çinko (Zn), amonyak (NH₃) çözeltisi ile tepkime vererek H₂ gazı açığa çıkarır.",
    "answer": "Yanlış",
    "distractors": ["Doğru"],
    "explanation": "ÖSYM tuzağı: Amfoter metaller baz olarak SADECE KUVVETLİ BAZLARLA (NaOH, KOH gibi) tepkime verir. NH₃ zayıf baz olduğu için tepkime vermez!",
    "difficulty": "osym_tuzak"
  },
  {
    "id": "PQ_OX_06",
    "category": "oxide_character",
    "questionType": "ordering",
    "prompt": "Aynı gruptaki alkali metal oksitlerinin (Li₂O, Na₂O, K₂O) sulu çözeltilerinin bazlık kuvveti sıralaması nasıldır?",
    "answer": "K₂O > Na₂O > Li₂O",
    "distractors": ["Li₂O > Na₂O > K₂O", "Na₂O > K₂O > Li₂O", "Li₂O > K₂O > Na₂O"],
    "explanation": "Aynı grupta yukarıdan aşağıya inildikçe metalik aktiflik ve elektropozitiflik artar; dolayısıyla metal oksitlerin bazlık kuvveti aşağı doğru artar.",
    "difficulty": "orta"
  },
  {
    "id": "PQ_HA_01",
    "category": "halogen_acids",
    "questionType": "ordering",
    "prompt": "Halojen asitlerinin (HF, HCl, HBr, HI) sulu çözeltilerdeki asitlik kuvvetlerini küçükten büyüğe sıralayınız.",
    "answer": "HF < HCl < HBr < HI",
    "distractors": [
      "HI < HBr < HCl < HF",
      "HCl < HBr < HI < HF",
      "HF < HI < HBr < HCl"
    ],
    "explanation": "Grupta aşağı inildikçe halojen yarıçapı büyür, H-X bağ uzunluğu artar ve bağ zayıflar. H⁺ iyonu daha kolay suya verilir. HI en kuvvetli, HF ise zayıf asittir.",
    "difficulty": "orta"
  },
  {
    "id": "PQ_HA_02",
    "category": "halogen_acids",
    "questionType": "multiple_choice",
    "prompt": "Zayıf bir asit olmasına rağmen camı ve porseleni aşındıran, bu yüzden plastik kaplarda saklanan asit hangisidir?",
    "answer": "HF (Hidroflorik Asit)",
    "distractors": ["HCl (Tuz Ruhu)", "H₂SO₄ (Zaç Yağı)", "HNO₃ (Kezzap)"],
    "explanation": "HF asidi camın yapısındaki SiO₂ ile tepkimeye girer (SiO₂ + 4HF → SiF₄ + 2H₂O). Bu nedenle cam ve porselen kaplarda saklanamaz.",
    "difficulty": "kolay"
  },
  {
    "id": "PQ_HA_03",
    "category": "halogen_acids",
    "questionType": "ordering",
    "prompt": "Klorun oksiasitleri olan HClO, HClO₂, HClO₃, HClO₄ asitlerinin kuvvet sıralaması nasıldır?",
    "answer": "HClO < HClO₂ < HClO₃ < HClO₄",
    "distractors": [
      "HClO₄ < HClO₃ < HClO₂ < HClO",
      "HClO < HClO₄ < HClO₂ < HClO₃",
      "Hepsinin asitlik kuvveti eşittir"
    ],
    "explanation": "Aynı ametalin oksiasitlerinde oksijen sayısı arttıkça halojenin yükseltgenme basamağı artar, O-H bağı daha çok zayıflar ve asitlik kuvveti artar.",
    "difficulty": "orta"
  },
  {
    "id": "PQ_HA_04",
    "category": "halogen_acids",
    "questionType": "ordering",
    "prompt": "Eşit sayıda oksijen içeren HClO, HBrO ve HIO asitlerinin asitlik kuvveti sıralaması nasıldır?",
    "answer": "HClO > HBrO > HIO",
    "distractors": [
      "HIO > HBrO > HClO",
      "HBrO > HClO > HIO",
      "HClO = HBrO = HIO"
    ],
    "explanation": "Halojenin elektronegatifliği arttıkça (Cl > Br > I), bağ elektronlarını kendine doğru çekerek O-H bağını gevşetir ve protonun ayrılmasını kolaylaştırır.",
    "difficulty": "osym_tuzak"
  },
  {
    "id": "PQ_TRAP_01",
    "category": "oxide_character",
    "questionType": "multiple_choice",
    "prompt": "Aşağıdaki oksitlerden hangisi O₂ gazı ile YANMAZ?",
    "answer": "SO₃",
    "distractors": ["CO", "NO", "SO₂"],
    "explanation": "SO₃ bileşiğinde kükürt (S) alabileceği maksimum yükseltgenme basamağındadır (+6, 6A grubu). Maksimum basamağa ulaşmış element oksitleri daha fazla yükseltgenemez ve yanmaz.",
    "difficulty": "osym_tuzak"
  },
  {
    "id": "PQ_TRAP_02",
    "category": "ion_energy",
    "questionType": "true_false",
    "prompt": "1A grubu alkali metallerinin 2. iyonlaşma enerjileri, aynı periyottaki soy gazların 1. iyonlaşma enerjilerinden daha büyüktür.",
    "answer": "Doğru",
    "distractors": ["Yanlış"],
    "explanation": "1A grubu 1 elektron verdiğinde bir üst periyottaki soy gaz düzenine ulaşır. Artı yüklü iyondan elektron koparmak, aynı elektron dizilimine sahip nötr soy gazdan elektron koparmaktan daha zordur.",
    "difficulty": "osym_tuzak"
  }
]
```

---

## 6. UI / UX ve Oyunlaştırma Tasarım Önerileri

`kimyaatom` uygulamasına "Periyodik Özellikler ve ÖSYM İstisnaları" konusu entegre edilirken aşağıdaki etkileşimli bileşenler yüksek öğrenme verimi sağlayacaktır:

### 6.1. Görsel Kart ve Animasyon Tasarımı
1. **İE Merdiven Grafiği (Küresel Simetri Vurgusu):**
   - 2A ve 5A basamaklarında küçük bir tepe animasyonu ve "Küresel Simetri!" rozeti.
   - 8A'dan 1A'ya geçişte dik bir uçurum ve kırık çizgi animasyonu ("Yeni Katman!").
2. **Klor vs Flor Arenası:**
   - Ekranda Flor ve Klor karşı karşıya gelir; F'nin dar kabuğundaki itişen elektronlar titreşir; Cl'nin geniş kabuğu gösterilerek "Eİ Şampiyonu: Cl!" etiketi basılır.
3. **Kardan Adam Yarıçap Göstergesi:**
   - Grup boyunca aşağı indikçe kardan adamın gövdesi büyür; periyotta sağa gittikçe havuç burnu incelir.
4. **Cam Aşındırma Efekti (HF Kartı):**
   - $HF$ sorulduğunda arka planda eriyen veya buğulanan bir cam tüp efekti ve "Plastik kapta sakla!" uyarı piktogramı.

### 6.2. Test Modları
- **Klasik Çoktan Seçmeli:** ÖSYM tarzı 4 veya 5 seçenekli sorular.
- **Doğru / Yanlış (Refleks Modu):** ÖSYM'nin en popüler tuzak öncüllerini hızlıca değerlendirme.
- **Sıralama Modu (Drag & Drop veya Tıklama):** İzoelektronik yarıçaplar, İE sıralamaları ve halojen asitleri sıralama.
- **İE Tablosu Dedektifi:** İE tablosunda sıçramayı bulup elementin grubunu ve değerlik elektronunu tespit etme.

---

## 7. Sonuç ve Geliştirici Yol Haritası

Bu araştırma dökümanı:
1. `src/types/topics.ts` içerisine `periodic_trends` topic ID'si eklenerek,
2. `src/data/periodicTrends.ts` dosyası içinde `StandardQuizItem` standartlarına uyarlanmış sorularla,
3. Hem TYT hem de AYT soru havuzunu kapsayacak şekilde sisteme bağlanmaya hazır durumdadır.
