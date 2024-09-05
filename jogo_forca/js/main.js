// Capturar evento de submit do formulário
const form = document.querySelector('#formulario');

let palavraSecreta;

//verifica se ja tem palavra secreta, se nao busca na lista e cria uma;
if(palavraSecreta === undefined)
{
  const tlista = lista.length;
  const numeroAleatorio = parseInt((Math.random()*tlista)-1);
  
  palavraSecreta = lista[numeroAleatorio];
}

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
let letra;
let buscaLetra;
let tamanhoString;

let mensagemDica1 = '';
let mensagemDica2 = '';
let mensagemFinal = `<center>Deseja jogar novamente?</center> 
<form id="question" method="POST">
<button type="question" onclick="location.reload()">Sim</button>
</form>`;

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
      verificaErros();
      break;
    case 1:
      imagem = 'forca2';
      verificaErros();
      break;
    case 2:
      imagem = 'forca3';
      verificaErros();
      break;
    case 3:
      imagem = 'forca4';
      verificaErros();
      break;
    case 4:
      imagem = 'forca5';
      verificaErros();
      break;
    case 5:
      imagem = 'forca6';
      verificaErros();
      break;
    case 6:
      imagem = 'forca7';
      verificaErros();
      break;
    case 7:
      imagem = 'forca8';
      verificaErros();
      break;
    case 8:
      imagem = 'forca8';
      verificaErros();
      break;
    default:
      imagem = 'forca1';
      verificaErros();
      break;
  }
}

function verificaErros()
{  
  if(erros === 7 || erros === 8)
  {
    perdeu();
  }

  let verificaVitoria = pontinhos.find((element) => element === '_');
    
  if(verificaVitoria !== "_")
  {
    ganhou();
  }
}

function ganhou()
{
  removeFormulario();
  mensagemDica1 = `<center><h2 class='ganhou'>Parabéns!</br>Você acertou!</h2></center>`;
  mensagemDica2 = `<center>A palavra era <b>'${palavraSecreta}'</b>!</center>`;
  setFinal(mensagemDica1, mensagemDica2, true);
  setAviso(mensagemFinal, true);
  return;
}

function perdeu()
{
  removeFormulario();
  mensagemDica1 = "<center><h2 class='perdeu'>VOCÊ PERDEU!</h2></center>";
  mensagemDica2 = `<center>A palavra era <b>'${palavraSecreta}'!</b></center>`;
  setFinal(mensagemDica1, mensagemDica2, false);
  setAviso(mensagemFinal, true);
  return;
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
  let exibirPalavraSecreta = document.getElementById('palavra');
  exibirPalavraSecreta.innerHTML = 
  `Palavra com <b>${tamanhoPalavraSecreta}</b> letras:<p><font size="7">${pontinhos}</p></font>`;
}

function removeFormulario()
{
  removerFormulario = document.getElementById('formulario');
  return removerFormulario.remove();
}

///////////////////////////////////////////////////////////

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let inputLetra = e.target.querySelector('#formletra');
  letra = inputLetra.value;
  letra = letra.toUpperCase();
  
  buscaLetra = checkLetrasJogadas.find((element) => element === letra);
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

    exibeTabela();

  }

  console.log(`Letra Digitada: ${letra}`);
  console.log(`Letras Jogadas: ${letrasJogadas}`);
  console.log(`Check Letras Jogadas: ${checkLetrasJogadas}`);

  capTentativas.innerHTML = `<b>${Number(tentativas=(tentativas)+1)}ª</b> tentativa.`;

  document.getElementById('formletra').value='';

  executaForca();
});

///////////////////////////////////////////////////////////

function removerPclass()
{
  removerParagrafo = document.getElementsByClassName('paragrafo-resultado');
  removerParagrafoBad = document.getElementsByClassName('bad');
  tamanhoString = removerParagrafo.length;

  if(removerParagrafoBad !== undefined)
  {
    for (let index = 0; index <= removerParagrafoBad.length-1; index++) 
    {
      removerParagrafoBad[0].remove();
      console.log(`BadParagrafo: ${index}`);
    }
  }
   
  if(removerParagrafo !== undefined && removerParagrafo !== 0 && buscaLetra !== letra)
  {
    for (let index = 1; index <= tamanhoString; index++) 
    {
      removerParagrafo[0].remove();
      console.log(`Pragrafo: ${index}`);
    }
  }
}

////////////////////////////////////////////////////////////

function criaP () 
{
  const p = document.createElement('p');
  return p;
}

///////////////////////////////////////////////////////////

function setAviso (msg, isValid) 
{
  const resultado = document.querySelector('#resultado');


  removerPclass();
  const p = criaP();

  if (isValid) {
    p.classList.add('paragrafo-resultado');
  } else {
    p.classList.add('bad');
  }

  p.innerHTML = msg;
  resultado.appendChild(p);
  
  console.clear();
}

function setFinal(msg1, msg2, isValid)
{
  console.log("chegou aqui no setFinal!")
  let mensagem1 = document.querySelector('#mensagemfinal1');
  let mensagem2 = document.querySelector('#mensagemfinal2');

  const p1 = document.createElement('p');
  const p2 = document.createElement('p');

  if (isValid) {
    p1.classList.add('paragrafo-final');
    p2.classList.add('paragrafo-final');
  } else {
    p1.classList.add('bad-final');
    p2.classList.add('bad-final');
  }
  
  p1.innerHTML = msg1;
  p2.innerHTML = msg2;
  mensagem1.appendChild(p1);
  mensagem2.appendChild(p2);
}

////////////////////////////////////////////////////////////

let tlista = lista.length;
console.log(`Tamanho da lista: ${tlista}`);
