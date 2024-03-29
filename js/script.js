const appData = {
	title: '',
	screens: '',
	screenPrice: 0,
	adaptive: true,
	rollback: 15,
	allServicePrices: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	service1: '',
	service2: '',
	asking: function () {
		appData.title = prompt("Как называется ваш проект?");
		appData.screens = prompt("Какие типы экранов нужно разработать?").toLowerCase().split(/[\s,]+/);
	
		do {
			appData.screenPrice = prompt("Сколько будет стоить данная работа?");
		} while (!appData.isNumber(appData.screenPrice))
	
		appData.adaptive = confirm("Нужен ли адаптив на сайте?");
	},
	isNumber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num) && /^\S+$/.test(num);
	},
	getAllServicePrices: function () {
		let sum = 0;
	
		for (let i = 0; i < 2; i++){
			let price = 0;
	
			if (i === 0){
				appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
			} else if (i === 1){
				appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
			}
			
			do {
				price = prompt("Сколько это будет стоить?");
			} while (!appData.isNumber(price));
	
			sum += +price;
		}
		return sum;
	},
	getFullPrice: function () {
		return +appData.screenPrice + appData.allServicePrices;
	},
	getServicePercentPrice: function () {
		return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
	},
	getTitle: function () {
		return appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
	},
	getRollbackMessage: (price) => {
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
	},
	start: () => {
		appData.asking();
		appData.allServicePrices = appData.getAllServicePrices();
		appData.fullPrice = appData.getFullPrice();
		appData.servicePercentPrice = appData.getServicePercentPrice();
		appData.title = appData.getTitle();
	},
	logger: () => {
		console.log(`Название проекта: ${appData.title}`);
		console.log(`Какие экраны нужны: ${appData.screens}`);
		
	}
}

appData.start();

console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);



