> **Uyarı:** Bu içerik, SCÜ Şarkışla UBYO Web Programlama I dersi kapsamında eğitim amaçlı derlenmiştir.

# Soru-Cevap (QA) ve Kod Denetimi — Soru Havuzu

**Ders:** Web Programlama I  
**Konu:** Web Forms, Constraint Validation API, FormData ve İstemci Tarafı Araçları (npm)  
**Takım:** Hafta 10 — Ş.B. Mimari  
**Hazırlayan:** Mert Özkan & Turan (QA / Test Mühendisi)  
**Cevap anahtarı:** [`cevap-anahtari.md`](cevap-anahtari.md)  
**Canlı Demo:** [Form Doğrulama Arayüzü](https://mrtsy.github.io/webprogramlama1/Hafta_10_SBMimari/3-uygulama/form-demo.html)

> **Nasıl çalışıyoruz?** Her soruda ya bir **belirti** (tarayıcıda görülen problem) ya da **kasıtlı hatalı bir kod** yer alır. Göreviniz, vizedeki gibi kodu kafanızda çalıştırıp (*mental execution*) hatanın **nerede** ve **neden** olduğunu bulmaktır.
>
> **Zorluk:** ⭐ Kolay · ⭐⭐ Orta · ⭐⭐⭐ Zor  
> 🔴 = Bu hata, form geliştirilirken **gerçekten yaşandı**.

---

## Laboratuvarda İncelenen Canlı Sahneler

Havuzdaki sorulardan, siteyi geliştirirken **gerçekten yaşadığımız** 3 kritik hata seçilip `bozuk-site/` klasörüne izole sahneler olarak konulmuştur:

| Sıra | Havuzdaki Soru | Konu | Sahne Klasörü |
|:---:|:---|:---|:---|
| 1 | Soru 3 ⭐ | Sunucuya dosya yerine sadece isim gidiyor 🔴 | `bozuk-site/1-dosya-gitmiyor/` |
| 2 | Soru 18 ⭐⭐ | Hata oluşuyor ama kırmızı uyarı basılmıyor 🔴 | `bozuk-site/2-sessiz-hata/` |
| 3 | Soru 28 ⭐⭐⭐ | Butona basınca sayfa yenileniyor ve veri uçuyor 🔴 | `bozuk-site/3-sayfa-yenileniyor/` |

---

## BÖLÜM A — Kolay Seviye (Temel Form ve Ortam Mekanikleri)

### Soru 1 — Varsayılan Gönderim Refleksi ⭐

```html
<form action="/kaydet">
  <input type="text" name="kullanici" value="admin">
  <button type="submit">Gönder</button>
</form>
```

Geliştirici `<form>` etiketine `method` tanımlamamıştır. Kullanıcı butona bastığında:

1. Tarayıcı varsayılan olarak hangi HTTP yöntemini işletir?
2. Adres çubuğundaki (URL) değişiklik nasıl gerçekleşir?

### Soru 2 — `required` Niteliğinin Görevi ⭐

```html
<input type="text" id="ad" name="ad" required>
```

Kullanıcı bu kutuya hiçbir şey yazmadan formu göndermeye çalıştığında tarayıcı gönderimi engeller. Bu esnada JavaScript tarafında `input.validity.valueMissing` değeri ne olur?

### Soru 3 — Dosya Neden Gitmiyor? ⭐ 🔴

```html
<!-- bozuk-site/1-dosya-gitmiyor sahnesi -->
<form action="" method="GET">
  <input type="file" name="sunucuLog" required>
  <button type="submit">Yükle</button>
</form>
```

Kullanıcı `sistem.log` dosyasını seçip butona basıyor. Ancak adres çubuğunda yalnızca `?sunucuLog=sistem.log` yazıyor, dosyanın baytları sunucuya ulaşmıyor.

- Hatanın sebebi nedir? Form etiketinde **hangi iki attribute** düzeltilmelidir?

### Soru 4 — Hatalı Format Girişi ⭐

```html
<input type="email" id="eposta" required>
```

Kullanıcı kutuya `abc` yazıp formu göndermek istediğinde, tarayıcının yerleşik Constraint Validation mekanizmasında hangi `validity` özelliği `true` döner?

- **A)** `valueMissing`
- **B)** `typeMismatch`
- **C)** `tooShort`
- **D)** `patternMismatch`

### Soru 5 — `placeholder` Bir Değer midir? ⭐

```html
<input type="text" name="sunucu" placeholder="SRV-1024">
```

