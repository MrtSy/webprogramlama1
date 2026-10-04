const form = document.getElementById('ajaxForm');
const sonuc = document.getElementById('sonuc');

form.addEventListener('submit', (e) => {
    // KASITLI HATA: e.preventDefault() unutuldu!
    console.log("Form gönderiliyor...");
    sonuc.textContent = "Kayıt başarılı!";
    // Sayfa anında refresh olacağı için ne konsol logu kalır ne ekrandaki mesaj.
});