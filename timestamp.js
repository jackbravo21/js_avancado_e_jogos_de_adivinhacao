//===================================================================

let dataCompleta    = new Date();
let ano             = new Date().getFullYear();
let mes             = new Date().getMonth();
let date            = new Date().getDate();
let hora            = new Date().getHours();
let minutes         = new Date().getMinutes();
let seconds         = new Date().getSeconds()
let milisegundos    = new Date().getMilliseconds();
let tempo           = new Date().getTime();
let diaSemana       = new Date().getDay();
let agora           = Date.now();

let d   = new Date().getDay();
let m   = new Date().getMonth();
let y   = new Date().getFullYear();
let H   = new Date().getHours();
let M   = new Date().getMinutes();
let S   = new Date().getSeconds();

let dataFinal = d+"/"+m+"/"+y;
let horafinal = H+":"+M+":"+S;

let dayName = new Array("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado");
let mesName = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");

//===================================================================


imc = peso/(alturaEmCm * alturaEmCm);

console.log(imc);

//anoNascimento = 

console.log("Data Completa: ", dataCompleta);
console.log("Ano: ", ano);
console.log("Mes: ", mes);
console.log("Dia: ", date);
console.log("Hora: ", hora);
console.log("Minutos: ", minutes);
console.log("Segundos: ", seconds);
console.log("Milisegundos: ", milisegundos);
console.log("Tempo: ", tempo);
console.log("Dia da Semana: ", diaSemana);
console.log("Agora: ", agora);
console.log("");
console.log(dataFinal);
console.log(horafinal);

console.log(dataFinal + " as " + horafinal);

console.log("");

console.log("Hoje eh "+ dayName[diaSemana] + ", dia " + date + " de " + mesName[mes] + " de " + ano + ".");

console.log("");