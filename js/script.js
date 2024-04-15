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
const cmsCheckBox = document.querySelector('#cms-open');
const cmsVariants = document.querySelector('.hidden-cms-variants');
const cmsOptions = cmsVariants.querySelector('#cms-select').options;
const cmsSelect = cmsVariants.querySelector('#cms-select');
const cmsOtherInput = cmsVariants.querySelector('.main-controls__input');
let controlInputs = document.querySelectorAll('.main-controls input[type="text"]');
let controlSelects = document.querySelectorAll('.main-controls select');
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
	cmsPercent: 0,
	cmsPrice: 0,
	screensCount: 0,
	addedScreens: [],
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
		});
		
	},
	addScreenBlock: function(){
		screenBlock = document.querySelectorAll('.screen');

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
		
		this.cmsPrice =  this.screenPrice * (this.cmsPercent / 100);
		this.fullPrice = +this.screenPrice + +this.servicePricesNumber + +this.servicePricesPercent + +this.cmsPrice;
		this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
	},
	showResult: function() {
		inputTotal.value = this.screenPrice;
		inputTotalOther.value = this.servicePricesPercent + this.servicePricesNumber + this.cmsPrice;
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
		// this.logger();
		this.clearValues();
	},
	checkNullSelect: function() {
		screenBlock = document.querySelectorAll('.screen');
		controlInputs = document.querySelectorAll('.main-controls input[type="text"]');
		controlSelects = document.querySelectorAll('.main-controls select');

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
		if (cmsOtherInput.querySelector('input').value != false){
			this.cmsPercent = +cmsOtherInput.querySelector('input').value;
		}

		if (!selectValues.some(t => !t)){
			this.start();
			calcBtn.style.display = 'none';
			resetBtn.style.display = 'block';
			controlInputs.forEach(e => e.setAttribute("disabled", ""))
			controlSelects.forEach(e => e.setAttribute("disabled", ""))
		} else{
			controlInputs.forEach(e => {
				if(!e.value){
					e.placeholder = 'Не выбрано значение!'
				}
			})
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
	reset:function(){
		controlInputs.forEach(e => e.removeAttribute("disabled", ""))
		controlSelects.forEach(e => e.removeAttribute("disabled", ""))
		calcBtn.style.display = 'block';
		resetBtn.style.display = 'none';
		cmsVariants.style.display = 'none';
		cmsCheckBox.removeAttribute('checked');
		this.clearValues();
		this.showResult();
		screenBlock.forEach((e, i) => {
			if(i != 0){
				e.remove()
			} else {
				const select = e.querySelector('select');
				const input = e.querySelector('input');
				select.selectedIndex = 0;
				input.value = '0'
			}
		})

	},
	cmsOpen: function(){
		if(cmsCheckBox.checked){
			cmsVariants.style.display = 'flex';
		} else {
			cmsVariants.style.display = 'none';
			cmsVariants.querySelector('#cms-select').selectedIndex = 0;
		}

	},
	cmsOther: function(){
		const optionsArr = [...cmsOptions];

		optionsArr.forEach(e => {
				if(e.selected && e.value == 'other'){
					cmsOtherInput.style.display = 'flex'
				} else if(e.selected && typeof +e.value == 'number'){
					this.cmsPercent = +e.value;
				}else {
					cmsOtherInput.style.display = 'none'
				}
			
			})	
			
	},
	init: function(){
		this.addtitle();
		this.getRollback();
		calcBtn.addEventListener('click', this.checkNullSelect.bind(this), false);
		addBtn.addEventListener('click', this.addScreenBlock.bind(this), false);
		resetBtn.addEventListener('click', this.reset.bind(this), false);
		cmsCheckBox.addEventListener('click', this.cmsOpen.bind(this), false);
		cmsSelect.addEventListener('change', this.cmsOther.bind(this), false);
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
