// Компонент отрисовывающий Подвал
import './UserCard.scss';
import React, { useContext } from 'react';
import {
  Button, Divider, Skeleton, Typography,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { UserType } from '../../types/api/dumMyApiResponses';
import { ThemeContext } from '../../contexts/ThemeContext';
import Popup from '../../wrappers/Popup/Popup';

const { Title } = Typography;

interface Props {
  isLoading?: boolean;
  type?: 'horizontal' | 'vertical';
  user: UserType;
  editHandler?: () => void;
}
const UserCard = ({
  isLoading, type, user, editHandler,
}: Props) => {
  const { t } = useTranslation();
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
          <Popup comment={user.id as string}>
            {`${user.title && t(`title-items.${user.title}`)} ${user.lastName} ${user.firstName}`}
          </Popup>
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
          <Title level={4}>
            {`${user.title && t(`title-items.${user.title}`)} ${user.lastName} ${user.firstName}`}
          </Title>
          {editHandler && (
            <Button type="primary" onClick={editHandler}>
              <EditOutlined />
              {t('user-card.edit-button')}
            </Button>
          )}
        </div>
        <div>
          <span>{t('user.gender-label')}:</span>
          <span>{t(`gender-items.${user.gender}`)}</span>
        </div>
        <div>
          <span>{t('user.birthDate-label')}:</span>
          <span>{t('dateFull', { date: user.dateOfBirth?.date })}</span>
        </div>
        <div>
          <span>{t('user.regDate-label')}:</span>
          <span>{t('dateTimeFull', { date: user.registerDate?.date, time: user.registerDate?.time })}</span>
        </div>
        <div>
          <span>{t('user.email-label')}:</span>
          <span>{user.email}</span>
        </div>
        <div>
          <span>{t('user.phone-label')}:</span>
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
