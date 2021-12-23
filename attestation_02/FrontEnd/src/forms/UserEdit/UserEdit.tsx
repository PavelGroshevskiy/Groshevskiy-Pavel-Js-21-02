// Компонент отрисовывающий форму списка пользователей
import './UserEdit.scss';
import React, { useContext } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Moment } from 'moment';
import {
  Alert, Button, Divider, Form, Spin,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { UserType } from '../../types/api/dumMyApiResponses';
import { render } from './render';
import { State } from '../../redux/types/state';
import { updateUserAction, uploadAvatarAction, usersErrorAction } from '../../redux/actions/users';
import { ThemeContext } from '../../contexts/ThemeContext';
import { IUsersErrorAction } from '../../redux/types/actions';

interface Props {
  user: UserType;
  error?: string;
  updateUser: (user: UserType, edit: boolean) => {};
  uploadAvatar: (id: string, file: Blob) => {};
  isLoading: boolean;
  showError: IUsersErrorAction;
}

const UserEdit = ({
  user, error, updateUser, uploadAvatar, isLoading, showError,
}: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const file = React.createRef<HTMLInputElement>();
  const themeContext = useContext(ThemeContext);

  const deleteAvatar = (): void => {
    user?.id && updateUser({ id: user.id, picture: '' }, true);
  };

  const updateAvatar = (): void => {
    if (user?.id && file.current?.files?.length === 1) {
      file.current?.files[0].arrayBuffer().then((fileData) => {
        uploadAvatar(user.id as string, new Blob([fileData]));
      });
    }
  };

  const updateInfo = (): void => {
    form
      .validateFields()
      .then((fields: any) => {
        const oldValues = Object(user);
        const userData: UserType = Object.entries(fields)
          .filter((value) => value[1] !== oldValues[value[0]])
          .reduce((obj, e) => ({ ...obj, [e[0]]: e[1] }), {});

        delete userData.registerDate;
        delete userData.dateOfBirth;

        if (
          fields.dateOfBirth // &&
          // (fields.dateOfBirth as Moment).format('YYYY-MM-DD') !== moment(user.dateOfBirth).format('YYYY-MM-DD')
        ) {
          userData.dateOfBirth = {
            date: (fields.dateOfBirth as Moment).format('YYYY-MM-DD'),
            time: (fields.dateOfBirth as Moment).format('HH:MM'),
          };
        }

        userData.id = user.id;
        updateUser(userData, false);
      })
      .catch(() => {
        showError(t('user.base-error'));
      });
  };
  return (
    <Spin spinning={isLoading}>
      <section className={`user-edit ${themeContext.darkTheme && 'user-edit_theme-dark'}`}>
        <input
          ref={file}
          type="file"
          className="user-edit__hide"
          multiple
          accept="image/*"
          key="avatar_file"
          onChange={updateAvatar}
        />
        {error && error.length > 0 && <Alert>{error}</Alert>}
        {user.picture && user.picture.length > 0 ? (
          [
            <div
              className="user-edit__avatar"
              style={{ backgroundImage: 'URL('.concat(user.picture, ')') }}
              key="avatar"
            />,

            <div className="user-edit__avatar_controls" key="avatar_controls">
              <Button type="primary" className="user-edit__avatar-upload" onClick={() => file.current?.click()}>
                {t('edit.img-update-button')}
              </Button>
              <Divider type="vertical" className="user-edit__divider" />
              <Button type="primary" className="user-edit__avatar-remove" danger onClick={deleteAvatar}>
                {t('edit.img-delete-button')}
              </Button>
            </div>,
          ]
        ) : (
          <div className="user-edit__avatar_controls">
            <Button type="primary" className="user-edit__avatar-upload" onClick={() => file.current?.click()}>
              {t('edit.img-upload-button')}
            </Button>
          </div>
        )}
        <div className="user-edit_form_container">{render(form, user, themeContext.darkTheme, updateInfo, t)}</div>
      </section>
    </Spin>
  );
};

UserEdit.defaultProps = {
  error: '',
};

export default connect(
  (state: State) => ({
    error: state.users.error,
    isLoading: state.users.isLoading,
  }),
  (dispatch) => ({
    updateUser: bindActionCreators(updateUserAction, dispatch),
    uploadAvatar: bindActionCreators(uploadAvatarAction, dispatch),
    showError: bindActionCreators(usersErrorAction, dispatch),
  }),
)(UserEdit);
