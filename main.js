const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#\$%&*?';

// CORREÇÃO: Faltava o ponto (.) para indicar que é uma classe CSS
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');

// CORREÇÃO: Faltava o ponto (.) para indicar a classe da força
const forcaSenha = document.querySelector('.forca'); 

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    // CORREÇÃO: Estava escrito textContect (com c), o correto é textContent
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// CORREÇÃO: Adicionado 'let' no contador do loop for
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    // CORREÇÃO: Estava com vírgula (checkbox[2],checked), o correto é ponto (.)
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
} 

// CORREÇÃO: Faltavam as chaves { } abrindo e fechando a função inteira
function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);

    // CORREÇÃO: Evita erro se o cálculo da entropia der "NaN" (quando nenhuma caixinha está marcada)
    if (isNaN(entropia)) {
        entropia = 0;
    }

    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }

    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = `Um computador pode levar até ${Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24))} dias para descobrir essa senha.`;
}
