# AYT Kimya: Organik Reaksiyon Türleri, Ayıraçlar ve Ayırt Edici Testler
**MEB Müfredatı ve ÖSYM Sınav Standartlarına Uygun Kapsamlı Araştırma ve Veri Yapısı Raporu**

---

## 1. Giriş ve Müfredat Çerçevesi

AYT Kimya sınavında 13 sorunun 3 ila 4 tanesi doğrudan **Organik Kimya** konusundan gelmektedir. Bu soruların en belirleyici, öğrencilerin en çok zorlandığı ve kavram yanılgılarına düştüğü bölümü ise **"Organik Reaksiyon Türleri, Ayıraçlar ve Fonksiyonel Grupların Ayırt Edici Nitel Testleri"**dir.

MEB 12. Sınıf Kimya Dersi Öğretim Programı (Kazanım 12.3.1, 12.3.2, 12.3.3, 12.3.4, 12.3.5) incelendiğinde, ÖSYM'nin soru kurgularında sıklıkla bir "X ve Y bilinmeyen bileşiği" kurgusu kurduğu görülmektedir:
- *"X bileşiği amonyaklı gümüş nitrat (Tollens) ile gümüş aynası oluştururken, bromlu suyun rengini gidermemektedir..."*
- *"Y bileşiği Fehling çözeltisine etki etmezken, yükseltgendiğinde keton sınıfı bileşik oluşturmaktadır..."*
- *"Z bileşiğine asidik ortamda su katıldığında Markovnikov kuralına göre sekonder alkol oluşmaktadır..."*

Bu raporda; tüm ayırt edici reaktifler, reaksiyon mekanizmaları, yükseltgenme kademeleri, alkin hidratasyonu, Markovnikov & Zaytsev kuralları, MEB istisnaları ve tam bir TypeScript veri modeli sunulmuştur.

---

## 2. Ayırt Edici Ayıraçlar ve Nitel Analiz Testleri

### 2.1. Tollens Ayıracı (Amonyaklı Gümüş Nitrat Çözeltisi — $[Ag(NH_3)_2]^+$)

Tollens ayıracı, gümüş nitrat ($AgNO_3$) çözeltisine bazik ortamda amonyak ($NH_3$) eklenmesiyle hazırlanan **diamingümüş(I)** $[Ag(NH_3)_2]^+$ kompleks iyonunu içeren berrak bir çözeltidir.

#### A) Aldehitler ile Tepkimesi (Redoks Reaksiyonu / Gümüş Aynası)
- **Mekanizma:** Aldehitler karbonil karbonundaki hidrojen atomu sayesinde kolayca karboksilik aside (veya bazik ortamda karboksilat iyonuna) yükseltgenir. Bu sırada çözeltideki $Ag^+$ iyonları metalik gümüşe ($Ag^0$) indirgenir.
- **Tepkime Denklemi:**
  $$R-CHO + 2[Ag(NH_3)_2]^+ + 3OH^- \xrightarrow{\Delta} R-COO^- + 2Ag_{(k)} \downarrow + 4NH_3 + 2H_2O$$
- **Gözlem:** Deney tüpünün iç yüzeyinde parlak, yansıtıcı bir **"Gümüş Aynası"** tabakası kaplanır veya gri/siyah metalik gümüş çöker.
- **Nicel Mol İlişkisi (ÖSYM Favorisi):**
  $$1 \text{ mol Aldehit grubu} \iff 2 \text{ mol } Ag_{(k)} \text{ çöker}$$
  *(Örn: 0.1 mol asetaldehit harcandığında 0.2 mol (21.6 g) gümüş aynası oluşur).*
- **Ketonlar:** Karbonil grubuna bağlı hidrojen taşımadıklarından Tollens ile yükseltgenmezler ve **tepkime VERMEZLER**.

#### B) Formik Asit ($HCOOH$) İstisnası (Kritik MEB Detayı!)
- Formik asit (metanoik asit), karboksilik asitlerin ilk üyesidir.
- Yapı formülü incelendiğinde:
  $$H-\overset{\overset{O}{\parallel}}{C}-OH$$
  Molekülde hem **karboksil ($-COOH$)** grubu hem de **aldehit ($-CHO$)** grubu mevcuttur.
- **Sonuç:** Karboksilik asit olmasına rağmen Tollens ayıracı ile **gümüş aynası verir** ve karbonik aside ($H_2CO_3 \rightarrow CO_2 + H_2O$) yükseltgenir!

