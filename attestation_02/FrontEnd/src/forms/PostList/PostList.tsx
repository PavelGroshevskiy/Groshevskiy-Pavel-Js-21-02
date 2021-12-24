// Компонент отрисовывающий форму списка пользователей
import './PostList.scss';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Alert, Pagination, Spin } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IPostsHidePostAction, IPostsLoadAction, IPostsShowPostAction } from '../../redux/types/actions';
import PostCard from '../../components/PostCard/PostCard';
import { PostListState, State } from '../../redux/types/state';
import { postsHidePostAction, postsLoadAction, postsShowPostAction } from '../../redux/actions/posts';
import { PAGE_SIZES, PostPreview } from '../../types/api/dumMyApiResponses';
import { PaginationHandlerType } from '../../types/pagination';
import Modal from '../../wrappers/Modal/Modal';
import PostInfo from '../PostInfo/PostInfo';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getDefaultPageSize } from '../../api/utils';
import { POST_URL } from '../../constants/api/dumMyApi';

interface Params {
  page: string;
  postId: string;
}

interface Props {
  posts: PostListState;
  getPosts: IPostsLoadAction;
  show: IPostsShowPostAction;
  hide: IPostsHidePostAction;
}

const PostList = ({
  posts, getPosts, show, hide,
}: Props) => {
  const themeContext = useContext(ThemeContext);
  const params = useParams() as Params;
  const navigate = useNavigate();

  const checkPageLimits = (totalN: number, page: number, pageSize: number): boolean => {
    if (totalN < page * pageSize) {
      navigate('/error/wrong-page');
      return false;
    }
    return true;
  };

  const PaginationHandler: PaginationHandlerType = (newPage, newSize) => {
    if (Number(params.page || 0) !== newPage - 1) {
      navigate(`/page/${newPage - 1}`);
    } else if (posts.pageSize !== newSize) {
      getPosts(newPage, newSize);
    }
  };

  const showHandler = (post: PostPreview) => {
    if (post.id) {
      show(post);
    }
  };

  useEffect(() => {
    if (
      posts.total > 0
      && posts.pageSize !== undefined
      && !checkPageLimits(posts.total, Number(params.page), posts.pageSize)
    ) {
      return;
    }
    getPosts(Number(params.page), posts.pageSize || undefined);
  }, [params]);

  return (
    <Spin spinning={posts.isLoading && posts.isLoading}>
      <section className={`post-list ${themeContext.darkTheme && 'post-list_theme-dark'}`}>
        {posts.error && posts.error.length > 0 ? (
          <Alert message={posts.error} type="error" banner className="post-list__error" />
        ) : (
          <div className="post-list__container">
            {posts
              && posts.posts.map((value: PostPreview) => (
                <button onClick={() => showHandler(value)} type="button" className="post-list__show" key={value.id}>
                  <PostCard
                    isLoading={posts.isLoading}
                    userId={value.owner.id}
                    userName={`${value.owner.title} ${value.owner.lastName} ${value.owner.firstName}`}
                    userAvatar={value.owner.picture}
                    text={value.text || ''}
                    date={value.publishDate}
                    picture={value.image || ''}
                  />
                </button>
              ))}
          </div>
        )}
        {posts && !posts.error && (
          <Pagination
            className="post-list__pager"
            current={Number(params.page || 0) + 1}
            pageSizeOptions={PAGE_SIZES}
            pageSize={posts.pageSize || getDefaultPageSize(POST_URL)}
            total={Number(posts.total) || 0}
            onChange={PaginationHandler}
            responsive
            showSizeChanger
            showLessItems
          />
        )}
      </section>
      {posts.post?.id && (
        <Modal isOpened closeCallBack={hide}>
          <PostInfo post={posts.post} />
        </Modal>
      )}
    </Spin>
  );
};

export default connect(
  (state: State) => ({
    posts: state.posts,
  }),
  (dispatch) => ({
    getPosts: bindActionCreators(postsLoadAction, dispatch),
    show: bindActionCreators(postsShowPostAction, dispatch),
    hide: bindActionCreators(postsHidePostAction, dispatch),
  }),
)(PostList);
