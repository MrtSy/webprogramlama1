/**
 * Hafta 10 — Takım Ş.B. Mimari
 * Modül: Web Forms & Client-Side Tools Demo
 * Yazar: Mert Özsoy (Rol 1: Canlı Uygulama & Kod)
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mesajFormu');
    const adInput = document.getElementById('adiniz');
    const epostaInput = document.getElementById('eposta');
    const sunucuKoduInput = document.getElementById('sunucuKodu');
    const terminalOutput = document.getElementById('terminalOutput');
    const payloadView = document.getElementById('payloadView');
    const btnGonder = document.getElementById('btnGonder');

    // Input bazlı Constraint Validation kontrolü
    function validateField(input) {
        const errorSpan = input.parentElement.querySelector('.error-msg');
        if (!errorSpan) return true;

        if (input.validity.valid) {
            errorSpan.textContent = '';
            input.classList.remove('invalid');
            input.classList.add('valid');
            return true;
        }

        input.classList.remove('valid');
        input.classList.add('invalid');

        if (input.validity.valueMissing) {
            errorSpan.textContent = 'Bu alan zorunludur.';
        } else if (input.validity.typeMismatch && input.type === 'email') {
            errorSpan.textContent = 'Geçerli bir e-posta adresi giriniz (ad@ornek.com).';
        } else if (input.validity.tooShort) {
            errorSpan.textContent = `En az ${input.minLength} karakter girmelisiniz. (Şu an: ${input.value.length})`;
        } else if (input.validity.patternMismatch) {
            errorSpan.textContent = input.title || 'Format hatası: İstenen kalıba uymuyor.';
        }

        return false;
    }

    // Yazarken ve odaktan çıkarken anlık kontrol
    [adInput, epostaInput, sunucuKoduInput].forEach(input => {
        if (!input) return;
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    // Form submit olayı
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const isAdValid = validateField(adInput);
        const isEpostaValid = validateField(epostaInput);
        const isSunucuValid = validateField(sunucuKoduInput);

        if (!isAdValid || !isEpostaValid || !isSunucuValid) {
            console.warn('[QA Denetimi]: İstemci tarafı doğrulama başarısız.');
            return;
        }

        btnGonder.disabled = true;
        btnGonder.textContent = 'İletiliyor...';

        // FormData oluşturma
        const formData = new FormData(form);
        const payloadObj = {};
        formData.forEach((value, key) => {
            if (value instanceof File) {
                payloadObj[key] = value.name ? `${value.name} (${value.size} bytes)` : 'Dosya seçilmedi';
            } else {
                payloadObj[key] = value;
            }
        });

        // Terminal paneline yazdır
        terminalOutput.hidden = false;
        payloadView.textContent = JSON.stringify(payloadObj, null, 2);

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error(`HTTP Durum Kodu: ${response.status}`);

            const data = await response.json();
            payloadView.textContent += `\n\n// Sunucu Yanıtı (201 Created):\n` + JSON.stringify(data, null, 2);
        } catch (error) {
            payloadView.textContent += `\n\n// Hata:\n${error.message}`;
        } finally {
            btnGonder.disabled = false;
            btnGonder.textContent = 'Operasyonu Başlat (Submit)';
        }
    });
});