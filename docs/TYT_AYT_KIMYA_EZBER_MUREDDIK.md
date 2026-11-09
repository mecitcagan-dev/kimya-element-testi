# TYT ve AYT Kimya Müfredatı Kapsamlı Ezber Konuları, Veri Setleri ve Oyunlaştırma Analizi
**MEB & ÖSYM Standartlarına Uygun Kapsamlı Başvuru Kaynağı**

---

## 1. Giriş ve Metodoloji

Kimya dersinde özellikle YKS (TYT ve AYT) sınavlarında öğrencilerin sıklıkla zorlandığı veya hata yaptığı alanların başında **doğrudan ezber gerektiren olgusal bilgiler (factual knowledge)** gelir. MEB 9, 10, 11 ve 12. sınıf Kimya Dersi Öğretim Programı ile ÖSYM'nin son 10 yıldaki sınav soruları analiz edildiğinde, her yıl TYT Kimya'da en az 3-4 soru, AYT Kimya'da ise en az 4-5 sorunun doğrudan bu ezber tablolarına dayandığı görülmektedir.

### Öğrenme ve Bellek Prensipleri
1. **Aktif Hatırlama (Active Recall):** Pasif okuma yerine, kartın bir yüzünü görüp diğerini zihinden çağırma refleksi oluşturur.
2. **Aralıklı Tekrar (Spaced Repetition):** Leitner veya SM-2 algoritması ile öğrencinin hata yaptığı terimleri sık, doğru bildiklerini seyreltilmiş aralıklarla sorma.
3. **Çift Kodlama (Dual Coding):** Formül/Metin ile Renk/Piktogram/Yapı görselinin eşleştirilmesi.
4. **Akıllı Çeldirici (Smart Distractors):** Sınavda öğrencilerin karıştırdığı benzer kavramları (örn: $Na_2CO_3$ ile $NaHCO_3$, $MnO_4^-$ ile $MnO_4^{2-}$) bilerek seçenek olarak sunarak kavram yanılgılarını önceden giderme.

---

## 2. Kategori 1: TYT + AYT (Ortak Temel Konular)

### 2.1. Konu Kodu: `TYT_AYT_ELEM_36` — İlk 36 Element
- **Kategori:** TYT + AYT
- **Kazanım:** MEB 9. Sınıf Ünite 1 (Kimya Bilimi) & Ünite 2 (Atom ve Periyodik Sistem), MEB 11. Sınıf Ünite 1 (Modern Atom Teorisi).
- **ÖSYM Önemi:** TYT'de periyodik özellikler ve adlandırma, AYT'de elektron dizilimi ($s, p, d$ blokları, uyarılma, küresel simetri) için istisnasız her yıl sorulur.

#### Soru Mantığı & Mekanikler:
1. `Sembol -> Ad`: $Cr \rightarrow$ Krom (Çeldiriciler: Kobalt, Klor, Karbon)
2. `Ad -> Sembol`: Fosfor $\rightarrow$ P (Çeldiriciler: F, K, Po)
3. `Atom Numarası (Z) -> Periyot & Grup`: $Z = 24 \rightarrow$ 4. Periyot, 6B grubu ($[Ar] 4s^1 3d^5$)
4. `Element -> Sınıf`: $B \rightarrow$ Yarı Metal; $Na \rightarrow$ Alkali Metal; $Fe \rightarrow$ Geçiş Metali; $Br \rightarrow$ Halojen

#### Veri Seti (İlk 36 Element Tam Liste):
| Z | Sembol | Türkçe Ad | Alternatif/Latince Ad | Periyot | Grup (MEB / IUPAC) | Sınıf | Blok |
|---|---|---|---|---|---|---|---|
| 1 | H | Hidrojen | Hydrogen | 1 | 1A (Grup 1) | Ametal | s |
| 2 | He | Helyum | Helium | 1 | 8A (Grup 18) | Soy Gaz | s |
| 3 | Li | Lityum | Lithium | 2 | 1A (Grup 1) | Alkali Metal | s |
| 4 | Be | Berilyum | Beryllium | 2 | 2A (Grup 2) | Toprak Alkali Metal | s |
| 5 | B | Bor | Boron | 2 | 3A (Grup 13) | Yarı Metal | p |
| 6 | C | Karbon | Carbon | 2 | 4A (Grup 14) | Ametal | p |
| 7 | N | Azot | Nitrojen | 2 | 5A (Grup 15) | Ametal | p |
| 8 | O | Oksijen | Oxygen | 2 | 6A (Grup 16) | Ametal | p |
| 9 | F | Flor | Fluorine | 2 | 7A (Grup 17) | Halojen | p |
| 10 | Ne | Neon | Neon | 2 | 8A (Grup 18) | Soy Gaz | p |
| 11 | Na | Sodyum | Natriyum | 3 | 1A (Grup 1) | Alkali Metal | s |
| 12 | Mg | Magnezyum | Magnesium | 3 | 2A (Grup 2) | Toprak Alkali Metal | s |
| 13 | Al | Alüminyum | Aluminium | 3 | 3A (Grup 13) | Post-Geçiş Metali | p |
| 14 | Si | Silisyum | Silikon | 3 | 4A (Grup 14) | Yarı Metal | p |
| 15 | P | Fosfor | Phosphorus | 3 | 5A (Grup 15) | Ametal | p |
| 16 | S | Kükürt | Sulfur | 3 | 6A (Grup 16) | Ametal | p |
| 17 | Cl | Klor | Chlorine | 3 | 7A (Grup 17) | Halojen | p |
| 18 | Ar | Argon | Argon | 3 | 8A (Grup 18) | Soy Gaz | p |
| 19 | K | Potasyum | Kalyum | 4 | 1A (Grup 1) | Alkali Metal | s |
| 20 | Ca | Kalsiyum | Calcium | 4 | 2A (Grup 2) | Toprak Alkali Metal | s |
| 21 | Sc | Skandiyum | Scandium | 4 | 3B (Grup 3) | Geçiş Metali | d |
| 22 | Ti | Titanyum | Titanium | 4 | 4B (Grup 4) | Geçiş Metali | d |
| 23 | V | Vanadyum | Vanadium | 4 | 5B (Grup 5) | Geçiş Metali | d |
| 24 | Cr | Krom | Chromium | 4 | 6B (Grup 6) | Geçiş Metali | d |
| 25 | Mn | Mangan | Manganez | 4 | 7B (Grup 7) | Geçiş Metali | d |
| 26 | Fe | Demir | Ferrum | 4 | 8B (Grup 8) | Geçiş Metali | d |
| 27 | Co | Kobalt | Cobalt | 4 | 8B (Grup 9) | Geçiş Metali | d |
| 28 | Ni | Nikel | Nickel | 4 | 8B (Grup 10) | Geçiş Metali | d |
| 29 | Cu | Bakır | Cuprum | 4 | 1B (Grup 11) | Geçiş Metali | d |
| 30 | Zn | Çinko | Zincum | 4 | 2B (Grup 12) | Geçiş Metali | d |
| 31 | Ga | Galyum | Gallium | 4 | 3A (Grup 13) | Post-Geçiş Metali | p |
| 32 | Ge | Germanyum | Germanium | 4 | 4A (Grup 14) | Yarı Metal | p |
| 33 | As | Arsenik | Arsenic | 4 | 5A (Grup 15) | Yarı Metal | p |
| 34 | Se | Selenyum | Selenium | 4 | 6A (Grup 16) | Ametal | p |
| 35 | Br | Brom | Bromine | 4 | 7A (Grup 17) | Halojen | p |
| 36 | Kr | Kripton | Krypton | 4 | 8A (Grup 18) | Soy Gaz | p |

