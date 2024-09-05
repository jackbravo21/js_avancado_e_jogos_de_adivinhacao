const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

//cria o elemento de lista LI;
function criaLi() {
  const li = document.createElement('li');
  return li;
}

//verifica se a tecla ENTER foi pressionada, com algum conteudo, e cria a tarefa;
inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

//limpa o Input apos adicionar;
function limpaInput() {
  //limpa o campo de tarefa, inserindo valor vazio;
  inputTarefa.value = '';
  //volta o cursor para a caixa de texto, para inserir novamente;
  inputTarefa.focus();
}

function criaBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  //botaoApagar.classList.add('apagar');
  //abaixo, setAttribute adiciona um atributo ao botao;  
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    //salva, atualiza a lista, apagando as que foram excluidas;
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    //TRIM tira os espacos da string;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  //convertendo a string em JSON;
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  //salva no localstorage o JSON;
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  //pega o item do localstorage;
  const tarefas = localStorage.getItem('tarefas');
  //parse converte o JSON para array novamente;
  const listaDeTarefas = JSON.parse(tarefas);

  for(let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();
