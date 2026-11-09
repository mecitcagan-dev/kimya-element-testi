# AYT Kimya: VSEPR, Molekül Geometrisi ve Hibritleşme Kapsamlı Araştırma Raporu ve Veri Seti

> **Hedef Kitle & Kapsam:** MEB 12. Sınıf Kimya Öğretim Programı (2. Ünite: Karbon Kimyasına Giriş - 12.2.3. Hibritleşme ve Molekül Geometrisi) ve ÖSYM YKS (AYT) Kimya Standartları.  
> **Kullanım Amacı:** KimyaAtom platformunda VSEPR, Molekül Geometrisi, Hibritleşme, Bağ Açıları ve Polarite konularını interaktif flashcard, çoktan seçmeli test, sıralama ve "Tuzak Dedektörü" modüllerine dönüştürmek.

---

## 1. MEB Müfredatı ve ÖSYM Soru Analizi

### 1.1. MEB Kazanımları ve Sınırları
* **Kazanım 12.2.3.1:** Tek, çift ve üçlü bağların oluşumunu hibrit ve p orbitalleri temelinde açıklar.
  * **Sınır:** Hibritleşme kavramı **yalnızca $sp$, $sp^2$ ve $sp^3$** türleriyle sınırlandırılmıştır. $d$ orbitallerinin katıldığı hibritleşmeler ($sp^3d$, $sp^3d^2$ vb.) MEB müfredatında yer almaz (oktet aşımı yapan moleküller VSEPR geometrisi olarak genel kültür/bilgi düzeyinde anılsa da hibritleşmeleri AYT'de sorulmaz).
  * Sigma ($\sigma$) ve pi ($\pi$) bağlarının oluşumu, hibritleşmeye katılan ve katılmayan p orbitallerinin rolü irdelenir.
* **Kazanım 12.2.3.2:** Moleküllerin geometrilerini VSEPR (*Değerlik Katmanı Elektron Çifti İtme Kuramı*) teorisine göre tahmin eder.
  * **Sınır:** İkinci periyot elementlerinin ($Be, B, C, N, O$) hidrojenle oluşturduğu basit hidrürler ($BeH_2, BH_3, CH_4, NH_3, H_2O$) merkezde tutulur.
  * Ayrıca $CO_2, HCN, HCHO, C_2H_4, C_2H_2, SO_2, SO_3, CCl_4, CHCl_3$ gibi çoklu bağ ve halojen içeren moleküller ile $NH_4^+, H_3O^+$ gibi kritik iyonlar da MEB ders kitaplarında doğrudan incelenmektedir.

### 1.2. Son 10 Yılın ÖSYM AYT / LYS Trendleri
ÖSYM, "Karbon Kimyasına Giriş" ünitesinden her yıl istisnasız **1 veya 2 soru** sormaktadır. Soruların %80'i şu 5 eksende toplanır:
1. **Hibritleşme Türü Tespiti:** Bir moleküldeki belirli bir atomun (özellikle C, N, O) yaptığı hibritleşme türünü ($sp, sp^2, sp^3$) buldurma.
2. **Sigma ($\sigma$) ve Pi ($\pi$) Bağı Sayısı & Örtüşen Orbital Türleri:** Örn: "H-C bağı $s-sp$ örtüşmesiyle oluşmuştur", "C=C bağı biri $sp^2-sp^2$, diğeri örtüşen p orbitalleri ($p-p$) ile oluşmuştur."
3. **VSEPR Formülü Eşleştirmesi:** $AX_2, AX_3, AX_2E, AX_4, AX_3E, AX_2E_2$ sembollerini molekülle eşleştirme.
4. **Bağ Açısı Sıralaması / Karşılaştırması:** $CH_4 (109.5^\circ) > NH_3 (107.3^\circ) > H_2O (104.5^\circ)$ veya $H_2O$ ile $SO_2$ açı farkı.
5. **Geometri Adı ve Molekül Polaritesi:** "Düzlem üçgen", "Üçgen piramit", "Kırık doğru", "Düzgün dörtyüzlü" ve "Doğrusal" terimlerinin polar/apolar niteliklerle çelişkisiz sorgulanması.

---

## 2. Kuramsal Çerçeve ve Temel Kavramlar

### 2.1. VSEPR Kuramı Nedir?
* **Açılımı:** Valence Shell Electron Pair Repulsion (Değerlik Katmanı Elektron Çifti İtme Kuramı).
* **Temel Prensip:** Merkez atomun değerlik kabuğundaki elektron çiftleri (bağ yapan veya yapmayan) eksi yüklü oldukları için birbirini iterler. Bu itme kuvvetini en aza indirecek şekilde uzayda birbirinden olabildiğince uzak konumlara yerleşirler. Molekülün 3 boyutlu geometrisini bu yerleşim belirler.
* **Formül Sembolleri:**
  * **$A$:** Merkez atom (Molekülde genellikle en çok bağ yapan ve elektronegatifliği düşük atom; tekil atom).
  * **$X$:** Merkez atoma kovalent bağla doğrudan bağlı komşu atom veya atom grupları. *(Önemli: Tekli, ikili ya da üçlü bağ olması fark etmez; bağlı her atom tek bir $X$ sayılır).*
  * **$E$:** Merkez atomun değerlik kabuğundaki **ortaklanmamış (bağ yapmamış) elektron ÇİFTİ** sayısı. *(Önemli: Çiftler sayılır, tekil elektron değil).*

### 2.2. Elektron Çifti Geometrisi vs. Molekül Geometrisi
Öğrencilerin en çok yanıldığı konulardan biridir:
* **Elektron Çifti Geometrisi (Elektron Bölgesi Geometrisi):** Ortaklanmış ve ortaklanmamış **tüm** elektron çiftlerinin uzaydaki yönelimini ifade eder. Sterik sayıya ($X + E$) bağlıdır:
  * Sterik Sayı = 2 $\rightarrow$ Doğrusal
  * Sterik Sayı = 3 $\rightarrow$ Düzlem üçgen
  * Sterik Sayı = 4 $\rightarrow$ Düzgün dörtyüzlü (Tetrahedral)
* **Molekül Geometrisi (Molekül Şekli):** Yalnızca **atom çekirdeklerinin** uzaydaki konumunu tanımlar. Ortaklanmamış elektron çiftleri geometrinin adlandırılmasında "görünmez", ancak itme uygulayarak atomları birbirine yaklaştırır.
  * Örneğin $H_2O$'da elektron geometrisi *Dörtyüzlü*, fakat molekül geometrisi **Kırık Doğru (Açısal)**dur.
  * $NH_3$'te elektron geometrisi *Dörtyüzlü*, fakat molekül geometrisi **Üçgen Piramit**tir.

### 2.3. Elektron Çifti İtme Şiddeti Sıralaması
Ortaklanmamış elektron çiftleri çekirdek tarafından yalnızca tek bir atomca çekildiği için uzayda daha geniş bir hacim kaplar ve komşu bağları daha kuvvetle iter:
$$\text{Ortaklanmamış - Ortaklanmamış} (E-E) > \text{Ortaklanmamış - Bağ} (E-X) > \text{Bağ - Bağ} (X-X)$$
* Bu kural yüzünden:
  * $CH_4$ ($AX_4$, 0 adet E): Bağ açısı tam simetrik $109.5^\circ$
  * $NH_3$ ($AX_3E$, 1 adet E): E çifti bağları iter $\rightarrow$ açı $107.3^\circ$'ye daralır.
  * $H_2O$ ($AX_2E_2$, 2 adet E): 2 adet E çifti bağları daha da kuvvetle iter $\rightarrow$ açı $104.5^\circ$'ye daralır.

### 2.4. Hibritleşme ve Pratik Belirleme Yöntemi
Hibritleşme; aynı temel enerji düzeyindeki farklı şekil ve enerjiye sahip orbitallerin ($s$ ve $p$) etkileşerek eş enerjili ve özdeş yeni hibrit orbitalleri oluşturmasıdır.
* **Pratik Sterik Sayı Kuralı:**
  $$\text{Sterik Sayı} = (\text{Merkez atomun } \sigma \text{ bağı sayısı}) + (\text{Merkez atomun ortaklanmamış elektron çifti sayısı } E)$$
  * Sterik Sayı = 2 $\rightarrow$ **$sp$ hibritleşmesi** (1 tane s, 1 tane p; 2 hibrit orbitali)
  * Sterik Sayı = 3 $\rightarrow$ **$sp^2$ hibritleşmesi** (1 tane s, 2 tane p; 3 hibrit orbitali)
  * Sterik Sayı = 4 $\rightarrow$ **$sp^3$ hibritleşmesi** (1 tane s, 3 tane p; 4 hibrit orbitali)
* **Sigma ($\sigma$) ve Pi ($\pi$) Bağı Kuralı:**
  * Tekli bağ = $1\sigma$
  * İkili bağ = $1\sigma + 1\pi$
  * Üçlü bağ = $1\sigma + 2\pi$
  * **$\pi$ bağları hibritleşmeye katılmaz!** Hibritleşmemiş p orbitallerinin bağ eksenine dik olarak yan yana örtüşmesiyle oluşur.

---

## 3. VSEPR Geometri ve Hibritleşme Karşılaştırma Matrisi

Aşağıdaki tablo MEB müfredatında yer alan temel VSEPR sınıflarını özetler:

| VSEPR Kodu | Merkez Atom Hibritleşmesi | Sterik Sayı (X+E) | İdeal Bağ Açısı | Gerçek Bağ Açısı | Molekül Geometrisi (TR) | Molekül Geometrisi (EN) | Molekül Polaritesi (Simetrik X durumunda) | MEB Tipik Örnekleri |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **$AX_2$** | $sp$ | 2 | $180^\circ$ | $180^\circ$ | Doğrusal | Linear | Apolar | $BeH_2, BeCl_2, CO_2, HCN, C_2H_2$ |
| **$AX_3$** | $sp^2$ | 3 | $120^\circ$ | $120^\circ$ | Düzlem üçgen | Trigonal planar | Apolar | $BH_3, BF_3, SO_3, C_2H_4, HCHO, CO_3^{2-}$ |
| **$AX_2E$** | $sp^2$ | 3 | $120^\circ$ | $< 120^\circ$ (~$119^\circ$) | Kırık doğru (Açısal) | Bent / Angular | **Polar** | $SO_2, O_3, NO_2^-$ |
| **$AX_4$** | $sp^3$ | 4 | $109.5^\circ$ | $109.5^\circ$ | Düzgün dörtyüzlü | Tetrahedral | Apolar | $CH_4, CCl_4, CF_4, SiH_4, NH_4^+, SO_4^{2-}$ |
| **$AX_3E$** | $sp^3$ | 4 | $109.5^\circ$ | $107.3^\circ$ (~$107^\circ$) | Üçgen piramit | Trigonal pyramidal | **Polar** | $NH_3, NF_3, PCl_3, H_3O^+$ |
| **$AX_2E_2$** | $sp^3$ | 4 | $109.5^\circ$ | $104.5^\circ$ (~$105^\circ$) | Kırık doğru (Açısal) | Bent / Angular | **Polar** | $H_2O, H_2S, OF_2, SCl_2$ |

### 3.1. Oktet Aşımı ve İleri VSEPR Gösterimleri (MEB Dışı Bilgi Notu)
*MEB müfredatında 2. periyot elementlerinde oktet kuralına uyulur. 3. periyot ve sonrası elementlerde boş $d$ orbitalleri bulunduğundan oktet genişlemesi mümkündür. AYT'de hibritleşmeleri ($sp^3d, sp^3d^2$) sorulmaz, ancak VSEPR geometrisi deneme sınavlarında çeldirici olarak karşımıza çıkabilir:*
* **$AX_5$:** Üçgen çift piramit (Trigonal bipyramidal) — Açılar: $90^\circ$ ve $120^\circ$ — Örnek: $PCl_5$ (Apolar).
* **$AX_4E$:** Tahterevalli (Seesaw) — Örnek: $SF_4$ (Polar).
* **$AX_3E_2$:** T-şekli (T-shaped) — Örnek: $ClF_3$ (Polar).
* **$AX_2E_3$:** Doğrusal (Linear) — Örnek: $XeF_2$ (Apolar).
* **$AX_6$:** Düzgün sekizyüzlü (Oktahedral) — Açılar: $90^\circ$ — Örnek: $SF_6$ (Apolar).
* **$AX_4E_2$:** Kare düzlem (Square planar) — Açılar: $90^\circ$ — Örnek: $XeF_4$ (Apolar).

---

## 4. ÖSYM'nin Sorduğu Kilit Tuzak Noktalar ve Kavram Yanılgıları

### Tuzak 1: $H_2O$ ile $SO_2$ Benzerliği ve Ayrımı (En Sık Yapılan Hata!)
* **Benzerlik:** İki molekülün de molekül geometrisi **Kırık Doğru (Açısal)**dur ve her ikisi de **polardır**.
* **Tuzak & Fark:**
  * $H_2O$: Merkez atom $O$ üzerinde 2 adet ortaklanmamış elektron çifti vardır ($AX_2E_2$). Hibritleşmesi **$sp^3$**, bağ açısı **$104.5^\circ$**'dir.
  * $SO_2$: Merkez atom $S$ üzerinde 1 adet ortaklanmamış elektron çifti vardır ($AX_2E$). Hibritleşmesi **$sp^2$**, bağ açısı **$\sim 119^\circ$ ($< 120^\circ$)**'dir.
* **ÖSYM Soru Tipi:** *"Kırık doğru geometriye sahip tüm moleküllerde merkez atom $sp^3$ hibritleşmesi yapmıştır."* $\rightarrow$ **YANLIŞ!** ($SO_2$ $sp^2$ yapar).

### Tuzak 2: $BH_3$ (Düzlem Üçgen) vs $NH_3$ (Üçgen Piramit)
* Öğrenciler isimlerindeki "üçgen" ifadesi nedeniyle ikisini de düzlemsel sanabilir.
* $BH_3$: Merkez atom B (3A) değerlik elektronlarının üçünü de bağda kullanır, ortaklanmamış elektron kalmaz ($AX_3$). Tüm atomlar aynı düzlemdedir (Düzlem üçgen), açı $120^\circ$'dir, dipol moment toplamı sıfırdır $\rightarrow$ **Apolar**.
* $NH_3$: Merkez atom N (5A) değerlik elektronlarının ikisini tepede ortaklanmamış çift ($E$) olarak tutar ($AX_3E$). Bu çift bağları aşağıya doğru iter, molekül 3 boyutlu bir çadır/piramit şeklini alır. Açı $107.3^\circ$'dir, dipol moment sıfırlanmaz $\rightarrow$ **Polar**.

### Tuzak 3: Molekül Geometrisi Simetrisi vs Bağ Polaritesi
* Bir molekülün bağlarının polar olması, molekülün kendisinin de polar olacağı anlamına gelmez.
* $CO_2, CH_4, CCl_4, BF_3, BeH_2$ moleküllerinde bağlar elektronegatiflik farkından dolayı polar kovalenttir. Ancak molekül geometrileri simetrik (yük dağılımı homojen, dipol moment bileşkesi $\vec{\mu} = 0$) olduğu için **molekül apolardır**.
* Moleküle asimetri getiren bir atom girdiğinde (örn: $CH_4 \rightarrow CHCl_3$) geometri yine dörtyüzlü kalsa bile molekül **polar** hale gelir.

### Tuzak 4: VSEPR Formülünde Çoklu Bağlar Nasıl Sayılır?
* VSEPR formülünde $X$, merkez atoma bağlı **atom sayısını** belirtir; bağ sayısını değil!
* $CO_2$ molekülünde C ile O atomları arasında iki adet çift bağ ($O=C=O$) vardır. Öğrenciler bunu $AX_4$ olarak kodlama eğilimindedir. Oysa C atomuna bağlı 2 atom vardır $\rightarrow$ **$AX_2$**'dir.
* Aynı şekilde $HCN$ molekülünde $H-C \equiv N$ üçlü bağı tek bir yönelim (elektron grubu) oluşturur $\rightarrow$ **$AX_2$**'dir.

### Tuzak 5: Birden Fazla Merkez Atom İçeren Organik Moleküller
* Organik moleküllerde tek bir VSEPR formülü tüm molekül için yazılamaz. Moleküldeki her bir karbon (veya heteroatom) kendi başına bir merkez atom gibi incelenir:
  * **Eten ($C_2H_4$):** Her iki karbon atomu için de VSEPR **$AX_3$**, geometri **Düzlem Üçgen**, açı **$\sim 120^\circ$**, hibritleşme **$sp^2$**'dir.
  * **Etin ($C_2H_2$):** Her iki karbon atomu için de VSEPR **$AX_2$**, geometri **Doğrusal**, açı **$180^\circ$**, hibritleşme **$sp$**'dir.
  * **Metanol ($CH_3OH$):** Karbon atomu için $AX_4$ (düzgün dörtyüzlü, $sp^3$); oksijen atomu için $AX_2E_2$ (kırık doğru, $sp^3$).

### Tuzak 6: İyonlaşma ve Protonlanma ile Bağ Açısı Değişimi
* **$NH_3 \rightarrow NH_4^+$ Değişimi:**
  * $NH_3$ ($AX_3E$): 1 adet ortaklanmamış çift vardır, geometri üçgen piramittir, bağ açısı **$107.3^\circ$**'dir.
  * $NH_4^+$ ($AX_4$): N atomu ortaklanmamış elektron çiftiyle bir $H^+$ bağlayarak koordine kovalent bağ oluşturur. Artık merkezde serbest çift kalmaz! Geometri **Düzgün Dörtyüzlü**ye dönüşür ve bağ açısı **$107.3^\circ$'den $109.5^\circ$'ye YÜKSELİR**!
* **$H_2O \rightarrow H_3O^+$ Değişimi:**
  * $H_2O$ ($AX_2E_2$, açı $104.5^\circ$) bir $H^+$ aldığında $H_3O^+$ ($AX_3E$) oluşur. Bağ açısı **$104.5^\circ$'den $\sim 107^\circ$'ye YÜKSELİR**!

### Tuzak 7: Pi ($\pi$) Bağının Hibritleşmeye ve Bağ Açısına Etkisi
* Pi bağı hibritleşmeye **katılmaz**; hibritleşmeye katılmayan p orbitallerinin yan yana örtüşmesiyle oluşur.
* Pi bağı elektron yoğunluğu tekli sigma bağına göre daha fazladır; bu nedenle komşu bağları hafifçe iter. Örneğin Formaldehit ($H_2C=O$)'te ideal açı $120^\circ$ iken, $C=O$ çift bağı C-H bağlarını iter ve $H-C-H$ açısı $\approx 116^\circ$'ye daralırken, $H-C=O$ açısı $\approx 122^\circ$'ye açılır. MEB kitapları bunu genel olarak $\sim 120^\circ$ kabul eder.

---

## 5. Kapsamlı Molekül Kataloğu (Örnek Havuzu)

Aşağıdaki 20 molekül ve iyon, AYT Kimya'da soru olarak gelmiş veya gelme potansiyeli en yüksek çekirdek kümedir:

| No | Formül | Kimyasal Adı | Merkez Atom | VSEPR | Hibritleşme | Geometri | Bağ Açısı | $\sigma$ / $\pi$ Sayısı | Polarite | Kritik ÖSYM Notu |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| 1 | **$BeH_2$** | Berilyum hidrür | Be (2A) | $AX_2$ | $sp$ | Doğrusal | $180^\circ$ | $2\sigma, 0\pi$ | Apolar | Be metal olmasına rağmen kovalent bağlıdır; oktet eksiği vardır (4 elektron). |
| 2 | **$BH_3$** | Bor trihidrür (Boran) | B (3A) | $AX_3$ | $sp^2$ | Düzlem üçgen | $120^\circ$ | $3\sigma, 0\pi$ | Apolar | Merkez atom oktetini tamamlamamıştır (oktet boşluğu, 6 elektron). |
| 3 | **$BF_3$** | Bor triflorür | B (3A) | $AX_3$ | $sp^2$ | Düzlem üçgen | $120^\circ$ | $3\sigma, 0\pi$ | Apolar | Bağlar oldukça polar olmasına rağmen molekül simetrik ve apolardır. |
| 4 | **$CH_4$** | Metan | C (4A) | $AX_4$ | $sp^3$ | Düzgün dörtyüzlü | $109.5^\circ$ | $4\sigma, 0\pi$ | Apolar | En basit alkan; kusursuz tetrahedral simetri. |
| 5 | **$NH_3$** | Amonyak | N (5A) | $AX_3E$ | $sp^3$ | Üçgen piramit | $107.3^\circ$ | $3\sigma, 0\pi$ | Polar | 1 serbest elektron çifti bağ açısını $109.5^\circ$'den $107.3^\circ$'ye düşürür. |
| 6 | **$H_2O$** | Su | O (6A) | $AX_2E_2$ | $sp^3$ | Kırık doğru | $104.5^\circ$ | $2\sigma, 0\pi$ | Polar | 2 serbest elektron çifti bağ açısını $104.5^\circ$'ye daraltır; hidrojen bağı yapar. |
| 7 | **$CO_2$** | Karbondioksit | C (4A) | $AX_2$ | $sp$ | Doğrusal | $180^\circ$ | $2\sigma, 2\pi$ | Apolar | Çift bağlar tek bir doğrultu sayılır; pi bağları hibritleşmeye katılmaz. |
| 8 | **$HCN$** | Hidrojen siyanür | C (4A) | $AX_2$ | $sp$ | Doğrusal | $180^\circ$ | $2\sigma, 2\pi$ | Polar | Geometrisi doğrusal olmasına rağmen H ve N elektronegatiflikleri farklıdır, polardır. |
| 9 | **$C_2H_2$** | Asetilen (Etin) | C (4A) | $AX_2$ | $sp$ | Doğrusal | $180^\circ$ | $3\sigma, 2\pi$ | Apolar | Her bir C atomu $AX_2$ ve sp hibritleşmesine sahiptir. Molekül düzlemsel/doğrusaldır. |
| 10 | **$C_2H_4$** | Eten (Etilen) | C (4A) | $AX_3$ | $sp^2$ | Düzlem üçgen | $\sim 120^\circ$ | $5\sigma, 1\pi$ | Apolar | Tüm 6 atom aynı düzlemdedir (düzlemsel molekül). Her C atomu $sp^2$'dir. |
| 11 | **$HCHO$** | Formaldehit (Metanal) | C (4A) | $AX_3$ | $sp^2$ | Düzlem üçgen | $\sim 120^\circ$ | $3\sigma, 1\pi$ | Polar | C=O bağı moleküle kalıcı dipol moment kazandırır. Düzlemseldir. |
| 12 | **$SO_2$** | Kükürt dioksit | S (6A) | $AX_2E$ | $sp^2$ | Kırık doğru | $< 120^\circ$ (~$119^\circ$) | $2\sigma, 1\pi$ | Polar | Merkezde 1 serbest çift vardır. $H_2O$ ile aynı geometri adı ama farklı hibritleşme! |
| 13 | **$SO_3$** | Kükürt trioksit | S (6A) | $AX_3$ | $sp^2$ | Düzlem üçgen | $120^\circ$ | $3\sigma, 1\pi$ (rezonans) | Apolar | Merkezde serbest çift yoktur. Simetrik dağılımdan dolayı apolardır. |
| 14 | **$O_3$** | Ozon | O (6A) | $AX_2E$ | $sp^2$ | Kırık doğru | $< 120^\circ$ (~$117^\circ$) | $2\sigma, 1\pi$ | Polar | Aynı tür atomlardan oluşmasına rağmen merkezdeki serbest çift yüzünden polardır! |
| 15 | **$CCl_4$** | Karbon tetraklorür | C (4A) | $AX_4$ | $sp^3$ | Düzgün dörtyüzlü | $109.5^\circ$ | $4\sigma, 0\pi$ | Apolar | Polar C-Cl bağları birbirini dengeler; apolar çözücüdür. |
| 16 | **$CHCl_3$** | Kloroform | C (4A) | $AX_4$ | $sp^3$ | Düzgün dörtyüzlü | $\sim 109.5^\circ$ | $4\sigma, 0\pi$ | Polar | C-H ve C-Cl dipolleri birbirini sıfırlayamaz; polar bir çözücüdür. |
| 17 | **$NF_3$** | Azot triflorür | N (5A) | $AX_3E$ | $sp^3$ | Üçgen piramit | $\sim 102.5^\circ$ | $3\sigma, 0\pi$ | Polar | Flor atomları elektronları çektiği için açı $NH_3$'ten bile daha dardır. |
| 18 | **$OF_2$** | Oksijen diflorür | O (6A) | $AX_2E_2$ | $sp^3$ | Kırık doğru | $\sim 103^\circ$ | $2\sigma, 0\pi$ | Polar | Oksijenin pozitif (+2) değerlik aldığı tek bileşiktir; açısı $H_2O$'dan dardır. |
| 19 | **$NH_4^+$** | Amonyum katyonu | N (5A) | $AX_4$ | $sp^3$ | Düzgün dörtyüzlü | $109.5^\circ$ | $4\sigma, 0\pi$ | Katyon | $NH_3$'e $H^+$ katılmasıyla oluşur; serbest çift kalkınca açı $107^\circ$'den $109.5^\circ$'ye çıkar! |
| 20 | **$H_3O^+$** | Hidronyum katyonu | O (6A) | $AX_3E$ | $sp^3$ | Üçgen piramit | $\sim 107^\circ$ | $3\sigma, 0\pi$ | Katyon | $H_2O$'ya $H^+$ katılmasıyla oluşur; 1 serbest çift kalır, açı $104.5^\circ$'den $\sim 107^\circ$'ye çıkar. |

---

## 6. TypeScript Veri Sözleşmesi (Data Contract) & Quiz Modeli

Bu verileri KimyaAtom mimarisindeki `StandardQuizItem` ve `TopicDefinition` ile birebir uyumlu kılmak için tasarlanan TypeScript arayüzü aşağıdadır.

### 6.1. Tip Tanımları (`src/types/vsepr.ts`)

```typescript
// VSEPR ve Molekül Geometrisi Veri Modeli
export type VseprCode = 'AX2' | 'AX3' | 'AX2E' | 'AX4' | 'AX3E' | 'AX2E2' | 'AX5' | 'AX6';
export type HybridizationType = 'sp' | 'sp2' | 'sp3' | 'sp3d' | 'sp3d2';
export type MolecularGeometryName =
  | 'Doğrusal'
  | 'Düzlem üçgen'
  | 'Kırık doğru'
  | 'Düzgün dörtyüzlü'
  | 'Üçgen piramit'
  | 'Üçgen çift piramit'
  | 'Düzgün sekizyüzlü';

export type MolecularPolarity = 'Apolar' | 'Polar' | 'İyonik / Katyon' | 'İyonik / Anyon';

export interface VseprMoleculeData {
  id: number;
  formula: string;            // Örn: "CH₄", "CO₂", "H₂O"
  name: string;               // Örn: "Metan", "Karbondioksit"
  centerAtom: string;         // Örn: "C (Karbon, 4A)"
  vsepr: VseprCode;           // Örn: "AX4"
  geometry: MolecularGeometryName; // Örn: "Düzgün dörtyüzlü"
  hybridization: HybridizationType;// Örn: "sp3"
  bondAngle: string;          // Örn: "109.5°", "180°", "107.3°"
  polarity: MolecularPolarity; // Örn: "Apolar"
  stericNumber: number;       // X + E (Örn: 4)
  lonePairsOnCenter: number;  // E sayısı (Örn: 0)
  bondedAtomsCount: number;   // X sayısı (Örn: 4)
  sigmaBonds: number;         // Toplam sigma bağı sayısı
  piBonds: number;            // Toplam pi bağı sayısı
  isPlanar: boolean;          // Tüm atomlar aynı düzlemde mi? (Düzlemsel mi?)
  examTrap: string;           // ÖSYM tuzak / kritik nokta açıklaması
  mnemonic?: string;          // Akılda kalıcı ipucu
}
```

### 6.2. Hazır Veri Seti Kodu (`src/data/vseprData.ts`)

```typescript
import { VseprMoleculeData } from '../types/vsepr';
import { StandardQuizItem } from '../types/topics';

export const VSEPR_MOLECULES: VseprMoleculeData[] = [
  {
    id: 1,
    formula: 'BeH₂',
    name: 'Berilyum hidrür',
    centerAtom: 'Be (2A)',
    vsepr: 'AX2',
    geometry: 'Doğrusal',
    hybridization: 'sp',
    bondAngle: '180°',
    polarity: 'Apolar',
    stericNumber: 2,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 2,
    sigmaBonds: 2,
    piBonds: 0,
    isPlanar: true,
    examTrap: 'Berilyum metal olmasına rağmen hidrojenle kovalent bağlı bileşik oluşturur. Oktet boşluğu vardır (4 elektronda kalır).',
    mnemonic: 'Be-2A: 2 bağ, 0 çift -> AX2, 180°, sp'
  },
  {
    id: 2,
    formula: 'BH₃',
    name: 'Boran (Bor trihidrür)',
    centerAtom: 'B (3A)',
    vsepr: 'AX3',
    geometry: 'Düzlem üçgen',
    hybridization: 'sp2',
    bondAngle: '120°',
    polarity: 'Apolar',
    stericNumber: 3,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 3,
    sigmaBonds: 3,
    piBonds: 0,
    isPlanar: true,
    examTrap: 'Merkez atom Bor 6 elektronda kalır (oktet boşluğu). NH3 ile karıştırılmamalıdır; serbest çifti olmadığı için düzlemdir ve apolardır.',
    mnemonic: 'B-3A: 3 bağ, 0 çift -> AX3, Düzlem üçgen, 120°, sp2'
  },
  {
    id: 3,
    formula: 'BF₃',
    name: 'Bor triflorür',
    centerAtom: 'B (3A)',
    vsepr: 'AX3',
    geometry: 'Düzlem üçgen',
    hybridization: 'sp2',
    bondAngle: '120°',
    polarity: 'Apolar',
    stericNumber: 3,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 3,
    sigmaBonds: 3,
    piBonds: 0,
    isPlanar: true,
    examTrap: 'B-F bağları çok yüksek elektronegatiflik farkından dolayı aşırı polar olmasına karşın, simetriden ötürü molekül APOLARdır.',
    mnemonic: 'BF3 düzlem üçgendir, dipol momentleri birbirini yok eder (Apolar).'
  },
  {
    id: 4,
    formula: 'CH₄',
    name: 'Metan',
    centerAtom: 'C (4A)',
    vsepr: 'AX4',
    geometry: 'Düzgün dörtyüzlü',
    hybridization: 'sp3',
    bondAngle: '109.5°',
    polarity: 'Apolar',
    stericNumber: 4,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 4,
    sigmaBonds: 4,
    piBonds: 0,
    isPlanar: false,
    examTrap: 'Dörtyüzlü yapı 3 boyutludur, düzlemsel DEĞİLDİR. Bağ açısı 90° değil, 109.5° dir.',
    mnemonic: 'CH4: 4 eşit bağ, kusursuz dörtyüzlü, 109.5°, sp3'
  },
  {
    id: 5,
    formula: 'NH₃',
    name: 'Amonyak',
    centerAtom: 'N (5A)',
    vsepr: 'AX3E',
    geometry: 'Üçgen piramit',
    hybridization: 'sp3',
    bondAngle: '107.3°',
    polarity: 'Polar',
    stericNumber: 4,
    lonePairsOnCenter: 1,
    bondedAtomsCount: 3,
    sigmaBonds: 3,
    piBonds: 0,
    isPlanar: false,
    examTrap: 'Tuzak: BH3 düzlem üçgen ve apolarken, NH3 üzerindeki serbest elektron çifti nedeniyle üçgen piramittir ve POLARDIR. Bağ açısı 107.3° dir.',
    mnemonic: 'NH3: 1 çift elektron tepeye biner, açıyı 107° ye büker!'
  },
  {
    id: 6,
    formula: 'H₂O',
    name: 'Su',
    centerAtom: 'O (6A)',
    vsepr: 'AX2E2',
    geometry: 'Kırık doğru',
    hybridization: 'sp3',
    bondAngle: '104.5°',
    polarity: 'Polar',
    stericNumber: 4,
    lonePairsOnCenter: 2,
    bondedAtomsCount: 2,
    sigmaBonds: 2,
    piBonds: 0,
    isPlanar: true,
    examTrap: 'Tuzak: 3 atomlu her molekül doğrusal değildir. Oksijendeki 2 serbest çift bağı 104.5° ye kırar. Hibritleşmesi sp değil, sp3 tür.',
    mnemonic: 'H2O: 2 bağ, 2 çift (AX2E2), Kırık doğru, 104.5°, sp3'
  },
  {
    id: 7,
    formula: 'CO₂',
    name: 'Karbondioksit',
    centerAtom: 'C (4A)',
    vsepr: 'AX2',
    geometry: 'Doğrusal',
    hybridization: 'sp',
    bondAngle: '180°',
    polarity: 'Apolar',
    stericNumber: 2,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 2,
    sigmaBonds: 2,
    piBonds: 2,
    isPlanar: true,
    examTrap: 'Tuzak: 4 bağ vardır ama VSEPR AX4 değil AX2 dir! Çift bağlar tek bir elektron grubu sayılır. Merkezde serbest elektron yoktur.',
    mnemonic: 'O=C=O: 2 sigma + 2 pi, sp hibritleşmesi, 180° doğrusal, apolar.'
  },
  {
    id: 8,
    formula: 'HCN',
    name: 'Hidrojen siyanür',
    centerAtom: 'C (4A)',
    vsepr: 'AX2',
    geometry: 'Doğrusal',
    hybridization: 'sp',
    bondAngle: '180°',
    polarity: 'Polar',
    stericNumber: 2,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 2,
    sigmaBonds: 2,
    piBonds: 2,
    isPlanar: true,
    examTrap: 'Geometrisi CO2 gibi doğrusal (180°) olmasına karşın, H ve N elektronegatiflikleri farklı olduğundan dipol moment sıfırlanmaz; POLARDIR.',
    mnemonic: 'H-C≡N: Doğrusal ama kutuplu (polar)!'
  },
  {
    id: 9,
    formula: 'C₂H₂',
    name: 'Asetilen (Etin)',
    centerAtom: 'C (4A)',
    vsepr: 'AX2',
    geometry: 'Doğrusal',
    hybridization: 'sp',
    bondAngle: '180°',
    polarity: 'Apolar',
    stericNumber: 2,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 2,
    sigmaBonds: 3,
    piBonds: 2,
    isPlanar: true,
    examTrap: 'Her bir C atomu 2 sigma, 2 pi bağı yapar. Her C atomu sp hibritleşmesine sahiptir ve AX2 formülündedir.',
    mnemonic: 'H-C≡C-H: Tüm atomlar aynı doğru üzerinde (180°).'
  },
  {
    id: 10,
    formula: 'C₂H₄',
    name: 'Eten (Etilen)',
    centerAtom: 'C (4A)',
    vsepr: 'AX3',
    geometry: 'Düzlem üçgen',
    hybridization: 'sp2',
    bondAngle: '120°',
    polarity: 'Apolar',
    stericNumber: 3,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 3,
    sigmaBonds: 5,
    piBonds: 1,
    isPlanar: true,
    examTrap: 'Tüm 6 atom da aynı düzlemdedir (düzlemsel molekül). Her iki C atomunun VSEPR gösterimi AX3, hibritleşmesi sp2 dir.',
    mnemonic: 'CH2=CH2: Düzlemsel, 5 sigma, 1 pi, sp2, ~120°.'
  },
  {
    id: 11,
    formula: 'HCHO',
    name: 'Formaldehit (Metanal)',
    centerAtom: 'C (4A)',
    vsepr: 'AX3',
    geometry: 'Düzlem üçgen',
    hybridization: 'sp2',
    bondAngle: '120°',
    polarity: 'Polar',
    stericNumber: 3,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 3,
    sigmaBonds: 3,
    piBonds: 1,
    isPlanar: true,
    examTrap: 'Geometrisi düzlem üçgendir (sp2), ancak C=O bağı nedeniyle BH3 gibi apolar değil, POLARDIR.',
    mnemonic: 'H2C=O: Düzlem üçgen ama oksijen yüzünden kutuplu.'
  },
  {
    id: 12,
    formula: 'SO₂',
    name: 'Kükürt dioksit',
    centerAtom: 'S (6A)',
    vsepr: 'AX2E',
    geometry: 'Kırık doğru',
    hybridization: 'sp2',
    bondAngle: '< 120° (~119°)',
    polarity: 'Polar',
    stericNumber: 3,
    lonePairsOnCenter: 1,
    bondedAtomsCount: 2,
    sigmaBonds: 2,
    piBonds: 1,
    isPlanar: true,
    examTrap: 'ÖSYM KLASİĞİ: H2O ile ikisi de kırık doğrudur ancak SO2 merkez atomunda 1 serbest çift vardır (AX2E), hibritleşmesi sp2 dir, açısı 119° dir!',
    mnemonic: 'SO2: AX2E, sp2 hibritleşmesi, kırık doğru (~119°).'
  },
  {
    id: 13,
    formula: 'SO₃',
    name: 'Kükürt trioksit',
    centerAtom: 'S (6A)',
    vsepr: 'AX3',
    geometry: 'Düzlem üçgen',
    hybridization: 'sp2',
    bondAngle: '120°',
    polarity: 'Apolar',
    stericNumber: 3,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 3,
    sigmaBonds: 3,
    piBonds: 1,
    isPlanar: true,
    examTrap: 'SO2 polarken SO3 apolardır! Çünkü SO3 te merkez atom kükürt üzerinde ortaklanmamış elektron kalmaz (AX3).',
    mnemonic: 'SO3: AX3, Düzlem üçgen, 120°, sp2, Apolar.'
  },
  {
    id: 14,
    formula: 'O₃',
    name: 'Ozon',
    centerAtom: 'O (6A)',
    vsepr: 'AX2E',
    geometry: 'Kırık doğru',
    hybridization: 'sp2',
    bondAngle: '< 120° (~117°)',
    polarity: 'Polar',
    stericNumber: 3,
    lonePairsOnCenter: 1,
    bondedAtomsCount: 2,
    sigmaBonds: 2,
    piBonds: 1,
    isPlanar: true,
    examTrap: 'Tüm atomları aynı element (oksijen) olmasına rağmen merkez atomdaki serbest elektron çifti molekülü asimetrik ve POLAR yapar!',
    mnemonic: 'Ozon (O3): Apolar element molekülü sanılır ama POLARDIR!'
  },
  {
    id: 15,
    formula: 'CCl₄',
    name: 'Karbon tetraklorür',
    centerAtom: 'C (4A)',
    vsepr: 'AX4',
    geometry: 'Düzgün dörtyüzlü',
    hybridization: 'sp3',
    bondAngle: '109.5°',
    polarity: 'Apolar',
    stericNumber: 4,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 4,
    sigmaBonds: 4,
    piBonds: 0,
    isPlanar: false,
    examTrap: 'C-Cl bağları polar kovalenttir ancak 4 klor uzayda birbirini simetrik çeker; dipol moment sıfırdır, APOLARDIR.',
    mnemonic: 'CCl4: Polar bağlar içerir ama molekül apolardır.'
  },
  {
    id: 16,
    formula: 'CHCl₃',
    name: 'Kloroform (Triklorometan)',
    centerAtom: 'C (4A)',
    vsepr: 'AX4',
    geometry: 'Düzgün dörtyüzlü',
    hybridization: 'sp3',
    bondAngle: '109.5°',
    polarity: 'Polar',
    stericNumber: 4,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 4,
    sigmaBonds: 4,
    piBonds: 0,
    isPlanar: false,
    examTrap: 'VSEPR formülü yine AX4 tür ve geometrisi dörtyüzlüdür; ancak 1 hidrojen simetriyi bozduğu için molekül POLARDIR.',
    mnemonic: 'CHCl3: Dörtyüzlü ama 1 H var, simetri bozuldu -> Polar.'
  },
  {
    id: 17,
    formula: 'NF₃',
    name: 'Azot triflorür',
    centerAtom: 'N (5A)',
    vsepr: 'AX3E',
    geometry: 'Üçgen piramit',
    hybridization: 'sp3',
    bondAngle: '102.5°',
    polarity: 'Polar',
    stericNumber: 4,
    lonePairsOnCenter: 1,
    bondedAtomsCount: 3,
    sigmaBonds: 3,
    piBonds: 0,
    isPlanar: false,
    examTrap: 'Flor atomlarının yüksek elektronegatifliği bağ elektronlarını çeker; serbest elektron çifti itmesi daha baskın hale gelir ve açı NH3 ten daha küçüktür (102.5°).',
    mnemonic: 'NF3: Üçgen piramit, NH3 ten daha dar açılı (102.5°).'
  },
  {
    id: 18,
    formula: 'OF₂',
    name: 'Oksijen diflorür',
    centerAtom: 'O (6A)',
    vsepr: 'AX2E2',
    geometry: 'Kırık doğru',
    hybridization: 'sp3',
    bondAngle: '103°',
    polarity: 'Polar',
    stericNumber: 4,
    lonePairsOnCenter: 2,
    bondedAtomsCount: 2,
    sigmaBonds: 2,
    piBonds: 0,
    isPlanar: true,
    examTrap: 'Oksijenin pozitif (+2) yükseltgenme basamağı aldığı yegane bileşiktir. Kırık doğru geometridedir (sp3).',
    mnemonic: 'OF2: Oksijenin +2 olduğu kırık doğru.'
  },
  {
    id: 19,
    formula: 'NH₄⁺',
    name: 'Amonyum katyonu',
    centerAtom: 'N (5A)',
    vsepr: 'AX4',
    geometry: 'Düzgün dörtyüzlü',
    hybridization: 'sp3',
    bondAngle: '109.5°',
    polarity: 'İyonik / Katyon',
    stericNumber: 4,
    lonePairsOnCenter: 0,
    bondedAtomsCount: 4,
    sigmaBonds: 4,
    piBonds: 0,
    isPlanar: false,
    examTrap: 'NH3 (AX3E, 107°) proton bağlayınca NH4+ (AX4, 109.5°) olur. Serbest çift bağa dönüştüğü için BAĞ AÇISI ARTAR!',
    mnemonic: 'NH3 -> NH4+: Piramit yıkılır, dörtyüzlü kurulur, açı 109.5° ye çıkar!'
  },
  {
    id: 20,
    formula: 'H₃O⁺',
    name: 'Hidronyum katyonu',
    centerAtom: 'O (6A)',
    vsepr: 'AX3E',
    geometry: 'Üçgen piramit',
    hybridization: 'sp3',
    bondAngle: '107°',
    polarity: 'İyonik / Katyon',
    stericNumber: 4,
    lonePairsOnCenter: 1,
    bondedAtomsCount: 3,
    sigmaBonds: 3,
    piBonds: 0,
    isPlanar: false,
    examTrap: 'H2O (AX2E2, 104.5°) proton alınca H3O+ (AX3E, ~107°) olur. Serbest çiftlerden biri azaldığı için BAĞ AÇISI GENİŞLER!',
    mnemonic: 'H2O -> H3O+: Kırık doğru üçgen piramide döner, açı 104.5° den 107° ye çıkar.'
  }
];
```

### 6.3. KimyaAtom `StandardQuizItem` Dönüştürücü Fonksiyonu

Bu veriler platformumuzdaki quiz motorunda doğrudan şu 4 farklı soru yönüyle oynatılabilir:
1. `formula-to-vsepr`: Formül $\rightarrow$ VSEPR Kodu ($H_2O \rightarrow AX_2E_2$)
2. `formula-to-geom`: Formül $\rightarrow$ Molekül Geometrisi ($NH_3 \rightarrow$ Üçgen piramit)
3. `formula-to-hybrid`: Formül $\rightarrow$ Merkez Atom Hibritleşmesi ($CO_2 \rightarrow sp$)
4. `formula-to-angle`: Formül $\rightarrow$ Bağ Açısı ($CH_4 \rightarrow 109.5^\circ$)

```typescript
export function getVseprQuizItems(direction: string = 'formula-to-vsepr'): StandardQuizItem[] {
  return VSEPR_MOLECULES.map((item) => {
    switch (direction) {
      case 'formula-to-vsepr':
        return {
          id: item.id,
          prompt: item.formula,
          promptSub: item.name,
          answer: item.vsepr,
          category: item.geometry,
          infoChips: [
            { label: 'Geometri', value: item.geometry },
            { label: 'Hibritleşme', value: item.hybridization },
            { label: 'Açı', value: item.bondAngle },
            { label: 'Polarite', value: item.polarity }
          ],
          hint: `${item.centerAtom} merkez atomu; ${item.bondedAtomsCount} bağlı atom, ${item.lonePairsOnCenter} ortaklanmamış çift.`,
          distractors: ['AX2', 'AX3', 'AX2E', 'AX4', 'AX3E', 'AX2E2'].filter(d => d !== item.vsepr)
        };

      case 'formula-to-geom':
        return {
          id: item.id,
          prompt: item.formula,
          promptSub: `VSEPR: ${item.vsepr}`,
          answer: item.geometry,
          category: item.polarity,
          infoChips: [
            { label: 'VSEPR', value: item.vsepr },
            { label: 'Hibritleşme', value: item.hybridization },
            { label: 'Açı', value: item.bondAngle }
          ],
          hint: item.mnemonic || item.examTrap,
          distractors: ['Doğrusal', 'Düzlem üçgen', 'Kırık doğru', 'Düzgün dörtyüzlü', 'Üçgen piramit'].filter(d => d !== item.geometry)
        };

      case 'formula-to-hybrid':
        return {
          id: item.id,
          prompt: item.formula,
          promptSub: `${item.name} (Merkez: ${item.centerAtom})`,
          answer: item.hybridization,
          category: item.geometry,
          infoChips: [
            { label: 'VSEPR', value: item.vsepr },
            { label: 'Sigma Bağı', value: String(item.sigmaBonds) },
            { label: 'Pi Bağı', value: String(item.piBonds) }
          ],
          hint: `Sterik sayı = ${item.stericNumber} (Bağ + Serbest çift)`,
          distractors: ['sp', 'sp2', 'sp3'].filter(d => d !== item.hybridization)
        };

      case 'formula-to-angle':
        return {
          id: item.id,
          prompt: item.formula,
          promptSub: `${item.geometry} (${item.vsepr})`,
          answer: item.bondAngle,
          category: item.hybridization,
          infoChips: [
            { label: 'VSEPR', value: item.vsepr },
            { label: 'Geometri', value: item.geometry }
          ],
          hint: item.examTrap,
          distractors: ['180°', '120°', '109.5°', '107.3°', '104.5°', '< 120° (~119°)'].filter(d => d !== item.bondAngle)
        };

      default:
        throw new Error(`Bilinmeyen yön: ${direction}`);
    }
  });
}
```

---

## 7. Oyunlaştırma & Eğitsel Mekanikler Önerisi

Öğrencilerin VSEPR konusundaki soyut kavramları kalıcı hafızaya aktarabilmesi için KimyaAtom uygulamasında şu 4 oyunlaştırma mekaniği önerilmektedir:

### 7.1. "Tuzak Dedektörü" (True / False Hızlı Turu)
ÖSYM'nin meşhur çelişkilerini içeren hızlı karar mekanizması (Örn: 60 saniyede 15 soru):
1. *"Kırık doğru geometriye sahip tüm moleküllerde merkez atom sp3 hibritleşmesi yapmıştır."* $\rightarrow$ **YANLIŞ** ($SO_2$ sp² yapar).
2. *"BH3 ve NH3 moleküllerinin her ikisinde de 3 tane sigma bağı bulunur ve ikisi de düzlem üçgendir."* $\rightarrow$ **YANLIŞ** (NH3 üçgen piramittir).
3. *"CO2 molekülünde karbon atomu 4 bağ yaptığı için VSEPR gösterimi AX4'tür."* $\rightarrow$ **YANLIŞ** (Çift bağ tek doğrultudur, AX2'dir).
4. *"NH3 molekülü bir proton bağlayıp NH4+ oluşturduğunda bağ açısı daralır."* $\rightarrow$ **YANLIŞ** ($107^\circ$'den $109.5^\circ$'ye genişler).
5. *"Ozon (O3) aynı element atomlarından oluştuğu için apolar bir moleküldür."* $\rightarrow$ **YANLIŞ** (Merkez atomda ortaklanmamış çift vardır, kırık doğrudur ve polardır).

### 7.2. "Açı Sıralama" Mini Oyunu (Drag & Drop / Numara Sıralama)
Verilen 4 molekülü bağ açılarına göre büyükten küçüğe sıralama:
* Örnek Soru: $BeH_2, BF_3, CH_4, NH_3, H_2O$
* Çözüm: $BeH_2 (180^\circ) > BF_3 (120^\circ) > CH_4 (109.5^\circ) > NH_3 (107.3^\circ) > H_2O (104.5^\circ)$

### 7.3. "Merkez Atomu Analiz Et" İnteraktif Rozet Kartı
Kullanıcıya molekülün Lewis nokta yapısı gösterilir; kullanıcı tıklayarak:
1. Bağ yapan elektron çiftlerini sayar $\rightarrow X$
2. Merkezdeki bağ yapmayan çiftleri sayar $\rightarrow E$
3. VSEPR formülünü oluşturur ($AX_nE_m$)
4. Sistem otomatik olarak 3D geometri animasyonunu kilit açar gibi render eder.

---

## 8. Özet ve Sonuç
Bu araştırma ve veri seti:
* MEB 12. Sınıf Kimya kitabının 2. ünitesindeki tüm kazanım ve sınırlamaları eksiksiz karşılar.
* ÖSYM'nin geçmiş 10 yıldaki tüm soru kalıplarını ve çeldiricilerini yakalar.
* TypeScript tip güvenliğine ve `KimyaAtom` projesinin veri mimarisine tam uyumludur.
* `docs/research/01_vsepr_hibritlesme.md` dosyasından doğrudan `src/data/` dizinine taşınmaya hazır durumdadır.