#### C) Uç Alkinler (Terminal Alkynes) ile Tepkimesi (Asit-Baz / Çökelme — REDOKS DEĞİL!)
- **Uç Alkin ($R-C\equiv C-H$):** Üçlü bağ karbonunda en az bir hidrojen taşıyan alkinlerdir (örn: Etin, Propin, 1-Bütin). Üçlü bağ karbonundaki $sp$ hibritleşmesi nedeniyle bu hidrojen zayıf asidik karakter gösterir.
- **İç Alkin ($R-C\equiv C-R'$):** Üçlü bağ karbonlarında hidrojen yoktur (örn: 2-Bütin). Tollens ile **tepkime VERMEZ**.
- **Tepkime:**
  $$R-C\equiv C-H + [Ag(NH_3)_2]^+ \rightarrow R-C\equiv C-Ag \downarrow \text{ (Kirli Beyaz Çökelek)} + NH_4^+ + NH_3$$
- **Asetilen ($HC\equiv CH$) Özel Durumu:** 2 adet asidik hidrojen içerdiğinden 1 mol asetilen 2 mol $Ag^+$ bağlar:
  $$HC\equiv CH + 2[Ag(NH_3)_2]^+ \rightarrow Ag-C\equiv C-Ag \downarrow \text{ (Gümüş Asetilenür - Beyaz Çökelek)} + 2NH_4^+ + 2NH_3$$
- ⚠️ **ÖSYM TUZAĞI:**
  1. Uç alkinlerin Tollens ile tepkimesi **REDOKS DEĞİLDİR!** Bir asit-baz yer değiştirme tepkimesidir. Gümüşün yükseltgenme basamağı değişmez ($+1$ olarak kalır).
  2. Gümüş aynası **oluşmaz**; patlayıcı kuru halde olan **beyaz/kirli beyaz çökelek** oluşur!

---

### 2.2. Fehling Ayıracı (Bazik Ortamda $Cu^{2+}$ Tartrat Kompleksi)

Fehling ayıracı iki ayrı çözeltinin karışımıyla taze hazırlanır:
- **Fehling A:** Mavi renkli sulu bakır(II) sülfat ($CuSO_4$) çözeltisi.
- **Fehling B:** Sodyum potasyum tartrat (Rochelle tuzu) ve sodyum hidroksit ($NaOH$) içeren kuvvetli bazik çözelti. Karışım koyu mavi renkli $Cu^{2+}$-tartrat kompleksidir.

#### A) Alifatik Aldehitler ile Tepkimesi
- **Mekanizma:** Aldehit karboksilat iyonuna yükseltgenirken, mavi renkli $Cu^{2+}$ iyonları bakır(I) okside ($Cu_2O$) indirgenir.
- **Tepkime Denklemi:**
  $$R-CHO + 2Cu^{2+} + 5OH^- \xrightarrow{\Delta} R-COO^- + Cu_2O_{(k)} \downarrow \text{ (Kiremit Kırmızısı Çökelek)} + 3H_2O$$
- **Gözlem:** Mavi renk kaybolur, tüpün dibinde **kiremit kırmızısı (tuğla kırmızısı)** $Cu_2O$ katısı çöker.
- **Nicel Mol İlişkisi:**
  $$1 \text{ mol Aldehit} \iff 1 \text{ mol } Cu_2O_{(k)} \text{ (kırmızı çökelek)} \iff 2 \text{ mol } Cu^{2+}$$
- **Ketonlar:** Fehling ayıracı ile tepkime **VERMEZ**.

#### B) Aromatik Aldehitler İstisnası (Benzaldehit Kuralı — MEB Detayı!)
- **Benzaldehit ($C_6H_5-CHO$):** Benzen halkasına doğrudan bağlı aldehit grubudur.
- Rezonans kararlılığı nedeniyle alifatik aldehitlere göre daha zayıf indirgendir.
- Fehling ayıracı, Tollens'e göre daha ılımlı (daha zayıf) bir yükseltgendir.
- **Kural:** Benzaldehit ve türevi aromatik aldehitler **Tollens ile tepkime VERİRKEN, Fehling ile tepkime VERMEZ!**
- *ÖSYM Soru Kurgusu:* "Tollens ile gümüş aynası oluşturan fakat Fehling ile kırmızı çökelek vermeyen organik bileşik hangisidir?" $\rightarrow$ **Benzaldehit ($C_6H_5CHO$)**.

#### C) Uç Alkinler ile Amonyaklı $Cu_2Cl_2$ (Bakır(I) Ayıracı)
- Amonyaklı bakır(I) klorür ($Cu(NH_3)_2^+$) çözeltisi ile uç alkinler yer değiştirme tepkimesi vererek **kırmızı/kızıl-kahve çökelek** ($R-C\equiv C-Cu \downarrow$) oluşturur.

---

### 2.3. Bromlu Suyun Rengini Giderme ($Br_2 / CCl_4$ veya $Br_2(aq)$)

Bromun sudaki veya karbon tetraklorürdeki çözeltisi karakteristik **kızıl-kahve / kırmızımsı kahverengi** renktedir. Doymamışlık (karbonlar arası $\pi$ bağı) tayininde kullanılır.

#### A) Alkenler ile Tepkimesi (Elektrofilik Katılma)
- İkili bağdaki $\pi$ bağı kırılarak her iki karbona birer brom atomu bağlanır.
- **Tepkime:**
  $$R-CH=CH_2 + Br_2 \text{ (kızıl-kahve)} \rightarrow R-CHBr-CH_2Br \text{ (renksiz 1,2-dibromoalkan)}$$
- **Gözlem:** Çözeltinin kızıl-kahve rengi tamamen kaybolur (renksizleşir).

#### B) Alkinler ile Tepkimesi
- Üçlü bağda 2 adet $\pi$ bağı bulunduğundan, 1 mol alkin **2 mol $Br_2$** bağlayabilir.
  $$R-C\equiv CH + 2Br_2 \rightarrow R-CBr_2-CHBr_2 \text{ (renksiz tetrahaloalkan)}$$

#### C) Bromlu Suyun Rengini GİDERMEYENLER (Sınav Tuzakları!)
1. **Alkanlar ve Sikloalkanlar:** Karbonlar arası sadece sigma ($\sigma$) bağı bulunduğundan oda koşullarında katılma tepkimesi vermezler. Bromlu suyun rengini **gidermezler**. (Alkanlar sadece yüksek sıcaklık ve UV ışık altında radikalik yer değiştirme verir, bu katılma değildir).
2. **Benzen ($C_6H_6$):** Benzen halkasında 3 adet $\pi$ bağı bulunmasına rağmen, bu bağlar delokalize rezonans kararlılığına sahiptir. Benzen oda koşullarında katılma tepkimesine karşı son derece isteksizdir ve **bromlu suyun rengini GİDERMEZ!**

---

### 2.4. Baeyer Testi (Seyreltik Soğuk Bazik $KMnO_4$)

Seyreltik ve soğuk potasyum permanganat ($KMnO_4$) çözeltisi belirgin **mor / menekşe** renktedir.

- **Mekanizma:** Alkenlerin çift bağına iki adet $-OH$ grubu bağlanarak **komşu diol (glikol)** oluşur (Ilımlı yükseltgenme).
- **Tepkime:**
  $$3CH_2=CH_2 + 2KMnO_4 \text{ (mor)} + 4H_2O \rightarrow 3CH_2OH-CH_2OH \text{ (glikol)} + 2MnO_2 \downarrow \text{ (kahverengi çökelek)} + 2KOH$$
- **Gözlem:** Permanganatın mor rengi kaybolur ve kahverengi manganez dioksit ($MnO_2$) çökeleği oluşur.
- **Kullanım:** Alken ve alkinlerin tanınmasında kullanılır. Alkanlar ve benzen Baeyer testine yanıt vermez.

---

## 3. Alkollerin Sınıflandırılması ve Kademeli Yükseltgenmesi

Alkoller, hidroksil ($-OH$) grubunun bağlı olduğu karbon atomuna (**alfa karbonu**) bağlı olan alkil ($R-$) gruplarının sayısına göre 3 sınıfa ayrılır:

```
    Primer (1°)               Sekonder (2°)              Tersiyer (3°)
        H                          R'                         R'
        |                          |                          |
    R - C - OH                 R - C - OH                 R - C - OH
        |                          |                          |
        H                          H                          R''
  (Alfa C'da 2 H)            (Alfa C'da 1 H)            (Alfa C'da 0 H)
```

Yükseltgenme reaktifleri: Asidik $KMnO_4$ veya $K_2Cr_2O_7 / H_2SO_4$.

### 3.1. Primer Alkoller ($1^\circ$) — İki Basamak Yükseltgenir
- **1. Basamak:** 1 mol hidrojen molekülü ($H_2$) ayrılması veya oksijen katılması ile **Aldehit** oluşur.
  $$R-CH_2OH \xrightarrow{[O]} R-CHO + H_2O$$
- **2. Basamak:** Aldehit bir basamak daha yükseltgenerek **Karboksilik Asit** oluşturur.
  $$R-CHO \xrightarrow{[O]} R-COOH$$
- **Örnek:**
  $$\text{Etanol } (CH_3CH_2OH) \xrightarrow{[O]} \text{Asetaldehit } (CH_3CHO) \xrightarrow{[O]} \text{Asetik asit } (CH_3COOH)$$
- **Metanol ($CH_3OH$) İstisnası:** Metanol 3 basamak yükseltgenebilir:
  $$\text{Metanol} \rightarrow \text{Formaldehit} \rightarrow \text{Formik asit} \rightarrow \text{Karbonik asit } (H_2CO_3 \rightarrow CO_2 + H_2O)$$

### 3.2. Sekonder Alkoller ($2^\circ$) — Tek Basamak Yükseltgenir
- Alfa karbonunda sadece 1 hidrojen bulunduğundan yalnızca 1 basamak yükseltgenerek **Keton** oluştururlar.
  $$R-CH(OH)-R' \xrightarrow{[O]} R-\overset{\overset{O}{\parallel}}{C}-R' + H_2O$$
- Ketonlar normal şartlarda karbonil karbonunda koparılacak H olmadığından daha fazla **yükseltgenemez**.
- **Örnek:**
  $$\text{2-Propanol (İzopropil alkol)} \xrightarrow{[O]} \text{Propanon (Aseton)}$$

### 3.3. Tersiyer Alkoller ($3^\circ$) — YÜKSELTGENMEZ!
- Alfa karbonuna 3 alkil grubu bağlıdır ve üzerinde **hiç hidrojen atomu yoktur**.
- Bu nedenle tersiyer alkoller ılımlı koşullarda yükseltgenme tepkimesi **VERMEZLER**.
- **Örnek:** 2-Metil-2-propanol (Tersiyer bütil alkol) $KMnO_4$ veya $K_2Cr_2O_7$ ile reaksiyona girmez; mor/turuncu renk değişmez.

---

## 4. Alkinlere Su Katılması (Hidratasyon) ve Keto-Enol Tautomerisi

Alkinlere su ($H_2O$) katılması, asit ($H_2SO_4$) ve cıva(II) sülfat ($HgSO_4$) katalizörlüğünde gerçekleşir. Bu reaksiyon ÖSYM'nin en sevdiği "Enol-Keto Tautomerisi" mekanizmasıdır.

### 4.1. Asetilene ($C_2H_2$) Su Katılması (Aldehit Oluşumu — TEK İSTİSNA!)
Asetilen (etin) 2 karbonlu en basit alkindir.
1. **Adım (Katılma):** $HC\equiv CH + H-OH \xrightarrow{H_2SO_4, HgSO_4} [CH_2=CH-OH]$ (Kararsız **Enol** ara ürünü).
   - *Enol:* İkili bağ karbonuna doğrudan $-OH$ bağlı yapıdır; termodinamik olarak oldukça kararsızdır.
2. **Adım (Tautomeri):** Enoldeki hidrojen komşu $CH_2$ grubuna göç ederken, ikili bağ karbonil oksijenine kayar.
   $$[CH_2=CH-OH] \rightleftharpoons CH_3-\overset{\overset{O}{\parallel}}{C}-H \text{ (Asetaldehit - Kararlı Keto formu)}$$
- **Önemli Kural:** Alkinler içerisinde su katıldığında **ALDEHİT** oluşturan **TEK ALKİN ASETİLENDİR**!

### 4.2. Diğer Alkinlere (3+ Karbonlu) Su Katılması (Keton Oluşumu)
Asetilen dışındaki tüm alkinlere (propin, 1-bütin, 2-bütin vb.) su katıldığında **Markovnikov Kuralı** gereğince $-OH$ grubu üçlü bağdaki hidrojeni az olan iç karbona bağlanır.
- **Propin Örneği:**
  $$CH_3-C\equiv CH + H_2O \xrightarrow{H^+, Hg^{2+}} [CH_3-\overset{\overset{OH}{\mid}}{C}=CH_2] \text{ (Kararsız Enol)}$$
  $$[CH_3-C(OH)=CH_2] \rightleftharpoons CH_3-\overset{\overset{O}{\parallel}}{C}-CH_3 \text{ (Aseton / Propanon - Keton)}$$
- **Genel Kural:** Asetilen hariç tüm alkinlere su katılması sonucunda **KETON** sınıfı bileşikler elde edilir.

---

## 5. Markovnikov Kuralı ve Zaytsev Kuralı

### 5.1. Markovnikov Kuralı (Katılma Reaksiyonlarında Yönelme)
Asimetrik bir alkene (veya alkine), asimetrik bir reaktif ($H-X, H-OH, H-OSO_3H$) katılırken:
> **"Reaktifin hidrojen atomu ($H^+$), çift bağ karbonlarından hidrojeni çok olan karbon atomuna; elektronegatif grup ($X^-, OH^-$) ise hidrojeni az olan karbon atomuna bağlanır."**

- **Öğrenci Hafıza Kodu:** *"Zengine hidrojen (daha zengin olur), fakire halojen."*
- **Karbokatyon Mantığı:** Hidrojen uca bağlandığında daha kararlı olan sekonder veya tersiyer karbokatyon ara ürünü oluşur ($3^\circ > 2^\circ > 1^\circ$).
- **Örnek 1: Propene $HCl$ Katılması:**
  $$CH_3-CH=CH_2 + HCl \rightarrow \underbrace{CH_3-CH(Cl)-CH_3}_{\text{Ana Ürün (2-Kloropropan, \%90+)}} + \underbrace{CH_3-CH_2-CH_2Cl}_{\text{Yan Ürün (1-Kloropropan, \%10-)}}$$
- **Örnek 2: Propene $H_2O$ Katılması (Asit Katalizli Hidratasyon):**
  $$CH_3-CH=CH_2 + H_2O \xrightarrow{H^+} \underbrace{CH_3-CH(OH)-CH_3}_{\text{Ana Ürün (2-Propanol / Sekonder Alkol)}} + \text{Yan Ürün (1-Propanol)}$$
- **Simetrik Alkenlerde:** $CH_2=CH_2$ veya $CH_3-CH=CH-CH_3$ gibi simetrik alkenlerde Markovnikov kuralı aranmaz; her iki karbonun hidrojen sayısı eşittir.

### 5.2. Zaytsev Kuralı (Ayrılma / Eliminasyon Reaksiyonlarında Yönelme)
Markovnikov kuralının tersi yönde işleyen eliminasyon kuralıdır:
- Alkollerden derişik asitle su çekilmesinde (dehidrasyon) veya alkil halojenürlerden bazik ortamda $HX$ ayrılmasında (dehidrohalojenasyon):
> **"Çift bağ oluşurken hidrojen atomu, fonksiyonel grubun komşusu olan karbonlardan hidrojeni EN AZ olan karbondan koparılır."**

- **Öğrenci Hafıza Kodu:** *"Fakirden hidrojen çalınır (fakir daha fakir olur)."*
- **Sonuç:** Çift bağa en fazla alkil bağlı olan (en kararlı) alken ana ürün olarak meydana gelir.
- **Örnek: 2-Bütanolden Su Çekilmesi ($H_2SO_4, 170^\circ C$):**
  $$CH_3-CH_2-CH(OH)-CH_3 \xrightarrow{H_2SO_4, 170^\circ C} \underbrace{CH_3-CH=CH-CH_3}_{\text{Ana Ürün (2-Büten, daha kararlı)}} + \underbrace{CH_3-CH_2-CH=CH_2}_{\text{Yan Ürün (1-Büten)}}$$

---

## 6. MEB Müfredatına Göre Organik Reaksiyon Türleri Özeti

| Reaksiyon Türü | Tanım ve Özellik | Tipik Müfredat Örneği |
|---|---|---|
| **Katılma (Addition)** | $\pi$ bağının kırılarak yerine iki yeni $\sigma$ bağı oluşması | $CH_2=CH_2 + Br_2 \rightarrow CH_2Br-CH_2Br$ |
| **Ayrılma (Elimination)** | Komşu karbonlardan iki atom/grubun koparak aralarında $\pi$ bağı oluşturması | $CH_3-CH_2OH \xrightarrow{170^\circ C, H^+} CH_2=CH_2 + H_2O$ |
| **Yer Değiştirme (Substitution)** | Bir atom veya grubun molekülden çıkıp yerine başka grubun girmesi | 1) $CH_4 + Cl_2 \xrightarrow{UV} CH_3Cl + HCl$<br>2) $R-C\equiv CH + Ag^+ \rightarrow R-C\equiv CAg \downarrow + H^+$ |
| **Yükseltgenme (Redox - Oksidasyon)** | Moleküle oksijen girmesi veya hidrojen çıkması | $R-CH_2OH \xrightarrow{[O]} R-CHO \xrightarrow{[O]} R-COOH$ |
| **İndirgenme (Redox - Redüksiyon)** | Moleküle hidrojen girmesi veya oksijen çıkması ($H_2 / Ni, Pt, LiAlH_4, NaBH_4$) | $R-CHO \xrightarrow{+H_2} R-CH_2OH$ (Primer alkol) |
| **Kondenzasyon** | İki organik molekülün küçük bir molekül ($H_2O$) açığa çıkararak birleşmesi | Asit + Alkol $\rightleftharpoons$ Ester + Su ($RCOOH + R'OH \rightleftharpoons RCOOR' + H_2O$) |
| **Polimerleşme** | Çok sayıda küçük molekülün (monomer) kovalent bağlarla dev moleküllere dönüşmesi | $n(CH_2=CH_2) \rightarrow -[CH_2-CH_2]_n-$ (Polietilen) |

