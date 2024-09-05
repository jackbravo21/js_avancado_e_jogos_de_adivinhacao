
// Capturar evento de submit do formulário
const form = document.querySelector('#formulario');

let palavraSecreta = 'cachorro';
palavraSecreta = palavraSecreta.toUpperCase();
console.log(`Palavra Secreta: ${palavraSecreta}`);

let arrayPalavraSecreta = palavraSecreta.match(/[a-z-A-Z]/g);
let tamanhoPalavraSecreta = arrayPalavraSecreta.length;
console.log(`Array da Palavra Secreta: ${arrayPalavraSecreta}`);
console.log(arrayPalavraSecreta);
console.log(`Tamanho da Palavra Secreta: ${arrayPalavraSecreta.length}`);
let arrayPontinhos = '';
let pontinhos = undefined;

let capTentativas = document.getElementById('tentativas');
let erros = Number(0);
let tentativas = Number(1);
capTentativas.innerHTML = `<b>${tentativas}ª</b> tentativa.`;

console.log(`Tentativas: ${tentativas}`);
console.log(`Erros: ${erros}`);

let letrasJogadas = [];
let checkLetrasJogadas = [];
let imagem;
let qualImagem;
let imagens;
let verificarNaPalavra;

if(arrayPontinhos !== undefined)
{
  mascararPalavra(arrayPalavraSecreta);
}

if(pontinhos === undefined)
{
pontinhos = arrayPontinhos.match(/[a-z-A-Z-_]/g);
console.log(`Pontinhos: ${pontinhos}`);
}

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
  /*
  let exibirPalavra = document.getElementById('palavra1');
  exibirPalavra.innerHTML = 
  `Palavra com <b>${tamanhoPalavraSecreta}</b> letras:</br>${arrayPalavraSecreta}`;
  */

  let exibirPalavraSecreta = document.getElementById('palavra');
  exibirPalavraSecreta.innerHTML = 
  `Palavra com <b>${tamanhoPalavraSecreta}</b> letras:<p><font size="7">${pontinhos}</p></font>`;
}

///////////////////////////////////////////////////////////

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let inputLetra = e.target.querySelector('#formletra');
  let letra = inputLetra.value;
  letra = letra.toUpperCase();
  
  let buscaLetra = checkLetrasJogadas.find((element) => element === letra);
  console.log(`Buscar letra: ${buscaLetra}`);

  let buscaNaPalavraSecreta = arrayPalavraSecreta.find((element) => element === letra);
  console.log(`Buscar buscaNaPalavraSecreta: ${buscaNaPalavraSecreta}`);
  
  if(buscaNaPalavraSecreta !== letra )
  {
    erros = erros+1;
    console.log("Erros: " + erros);    
  }
  
  if(!letra || letra === '1' || letra === '2' || letra === '3' || letra === '4' || letra === '5' || letra === '6' || letra === '7' || letra === '8' || letra === '9' || letra === '0')
  {
    setAviso(`<b>Letra inválida!</b>`, false);
    return;
  }

  if(letra === buscaLetra && buscaLetra !== undefined)
  {
    setAviso(`Você já tentou a letra <b>'${letra}'</b>`, false);
  }

  if(letra !== buscaLetra)
  {
    letrasJogadas.push(' ' + letra);
    checkLetrasJogadas.push(letra);
      
    setAviso(`Letras jogadas: <b>${letrasJogadas}</b>.`, true);

    for(let i = 0; i < arrayPalavraSecreta.length; i++)
    {
      if(arrayPalavraSecreta[i] === letra)
      {
        arrayPontinhos[i] = arrayPontinhos[i].replace('_', letra);
        pontinhos[i] = pontinhos[i].replace('_', letra);
        console.log(`arrayPontinhos recebeu "${letra}" na posicao "${i}"`);
        console.log(`arrayPontinhos: "${arrayPontinhos}" e pontinhos: "${pontinhos}"`);      
      }
    }

    /*
    let checkLetrasChave = arrayPalavraSecreta.find((element) => element === letra);
    console.log("checkLetrasChave: " + checkLetrasChave);
    
    if(letra === checkLetrasChave)
    {
      console.log("Existe a letra chave: '" + letra + "' e '" + checkLetrasChave + "'");

      letra

    }
    */

    exibeTabela();

  }

  console.log(`Letra Digitada: ${letra}`);
  console.log(`Letras Jogadas: ${letrasJogadas}`);
  console.log(`Check Letras Jogadas: ${checkLetrasJogadas}`);

  capTentativas.innerHTML = `<b>${Number(tentativas=(tentativas)+1)}ª</b> tentativa.`;

  document.getElementById('formletra').value='';

  executaForca();
});

////////////////////////////////////////////////////////////

function criaP () 
{
  const p = document.createElement('p');
  return p;
}

///////////////////////////////////////////////////////////

function removerPclass()
{
  removerParagrafo = document.getElementsByClassName('paragrafo-resultado');
  removerParagrafoBad = document.getElementsByClassName('bad');

  if(removerParagrafoBad !== undefined)
  {
    for (let index = 0; index <= removerParagrafoBad.length-1; index++) 
    {
      removerParagrafoBad[0].remove();
      console.log(`BadParagrafo: ${index}`);
    }
  }
   
  if(removerParagrafo !== undefined && removerParagrafo !== 0)
  {
    for (let index = 1; index <= removerParagrafo.length; index++) 
    {
      removerParagrafo[0].remove();
      console.log(`Pragrafo: ${index}`);
    }
    
  }
}

///////////////////////////////////////////////////////////

function setAviso (msg, isValid) 
{
  const resultado = document.querySelector('#resultado');
  const mensagemDica1 = document.querySelector('#dica1');
  const mensagemDica2 = document.querySelector('#dica2');

  removerPclass();
  const p = criaP();

  if (isValid) {
    p.classList.add('paragrafo-resultado');
  } else {
    p.classList.add('bad');
  }

  p.innerHTML = msg;
  resultado.appendChild(p);
  mensagemDica1.appendChild(p);
  mensagemDica2.appendChild(p);
  
}

////////////////////////////////////////////////////////////