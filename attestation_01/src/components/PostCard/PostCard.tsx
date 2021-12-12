// Компонент отрисовывающий Подвал
import './PostCard.scss';
import React, { useContext } from 'react';
import { Avatar, Skeleton } from 'antd';
import { ThemeContext } from '../../contexts/ThemeContext';
import Popup from '../../wrappers/Popup/Popup';
import { formatDateTime } from '../../api/utils';

interface Props {
  isLoading?: boolean;
  userId: string;
  date?: string;
  picture: string;
  text: string;
  userAvatar?: string;
  userName?: string;
}

const PostCard = ({ isLoading, userId, date, picture, text, userName, userAvatar }: Props) => {
  const themeContext = useContext(ThemeContext);
  if (isLoading) {
    return (
      <section className={`post-card ${themeContext.darkTheme && 'post-card_theme-dark'}`}>
        <Skeleton loading avatar>
          <div>fake</div>
        </Skeleton>
      </section>
    );
  }
  return (
    <section className={`post-card ${themeContext.darkTheme && 'post-card_theme-dark'}`}>
      {(date !== '' || userName !== '') && (
        <header className="post-card__header">
          <div className="post-card__user-avatar">
            <Avatar src={userAvatar} size="large" />
          </div>
          <div className="post-card__info">
            <div className="post-card__user">
              <Popup comment={userId as string}>{userName}</Popup>
            </div>
            <div className="post-card__date">{formatDateTime(date)}</div>
          </div>
        </header>
      )}
      <div style={{ backgroundImage: 'url('.concat(picture, ')') }} className="post-card__picture" />
      <div className="post-card__text">{text}</div>
    </section>
  );
};

PostCard.defaultProps = {
  isLoading: true,
  date: '',
  userAvatar: '',
  userName: '',
};

export default PostCard;
