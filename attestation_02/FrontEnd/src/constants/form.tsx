import { Form, Select } from 'antd';
import React from 'react';

export const prefixTitle = (title: Record<string, string>) => (
  <Form.Item name="title" noStyle>
    <Select
      style={{
        width: 120,
      }}
    >
      {Object.entries(title).map(([value, label]: [string, string]) => (
        <Select.Option value={value} key={value}>
          {label}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);