---

## 7. Öğrencilerin En Çok Düştüğü 10 Kritik Sınav Tuzağı

| No | Yaygın Öğrenci Yanılgısı | Kimyasal Gerçek (Doğrusu) | ÖSYM Soru Kurgusu ve Önemi |
|---|---|---|---|
| **1** | *"Tollens ayıracı sadece aldehitlerle tepkime verir."* | **YANLIŞ!** Formik asit ($HCOOH$) ve uç alkinler ($R-C\equiv CH$) de Tollens ile tepkime verir. | "Tollens'e etki eden bileşik bir aldehit olmayabilir." öncülü çok sık test edilir. |
| **2** | *"Uç alkinlerin Tollens ile tepkimesi redokstur ve gümüş aynası oluşturur."* | **YANLIŞ!** Bu bir asit-baz / yer değiştirme tepkimesidir. Gümüş aynası değil, beyaz çökelek ($R-C\equiv CAg$) oluşur. | Soru kökünde "redoks tepkimesi gerçekleşir" ifadesiyle öğrenci elenir. |
| **3** | *"Tüm aldehitler hem Tollens hem Fehling ile tepkime verir."* | **YANLIŞ!** Benzaldehit ($C_6H_5CHO$) gibi aromatik aldehitler Tollens verir fakat Fehling ile tepkime **vermez**. | Benzaldehit ayırt etme sorularında kilit çeldiricidir. |
| **4** | *"Benzen molekülünde 3 tane pi bağı olduğu için bromlu suyun rengini giderir."* | **YANLIŞ!** Benzen halkası rezonans kararlılığı nedeniyle katılma tepkimesine dirençlidir, bromlu suyun rengini **gidermez**. | Alkenler ile benzeni ayırt etmede en temel kriterdir. |
| **5** | *"Tersiyer alkoller ketonlara yükseltgenir."* | **YANLIŞ!** Ketonlara yükseltgenenler **sekonder ($2^\circ$)** alkollerdir. Tersiyer alkollerin alfa C'unda H olmadığından yükseltgenmezler. | Alkollerin yükseltgenme grafiğinde tersiyer alkol reaksiyon vermez. |
| **6** | *"Tüm alkinlere su katıldığında aldehit oluşur."* | **YANLIŞ!** Yalnızca **asetilene ($C_2H_2$)** su katıldığında aldehit (asetaldehit) oluşur; 3 ve daha fazla karbonlu alkinler **keton** verir. | Tautomeri sorularında en sık düşülen hatalı genellemedir. |
| **7** | *"Fenol bir alkoldür ve yükseltgenebilir."* | **YANLIŞ!** Fenol ($C_6H_5OH$) zayıf asidik karakterde aromatik bir bileşiktir, alkol sınıfında değildir ve alkol reaksiyonlarını vermez. | Fenol ve etanol karşılaştırmalarında çok sık sorulur. |
| **8** | *"Ketonlar Tollens ayıracını indirger."* | **YANLIŞ!** Ketonlar karbonil karbonunda H taşımadığından yükseltgenemez, Tollens ve Fehling ile tepkime vermezler. | Aldehit ile keton karışımını ayırma sorularında esastır. |
| **9** | *"Markovnikov kuralında hidrojen az olana hidrojen bağlanır."* | **YANLIŞ!** "Zengine hidrojen" kuralıdır; hidrojeni çok olana hidrojen, az olana halojen veya hidroksil bağlanır. | Ana ürün / yan ürün belirleme sorularında ters ürün işaretletilir. |
| **10**| *"Alkanlar bromlu suyun rengini oda koşullarında giderir."* | **YANLIŞ!** Alkanlar sadece doymuş $\sigma$ bağları içerir, katılma vermez. UV ışık altında radikalik yer değiştirme doymamışlık testi değildir. | Doymuşluk - doymamışlık ayırt etme deneylerinde temel yanılgıdır. |

