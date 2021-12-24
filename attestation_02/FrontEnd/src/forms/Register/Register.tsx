// Компонент отрисовывающий форму регистрации пользователя
import './Register.scss';
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import {
  Alert, Form, Spin, Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useTranslation } from 'react-i18next';
import { Moment } from 'moment';
import { UserType } from '../../types/api/dumMyApiResponses';
import { createUserAction, usersErrorAction } from '../../redux/actions/users';
import { render } from './render';
import useScrollToTop from '../../hooks/useScrollToTop';
import { ThemeContext } from '../../contexts/ThemeContext';
import { State } from '../../redux/types/state';
import { ICreateUserAction, IUsersErrorAction } from '../../redux/types/actions';

const { Title } = Typography;

interface Props {
  error?: string;
  isLoading: boolean;
  createUser: ICreateUserAction;
  showError: IUsersErrorAction;
}

const Register = ({
  error, isLoading, createUser, showError,
}: Props) => {
  useScrollToTop();
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const [form] = Form.useForm();

  const onCreate = (): void => {
    form
      .validateFields()
      .then((fields) => {
        const user: UserType = {
          lastName: fields.lastName,
          firstName: fields.firstName,
          phone: fields.phone,
          email: fields.email,
          gender: fields.gender,
          title: '',
        };

        console.log('fields.dateOfBirth', fields.dateOfBirth);
        if (fields.dateOfBirth) {
          user.dateOfBirth = { date: (fields.dateOfBirth as Moment).format('YYYY-MM-DD'), time: '' };
        }
        console.log('user.dateOfBirth', user);

        if (fields.title.length > 0) {
          user.title = fields.title;
        }
        createUser(user, false);
      })
      .catch(() => {
        showError(t('user.base-error'));
      });
  };

  return (
    <section className={`register ${themeContext.darkTheme && 'register_theme-dark'}`}>
      <header className="register__title">
        <Title level={3}>{t('register.reg-header')}</Title>
      </header>

      <Spin spinning={isLoading && isLoading}>
        {error && <Alert message={error} type="error" banner className="register__error" />}
        {render(form, themeContext.darkTheme, onCreate, t)}
      </Spin>

      <footer className="register__footer">
        <Link className="register__link" to="/user/login">
          {t('register.acc-exist-link')}
        </Link>
      </footer>
    </section>
  );
};

Register.defaultProps = {
  error: '',
};

export default connect(
  (state: State) => ({
    error: state.users.error,
    isLoading: state.users.isLoading,
  }),
  (dispatch) => ({
    createUser: bindActionCreators(createUserAction, dispatch),
    showError: bindActionCreators(usersErrorAction, dispatch),
  }),
)(Register);
