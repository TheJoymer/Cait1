// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const captchaText = document.getElementById('captcha-text');
    const refreshCaptcha = document.getElementById('refresh-captcha');
    const successMessage = document.getElementById('success-message');
    const ticketField = document.getElementById('ticket');

    function generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        captchaText.textContent = captcha;
    }

    function validateCaptcha(input) {
        return input === captchaText.textContent;
    }

    function validateTicket(ticket) {
        // Регулярное выражение для проверки билета
        const ticketRegex = /^[A-Z]{2}[aeiouAEIOU]{3}\d{5}[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{4}[A-Z]{1}\d{2}$/;
        return ticketRegex.test(ticket);
    }

    refreshCaptcha.addEventListener('click', generateCaptcha);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const captchaInput = form.captcha.value;
        const ticketInput = ticketField.value;

        if (!validateCaptcha(captchaInput)) {
            alert('Капча введена неверно. Попробуйте еще раз.');
            generateCaptcha();
            return;
        }

        if (!validateTicket(ticketInput)) {
            alert('Номер билета введен неверно.');
            return;
        }

        successMessage.classList.remove('hidden');
        form.reset();
        generateCaptcha();
    });

    generateCaptcha();
});