---

### 2.2. Konu Kodu: `TYT_AYT_COMP_COMMON` — Yaygın Bileşikler (Geleneksel & Sistematik Adlar)
- **Kategori:** TYT + AYT
- **Kazanım:** MEB 9. Sınıf Ünite 1 (Kimya Bilimi - Yaygın Bileşikler Tablosu).
- **ÖSYM Önemi:** TYT 1. soru olarak en çok sorulan konulardan biridir. MEB müfredatında yer alan 23 yaygın bileşiğin formülü, yaygın adı ve türü birebir test edilir.

#### Soru Mantığı & Mekanikler:
1. `Formül -> Yaygın Ad`: $HNO_3 \rightarrow$ Kezzap; $NaHCO_3 \rightarrow$ Yemek sodası
2. `Yaygın Ad -> Formül`: Zaç yağı $\rightarrow H_2SO_4$; Sud kostik $\rightarrow NaOH$
3. `Bileşik -> Kimyasal Tür`: $CaO \rightarrow$ Oksit / Bazik Oksit; $CaCO_3 \rightarrow$ Tuz; $CH_3COOH \rightarrow$ Asit
4. `Kritik Çeldirici İkilileri`:
   - $Na_2CO_3$ (Çamaşır sodası) $\leftrightarrow NaHCO_3$ (Yemek sodası)
   - $CaO$ (Sönmemiş kireç) $\leftrightarrow Ca(OH)_2$ (Sönmüş kireç) $\leftrightarrow CaCO_3$ (Kireç taşı)
   - $NaOH$ (Sud kostik) $\leftrightarrow KOH$ (Potas kostik)
   - $HNO_3$ (Kezzap) $\leftrightarrow HCl$ (Tuz ruhu) $\leftrightarrow H_2SO_4$ (Zaç yağı)

#### Veri Seti (MEB Standart Yaygın Bileşikler Listesi):
| No | Formül | Yaygın (Geleneksel) Adı | Sistematik (IUPAC) Adı | Türü | Kullanım Alanı / Not |
|---|---|---|---|---|---|
| 1 | H2O | Su | Dihidrojen monoksit | Nötr Oksit | Evrensel çözücü |
| 2 | HCl | Tuz ruhu | Hidrojen klorür / Hidroklorik asit | Asit | Temizlik, pas giderme, mide asidi |
| 3 | H2SO4 | Zaç yağı | Sülfürik asit | Asit | Akü asidi, gübre sanayi |
| 4 | HNO3 | Kezzap | Nitrik asit | Asit | Dinamit (patlayıcı), gübre üretimi |
| 5 | CH3COOH | Sirke ruhu / Sirke asidi | Etanoik asit / Asetik asit | Asit | Gıda, kireç çözücü |
| 6 | HCOOH | Karınca asidi | Metanoik asit / Formik asit | Asit | Dericilik, tekstil, karınca salgısı |
| 7 | NH3 | Amonyak | Trihidrojen mononitrür | Baz | Susuz baz (gübre, temizlik maddesi) |
| 8 | NaOH | Sud kostik | Sodyum hidroksit | Baz | Beyaz sabun yapımı, lavabo açıcı |
| 9 | KOH | Potas kostik | Potasyum hidroksit | Baz | Arap sabunu yapımı, piller |
| 10 | CaO | Sönmemiş kireç | Kalsiyum oksit | Bazik Oksit | İnşaat, çimento üretimi |
| 11 | Ca(OH)2 | Sönmüş kireç | Kalsiyum hidroksit | Baz | Harç yapımı, badana |
| 12 | CaCO3 | Kireç taşı | Kalsiyum karbonat | Tuz | Tebeşir, mermer ana maddesi |
| 13 | NaCl | Sofra tuzu / Yemek tuzu | Sodyum klorür | Tuz | Gıda koruma, serum fizyolojik |
| 14 | Na2CO3 | Çamaşır sodası | Sodyum karbonat | Tuz | Su sertliği giderme, cam sanayi |
| 15 | NaHCO3 | Yemek sodası / Kabartma tozu | Sodyum bikarbonat (hidrojen karbonat)| Tuz | Hamur kabartma, antiasit |
| 16 | KNO3 | Güherçile | Potasyum nitrat | Tuz | Kara barut, havai fişek, gübre |
| 17 | CuSO4 | Göztaşı | Bakır(II) sülfat | Tuz | Tarım ilacı (fungisit), havuz dezenfeksiyonu |
| 18 | FeSO4 | Kıbrıs taşı / Kara boya | Demir(II) sülfat | Tuz | Boya üretimi, mürekkep yapımı |
| 19 | NH4Cl | Nişadır | Amonyum klorür | Tuz | Lehimcilik, kuru pil üretimi |
| 20 | NaOCl | Çamaşır suyu | Sodyum hipoklorit | Tuz | Dezenfektan, ağartıcı |
| 21 | CaOCl2 | Kireç kaymağı | Kalsiyum hipoklorit klorür | Tuz | Havuz dezenfektanı, ağartıcı |
| 22 | KAl(SO4)2·12H2O | Şap | Potasyum alüminyum sülfat | Çift Tuz | Kan durdurucu, su arıtma |
| 23 | CaSO4·2H2O | Alçı taşı (Jips) | Kalsiyum sülfat dihidrat | Tuz | Ortopedik alçı, yapı malzemesi |

---

### 2.3. Konu Kodu: `TYT_AYT_POLY_IONS` — Çok Atomlu İyonlar / Kökler
- **Kategori:** TYT + AYT
- **Kazanım:** MEB 9. Sınıf Ünite 3 (Kimyasal Türler Arası Etkileşimler - İyonik Adlandırma), MEB 11. Sınıf Ünite 1 (Yükseltgenme Basamakları & Redoks).
- **ÖSYM Önemi:** TYT'de iyonik bileşik formülü yazma ve okuma; AYT'de redoks tepkimelerini denkleştirme ve yükseltgenme basamağı bulmada temel taştır.

#### Soru Mantığı & Mekanikler:
1. `Kök Sembolü -> Ad & Yük`: $SO_4^{2-} \rightarrow$ Sülfat (-2)
2. `Ad -> Kök Sembolü & Yük`: Dikromat $\rightarrow Cr_2O_7^{2-}$; Permanganat $\rightarrow MnO_4^-$
3. `Anyon/Katyon Eşleştirme`: Aşağıdakilerden hangisi çok atomlu bir katyondur? $\rightarrow NH_4^+$
4. `Tuz Formülü Yazma / Çaprazlama`: $Al^{3+}$ ve $SO_4^{2-} \rightarrow Al_2(SO_4)_3$

#### Veri Seti (MEB Kök İyonlar Tam Liste):
##### Katyonlar (+):
| Formül | Adı | Yük | Kritik Not |
|---|---|---|---|
| NH4+ | Amonyum | +1 | TYT'de en çok sorulan katyon köküdür |
| H3O+ | Hidronyum | +1 | Asitliğin göstergesi olan iyon |
| Hg2^2+ | Cıva(I) | +2 | Dimerik katyon (özel durum) |

