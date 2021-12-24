import {
  Button, DatePicker, Form, FormInstance, Input, Select,
} from 'antd';
import React, { MouseEventHandler } from 'react';
import Moment from 'moment';

import { TFunction } from 'i18next';
import { UserType } from '../../types/api/dumMyApiResponses';
import { prefixTitle } from '../../constants/form';
import { disabledDate } from '../../api/utils';

export const render = (
  form: FormInstance,
  user: UserType,
  darkTheme: boolean | undefined,
  saveHandler: MouseEventHandler<HTMLElement>,
  t: TFunction,
): JSX.Element => (
  <Form
    form={form}
    key={user.id}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{
      ...user,
      dateOfBirth: Moment(user.dateOfBirth?.date),
      registerDate: Moment(user.registerDate?.date.concat(' ', user.registerDate?.time)),
    }}
  >
    <Form.Item
      label={t('user.lastName-label')}
      name="lastName"
      rules={[
        {
          required: true,
          message: t('user.rules.lastName-required'),
        },
        {
          pattern: new RegExp(/^[A-zА-яеЁ \\-]+$/i),
          message: t('user.rules.lastName-allowed'),
        },
      ]}
    >
      <Input addonBefore={prefixTitle(t('title-items', { returnObjects: true }))} />
    </Form.Item>
    <Form.Item
      label={t('user.firstName-label')}
      name="firstName"
      rules={[
        {
          required: true,
          message: t('user.rules.firstName-required'),
        },
        {
          pattern: new RegExp(/^[A-zА-яеЁ \\-]+$/i),
          message: t('user.rules.firstName-allowed'),
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item label={t('user.gender-label')} name="gender">
      <Select>
        <Select.Option value="male">{t('user.gender-male')}</Select.Option>
        <Select.Option value="female">{t('user.gender-female')}</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label={t('user.birthDate-label')} name="dateOfBirth">
      <DatePicker
        placeholder={t('user.date-placeholder')}
        format={t('user.date-format')}
        disabledDate={disabledDate}
        picker="date"
      />
    </Form.Item>
    <Form.Item label={t('user.regDate-label')} name="registerDate">
      <DatePicker
        placeholder={t('user.date-placeholder')}
        format={t('user.date-format').concat(' HH:MM')}
        disabled
        bordered={false}
        inputReadOnly
      />
    </Form.Item>
    <Form.Item label="Email" name="email">
      <Input inputMode="email" readOnly disabled bordered={false} />
    </Form.Item>
    <Form.Item
      label={t('user.phone-label')}
      name="phone"
      rules={[
        {
          pattern: new RegExp(/^\+7\d{10}$/i),
          message: t('user.rules.phone-allowed'),
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Button type="primary" className="user-edit__save" onClick={saveHandler}>
      {t('edit.save-button')}
    </Button>
  </Form>
);
