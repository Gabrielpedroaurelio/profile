let form = document.querySelector("form#formulario")
form.addEventListener("submit", async (evento) => {
    evento.preventDefault()
    const formulario = new FormData(form)

    let fomrDado = {}
    for (const dados of formulario) {
        fomrDado[dados[0]] = dados[1]

    }

    const url = "http://profile.com/assets/scripts/form.php"
    //const url = "../php/form.php"
    const option = {
        method: "POST",
        body: formulario
    }
    const requisicao = await fetch(url, option)
        .then((response) => { return response.text() })
        .then((dados) => {
            console.log(dados);
            mostrarMSM(dados)
        })

})
let caixas = [...document.querySelectorAll("dialog")]
function mostrarMSM(msm = "") {

    if (msm == "Salvo com Sucesso") {

        caixas[0].setAttribute("open", "open")
        caixas[1].removeAttribute("open")
        inputs.forEach((input) => {
            input.value = ""

        })
        validar()
    } else {
        caixas[1].setAttribute("open", "open")
        caixas[0].removeAttribute("open")
    }
    setTimeout(() => {
        caixas.forEach((caixa) => {
            caixa.removeAttribute("open")
        })
    }, 5000)

}
// Validações dos campos para impedir o envio de dados nulos ou inexistentes
let inputs = document.querySelectorAll(".input-form")
const submit_btn = document.getElementById("submit")
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        validar()
    })

})
function validar(params) {
    // limpar campos
    let nome = (inputs[0].value).toString()
    let email = (inputs[1].value).toString()
    let assunto = (inputs[2].value).toString()
    let msm = (inputs[3].value).toString()
    nome = nome.trim()
    email = email.trim()
    assunto = assunto.trim()
    msm = msm.trim()
    if (nome == "" || email == "" || assunto == "" || msm == "") {

        submit_btn.classList.remove("expandir")
    }
    else {
        submit_btn.classList.add("expandir")
    }
}