##### Anyonlar (-1):
| Formül | Adı | Yük | Kritik Not / Çeldirici İpucu |
|---|---|---|---|
| OH- | Hidroksit | -1 | Bazların karakteristik iyonu |
| CN- | Siyanür | -1 | Toksik kök |
| SCN- | Tiyosiyanat | -1 | Kan kırmızı $Fe(SCN)^{2+}$ kompleksi verir |
| NO3- | Nitrat | -1 | $NO_2^-$ (Nitrit) ile karıştırılmamalı |
| NO2- | Nitrit | -1 | Oksijeni az olan "-it" ekini alır |
| MnO4- | Permanganat | -1 | Mn yükseltgenme basamağı +7; Koyu mor renk |
| ClO- | Hipoklorit | -1 | Çamaşır suyu kökü ($NaOCl$) |
| ClO2- | Klorit | -1 | Cl basamağı +3 |
| ClO3- | Klorat | -1 | Cl basamağı +5 ($KClO_3$) |
| ClO4- | Perklorat | -1 | Cl basamağı +7 |
| CH3COO- | Asetat | -1 | Organik asit kökü ($C_2H_3O_2^-$ olarak da yazılır) |
| HCOO- | Format | -1 | Formik asit anyonu |
| HCO3- | Bikarbonat (Hidrojen karbonat) | -1 | $CO_3^{2-}$'nin 1 $H^+$ almış hali |
| HSO4- | Bisülfat (Hidrojen sülfat) | -1 | $SO_4^{2-}$'nin 1 $H^+$ almış hali |
| H2PO4- | Dihidrojen fosfat | -1 | $PO_4^{3-}$'nin 2 $H^+$ almış hali |

##### Anyonlar (-2):
| Formül | Adı | Yük | Kritik Not / Çeldirici İpucu |
|---|---|---|---|
| SO4^2- | Sülfat | -2 | $SO_3^{2-}$ (Sülfit) ile karıştırılmamalı |
| SO3^2- | Sülfit | -2 | Kükürt +4 basamağında |
| S2O3^2- | Tiyosülfat | -2 | İyot titrasyonlarında kullanılır |
| CO3^2- | Karbonat | -2 | Asitlerle $CO_2$ gazı çıkarır |
| CrO4^2- | Kromat | -2 | Sarı renkli, Cr basamağı +6 |
| Cr2O7^2- | Dikromat | -2 | Turuncu renkli, Cr basamağı +6 |
| MnO4^2- | Manganat | -2 | Yeşil renkli; $MnO_4^-$ Permanganat ile karıştırılır! |
| HPO4^2- | Monohidrojen fosfat | -2 | $PO_4^{3-}$'nin 1 $H^+$ almış hali |
| C2O4^2- | Oksalat | -2 | Okzalik asit anyonu |
| O2^2- | Peroksit | -2 | Her oksijen -1 değerliklidir ($H_2O_2, Na_2O_2$) |

##### Anyonlar (-3):
| Formül | Adı | Yük | Kritik Not / Çeldirici İpucu |
|---|---|---|---|
| PO4^3- | Fosfat | -3 | Gübre sanayinde ana kök |
| PO3^3- | Fosfit | -3 | Oksijeni az olan "-it" türevi |

---

### 2.4. Konu Kodu: `TYT_AYT_SAFETY_PIC` — Kimya Güvenlik Piktogramları
- **Kategori:** TYT + AYT
- **Kazanım:** MEB 9. Sınıf Ünite 1 (İş Sağlığı ve Güvenliği).
- **ÖSYM Önemi:** TYT Kimya Bilimi konusunda düzenli aralıklarla sorulan garantili net konusudur.

#### Soru Mantığı & Mekanikler:
1. `Piktogram Görseli -> Tehlike Adı`: Kuru kafa görseli $\rightarrow$ Toksik (Zehirli)
2. `Tehlike Adı -> Güvenlik Önlemi`: Korozif madde $\rightarrow$ Cilde ve göze temasından kaçınılmalı, koruyucu eldiven ve gözlük takılmalı.
3. `Ayırt Edici Özellik Eşleştirme`: Alev ortasında "O" harfi $\rightarrow$ Yakıcı (Oksitleyici); Yalnızca alev $\rightarrow$ Yanıcı.

#### Veri Seti (GHS Standardı 9 Temel Piktogram):
| Kod | Piktogram Adı | Görsel Açıklaması | Taşıdığı Tehlike ve Anlamı | Tipik Kimyasal Örnekleri | Alınması Gereken Güvenlik Önlemleri |
|---|---|---|---|---|---|
| PIC_YAN | **Yanıcı (Flammable)** | Doğrudan parlayan alev sembolü | Kolay tutuşabilen, alev alan sıvı/gaz/katı | Alkol, eter, benzen, asetilen, tiner | Ateşten, kıvılcımdan ve güneş ışığından uzak tutulmalı. |
| PIC_YAK | **Yakıcı / Oksitleyici (Oxidizing)** | Üzerinde alev bulunan bir daire ("O" harfi) | Başka maddelerin yanmasını tetikleyen, oksijen sağlayan | Oksijen tüpleri, $H_2O_2$, $KMnO_4$, nitratlar | Yanıcı maddelerle kesinlikle bir arada depolanmamalıdır. |
| PIC_KOR | **Korozif / Aşındırıcı (Corrosive)** | Metal levha ve el üzerine damlayan kimyasal tüp | Canlı dokuları tahrip eden, metalleri aşındıran | $H_2SO_4$, $HCl$, $NaOH$, derişik asit ve bazlar | Koruyucu giysi, önlük, gözlük ve eldiven kullanılmalıdır. |
| PIC_TOK | **Toksik / Zehirli (Toxic)** | Kuru kafa ve çapraz iki kemik | Ağız, solunum veya cilt yoluyla ölüme/zehirlenmeye yol açan | Siyanürler, cıva, karbonmonoksit, arsenik | Çeker ocakta çalışılmalı, buharı solunmamalı, eldiven takılmalı. |
| PIC_TAH | **Tahriş Edici / Zararlı (Irritant)** | Kalın ünlem işareti (!) | Cilt, göz ve solunum yollarında kızarıklık, alerji yapan | Çamaşır suyu, etil alkol seyreltikleri, kalsiyum klorür | Cilde temas ettirilmemeli, buharı doğrudan koklanmamalıdır. |
| PIC_CEV | **Çevreye Zararlı / Ekotoksik (Environmental Hazard)**| Yapraksız kurumuş ağaç ve ters dönmüş ölü balık | Su ve kara ekosisteminde canlılara uzun süreli toksisite | Ağır metaller ($Pb, Hg$), pestisitler, klorlu solventler | Doğrudan lavaboya/çöpe dökülmemeli, atık bidonlarında toplanmalıdır. |
| PIC_PAT | **Patlayıcı (Explosive)** | Parçalanarak patlayan bomba | Kıvılcım, ısı, sürtünme veya darbe ile aniden patlayabilen | TNT, nitrogliserin, pikrik asit, kuru peroksitler | Isıdan, darbeden, sürtünmeden kesinlikle korunmalıdır. |
| PIC_RAD | **Radyoaktif (Radioactive)** | Üç yapraklı sarı-siyah yonca (Trefoil) | Canlı hücrelerde mutasyona ve DNA hasarına yol açan ışıma yayan | Uranyum, toryum, radyum, tıbbi radyoizotoplar | Kurşun yelek/zırh kullanılmalı, özel işaretli alanlara girilmemelidir. |
| PIC_SAG | **Ciddi Sağlık Tehlikesi / Kanserojen (Health Hazard)**| İnsan göğsünde patlayan yıldız silüeti | Kanserojen, mutajen, üreme sağlığını bozan veya organ hasarı yapan | Benzen, asbest, formaldehit, kloroform | Buharı kesinlikle solunmamalı, tam koruyucu maske ve çeker ocak. |

