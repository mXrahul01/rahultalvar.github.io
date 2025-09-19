// Portfolio Website JavaScript for Rahul Talvar 

// EmailJS Configuration
const EMAIL_CONFIG = {
    SERVICE_ID: 'service_i1jq1n6',
    TEMPLATE_ID: 'template_riultoc',
    PUBLIC_KEY: 'zFp3YoWlEdRF2iWWm'
};

// DOM elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-toggle__icon');
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalBody = document.getElementById('modal-body');
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

// Project data based on Rahul's actual projects
const projects = [
    {
        id: 0,
        title: "Chest X-Ray Disease Prediction",
        description: "Developed a deep learning model leveraging Liquid Neural Networks (LNNs) for accurate chest X-ray disease detection with real-time web application integration.",
        category: "Deep Learning",
        tech: ["Python", "Deep Learning", "Liquid Neural Networks", "Flask", "Computer Vision"],
        github: "https://github.com/rahultalvar/chest-xray-detection",
        demo: "https://chest-xray-demo.herokuapp.com",
        features: [
            "94% accuracy (AUC 0.98) for Pneumonia detection",
            "90% accuracy (AUC 0.96) for Lung Opacity classification", 
            "Integrated into real-time Flask web application",
            "Enhanced diagnostic efficiency and patient care"
        ],
        longDescription: "This groundbreaking project implements cutting-edge Liquid Neural Networks (LNNs) for automated chest X-ray analysis. The system achieved exceptional performance with 94% accuracy for Pneumonia detection and 90% accuracy for Lung Opacity classification. The deep learning model was successfully integrated into a real-time Flask web application, enabling healthcare professionals to upload X-ray images and receive instant diagnostic assistance. This project demonstrates advanced skills in computer vision, deep learning architecture design, and medical AI applications."
    },
    {
        id: 1,
        title: "Loan Default Risk Analysis",
        description: "Built a robust predictive model with actionable insights for banking operations using advanced machine learning techniques and data preprocessing.",
        category: "Machine Learning",
        tech: ["Python", "Scikit-learn", "Pandas", "Machine Learning", "Data Preprocessing"],
        github: "https://github.com/rahultalvar/loan-default-analysis",
        demo: "https://loan-analysis-demo.streamlit.app",
        features: [
            "Built robust predictive model for banking operations",
            "Applied advanced data preprocessing techniques",
            "Optimized accuracy through fine-tuned ML algorithms",
            "Provided actionable insights for risk assessment"
        ],
        longDescription: "This comprehensive machine learning project focuses on predicting loan default risk for banking institutions. The project involved extensive data preprocessing, feature engineering, and the implementation of multiple machine learning algorithms. Through careful hyperparameter tuning and model optimization, the system provides banks with reliable risk assessment tools. The solution includes detailed exploratory data analysis, feature importance analysis, and generates actionable insights that help financial institutions make informed lending decisions while minimizing default risk."
    },
    {
        id: 2,
        title: "Uber Data Analysis",
        description: "Performed comprehensive exploratory data analysis and data visualization to uncover key operational patterns and optimization opportunities.",
        category: "Data Analysis",
        tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "EDA", "Tableau"],
        github: "https://github.com/rahultalvar/uber-data-analysis",
        demo: "https://uber-analysis-dashboard.herokuapp.com",
        features: [
            "Performed comprehensive EDA and data visualization",
            "Uncovered key patterns to optimize operations",
            "Created interactive dashboards",
            "Provided business intelligence insights"
        ],
        longDescription: "This extensive data analysis project explores Uber's operational data to uncover valuable business insights. The project includes comprehensive exploratory data analysis (EDA) using Python libraries like Pandas, Matplotlib, and Seaborn. Key findings include peak usage patterns, geographical demand distribution, and seasonal trends. Interactive dashboards were created using Tableau to visualize complex data relationships. The analysis provides actionable recommendations for route optimization, dynamic pricing strategies, and resource allocation, demonstrating strong analytical skills and business acumen."
    }
];

// Global theme state
let currentTheme = 'light';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Rahul Talvar Portfolio...');
    initializeTheme();
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    initializeProjectModals();
    initializeSkillBars();
    showAllProjects();
    initializeCertificationAnimations();
    initializeExperienceAnimations();
});

// Theme functionality - Fixed
function initializeTheme() {
    console.log('Initializing theme...');
    
    // Set initial theme
    currentTheme = 'light';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Theme toggle clicked, current theme:', currentTheme);
            toggleTheme();
        });
        console.log('Theme toggle event listener added');
    } else {
        console.error('Theme toggle button not found');
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    console.log('Switching to theme:', currentTheme);
    
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Force a repaint to ensure theme change is visible
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        console.log('Theme icon updated to:', themeIcon.textContent);
    } else {
        console.error('Theme icon not found');
    }
}

// Navigation functionality - Fixed
function initializeNavigation() {
    console.log('Initializing navigation...');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav toggle clicked');
            if (navMenu) {
                navMenu.classList.add('show');
                navToggle.classList.add('active');
            }
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav close clicked');
            closeNavMenu();
        });
    }
    
    // Close menu when clicking on nav links - Fixed
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            console.log(`Nav link ${index + 1} clicked:`, link.getAttribute('href'));
            closeNavMenu();
            smoothScrollToSection(e);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeNavMenu();
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', throttle(updateHeader, 10));
    
    // Add smooth scrolling to all anchor links - Fixed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            console.log('Anchor link clicked:', anchor.getAttribute('href'));
            smoothScrollToSection(e);
        });
    });
    
    console.log('Navigation initialized with', navLinks.length, 'links');
}

