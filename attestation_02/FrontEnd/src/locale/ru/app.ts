export const APP_RU = {
  antd: {
    locale: 'ruRU',
  },
  'title-items': {
    mr: 'господин',
    ms: 'госпожа',
    mrs: 'миссис',
    miss: 'мис',
    dr: 'доктор',
  },
  'gender-items': {
    male: 'мужской',
    female: 'женский',
  },
  date: '{{date, D MMM}} в {{time}}',
  dateFull: '{{date, DD MMM YYYY}}',
  dateTimeFull: '{{date, DD MMM YYYY}} в {{time}}',
  date_format: '{{date, D MMM в HH:MM}}',
  header: {
    'users-title': 'Пользователи',
    'posts-title': 'Посты',
    'enter-title': 'Войти',
    'exit-title': 'Выйти',
    'reg-title': 'Регистрация',
  },
  footer: {
    'theme-title': 'тема',
  },

  login: {
    'signIn-header': 'Войти в систему',
    'id-placeholder': 'Введите свой ID',
    'signIn-button': 'Войти',
    'register-link': 'Еще нет аккаунта? Зарегистрироваться.',
    rules: {
      'id-required': 'Введи свой Id это обязательное поле',
      'id-allowed': 'Id может содержать только англиские буквы и цифры',
    },
  },

  register: {
    'reg-header': 'Регистрация',
    'acc-exist-link': 'Уже есть аккаунт? Войти.',
    'reg-button': 'Зарегистрироваться',
  },

  edit: {
    'img-update-button': 'Обновить фотографию',
    'img-delete-button': 'Удалить фотографию',
    'img-upload-button': 'Установить фотографию',
    'save-button': 'Сохранить',
  },
  'user-card': {
    'edit-button': 'Редактировать',
  },
  user: {
    'lastName-label': 'Фамилия',
    'lastName-placeholder': 'Введите свою фамилию',
    'firstName-label': 'Имя',
    'firstName-placeholder': 'Введите свое имя',
    'gender-label': 'Пол',
    'gender-male': 'Мужской',
    'gender-female': 'Женский',
    'birthDate-label': 'Дата рождения',
    'regDate-label': 'Дата регистрации',
    'date-placeholder': 'ДД.ММ.ГГГ',
    'date-format': 'DD.MM.YYYY',
    'email-label': 'Электронная почта',
    'email-placeholder': 'anonim@example.com',
    'phone-label': 'Телефон',
    'phone-placeholder': '+71234567890',
    'base-error': 'Незаполнены обязательные поля, заполните форму!',
    rules: {
      'lastName-required': 'Фамилия обязательное поле.',
      'lastName-allowed': 'Фамилия может содержать английские или русские буквы пробел и тире.',
      'firstName-required': 'Имя обязательное поле.',
      'firstName-allowed': 'Имя может содержать английские или русские буквы пробел и тире',
      'email-required': 'Электронная почта обязательное поле.',
      'email-invalid': 'Введена не валидная электронная почта.',
      'email-allowed': 'Почта не может содержать русские буквы и спец символы.',
      'phone-allowed': 'Телефон должен начинаться с +7 и содержать 11 чисел.',
    },
  },
};
