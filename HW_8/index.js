// Реализация таблицы с именем и номером телефона, с возможностью добавления через валидируемые инпуты новых строк. Добавить три кнопки, для смены цветового оформления таблицы (каждая меняет цвет фона и текста, цвета на выбор слушателей). *Усложнённое задание: реализовать в каждой строке таблицы кнопку для удаление её строки из таблицы

const table = document.getElementsByClassName('table')[0]
const inputName = document.querySelector('.nameValue')
const inputNumber = document.querySelector('.numberValue')
const addBtn = document.querySelector('.addBtn')
const lastElTable = table.lastElementChild
console.log(lastElTable)
const trs = table.rows[1]
const changeColor1 = document.querySelector('.changeColor1')
const changeColor2 = document.querySelector('.changeColor2')
const changeColor3 = document.querySelector('.changeColor3')


const validateName = (name) => /^[A-z]*$/.test(name);
const validateNum = (num) => /^[\d]*$/.test(num);


const handleInput = (e) => {
  const nameIn = validateName(inputName.value) ? inputName.value : 'Not a latin word'
  const numIn = validateNum(inputNumber.value) ? inputNumber.value : 'Not a number'
  const crEl = document.createElement('tr')
  crEl.innerHTML = `<td> ${nameIn} </td><td> ${numIn} </td>`
  lastElTable.append(crEl)
    
}

addBtn.addEventListener('click', handleInput)

changeColor1.addEventListener('click', () => {
  table.style.backgroundColor = 'red',
  table.style.color = 'blue'
})

changeColor2.addEventListener('click', () => {
  table.style.backgroundColor = 'darkcyan',
  table.style.color = 'white'
})

changeColor3.addEventListener('click', () => {
  table.style.backgroundColor = 'blue',
  table.style.color = 'darkcyan'
})