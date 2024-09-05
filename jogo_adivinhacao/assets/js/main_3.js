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

let mensagemDica1 = '';
let mensagemDica2 = '';
let mensagemFinal = `Deseja jogar novamente? 
<form id="question" method="POST">
<button type="question" onclick="location.reload()">Sim</button>
</form>`;

let removerParagrafo = undefined;

function removeFormulario(){
  removerFormulario = document.getElementById('formulario');
  removerFormulario.remove();
}

////////////////////////////////////////////////////////////

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const inputNumero = e.target.querySelector('#numero');
  const numero = Number(inputNumero.value);
  
  if(!numero)
  {
    setResultado(`${contTentativa}ª tentativa: <b>Número inválido!</b>`, false);
    contTentativa = contTentativa+1;
    numerosJogados.push(' X');
    return;
  }

  capTentativas.innerHTML = `Você tem <b>${Number(tentativas=(tentativas)-1)}</b> tentativa(s).`;

  numerosJogados.push(' ' + numero);

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
    setResultado(`<h2>VOCÊ PERDEU!</h2>`, false);
    setResultado(`O número era o <b>'${numeroAleatorio}'</b>`, false);
    setResultado(`${mensagemFinal}`, true);
    removeFormulario();
  }

});

function verificaNumero(numero) {

  if(numero === numeroAleatorio)
  {
    mensagemDica1 = `Parabéns! Você acertou! O número era <b>${numero}</b> mesmo!`;
    mensagemDica2 = mensagemFinal;
    removeFormulario();
  }

  else if(numero > numeroAleatorio)
  {    
    mensagemDica1 = `O número é menor que ${numero}.<br>`;
    
    if((numero-numeroAleatorio) > 30)
    {
      mensagemDica2 = `Você está muito 'frio/longe' do número!`;
    }
    if((numero-numeroAleatorio) > 20 && (numero-numeroAleatorio) < 30)
    {
      mensagemDica2 = `Você está 'próximo/esquentando' do número!`;
    }
    if((numero-numeroAleatorio) > 10 && (numero-numeroAleatorio) < 20)
    {
      mensagemDica2 = `Você está muito 'próximo/quente' do número!`;
    }
    if((numero-numeroAleatorio) > 5 && (numero-numeroAleatorio) < 10)
    {
      mensagemDica2 = `Você está muito 'quase acertando/pegando fogo' do número!`;
    }
  }

  else if(numero < numeroAleatorio)
  {    
    mensagemDica1 = `O número é maior que ${numero}.<br>`;
    
    if((numeroAleatorio-numero) > 30)
    {
      mensagemDica2 = `Você está muito 'frio/longe' do número!`;
    }
    if((numeroAleatorio-numero) > 20 && (numeroAleatorio-numero) < 30)
    {
      mensagemDica2 = `Você está 'próximo/esquentando' do número!`;
    }
    if((numeroAleatorio-numero) > 10 && (numeroAleatorio-numero) < 20)
    {
      mensagemDica2 = `Você está muito 'próximo/quente' do número!`;
    }
    if((numeroAleatorio-numero) > 5 && (numeroAleatorio-numero) < 10)
    {
      mensagemDica2 = `Você está muito 'quase acertando/pegando fogo' do número!`;
    }
  }

}

/*
function removeP()
{
  const r = document.getElementById("p");
  return r.remove();
}
*/

function removerPclass()
{
  removerParagrafo = document.getElementsByClassName('paragrafo-resultado');

  for (let index = 1; index <= removerParagrafo.length-1; index++) 
  {
    removerParagrafo[0].remove();
    console.log(index);
  }
}

function removerParagrafos()
{
//removerParagrafo = document.getElementsByClassName('paragrafo-resultado');
removerParagrafo = document.querySelectorAll('p.paragrafo-resultado');
removerParagrafo.remove();
}

function criaP () 
{
  const p = document.createElement('p');
  return p;
}

function setResultado (msg, isValid) 
{
  const resultado = document.querySelector('#resultado');
  const mensagemDica1 = document.querySelector('#dica1');
  const mensagemDica2 = document.querySelector('#dica2');
  //resultado.innerHTML += `${numero}<br>`;

  if(tentativas === 9)
  {

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

  else{

  removerPclass();

  //const r = removeP();
  const p = criaP();

  if (isValid) {

    //removerPrimeiro = document.getElementsByClassName('paragrafo-resultado');

    //r.classList.remove('paragrafo-resultado');
    p.classList.add('paragrafo-resultado');
  } else {
    //r.classList.remove('bad');
    p.classList.add('bad');
  }

  p.innerHTML = msg;
  resultado.appendChild(p);
  mensagemDica1.appendChild(p);
  mensagemDica2.appendChild(p);
  
  /*
  resultado.removeChild(p);
  mensagemDica2.removeChild(p);
  mensagemDica1.removeChild(p);
  */ 

 }

}
