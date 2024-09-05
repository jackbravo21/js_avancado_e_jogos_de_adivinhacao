class CalcController {

    constructor() {

        //pesquisar 'audio web api', tambem existe o 'video web api';
        this._audio = new Audio('click.mp3');           //atributo que instancia a biblioteca de audio para chamar o audio;
        this._audioOnOff = false;                       //atributo para ligar ou desligar o audio;
        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");

        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();

    }

    //copia para a area de transferencia (Ctrl+C)
    copyToClipboard() {

        if (navigator.clipboard) {
            navigator.clipboard.writeText(this.displayCalc);
        }

    }

    //cola da area de transferencia (Ctrl+V)
    pasteFromClipboard() {

        //copia o evento 'paste' que o colar;
        document.addEventListener('paste', e => {

            //e recebe um parametro clipboardData, e  o getData vai pegar o texto, do tipo "Text";
            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text);

        });

    }

    initialize() {

        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);

        this.setLastNumberToDisplay();
        this.pasteFromClipboard();

        //vamos procurar o btn-ac para adicionar o evento duplo click (dblclick), para ligar ou desligar o som usando a tecla AC;
        document.querySelectorAll('.btn-ac').forEach(btn => {

            btn.addEventListener('dblclick', e => {

                //chama o atributo para ligar ou desligar o audio;
                this.toggleAudio();

            });

        });

    }

    //ativa a chave de True ou False do audio, se ele esta ligado ou desligado, e liga ou desliga ele;
    toggleAudio() {

        //esse camarada eh o contrario dele mesmo ao ser acessado, se ele eh true, acessa e fica false, e vice-versa;
        this._audioOnOff = !this._audioOnOff;

    }

    //metodo que toca o som de fato, verifica se o atributo eh true e toca o audio;
    playAudio() {

        if (this._audioOnOff) {
            
            //forca ele para voltar ao inicio de tocar o audio, para nao clicar muito rapido e ele nao tocar, assim ele reinicia o audio sempre;
            this._audio.currentTime = 0;
            //vamos tocar o audio, dando um play;
            this._audio.play();

        }

    }

    //verifica os eventos de teclado, verificando quando vc solta a tecla com keyup, com o evento de cada proposta (keyboardEvent);
    initKeyboard() {

        //um eventListener para verificar o keyup, tipo o onclick, soh que do teclado;
        document.addEventListener('keyup', e => {

            //sempre vai ser acionado o evento de audio ao teclar uma tecla, porem soh toca se estiver ligado;
            this.playAudio();

            //vai receber o evento e verificar a key que foi apertada;
            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;
                case 'Enter':
                case '=':
                    this.calc();
                    break;
                case '.':
                case ',':
                    //funcao que adiciona o ponto
                    this.addDot();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    //numero sao exatamente os mesmo, porem fazemos o parseInt deles para converter para numeros msm;
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if (e.ctrlKey) this.copyToClipboard();
                    break;
                
            }

        });

    }

    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });

    }

    clearAll() {

        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();

    }

    clearEntry() {

        this._operation.pop();

        this.setLastNumberToDisplay();

    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    //verifica se eh um operador
    isOperator(value) {

        //vai verificar se eh algum operador, se nao houver nenhum, o index eh -1, se for maior que -1, ou seja, achar um indice, chama o operador do array;
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);

    }

    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        }
    }

    getResult() {

        //faz o calculo do igual, quando vc clica varias vezes no igual, ele executa a ultima operacao, dando join;
        //preciso por um try catch para, e pedir para ele colocar um erro 1 mili segundo depois, no caso eh para vc pedir o resultado, sem enviar 2 entradas para operacao;
        try {
            return eval(this._operation.join(""));
        } catch (e) {
            setTimeout(() => this.setError(), 1);
        }
    }

    calc() {

        let last = '';

        //aqui eh atualizado o lastOperator (ultimo operdaor);
        this._lastOperator = this.getLastItem();

        //verica se a operacao eh menor que 3
        if (this._operation.length < 3) {

            //precisamos de 3 itens para operacao, o primeiro, o operador e o ultimo numero;
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        //verifica se a operacao eh menor que 3
        //guarda a operacao, quando for mais que 3 itens;
        if (this._operation.length > 3) {

            last = this._operation.pop();
            //guarda o ultimo numero, ultimo resultado no caso;
            this._lastNumber = this.getResult();

        } else if (this._operation.length === 3) {

            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        //se o calculo for uma porcentagem, executo o calculo de porcentagem, se nao segue normalmente como deveria;
        if (last === '%') {

            result /= 100;
            this._operation = [result];

        } else {

            this._operation = [result];

            if (last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();

    }

    //por padrao ele sempre vai pegar o ultimo operador, por isso true, se for true ele verifica;
    getLastItem(isOperator = true) {

        let lastItem;

        //verifico todos os itens do array para verificar se eh um operador ou eu achei um numero, fazendo um break;
        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) === isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }

        //se nao encontou operador, lastitem;
        if (!lastItem) {

            //verifica se o ultimo item eh um operador ou numero, se for continua com ultimo numero que tava na memoria;
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        //retorno o ultimo item que estou procurando;
        return lastItem;
    }

    setLastNumberToDisplay() {

        //aqui eu quero soh o numero mesmo;
        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }
    addOperation(value) {

        //verifico se o valor que entrou eh um numero;
        if (isNaN(this.getLastOperation())) {

            //se for um operador, executo o if;
            if (this.isOperator(value)) {

                //se o ultimo for operador, o mesmo troca o operador;
                this.setLastOperation(value);

            //se nao, adiciono um novo numero ao array de numeros;
            } else {
                
                //adiciona a operacao
                this.pushOperation(value);
                this.setLastNumberToDisplay();


            }

        } else {

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                //vai concatenar e substituir a posicao anterior pelo novo numero concatenado, para virar um numero completo, tipo 32 , ao inves de [3, 2];
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                //vai verificar tb no else se o ultimo numero eh um operador ou nao;
                this.setLastNumberToDisplay();

            }

        }

    }

    setError() {

        this.displayCalc = "Error";

    }

    //adiciona o ponto
    addDot() {

        //vamos verificar/pegar a ultima operacao, para ver o que sera feito, sao 3 casos, se o ultimo eh um operador, numero, ou nao existir(undefined);
        let lastOperation = this.getLastOperation();

        //verifica se esta operacao ja possui um ponto, pois ele deve ser unico, se nao tiver um ponto, ele retorna -1, se for maior que -1, ele soh escapa com return, e segue, pois ja tem um ponto;
        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        //conceteno com um '0.' caso nao tenha um numero antes do '.' digitado
        if (this.isOperator(lastOperation) || !lastOperation) {
            this.setLastOperation('0.');
        //se nao for um operador e nem vazio, vai cair no else;
        } else {
            //se ja tiver um numero, ele pega o numero e adiciona o ponto;
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();

    }

    execBtn(value) {

        this.playAudio();

        switch (value) {
            case 'ac':
                this.clearAll();                        //metodo que apaga tudo
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.calc();
                break;
            case 'ponto':
                this.addDot();
                break;
            //se for digitado entre 0 e 9 eu recebo o numero digitado e converto para inteiro;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                //caso nenhuma opcao seja teclada, dispara o error;
                this.setError();
            
        }

    }

    initButtonsEvents() {

        //pegue todas as tags g, filhas de buttons
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        //o forEach vai percorrer e encontrar cada um dos botoes, e para cada botao que ele encontrar, ele vai add esse addEventListener;
        buttons.forEach((btn, index) => {

            //capturo o evento ocorrido, no caso o click e outro evento drag, e o "e" eh quem eu chamo caso precise falar sobre este evento, no caso, vai auto executar; 
            //o this. pq ele esta chamando a nossa propria funcao addEventListener que esta na classe;
            this.addEventListenerAll(btn, 'click drag', e => {

                //extraimos o texto do botao, que eh a classe normalmente;
                let textBtn = btn.className.baseVal.replace("btn-", "");

                //executa a acao desse botao, e a acao eh definida pelo switch que esta chamando;
                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {

                btn.style.cursor = "pointer";

            });

        });

    }

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value) {

        //quero validar e limitar para o valor nao ser maior que 10 numeros, se ultrapassar 10, da um erro;
        if (value.toString().length > 10) {
            //chama o erro da calculado;
            this.setError();
            //se nao for maior que 10, retorna falso e segue o jogo, segue o calculo;
            return false;
        }

        this._displayCalcEl.innerHTML = value;
        
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }

}
