import React, {
  useContext,
} from 'react';
import './Footer.css';
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import { CopyrightOutlined } from '@ant-design/icons';
import { ThemeContext } from '../../contexts/ThemeContext';
// Функциональный компонент - это функция, возвращающая компонент
export const Footer = () => {
  const themeContext = useContext(ThemeContext); // ПОдтягиваем контекст от ближайшего контекст-провайдера

  return (
    <div className={`footer ${themeContext.darkTheme && 'header__dark'}`}>
      {/* <Switch> */}
      <p>
        <CopyrightOutlined />
        {' '}
        Delta World 1970-2077
      </p>
      <p>
        {/* <Route path="/users"> */}
        <Switch size="small" />
        Темная тема

      </p>
    </div>
  );
};
