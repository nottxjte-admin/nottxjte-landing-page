document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.getElementById('nav-list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('active');
    });
  }
  // Contact form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');

    const showError = (input, message) => {
      const errorDiv = document.getElementById(`${input.id}-error`);
      input.classList.add('invalid');
      input.classList.remove('valid');
      input.setAttribute('aria-invalid', 'true');
      if (errorDiv) {
        errorDiv.textContent = message;
      }
    };

    const showSuccess = (input) => {
      const errorDiv = document.getElementById(`${input.id}-error`);
      input.classList.remove('invalid');
      input.classList.add('valid');
      input.setAttribute('aria-invalid', 'false');
      if (errorDiv) {
        errorDiv.textContent = '';
      }
    };

    const validateInput = (input) => {
      if (input.validity.valueMissing) {
        showError(input, `${input.previousElementSibling.textContent} is required.`);
        return false;
      }

      if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          showError(input, 'Please enter a valid email address.');
          return false;
        }
      }

      showSuccess(input);
      return true;
    };

    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateInput(input);
      });
      
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          validateInput(input);
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      inputs.forEach(input => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });

      if (isValid) {
        // Create or get message container
        let msgDiv = document.getElementById('submit-message');
        if (!msgDiv) {
          msgDiv = document.createElement('div');
          msgDiv.id = 'submit-message';
          msgDiv.className = 'submit-message';
          contactForm.appendChild(msgDiv);
        }
        
        // Mock successful submission
        msgDiv.textContent = 'Thank you! Your message has been sent.';
        msgDiv.classList.add('success');
        contactForm.reset();
        inputs.forEach(input => {
          input.classList.remove('valid');
          input.removeAttribute('aria-invalid');
        });
        
        setTimeout(() => {
          msgDiv.textContent = '';
          msgDiv.classList.remove('success');
        }, 5000);
      }
    });
  }
});
