import React, {
  useContext,
} from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { StarOutlined, PayCircleOutlined } from '@ant-design/icons';
import { ThemeContext } from '../../contexts/ThemeContext';
// Функциональный компонент - это функция, возвращающая компонент
export const Header = () => {
  const themeContext = useContext(ThemeContext); // ПОдтягиваем контекст от ближайшего контекст-провайдера

  return (
    <div className={`header ${themeContext.darkTheme && 'header__dark'}`}>
      {/* <Switch> */}
      <h1>
        <Link to="/">
          <PayCircleOutlined />
          Delta World
        </Link>
      </h1>
      <span>
        {/* <Route path="/users"> */}
        <StarOutlined />
        <Link to="/users">Пользователи</Link>
        {/* </Route> */}
        <StarOutlined />
        <Link to="/posts">Посты</Link>

      </span>
      <span>
        <StarOutlined />
        <Link to="/Entry">Вход</Link>
        {' '}
        |
        <Link to="/home">Регистрация</Link>

      </span>
      {/* </Switch> */}
    </div>
  );
};
