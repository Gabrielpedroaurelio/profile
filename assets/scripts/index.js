import { GetDatas } from "./utils.js"
document.querySelector('.mdi-menu').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('extends')
})

const projectos = await GetDatas('http://profile.com/app/apis/projectos.json')
console.log(projectos);

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
                        
                    </div>
                </div>
    `

})
