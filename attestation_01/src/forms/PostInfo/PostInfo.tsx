// Компонент отрисовывающий форму списка пользователей
import './PostInfo.scss';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Avatar, Pagination, Spin } from 'antd';
import { CommentListState, State } from '../../redux/types/state';
import { PaginationHandlerType } from '../../types/pagination';
import { ICommentsLoadByPostAction } from '../../redux/types/actions';
import { commentsLoadByPostAction } from '../../redux/actions/comments';
import { CommentType, PAGE_SIZES, PostPreview } from '../../types/api/dumMyApiResponses';
import CommentCard from '../../components/CommentCard/CommentCard';
import { COMMENTS_PAGE_SIZE } from '../../constants/common';
import { ThemeContext } from '../../contexts/ThemeContext';
import Popup from '../../wrappers/Popup/Popup';
import { formatDateTime, getDefaultPageSize } from '../../api/utils';
import { COMMENTS_BY_POST } from '../../constants/api/dumMyApi';

interface Params {
  postId: string;
}

interface Props {
  post: PostPreview;
  comments: CommentListState;
  getComments: ICommentsLoadByPostAction;
}

const PostInfo = ({ post, comments, getComments }: Props) => {
  const params = useParams() as Params;
  const themeContext = useContext(ThemeContext);

  const PaginationHandler: PaginationHandlerType = (newPage, pageSize) => {
    post.id && getComments(post.id, newPage - 1, pageSize || comments.pageSize);
  };

  useEffect(() => {
    post.id && getComments(post.id, 0, comments.pageSize);
  }, [params]);

  return (
    <section className={`post-info ${themeContext.darkTheme && 'post-info_theme-dark'}`}>
      {post.owner && (
        <header className="post-info__header">
          <div className="user__avatar">
            <Avatar src={post.owner.picture} size="large" />
          </div>
          <div className="post-info__user">
            <Popup comment={post.owner.id as string}>
              {`${post.owner.title} ${post.owner.lastName} ${post.owner.firstName}`}
            </Popup>
          </div>
          {/* FIXME правильный вывод даты */}
          <div className="post-info__date">{formatDateTime(post.publishDate)}</div>
        </header>
      )}
      <div style={{ backgroundImage: 'url('.concat(post.image || '', ')') }} className="post-info__picture" />
      <div className="post-info__text">{post.text}</div>
      <Spin spinning={comments.isLoading && comments.isLoading}>
        <section className="comment-list">
          {comments.error && comments.error.length > 0 ? (
            <Alert message={comments.error} type="error" banner className="comment-list__error" />
          ) : (
            <div className="comment-list__container">
              {comments &&
                comments.comments.map((value: CommentType) => (
                  <CommentCard
                    text={value.message || ''}
                    userName={`${value.owner?.lastName} ${value.owner?.firstName}`}
                    userAvatar={value.owner?.picture || ''}
                    userId={value.owner?.id}
                    date={value.publishDate || ''}
                    key={value.id}
                  />
                ))}
            </div>
          )}
        </section>
        {comments.total > COMMENTS_PAGE_SIZE && !comments.error && (
          <Pagination
            className="post-info__pager"
            pageSizeOptions={PAGE_SIZES}
            current={Number(comments.page || 0) + 1}
            defaultCurrent={comments.page || 0}
            pageSize={comments.pageSize || getDefaultPageSize(COMMENTS_BY_POST)}
            total={Number(comments.total) || 0}
            size="small"
            responsive
            showSizeChanger
            showLessItems
            onChange={PaginationHandler}
          />
        )}
      </Spin>
    </section>
  );
};

export default connect(
  (state: State) => ({
    comments: state.comments,
  }),
  (dispatch) => ({
    getComments: bindActionCreators(commentsLoadByPostAction, dispatch),
  }),
)(PostInfo);