---

## 3. Kategori 2: TYT (Temel Yeterlilik Odaklı Konular)

### 3.1. Konu Kodu: `TYT_LAB_EQUIP` — Laboratuvar Malzemeleri ve Kullanım Amaçları
- **Kategori:** TYT
- **Kazanım:** MEB 9. Sınıf Ünite 1 (Kimya Bilimi - Laboratuvarda Kullanılan Temel Araç ve Gereçler).
- **ÖSYM Önemi:** TYT 2018, 2021 ve 2023 sınavlarında birebir soru olarak sorulmuştur. Malzemelerin resimleri veya kullanım amaçları eşleştirilir.

#### Soru Mantığı & Mekanikler:
1. `Görsel / Şekil -> Malzeme Adı`: İnce uzun boyunlu, armut gövdeli, tek çizgili cam kap $\rightarrow$ Balon joje
2. `Kullanım Amacı -> Malzeme Adı`: "Titrasyon işlemlerinde büretten damlatılan sıvının altına konulan ve çalkalama kolaylığı sağlayan konik cam kap" $\rightarrow$ Erlenmayer
3. `Hassasiyet Karşılaştırması`: Mezür (kaba hacim) $\leftrightarrow$ Pipet/Büret/Balon joje (hassas hacim)
4. `Ayırma İşlemi Eşleştirmesi`: Heterojen sıvı-sıvı (yoğunluk farkı) $\rightarrow$ Ayırma hunisi

#### Veri Seti (18 MEB Laboratuvar Malzemesi):
| Kod | Malzeme Adı | Şekil ve Fiziksel Tanımı | Temel Kullanım Amacı | Hassasiyet / Kritik MEB İpucu |
|---|---|---|---|---|
| LAB_01 | **Beherglas (Beher)** | Silindirik, düz dipli, ağız kısmında oluk bulunan geniş cam kap | Çözelti hazırlama, maddeleri karıştırma, aktarma, ısıtma ve kristallendirme | Hacim ölçümünde hassas değildir; genel laboratuvar kabıdır. |
| LAB_02 | **Erlenmayer (Erlen)** | Konik gövdeli, tabanı düz, dar boyunlu cam kap | Titrasyon işlemlerinde çözeltiyi çalkalamak, kaynatmak ve saklamak | Dar boynu sayesinde sıvı sıçramasını önler; titrasyonda vazgeçilmezdir. |
| LAB_03 | **Dereceli Silindir (Mezür)** | Üzerinde mililitre bölmeleri bulunan uzun cam silindir | Sıvıların hacmini kabaca ölçmek ve bir kaptan diğerine aktarmak | Hacim ölçer ancak hassas değildir (titrasyonda kullanılmaz). |
| LAB_04 | **Balon Joje** | Boynu çok uzun ve ince, tabanı düz, üzerinde tek kalibrasyon çizgisi olan balon | **Belirli derişimde çok hassas çözelti hazırlamak** ve saklamak | Çözelti hazırlamada en yüksek hassasiyete sahip cam malzemedir. |
| LAB_05 | **Cam Balon** | Gövdesi yuvarlak (küresel), boynu silindirik cam kap | Çözelti hazırlama, ısıtma, kaynatma, geri soğutucuyla damıtma | Isıya dayanıklıdır; homojen kaynama sağlar. |
| LAB_06 | **Büret** | Altında musluğu bulunan, üzerinde mililitre taksimatı olan uzun ince cam boru | **Titrasyonda** harcanan çözeltinin hacmini **çok hassas** ölçerek damla damla ilave etmek | Titrasyonun ana ölçüm aletidir. |
| LAB_07 | **Pipet** | Üzerinde hacim çizgileri bulunan çok ince cam boru (puar ile çekilir) | Çok az miktardaki sıvıları **çok hassas** ölçmek ve başka kaba aktarmak | Ağızla çekilmez, mutlaka puar (lastik emici) ile kullanılır. |
| LAB_08 | **Ayırma Hunisi** | Altında musluk, üstünde kapak bulunan armut biçimli cam kap | **Birbiriyle karışmayan sıvı-sıvı heterojen karışımları (zeytinyağı-su)** yoğunluk farkıyla ayırmak | Musluk açılarak alttaki yoğun sıvı ilk önce ayrılır. |
| LAB_09 | **Soğutucu (Liebig Soğutucu)** | İç içe geçmiş iki cam borudan oluşan, dışından soğuk su dolaştırılan alet | Basit ve ayrımsal damıtma düzeneklerinde buharlaşan gazı yoğunlaştırmak | Dış kılıfındaki su girişi alttan, çıkışı üsttendir. |
| LAB_10 | **Termometre** | İçinde cıva veya renkli alkol bulunan dereceli kılcal boru | Tepkime ortamının veya çözeltinin sıcaklığını ölçmek | Reaksiyon kinetiği ve hal değişimlerinde sıcaklık takibi. |
| LAB_11 | **Huni** | Üstü geniş, altı ince boru şeklinde konik cam/plastik araç | Dar boyunlu kaplara sıvı doldurmak ve süzgeç kağıdı ile süzme yapmak | Katı-sıvı heterojen karışımları süzmede kullanılır. |
| LAB_12 | **Havan ve Tokmak** | İçi çukur porselen/cam kase ve ezme tokmağı | Katı maddeleri ezmek, öğütmek ve ince toz haline getirmek | Reaksiyon hızını artırmak için temas yüzeyini artırır. |
| LAB_13 | **Kroze** | Porselenden veya platinden yapılmış küçük derin fincan benzeri kap | Yüksek sıcaklıklarda (fırında) kül etme, yakma ve kalsinasyon işlemleri | 1000°C üzerindeki sıcaklıklara dayanabilir. |
| LAB_14 | **Spatül** | Metal, porselen veya plastikten kaşık/bıçak şeklinde alet | Toz veya küçük parçalı katı kimyasalları şişelerden almak ve tartmak | Elle kimyasal almayı önlemek için kullanılır. |
| LAB_15 | **Saat Camı** | İçi hafif çukur, dairesel pürüzsüz cam disk | Az miktardaki katıların tartımı, buharlaştırılması veya üzerinin kapatılması | Beher üzerini tozdan korumada da kullanılır. |
| LAB_16 | **Baget** | İki ucu yuvarlatılmış dolu cam çubuk | Çözeltileri ve karışımları manuel olarak karıştırmak | Sıvı aktarırken sıvıyı yönlendirmek için de kullanılır. |
| LAB_17 | **Sacayak ve Amyant Tel** | Üç ayaklı demir sehpa ve ortasında seramik/amyant bulunan tel | Isıtma sırasında beheri taşımak ve alevin ısısını homojen yaymak | Doğrudan alevin camı patlatmasını önler. |
| LAB_18 | **Deney Tüpü** | Bir ucu kapalı, dar uzun silindirik cam kap | Az miktardaki maddelerle reaksiyonları gözlemlemek ve test etmek | Tüp maşası ile tutularak hafifçe ısıtılabilir. |

---

