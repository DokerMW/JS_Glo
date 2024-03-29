//Сложное задание №7

const date = new Date();
const numberDay = date.getDay();

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

week.forEach((item, index) => {
	const div = document.createElement('div');
	div.innerHTML = item;
	document.body.append(div);

	if (item == 'Суббота' || item == 'Воскресенье'){
		div.style.fontStyle = "italic";
		console.log(`%c${item}`, 'font-style: italic');
	}else if(index == numberDay - 1 ){
		div.style.fontWeight = "bold";
		console.log(`%c${item}`, 'font-weight: bold');
	} else {
		console.log(item);
	}
});