Kullanıcı bu alanı boş bırakıp formu gönderdiğinde sunucuya `"SRV-1024"` değeri gider mi? Neden?

### Soru 6 — CLI Betiğini Koşturmak ⭐

Projemizde konsola renkli log basan `npm-demo.js` betiğini çalıştırmak için terminale yazılması gereken komut nedir?

### Soru 7 — Dosya Filtresi Güvenlik midir? ⭐

```html
<input type="file" name="rapor" accept=".log,.txt">
```

Bu kural dosya seçici penceresinde `.exe` veya `.sh` uzantılı dosyaları gizler. Peki bu tanımlama kötü niyetli birinin zararlı dosya yüklemesini tek başına engeller mi? Neden?

### Soru 8 — `valueMissing` Durumu ⭐

Tarayıcı konsolunda çalıştırılan şu kod `true` dönüyorsa form elemanı ne durumdadır?

```javascript
console.log(document.querySelector("#sifre").validity.valueMissing);
```

- **A)** Şifre formatı hatalıdır.
- **B)** `required` işaretli alan boş bırakılmıştır.
- **C)** Girilen şifre çok kısadır.
- **D)** Sunucu yanıt vermemiştir.

### Soru 9 — `package.json` Dosyasındaki `dependencies` ⭐

```json
"dependencies": {
  "chalk": "^4.1.2"
}
```

`package.json` dosyasındaki bu alan projenin çalışması için neyi ifade eder?

### Soru 10 — `<fieldset>` ve `<legend>` Semantiği ⭐

```html
<fieldset>
  <legend>Sunucu Erişim Bilgileri</legend>
  <input type="text" name="ip">
</fieldset>
```

Form kontrollerini `<fieldset>` içine alıp `<legend>` başlığı koymanın salt görsel çerçeve dışında ekran okuyucular (erişilebilirlik) açısından faydası nedir?

---

## BÖLÜM B — Orta Seviye (Doğrulama, DOM ve FormData API)

### Soru 11 — `novalidate` Neden Eklenir? ⭐⭐

```html
<form id="sunucuFormu" novalidate>
```

Form etiketine `novalidate` eklemek tarayıcının yerleşik doğrulama balonlarına ne yapar? Kontrolü kime devreder?

### Soru 12 — Regex Kalıbını Kırmak ⭐⭐

```html
<input type="text" pattern="^SRV-[0-9]{4}$">
```

Aşağıdaki değerlerden hangisi girilirse bu kontrolü hatasız geçer?

- **A)** `srv-1024`
- **B)** `SRV-10245`
- **C)** `SRV-1024`
- **D)** `SRV-ABCD`

### Soru 13 — Constraint Validation API Özellikleri ⭐⭐

Modern tarayıcıların `ValidityState` nesnesi altında sunduğu bayraklardan **en az üç tanesini** yazınız (Örn: `valueMissing` gibi).

### Soru 14 — `FormData` Nesnesinin Avantajı ⭐⭐

```javascript
const formData = new FormData(formElement);
```

Form alanlarını tek tek `document.getElementById` ile çekmek yerine `FormData` nesnesi kullanmanın AJAX / `fetch` süreçlerindeki **en büyük iki avantajı** nedir?

### Soru 15 — `fetch` ile `FormData` İletimi ⭐⭐

```javascript
fetch("/api/kaydet", {
  method: "POST",
  body: formData
  // headers: { "Content-Type": "multipart/form-data" } <-- BU SATIR NEDEN EKLENMEZ?
});
```

`body` olarak `FormData` verildiğinde `Content-Type` başlığını elle yazmak işlemi neden bozar?

### Soru 16 — Canlı Payload Ayrıştırma Kodu ⭐⭐

```javascript
formData.forEach((value, key) => {
  payloadObj[key] = value instanceof File
    ? `${value.name} (${value.size} bytes)`
    : value;
});
```

Bu kod bloğu döngü sırasında alan bir dosya (`File`) ise önizleme paneline ne yazar?

### Soru 17 — `input` ve `blur` Olaylarının Zamanlaması ⭐⭐

Form alanını denetlerken `input` olayı ile `blur` olayı arasında kullanıcı deneyimi açısından nasıl bir fark vardır? Hangisi klavyeden **her harf girildiğinde** çalışır?

### Soru 18 — Sessiz Kalan Hata Bildirimi ⭐⭐ 🔴

