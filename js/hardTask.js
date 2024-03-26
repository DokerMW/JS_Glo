// Сложное задание №1

const num = 266219;
const numMult =  num.toString().split('').reduce((acc, item) => acc = acc * item);

console.log(numMult);

const degree = numMult ** 3;

console.log(degree);
console.log(+(degree.toString().substring(0 , 2)));

// Сложное задание №2

let lang = 'ru';
const date = new Date();
const numberDay = date.getDay();

const weekRu = [
	'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];
const weekEng = [
	'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

//Вывод дня недели с помощью if else
if (lang == 'ru'){
	console.log(weekRu[numberDay]);
} else if (lang = 'en'){
	console.log(weekEng[numberDay]);
}

//Вывод дня недели с помощью switch
switch (lang){
	case 'ru':
		console.log(weekRu[numberDay]);
		break;
	case 'en':
		console.log(weekEng[numberDay]);
		break;
}

//Вывод дня недели через множественный массив
const weekArray = [
	['ru', 
		weekRu
	],
	['en', 
		weekEng
	]
];

const currentLang = weekArray.filter(function (e) {
  return e.indexOf(!lang)
});

console.log(currentLang[0][1][numberDay]);

// Сложное задание №3
let namePerson = 'Сергей';

namePerson == 'Артем' 
	? console.log('Директор') 
	: namePerson == 'Александр' 
	? console.log('Преподаватель') 
	: console.log('Студент');

//Сложное задание №4

const checkOnString = (param) => {
	if(typeof param != 'string'){
		return 'Это не строка!'
	}
	if(param.length > 30) {
		param = param.substring(0, 30) + '...';
	}
	return param.trim()
}

console.log(checkOnString('Lorem ipsum dolor sit amet consectetur'));
