const appData = {
	title: '',
	screens: '',
	screenPrice: 0,
	adaptive: true,
	rollback: 0,
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
	getRollback: (price) => {
		switch (true){
			case 0 <= price && price <= 15000:
				return appData.rollback = 1;
			case 15000 < price && price < 30000:
				return appData.rollback = 5;
			case price > 30000:
				return appData.rollback = 10;
		}
	},
	start: () => {
		appData.asking();
		appData.allServicePrices = appData.getAllServicePrices();
		appData.fullPrice = appData.getFullPrice();
		appData.getRollback(appData.fullPrice);
		appData.servicePercentPrice = appData.getServicePercentPrice();
		appData.title = appData.getTitle();
		appData.logger();
	},
	logger: () => {
		console.log(`Название проекта: ${appData.title}`);
		console.log(`Какие экраны нужны: ${appData.screens}`);
		console.log(`Стоимость верстки: ${appData.screenPrice}`);
		console.log(`Стоимость дополнительных услуг: ${appData.allServicePrices}`);
		console.log(`Общая стоимость: ${appData.fullPrice}`);
		console.log(`Скидка: ${appData.rollback}%`);
		console.log(`Итоговая стоимость со скидкой: ${appData.servicePercentPrice}`);
	}
}

appData.start();

