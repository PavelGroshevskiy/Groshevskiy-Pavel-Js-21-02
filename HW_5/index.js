// Домашнее задание: 

// 1. На вход поступает массив, вывести массив, удалив неуникальные значения.

// const arr = [1,3,3,5,8,6,8,9,1,1]

// function unique (arr) {
//   return Array.from(new Set(arr))
// }

// console.log(unique(arr));

// 2. На вход поступает массив, реверсировать значения (подобно методу reverse) метод reverse не использовать.

// const arr = [1,3,3,5,8,6,8,9,1,1]

// for (let i = arr.length - 1; i>=0; i--) {
//   console.log(arr[i]);
// }



// 3. На вход поступает массив, содержащий массивы, в которых хранится два элемента. Преобразовать массив в объект, где ключами являются нулевой индекс вложенныхых массивов, а значениями являются элементы с индексом один.

// const arr = [
//   ["key1","value1"],
//   ["key2","value2"]
// ]

// const obj = arr.reduce((newObj, item) => {
//   newObj[item[0]] = item[1];
//   return newObj;
// }, {});

// console.log(obj);


// 4. На вход поступает объект, вывести сумму числовых свойств объекта.

// let obj = {
//   one: 1,
//   2: 2,
//   third: 3,
//   date: 'date',

// }


// function sum(obj) {
//   let sum = 0;
//   for (let key in obj) {
//     if (typeof obj[key] == 'number') {
//       sum += obj[key];
//     }
//   }
  
//   return sum;
// }


// console.log(sum(obj));


// 5. На вход поступает массив с числами, вывести среднее арифметическое элементов массива.

// const arr = [5,10,15]

// function average(arr) {
//   return arr.reduce((a, b) => (a + b)) / arr.length;
// }

// console.log(average(arr));

// 6. Создать функцию-конструктор для объекта "калькулятор", объект должен иметь поле, хранящее текущее значение и методы сложения, вычитания, умножения и деления, принимающие число и манипулирующий свойством значения в соответствии с назначением метода, а так же функцию, сбрасывающую значение в ноль.

// function Calc (num1,num2) {
//   this.num1 = num1;
//   this.num2 = num2;
//   this.sum = () => {
//     console.log (this.num1 + this.num2)
//   },
//   this.sub = function () {
//     console.log(this.num1 - this.num2);
//   },
//   this.multiplication = function () {
//     console.log(this.num1 * this.num2);
//   },
//   this.div = function () {
//     console.log((this.num1 / this.num2));
//   }
// }
// const one = new Calc (2,6)
// console.log(one.sum());

// 7. Функция принимает смешанный массив (содержащий значения чисел, строк и объектов), вернуть объект с полями numbers, strings и objects, содержащими массив со значениями, соответствующими названию поля.
// const arr = [4,"asd",123, "442", {}]

// const obj = (arr) => {
//   const toObject = arr.reduce((newObj, item) => {
//     newObj[item] = item;
//     return newObj;
//   }, {});
//   return console.log(toObject);
// }

// obj(arr)

// 8. Функция принимает массив чисел и два числовых значения, вернуть новый массив, содержащий элементы первого массива, значение которых попадает под диапазон переданных в функцию чисел (второе переданное число может быть больше первого)
// const arr = [1,3,5,6,9,8,7,1,5,2,3,10,20,10,30,40,50]

// const newArray = (arr, num1, num2) => {
//   if (num1 < num2 ) {
//     arr.map((elem) => {
//       if (elem > num1 && elem < num2) {
//         console.log(elem)
//       }
//     })
//   } else {
//     arr.map((elem) => {
//       if (elem < num1 && elem > num2) {
//         console.log(elem)
//       }
//     })
//   }
// }

// newArray(arr,40,15)


// 9. Функция принимает две строки. Вывести true, если строки являются анаграммами, в противном случае false

// const funcCharObj = str => {
//   const charObj = {}
//   for(let char of str.replace(/[^\w]/g).toLowerCase()) {
//     charObj[char] = charObj[char] +1 || 1
//   }
//   return charObj
// }

// const anagramm = (str1,str2) => {
//   const charObject1 = funcCharObj(str1);
//   const charObject2 = funcCharObj(str2);
//   if(Object.keys(charObject1).length !== Object.keys(charObject2).length) {
//     return false
//   }
//   for(let char in charObject1) {
//     if(charObject1[char] !== charObject2[char]) {
//       return false
//     }
//   }
//   return true
// }

// console.log(anagramm('finder', 'Friend'));

// 10. Создать объект, выводящий в консоль все ключи и значения объекта в формате "ключ: значение" через запятую (считать, что значением ключа объекта не может быть объектом или массивом, содержащими объекты) сама функция в консоль выводиться не должна.

// const obj = {
//   month: "October",
//   arr: [1,2,3,4],
//   obj1: {},
//   str: "string",
//   number: 5,

//   method: function() {
//     for(let key in obj) {
//       // console.log(typeof(obj[key]))
//       if (typeof(obj[key]) !== "object" && typeof(obj[key]) !== "function") {
//       console.log(`key: ${key}, value: ${obj[key]}`)};
//     }
//   }
// }

// obj.method()

// 11. Создать функцию-конструктор для объекта, содержащего методы serProp (установить значение свойства), метод принимает ключь (строка), значение (произвольное) и объект со свойствами writable, configurable, enumerable (разрешение перезаписи свойства, разрешение перечисления свойства и разрешение удаления свойства). Если какое-то из свойств в объекте отсутствует, действие должно быть

// const func = (obj) => {
//   this.serProp = function(key,value,{writable=true, configurable=true, enumerable=true} = {}) {
//     Object.defineProperties(this, key, {
//       value,
//       writable,
//       configurable,
//       enumerable
//     });
//   }
// };
// const test = new Test();
// test.serProp('name','Oleg',{writable: false});
// console.log(Object.getOwnPropertyDescriptor(test));