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
      const el = e.target;
  
      if (el.classList.contains('zerar')) {
        clearInterval(timer);
        relogio.innerHTML = '00:00:00';
        //classe css de cor vermelha
        relogio.classList.remove('pausado');
        segundos = 0;
      }
  
      if (el.classList.contains('iniciar')) {
        //classe css de cor vermelha
        relogio.classList.remove('pausado');
        clearInterval(timer);
        iniciaRelogio();
      }
  
      if (el.classList.contains('pausar')) {
        clearInterval(timer);
        //classe css de cor vermelha
        relogio.classList.add('pausado');
      }
    });
  }
  relogio();
  