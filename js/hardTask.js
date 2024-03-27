//Сложное задание №5

//Вывести из массива в консоль числа начинающиеся на 2 или 4
const arr = ['12', '243', '35', '28', '124', '439', '55'];

arr.forEach(e => {
	if (e[0] == '2' || e[0] == '4' ){
		console.log(`Число из массива начинающееся на 2 или 4: ${e}`);
	}
});

//Вывести в консоль простые числа в диапазоне от 0 до 100
function findPrimeNumber(num) {
	if (num === 1){
		return false;
	}

	for (let i = 2; i < num; i++) {
		if (num % i === 0) {
			return false;
		}
	}
	
	return true;
}

function consoleNumbers(max) {
	for (let i = 1; i <= max; i++) {
			if (findPrimeNumber(i)) {
			console.log(`Делители числа ${i} это: 1 и ${i}`);
			}
	}
}

consoleNumbers(100);