---

## 8. Veri Modeli ve Kod Entegrasyon Şeması (TypeScript Data Structure)

Bu araştırma, `src/data/organicReactions.ts` veri setine doğrudan dönüştürülebilecek şekilde tasarlanmıştır.

### 8.1. TypeScript Tip Tanımı (`src/types/organicReactions.ts`)

```typescript
export type ReagentType = 
  | 'tollens' 
  | 'fehling' 
  | 'bromine_water' 
  | 'baeyer' 
  | 'water_addition' 
  | 'oxidation' 
  | 'markovnikov';

export interface ReactionTestItem {
  id: string;
  name: string;
  formula: string;
  compoundClass: string;
  
  // Nitel Test Sonuçları
  tollensResult: {
    reacts: boolean;
    reactionType: 'redox' | 'substitution' | 'none';
    observation: string; // 'Gümüş aynası' | 'Beyaz çökelek' | 'Tepkime yok'
    note?: string;
  };
  
  fehlingResult: {
    reacts: boolean;
    observation: string; // 'Kiremit kırmızısı çökelek' | 'Tepkime yok'
    note?: string;
  };
  
  bromineResult: {
    decolorizes: boolean; // Bromlu suyun rengini giderir mi?
    reactionType: 'addition' | 'none';
    observation: string;
  };
  
  oxidationResult: {
    canOxidize: boolean;
    stepCount: 0 | 1 | 2;
    products: string[]; // ['Asetaldehit', 'Asetik asit']
    note?: string;
  };

  waterAdditionResult?: {
    reacts: boolean;
    productClass: 'aldehit' | 'keton' | 'alkol' | 'none';
    mainProduct: string;
    mechanism?: string; // 'Enol-Keto Tautomerisi' | 'Markovnikov'
  };

  examTraps: string[];
}
```

