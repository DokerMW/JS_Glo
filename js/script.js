'use strict'

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

	addtitle: function(){
		document.title = title.textContent;
	},
	addScreens: function(){
		screenBlock = document.querySelectorAll('.screen');

		screenBlock.forEach((e, i) =>{
			const select = e.querySelector('select');
			const input = e.querySelector('input');
			const selectName = select.options[select.selectedIndex].textContent;

			this.screens.push({
				id: i,
				name: selectName, 
				price: +select.value * +input.value,
				count: input.value
			});
		})
	},
	addScreenBlock: function(){
		const cloneScreen = screenBlock[0].cloneNode(true);

		screenBlock[screenBlock.length - 1].after(cloneScreen);
	},
	addServices: function(){
		percentItems.forEach(e => {
			const check = e.querySelector('input[type=checkbox]');
			const label = e.querySelector('label');
			const input = e.querySelector('input[type=text]');

			if(check.checked){
				this.servicesPercent[label.textContent] = +input.value;
			}
		});

		numberItems.forEach(e => {
			const check = e.querySelector('input[type=checkbox]');
			const label = e.querySelector('label');
			const input = e.querySelector('input[type=text]');

			if(check.checked){
				this.servicesNumber[label.textContent] = +input.value;
			}
		});
	},
	addPrices: function(){
		for(let screen of this.screens){
			this.screenPrice += +screen.price;
			this.screensCount += +screen.count;
		}

		for (let key in this.servicesNumber){
			this.servicePricesNumber += this.servicesNumber[key];
		}
	
		for (let key in this.servicesPercent){
			this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
		}
		
		this.fullPrice = +this.screenPrice + +this.servicePricesNumber + +this.servicePricesPercent;
		this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
	},
	showResult: function() {
		inputTotal.value = this.screenPrice;
		inputTotalOther.value = this.servicePricesPercent + this.servicePricesNumber;
		inputFullCount.value = this.fullPrice;
		inputCountRollback.value =  this.servicePercentPrice;
		inputTotalCount.value = this.screensCount;
	},
	getRollback: function(){
		inputRange.addEventListener('input', () => {
			rangeValue.textContent = `${inputRange.value}%`;
			this.rollback = inputRange.value;
		});
	},
	start: function(){
		this.addScreens();
		this.addServices();
		this.addPrices();
		this.showResult();
		this.logger();
		this.clearValues();
	},
	checkNullSelect: function() {
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
				this.start();
			} else{
				alert('Не указан тип экрана или количество!')
			}
	},
	clearValues: function(){
		this.screens = [];
		this.screenPrice = 0;
		this.screensCount = 0;
		this.servicePricesPercent = 0;
		this.servicePricesNumber = 0;
		this.fullPrice = 0;
		this.servicePercentPrice = 0;
	},
	init: function(){
		this.addtitle();
		this.getRollback();
		calcBtn.addEventListener('click', this.checkNullSelect.bind(this), false);
		addBtn.addEventListener('click', this.addScreenBlock);
	},
	logger: function() {
		// console.log(`Название проекта: ${this.title}`);
		// console.log(this.screens);
		// console.log(this.services);
		// console.log(`Стоимость верстки: ${this.screenPrice}`);
		// console.log(`Стоимость адаптива: ${this.servicePercentPrice}`);
		// console.log(`Стоимость допов: ${this.servicePricesNumber}`);
		// console.log(`Общая стоимость: ${this.fullPrice}`);
		// console.log(`Скидка: ${this.rollback}%`);
		// console.log(`Итоговая стоимость со скидкой: ${this.servicePercentPrice}`);
	}
}

appData.init();

