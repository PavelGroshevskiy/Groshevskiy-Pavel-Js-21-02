import { Form, Select } from 'antd';
import React from 'react';

export const prefixTitle = (
  <Form.Item name="title" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Select.Option value="mr">mr</Select.Option>
      <Select.Option value="ms">ms</Select.Option>
      <Select.Option value="mrs">mrs</Select.Option>
      <Select.Option value="miss">miss</Select.Option>
      <Select.Option value="dr">dr</Select.Option>
    </Select>
  </Form.Item>
);
