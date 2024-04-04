//Сложное задание №9

const fullDate = new Date();
const numberDay = fullDate.getDay();
const dateOfMonth = fullDate.getDate();

const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const monts = [
 'Декабря',
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
 'Ноября'
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

const printFullDate = `Сегодня ${week[numberDay]}, ${dateOfMonth} ${monts[dateOfMonth]} ${fullDate.getFullYear()} года, ${fullDate.getHours()} ${changeEnding(fullDate.getHours(), 'час', 'часа', 'часов')} ${fullDate.getMinutes()} ${changeEnding(fullDate.getMinutes(), 'минута', 'минуты', 'минут')} ${fullDate.getSeconds()} ${changeEnding(fullDate.getSeconds(), 'секунда', 'секунды', 'секунд')}`;

const printShortDate = `${fullDate.toISOString().split('T')[0]} - ${fullDate.toISOString().split('T')[1].slice(0, -5)}`;

const div = document.createElement('div');
const divTwo = document.createElement('div');
	div.innerHTML = printFullDate;
	divTwo.innerHTML = printShortDate;
	document.body.append(div);
	document.body.append(divTwo);