const title = "JS_Glo",
screens = "Простые, Сложные, Интерактивные",
screenPrice = 1500,
rollback = 15,
fullPrice = 5000,
adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback/100));

alert("Hello world!");

console.log("Hello console!");
