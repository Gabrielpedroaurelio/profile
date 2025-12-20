import { GetDatas } from "./utils.js"
document.querySelector('.mdi-menu').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('extends')
})
 
const url = 'https://gabrielpedroaurelio.github.io/profile/app/apis/'
const projectos = await GetDatas(url + "projectos.json")
console.log(projectos);
const servicos = await GetDatas(url + "services.json")

projectos.map((projecto) => {
    document.querySelector('section.projects>div.grid').innerHTML += `
   <div class="card">
                    <div class="card-header">
                        <img src="${projecto.img}" alt="">
                    </div>
                    <div class="card-body">
                        <h3>${projecto.titulo}</h3>
                        <p>
                            ${projecto.descricao}
                        </p>
                        <a href="${projecto.link}" target="_blank" class="mdi mdi-link">GitHub</a>
                          <div>
                          <h4>Tecnologias</h4>
                    ${projecto.tecnologia.map((tec) => `<span class="tec">${tec}</span>`)}
                    </div>                   
                    </div>
                  
    </div>
    `

})
servicos.map((servico) => {
    document.querySelector('section.services>div.grid').innerHTML += `
    <div class="card">
                    <i class="${servico.icon}"></i>
                    <h2>${servico.title}</h2>
                    <p>${servico.description}</p>
                    <a href="">Solicitar Serviço</a>
                </div>
    `

})
function goto(target) {
    // remove o '#' do id
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
        const href = link.getAttribute('href'); // pega apenas "#home"
        goto(href);
    });
});
