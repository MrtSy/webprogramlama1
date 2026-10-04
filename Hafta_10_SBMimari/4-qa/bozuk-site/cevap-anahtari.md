# Cevap Anahtarı — Web Programlama I, Hafta 10

**Konu:** Web Forms, FormData, Constraint Validation API ve npm  
**Takım:** Hafta 10 — Ş.B. Mimari  
**Soru havuzu:** [`sorular.md`](sorular.md)  
**Canlı Demo:** [Form Doğrulama Arayüzü](https://mrtsy.github.io/webprogramlama1/Hafta_10_SBMimari/3-uygulama/form-demo.html)

> 🔴 = Bu hata, form geliştirilirken **gerçekten yaşandı** ve `bozuk-site/` klasöründe izole sahnesi vardır.

---

## Genel Kural: Form Dünyasında Kim Ne Yapar?

| Katman | Davranış | Açıklama |
|:---|:---|:---|
| **HTML Formu** | Susar ve varsayılana döner | `method` yoksa `GET` atar, dosya tipi (`enctype`) yoksa metin olarak kodlar. |
| **CSS** | Susar | Geçersiz selector veya kuralı tamamen yok sayar. |
| **JavaScript** | İlk hatada bağırır ve durur | Konsola kırmızı yazar, sonrasını çalıştırmaz. |
| **Tarayıcı Submit** | Refleksle sayfayı yeniler | `preventDefault` denmezse tüm JS durumunu sıfırlar. |

---

## BÖLÜM A — Kolay Seviye (1–10)

### Soru 1 — Varsayılan Gönderim Refleksi

**Cevap:** `method` yazılmazsa varsayılan **GET**'tir. Tüm alanlar URL'e query string olarak eklenir (`?kullanici=admin`). Şifreler URL geçmişine ve sunucu loglarına düşer.

**Kanıt / Canlı Gösterim:** Formu `method` olmadan gönderip adres çubuğuna bak; `/kaydet?kullanici=admin` şeklinde değişir. F12 → Network sekmesinde istek tipi `GET` görünür.

**İpuçları:** Hassas veri (şifre vb.) taşıyan formda `GET` kullanılmaz. Varsayılana güvenmek yerine `method`'u her zaman açıkça yaz.

**Düzeltme:**

```html
<form action="/kaydet" method="POST">
  <input type="text" name="kullanici" value="admin">
  <button type="submit">Gönder</button>
</form>
```

**Akılda Kalacak Cümle:** *"Method yazmazsan tarayıcı her şeyi sokakta (URL'de) konuşur."*

---

### Soru 2 — `required` Niteliğinin Görevi

**Cevap:** Alanın boş geçilmesini engeller. Boşken submit edilirse tarayıcı gönderimi keser ve `input.validity.valueMissing` değeri `true` olur.

**Kanıt / Canlı Gösterim:** Alan boşken konsolda `document.querySelector("#ad").validity.valueMissing` çalıştır; `true` döner.

**İpuçları:** `required` bir **doğrulama kuralıdır**; gönderimi tarayıcı keser, form sunucuya hiç ulaşmaz.

**Düzeltme:** Düzeltme gerekmez; kod doğrudur.

```html
<input type="text" id="ad" name="ad" required>
```

**Akılda Kalacak Cümle:** *"required boşluğa izin vermez; boşsa valueMissing true olur."*

---

### Soru 3 — Dosya Neden Gitmiyor? 🔴

> 🔴 Sahne: `bozuk-site/1-dosya-gitmiyor/`

**Cevap:** `method="POST"` ve `enctype="multipart/form-data"` olmalıdır. `GET` kullanılırsa veya `enctype` eksikse dosyanın ikili baytları yerine sadece dosya adı metin olarak gider.

**Kanıt / Canlı Gösterim:** `bozuk-site/1-dosya-gitmiyor/` sahnesinde dosya seçip gönder; adres çubuğunda yalnızca `?sunucuLog=sistem.log` görünür. Network sekmesinde dosya baytları yoktur.

**İpuçları:** İki attribute birlikte düşünülmeli: `method` gönderim yolunu, `enctype` paketin biçimini belirler.

**Düzeltme:**

```html
<form action="" method="POST" enctype="multipart/form-data">
  <input type="file" name="sunucuLog" required>
  <button type="submit">Yükle</button>
</form>
```

**Akılda Kalacak Cümle:** *"Dosya taşıyacaksan multipart şart, yoksa sadece ismini seyredersin."*

---

### Soru 4 — Hatalı Format Girişi

**Cevap:** `type="email"` alanına `abc` yazılırsa `ValidityState` altındaki **`typeMismatch`** bayrağı `true` döner. Doğru şık: **B**.

**Kanıt / Canlı Gösterim:** Alana `abc` yazıp konsolda `document.querySelector("#eposta").validity.typeMismatch` çalıştır; `true` döner.

**İpuçları:** `valueMissing` boşluk, `typeMismatch` tür uyumsuzluğu, `patternMismatch` regex uyumsuzluğudur. Alan boş değil, bu yüzden `valueMissing` olamaz.

**Düzeltme:** Düzeltme gerekmez; soru bir bayrak tanıma sorusudur.

**Akılda Kalacak Cümle:** *"Boşsa valueMissing, türü yanlışsa typeMismatch."*

---

### Soru 5 — `placeholder` Bir Değer midir?

**Cevap:** Hayır. `placeholder` kesinlikle bir değer değildir; sadece kullanıcıya silik bir görsel ipucudur. Sunucuya giden payload içine dahil edilmez.

**Kanıt / Canlı Gösterim:** Alanı boş bırakıp konsolda `document.querySelector("[name=sunucu]").value` çalıştır; boş string (`""`) döner.

**İpuçları:** Varsayılan bir değer göndermek istiyorsan `placeholder` değil `value` kullan.

**Düzeltme:**

```html
<!-- Değer gitsin istiyorsan -->
<input type="text" name="sunucu" value="SRV-1024">
```

**Akılda Kalacak Cümle:** *"Placeholder fısıltıdır, value sestir; sunucu sadece sesi duyar."*

---

### Soru 6 — CLI Betiğini Koşturmak

**Cevap:** `node Hafta_10_SBMimari/3-uygulama/npm-demo.js` veya dosya dizinindeyken `node npm-demo.js` yazılarak çalıştırılır.

**Kanıt / Canlı Gösterim:** Terminalde komutu çalıştırınca renkli log çıktısı görünür.

**İpuçları:** Komutu doğru dizinden çalıştırdığına emin ol. `chalk` paketinin kurulu olması gerekir (`npm install`).

**Düzeltme:**

```bash
node Hafta_10_SBMimari/3-uygulama/npm-demo.js
# veya dosya dizinindeyken:
node npm-demo.js
```

**Akılda Kalacak Cümle:** *"JS dosyasını terminalde koşturmak için başına node yaz."*

---

### Soru 7 — Dosya Filtresi Güvenlik midir?

**Cevap:** Hayır. `accept=".log,.txt"` yalnızca işletim sistemi seçicisinde filtreleme yapar. Kullanıcı "Tüm Dosyalar" diyerek istediği dosyayı seçebilir; bu yüzden sunucu tarafı doğrulaması zorunludur.

**Kanıt / Canlı Gösterim:** Dosya seçici penceresinde dosya türü açılır menüsünden "Tüm Dosyalar"ı seçip `.exe` dosyası seçilebildiğini göster.

**İpuçları:** `accept` bir **kullanıcı kolaylığıdır**, güvenlik önlemi değildir. Gerçek kontrol sunucuda yapılmalıdır (bkz. Soru 24).

**Düzeltme:** `accept` kalabilir, ancak sunucu tarafında uzantı ve içerik doğrulaması eklenmelidir.

```html
<input type="file" name="rapor" accept=".log,.txt">
```

**Akılda Kalacak Cümle:** *"accept kapıya tabela asar, kilit takmaz."*

---

### Soru 8 — `valueMissing` Durumu

**Cevap:** `valueMissing`, `required` işaretli alanın boş bırakıldığını belirtir. Doğru şık: **B**.

**Kanıt / Canlı Gösterim:** `#sifre` alanı `required` ve boşken konsolda ilgili satırı çalıştır; `true` döner.

**İpuçları:** Format hatası `typeMismatch`/`patternMismatch`, çok kısa değer `tooShort` ile ayrı bayraklardır. Sunucu yanıtı bu API'nin konusu değildir.

**Düzeltme:** Düzeltme gerekmez.

```javascript
console.log(document.querySelector("#sifre").validity.valueMissing);
```

**Akılda Kalacak Cümle:** *"valueMissing = zorunlu alan boş."*

---

### Soru 9 — `package.json` Dosyasındaki `dependencies`

**Cevap:** Projenin çalışabilmesi için dışarıdan ihtiyaç duyduğu paketlerin (örneğin `chalk`) listesini ve sürümlerini tutar.

**Kanıt / Canlı Gösterim:** `npm install` çalıştırınca `dependencies` içindeki paketler `node_modules/` klasörüne inen paketlerdir.

**İpuçları:** Sürümdeki `^` işareti, uyumlu minör/yama güncellemelerine izin verildiğini gösterir.

**Düzeltme:** Düzeltme gerekmez.

```json
"dependencies": {
  "chalk": "^4.1.2"
}
```

**Akılda Kalacak Cümle:** *"dependencies projenin alışveriş listesidir."*

---

### Soru 10 — `<fieldset>` ve `<legend>` Semantiği

**Cevap:** Form alanlarını mantıksal olarak gruplar. Ekran okuyucular (a11y) grup içindeki her alana odaklanıldığında `<legend>` başlığını okur.

**Kanıt / Canlı Gösterim:** Ekran okuyucuyla gruptaki alana odaklanınca "Sunucu Erişim Bilgileri" başlığı da okunur. Tarayıcıda ayrıca çerçeve görünür.

**İpuçları:** Fayda yalnızca görsel çerçeve değildir; asıl kazanç erişilebilirlik bağlamıdır.

**Düzeltme:** Düzeltme gerekmez.

```html
<fieldset>
  <legend>Sunucu Erişim Bilgileri</legend>
  <input type="text" name="ip">
</fieldset>
```

**Akılda Kalacak Cümle:** *"fieldset grubu kurar, legend grubun adını söyler."*

---

## BÖLÜM B — Orta Seviye (11–20)

### Soru 11 — `novalidate` Neden Eklenir?

**Cevap:** Tarayıcının varsayılan hata balonlarını devre dışı bırakır. Doğrulama ve arayüz bildirim kontrolünü tamamen JavaScript'e devreder.

**Kanıt / Canlı Gösterim:** `required` alanı boş bırakıp gönderince `novalidate` varken tarayıcı balonu çıkmaz; hata gösterimi JS koduna kalır.

**İpuçları:** `novalidate` doğrulamayı kapatmaz, **tarayıcının** doğrulama arayüzünü kapatır. Kontrol artık sizdedir.

**Düzeltme:** Düzeltme gerekmez.

```html
<form id="sunucuFormu" novalidate>
```

**Akılda Kalacak Cümle:** *"novalidate: tarayıcı susar, direksiyon JavaScript'te."*

---

### Soru 12 — Regex Kalıbını Kırmak

**Cevap:** `^SRV-[0-9]{4}$` kuralını sadece **C şıkkı (`SRV-1024`)** geçer. `^` ve `$` sınırları baştan sona tam eşleşme arar.

**Kanıt / Canlı Gösterim:** Şıkları tek tek yazıp konsolda `validity.patternMismatch` kontrol et; yalnızca `SRV-1024` için `false` döner.

**İpuçları:** A büyük/küçük harften, B fazla rakamdan, D rakam yerine harften elenir.

**Düzeltme:** Düzeltme gerekmez.

```html
<input type="text" pattern="^SRV-[0-9]{4}$">
```

**Akılda Kalacak Cümle:** *"^ ve $ ile desen baştan sona birebir uymak zorundadır."*

---

### Soru 13 — Constraint Validation API Özellikleri

**Cevap:** `valueMissing`, `typeMismatch`, `patternMismatch`, `tooShort`, `tooLong`, `rangeOverflow`.

**Kanıt / Canlı Gösterim:** Konsolda bir alanın `validity` nesnesini yazdırınca tüm bayraklar listelenir.

**İpuçları:** Soruda en az üç tanesi isteniyor; hepsi `ValidityState` altındadır.

**Düzeltme:** Düzeltme gerekmez.

```javascript
console.log(document.querySelector("#ad").validity);
```

**Akılda Kalacak Cümle:** *"Her hatanın ValidityState'te bir bayrağı vardır."*

---

### Soru 14 — `FormData` Nesnesinin Avantajı

**Cevap:**
1. Formdaki tüm alanları tek hamlede key-value olarak toplar.
2. İkili dosya (`File`/`Blob`) verilerini doğrudan taşır.

**Kanıt / Canlı Gösterim:** `new FormData(form)` ile tek satırda tüm alanlar toplanır; tek tek `getElementById` yazmaya gerek kalmaz.

**İpuçları:** Dosya yükleyen bir `fetch` isteğinde `FormData` en pratik yoldur.

**Düzeltme:** Düzeltme gerekmez.

```javascript
const formData = new FormData(formElement);
```

**Akılda Kalacak Cümle:** *"FormData formun tüm bavulunu tek seferde toplar."*

---

### Soru 15 — `fetch` ile `FormData` İletimi

**Cevap:** `Content-Type` başlığı elle yazılmaz. Elle yazılırsa tarayıcının oluşturduğu benzersiz `boundary` parametresi kaybolur ve sunucu dosyaları ayrıştıramaz.

**Kanıt / Canlı Gösterim:** Header'ı elle eklemeden gönderince Network sekmesinde `Content-Type: multipart/form-data; boundary=...` görünür.

**İpuçları:** `body` olarak `FormData` verdiğinde başlığı tarayıcıya bırak.

**Düzeltme:**

```javascript
fetch("/api/kaydet", {
  method: "POST",
  body: formData
  // Content-Type'ı elle yazma, tarayıcı boundary ile birlikte ekler
});
```

**Akılda Kalacak Cümle:** *"FormData gönderirken header'ı tarayıcıya bırak, boundary onun işi."*

---

### Soru 16 — Canlı Payload Ayrıştırma Kodu

**Cevap:** Döngüde karşılaşılan alan bir `File` örneği ise önizleme paneline dosyanın adı ve bayt cinsinden boyutu basılır.

**Kanıt / Canlı Gösterim:** Dosya seçince önizleme panelinde `sistem.log (1234 bytes)` gibi bir satır görünür.

**İpuçları:** `instanceof File` kontrolü dosya alanlarını metin alanlarından ayırır.

**Düzeltme:** Düzeltme gerekmez.

```javascript
formData.forEach((value, key) => {
  payloadObj[key] = value instanceof File
    ? `${value.name} (${value.size} bytes)`
    : value;
});
```

**Akılda Kalacak Cümle:** *"Dosya ise ismini ve boyutunu yaz, baytlarını değil."*

---

### Soru 17 — `input` ve `blur` Olaylarının Zamanlaması

**Cevap:** `input` klavyeden her harf girildiğinde/silindiğinde anlık tetiklenir; `blur` ise kullanıcı alandan odak çıkışı yaptığında çalışır.

**Kanıt / Canlı Gösterim:** İki olaya da `console.log` ekleyip yazarken `input`'un her tuşta, `blur`'ün yalnızca alandan çıkınca çalıştığını gör.

**İpuçları:** `input` anlık geri bildirim verir; `blur` kullanıcıyı yazarken rahatsız etmez.

**Düzeltme:** Düzeltme gerekmez.

**Akılda Kalacak Cümle:** *"input her harfte konuşur, blur alandan çıkınca konuşur."*

---

### Soru 18 — Sessiz Kalan Hata Bildirimi 🔴

> 🔴 Sahne: `bozuk-site/2-sessiz-hata/`

**Cevap:** HTML içinde `<span class="error-msg"></span>` unutulduğu için `querySelector` `null` dönmüş ve `if (!errorSpan) return true;` satırı fonksiyonu sessizce sonlandırmıştır.

**Kanıt / Canlı Gösterim:** `bozuk-site/2-sessiz-hata/` sahnesinde hatalı giriş yap; konsolda hata yoktur ama ekranda kırmızı uyarı da çıkmaz.

**İpuçları:** Sessiz bir `return true` hatayı gizler. Beklenen eleman yoksa konsola uyarı yazdırmayı düşün.

**Düzeltme:**

```html
<input type="text" name="sunucu">
<span class="error-msg"></span>
```

**Akılda Kalacak Cümle:** *"JS'in hata yazabilmesi için HTML'de ona bir yuva açman gerekir."*

---

### Soru 19 — `require("chalk")` Satırı

**Cevap:** CommonJS modül yükleme sistemiyle `node_modules/chalk` paketini belleğe alır ve CLI renk fonksiyonlarını kullanılabilir kılar.

**Kanıt / Canlı Gösterim:** `node npm-demo.js` çalışınca "Sistem aktif" yeşil renkte basılır.

**İpuçları:** Paket kurulu değilse `Cannot find module 'chalk'` hatası alırsın; önce `npm install` çalıştır.

**Düzeltme:** Düzeltme gerekmez.

```javascript
const chalk = require("chalk");
console.log(chalk.green("Sistem aktif"));
```

**Akılda Kalacak Cümle:** *"require, paketi node_modules'tan alıp belleğe getirir."*

---

### Soru 20 — `input.classList.add("invalid")` Mekanizması

**Cevap:** CSS tarafındaki `input.invalid { border: 2px solid red; }` kuralını devreye sokarak kutuyu kırmızıya boyar.

**Kanıt / Canlı Gösterim:** Hatalı girişte F12 → Elements sekmesinde `class="invalid"` eklendiğini ve kenarlığın kırmızılaştığını gör.

**İpuçları:** JS yalnızca sınıfı ekler; görünümü CSS belirler.

**Düzeltme:** Düzeltme gerekmez.

```css
input.invalid { border: 2px solid red; }
```

**Akılda Kalacak Cümle:** *"JS sınıfı takar, CSS boyayı sürer."*

---

## BÖLÜM C — Zor Seviye (21–30)

### Soru 21 — Sunucu 500 Döndüğünde Akış

**Cevap:** `fetch` HTTP 500'de hata fırlatmaz. `!response.ok` bloğu ile biz `throw new Error` çalıştırırız. Akış doğrudan `catch` bloğuna atlar, `console.log` satırı atlanır, ekrana hata basılır.

**Kanıt / Canlı Gösterim:** Sunucu 500 döndürünce ekranda `HTTP Durum Kodu: 500` yazar; konsolda "Kayıt verisi" satırı görünmez.

**İpuçları:** `fetch` yalnızca ağ hatasında reddedilir. HTTP hata kodlarını `response.ok` ile kendin kontrol etmelisin.

**Düzeltme:** Düzeltme gerekmez.

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

**Akılda Kalacak Cümle:** *"fetch 500'de susar, throw'u sen atarsın."*

---

### Soru 22 — URL Kodlamasında Dosya Bozulması

**Cevap:** `application/x-www-form-urlencoded` ikili verileri ASCII metne çevirmeye çalışırken bayt bütünlüğünü bozar.

**Kanıt / Canlı Gösterim:** Network sekmesinde urlencoded gönderimde dosya içeriği yerine yalnızca metinleşmiş değerler görünür.

**İpuçları:** Dosya gönderiminin doğru biçimi `multipart/form-data`'dır (bkz. Soru 3 ve 27).

**Düzeltme:**

```html
<form method="POST" enctype="multipart/form-data">
```

**Akılda Kalacak Cümle:** *"Binary veriyi metin kalıbına sokarsan bozulur."*

---

### Soru 23 — `title` İpucunun Rolü

**Cevap:** Tarayıcı `patternMismatch` hatası verdiğinde standart hata mesajının yanına geliştiricinin `title` içine yazdığı metni de ekler.

**Kanıt / Canlı Gösterim:** Kurala uymayan değerle gönderince balonda standart mesajın yanında "SRV- ardından 4 haneli rakam giriniz" metni de görünür.

**İpuçları:** `title`, kullanıcıya beklenen biçimi açıklamak için kullanılır.

**Düzeltme:** Düzeltme gerekmez.

```html
<input pattern="^SRV-[0-9]{4}$" title="SRV- ardından 4 haneli rakam giriniz">
```

**Akılda Kalacak Cümle:** *"pattern kuralı koyar, title kuralı anlatır."*

---

### Soru 24 — Sadece İstemci Doğrulaması Yeterli midir?

**Cevap:** Asla tek başına yetmez. Tarayıcı kontrolleri DevTools, Postman veya cURL ile tamamen atlatılabilir; asıl kapı sunucudur.

**Kanıt / Canlı Gösterim:** DevTools'ta `required`/`pattern` niteliklerini silip formu göndermek ya da cURL ile doğrudan istek atmak istemci kontrollerini aşar.

**İpuçları:** İstemci doğrulaması kullanıcı deneyimi içindir; güvenlik sunucu tarafı doğrulamasıyla sağlanır.

**Düzeltme:** Her girdi sunucuda yeniden doğrulanmalıdır.

**Akılda Kalacak Cümle:** *"İstemci doğrulaması nezaket, sunucu doğrulaması güvenliktir."*

---

### Soru 25 — `JSON.stringify` Formatlama Parametreleri

**Cevap:** 3. argüman olan `2` sayısıdır; çıktının 2 boşluk girintili basılmasını sağlar.

**Kanıt / Canlı Gösterim:** `2` yerine `0` verince çıktı tek satıra iner, `2` ile alt alta girintili görünür.

**İpuçları:** 2. argüman (`null`) replacer'dır; burada kullanılmıyor.

**Düzeltme:** Düzeltme gerekmez.

```javascript
payloadView.textContent = JSON.stringify(payloadObj, null, 2);
```

**Akılda Kalacak Cümle:** *"Üçüncü argüman JSON'a girinti kazandırır."*

---

### Soru 26 — `node_modules` Neden Push Edilmez?

**Cevap:** Boyutu devasadır, binlerce dosya repoyu şişirir ve işletim sistemine özgü bağımlılıklar barındırabilir; repoda sadece `package.json` taşınır.

**Kanıt / Canlı Gösterim:** `node_modules/` klasörünün boyutuna bak; `npm install` ile `package.json`'dan yeniden üretilebilir.

**İpuçları:** Klasörü `.gitignore` içine yazarak Git'in takip etmesini engellersin.

**Düzeltme:**

```bash
echo "node_modules/" >> .gitignore
```

**Akılda Kalacak Cümle:** *"Repoda tarif taşınır, malzeme değil."*

---

### Soru 27 — Ağ Trafiğinde Multipart İncelemesi

**Cevap:** `boundary`, multipart istek gövdesinde alanları ve dosya ikili baytlarını birbirinden ayıran benzersiz sınır çizgileridir.

**Kanıt / Canlı Gösterim:** F12 → Network → isteğin Payload/Request sekmesinde `------WebKitFormBoundary...` gibi ayırıcılar görünür.

**İpuçları:** `boundary` değerini tarayıcı üretir; bu yüzden `Content-Type` elle yazılmaz (bkz. Soru 15).

**Düzeltme:** Düzeltme gerekmez.

**Akılda Kalacak Cümle:** *"Boundary, paketin içindeki bölme çizgisidir."*

---

### Soru 28 — Submit ve `preventDefault` Döngüsü 🔴

> 🔴 Sahne: `bozuk-site/3-sayfa-yenileniyor/`

**Cevap:** `e.preventDefault()` olmazsa tarayıcı sayfayı tazeleyerek klasik submit yapar. Asenkron `fetch` yanıtı gelmeden sayfa yenilenir ve bağlantı kopar.

**Kanıt / Canlı Gösterim:** `bozuk-site/3-sayfa-yenileniyor/` sahnesinde butona basınca sayfa yenilenir ve ekrandaki veri uçar.

**İpuçları:** `preventDefault` çağrısını handler'ın en başına koy.

**Düzeltme:**

```javascript
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  await fetch("/api/log", { method: "POST", body: fd });
});
```

**Akılda Kalacak Cümle:** *"Asenkron form yazıyorsan tarayıcının varsayılan refleksini (preventDefault) durdurmak zorundasın."*

---

### Soru 29 — GET ile Dosya Yükleme

**Cevap:** URL karakter sınırı (yaklaşık 2048 karakter) nedeniyle veri kırpılır, ikili veriler bozulur, veriler tarayıcı geçmişine ve loglara açıkça düşer.

**Kanıt / Canlı Gösterim:** `GET` ile gönderilen uzun değer adres çubuğunda görünür ve tarayıcı geçmişine kaydedilir.

**İpuçları:** Veri kaybı = kırpılma ve bozulma; gizlilik sorunu = geçmiş ve log kayıtları.

**Düzeltme:**

```html
<form method="POST" enctype="multipart/form-data">
```

**Akılda Kalacak Cümle:** *"GET ile dosya yollamak, mektubu zarfsız postalamaktır."*

---

### Soru 30 — Uçtan Uca Doğrulama Mimarisi

**Cevap:**
1. Veri girişi ve anlık kontrol (`input`/`blur`).
2. Gönderim durdurma (`preventDefault`) ve toplu doğrulama.
3. Veriyi paketleme (`FormData`).
4. Asenkron iletim ve hata yönetimi (`fetch`, `try/catch`).

**Kanıt / Canlı Gösterim:** Canlı demoda bir alanı doldurup gönderirken akışı konsolda ve Network sekmesinde adım adım izleyebilirsin.

**İpuçları:** Akış sırası: `input` → `blur` → `submit` → `FormData` → `fetch`.

**Düzeltme:** Düzeltme gerekmez.

**Akılda Kalacak Cümle:** *"Kontrol et, durdur, paketle, gönder, hatayı yakala."*

---

## Hızlı Başvuru Tablosu

| # | Konu | Modül / Alan | Zorluk | Gerçekten Yaşandı | Kilit Kavram |
|---|---|---|:---:|:---:|---|
| 1 | Varsayılan Gönderim Refleksi | HTTP Metotları | ⭐ | | `GET` parametreleri, URL sızıntısı |
| 2 | `required` Niteliği | HTML5 Validation | ⭐ | | `valueMissing` denetimi |
| 3 | Dosya Neden Gitmiyor? | Dosya Yükleme | ⭐ | 🔴 | `multipart/form-data`, `POST` |
| 4 | Hatalı Format Girişi | Constraint API | ⭐ | | `typeMismatch` bayrağı |
| 5 | `placeholder` Semantiği | Form Verisi | ⭐ | | `placeholder` vs `value` |
| 6 | CLI Betiğini Koşturmak | Node.js / Ortam | ⭐ | | `node script.js` çalıştırma |
| 7 | Dosya Filtresi Güvenliği | İstemci Kısıtları | ⭐ | | `accept` yetersizliği, sunucu kontrolü |
| 8 | `valueMissing` Durumu | Constraint API | ⭐ | | Zorunlu alan kontrolü |
| 9 | `dependencies` Tanımı | Paket Yönetimi | ⭐ | | `package.json`, kütüphane bağımlılığı |
| 10 | `<fieldset>` ve `<legend>` | Semantik HTML / a11y | ⭐ | | Erişilebilirlik ve form gruplama |
| 11 | `novalidate` Niteliği | UI / UX Yönetimi | ⭐⭐ | | Tarayıcı balonunu susturma |
| 12 | Regex Kalıbı Kırma | Veri Doğrulama | ⭐⭐ | | `pattern`, `^` ve `$` sınırları |
| 13 | ValidityState Bayrakları | Constraint API | ⭐⭐ | | Doğrulama nesnesi özellikleri |
| 14 | `FormData` Avantajları | Veri Paketleme | ⭐⭐ | | Otomatik serileştirme, ikili yük |
| 15 | `fetch` ile FormData | Ağ / İstek Başlığı | ⭐⭐ | | `boundary` dizesi, başlık ezilmesi |
| 16 | Canlı Payload Ayrıştırma | JavaScript DOM | ⭐⭐ | | `instanceof File`, bayt okuma |
| 17 | `input` vs `blur` | Olay Yönetimi | ⭐⭐ | | Tuş takibi vs alandan çıkış |
| 18 | Sessiz Kalan Hata | DOM Ağacı | ⭐⭐ | 🔴 | Eksik DOM elemanı, sessiz `return` |
| 19 | CommonJS Modül Yükleme | Node.js Ekosistemi | ⭐⭐ | | `require('chalk')` belleğe alma |
| 20 | `invalid` Sınıfı ve CSS | Stil Entegrasyonu | ⭐⭐ | | `classList.add()`, görsel durum |
| 21 | Asenkron Hata Yönetimi | Asenkron JS / HTTP | ⭐⭐⭐ | | `response.ok`, `fetch` yakalama |
| 22 | URL Kodlama ve İkili Veri | Veri Bütünlüğü | ⭐⭐⭐ | | `urlencoded` bozulması |
| 23 | `title` İpucu Desteği | Hata Geri Bildirimi | ⭐⭐⭐ | | `patternMismatch` özel mesajı |
| 24 | İstemci vs Sunucu Güvenliği | Adli Bilişim / Güvenlik | ⭐⭐⭐ | | cURL/Postman baypas, sunucu teyidi |
| 25 | JSON Formatlama Parametresi | JavaScript Standart | ⭐⭐⭐ | | `JSON.stringify` 3. argümanı |
| 26 | `node_modules` ve Git | Sürüm Kontrolü | ⭐⭐⭐ | | `.gitignore`, bağımlılık yönetimi |
| 27 | Multipart Ağ Analizi | Ağ Protokolleri | ⭐⭐⭐ | | `boundary` ayrıştırma |
| 28 | Form Refleksi ve Prevent | Olay Döngüsü | ⭐⭐⭐ | 🔴 | `e.preventDefault()`, sayfa yenilenmesi |
| 29 | GET ile Dosya Yükleme Riski | Ağ Güvenliği | ⭐⭐⭐ | | URL sınırları, proxy sızıntısı |
| 30 | Uçtan Uca Form Mimarisi | Sistem Tasarımı | ⭐⭐⭐ | | Doğrulama ve iletim yaşam döngüsü |