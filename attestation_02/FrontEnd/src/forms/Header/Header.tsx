// Компонент отрисовывающий Заголовок
import './Header.scss';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Divider from 'antd/lib/divider';
import Icon, {
  TeamOutlined,
  LoginOutlined,
  CommentOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import PandaSvg from './panda';
import { State } from '../../redux/types/state';
import { ILogOutAction } from '../../redux/types/actions';
import { logOutAction, signInAction } from '../../redux/actions/auth';
import { ThemeContext, ThemeContextState } from '../../contexts/ThemeContext';

const { Title } = Typography;
interface PandaProps {
  className: string;
}
const PandaIcon = (props: PandaProps): JSX.Element => <Icon component={PandaSvg} {...props} />;

interface Props {
  id?: string;
  title?: string;
  userName?: string;
  avatarImg?: string;
  logout: ILogOutAction;
}

const Header = ({
  id, title, userName, avatarImg, logout,
}: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const themeContext: Partial<ThemeContextState> = useContext(ThemeContext);

  return (
    <section className={`header ${themeContext.darkTheme && 'header_theme-dark'}`}>
      <nav className="header__logo">
        <Button type="link" size="large" onClick={() => navigate('/')}>
          <Title level={4}>
            <PandaIcon className="header__panda" />
            <span className="header__logo-title">Panda Word Co</span>
          </Title>
        </Button>
      </nav>
      <nav className="header__links">
        <Button type="link" size="large" onClick={() => navigate('/user/list')}>
          <TeamOutlined />
          <span className="header__n-title">{t('header.users-title')}</span>
        </Button>
        <Divider type="vertical" className="header__divider" />
        <Button type="link" size="large" onClick={() => navigate('/')}>
          <CommentOutlined />
          <span className="header__n-title">{t('header.posts-title')}</span>
        </Button>
      </nav>

      {id && userName && userName.length > 0 ? (
        <div className="header__login">
          <Button type="link" size="large" onClick={() => navigate('/user/profile/'.concat(id))}>
            {avatarImg && avatarImg.length > 0 ? <Avatar src={avatarImg} size="small" /> : <UserOutlined />}
            <span className="header__user">
              &nbsp;
              {title && t(`title-items.${title}`)} {userName}
            </span>
          </Button>
          <Divider type="vertical" className="header__divider" />
          <Button type="link" size="large" onClick={logout} className="header__btn-nav">
            <LogoutOutlined />
            <span className="header__e-title">{t('header.exit-title')}</span>
          </Button>
        </div>
      ) : (
        <nav className="header__login">
          <Button type="link" size="large" onClick={() => navigate('/user/login')}>
            <LoginOutlined />
            <span className="header__n-title">{t('header.enter-title')}</span>
          </Button>
          <Divider type="vertical" className="header__divider" />
          <Button type="link" size="large" onClick={() => navigate('/user/register')}>
            <UserAddOutlined />
            <span className="header__n-title">{t('header.reg-title')}</span>
          </Button>
        </nav>
      )}
    </section>
  );
};

Header.defaultProps = {
  id: '',
  title: '',
  userName: '',
  avatarImg: '',
};

export default connect(
  (state: State) => ({
    id: state.auth.id,
    title: state.auth.title,
    userName: state.auth.username,
    avatarImg: state.auth.avatarImg,
  }),
  (dispatch) => ({
    signIn: bindActionCreators(signInAction, dispatch),
    logout: bindActionCreators(logOutAction, dispatch),
  }),
)(Header);
