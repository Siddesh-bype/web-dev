// Contact form specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initContactValidation();
    initAutoSave();
});

// Contact form initialization
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Add input formatting
    formatNameInputs();
    formatEmailInput();
    formatCompanyInput();
    
    // Add character counter for message
    addMessageCounter();
    
    // Add form auto-save
    initAutoSave();
}

// Format name inputs
function formatNameInputs() {
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    
    [firstNameInput, lastNameInput].forEach(input => {
        if (!input) return;
        
        input.addEventListener('input', function(e) {
            // Capitalize first letter of each word
            let value = e.target.value;
            value = value.replace(/\b\w/g, l => l.toUpperCase());
            e.target.value = value;
        });
        
        input.addEventListener('blur', function(e) {
            // Trim whitespace
            e.target.value = e.target.value.trim();
        });
    });
}

// Format email input
function formatEmailInput() {
    const emailInput = document.getElementById('email');
    if (!emailInput) return;
    
    emailInput.addEventListener('input', function(e) {
        // Convert to lowercase
        e.target.value = e.target.value.toLowerCase();
    });
    
    emailInput.addEventListener('blur', function(e) {
        // Trim whitespace
        e.target.value = e.target.value.trim();
    });
}

// Format company input
function formatCompanyInput() {
    const companyInput = document.getElementById('company');
    if (!companyInput) return;
    
    companyInput.addEventListener('blur', function(e) {
        // Trim whitespace and capitalize properly
        let value = e.target.value.trim();
        value = value.replace(/\b\w/g, l => l.toUpperCase());
        e.target.value = value;
    });
}

// Add message character counter
function addMessageCounter() {
    const messageInput = document.getElementById('message');
    if (!messageInput) return;
    
    // Create counter element
    const counter = document.createElement('div');
    counter.className = 'message-counter';
    counter.style.cssText = `
        font-size: 0.875rem;
        color: var(--text-light);
        text-align: right;
        margin-top: 0.25rem;
    `;
    
    // Insert after message textarea
    messageInput.parentNode.insertBefore(counter, messageInput.nextSibling);
    
    // Update counter on input
    function updateCounter() {
        const length = messageInput.value.length;
        const maxLength = 1000;
        
        counter.textContent = `${length}/${maxLength} characters`;
        
        // Change color based on length
        if (length > maxLength * 0.9) {
            counter.style.color = 'var(--accent-color)';
        } else if (length > maxLength * 0.7) {
            counter.style.color = 'var(--text-secondary)';
        } else {
            counter.style.color = 'var(--text-light)';
        }
    }
    
    messageInput.addEventListener('input', updateCounter);
    updateCounter(); // Initial update
}

// Enhanced contact validation
function initContactValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Add custom validation rules
    const validationRules = {
        'first-name': {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s'-]+$/,
            message: 'Please enter a valid first name (2-50 characters)'
        },
        'last-name': {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s'-]+$/,
            message: 'Please enter a valid last name (2-50 characters)'
        },
        'email': {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        'company': {
            required: false,
            minLength: 2,
            maxLength: 100,
            message: 'Company name must be 2-100 characters'
        },
        'message': {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'Message must be 10-1000 characters'
        }
    };
    
    // Add validation to form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validateForm(form, validationRules)) {
            await submitContactForm(form);
        }
    });
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input, validationRules[input.name] || validationRules[input.id]);
        });
        
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });
}

