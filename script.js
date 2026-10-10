document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Theme Toggle (Dark / Light Mode)
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        const defaultTheme = systemPrefersDark ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', defaultTheme);
        updateThemeIcon(defaultTheme);
    }
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }
    // ----------------------------------------------------------------------
    // 2. Mobile Navigation Toggle
    // ----------------------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    // Close menu when clicking any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    // ----------------------------------------------------------------------
    // 3. Active Nav Link on Scroll
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    function scrollActive() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);
    // ----------------------------------------------------------------------
    // 4. Project Modal Data & Interactivity
    // ----------------------------------------------------------------------
    const projectDetails = {
        project1: {
            title: "Face Recognition Attendance System",
            category: "Artificial Intelligence / OpenCV / Java Logic Integration",
            description: "Developed an automated attendance marking system aimed at replacing traditional manual paper attendance sheets in college classrooms. Uses computer vision and neural face recognition algorithms to identify students and immediately update attendance logs.",
            keyFeatures: [
                "Real-time webcam video stream processing for instant facial identification.",
                "Automated database recording timestamping exact arrival times.",
                "Admin dashboard preview to register new student faces and generate daily attendance reports.",
                "Integrates OpenCV Python algorithms with Java backend processing logic."
            ],
            techStack: ["Java", "Python", "OpenCV", "SQLite", "Tkinter/Web UI"],
            impact: "Eliminates proxy attendance and saves ~10 minutes per lecture hour for CIT Ranchi faculty."
        },
        project2: {
            title: "API Authentication & Login System",
            category: "Web Development / REST API Integration / Security",
            description: "A responsive client-side web application demonstrating robust user login, register, and token management through asynchronous REST API calls. Designed with full form validation and smooth error handling alerts.",
            keyFeatures: [
                "Asynchronous JavaScript (Fetch API) for authenticating credentials with backend services.",
                "JWT Token simulation stored securely in browser session storage.",
                "Real-time form input verification (Email format check, Password strength meter).",
                "Clean glassmorphism design with responsive support for mobile and desktop screens."
            ],
            techStack: ["HTML5", "CSS3", "JavaScript (ES6+)", "REST APIs", "JSON"],
            impact: "Serves as a reusable authentication template for future web application projects."
        },
        project3: {
            title: "Campus Competition Management Portal",
            category: "Web Application / Campus Leadership / Event Planning",
            description: "A centralized web platform engineered to streamline team registrations, schedule announcements, and live leaderboard displays for inter-departmental competitions at CIT Ranchi.",
            keyFeatures: [
                "Online team registration forms with automated confirmation codes.",
                "Interactive timeline showcasing live stage event slots and venue details.",
                "Dynamic announcements banner for instant rule updates and round results.",
                "Optimized layout for high mobile traffic during campus tech fests."
            ],
            techStack: ["HTML5", "CSS3", "JavaScript", "Event Management UI"],
            impact: "Coordinated over 150+ student participants across 5 tech competitions cleanly."
        }
    };
    const projectModal = document.getElementById('project-modal');
    const modalBodyContent = document.getElementById('modal-body-content');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const projectId = trigger.getAttribute('data-project');
            const data = projectDetails[projectId];
            if (data) {
                modalBodyContent.innerHTML = `
                    <h3 class="modal-title">${data.title}</h3>
                    <p class="modal-subtitle">${data.category}</p>
                    <p class="modal-desc">${data.description}</p>
                    
                    <div class="modal-section">
                        <h4>Key Features</h4>
                        <ul>
                            ${data.keyFeatures.map(feat => `<li>${feat}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-section">
                        <h4>Tech Stack Used</h4>
                        <div class="project-tags" style="margin-top: 0.5rem;">
                            ${data.techStack.map(tech => `<span class="tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="modal-section" style="margin-top: 1rem;">
                        <h4>Project Impact</h4>
                        <p class="modal-desc" style="margin-bottom: 0;">${data.impact}</p>
                    </div>
                `;
                projectModal.classList.add('active');
            }
        });
    });
    modalCloseBtn.addEventListener('click', () => {
        projectModal.classList.remove('active');
    });
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
        }
    });
    // ----------------------------------------------------------------------
    // 5. Copy Email to Clipboard
    // ----------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');
    copyEmailBtn.addEventListener('click', () => {
        const textToCopy = emailText.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
            setTimeout(() => {
                copyEmailBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
    // ----------------------------------------------------------------------
    // 6. Contact Form Interactive Handler
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
            
            formStatus.className = 'form-status success';
            formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. Alok will get back to you soon.';
            
            contactForm.reset();
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 1200);
    });
    // ----------------------------------------------------------------------
    // 7. Dynamic Copyright Year
    // ----------------------------------------------------------------------
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
