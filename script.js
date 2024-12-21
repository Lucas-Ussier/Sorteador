let numbers = {
    'B': [],
    'I': [],
    'N': [],
    'G': [],
    'O': []
}
let pedraMaior = []
var canSort = true;

//index
window.onload = () => {
    const dadoSimulator = document.querySelector('#dadoSimulator');

    if(dadoSimulator) {
        if(!dadoSimulator.classList.contains('disabled')) {
            dadoSimulator.setAttribute('href', "roladordedados/roladordedados.html");
        }  
    } 
}

function testarTabelaDeBingo(){
    for (let index = 1; index <= 76; index++) {
        const category = getBingoCategory(index);
        adicionarNaTabela(index)
        if (category != 'Invalid'){
            if (!numbers[category].includes(index)) {
                numbers[category].push(index)
                resultado.classList.remove('show')
                resultado.innerHTML = `Todos`
                adicionarNaTabela(index)
            }else{
                sortear()
            }
        }
    }
}

function sortear() {
    if (numbers.B.length === 15 && numbers.I.length === 15 && numbers.N.length === 15 && numbers.G.length === 15 && numbers.O.length === 15) {
        alert('Todos os números foram sorteados!')
        canSort = false;
        sortearButton.disabled = false;
    }
    const inicio = Number(document.querySelector('#inicio').value)
    const fim = Number(document.querySelector('#fim').value)
    const resultado = document.querySelector('#resultado')
    const sortearButton = document.querySelector('#sortearButton');

    sortearButton.disabled = true;
    
    if (inicio == '' || fim == '') {
        alert('[ERRO] Faltam dados!')
        return
    }

    if (inicio > fim) {
        alert('[ERRO] O valor inicial deve ser menor que o valor final!')
        return
    }

    const numero = gerarNumeroAleatorio(inicio, fim)
    const category = getBingoCategory(numero);

    if (category != 'Invalid'){
        if (!numbers[category].includes(numero)) {
            numbers[category].push(numero)
            resultado.classList.remove('show')
            resultado.innerHTML = `Número Sorteado: ${category}`
            setTimeout(() => {
                resultado.innerHTML += ` - ${numero}`
                adicionarNaTabela(numero)
                sortearButton.disabled = false;
            }, 1000);
        }else{
            if (canSort) {
                sortear()
            }
        }
    }
}

function gerarNumeroAleatorio(inicio, fim){
    return Math.floor(Math.random() * ((fim + 1) - inicio)) + inicio
}

function adicionarNaTabela(number) {
    const category = getBingoCategory(number);
    if (category !== 'Invalid') {
        const columnElement = document.getElementById(category);
        const numberElement = document.createElement('div');
        numberElement.textContent = number;
        columnElement.appendChild(numberElement);
        ordenar();
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
  const columns = ['B', 'I', 'N', 'G', 'O'];
  const result = document.querySelector('#resultado');

  numbers = {
    'B': [],
    'I': [],
    'N': [],
    'G': [],
    'O': []
  };

  columns.forEach(column => {
    const columnElement = document.getElementById(column);
    columnElement.innerHTML = '';
  });

  result.classList.add('show');
  result.innerHTML = '';
}

function mostrarPedraMaior(){
    document.querySelector('.pedraMaior').style.display = 'block'
}

function sortearPedraMaior(){
    const pedra = document.querySelector('#pedra').value
    const resultado = document.querySelector('.result')
    var timer = 1000
    let i = 0

    if (pedra.value == '') {
        alert('[ERRO] Faltam dados!')
        return
    }
    
    if (pedraMaior.length > 0) {
        resultado.innerHTML = ''
        pedraMaior = []
    }

    for (let index = 0; index < pedra; index++) {
        const number = gerarNumeroAleatorio(1,50)
        if (!pedraMaior.includes(number)) {
            pedraMaior.push(number)
        }
    }

    const exibirProximoNumero = () => {
        if (i < pedraMaior.length) {
            resultado.innerHTML += ` <p> ${i + 1} - ${pedraMaior[i]}</p>`
            i++;
            setTimeout(exibirProximoNumero, timer);
        }
    }
    exibirProximoNumero()
}

function finalizarPedraMaior(){
    document.querySelector('.pedraMaior').style.display = 'none'
    document.querySelector('.result').innerHTML = ''
    document.querySelector('#pedra').value = '2'
    pedraMaior = []
}

function ordenar() {
    const columns = ['B', 'I', 'N', 'G', 'O'];

    columns.forEach(column => {
        const columnElement = document.getElementById(column);
        columnElement.innerHTML = '';
        numbers[column].sort((a, b) => a - b).forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.textContent = number;
            columnElement.appendChild(numberElement);
        })
    });
}

//ROLADOR DE DADOS

function rolarDado(dado) {
    const quantidade = document.querySelector('#quantidade').value
    const result = document.querySelector('.result')
    let total = 0
    result.innerHTML = ''

    if (quantidade == '' || quantidade == 0 || quantidade < 0) {
        alert('[ERRO] Coloque uma quantidade de dados para continuar!')
        return
    }
    
    for (let index = 0; index < quantidade; index++) {
        const number = gerarNumeroAleatorio(1, dado)
        total += number
        criarDado(number)
    }
    
    document.querySelector('.total').textContent = `Total: ${total.toString().padStart(3, '0')}`

}

function criarDado(number){
    const dado = document.createElement('div')
    const result = document.querySelector('.result')

    dado.classList.add('dado')
    dado.classList.add('rolling')

    setDadoStyle(dado)

    setTimeout(() => {
        dado.classList.remove('rolling')
        dado.textContent = number.toString().padStart(2, '0');
    }, 1000);

    result.appendChild(dado)    
}

function setDadoStyle(dado){
    dado.style.border = '2px solid #000'
    dado.style.padding = '10px'
    dado.style.borderRadius = '10px'
    dado.style.display = 'inline'
    dado.style.backgroundColor = 'var(--secondary-color)'
    dado.style.color = 'var(--dark-font-color)'
    dado.style.fontSize = 'var(--font-size)'
    dado.style.margin = '10px'
}
    