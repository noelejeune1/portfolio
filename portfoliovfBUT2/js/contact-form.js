// Contact Form Handler with EmailJS and Mac-style Notification

// TODO: Configuration EmailJS
// 1. Créez un compte sur https://www.emailjs.com/
// 2. Créez un service email (Gmail, Outlook, etc.)
// 3. Créez un template avec ces variables:
//    - {{from_email}} : email de l'expéditeur
//    - {{subject}} : sujet du message
//    - {{message}} : contenu du message
// 4. Remplacez les valeurs ci-dessous par vos identifiants
const EMAILJS_CONFIG = {
    PUBLIC_KEY: '7fWw4-MeNkaoTI6Le',      // Votre clé publique EmailJS
    SERVICE_ID: 'service_1sh107f',      // ID de votre service
    TEMPLATE_ID: 'template_d35a1td'     // ID de votre template
};

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const fadeInElements = document.querySelectorAll('.fade-in');

    // Initialize EmailJS with public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }

    // Fade in animation
    setTimeout(() => {
        fadeInElements.forEach(el => el.classList.add('fade-in'));
    }, 100);

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            const templateParams = {
                from_email: formData.get('email'),
                title: formData.get('subject'),
                message: formData.get('message'),
                to_email: 'noe.lejeune3@gmail.com'
            };

            try {
                // Send email using EmailJS
                const response = await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams
                );

                console.log('Email sent successfully:', response);

                // Show success notification
                showNotification(
                    'Message envoyé !',
                    'Votre message a été envoyé avec succès. Redirection en cours...',
                    'success'
                );

                // Reset form
                form.reset();

                // Redirect to home page after 3 seconds
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

// Show Mac-style notification
function showNotification(title, message, type = 'success') {
    // Remove any existing notifications
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }

    // Create notification element
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

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 5000);
}
