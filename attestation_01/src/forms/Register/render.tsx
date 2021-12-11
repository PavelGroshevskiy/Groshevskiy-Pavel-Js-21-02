import { Button, DatePicker, Form, FormInstance, Input, Radio } from 'antd';
import React, { MouseEventHandler } from 'react';
import { prefixTitle } from '../../constants/form';
import { disabledDate } from '../../api/utils';

export const render = (
  form: FormInstance<any>,
  darkTheme: boolean | undefined,
  createHandler: MouseEventHandler<HTMLElement>,
): JSX.Element => (
  <Form
    className={`user_create ${darkTheme && 'user_create__dark'}`}
    form={form}
    layout="vertical"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    scrollToFirstError
    initialValues={{
      title: 'mr',
      gender: 'male',
    }}
  >
    <Form.Item
      label="Фамилия:"
      name="lastName"
      rules={[
        {
          required: true,
          message: 'Фамилия обязательное поле!',
        },
        {
          pattern: new RegExp(/^[A-zА-яеЁ \\-]+$/i),
          message: 'Фамилия может содержать английские или русские буквы пробел и тире',
        },
      ]}
    >
      <Input addonBefore={prefixTitle} placeholder="Введите свою фамилию" />
    </Form.Item>
    <Form.Item
      label="Имя:"
      name="firstName"
      rules={[
        {
          required: true,
          message: 'Имя обязательное поле!',
        },
        {
          pattern: new RegExp(/^[A-zА-яеЁ \\-]+$/i),
          message: 'Имя может содержать английские или русские буквы пробел и тире',
        },
      ]}
    >
      <Input placeholder="Введите свое имя" />
    </Form.Item>
    <Form.Item label="Пол:" name="gender" className="register__gender">
      <Radio.Group>
        <Radio value="male">Мужской</Radio>
        <Radio value="female">Женский</Radio>
      </Radio.Group>
    </Form.Item>
    <Form.Item label="Дата рождения" name="birthDate">
      <DatePicker placeholder="ДД.ММ.ГГГГ" format="DD.MM.YYYY" disabledDate={disabledDate} />
    </Form.Item>
    <Form.Item
      label="Email:"
      name="email"
      rules={[
        {
          type: 'email',
          message: 'Введена не валидная электронная почта!',
        },
        {
          required: true,
          message: 'Электронная почта обязательное поле!',
        },
        {
          pattern: new RegExp(/^[A-z0-9._-]+@[A-z0-9._-]+.[A-z0-9._-]{1,3}$/i),
          message: 'Почта не может содержать русские буквы и спец символы',
        },
      ]}
    >
      <Input placeholder="anonim@example.com" />
    </Form.Item>
    <Form.Item
      label="Телефон:"
      name="phone"
      rules={[
        {
          pattern: new RegExp(/^\+7\d{10}$/i),
          message: 'Телефон должен начинаться с +7 и содержать 11 чисел',
        },
      ]}
    >
      <Input placeholder="+79991234567" />
    </Form.Item>
    <Form.Item>
      <Button type="primary" className="register__button" onClick={createHandler}>
        Зарегистрироваться
      </Button>
    </Form.Item>
  </Form>
);
