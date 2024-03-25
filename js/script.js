const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?').toLowerCase().split(/[\s,]+/);
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const adaptive = confirm('Нужен ли адаптив на сайте?');
const servise1 = prompt('Какой дополнительный тип услуги нужен?');
const servisePrice1 = +prompt('Сколько это будет стоить?');
const servise2 = prompt('Какой дополнительный тип услуги нужен?');
const servisePrice2 = +prompt('Сколько это будет стоить?');
const fullPrice = screenPrice + servisePrice1 + servisePrice2;
const rollback = fullPrice * (15 / 100);
const servicePercentPrice = Math.ceil(fullPrice - rollback);

switch (true){
	case 0 <= fullPrice && fullPrice <= 15000:
		console.log('Скидка не предусмотрена!');
		break;
	case 15000 < fullPrice && fullPrice < 30000:
		console.log('Скидка 5%!');
		break;
	case fullPrice > 30000:
		console.log('Скидка 10%!');
		break;
	case fullPrice < 0:
		console.log('Что то пошло не так');
		break;
}

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens);
console.log(`Откат ${rollback}`);
console.log(`Стоимость с вычетом отката ${servicePercentPrice}`);

alert('Hello world!');

console.log('Hello console!');
