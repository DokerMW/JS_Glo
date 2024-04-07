const title = document.getElementsByTagName('h1')[0];
const calcBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const addBtn = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback input[type="range"]');
const rangeValue = document.querySelector('.rollback .range-value');
const inputTotal = document.getElementsByClassName('total-input')[0];
const inputTotalCount = document.getElementsByClassName('total-input')[1];
const inputTotalOther = document.getElementsByClassName('total-input')[2];
const inputFullCount = document.getElementsByClassName('total-input')[3];
const inputCountRollback = document.getElementsByClassName('total-input')[4];
let screenBlock = document.querySelectorAll('.screen');

const appData = {
	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	rollback: 0,
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	servicesPercent: {},
	servicesNumber: {},
	screensCount: 0,
	addtitle: () =>{
		document.title = title.textContent;
	},
	addScreens: () => {
		screenBlock = document.querySelectorAll('.screen');

		screenBlock.forEach((e, i) =>{
			const select = e.querySelector('select');
			const input = e.querySelector('input');
			const selectName = select.options[select.selectedIndex].textContent;

			appData.screens.push({
				id: i,
				name: selectName, 
				price: +select.value * +input.value,
				count: input.value
			});
		})
	},
	addScreenBlock: () => {
		const cloneScreen = screenBlock[0].cloneNode(true);

		screenBlock[screenBlock.length - 1].after(cloneScreen);
	},
	addServices: () => {
		percentItems.forEach(e => {
			const check = e.querySelector('input[type=checkbox]');
			const label = e.querySelector('label');
			const input = e.querySelector('input[type=text]');

			if(check.checked){
				appData.servicesPercent[label.textContent] = +input.value;
			}
		});

		numberItems.forEach(e => {
			const check = e.querySelector('input[type=checkbox]');
			const label = e.querySelector('label');
			const input = e.querySelector('input[type=text]');

			if(check.checked){
				appData.servicesNumber[label.textContent] = +input.value;
			}
		});
	},
	addPrices: function(){
		for(let screen of appData.screens){
			appData.screenPrice += +screen.price;
			appData.screensCount += +screen.count;
		}

		for (let key in appData.servicesNumber){
			appData.servicePricesNumber += appData.servicesNumber[key];
		}

		for (let key in appData.servicesPercent){
			appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
		}
		
		appData.fullPrice = +appData.screenPrice + +appData.servicePricesNumber + +appData.servicePricesPercent;
		appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
	},
	showResult: () => {
		inputTotal.value = appData.screenPrice;
		inputTotalOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
		inputFullCount.value = appData.fullPrice;
		inputCountRollback.value =  appData.servicePercentPrice;
		inputTotalCount.value = appData.screensCount;
	},
	getRollback: () => {
		inputRange.addEventListener('input', () => {
			rangeValue.textContent = inputRange.value;
			appData.rollback = inputRange.value;
		});
	},
	start: () => {
		appData.addScreens();
		appData.addServices();
		appData.addPrices();
		appData.showResult();
		appData.clearValues();
		// appData.logger();
	},
	checkNullSelect: () => {
		screenBlock = document.querySelectorAll('.screen');
      const selectValues = [];
			let input;
			screenBlock.forEach(e => {
				const select = e.querySelector('select');
				const indexSelected = select.selectedIndex;
				const option = select.querySelectorAll('option')[indexSelected];
				input = e.querySelector('input');
				selectValues.push(option.value);
				selectValues.push(+input.value);
			})
			if (!selectValues.some(t => !t)){
				appData.start();
			} else{
				alert('Не указан тип экрана или количество!')
			}
	},
	clearValues: () => {
		appData.screens = [];
		appData.screenPrice = 0;
		appData.screensCount = 0;
		appData.servicePricesPercent = 0;
		appData.servicePricesNumber = 0;
		appData.fullPrice = 0;
		appData.servicePercentPrice = 0;
	},
	init: () =>{
		appData.addtitle();
		appData.getRollback();
		calcBtn.addEventListener('click', appData.checkNullSelect);
		addBtn.addEventListener('click', appData.addScreenBlock);
	},
	logger: () => {
		console.log(`Название проекта: ${appData.title}`);
		console.log(appData.screens);
		console.log(appData.services);
		console.log(`Стоимость верстки: ${appData.screenPrice}`);
		console.log(`Стоимость адаптива: ${appData.servicePercentPrice}`);
		console.log(`Стоимость допов: ${appData.servicePricesNumber}`);
		console.log(`Общая стоимость: ${appData.fullPrice}`);
		console.log(`Скидка: ${appData.rollback}%`);
		console.log(`Итоговая стоимость со скидкой: ${appData.servicePercentPrice}`);
	}
}

appData.init();

