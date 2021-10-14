// 1. Реализовать функцию, принимающую число (индекс в последовательности Фибоначчи), функция должна вернуть значение числа. Использовать рекурсию.

// function fib(n) {
//   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
// }

// console.log(fib(5));
// console.log(fib(7));

// 2. Модернизировать написанную функцию, добавив кэширование (функция “”запоминает”” входной параметр и вычесленное значение, при следующем вызыве с этим же параметром, функция не вычисляет значение, а возвращает из памяти)


const moFunc = (() => {
  const cash = {};
  return (a) => {
    if(cash[a]) {
      console.log(`On cash`);
      return cash[a]
    } else {
      console.log(`Consuming`)
      const num = function fib (a) {
        if (a = 1) {
          return a
        } else {
          return num = fib(a - 1) + fib(a - 2)
        }  
      
        }()
      console.log(`Add a cash`);
      cash[a] = num
      return num
    }
    
  }
})()

console.log(moFunc(5));
console.log(moFunc(2));
console.log(moFunc(7));
console.log(moFunc(30));
console.log(moFunc(5));
console.log(moFunc(20));



// 3. Разработать рекурсивную функцию, принимающую массив, содержащий массивы из двух элементов, в каждом из которых первый элемент является строкой, а второй строкой, числом, логическим значением, объектом, или таким же массивом. Функция должна преобразовать массив в объект.
// Пример входного значения:
// const test = ["head","val1","val2","val3",
//     ["head2","val4","val5",
//         ["head3","val6","val7", 
//             ["head4", "val8"],"val9"]],
//     ["head5", "val10", "val11"]
// ];

// function convert(arr) {
//   return {
//   [arr[0]]: arr.slice(1).map(item => Array.isArray(item)? convert(item): item)
//   }
//   }


// console.log(convert(test));
