const num = 266219;

const numMult =  num.toString().split('').reduce((acc, item) => acc = acc * item);

console.log(numMult);

const degree = numMult ** 3;

console.log(degree);
console.log(+(degree.toString().substring(0 , 2)));