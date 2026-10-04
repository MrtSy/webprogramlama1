const input = document.getElementById('sunucuKodu');

input.addEventListener('blur', () => {
    const errorSpan = input.parentElement.querySelector('.error-msg');
    // KASITLI HATA: errorSpan null geleceği için return edip çıkıyor, kullanıcı hatayı göremiyor
    if (!errorSpan) return;

    if (input.validity.patternMismatch) {
        input.classList.add('invalid');
        errorSpan.textContent = 'Format hatalı! Örnek: SRV-1024';
    } else {
        input.classList.remove('invalid');
        errorSpan.textContent = '';
    }
});