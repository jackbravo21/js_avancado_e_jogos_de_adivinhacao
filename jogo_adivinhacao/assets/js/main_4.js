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
let removerParagrafoBad = undefined;

function removeFormulario(){
  removerFormulario = document.getElementById('formulario');
  return removerFormulario.remove();
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
    /*
    removerParagrafo = document.getElementsByClassName('paragrafo-resultado');
    console.log(removerParagrafo);
    removerParagrafo[0].remove();
    console.log(removerParagrafo[0].remove());
    console.log("Chegou ate o removedor!");
    

    mensagemFinal;
    console.log(mensagemFinal)
    mensagemDica1 = 
    console.log(mensagemDica1);
    setResultado(`O número era o <b>'${numeroAleatorio}'</b>`, true);
    mensagemDica2 = mensagemFinal;  
    console.log(mensagemDica2);
    console.log("Chegou ate o final!"); 

    removeFormulario();
    mensagemDica1 = `O número era o <b>'${numeroAleatorio}'</b>`;
    let adicionarP = document.getElementsByClassName('paragrafo-resultado');
    adicionarP.document.innerHTML(mensagemFinal);
  */
 
    removeFormulario();
    setResultado(`O número era o <b>'${numeroAleatorio}'</b>`, true);
    setResultado("<h2>VOCÊ PERDEU!</h2>", true);
    setResultado(mensagemFinal, true);

    return;
  }

});

function verificaNumero(numero) {

  console.log(`Numeros Jogados: ${numerosJogados}`);

  if(numero === numeroAleatorio)
  {
    mensagemDica1 = `Parabéns! Você acertou! O número era <b>${numero}</b> mesmo!`;
    mensagemDica2 = mensagemFinal;
    removeFormulario();
  }

  else if(numero > numeroAleatorio)
  {    
    mensagemDica1 = `O número é menor que ${numero}.<br>`;
    
    if((numero-numeroAleatorio) > 30 && tentativas > 1)
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

  else if(numero < numeroAleatorio  && tentativas > 1)
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
   
  if(removerParagrafo !== undefined && removerParagrafo.length === 3)
  {
    for (let index = 1; index <= removerParagrafo.length-1; index++) 
    {
      removerParagrafo[0].remove();
      console.log(`Pragrafo: ${index}`);
    }
  }
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
}
