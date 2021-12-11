// Компонент отрисовывающий Подвал
import './UserCard.scss';
import React, { useContext } from 'react';
import { Button, Divider, Skeleton, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { UserType } from '../../types/api/dumMyApiResponses';
import { ThemeContext } from '../../contexts/ThemeContext';
import Popup from '../../wrappers/Popup/Popup';
import { formatDateTime } from '../../api/utils';

const { Title } = Typography;

interface Props {
  isLoading?: boolean;
  type?: 'horizontal' | 'vertical';
  user: UserType;
  editHandler?: () => void;
}
const UserCard = ({ isLoading, type, user, editHandler }: Props) => {
  const themeContext = useContext(ThemeContext);

  if (isLoading) {
    return (
      <Skeleton loading avatar className="user-card">
        <div>fake</div>
      </Skeleton>
    );
  }
  if (type === 'horizontal') {
    return (
      <section
        className={`user-card user-card_horizontal user-card_hover ${themeContext.darkTheme && 'user-card_theme-dark'}`}
        key={user.id}
      >
        {user.picture ? (
          <div
            style={{ backgroundImage: 'url('.concat(user.picture, ')') }}
            className="user-card__avatar user-card__avatar_horizontal"
          />
        ) : (
          <div className="user-card__avatar user-card__avatar_horizontal" />
        )}
        <div>
          <Popup comment={user.id as string}>{`${user.title} ${user.lastName} ${user.firstName}`}</Popup>
        </div>
      </section>
    );
  }
  return (
    <section
      className={`user-card user-card__vertical ${themeContext.darkTheme && 'user-card_theme-dark'}`}
      key={user.id}
    >
      {user.picture ? (
        <div
          style={{ backgroundImage: 'url('.concat(user.picture, ')') }}
          className="user-card__avatar user-card__avatar_vertical"
        />
      ) : (
        <div className="user-card__avatar user-card__avatar_vertical" />
      )}
      <div className="user-card__container">
        <div className="user-card__header">
          <Title level={4}>{`${user.title} ${user.lastName} ${user.firstName}`}</Title>
          {editHandler && (
            <Button type="primary" onClick={editHandler}>
              <EditOutlined />
              Редактировать
            </Button>
          )}
        </div>
        <div>
          <span>Пол:</span>
          <span>{user.gender}</span>
        </div>
        <div>
          <span>Дата рождения:</span>
          <span>{formatDateTime(user.dateOfBirth)}</span>
        </div>
        <div>
          <span>Дата регистрации:</span>
          <span>{formatDateTime(user.registerDate)}</span>
        </div>
        <div>
          <span>Email:</span>
          <span>{user.email}</span>
        </div>
        <div>
          <span>Телефон:</span>
          <span>{user.phone}</span>
        </div>
        <Divider />
        <div>
          <span>ID:</span>
          <span>{user.id}</span>
        </div>
      </div>
    </section>
  );
};

UserCard.defaultProps = {
  isLoading: false,
  type: 'horizontal',
  editHandler: undefined,
};

export default UserCard;
