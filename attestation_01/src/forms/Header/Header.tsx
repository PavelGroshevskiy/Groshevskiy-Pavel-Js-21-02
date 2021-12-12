// Компонент отрисовывающий Заголовок
import './Header.scss';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Divider from 'antd/lib/divider';
import { TeamOutlined,
  LoginOutlined,
  CommentOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Typography } from 'antd';
import { State } from '../../redux/types/state';
import { ILogOutAction } from '../../redux/types/actions';
import { logOutAction, signInAction } from '../../redux/actions/auth';
import { ThemeContext, ThemeContextState } from '../../contexts/ThemeContext';

const { Title } = Typography;

interface Props {
  id?: string;
  userName?: string;
  avatarImg?: string;
  logout: ILogOutAction;
}

const Header = ({ id, userName, avatarImg, logout }: Props) => {
  const navigate = useNavigate();
  const themeContext: Partial<ThemeContextState> = useContext(ThemeContext);

  return (
    <section className={`header ${themeContext.darkTheme && 'header_theme-dark'}`}>
      <nav className="header__logo">
        <Button type="link" size="large" onClick={() => navigate('/')}>
          <Title level={4}>
            <span className="header__logo-title">Some Blog</span>
          </Title>
        </Button>
      </nav>
      <nav className="header__links">
        <Button type="link" size="large" onClick={() => navigate('/user/list')}>
          <TeamOutlined />
          <span className="header__n-title">Пользователи</span>
        </Button>
        <Divider type="vertical" className="header__divider" />
        <Button type="link" size="large" onClick={() => navigate('/')}>
          <CommentOutlined />
          <span className="header__n-title">Посты</span>
        </Button>
      </nav>

      {id && userName && userName.length > 0 ? (
        <div className="header__login">
          <Button type="link" size="large" onClick={() => navigate('/user/profile/'.concat(id))}>
            {avatarImg && avatarImg.length > 0 ? <Avatar src={avatarImg} size="small" /> : <UserOutlined />}
            <span className="header__user">
              &nbsp;
              {userName}
            </span>
          </Button>
          <Divider type="vertical" className="header__divider" />
          <Button type="link" size="large" onClick={logout} className="header__btn-nav">
            <LogoutOutlined />
            <span className="header__e-title">Выход</span>
          </Button>
        </div>
      ) : (
        <nav className="header__login">
          <Button type="link" size="large" onClick={() => navigate('/user/login')}>
            <LoginOutlined />
            <span className="header__n-title">Вход</span>
          </Button>
          <Divider type="vertical" className="header__divider" />
          <Button type="link" size="large" onClick={() => navigate('/user/register')}>
            <UserAddOutlined />
            <span className="header__n-title">Регистрация</span>
          </Button>
        </nav>
      )}
    </section>
  );
};

Header.defaultProps = {
  id: '',
  userName: '',
  avatarImg: '',
};

export default connect(
  (state: State) => ({
    id: state.auth.id,
    userName: state.auth.username,
    avatarImg: state.auth.avatarImg,
  }),
  (dispatch) => ({
    signIn: bindActionCreators(signInAction, dispatch),
    logout: bindActionCreators(logOutAction, dispatch),
  }),
)(Header);
