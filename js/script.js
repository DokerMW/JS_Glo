const appData = {
	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	rollback: 0,
	allServicePrices: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	services: {},
	stringValidate: function(value){
		if(!(/[a-zA-Zа-яА-Я]/).test(value) || value == null || value == ""){
			return false;
		} 
		return true;
	},
	asking: function () {
		do {
			appData.title = prompt("Как называется ваш проект?");
		} while (!appData.stringValidate(appData.title));
		
		for (let i = 0; i < 2; i++){
			let name;
			let price = 0;

			do {
				 name = prompt("Какие типы экранов нужно разработать?");
			} while (!appData.stringValidate(name));

			do {
				price = prompt("Сколько будет стоить данная работа?");
			} while (!appData.isNumber(price));

			appData.screens.push({id: i, name, price});
		}

		for (let i = 0; i < 2; i++){
			let name;
			let price = 0;

			do {
				name = prompt("Какой дополнительный тип услуги нужен?");
		 } while (!appData.stringValidate(name));
			
			do {
				price = prompt("Сколько это будет стоить?");
			} while (!appData.isNumber(price));
	
			appData.services[i] = {name, price: +price};
		}
	
		appData.adaptive = confirm("Нужен ли адаптив на сайте?");
	},
	addPrices: function(){
		appData.screenPrice = appData.screens.reduce((acc, i) => acc + +i.price, 0);
		
		for (let key in appData.services){
			appData.allServicePrices += appData.services[key]['price'];
		}
	},
	isNumber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num) && /^\S+$/.test(num);
	},
	getFullPrice: function () {
		appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
	},
	getServicePercentPrice: function () {
		appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
	},
	getTitle: function () {
		appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
	},
	getRollback: (price) => {
		switch (true){
			case 0 <= price && price <= 15000:
				return appData.rollback = 0;
			case 15000 < price && price < 30000:
				return appData.rollback = 5;
			case price > 30000:
				return appData.rollback = 10;
		}
	},
	
	start: () => {
		appData.asking();
		appData.addPrices();
		appData.getFullPrice();
		appData.getRollback(appData.fullPrice);
		appData.getServicePercentPrice();
		appData.getTitle();
		appData.logger();
	},
	logger: () => {
		console.log(`Название проекта: ${appData.title}`);
		console.log(appData.screens);
		console.log(appData.services);
		console.log(`Стоимость верстки: ${appData.screenPrice}`);
		console.log(`Стоимость дополнительных услуг: ${appData.allServicePrices}`);
		console.log(`Общая стоимость: ${appData.fullPrice}`);
		console.log(`Скидка: ${appData.rollback}%`);
		console.log(`Итоговая стоимость со скидкой: ${appData.servicePercentPrice}`);
	}
}

appData.start();





