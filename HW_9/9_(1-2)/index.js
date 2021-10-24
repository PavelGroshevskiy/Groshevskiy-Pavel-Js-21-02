// 1. Разработать скрипт. Пользователь вводит два числа (i, j), каждую секунду выводить число от i до j (реализвать через setTimeout и setInterval).

// 2. Реализовать страницу, через десять секунд перенаправляющую на главную страницу https://maxima.life (для редиректа поменять свойство window.location) на странице вывести сообщение "вы будите перенаправлены через /*количество оставшихся секунд*/" секунд
// *Опционально: предусмотреть склонение слова "секунда"



//               1

// let firstNum = prompt('first i number')
// let secondNum = prompt('second j number')

// function iterator(from, to) {
//   let current = from;

//   let timerId = setInterval(function() {
//     alert(current);
//     if (current == to) {
//       clearInterval(timerId);
//     }
//     current++;
//   }, 1000);
// }


// function iterator(from, to) {
//   let current = from;
//   setTimeout(function go() {
//     alert(current);
//     if (current < to) {
//       setTimeout(go, 1000);
//     }
//     current++;
//   }, 1000);
// }

// iterator(firstNum, secondNum)


// 2. Реализовать страницу, через десять секунд перенаправляющую на главную страницу https://maxima.life (для редиректа поменять свойство window.location) на странице вывести сообщение "вы будите перенаправлены через /*количество оставшихся секунд*/" секунд
// *Опционально: предусмотреть склонение слова "секунда"

// const urlSwap = 'https://maxima.life'
// const div = document.createElement('div') 

// const intervalId = setInterval(() => {
//   div.innerHTML = `вы будете перенаправлены через ${counter} секунд`
//   document.body.append(div)
//   counter --;
// if (counter === 0) {
//     clearInterval(intervalId);
//     window.location = urlSwap
//   }
// }, 1000, counter = 10);


