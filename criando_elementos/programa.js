document.body.onload = adcElemento;

function adcElemento()
{
    //cria um novo elemento div;
    var divNova = document.createElement("div");
    //da a ele conteudo;
    var conteudoNovo = document.createTextNode("Ola, cumprimentos!");

    //adicona o nó de texto a nova div criada;
    divNova.appendChild(conteudoNovo);

    //adiciona o novo elemento criado e seu conteudo ao DOM;
    var divAtual = document.getElementById("div1");
    document.body.insertBefore(divNova, divAtual);
}

function addTextNode(text)
{
    const newtext = document.createTextNode(text);
    const p1 = document.getElementById('p1');

    p1.appendChild(newtext);
}


var filho = elemento.appendChild(filho);
//Cria um novo elemento de parágrafo e adiciona-o ao final do documento
var p = document.createElement('p');
document.body.appendChild(p);