```javascript
// bozuk-site/2-sessiz-hata sahnesi
const errorSpan = input.parentElement.querySelector(".error-msg");
if (!errorSpan) return true;
errorSpan.textContent = "Format hatalı!";
```

HTML tarafında `<span class="error-msg"></span>` etiketi yazılmadığında yukarıdaki fonksiyon neden konsola hata düşürmeden **sessizce** `true` döner?

### Soru 19 — `require("chalk")` Satırı ⭐⭐

```javascript
// npm-demo.js
const chalk = require("chalk");
console.log(chalk.green("Sistem aktif"));
```

`npm-demo.js` çalıştırıldığında ilk satır arka planda neyi belleğe yükler?

### Soru 20 — `input.classList.add("invalid")` Mekanizması ⭐⭐

Hatalı bir giriş yapıldığında JS tarafında `input` elemanına `invalid` sınıfının eklenmesi, CSS'teki hangi görsel kuralı tetiklemek için kullanılır?

---

## BÖLÜM C — Zor Seviye (Adli Bilişim, Ağ Analizi ve Asenkron Süreçler)

### Soru 21 — Sunucu 500 Döndüğünde Akış ⭐⭐⭐

```javascript
try {
  const response = await fetch("/api/sunucular", { method: "POST", body: formData });
  if (!response.ok) throw new Error(`HTTP Durum Kodu: ${response.status}`);
  const data = await response.json();
  console.log("Kayıt verisi:", data);
} catch (error) {
  payloadView.textContent += error.message;
}
```

Sunucu 500 hatası döndürdüğünde `console.log("Kayıt verisi:", data)` satırı neden çalışmaz? Hata ekrana nasıl yansır?

### Soru 22 — URL Kodlamasında Dosya Bozulması ⭐⭐⭐

Dosya içeren bir form `application/x-www-form-urlencoded` formatıyla gönderilmeye zorlanırsa ikili (binary) dosya içeriği neden kullanılamaz hale gelir?

### Soru 23 — `title` İpucunun Rolü ⭐⭐⭐

```html
<input pattern="^SRV-[0-9]{4}$" title="SRV- ardından 4 haneli rakam giriniz">
```

Kullanıcı kurala uymayan bir değer girdiğinde tarayıcının hata balonunda **hangi metin** gösterilir?

### Soru 24 — Sadece İstemci Doğrulaması Yeterli midir? ⭐⭐⭐

Bir web formunda istemci tarafında kusursuz JavaScript ve Regex doğrulaması kurulmuş olsa bile sunucu tarafında da doğrulama yapmak neden **zorunludur**?

### Soru 25 — `JSON.stringify` Formatlama Parametreleri ⭐⭐⭐

```javascript
payloadView.textContent = JSON.stringify(payloadObj, null, 2);
```

Bu satırda önizleme paneline basılan JSON çıktısının tek satır yerine 2 boşluk girintili ve alt alta düzenli basılmasını sağlayan argüman hangisidir?

### Soru 26 — Paket Ekosistemi ve Dağıtım Riskleri ⭐⭐⭐

Node.js projelerinde `node_modules/` klasörü neden Git reposuna push edilmez ve `.gitignore` içine yazılır?

### Soru 27 — Ağ Trafiğinde Multipart İncelemesi ⭐⭐⭐

F12 Network sekmesinde incelenen bir `multipart/form-data` gövdesinde `boundary` dizesi ne işe yarar? Birden fazla form alanı ve dosya baytı birbirinden nasıl ayrılır?

### Soru 28 — Submit ve `preventDefault` Döngüsü ⭐⭐⭐ 🔴

```javascript
// bozuk-site/3-sayfa-yenileniyor sahnesi
form.addEventListener("submit", async (e) => {
  // e.preventDefault(); satırı unutulmuş!
  const fd = new FormData(form);
  await fetch("/api/log", { method: "POST", body: fd });
});
```

`e.preventDefault()` çağrılmadığında tarayıcının sergileyeceği davranış nedir? Asenkron `fetch` isteğine ne olur?

### Soru 29 — Dosya Yüklemede GET Tercihinin Riskleri ⭐⭐⭐

Büyük bir log dosyasını `GET` metoduyla göndermeye kalkışan bir sistemde oluşacak **veri kaybı** ve **gizlilik** sorunları nelerdir?

### Soru 30 — Uçtan Uca Doğrulama Mimarisi ⭐⭐⭐

Projemizdeki doğrulama akışını (`input` → `blur` → `submit` → `FormData` → `fetch`) adım adım, bir veri paketinin yolculuğu olarak özetleyiniz.