### 8.2. Standart Sınav / Quiz Veri Seti (20 Kritik Bileşik Tablosu)

| ID | Bileşik Adı | Formül | Sınıfı | Tollens | Fehling | Bromlu Su Rengini Giderir mi? | Yükseltgenme Kademesi ve Ürünü | Su Katılma Ürünü |
|---|---|---|---|---|---|---|---|---|
| 1 | **Etan** | $CH_3-CH_3$ | Alkan | ❌ Yok | ❌ Yok | ❌ Hayır | ❌ Yükseltgenmez | ❌ Katılma vermez |
| 2 | **Eten (Etilen)** | $CH_2=CH_2$ | Alken | ❌ Yok | ❌ Yok |  **Evet** (Katılma) | Baeyer ile glikol | Etanol ($1^\circ$ alkol) |
| 3 | **Propen** | $CH_3-CH=CH_2$ | Alken | ❌ Yok | ❌ Yok |  **Evet** (Katılma) | Baeyer ile 1,2-propandiol | 2-Propanol (Markovnikov) |
| 4 | **Etin (Asetilen)** | $HC\equiv CH$ | Uç Alkin |  **Beyaz Çökelek** (Yer değ.) |  Kırmızı Çökelek (Cu) |  **Evet** (2 mol Br2) | Şiddetli yükseltgenir | **Asetaldehit (Aldehit)** |
| 5 | **Propin** | $CH_3-C\equiv CH$ | Uç Alkin |  **Beyaz Çökelek** (Yer değ.) |  Kırmızı Çökelek (Cu) |  **Evet** (2 mol Br2) | - | **Aseton (Keton)** |
| 6 | **2-Bütin** | $CH_3-C\equiv C-CH_3$| İç Alkin | ❌ Yok | ❌ Yok |  **Evet** (2 mol Br2) | - | 2-Bütanon (Keton) |
| 7 | **Benzen** | $C_6H_6$ | Aromatik | ❌ Yok | ❌ Yok | ❌ **Hayır** (Rezonans) | ❌ Yükseltgenmez | ❌ Katılma vermez |
| 8 | **Metanol** | $CH_3OH$ | Primer Alkol | ❌ Yok | ❌ Yok | ❌ Hayır |  3 basamak ($CO_2+H_2O$) | - |
| 9 | **Etanol** | $CH_3CH_2OH$ | Primer Alkol | ❌ Yok | ❌ Yok | ❌ Hayır |  2 basamak (Etanal $\rightarrow$ Asetik asit) | - |
| 10 | **2-Propanol** | $CH_3-CH(OH)-CH_3$ | Sekonder Alkol| ❌ Yok | ❌ Yok | ❌ Hayır |  1 basamak (Aseton/Keton) | - |
| 11 | **2-Metil-2-propanol**| $(CH_3)_3C-OH$ | Tersiyer Alkol| ❌ Yok | ❌ Yok | ❌ Hayır | ❌ **Yükseltgenmez** | - |
| 12 | **Formaldehit** | $HCHO$ | Aldehit |  **Gümüş Aynası** |  **Kırmızı Çökelek** | ❌ Hayır |  1 basamak (Formik asit) | - |
| 13 | **Asetaldehit** | $CH_3CHO$ | Aldehit |  **Gümüş Aynası** |  **Kırmızı Çökelek** | ❌ Hayır |  1 basamak (Asetik asit) | - |
| 14 | **Benzaldehit** | $C_6H_5CHO$ | Aromatik Aldehit|  **Gümüş Aynası** | ❌ **Tepkime Yok!** | ❌ Hayır |  Benzoik asit | - |
| 15 | **Aseton (Propanon)**| $CH_3COCH_3$ | Keton | ❌ Yok | ❌ Yok | ❌ Hayır | ❌ **Yükseltgenmez** | - |
| 16 | **Formik Asit** | $HCOOH$ | Karboksilik Asit|  **Gümüş Aynası** |  **Kırmızı Çökelek** | ❌ Hayır |  $CO_2 + H_2O$ | - |
| 17 | **Asetik Asit** | $CH_3COOH$ | Karboksilik Asit| ❌ Yok | ❌ Yok | ❌ Hayır | ❌ Yükseltgenmez | - |
| 18 | **Fenol** | $C_6H_5OH$ | Aromatik Alkol değil| ❌ Yok | ❌ Yok |  Bromlu su ile beyaz çökelek ($2,4,6$-tribromofenol) | - | - |
| 19 | **Sikloheksen** | $C_6H_{10}$ | Sikloalken | ❌ Yok | ❌ Yok |  **Evet** (Katılma) | Baeyer ile diol | Sikloheksanol |
| 20 | **Metil format** | $HCOOCH_3$ | Ester (Format türevi)|  **Gümüş Aynası** (Format ucu)|  Kırmızı Çökelek | ❌ Hayır | - | - |

