const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#\$%&*?';

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca'); 

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
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
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }

    // CORREÇÃO: Se o alfabeto estiver vazio (nenhuma caixa marcada), limpa o campo e não executa o loop
    if (alfabeto.length === 0) {
        campoSenha.value = 'Selecione uma opção';
        classificaSenha(0);
        return; // Para a execução do código aqui
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

function classificaSenha(tamanhoAlfabeto) {
    // Se o tamanho do alfabeto for 0, a entropia também deve ser 0 para evitar o NaN
    let entropia = tamanhoAlfabeto > 0 ? tamanhoSenha * Math.log2(tamanhoAlfabeto) : 0;
    console.log(entropia);

    forcaSenha.classList.remove('fraca', 'media', 'forte');

    // CORREÇÃO: Se a entropia for 0 (sem opções marcadas), remove todas as cores da barra
    if (entropia === 0) {
        // Nenhuma classe de força é adicionada
    } else if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }

    const valorEntropia = document.querySelector('.entropia');
    if (entropia === 0) {
        valorEntropia.textContent = "Selecione pelo menos um tipo de caractere.";
    } else {
        valorEntropia.textContent = `Um computador pode levar até ${Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24))} dias para descobrir essa senha.`;
    }
}
