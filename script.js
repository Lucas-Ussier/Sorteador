let numbers = {
    'B': [],
    'I': [],
    'N': [],
    'G': [],
    'O': []
}
let pedraMaior = []

window.onload = () => {
    limpar()
}

function sortear() {
    const inicio = Number(document.querySelector('#inicio').value)
    const fim = Number(document.querySelector('#fim').value)
    const resultado = document.querySelector('#resultado')
    
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
                aparecerOrdenarBotao();
            }, 1000);
        }else{
            sortear()
        }
    }
}

function shouldShowSortButton() {
    const categories = ['B', 'I', 'N', 'G', 'O'];
    console.log(!categories.some(category => numbers[category].length > 2));
    return !categories.some(category => numbers[category].length > 2);
}

function aparecerOrdenarBotao() {
    const sortButton = document.querySelector('.atualizar');
    if (sortButton) {
        sortButton.classList.toggle('show', shouldShowSortButton());
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
  document.querySelector('.atualizar').classList.add('show');

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
            resultado.innerHTML += ` <p> ${i + 1} - ${pedraMaior[i]} </ br> </p>`
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
    