import { Button, DatePicker, Form, FormInstance, Input, Select } from 'antd';
import React, { MouseEventHandler } from 'react';
import Moment from 'moment';

import { UserType } from '../../types/api/dumMyApiResponses';
import { prefixTitle } from '../../constants/form';
import { disabledDate } from '../../api/utils';

export const render = (
  form: FormInstance,
  user: UserType,
  darkTheme: boolean | undefined,
  saveHandler: MouseEventHandler<HTMLElement>,
): JSX.Element => (
  <Form
    form={form}
    key={user.id}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{
      ...user,
      dateOfBirth: Moment(user.dateOfBirth),
      registerDate: Moment(user.registerDate),
    }}
  >
    <Form.Item
      label="Фамилия"
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
      <Input addonBefore={prefixTitle} />
    </Form.Item>
    <Form.Item
      label="Имя"
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
      <Input />
    </Form.Item>
    <Form.Item label="Пол" name="gender">
      <Select>
        <Select.Option value="male">Мужской</Select.Option>
        <Select.Option value="female">Женский</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="Дата рождения" name="dateOfBirth">
      <DatePicker placeholder="ДД.ММ.ГГГГ" format="DD.MM.YYYY" disabledDate={disabledDate} picker="date" />
    </Form.Item>
    <Form.Item label="Дата регистрации" name="registerDate">
      <DatePicker placeholder="ДД.ММ.ГГГГ" format="DD.MM.YYYY HH:MM" disabled bordered={false} inputReadOnly />
    </Form.Item>
    <Form.Item label="Email" name="email">
      <Input inputMode="email" readOnly disabled bordered={false} />
    </Form.Item>
    <Form.Item
      label="Телефон"
      name="phone"
      rules={[
        {
          pattern: new RegExp(/^\+7\d{10}$/i),
          message: 'Телефон должен начинаться с +7 и содержать 11 чисел',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Button type="primary" className="user-edit__save" onClick={saveHandler}>
      Сохранить
    </Button>
  </Form>
);
