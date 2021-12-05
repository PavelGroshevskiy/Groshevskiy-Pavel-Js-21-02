import React, { useEffect, useState } from 'react';
import './Comments.css';
import { Pagination } from 'antd';
import Comment from '../../components/Comment/Comment';
import { CommentType } from '../../types/dumMyApiResponses';
import { getCommentsList, getUsersTotalCount } from '../../api/dumMyApi';

const renderComments = (
  showComments: boolean,
  commentsLoaded: boolean,
  loadComments: (page: number, limit: number) => void,
  usersTotalCount: number,
  comments: Array<CommentType>,
  page: number,
  pageSize: number,
  handleChangedUsersPage: (page: number, pageSize?: number) => void,
  darkTheme?: boolean,
) => (

  <div>
    {showComments && (commentsLoaded ? (
      <div className="comments-form__comments">
        {comments.length !== 0
          ? comments.map((elem: CommentType, index: number) => (
            <Comment
              id={elem.id}
              title={elem.title}
              firstName={elem.firstName}
              lastName={elem.lastName}
              picture={elem.picture}
              key={index}
              className={darkTheme ? 'comment_dark' : ''}
            />
          ))
          : 'Идёт загрузка'}
        <Pagination
          total={usersTotalCount}
          pageSize={pageSize}
          current={page + 1}
          onChange={(newPage, newPageSize) => handleChangedUsersPage(newPage - 1, newPageSize)}
        />
      </div>

    ) : 'Идёт загрузка')}

  </div>
);

const Comments = () => {
  const [comments, setComments] = useState([] as Array<CommentType>);
  const [usersTotal, setUsersTotal] = useState(0);
  const [commentsLoaded, setCommentsLoaded] = useState(true);
  const [showComments] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const loadComments = (newPage: number, limit: number) => {
    setCommentsLoaded(false);
    getCommentsList(
      newPage,
      limit,
      (resp: Array<CommentType>) => {
        setComments(resp);
        setCommentsLoaded(true);
      },
      () => setCommentsLoaded(true),
    );
  };

  // const loadPost = () => {
  //   getFishText(setPost);
  // };

  const loadUsersTotalCount = () => {
    getUsersTotalCount(setUsersTotal);
  };

  const handleChangedUsersPage = (newPage: number, newPageSize?: number) => {
    loadComments(newPage, newPageSize || pageSize);
    setPage(newPage);
    newPageSize && setPageSize(newPageSize);
  };

  useEffect(() => {
    loadUsersTotalCount();
    loadComments(0, 6);
    // loadPost();
  }, []);

  return (

    <div className="comments-form">
      {renderComments(
        showComments,
        commentsLoaded,
        loadComments,
        usersTotal,
        comments,
        page,
        pageSize,
        handleChangedUsersPage,
      )}
    </div>

  );
};

export default Comments;