---

## 9. Soru ve Sınav Mekaniği Tasarımı (Uygulama İçin)

KimyaAtom uygulaması için bu konudan üretilebilecek interaktif test türleri:

1. **"Hangisi Bromlu Suyun Rengini Giderir?" Testi:**
   - Ekranda 4 bileşik gösterilir (örn: Propan, Benzen, Siklobutan, 2-Büten).
   - Kullanıcı hızlıca $\pi$ bağı içeren ve katılma veren bileşiği seçer (Doğru: 2-Büten).
2. **"Tollens Reaksiyon Türü & Gözlem" Eşleştirme:**
   - Aldehit verildiğinde $\rightarrow$ Gümüş aynası (Redoks)
   - Uç alkin verildiğinde $\rightarrow$ Beyaz çökelek (Asit-baz / Yer değiştirme)
   - Keton veya iç alkin verildiğinde $\rightarrow$ Tepkime vermez!
3. **"Alkol Yükseltgenme Ürünü" Modu:**
   - Bileşik formülü gösterilir: $(CH_3)_2CH-OH$ (2-Propanol).
   - Soru: "Bu bileşik 1 basamak yükseltgendiğinde hangi bileşik oluşur?"
   - Seçenekler: Propanal, Propanon (Aseton), Propanoik asit, Yükseltgenmez.
4. **"Markovnikov Dedektifi":**
   - Ekrana katılma tepkimesi gelir: $CH_3-CH=CH_2 + H_2O \rightarrow ?$
   - Kullanıcı ana ürünü bulur: 2-Propanol (İzopropil alkol).
5. **"Kritik İstisna Avcısı (Tuzaklar)":**
   - Benzaldehit Fehling verir mi? (Hayır)
   - Formik asit Tollens verir mi? (Evet)
   - Benzen bromlu suyun rengini giderir mi? (Hayır)
   - Asetilene su katılırsa ne oluşur? (Aldehit / Asetaldehit)
   - Propine su katılırsa ne oluşur? (Keton / Aseton)

---

## 10. Sonuç ve Özet

Bu araştırma dosyası, AYT Kimya'da öğrencilerin en çok karıştırdığı organik reaksiyon kurallarını ve ayıraçları, MEB ders kitapları ve ÖSYM çıkmış soruları doğrultusunda eksiksiz bir şekilde derlemiştir. Belirtilen 20 kritik bileşik ve kurallar dizisi, KimyaAtom projesinde yeni bir quiz konusu (`organic_reactions`) veya çalışma modu olarak doğrudan uygulanabilir yapıdadır.
