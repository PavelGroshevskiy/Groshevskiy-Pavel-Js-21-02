import React from 'react';
import {
  Input, Form, Radio, DatePicker, Button,
} from 'antd';
import 'antd/dist/antd.css';

import './Main.css';

const Main = () => (
  <div className="main-form">
    <h1>Регистрация</h1>
    <Form.Item name="Name" label="Name" />
    <Input allowClear placeholder="Enter your Name" />
    <Form.Item label="пол" />
    <Radio.Group>
      <Radio value="a">Male</Radio>
      <Radio value="b">Female</Radio>
    </Radio.Group>
    <Form.Item label="Birth Date" />
    <DatePicker />
    <Form.Item label="Email" />
    <Input />
    <Form.Item label="Phone" />
    <Input prefix="+7" />
    <Form.Item />
    <Button type="primary" block>
      Registry
    </Button>
  </div>
);

export default Main;
