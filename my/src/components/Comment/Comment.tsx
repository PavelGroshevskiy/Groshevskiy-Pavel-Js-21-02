import React from 'react';
import './Comment.css';
import { Link } from 'react-router-dom';
import { EMPTY_STRING } from '../../constants/common';

// interface Props {
//   userId?: string;
//   name?: string;
//   className?: string;
// }

interface Props {
  id: string,
  title: string,
  firstName: string,
  lastName: string,
  picture: string,
  className?: string;
}

const Comment = ({
  id,
  title,
  firstName,
  lastName,
  picture,
  className,
}: Props) => (
  <div className={`comment ${className}`}>
    <img alt="Kartinka" className="comment__user-picture" src={picture} />
    <span className="comment__user-title">{title}</span>
    <span className="comment__user-firstName">{firstName}</span>
    <span className="comment__user-lastName">{lastName}</span>
    <Link to={`/user/${id}`}>Перейти к профилю</Link>
    <div className="comment__like" />
  </div>
);

Comment.defaultProps = {
  className: EMPTY_STRING,
};

export default Comment;
