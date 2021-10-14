// Реализовать объект animal, с полем клички, методом eat, выводящим сообщение "/*кличка*/ ест" и методом say, выводящим фразу, "неизвестное животное молчит", путём прототипного наследования создать объекты кота, собаки и попугая. Переопределить в них метод say, в зависимости от типа животного. Для кота добавить новый метод hunt, выводящий сообщение "/*кличка*/ охотится". Все перечисленные методы и свойства должны быть защищены от удаления и перезаписи. Методы должны быть неперечисляемыми. Разработать метод rename, для смены клички животного. Новая кличка должна содержать только кирилические символы, пробелы или символ "-". Выполнить то же самое использую функции конструкторы. Выполнить то же самое, используя классы.

//                               1 first method
// 
// const animal = {
//   name: "Bear",
//   eat () {
//     console.log(`${this.name} eat`)
//   },
//   say () {
//     console.log(`неизвестное животное молчит`)
//   },
//   rename(newName) {
//     if (/^([а-яА-Я]?)+((\s|-)?)+([а-яА-Я]?)+/.test(newName)) {
//       return this.name = newName
//     } else {
//       return this.name
//     }
// },
// }
//   Object.defineProperties(animal, {
//     name : {
//       writable: true
//     },
//     eat: {
//       configurable: false,
//       enumerable: false
//     },
//     say: {
//       configurable: false,
//       enumerable: false
//     },
//     rename:{
//       configurable: false,
//       enumerable: false
//     },
//   })
// console.log(Object.getOwnPropertyDescriptors(animal))
// console.log(Object.keys(animal))
// console.log(animal.rename('фыы-вфыв'))
// const cat = {
//   __proto__: animal,
//   name: "Cat",
//   hunt () {
//     console.log(`${this.name} охотится`)
//   }
// }
// const dog = {
//   __proto__: animal,
//   name: "Dog"
// }
// const parrot = {
//   __proto__: animal,
//   name: "Parrot"
// }



// Object.freeze(animal)

// console.log(Object.getOwnPropertyDescriptor(animal, "eat"))

//                    second 2
function Animal(name) {
    this.name = name;
    this.eat = function() {
      console.log(`${this.name} eat`)
    };
    this.say = function() {
      console.log(`неизвестное животное молчит`)
    };
    this.rename = function(newName) {
      if (/^([а-яА-Я]?)+((\s|-)?)+([а-яА-Я]?)+/.test(newName)) {
        return this.name = newName
      } else {
        return this.name
      }
  };
  Object.defineProperties(this, {
    say: {
      configurable: false,
      enumerable: false 
    },
    eat: {
      configurable: false,
      enumerable: false
    },
    rename: {
      configurable: false,
      enumerable: false
    }
  })
}

  function Cat (name) {
      Animal.call(this, name);
      this.name = name;

      this.hunt = function () {
        console.log(`${this.name} охотится`)
      }
    }
    const cat = new Cat('Meow')

  cat.eat()
  cat.hunt()

    function Dog (name) {
      Animal.call(this, name);
      this.name = name;
    }
    const dog = new Dog('Gav Gav Mother Fuckers')

  dog.eat()

    function Parrot (name) {
      Animal.call(this, name);
      this.name = name;
    }
