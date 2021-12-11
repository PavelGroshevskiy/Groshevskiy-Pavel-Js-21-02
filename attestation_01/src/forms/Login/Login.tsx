// Компонент отрисовывающий форму входа
// 60d0fe4f5311236168a109cc
import './Login.scss';
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useNavigate } from 'react-router-dom';
import { Spin, Button, Form, Input, Typography, Alert } from 'antd';
import { signInAction, authErrorAction } from '../../redux/actions/auth';
import { State } from '../../redux/types/state';
import { IAuthErrorAction, ISignInAction } from '../../redux/types/actions';
import { ThemeContext, ThemeContextState } from '../../contexts/ThemeContext';

const { Title } = Typography;

interface Props {
  id?: string;
  username?: string;
  error?: string;
  isLoading: boolean;
  signIn: ISignInAction;
  putError: IAuthErrorAction;
}

const Login = ({ id, username, error, isLoading, signIn, putError }: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const themeContext: Partial<ThemeContextState> = useContext(ThemeContext);

  const signInHandler = () => {
    form
      .validateFields()
      .then((fields) => {
        signIn(fields.id);
      })
      .catch(() => {
        putError('Незаполнены обязательные поля, заполните форму!');
      });
  };

  useEffect(() => {
    if (id) {
      navigate(`/user/profile/${id}`);
    }
  }, [error, isLoading, username]);

  return (
    <Spin size="large" spinning={isLoading}>
      {!username && (
        <section className={`login ${themeContext.darkTheme && 'login_theme-dark'}`}>
          <header className="login__title">
            <Title level={3}>Вход</Title>
          </header>
          {error && <Alert message={error} type="error" />}
          <Form layout="vertical" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} form={form}>
            <Form.Item
              label="ID:"
              name="id"
              rules={[
                {
                  required: true,
                  message: 'Необходимо обязательно указать свой ID',
                },
                {
                  pattern: new RegExp(/^[a-z0-9]+$/i),
                  message: 'Логин может состоять только из маленьких анлийских букв и символов',
                },
              ]}
            >
              <Input placeholder="Введите свой ID" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="login__enter" onClick={signInHandler}>
                Войти
              </Button>
            </Form.Item>
          </Form>
          <footer className="login__footer">
            <Link className="login__register" to="/user/register">
              Еще нет аккаунта? Зарегистрироваться.
            </Link>
          </footer>
        </section>
      )}
    </Spin>
  );
};

Login.defaultProps = {
  id: '',
  username: '',
  error: '',
};

export default connect(
  (state: State) => ({
    id: state.auth.id,
    username: state.auth.username,
    error: state.auth.error,
    isLoading: state.auth.isLoading,
  }),
  (dispatch) => ({
    signIn: bindActionCreators(signInAction, dispatch),
    putError: bindActionCreators(authErrorAction, dispatch),
  }),
)(Login);
