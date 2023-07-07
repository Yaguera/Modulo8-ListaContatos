const form = document.getElementById('formulario');
const botao = document.getElementById('botao')
const inputNome = document.getElementById('nome-contato');
const nomes = [];
const numeros = [];
let check = [];
let linhas = '';
let checkboxes = document.getElementsByName("celular");
const apagar = document.getElementById("apagar")
const inputNumero = document.getElementById('numero-contato');
let formIsValid = false

form.addEventListener('submit', function (e) {
    e.preventDefault();
    validarNumero()
})

function adicionarLinha() {
    const inputNumero = document.getElementById('numero-contato');

    if (numeros.includes(inputNumero.value)) {
        alert(`O numero: ${inputNumero.value} já foi salvo`);
    } else {
        pegarValores();
        nomes.push(inputNome.value);
        numeros.push(inputNumero.value);
        let linha = '<tr>';
        linha += `<td>${inputNome.value}</td>`;
        linha += `<td>${inputNumero.value}</td>`;
        linha += `<td>${check.length == 2 ? 'Whatsapp & Ligação' : check[0]}</td>`;
        linha += '</tr>'
        linhas += linha
    }
    inputNome.value = '';
    inputNumero.value = '';
    check = [];
}

function pegarValores() {
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            console.log(`Foi selecionado ${checkboxes[i].value}`)
            check.push(checkboxes[i].value);
            checkboxes[i].checked = false;
        }
    }
    console.log(check)
}

function atualizarTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}



function atualizarQuantidade() {
    const quantidadeTotal = nomes.length;
    document.getElementById('totalContatos').innerHTML = quantidadeTotal;
    if (quantidadeTotal >= 1) {
        apagar.style.display = 'inline-flex';
    } else {
        apagar.style.display = 'none';
    }
}


inputNumero.addEventListener('input', function (e) {
    const phoneNumber = e.target.value.replace(/\D/g, '');
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    e.target.value = formattedPhoneNumber;
});


apagar.addEventListener('click', function () {
    apagarLinhas();
    atualizarQuantidade();
});

function apagarLinhas() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = '';
    linhas = '';
    nomes.length = 0;
    numeros.length = 0;
}

function formatPhoneNumber(phoneNumber) {
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength === 10) {
        const ddd = phoneNumber.substring(0, 2);
        const firstPart = phoneNumber.substring(2, 6);
        const secondPart = phoneNumber.substring(6, 10);
        return `(${ddd}) ${firstPart}-${secondPart}`;
    } else if (phoneNumberLength <= 2) {
        return `(${phoneNumber})`;
    } else if (phoneNumberLength <= 7) {
        const ddd = phoneNumber.substring(0, 2);
        const firstPart = phoneNumber.substring(2, phoneNumberLength);
        return `(${ddd}) ${firstPart}`;
    } else if (phoneNumberLength <= 11) {
        const ddd = phoneNumber.substring(0, 2);
        const firstPart = phoneNumber.substring(2, 7);
        const secondPart = phoneNumber.substring(7, phoneNumberLength);
        return `(${ddd}) ${firstPart}-${secondPart}`;
    } else {
        return phoneNumber.substring(0, 14);
    }
}




botao.addEventListener('click', function () {
    const numero = inputNumero.value;
    if (validarNumero(numero)) {
        // O número é válido, continuar com as ações desejadas
        adicionarLinha();
        atualizarTabela();
        atualizarQuantidade();
        inputNumero.value = '';
    } else {
        // O número é inválido, exibir mensagem de erro
        alert('Digite um número válido.');
    }
});

function validarNumero(numero) {
    const numeroLimpo = numero.replace(/\D/g, ''); // Remove caracteres não numéricos
    return numeroLimpo.length >= 10;
}