### 3.2. Konu Kodu: `TYT_INDICATORS` — Asit-Baz İndikatörleri ve Renkleri
- **Kategori:** TYT (ve AYT Asit-Baz Dengesi)
- **Kazanım:** MEB 10. Sınıf Ünite 3 (Asitler, Bazlar ve Tuzlar - İndikatörler).
- **ÖSYM Önemi:** TYT'de çözelti türünü belirleme sorularında, AYT'de titrasyon dönüm noktası (eşdeğerlik noktası) tespitinde doğrudan sorulur.

#### Soru Mantığı & Mekanikler:
1. `İndikatör + Çözelti Ortamı -> Renk`: Fenolftalein + $NaOH$ (Baz) $\rightarrow$ Pembe
2. `Renk Değişimi -> Çözelti Karakteri`: Turnusol kağıdını maviye çeviren çözelti $\rightarrow$ Bazik ($pH > 7$)
3. `Doğal İndikatörler`: Kırmızı lahana suyuna limon suyu damlatıldığında $\rightarrow$ Kırmızı/Pembe

#### Veri Seti (MEB Standart İndikatörler Listesi):
| İndikatör Adı | Asidik Ortam Rengi ($pH < 7$) | Nötr Ortam Rengi ($pH = 7$) | Bazik Ortam Rengi ($pH > 7$) | Dönüm Aralığı (Yaklaşık pH) | Kritik Sınav İpucu |
|---|---|---|---|---|---|
| **Turnusol** | **Kırmızı** | Mor | **Mavi** | 4.5 – 8.3 | "Asit kızartır, baz morartır (mavileştirir)" tekerlemesi |
| **Fenolftalein** | **Renksiz** | **Renksiz** | **Pembe / Fuşya** | 8.2 – 10.0 | Asitte renk vermez; bazda net pembe olur (titrasyonda çok popüler) |
| **Metil Oranj** | **Kırmızı** | Turuncu | **Sarı** | 3.1 – 4.4 | Asit ortamda kırmızı, bazda sarıdır |
| **Bromtimol Mavisi** | **Sarı** | Yeşil | **Mavi** | 6.0 – 7.6 | Nötr noktada yeşil renk veren indikatör |
| **Alizarin Sarısı** | Sarı | Sarı | **Kırmızı-Eflatun** | 10.2 – 12.0 | Kuvvetli bazik ortamları test etmek için |
| **Kırmızı Lahana Suyu (Doğal)** | **Kırmızı / Açık Pembe** | Mor | **Yeşil / Sarı** | Doğal indikatör | Asitle kırmızılaşır, çamaşır sodasıyla yeşile/sarıya döner |
| **Çay (Doğal)** | **Açık Sarı** | Kehribar / Kahve | **Koyu Kahverengi / Kırmızı**| Doğal indikatör | Limon sıkılınca renginin açılması asit indikatörü olmasındandır |
| **Ortanca Çiçeği (Doğal)** | **Mavi Çiçek** | Açık Eflatun | **Pembe Çiçek** | Toprak pH'sı | Asidik toprakta mavi, bazik toprakta pembe açar |

---

### 3.3. Konu Kodu: `TYT_ALCHEMY_HIST` — Simyacılar ve Katkıları
- **Kategori:** TYT
- **Kazanım:** MEB 9. Sınıf Ünite 1 (Kimya Bilimi - Simyadan Kimyaya Geçiş).
- **ÖSYM Önemi:** TYT Kimya'nın 1. sorusunda simyacı-kimyacı ayrımı veya simyacıların keşifleri periyodik olarak sorulmaktadır.

#### Soru Mantığı & Mekanikler:
1. `Bilim İnsanı -> Eser / Keşif`: "İmbik aletini geliştiren ve kral suyunu bulan simyacı kimdir?" $\rightarrow$ Cabir bin Hayyan
2. `Keşif -> Bilim İnsanı`: "Karıncaları damıtarak formik asidi elde eden kimdir?" $\rightarrow$ Ebubekir er-Razi
3. `Teori -> Düşünür`: Dört element (ateş, hava, su, toprak) ve dört özellik (sıcak, soğuk, ıslak, kuru) eşleştirmesi $\rightarrow$ Aristo
4. `Simyacı vs Kimyacı Ayrımı`: Robert Boyle ve Lavoisier modern kimyacı; Cabir ve Razi simyacı kabul edilir.

#### Veri Seti (7 Önemli Tarihi Şahsiyet):
| Şahsiyet Adı | Dönemi & Niteliği | Temel Felsefesi / Teorisi | Kimyaya Kazandırdığı Maddeler ve Araçlar | Kritik Eseri / MEB Sınav Vurgusu |
|---|---|---|---|---|
| **Empedokles** | M.Ö. 490–430 (Yunan Düşünür) | Maddenin **4 temel ögeden** (Toprak, Ateş, Hava, Su) oluştuğunu ilk öne süren kişidir. | Maddeleri bir arada tutan gücün **sevgi**, ayıran gücün ise **nefret** olduğunu söylemiştir. | İlk element teorisyenidir. |
| **Democritus** | M.Ö. 460–370 (Yunan Düşünür) | Maddelerin bölünemeyen en küçük yapı taşlarına **"Atomos" (Atom)** adını vermiştir. | Maddelerin farklı özellik göstermesinin nedenini atomların şekil ve diziliş farkına bağlamıştır. | Atom kavramını tarihte ilk kullanan kişidir. |
| **Aristo (Aristoteles)**| M.Ö. 384–322 (Yunan Filozofu) | 4 Elementin 4 özellikle eşleştiğini savunmuştur: <br>• **Ateş:** Sıcak + Kuru <br>• **Hava:** Sıcak + Islak <br>• **Su:** Soğuk + Islak <br>• **Toprak:** Soğuk + Kuru | Orta Çağ boyunca kabul gören element anlayışını oluşturmuştur. | Bu döngü ve çapraz özellikler MEB testlerinde sıkça şema olarak sorulur. |
| **Cabir bin Hayyan** | 721–815 (İslam Dünyası - Kimyanın Babası) | Deneye ve laboratuvar çalışmalarına büyük önem vermiştir. | **İmbik (damıtma aracı)** geliştirmiştir. <br>**Kezzap ($HNO_3$)**, **Zaç yağı ($H_2SO_4$)**, **Tuz ruhu ($HCl$)**, **Kral suyu ($HNO_3 + 3HCl$)**, sitrik asit, asetik asit keşfetti. | İmbik ve Kral suyunun mucidi olarak sorulur. |
| **Ebubekir er-Razi** | 865–925 (İslam Hekim ve Bilgini) | Maddeleri bitkisel, hayvansal ve mineral olarak sınıflandırmıştır. | Karıncaları damıtarak **karınca asidini (formik asit, $HCOOH$)** elde etti. <br>Tıpta **antiseptik olarak etil alkolü** kullandı. <br>**Kostik soda ($NaOH$)**, gliserin, kroze ve fırın geliştirdi. | Karınca asidi ve kostik sodayı bulan hekim-simyacı olarak sorulur. |
| **Robert Boyle** | 1627–1691 (Modern Kimyaya Geçiş) | **Elementin ilk modern/operasyonel tanımı:** "Bilinen hiçbir yöntemle kendinden daha basit maddelere ayrılamayan saf madde". | Gazların basınç-hacim ilişkisini açıkladı (**Boyle Yasası**: $P \cdot V = \text{sabit}$). | **"Kuşkucu Kimyager" (The Sceptical Chymist)** kitabını yazarak Aristo'nun 4 element teorisini yıktı. |
| **Antoine Lavoisier** | 1743–1794 (Modern Kimyanın Öncüsü) | **Kütlenin Korunumu Kanunu**'nu hassas terazi deneyleriyle kanıtlamıştır. | Yanma olayının "flogiston" (ateş ruhu) ile değil, havadaki **oksijen gazı** ile tepkime olduğunu ispatladı. | Teraziyi sistematik nicel deneylerde kullanarak **Simya çağını kapatıp Modern Kimya çağını başlatan** bilim insanıdır. |

