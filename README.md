# GlyphShift - Akıllı Unicode Metin Dönüştürücü

Sıradan metinleri, sosyal medya ve biyografiler için dikkat çekici Unicode sanatına dönüştüren akıllı, modern ve çok dilli bir araç.

Bu proje, React, TypeScript ve Tailwind CSS kullanılarak geliştirilmiş, performans odaklı bir "Single-File Logic" mimarisini sergiler. Harici ağır NLP kütüphanelerine ihtiyaç duymadan, Regex (Düzenli İfadeler) tabanlı özel bir motor ile metinleri akıllıca analiz eder ve dönüştürür.

**[Canlı Demoyu Görüntüle](https://enderkaran.github.io/GlyphShift/)**

# Ekran Görüntüsü
<img width="1887" height="857" alt="Ekran görüntüsü 2025-11-20 004108" src="https://github.com/user-attachments/assets/e92f9fb1-49e9-49f9-a323-0459eff1bdbd" />

# Video
https://github.com/user-attachments/assets/9f311e6a-9bae-4686-8a82-8cce79a4ab2c

---
## Öne Çıkan Özellikler

Bu proje, modern frontend geliştirme tekniklerini ve kullanıcı deneyimi (UX) odaklı yaklaşımları birleştirir:

### 1. Akıllı Metin Analizi (Context Awareness)

- **Regex Motoru:** Ağır yapay zeka kütüphaneleri yerine, performans odaklı özel Regex algoritmalarıyla metni milisaniyeler içinde analiz eder.

- **Koruma Kalkanı:** URL'leri (google.com), E-postaları (test@mail.com) ve Hashtag'leri (#react) otomatik algılar ve bunları bozmadan korur.

- **Kısaltma (Acronym) Tespiti:** Sadece büyük harflerden oluşan kısaltmaları (örneğin NASA, TBMM, USA) tespit eder ve okunabilirliği korumak için dönüştürmez.

- **Özel İsim Filtresi:** "Sadece Özel İsimleri Çevir" modu ile cümledeki sadece baş harfi büyük kelimeleri (İsimler, Şehirler) hedefler.

### 2. Zengin Unicode Kütüphanesi & Mapping

- **11 Farklı Stil:** Cursive, Bold, Gothic, Double Struck, Bubble, Square, Small Caps, Upside Down (Ters Metin) ve Emoji Mix gibi popüler stilleri içerir.

- **Genişletilebilir Yapı:** Yeni bir font eklemek, sadece FONTS objesine yeni bir anahtar-değer seti eklemek kadar basittir.
  
### 3. Kalıcı Kullanıcı Deneyimi (Persistence)

- **Ayarları Hatırlar:** Dil seçimi, tema tercihi (Dark/Light) ve dönüşüm ayarları localStorage üzerine kaydedilir. Tarayıcıyı kapatsanız bile tercihleriniz korunur.
- **Kopyalama Geçmişi:** Son kopyalanan 20 metni hafızada tutar. Kullanıcılar geçmiş panelinden eski dönüşümlerine tek tıkla ulaşabilir.

### 4. Modern Arayüz & Dark Mode

- **Karanlık Mod:** Tailwind CSS'in dark: varyantları ile oluşturulmuş, sistem tercihlerine duyarlı ve manuel değiştirilebilen profesyonel bir karanlık tema.

- **Glassmorphism:** backdrop-blur ve katmanlı arka planlar (Mesh Gradients) kullanılarak oluşturulmuş derinlikli tasarım.

- **Mikro Etkileşimler: ** Lucide React ikonları ve hover efektleri ile zenginleştirilmiş interaktif bileşenler.

### 5. Çoklu Dil Desteği (i18n)

- **5 Dil:** İngilizce (EN), Türkçe (TR), Fransızca (FR), İspanyolca (ES) ve Almanca (DE) arasında anlık geçiş imkanı.
- **Hafif Altyapı:** Harici kütüphane karmaşası olmadan, React State tabanlı yerelleştirme sistemi.


  
## Teknoloji Yığını

Bu projenin temelini oluşturan ana teknolojiler:

- **Framework: React 18/19**

- **Dil: TypeScript (Tip güvenliği ve Interface yapıları için)**

- **Stil: Tailwind CSS (Utility-first styling ve animasyonlar)**

- **İkon Seti: Lucide React**

- **Build Aracı: Vite**
--- 
## Başlarken

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Kurulum

1.  **Depoyu Klonlayın:**

```bash
git clone [https://github.com/EnderKaran/GlyphShift.git](https://github.com/EnderKaran/GlyphShift.git)
cd GlyphShift
```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```


3. **Uygulamayı Başlatın:**

```bash
    npm run dev
   ```

Tarayıcınızda http://localhost:5173 adresine giderek uygulamayı görüntüleyebilirsiniz.
---

## Proje Mimarisi (Single File Logic)

Bu proje, belirli bir dağıtım ortamı gereği Tek Dosya (Single Component) mimarisi üzerine kurulmuştur ancak mantıksal olarak katmanlara ayrılmıştır:

```
src/
├── components/          # UI Bileşenleri
│   ├── Header.tsx       # Üst menü ve navigasyon
│   ├── TextInput.tsx    # Metin giriş alanı
│   ├── SettingsPanel.tsx # Ayar düğmeleri
│   ├── OutputCard.tsx   # Sonuç kartları
│   ├── HistoryModal.tsx # Geçmiş paneli
│   └── ThemeToggle.tsx  # Tema değiştirici
│
├── hooks/               # Özel React Hook'ları
│   └── useTheme.ts      # Tema yönetimi ve localStorage mantığı
│
├── utils/               # Yardımcı Fonksiyonlar ve Veriler
│   ├── types.ts         # TypeScript tip tanımları
│   ├── translations.ts  # Çoklu dil sözlüğü
│   ├── characterMaps.ts # Unicode font haritaları
│   └── textConverter.ts # Regex tabanlı dönüştürme motoru
│
└── App.tsx              # Ana uygulama ve state yönetimi
```
---

## Gelecek Planları

[ ] Tarayıcı Uzantısı: Projenin manifest.json ile paketlenerek Chrome/Edge mağazasına eklenmesi.

[ ] Favori Stiller: Kullanıcıların en çok kullandığı kartları en başa sabitleyebilmesi.

[ ] Daha Fazla Font: Şekilli semboller ve ASCII art desteği.

[ ] PWA Desteği: Mobil cihazlarda uygulama gibi çalışabilmesi.

