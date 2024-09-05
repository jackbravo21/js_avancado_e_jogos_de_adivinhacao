const btnEnviar   = document.querySelector('.btn-enviar');
const name        = document.querySelector('.input-name');
const lastname    = document.querySelector('.input-lastname');
const age         = document.querySelector('.input-age');
const job         = document.querySelector('.input-job');
const passwd      = document.querySelector('.input-password');

const allRes      = document.querySelector('.all-res');
const resName     = document.querySelector('.res-name');
const resJob      = document.querySelector('.res-job');
const resAge      = document.querySelector('.res-age');
const resPasswd   = document.querySelector('.res-password');

btnEnviar.addEventListener('click', function()
{
	//if(!inputTarefa.value)return;
  
  if(!name.value){
    alert('Voce esqueceu do campo nome!');
    return;
  }

  if(!lastname.value){
    alert('Voce esqueceu do campo sobrenome!');
    return;
  }
  
  if(!age.value){
    alert('Voce esqueceu do campo idade!');
    return;
  }

  if(age.value){
    if(!parseInt(age.value)){
      alert('Você não digitou um número valido na idade!');
      return;
    }
  }

  if(!job.value){
    alert('Voce esqueceu do campo profissão!');
    return;
  }

  if(!passwd.value){
    alert('Voce esqueceu do campo senha!');
    return;
  }

  else{

    console.log(`Seu nome é: ${name.value} ${lastname.value}`);
    console.log(`Sua idade é: ${age.value}`);
    console.log(`Seu emprego é: ${job.value}`);
    console.log(`Sua senha é: ${passwd.value}`);

    resName.innerHTML = `Seu nome é: ${name.value} ${lastname.value}`;
    resAge.innerHTML = `Sua idade é: ${age.value}`;
    resJob.innerHTML = `Seu emprego é: ${job.value}`;
    resPasswd.innerHTML = `Sua senha é: ${passwd.value}`;

  }

});