import { GetDatas } from "./utils.js"

// Initialize AOS (Animate on Scroll)
window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }
});

// Mobile menu toggle
document.querySelector('.mdi-menu').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('extends')
})

const url = 'http://profile.com/app/apis/'

// Load data and render
async function init() {
    try {
        const projectos = await GetDatas(url + "projectos.json")
        const servicos = await GetDatas(url + "services.json")

        // Render Projects
        const projectsGrid = document.querySelector('section.projects>div.grid');
        if (projectos && projectsGrid) {
            projectsGrid.innerHTML = projectos.map((projecto, index) => `
                <div class="card" data-aos="fade-up" data-aos-delay="${index * 100}" data-tilt>
                    <div class="card-header">
                        <img src="${projecto.img}" alt="${projecto.titulo}">
                    </div>
                    <div class="card-body">
                        <h3>${projecto.titulo}</h3>
                        <p>${projecto.descricao}</p>
                        <div class="tec-container">
                            ${projecto.tecnologia.map((tec) => `<span class="tec">${tec}</span>`).join('')}
                        </div>
                        <a href="${projecto.link}" target="_blank" class="mdi mdi-github"> Ver no GitHub</a>
                    </div>
                </div>
            `).join('');
        }

        // Render Services
        const servicesGrid = document.querySelector('section.services>div.grid');
        if (servicos && servicesGrid) {
            servicesGrid.innerHTML = servicos.map((servico, index) => `
                <div class="card" data-aos="zoom-in" data-aos-delay="${index * 100}" data-tilt>
                    <i class="${servico.icon}"></i>
                    <h2>${servico.title}</h2>
                    <p>${servico.description}</p>
                    <a href="#contact">Solicitar Serviço</a>
                </div>
            `).join('');
        }

        // Re-initialize Tilt for dynamic elements
        if (window.VanillaTilt) {
            VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.2
            });
        }

        // Refresh AOS after content injection
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

init();

// Smooth scrolling
function goto(target) {
    const id = target.startsWith('#') ? target.slice(1) : target;
    const target_dom = document.getElementById(id);
    if (target_dom) {
        target_dom.scrollIntoView({ behavior: 'smooth' });
    }
}

const link_navbar = document.querySelectorAll('nav>a');
link_navbar.forEach((link) => {
    link.addEventListener("click", (eve) => {
        eve.preventDefault();
        const href = link.getAttribute('href');
        goto(href);
        document.querySelector('nav').classList.remove('extends');
    });
});

// Contact Form Validation Basics
const contactForm = document.getElementById('formulario');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const messageDiv = document.getElementById('form-message');
        if (messageDiv) {
            messageDiv.textContent = "Processando...";
            messageDiv.style.color = "var(--accent)";
        }
        // Basic validation is handled by HTML 'required' attributes
        // Button animation is handled by CSS hover/active
    });
}
