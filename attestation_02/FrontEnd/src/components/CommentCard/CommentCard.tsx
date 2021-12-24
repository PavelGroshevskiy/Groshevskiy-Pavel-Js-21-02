// Компонент отрисовывающий предпросмотр комментария
import './CommentCard.scss';
import React from 'react';
import { Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import Popup from '../../wrappers/Popup/Popup';
import { DateTimeType } from '../../types/api/dumMyApiResponses';

interface Props {
  date: DateTimeType;
  text: string;
  userAvatar: string;
  userName: string;
  userId: string | undefined;
}

const CommentCard = ({
  userName, userAvatar, userId, date, text,
}: Props) => {
  const { t } = useTranslation();
  return (
    <section className="comment-card">
      <div className="user__avatar">
        <Avatar src={userAvatar} size="large" />
      </div>
      <div className="comment-card__container">
        <div className="comment-card__header">
          <div className="comment-card__user">
            <Popup comment={userId as string}>{userName}</Popup>
          </div>
          <div className="comment-card__date">{t('date', { date: date?.date, time: date?.time })}</div>
        </div>
        <div className="comment-card__text">{text}</div>
      </div>
    </section>
  );
};
export default CommentCard;
