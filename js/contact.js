/**
 * Cosmic Explorer - Contact Form JavaScript
 * 
 * Real-time validation layer (Layer 2 of 3).
 * Provides immediate visual feedback as the user types.
 */

document.addEventListener('DOMContentLoaded', () => {
    initContactValidation();
});

function initContactValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
        name: {
            input: document.getElementById('contactName'),
            error: document.getElementById('nameError'),
            validate: (val) => {
                if (!val) return 'Name is required';
                if (val.length < 2) return 'Name must be at least 2 characters';
                if (val.length > 100) return 'Name must be under 100 characters';
                return '';
            }
        },
        email: {
            input: document.getElementById('contactEmail'),
            error: document.getElementById('emailError'),
            validate: (val) => {
                if (!val) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(val)) return 'Please enter a valid email address';
                return '';
            }
        },
        subject: {
            input: document.getElementById('contactSubject'),
            error: document.getElementById('subjectError'),
            validate: (val) => {
                if (!val) return 'Please select a subject';
                return '';
            }
        },
        message: {
            input: document.getElementById('contactMessage'),
            error: document.getElementById('messageError'),
            validate: (val) => {
                if (!val) return 'Message is required';
                if (val.length < 10) return 'Message must be at least 10 characters';
                if (val.length > 2000) return 'Message must be under 2000 characters';
                return '';
            }
        }
    };

    // Real-time validation on blur and input
    Object.keys(fields).forEach(key => {
        const field = fields[key];
        
        field.input.addEventListener('blur', () => {
            validateField(field);
        });

        field.input.addEventListener('input', () => {
            // Only validate if the field was already touched (has an error)
            if (field.error.classList.contains('visible')) {
                validateField(field);
            }
        });
    });

    // Form submit handler
    form.addEventListener('submit', (e) => {
        let hasErrors = false;

        Object.keys(fields).forEach(key => {
            const isValid = validateField(fields[key]);
            if (!isValid) hasErrors = true;
        });

        if (hasErrors) {
            e.preventDefault();
            // Focus on first error field
            const firstError = Object.values(fields).find(f => f.error.classList.contains('visible'));
            if (firstError) firstError.input.focus();
        }
    });
}

/* ---------- Validate a Single Field ---------- */
function validateField(field) {
    const value = field.input.value.trim();
    const errorMsg = field.validate(value);

    if (errorMsg) {
        field.input.classList.remove('valid');
        field.input.classList.add('error');
        field.error.textContent = errorMsg;
        field.error.classList.add('visible');
        return false;
    } else {
        field.input.classList.remove('error');
        field.input.classList.add('valid');
        field.error.textContent = '';
        field.error.classList.remove('visible');
        return true;
    }
}