---

## 4. Kategori 3: AYT (Alan Yeterlilik Odaklı Konular)

### 4.1. Konu Kodu: `AYT_VAR_VALENCE` — Değişken Değerlikli Metaller ve Yükseltgenme Basamakları
- **Kategori:** AYT
- **Kazanım:** MEB 11. Sınıf Ünite 1 (Modern Atom Teorisi) & Ünite 6 (Kimya ve Elektrik - Redoks).
- **ÖSYM Önemi:** AYT'de redoks denkleştirme, elektrokimya aktiflik sıralaması ve bileşik adlandırmasında istisnasız her yıl kullanılır.

#### Soru Mantığı & Mekanikler:
1. `Bileşik Formülü -> Metalin Basamağı`: $Fe_2O_3 \rightarrow$ Demir(III); $Cu_2O \rightarrow$ Bakır(I); $PbO_2 \rightarrow$ Kurşun(IV)
2. `Değişken vs Sabit Değerlikli Ayrımı`: "Hangisinin adlandırılmasında Romen rakamı kullanılmaz?" $\rightarrow ZnCl_2$ (Çinko klorür, Romen rakamı yazılmaz çünkü Zn sadece +2 alır).
3. `Mangan ve Krom Özel Basamakları`: $KMnO_4 \rightarrow Mn^{+7}$; $K_2Cr_2O_7 \rightarrow Cr^{+6}$

#### Veri Seti:
##### Değişken Değerlikli Metaller (Romen Rakamı Zorunlu Olanlar):
| Sembol | Metal Adı | Aldığı Değerlikler (Yükseltgenme Basamakları) | Örnek Bileşikler ve Okunuşları |
|---|---|---|---|
| **Fe** | Demir | **+2, +3** | $FeO$: Demir(II) oksit <br>$Fe_2O_3$: Demir(III) oksit <br>$FeCl_2$: Demir(II) klorür |
| **Cu** | Bakır | **+1, +2** | $Cu_2O$: Bakır(I) oksit <br>$CuO$: Bakır(II) oksit <br>$CuSO_4$: Bakır(II) sülfat |
| **Hg** | Cıva | **+1, +2** | $Hg_2Cl_2$: Cıva(I) klorür <br>$HgCl_2$: Cıva(II) klorür |
| **Sn** | Kalay | **+2, +4** | $SnCl_2$: Kalay(II) klorür <br>$SnO_2$: Kalay(IV) oksit |
| **Pb** | Kurşun | **+2, +4** | $PbO$: Kurşun(II) oksit <br>$PbO_2$: Kurşun(IV) oksit <br>$Pb(NO_3)_2$: Kurşun(II) nitrat |
| **Cr** | Krom | **+2, +3, +6** | $Cr_2O_3$: Krom(III) oksit <br>$CrO_4^{2-}$ (Kromat): Cr(+6) <br>$Cr_2O_7^{2-}$ (Dikromat): Cr(+6) |
| **Mn** | Mangan | **+2, +3, +4, +6, +7** | $MnCl_2$: Mangan(II) klorür <br>$MnO_2$: Mangan(IV) oksit <br>$MnO_4^-$: Permanganat (+7) |
| **Co** | Kobalt | **+2, +3** | $CoCl_2$: Kobalt(II) klorür |
| **Ni** | Nikel | **+2, +3** (genelde +2) | $NiO$: Nikel(II) oksit |
| **Au** | Altın | **+1, +3** | $AuCl_3$: Altın(III) klorür |
| **Pt** | Platin | **+2, +4** | $PtCl_4$: Platin(IV) klorür |

##### Sınavda Çeldirici Olan Sabit Değerlikli Metaller (Romen Rakamı ASLA Kullanılmaz):
| Sembol | Metal Adı | Sabit Değerliği | Kritik Not / Tuzak Uyarısı |
|---|---|---|---|
| **Zn** | Çinko | **Sadece +2** | Geçiş metali olmasına rağmen tek değerliklidir! "Çinko(II) klorür" YANLIŞTIR, doğrusu "Çinko klorür"dür. |
| **Ag** | Gümüş | **Sadece +1** | Geçiş metali olmasına rağmen tek değerliklidir! "Gümüş(I) nitrat" YANLIŞTIR, doğrusu "Gümüş nitrat"tır. |
| **Al** | Alüminyum | **Sadece +3** | 3A grubu post-geçiş metalidir. Sadece +3 alır. |
| **Li, Na, K** | Alkali Metaller | **Sadece +1** | 1A grubu metalleri her zaman +1 alır. |
| **Mg, Ca, Ba** | Toprak Alkali Metaller | **Sadece +2** | 2A grubu metalleri her zaman +2 alır. |
| **Sc** | Skandiyum | **Sadece +3** | 3B grubunda tek kararlı değerliği +3'tür. |

---

### 4.2. Konu Kodu: `AYT_FUNC_GROUPS` — Organik Kimya Fonksiyonel Grupları
- **Kategori:** AYT
- **Kazanım:** MEB 12. Sınıf Ünite 2 (Karbon Kimyasına Giriş) & Ünite 3 (Organik Bileşikler).
- **ÖSYM Önemi:** AYT Kimya'da 13 sorunun 3-4 tanesi Organik Kimya'dan gelir. Fonksiyonel gruplar bu soruların omurgasıdır.

#### Soru Mantığı & Mekanikler:
1. `Fonksiyonel Grup Yapısı -> Bileşik Sınıfı`: $-C(=O)H \rightarrow$ Aldehit; $-C(=O)OH \rightarrow$ Karboksilik asit
2. `Bileşik Sınıfı -> İsimlendirme Eki`: Keton $\rightarrow$-on; Ester $\rightarrow$-oat; Alkol $\rightarrow$-ol; Alkin $\rightarrow$-in
3. `Genel Formül Eşleştirmesi`: Monoalkoller ve Eterler $\rightarrow C_n H_{2n+2}O$; Aldehitler ve Ketonlar $\rightarrow C_n H_{2n}O$

