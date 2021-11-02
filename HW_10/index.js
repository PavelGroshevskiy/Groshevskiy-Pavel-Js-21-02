// Разработать страницу, подобную разработанной в ходе урока. Страница должна содержать инпут для ввода файла и дальнейшей отправки на сервер по API https://api.imgbb.com/. Отправляемый файл должен быть закодирован в base64. Отправленные изображения должны выводиться на страницу. Приходящие в ответе от сервера ссылки на изображения должны сохраняться в localStorage. Если при загрузке страницы в localStorage уже есть сохранённые ссылки на изображения, эти изображения должны выводиться на страницу. При выполнении задания необходимо соблюдать модульную структуру (подобную продемонстрированной в уроке посвящённому модулям). 
// *Опционально: При загрузке очередного изображения на сервер необходимо отображать над инпутом лоадер, анимированный на js.
// В ответе на домашнее задание прикрепить ссылку на GitHub и ссылку на профиль в imgbb. 
const input = document.getElementById('fileInput')

const imgArr = localStorage.getItem('imgArr') ? JSON.parse(localStorage.getItem('imgArr')) : []
imgArr.forEach(addImgToGallery)

const uploadButton = document.getElementById('uploadButton')
uploadButton.addEventListener('click', () => {
  uploadBase64(input.files[0])
})

function addImgToGallery(url) {
  const img = document.createElement('img');
  img.src = url
  document.querySelector('.gallery').append(img)
}

function uploadBase64 (file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
  const formData = new FormData();
  formData.set('key', '8f4d9f1cdd13539b815a74c81f23e934')
  formData.set('image', reader.result.replace(/^.*,/, ''))
  fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: formData
  }).then(response => response.json())
  .then((response) => {
    imgArr.push(response.data.display_url)
    localStorage.setItem('imgArr', JSON.stringify(imgArr))
    addImgToGallery(response.data.display_url)
  })
  .catch(console.error)
}}

function moveAnimation() {
  const loaderBox =  document.querySelector('.loader-box')
  let pos = Number.parseInt(getComputedStyle(loaderBox).left)
  let interval = moveRight()

  function moveRight() {
    return requestAnimationFrame(() => {
      if(pos < Number.parseInt(getComputedStyle(loaderBox.parentElement).width)-Number.parseInt(getComputedStyle(loaderBox).width)) {
      pos++;
      loaderBox.style.left = `${pos}px`
      requestAnimationFrame(moveRight)
    } else {
      interval = moveLeft()
    }
  });
  };

  function moveLeft() {
    return requestAnimationFrame(() => {
      if(pos > 0){
      pos--;
      loaderBox.style.left = `${pos}px`
      requestAnimationFrame(moveLeft)

    } else {
      interval = moveRight()
    }
  });
  }
}

moveAnimation()