function closeNavMenu() {
    if (navMenu) navMenu.classList.remove('show');
    if (navToggle) navToggle.classList.remove('active');
}

function smoothScrollToSection(e) {
    e.preventDefault();
    
    const target = e.target.closest('a');
    if (!target) return;
    
    const href = target.getAttribute('href');
    console.log('Smooth scrolling to:', href);
    
    if (!href || !href.startsWith('#')) {
        console.log('Invalid href:', href);
        return;
    }
    
    const targetId = href.substring(1);
    const targetSection = document.getElementById(targetId);
    
    console.log('Target section:', targetSection);
    
    if (targetSection) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        console.log('Scrolling to position:', targetPosition);
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    } else {
        console.error('Target section not found:', targetId);
    }
}

function updateHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.style.boxShadow = 'var(--shadow-sm)';
    } else {
        header.style.boxShadow = 'none';
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section is visible
                if (entry.target.closest('.skills')) {
                    animateSkillBars();
                }
                
                // Animate project cards
                if (entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('show');
                    }, 100);
                }
                
                // Animate certification cards
                if (entry.target.classList.contains('certification-card')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe fade-in elements
    const fadeElements = document.querySelectorAll('.project-card, .certification-card, .experience-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;
    
    let skillsAnimated = false;
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkillBars();
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill__progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = width + '%';
                const skill = bar.closest('.skill');
                if (skill) skill.classList.add('animate');
            }
        }, index * 100);
    });
}

// Show all projects initially
function showAllProjects() {
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('show'), 10);
        }, index * 100);
    });
}

// Project modals
function initializeProjectModals() {
    const projectBtns = document.querySelectorAll('.project-card__btn');
    
    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = parseInt(btn.getAttribute('data-project'));
            showProjectModal(projectId);
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeProjectModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
            closeProjectModal();
        }
    });
}

function showProjectModal(projectId) {
    const project = projects[projectId];
    if (!project || !projectModal || !modalBody) return;
    
    const modalContent = `
        <div class="project-modal">
            <div class="project-modal__image" style="background: var(--color-bg-${(projectId % 8) + 1});">
                <span>${getProjectImageText(project.category)}</span>
            </div>
            <div class="project-modal__content">
                <h2 class="project-modal__title">${project.title}</h2>
                <div class="project-modal__tech">
                    ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
                <p class="project-modal__description">${project.longDescription}</p>
                
                <div class="project-modal__features">
                    <h3>Key Achievements:</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-modal__links">
                    <a href="${project.github}" target="_blank" class="btn btn--outline">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 8px;">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View Code
                    </a>
                    <a href="${project.demo}" target="_blank" class="btn btn--primary">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 8px;">
                            <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"/>
                        </svg>
                        Live Demo
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = modalContent;
    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function getProjectImageText(category) {
    const texts = {
        'Deep Learning': 'Medical AI Detection',
        'Machine Learning': 'Banking Analytics', 
        'Data Analysis': 'Data Analytics'
    };
    return texts[category] || 'Project Demo';
}

function closeProjectModal() {
    if (projectModal) {
        projectModal.classList.add('hidden');
    }
    document.body.style.overflow = 'auto';
}

// Contact form
function initializeContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Update field styling and error message
    if (!isValid) {
        field.style.borderColor = 'var(--color-error)';
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    } else {
        field.style.borderColor = 'var(--color-border)';
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    return isValid;
}

function clearFieldError(field) {
    field.style.borderColor = 'var(--color-border)';
    const fieldName = field.getAttribute('name');
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!contactForm || !submitBtn) return;
    
    // Validate all fields
    const inputs = contactForm.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showFormStatus('Please correct the errors above.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    contactForm.classList.add('loading');
    
    // Get form data
    const formData = {
        name: contactForm.querySelector('#name').value,
        email: contactForm.querySelector('#email').value,
        subject: contactForm.querySelector('#subject').value,
        message: contactForm.querySelector('#message').value
    };

// Send email using EmailJS
    emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message
        },
        EMAIL_CONFIG.PUBLIC_KEY
    ).then(function(response) {
        console.log('Email sent successfully:', response);
         // Reset form
        contactForm.reset();
        // Reset button
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        contactForm.classList.remove('loading');
         // Show success message
        showFormStatus('Thank you for reaching out! I\'ll get back to you within 24 hours.', 'success');
    }, function(error) {
        console.error('Email sending failed:', error);
        // Reset button
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        contactForm.classList.remove('loading');
        showFormStatus('Sorry, there was an error sending your message. Please try again.', 'error');
    });

}

function showFormStatus(message, type) {
    if (!formStatus) return;
    
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    // Hide status after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// Initialize certification card animations
function initializeCertificationAnimations() {
    const certificationCards = document.querySelectorAll('.certification-card');
    
    certificationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    certificationCards.forEach(card => observer.observe(card));
}

// Initialize experience card animations
function initializeExperienceAnimations() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    experienceCards.forEach(card => observer.observe(card));
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        showFormStatus,
        toggleTheme,
        showProjectModal,
        closeProjectModal
    };
}
