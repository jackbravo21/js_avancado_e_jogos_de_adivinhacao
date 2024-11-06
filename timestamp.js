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



===========================================================

const now = new Date();

// Obtendo o dia, mês, ano, horas, minutos e segundos
const day = now.getDate();            // Dia do mês (1-31)
const month = now.getMonth() + 1;     // Mês (0-11) - adicionamos 1 para ficar no formato 1-12
const year = now.getFullYear();       // Ano completo (ex: 2023)
const hours = now.getHours();         // Horas (0-23)
const minutes = now.getMinutes();     // Minutos (0-59)
const seconds = now.getSeconds();     // Segundos (0-59)

// Exibindo a data e o horário
console.log(`Data: ${day}/${month}/${year}`);
console.log(`Horário: ${hours}:${minutes}:${seconds}`);

===========================================================

Explicação dos Métodos:

getDate(): Retorna o dia do mês (1-31).
getMonth(): Retorna o mês (0-11). Janeiro é 0, então adicionamos +1 para obter o formato de 1 a 12.
getFullYear(): Retorna o ano completo (exemplo: 2024).
getHours(): Retorna a hora no formato 24 horas (0-23).
getMinutes(): Retorna os minutos (0-59).
getSeconds(): Retorna os segundos (0-59).

Exemplo de Saída Formatada
Se você quiser formatar o horário com dois dígitos, pode usar String.prototype.padStart:

const formattedDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

console.log(`Data: ${formattedDate}`);
console.log(`Horário: ${formattedTime}`);
Esse código garante que, por exemplo, 9 seja exibido como 09.

===========================================================
