
// Capturar evento de submit do formulário
const form = document.querySelector('#formulario');

const palavraSecreta = 'cachorro';
console.log(`Palavra Secreta: ${palavraSecreta}`);

let arrayPalavraSecreta = palavraSecreta.match(/[a-z-A-Z]/g);
console.log(`Array da Palavra Secreta: ${arrayPalavraSecreta}`);
console.log(arrayPalavraSecreta);
console.log(`Tamanho da Palavra Secreta: ${arrayPalavraSecreta.length}`);
let arrayPontinhos = '';

let capTentativas = document.getElementById('tentativas');
let erros = Number(0);
let tentativas = Number(1);
capTentativas.innerHTML = `<b>${tentativas}ª</b> tentativa(s).`;

console.log(`Tentativas: ${tentativas}`);
console.log(`Erros: ${erros}`);

let letrasJogadas = [];
let checkLetrasJogadas = [];
let imagem;
let qualImagem;
let imagens;

if(arrayPontinhos !== undefined)
{
  mascararPalavra(arrayPalavraSecreta);
}

let pontinhos = arrayPontinhos.match(/[a-z-A-Z-_]/g);
console.log(`Pontinhos: ${pontinhos}`);

executaForca();
exibeTabela();

function executaForca()
{
  atualizaForca(erros);
  console.log(`Imagem padrao: ${imagem}`);
  qualImagem = `<img src="imagens/${imagem}.jpg"></img>`;
  imagens = document.getElementById('forca');
  imagens.innerHTML = qualImagem;
}

function atualizaForca(erros){
  switch (erros) {
    case 0:
      imagem = 'forca1';
      break;
    case 1:
      imagem = 'forca2';
      break;
    case 2:
      imagem = 'forca3';
      break;
    case 3:
      imagem = 'forca4';
      break;
    case 4:
      imagem = 'forca5';
      break;
    case 5:
      imagem = 'forca6';
      break;
    case 6:
      imagem = 'forca7';
      break;
    case 7:
      imagem = 'forca8';
      break;
    case 8:
      imagem = 'ganhou';
      break;
    default:
      imagem = 'forca1';
      break;
  }
}

function mascararPalavra(arrayPalavraSecreta)
{
  for (let i = 0; i < arrayPalavraSecreta.length; i++) 
  {
    arrayPalavraSecreta[i];
    arrayPontinhos += "_ ";
    console.log(`Array Pontinhos: ${arrayPontinhos}`);
  }
}

function exibeTabela()
{
  let exibirPalavra = document.getElementById('palavra1');
  exibirPalavra.innerHTML = 
  `Palavra:</br>${arrayPalavraSecreta}`;
  
  let exibirPalavraSecreta = document.getElementById('palavra');
  exibirPalavraSecreta.innerHTML = 
  `Palavra:</br>${pontinhos}`;
}

///////////////////////////////////////////////////////////

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let inputLetra = e.target.querySelector('#letra');
  let letra = inputLetra.value;
  letrasJogadas.push(' ' + letra);
  checkLetrasJogadas.push(letra);

  console.log(`Letra Digitada: ${letra}`);
  console.log(`Letras Jogadas: ${letrasJogadas}`);
  console.log(`Check Letras Jogadas: ${checkLetrasJogadas}`);

  capTentativas.innerHTML = `<b>${Number(tentativas=(tentativas)+1)}ª</b> tentativa(s).`;

  document.getElementById('letra').value='';
  
  erros = erros+1;
  console.log("Erros: " + erros);

  executaForca();
});

///////////////////////////////////////////////////////////