function validateForm(form, rules) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        const fieldName = input.name || input.id;
        const rule = rules[fieldName];
        
        if (rule && !validateField(input, rule)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field, rule) {
    if (!rule) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    // Get field value
    const value = field.value.trim();
    
    // Required validation
    if (rule.required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Length validation
    if (value && rule.minLength && value.length < rule.minLength) {
        isValid = false;
        errorMessage = rule.message || `Minimum ${rule.minLength} characters required`;
    }
    
    if (value && rule.maxLength && value.length > rule.maxLength) {
        isValid = false;
        errorMessage = rule.message || `Maximum ${rule.maxLength} characters allowed`;
    }
    
    // Pattern validation
    if (value && rule.pattern && !rule.pattern.test(value)) {
        isValid = false;
        errorMessage = rule.message || 'Invalid format';
    }
    
    // Email-specific validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        
        // Check for common email mistakes
        const commonMistakes = [
            'gmail.con', 'yahoo.con', 'hotmail.con',
            'gmailcom', 'yahocom', 'hotmailcom'
        ];
        
        if (commonMistakes.some(mistake => value.includes(mistake))) {
            isValid = false;
            errorMessage = 'Please check your email domain';
        }
    }
    
    // Show/hide error
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.add('error');
    
    // Create or update error message
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    
    // Add shake animation
    field.style.animation = 'shake 0.5s';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Submit contact form
async function submitContactForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Prepare form data
    const contactData = {
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        email: formData.get('email'),
        company: formData.get('company') || '',
        message: formData.get('message'),
        timestamp: new Date().toISOString(),
        source: 'AIForge Website'
    };
    
    try {
        // Submit to backend (replace with actual endpoint)
        const response = await submitToBackend(contactData);
        
        if (response.success) {
            // Show success
            showContactSuccess(form);
            
            // Track conversion
            trackContactSubmission(contactData);
            
            // Clear saved data
            clearSavedFormData();
        } else {
            throw new Error(response.message || 'Submission failed');
        }
        
    } catch (error) {
        console.error('Contact form submission error:', error);
        showContactError(error.message);
    } finally {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

// Submit to backend
async function submitToBackend(data) {
    // Simulate API call - replace with actual endpoint
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() > 0.05) {
                console.log('Contact form submitted:', data);
                resolve({ 
                    success: true, 
                    message: 'Form submitted successfully',
                    id: 'contact_' + Date.now()
                });
            } else {
                reject(new Error('Network error. Please try again.'));
            }
        }, 2000);
    });
}

// Show success message
function showContactSuccess(form) {
    const successMessage = document.getElementById('form-success');
    if (successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            form.style.display = 'block';
            successMessage.style.display = 'none';
            form.reset();
        }, 10000);
    }
    
    showToast('Thank you! Your message has been sent successfully.', 'success');
}

// Show error message
function showContactError(message) {
    showToast(message || 'Failed to send message. Please try again.', 'error');
}

// Track contact submission
function trackContactSubmission(data) {
    // Track in analytics
    if (window.gtag) {
        gtag('event', 'contact_form_submission', {
            'event_category': 'Lead Generation',
            'event_label': data.company || 'Individual'
        });
    }
    
    // Store in localStorage for demo
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({
        ...data,
        id: 'contact_' + Date.now()
    });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
}

// Auto-save functionality
function initAutoSave() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    const saveKey = 'contactFormDraft';
    
    // Load saved data
    loadSavedFormData();
    
    // Save on input
    const saveTimeout = 1000; // Save after 1 second of inactivity
    let saveTimer;
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(saveTimer);
            saveTimer = setTimeout(() => {
                saveFormData();
            }, saveTimeout);
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', () => {
        clearSavedFormData();
    });
    
    function saveFormData() {
        const formData = {};
        inputs.forEach(input => {
            if (input.value.trim()) {
                formData[input.name || input.id] = input.value;
            }
        });
        
        if (Object.keys(formData).length > 0) {
            localStorage.setItem(saveKey, JSON.stringify(formData));
        }
    }
    
    function loadSavedFormData() {
        const savedData = localStorage.getItem(saveKey);
        if (!savedData) return;
        
        try {
            const formData = JSON.parse(savedData);
            inputs.forEach(input => {
                const fieldName = input.name || input.id;
                if (formData[fieldName]) {
                    input.value = formData[fieldName];
                }
            });
            
            // Show notification that data was restored
            showToast('Previous form data restored', 'info');
        } catch (error) {
            console.error('Error loading saved form data:', error);
        }
    }
    
    function clearSavedFormData() {
        localStorage.removeItem(saveKey);
    }
    
    // Expose functions for external use
    window.contactForm = {
        saveFormData,
        loadSavedFormData,
        clearSavedFormData
    };
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);