function relogio() {
  function criaHoraDosSegundos(segundos) {
    const data = new Date(segundos * 1000);
    //formata para a configuracao de data local;
    return data.toLocaleTimeString('pt-BR', {
      hour12: false,
      timeZone: 'UTC'
    });
  }

  const relogio = document.querySelector('.relogio');
  let segundos = 0;
  let timer;

  function iniciaRelogio() {
    timer = setInterval(function() {
      segundos++;
      relogio.innerHTML = criaHoraDosSegundos(segundos);
    }, 1000);
  }

  document.addEventListener('click', function(e) {
    //target diz qual elemento/local eu estou clicando na pagina;
    const el = e.target;

    //contains eh se contem a classe que ele faz o teste, executa o if;

    if (el.classList.contains('zerar')) {
      //pausa o relogio
      clearInterval(timer);
      relogio.innerHTML = '00:00:00';
      //remove a classe css de cor vermelha
      relogio.classList.remove('pausado');
      //zera os segundos;
      segundos = 0;
    }

    if (el.classList.contains('iniciar')) {
      //remove  a classe css de cor vermelha
      relogio.classList.remove('pausado');
      //pausa o relogio
      clearInterval(timer);
      iniciaRelogio();
    }

    if (el.classList.contains('pausar')) {
      //pausa o relogio
      clearInterval(timer);
      //adiciona classe css de cor vermelha
      relogio.classList.add('pausado');
    }
  });
}
relogio();
