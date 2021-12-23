import {
  Button, DatePicker, Form, FormInstance, Input, Radio,
} from 'antd';
import React, { MouseEventHandler } from 'react';
import { TFunction } from 'i18next';
import { prefixTitle } from '../../constants/form';
import { disabledDate } from '../../api/utils';

export const render = (
  form: FormInstance<any>,
  darkTheme: boolean | undefined,
  createHandler: MouseEventHandler<HTMLElement>,
  t: TFunction,
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
      label={t('user.lastName-label').concat(':')}
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
      <Input
        addonBefore={prefixTitle(t('title-items', { returnObjects: true }))}
        placeholder={t('user.lastName-placeholder')}
      />
    </Form.Item>
    <Form.Item
      label={t('user.firstName-label').concat(':')}
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
      <Input placeholder={t('user.firstName-placeholder')} />
    </Form.Item>
    <Form.Item label={t('user.gender-label').concat(':')} name="gender" className="register__gender">
      <Radio.Group>
        <Radio value="male">{t('user.gender-male')}</Radio>
        <Radio value="female">{t('user.gender-female')}</Radio>
      </Radio.Group>
    </Form.Item>
    <Form.Item label={t('user.birthDate-label').concat(':')} name="dateOfBirth">
      <DatePicker placeholder={t('user.date-placeholder')} format={t('user.date-format')} disabledDate={disabledDate} />
    </Form.Item>
    <Form.Item
      label={t('user.email-label').concat(':')}
      name="email"
      rules={[
        {
          type: 'email',
          message: t('user.rules.email-invalid'),
        },
        {
          required: true,
          message: t('user.rules.email-required'),
        },
        {
          pattern: new RegExp(/^[A-z0-9._-]+@[A-z0-9._-]+.[A-z0-9._-]{1,3}$/i),
          message: t('user.rules.email-allowed'),
        },
      ]}
    >
      <Input placeholder={t('user.email-placeholder')} />
    </Form.Item>
    <Form.Item
      label={t('user.phone-label').concat(':')}
      name="phone"
      rules={[
        {
          pattern: new RegExp(/^\+7\d{10}$/i),
          message: t('user.rules.phone-allowed'),
        },
      ]}
    >
      <Input placeholder={t('user.phone-placeholder')} />
    </Form.Item>
    <Form.Item>
      <Button type="primary" className="register__button" onClick={createHandler}>
        {t('register.reg-button')}
      </Button>
    </Form.Item>
  </Form>
);
