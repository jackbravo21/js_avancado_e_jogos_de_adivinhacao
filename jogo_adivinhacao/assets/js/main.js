////////////////////////////////////////////////////////////

// Capturar evento de submit do formulário
const form = document.querySelector('#formulario');

////////////////////////////////////////////////////////////

const numeroAleatorio = parseInt(Math.random()*100);

let regra = document.getElementById('regra');
let textoRegra = "<b>Regra:</b> Você deve tentar adivinhar o número que foi gerado aleatóriamente pela máquina entre '1' e '100'.";
regra.innerHTML = textoRegra;

let capTentativas = document.getElementById('tentativas');
let tentativas = Number(10);
capTentativas.innerHTML = `Você tem <b>${tentativas}</b> tentativa(s).`;

let contTentativa = Number(1);

let numerosJogados = [];
let checkNumerosJogados = [];

let mensagemDica1 = '';
let mensagemDica2 = '';
let mensagemFinal = `Deseja jogar novamente? 
<form id="question" method="POST">
<button type="question" onclick="location.reload()">Sim</button>
</form>`;

let removerParagrafo = undefined;
let removerParagrafoBad = undefined;

function removeFormulario(){
  removerFormulario = document.getElementById('formulario');
  return removerFormulario.remove();
}

////////////////////////////////////////////////////////////

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let inputNumero = e.target.querySelector('#numero');
  let numero = Number(inputNumero.value);
  console.log(`Numero Digitado: ${numero}`);

  //limpa o campo apos digitar;
  document.getElementById('numero').value='';

  let buscaNumero = checkNumerosJogados.find((element) => element === numero);
  console.log(`Buscar número: ${buscaNumero}`);
    
  if(numero === buscaNumero && Number(numero))
  {
    setResultado(`Você já tentou o número <b>'${numero}'</b>`, false);
    return;
  };

  if(!numero || numero > 100)
  {
    setResultado(`<b>Número inválido!</b>`, false);
    //Desativei o contador das tentativas de nao numeros;
    //contTentativa = contTentativa+1;
    //numerosJogados.push(' X');
    return;
  }

  capTentativas.innerHTML = `Você tem <b>${Number(tentativas=(tentativas)-1)}</b> tentativa(s).`;

  numerosJogados.push(' ' + numero);
  checkNumerosJogados.push(numero);

  setResultado(`${contTentativa}ª tentativa. Nº: <b>${numerosJogados}</b>.`, true);  
  contTentativa = contTentativa+1;

  if(tentativas > 0)
  {
    verificaNumero(numero);
    setResultado(mensagemDica1, true);
    setResultado(mensagemDica2, true);
  }

  if(tentativas === 0)
  {   
    removeFormulario();
    setResultado("<center><h2 class='perdeu'>VOCÊ PERDEU!</h2></center>", true);
    setResultado(`O número era o <b>'${numeroAleatorio}'</b>`, true);
    setResultado(mensagemFinal, true);
    return;
  }

});

////////////////////////////////////////////////////////////

function verificaNumero(numero) {

  console.log(`Numeros Jogados:${numerosJogados}`);

  if(numero === numeroAleatorio)
  {
    mensagemDica1 = `Parabéns! Você acertou! O número era o <b>${numero}</b> mesmo!`;
    mensagemDica2 = mensagemFinal;
    removeFormulario();
  }

  else if(numero > numeroAleatorio)
  {    
    mensagemDica1 = `O número é menor que ${numero}.<br>`;
    
    if((numero-numeroAleatorio) > 30 && tentativas > 1)
    {
      mensagemDica2 = `Você está muito longe do número!`;
    }
    if((numero-numeroAleatorio) > 20 && (numero-numeroAleatorio) < 30)
    {
      mensagemDica2 = `Você está quase próximo do número!`;
    }
    if((numero-numeroAleatorio) > 10 && (numero-numeroAleatorio) < 20)
    {
      mensagemDica2 = `Você está muito próximo do número!`;
    }
    if((numero-numeroAleatorio) > 5 && (numero-numeroAleatorio) < 10)
    {
      mensagemDica2 = `Você está quase acertando o número!`;
    }
    if((numero-numeroAleatorio) > 0 && (numero-numeroAleatorio) < 4)
    {
      mensagemDica2 = `Você quase acertou o número!`;
    }
  }

  else if(numero < numeroAleatorio  && tentativas > 1)
  {    
    mensagemDica1 = `O número é maior que ${numero}.<br>`;
    
    if((numeroAleatorio-numero) > 30)
    {
      mensagemDica2 = `Você está muito longe do número!`;
    }
    if((numeroAleatorio-numero) > 20 && (numeroAleatorio-numero) < 30)
    {
      mensagemDica2 = `Você está quase próximo do número!`;
    }
    if((numeroAleatorio-numero) > 10 && (numeroAleatorio-numero) < 20)
    {
      mensagemDica2 = `Você está muito próximo do número!`;
    }
    if((numeroAleatorio-numero) > 5 && (numeroAleatorio-numero) < 10)
    {
      mensagemDica2 = `Você está quase acertando o número!`;
    }
    if((numeroAleatorio-numero) > 0 && (numeroAleatorio-numero) < 4)
    {
      mensagemDica2 = `Você quase acertou o número!`;
    }
  }
}

////////////////////////////////////////////////////////////

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
   
  if(removerParagrafo !== undefined && removerParagrafo.length === 3 || removerParagrafo.length > 3)
  {
    for (let index = 1; index <= removerParagrafo.length-1; index++) 
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

////////////////////////////////////////////////////////////

function setResultado (msg, isValid) 
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