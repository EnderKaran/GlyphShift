# GlyphShift - Akıllı Unicode Metin Dönüştürücü

Sıradan metinleri, sosyal medya ve biyografiler için dikkat çekici Unicode sanatına dönüştüren akıllı, modern ve çok dilli bir araç.

Bu proje, React, TypeScript ve Tailwind CSS kullanılarak geliştirilmiş, performans odaklı bir "Single-File Component" mimarisini sergiler. Harici ağır NLP kütüphanelerine ihtiyaç duymadan, Regex (Düzenli İfadeler) tabanlı özel bir motor ile metinleri akıllıca analiz eder ve dönüştürür.

Canlı Demoyu Görüntüle (Buraya varsa canlı linkini ekleyebilirsin)

(Projenin ekran görüntüsünü buraya ekleyin)

Öne Çıkan Özellikler

Bu proje, modern frontend geliştirme tekniklerini ve kullanıcı deneyimi (UX) odaklı yaklaşımları birleştirir:

1. Regex Tabanlı Akıllı Analiz Motoru

Bağlamsal Farkındalık: Harici yapay zeka veya NLP kütüphanesi (örneğin compromise.js) kullanmadan, özel yazılmış Regex algoritmaları ile metni analiz eder.

URL ve E-posta Koruması: Metin içindeki linkleri (https://www.google.com/search?q=google.com) ve e-postaları (test@mail.com) algılar ve bunların bozulmasını engeller.

Kısaltma (Acronym) Tespiti: Sadece büyük harflerden oluşan kısaltmaları (örneğin NASA, TBMM, USA) tespit eder ve okunabilirliği korumak için dönüştürmez.

Özel İsim Filtresi: "Sadece Özel İsimleri Çevir" modu ile cümledeki sadece baş harfi büyük kelimeleri (İsimler, Şehirler) hedefler.

2. Zengin Unicode Kütüphanesi & Mapping

8 Farklı Stil: Cursive, Bold, Gothic, Double Struck, Bubble, Square gibi popüler Unicode setlerini içeren kapsamlı bir karakter haritası (CharMap) mimarisi.

Genişletilebilir Yapı: Yeni bir font eklemek, sadece FONTS objesine yeni bir anahtar-değer seti eklemek kadar basittir.

3. Dahili Çoklu Dil Desteği (i18n)

Hafif Çözüm: i18next gibi büyük paketler yerine, React State ve Props kullanılarak geliştirilmiş, sıfır bağımlılıklı (dependency-free) bir yerelleştirme sistemi.

5 Dil Desteği: İngilizce (EN), Türkçe (TR), Fransızca (FR), İspanyolca (ES) ve Almanca (DE) arasında anlık geçiş imkanı.

4. Modern UI & Mikro Etkileşimler

Glassmorphism & Mesh Gradients: Backdrop-blur ve katmanlı arka planlar kullanılarak oluşturulmuş derinlikli ve modern tasarım.

Dinamik Etkileşimler: Lucide React ikonları ile zenginleştirilmiş, üzerine gelindiğinde (hover) tepki veren kartlar ve butonlar.

Kullanıcı Geri Bildirimi: Kopyalama işlemi sonrası görsel geri bildirim (Buton değişimi, renk geçişi).

Teknoloji Yığını

Bu projenin temelini oluşturan ana teknolojiler:

Framework: React 18/19

Dil: TypeScript (Tip güvenliği ve Interface yapıları için)

Stil: Tailwind CSS (Utility-first styling ve animasyonlar)

İkon Seti: Lucide React

Build Aracı: Vite

Başlarken

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

Kurulum

Depoyu Klonlayın:

git clone [https://github.com/kullaniciadiniz/GlyphShift.git](https://github.com/kullaniciadiniz/GlyphShift.git)
cd GlyphShift


Bağımlılıkları Yükleyin:

npm install


Uygulamayı Başlatın:

npm run dev


Tarayıcınızda http://localhost:5173 adresine giderek uygulamayı görüntüleyebilirsiniz.

Proje Mimarisi (Single File Logic)

Bu proje, belirli bir dağıtım ortamı gereği Tek Dosya (Single Component) mimarisi üzerine kurulmuştur ancak mantıksal olarak katmanlara ayrılmıştır:

src/App.tsx
│
├── 1. TİP TANIMLARI (TYPES)
│   ├── Language, ConversionSettings, FontStyle arayüzleri
│
├── 2. ÇEVİRİ KATMANI (DATA)
│   ├── TRANSLATIONS (5 dil için sözlük objesi)
│
├── 3. FONT HARİTALARI (DATA)
│   ├── FONTS (Cursive, Bold, Gothic vb. karakter haritaları)
│
├── 4. MANTIK FONKSİYONLARI (LOGIC)
│   ├── transformText() -> Regex ve Mapping işlemlerinin yapıldığı ana beyin.
│
├── 5. UI BİLEŞENLERİ (COMPONENTS)
│   ├── Header (Dil seçimi ve Logo)
│   ├── TextInput (Metin girişi)
│   ├── SettingsPanel (Ayar anahtarları)
│   ├── OutputCard (Sonuç kartı ve kopyalama işlevi)
│
└── 6. ANA UYGULAMA (APP)
    └── State Yönetimi ve Bileşenlerin Birleştirilmesi


Gelecek Planları

[ ] Tarayıcı Eklentisi (Chrome Extension) olarak paketlenmesi.

[ ] Favori stilleri kaydetme özelliği (LocalStorage).

[ ] Daha fazla Unicode sembol kütüphanesi.

[ ] Karanlık Mod (Dark Mode) desteği.

Bu proje [Senin Adın] tarafından sevgiyle geliştirilmiştir.
