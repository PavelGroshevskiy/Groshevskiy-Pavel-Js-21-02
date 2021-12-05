import React from 'react';
import {
  Input, Form, Button,
} from 'antd';
import 'antd/dist/antd.css';

import './Entry.css';

const Entry = () => (
  <div className="entry-form">
    <h1>SignIn</h1>
    <Form.Item name="ID" label="ID" />
    <Input allowClear placeholder="Enter your ID" />
    <Form.Item />
    <Button type="primary" block>
      SignIn
    </Button>
  </div>
);

export default Entry;
