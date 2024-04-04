	//Сложное задание №9

function clockRefresh() {

const fullDate = new Date();
const dayOfWeek = fullDate.getDay();
const numberOfMonth = fullDate.getMonth() + 1;
const dayOfMonth = fullDate.getDate();
const year = fullDate.getFullYear();
const hours = fullDate.getHours();
const minutes = fullDate.getMinutes();
const seconds = fullDate.getSeconds();

const week = [
 'Воскресенье',
 'Понедельник',
 'Вторник',
 'Среда',
 'Четверг',
 'Пятница',
 'Суббота'
];
const monts = [
 'Января',
 'Февраля',
 'Марта',
 'Апреля',
 'Мая',
 'Июня',
 'Июля',
 'Августа',
 'Сентября',
 'Октября',
 'Ноября',
 'Декабрь'
];

const changeEnding = (digit, endingOne, endingTwo, endingThree) =>{
	let lastDigit = digit % 10;
	if(lastDigit == 1){
		return endingOne;
	} else if (digit == 11 || digit == 12 || digit == 13 || digit == 14) {
		return endingThree;
	} else if (lastDigit == 2 || lastDigit == 3 || lastDigit == 4){
		return endingTwo;
	} else{
		return endingThree;
	}
}

const addZero = (digit) => {
	if ((digit + '').length == 1){
		return digit = '0' + digit;
	}
	return digit
}

const printFullDate = `Сегодня ${week[dayOfWeek]}, ${dayOfMonth} ${monts[numberOfMonth]} ${year} года, ${hours} ${changeEnding(hours, 'час', 'часа', 'часов')} ${minutes} ${changeEnding(minutes, 'минута', 'минуты', 'минут')} ${seconds} ${changeEnding(seconds, 'секунда', 'секунды', 'секунд')}`;

const printShortDate = `${addZero(dayOfMonth)}.${addZero(numberOfMonth)}.${year}-${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;

const div = document.querySelector('.full-time');
const divTwo = document.querySelector('.short-time');

div.innerHTML = printFullDate;
divTwo.innerHTML = printShortDate;
}

setInterval(clockRefresh, 1000);
