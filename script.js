
let numbers = []

window.onload = () => {
    limpar()
}

function sortear() {
    const inicio = Number(document.querySelector('#inicio').value)
    const fim = Number(document.querySelector('#fim').value)

    const resultado = document.querySelector('#resultado')
    const b = document.querySelector('#b')
    const i = document.querySelector('#i')
    const n = document.querySelector('#n')
    const g = document.querySelector('#g')
    const o = document.querySelector('#o')

    if (inicio == '' || fim == '') {
        alert('[ERRO] Faltam dados!')
        return
    }

    if (inicio > fim) {
        alert('[ERRO] O valor inicial deve ser menor que o valor final!')
        return
    }
    
    let numero = gerarNumeroAleatorio(inicio, fim)

    if (!numbers.includes(numero)) {
        numbers.push(numero)
        resultado.classList.remove('show')
        resultado.innerHTML = `Número Sorteado: ${getBingoCategory(numero)}`
        setTimeout(() => {
            resultado.innerHTML += ` - ${numero}`
            adicionarNaTabela(numero)
        }, 1000);
    }else{
        sortear()
    }
    console.log("NUMERO:",numero, numbers)


}

function gerarNumeroAleatorio(inicio, fim){
    return Math.floor(Math.random() * ((fim + 1) - inicio)) + inicio
}

function adicionarNaTabela(number) {
    const category = getBingoCategory(number);
    console.log(category);
    if (category !== 'Invalid') {
        const columnElement = document.getElementById(category);
        
        // Criar um novo elemento div para o número
        const numberElement = document.createElement('div');
        numberElement.textContent = number;
        
        // Adicionar o novo elemento div ao respectivo coluna
        columnElement.appendChild(numberElement);
    }
}
function getBingoCategory(number) {
    switch (true) {
        case (number >= 1 && number <= 15):
            return 'B';
        case (number >= 16 && number <= 30):
            return 'I';
        case (number >= 31 && number <= 45):
            return 'N';
        case (number >= 46 && number <= 60):
            return 'G';
        case (number >= 61 && number <= 75):
            return 'O';
        default:
            return 'Invalid';
    }
}

function confirmar(){
    let con = confirm("Deseja recolocar as pedras de volta no globo?")

    if (con){
        limpar()
    }
}

function limpar() {
    const b = document.querySelector('#B')
    const i = document.querySelector('#I')
    const n = document.querySelector('#N')
    const g = document.querySelector('#G')
    const o = document.querySelector('#O')
    const resultado = document.querySelector('#resultado')
    resultado.classList.add('show')
    b.innerHTML = ''
    i.innerHTML = ''
    n.innerHTML = ''
    g.innerHTML = ''
    o.innerHTML = ''
    numbers = []
    resultado.innerHTML = ''
}
    