#### Veri Seti (13 Kritik Organik Fonksiyonel Grup):
| Bileşik Sınıfı | Fonksiyonel Grup Adı | Fonksiyonel Grup Yapısı | Genel Formül (Alifatik Doymuş) | Adlandırma Son Eki (IUPAC) | Tipik Örnek & Yapısı |
|---|---|---|---|---|---|
| **Alkan** | Tekli bağ ($C-C$) | $-C-C-$ | $C_n H_{2n+2}$ | -an | Etan ($CH_3-CH_3$) |
| **Alken** | İkili bağ ($C=C$) | $-C=C-$ | $C_n H_{2n}$ | -en (-ilen) | Eten / Etilen ($CH_2=CH_2$) |
| **Alkin** | Üçlü bağ ($C\equiv C$) | $-C\equiv C-$ | $C_n H_{2n-2}$ | -in | Etin / Asetilen ($CH\equiv CH$) |
| **Alkil Halojenür**| Halojen atomu | $R-X$ ($X=F, Cl, Br, I$) | $C_n H_{2n+1}X$ | halo- / -ür | Kloroetan ($CH_3CH_2Cl$) |
| **Alkol** | Hidroksil grubu | $R-OH$ | $C_n H_{2n+2}O$ | -ol | Etanol ($CH_3CH_2OH$) |
| **Eter** | Alkoksi / Eter bağı | $R-O-R'$ | $C_n H_{2n+2}O$ | -eter / alkoksi- | Dimetil eter ($CH_3OCH_3$) |
| **Aldehit** | Karbonil (uca bağlı H ile)| $R-CHO$ / $R-C(=O)H$ | $C_n H_{2n}O$ | -al | Etanal / Asetaldehit ($CH_3CHO$) |
| **Keton** | Karbonil (içte iki R arası)| $R-CO-R'$ / $R-C(=O)R'$ | $C_n H_{2n}O$ | -on | Propanon / Aseton ($CH_3COCH_3$)|
| **Karboksilik Asit**| Karboksil grubu | $R-COOH$ / $R-C(=O)OH$ | $C_n H_{2n}O_2$ | -oik asit | Etanoik asit / Asetik asit ($CH_3COOH$) |
| **Ester** | Karboksialkil / Ester bağı| $R-COO-R'$ | $C_n H_{2n}O_2$ | -oat | Metil etanoat ($CH_3COOCH_3$) |
| **Amin** | Amino grubu | $R-NH_2, R_2NH, R_3N$| $C_n H_{2n+3}N$ | -amin | Metilamin ($CH_3NH_2$) |
| **Amit** | Karboksiamit grubu | $R-CONH_2$ | $C_n H_{2n+1}NO$ | -amit | Etanamit / Asetamit ($CH_3CONH_2$)|
| **Aromatik (Aren)** | Benzen halkası / Fenil | Ar-H / $C_6H_5-$ | $C_6H_6$ türevleri | -benzen | Benzen, Toluen, Fenil klorür |

---

### 4.3. Konu Kodu: `AYT_ORG_COMMON` — Yaygın Organik Bileşikler ve Özel Adları
- **Kategori:** AYT
- **Kazanım:** MEB 12. Sınıf Organik Bileşikler (Kullanım Alanları ve Özel Adlandırmalar).
- **ÖSYM Önemi:** AYT Organik Kimya sorularında bileşikler çoğu zaman IUPAC adıyla değil, yaygın/özel adlarıyla verilir (örn: "Aseton ile ilgili...", "Toluen bileşiği...", "Asetilen gazı...").

#### Soru Mantığı & Mekanikler:
1. `Özel Ad -> Formül & Sınıf`: Aseton $\rightarrow CH_3COCH_3$ (Keton)
2. `Özel Ad -> Kritik Özellik`: Metanol $\rightarrow$ Körlük yapan, odun ruhu olarak bilinen alkol
3. `Aromatik Türevleri Ayırt Etme`: Benzen halkasına $-CH_3$ bağlı $\rightarrow$ Toluen; $-OH$ bağlı $\rightarrow$ Fenol (zayıf asit); $-NH_2$ bağlı $\rightarrow$ Anilin (zayıf baz)

