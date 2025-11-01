// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // Lightbox for gallery
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
    const lightboxImage = document.querySelector('.lightbox-content img');
    if (lightboxBackdrop && lightboxImage) {
        document.querySelectorAll('[data-lightbox]')?.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const href = el.getAttribute('href');
                if (href) {
                    lightboxImage.src = href;
                    lightboxBackdrop.classList.add('active');
                }
            });
        });
        lightboxBackdrop.addEventListener('click', () => {
            lightboxBackdrop.classList.remove('active');
            lightboxImage.src = '';
        });
    }

    // Events filter (simple)
    const eventFilter = document.querySelector('[data-events-filter]');
    if (eventFilter) {
        eventFilter.addEventListener('change', () => {
            const value = eventFilter.value;
            const items = document.querySelectorAll('[data-event-item]');
            const now = new Date();
            items.forEach((item) => {
                const dateStr = item.getAttribute('data-event-date');
                if (!dateStr) return;
                const eventDate = new Date(dateStr);
                const isUpcoming = eventDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
                if (value === 'all') item.removeAttribute('hidden');
                else if (value === 'upcoming') item.toggleAttribute('hidden', !isUpcoming);
                else if (value === 'past') item.toggleAttribute('hidden', isUpcoming);
            });
        });
    }

    // Contact form (Formspree fetch)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        const statusEl = document.querySelector('#contact-status');
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const honeypot = data.get('website');
            if (honeypot) return; // bot
            statusEl.textContent = 'Sending...';
            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: data,
                });
                if (res.ok) {
                    statusEl.textContent = 'Thank you. We will get back to you soon.';
                    form.reset();
                } else {
                    statusEl.textContent = 'Submission failed. Please try again later.';
                }
            } catch (err) {
                statusEl.textContent = 'Network error. Please try again later.';
            }
        });
    }
});


