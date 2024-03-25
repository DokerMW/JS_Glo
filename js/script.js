const title = "JS_Glo";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 1500;
const rollback = 15;
const fullPrice = 5000;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));

alert("Hello world!");

console.log("Hello console!");
