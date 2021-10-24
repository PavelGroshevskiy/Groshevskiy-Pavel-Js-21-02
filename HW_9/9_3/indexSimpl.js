fetch('https://swapi.dev/api/people/')
.then(response => response.json())
.then(al)

function al ( obj) {
  if(Array.isArray())    
  const map = new Map(Object.entries(obj))
      let results = map.get('results')
      console.log(results)
      
  }


// function getFiniteValue(obj) {
//   (function getProp(o) {
//       for(var prop in o) {
//           if(typeof(o[prop]) === 'object') {
//               getProp(o[prop]);
//           } else {
//               console.log('Finite value: '+o[prop])
//           }
//       }
//   })(obj)
// }


// function all (obj) {
//   Object.entries(obj).forEach(([el,val]) => {
//   console.log(el,typeof( val))
//   if(obj[val] === )
//   // const next = document.createElement('buttonNxt')
//   // next.innerHTML = `<button>${el}</button>`
//   // document.body.append(next);
//   })
// }

function print(obj) {
  Object.entries(obj).filter(([key,val]) =>{
  if(key === "results"){
  // console.log( val)
  Object.entries(val).forEach(el => console.log(...el))
  const div = document.createElement('div')
  div.innerHTML = `<span> key:${key} ---- value:${val}</span>`
  document.body.append(div)} else {
    return 0
  }
  })
}