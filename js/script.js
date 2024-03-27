let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 15;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function (num) {
	return !isNaN(parseFloat(num)) && isFinite(num) && /^\S+$/.test(num);
}

const asking = function () {
	title = prompt("Как называется ваш проект?");
	screens = prompt("Какие типы экранов нужно разработать?").toLowerCase().split(/[\s,]+/);

	do {
		screenPrice = prompt("Сколько будет стоить данная работа?");
	} while (!isNumber(screenPrice))

	adaptive = confirm("Нужен ли адаптив на сайте?");
}

const getAllServicePrices = function () {
	let sum;

	for (let i = 0; i < 2; i++){
		if (i === 0){
			service1 = prompt("Какой дополнительный тип услуги нужен?");
		} else if (i === 1){
			service2 = prompt("Какой дополнительный тип услуги нужен?");
		}
		
		do {
			sum = prompt("Сколько это будет стоить?");
		} while (!isNumber(sum))
	}
	return sum;
}

const showTypeOf = function (variable) {
	console.log(variable, typeof variable);
}

const getFullPrice = function () {
	return +screenPrice + +allServicePrices;
}

const getServicePercentPrice = function () {
	return fullPrice - (fullPrice * (rollback / 100));
}

const getTitle = function () {
	return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase();
}

const getRollbackMessage = (price) => {
	switch (true){
		case 0 <= price && price <= 15000:
			return 'Скидка не предусмотрена!';
		case 15000 < price && price < 30000:
			return 'Скидка 5%!';
		case price > 30000:
			return 'Скидка 10%!';
		case price < 0:
			return 'Что то пошло не так';
	}
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = Math.ceil(getServicePercentPrice());
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(screens.length);
console.log(servicePercentPrice);

console.log(`Стоимость верстки экранов ${screenPrice} рублей и стоимость разработки сайта ${fullPrice} рублей`);




