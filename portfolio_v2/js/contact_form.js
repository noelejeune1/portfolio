const EMAILJS_CONFIG = {
    PUBLIC_KEY: '7fWw4-MeNkaoTI6Le',
    SERVICE_ID: 'service_1sh107f',
    TEMPLATE_ID: 'template_d35a1td'
};

// Anti-spam : délai minimum entre deux envois (ms)
const RATE_LIMIT_MS = 60000;

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    // Initialize EmailJS with public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Honeypot check : si rempli, c'est un bot
            const honeypot = document.getElementById('honeypot');
            if (honeypot && honeypot.value !== '') {
                // Simuler un succès pour ne pas alerter le bot
                showNotification('Message envoyé !', 'Votre message a été envoyé avec succès.', 'success');
                form.reset();
                return;
            }

            // Rate limiting : empêcher les envois multiples rapides
            const lastSent = localStorage.getItem('contact_last_sent');
            if (lastSent && Date.now() - parseInt(lastSent, 10) < RATE_LIMIT_MS) {
                const remaining = Math.ceil((RATE_LIMIT_MS - (Date.now() - parseInt(lastSent, 10))) / 1000);
                showNotification(
                    'Trop rapide !',
                    `Veuillez patienter ${remaining} secondes avant de renvoyer un message.`,
                    'error'
                );
                return;
            }

            const formData = new FormData(form);
            const templateParams = {
                from_email: formData.get('email').trim(),
                title: formData.get('subject').trim(),
                message: formData.get('message').trim(),
                to_email: 'noe.lejeune3@gmail.com'
            };

            // Validation basique côté client
            if (!templateParams.from_email || !templateParams.title || !templateParams.message) {
                showNotification('Champs manquants', 'Veuillez remplir tous les champs.', 'error');
                return;
            }

            try {
                const response = await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams
                );

                console.log('Email sent successfully:', response);

                // Enregistrer l'heure d'envoi pour le rate limiting
                localStorage.setItem('contact_last_sent', Date.now().toString());

                showNotification(
                    'Message envoyé !',
                    'Votre message a été envoyé avec succès. Redirection en cours...',
                    'success'
                );

                form.reset();

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);

            } catch (error) {
                console.error('Email sending failed:', error);
                showNotification(
                    'Erreur',
                    'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.',
                    'error'
                );
            }
        });
    }
});

function showNotification(title, message, type = 'success') {
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icon = type === 'success' ? '✓' : '✕';

    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="this.parentElement.classList.add('hide')">×</button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 5000);
}