#### Veri Seti (21 Kritik Organik Bileşik):
| No | Formül | Yaygın / Özel Adı | IUPAC Adı | Sınıfı | Kritik Özellik / MEB-ÖSYM Sınav Bilgisi |
|---|---|---|---|---|---|
| 1 | CH4 | **Metan (Bataklık gazı)** | Metan | Alkan | Doğal gazın (LNG) %90'dan fazlasını oluşturur; sera gazıdır. |
| 2 | C2H4 (CH2=CH2) | **Etilen** | Eten | Alken | Meyvelerin olgunlaşmasını sağlayan bitkisel hormon; polietilen plastiğinin monomeridir. |
| 3 | C2H2 (CH≡CH) | **Asetilen** | Etin | Alkin | Oksi-asetilen kaynağında yüksek ısı verir; karpitin ($CaC_2$) suyla tepkimesinden üretilir. |
| 4 | CH3OH | **Metil alkol / Odun ruhu** | Metanol | Alkol | Sahte içkilerde körlüğe ve ölüme yol açan zehirli alkoldür. |
| 5 | C2H5OH | **Etil alkol** | Etanol | Alkol | Şekerin mayalanmasıyla elde edilir; dezenfektan, kolonya ve biyoyakıt (biyoetanol) olarak kullanılır. |
| 6 | CH2OH-CH2OH | **Glikol** | 1,2-Etandiol | Diol (Alkol) | Otomobil radyatörlerinde **antifriz** olarak kullanılır; kaynama noktasını yükseltir, donmayı düşürür. |
| 7 | CH2OH-CHOH-CH2OH | **Gliserin (Gliserol)** | 1,2,3-Propantriol | Triol (Alkol) | Kozmetik nemlendirici, şuruplar ve dinamit yapımında (nitrogliserin) kullanılır. |
| 8 | C2H5-O-C2H5 | **Dietil eter (Lokman ruhu)**| Etoksietan | Eter | Tıpta kullanılan ilk genel anestezik (bayıltıcı) maddedir; çok uçucu ve yanıcıdır. |
| 9 | HCHO | **Formaldehit** | Metanal | Aldehit | En küçük aldehittir; %37'lik sulu çözeltisi (**formalin**) kadavra ve biyolojik numune koruyucudur. |
| 10 | CH3CHO | **Asetaldehit** | Etanal | Aldehit | Yeşil elma kokusundadır; vücutta alkol yıkımının ilk toksik ara ürünüdür. |
| 11 | CH3COCH3 | **Aseton** | Propanon | Keton | En küçük ketondur; harika bir çözücüdür, oje çıkarıcı olarak kullanılır. |
| 12 | HCOOH | **Formik asit (Karınca asidi)**| Metanoik asit | Karboksilik Asit| Karınca salgısı ve ısırgan otunda bulunur; **yapısında hem aldehit hem karboksil grubu** taşır (Tollens'e etki eder!). |
| 13 | CH3COOH | **Asetik asit (Sirke asidi)** | Etanoik asit | Karboksilik Asit| Sirkeye ekşi tadını ve kokusunu verir; sanayide yaygın çözücüdür. |
| 14 | C6H5COOH | **Benzoik asit** | Benzenkarboksilik asit| Karboksilik Asit| Gıdalarda küf ve bakteri önleyici koruyucu katkı maddesidir (E210). |
| 15 | HOOC-COOH (H2C2O4)| **Okzalik asit** | Etandioik asit | Dikarboksilik Asit| Kuzukulağı bitkisinde bulunur, pas giderici olarak kullanılır. |
| 16 | C7H6O3 | **Salisilik asit** | 2-Hidroksibenzoik asit| Karboksilik Asit/Fenol| Söğüt ağacı kabuğundan elde edilir; **Aspirin (Asetilsalisilik asit)** hammaddesidir. |
| 17 | C6H6 | **Benzen** | Benzen | Aromatik Hidrokarbon | Kekulé rezonans yapısına sahiptir; aromatiklerin atasıdır, kanserojendir. |
| 18 | C6H5-CH3 | **Toluen** | Metilbenzen | Aromatik Hidrokarbon | Boya inceltici (tiner) ve patlayıcı yapımında (**TNT: Trinitrotoluen**) kullanılır. |
| 19 | C6H5-OH | **Fenol** | Hidroksibenzen | Aromatik Alkol/Fenol | **Alkol DEĞİLDİR, zayıf asit özelliği gösterir!** Antiseptik (karbolik asit) ve plastik sanayinde kullanılır. |
| 20 | C6H5-NH2 | **Anilin** | Aminobenzen | Aromatik Amin | **Zayıf baz özelliği gösterir!** Kumaş boyar maddesi (mürekkep/tekstil) üretiminde ana maddedir. |
| 21 | C10H8 | **Naftalin** | Bisiklo aromatik | Aromatik Hidrokarbon | İki benzen halkasının kaynaşmasıyla oluşur; oda sıcaklığında **doğrudan süblimleşir**, güve kovucudur. |

---

## 5. Oyunlaştırma (Gamification) & Öğrenci Faydası Analiz Raporu

### 5.1. Oyunlaştırma Mekanikleri Mimarisi

Öğrencilerin ezber zorluğunu "oyun akışı" (flow state) içerisine alarak aşabilmesi için 4 temel mekanik tasarlanmalıdır:

```
                    ┌──────────────────────────────┐
                    │     Kullanıcı Girişi / UI    │
                    └──────────────┬───────────────┘
                                   │
               ┌───────────────────┴───────────────────┐
               ▼                                       ▼
    ┌──────────────────────┐               ┌──────────────────────┐
    │  1. Flashcard Modu   │               │ 2. Çoktan Seçmeli Q  │
    │  (Öğrenme & Tarama)  │               │ (Sınav Simülasyonu)  │
    └──────────┬───────────┘               └──────────┬───────────┘
               │                                       │
               └───────────────────┬───────────────────┘
                                   ▼
                    ┌──────────────────────────────┐
                    │   Akıllı Çeldirici Motoru    │
                    │   (Benzer formül & isimler)  │
                    └──────────────┬───────────────┘
                                   ▼
                    ┌──────────────────────────────┐
                    │    Leitner Spaced Engine     │
                    │   (Hata takip & tekrar döng.) │
                    └──────────────┬───────────────┘
                                   ▼
                    ┌──────────────────────────────┐
                    │     Öğrenci Başarı Analitiği │
                    │   (% Zayıf / Güçlü Konular)  │
                    └──────────────────────────────┘
```

#### Modlar ve Klavye Mekanikleri:
1. **Flashcard / Flip Modu:**
   - Kartın ön yüzü: Formül / Piktogram / Malzeme Görseli
   - Tuş: `Space` (Kartı çevir) $\rightarrow$ Arka yüzde ad, özellikler ve kullanım alanı.
   - Değerlendirme Tuşları: `1` (Zorlandım), `2` (İyi), `3` (Çok Kolay).
2. **Hızlı Çoktan Seçmeli Test (4-Şık):**
   - Tuşlar: `1, 2, 3, 4` veya `Q, W, E, R`.
   - Klavye el pozisyonundan hiç ayrılmadan 1 dakikada 15-20 soru çözülebilir.
   - **Ters Çevrilebilir Soru Yönü:**
     - *Formül $\rightarrow$ Ad* (Örn: $HNO_3 \rightarrow$ Kezzap)
     - *Ad $\rightarrow$ Formül* (Örn: Kezzap $\rightarrow HNO_3$)
     - *İşlev $\rightarrow$ Malzeme/Piktogram* (Örn: Hassas çözelti $\rightarrow$ Balon Joje)

### 5.2. Akıllı Çeldirici (Smart Distractor) Stratejileri

Rastgele şık üretmek yerine kimya pedagojisine uygun çeldirici matrisi kullanılmalıdır:
- **Formül Benzerliği Kuralı:** Eğer soru $NaHCO_3$ (Yemek sodası) ise, seçeneklerde MUTLAKA $Na_2CO_3$ (Çamaşır sodası) bulunmalıdır.
- **Kireç Bileşikleri Kuralı:** $CaO$, $Ca(OH)_2$ ve $CaCO_3$ birbirinin daimi çeldiricisi olmalıdır.
- **Kök Yükü Kuralı:** $SO_4^{2-}$ sorulduğunda $SO_3^{2-}$, $S^{2-}$ ve $HSO_4^-$ seçeneklere dahil edilmelidir.
- **Metal Sabit/Değişken Tuzağı:** Değişken değerlik sorularında $Zn$ ve $Ag$ seçeneklere çeldirici olarak serpiştirilmelidir.

### 5.3. Öğrenci Netlerine ve Sınav Başarısına Somut Katkısı

| Sınav Türü | Konu Grubu | Beklenen Soru Sayısı | Geleneksel Çalışma Hata Oranı | Oyunlaştırılmış Test İle Hata Azalımı | Net Katkısı |
|---|---|---|---|---|---|
| **TYT Kimya (Toplam 7 Soru)** | Kimya Bilimi, Güvenlik, Malzeme, Bileşikler, Periyodik Sistem | **3 – 4 Soru** | %35 – %45 (Karıştırma kaynaklı) | **<%5** | **+2.5 ila +3.5 Net** |
| **AYT Kimya (Toplam 13 Soru)**| Redoks, Değerlikler, Organik Fonksiyonel Gruplar & Adlandırma | **4 – 5 Soru** | %40 – %50 (Ezber unutması) | **<%8** | **+3.0 ila +4.5 Net** |
| **Toplam YKS Etkisi** | | **7 – 9 Soru** | Ciddi zaman ve puan kaybı | Otomatik refleks ve 0 hata | **+5.5 ila +8 Net Artışı** |

---

## 6. Proje Entegrasyon ve Veri Yapısı Haritası

Mevcut TypeScript tabanlı `kimyaatom` projesine bu konular aşağıdaki modüler yapı ile dahil edilebilir:

```typescript
// types/chemistry.ts genişletmesi
export type SubjectCategory = 'TYT_AYT' | 'TYT' | 'AYT';

export type ChemistryTopicCode = 
  | 'TYT_AYT_ELEM_36'       // İlk 36 element
  | 'TYT_AYT_COMP_COMMON'   // 23 Yaygın bileşik
  | 'TYT_AYT_POLY_IONS'     // Çok atomlu iyonlar / kökler
  | 'TYT_AYT_SAFETY_PIC'    // Güvenlik piktogramları
  | 'TYT_LAB_EQUIP'         // Laboratuvar malzemeleri
  | 'TYT_INDICATORS'        // Asit-baz indikatörleri
  | 'TYT_ALCHEMY_HIST'      // Simyacılar ve katkıları
  | 'AYT_VAR_VALENCE'       // Değişken değerlikli metaller
  | 'AYT_FUNC_GROUPS'       // Organik fonksiyonel gruplar
  | 'AYT_ORG_COMMON';       // Yaygın organik bileşikler

export interface StudyTopicMeta {
  code: ChemistryTopicCode;
  title: string;
  category: SubjectCategory;
  description: string;
  itemCount: number;
  questionModes: Array<'FORWARD' | 'REVERSE' | 'CLASSIFY' | 'IMAGE_TO_TEXT'>;
}
```

Bu modüler veri mimarisi sayesinde, mevcut test motoru (`quizEngine.ts`) ve istatistik takip motoru (`statsEngine.ts`) hiçbir köklü değişikliğe gerek duymadan tüm bu yeni konuları destekleyebilir.
