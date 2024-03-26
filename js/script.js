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

const getAllServicePrices = function(price1, price2){
	return price1 + price2;
}

function getFullPrice(price1, price2){
	return price1 + price2;
}

function getTitle(titleVar){
	return titleVar.trim().charAt(0).toUpperCase() + titleVar.slice(1).toLowerCase();
}

const getServicePercentPrices = (price, back) => {
	return price - back;
}

const showTypeOf = (item) => {
	console.log(item, typeof item);
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

const allServicePrices = getAllServicePrices(servisePrice1, servisePrice2);
const servicePercentPrice = Math.ceil(getServicePercentPrices(fullPrice, rollback));

getRollbackMessage(fullPrice)
getFullPrice(screenPrice, allServicePrices);

showTypeOf(title)
showTypeOf(fullPrice)
showTypeOf(adaptive)


console.log(screens);

