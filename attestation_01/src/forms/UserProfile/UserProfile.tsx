// Компонент отрисовывающий форму профиля пользователя
import './UserProfile.scss';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Pagination, Skeleton, Spin } from 'antd';
import UserCard from '../../components/UserCard/UserCard';
import PostCard from '../../components/PostCard/PostCard';
import { IPostsGetByUserAction,
  IPostsHidePostAction,
  IPostsShowPostAction,
  IUsersGetAction,
  UsersAction } from '../../redux/types/actions';
import { usersGetAction, usersHideEditorAction, usersShowEditorAction } from '../../redux/actions/users';
import { PostPreview } from '../../types/api/dumMyApiResponses';
import { AuthState, PostListState, State, UserListState } from '../../redux/types/state';
import { postsGetByUserAction, postsHidePostAction, postsShowPostAction } from '../../redux/actions/posts';
import Modal from '../../wrappers/Modal/Modal';
import PostInfo from '../PostInfo/PostInfo';
import UserEdit from '../UserEdit/UserEdit';
import { PaginationHandlerType } from '../../types/pagination';
import { ThemeContext } from '../../contexts/ThemeContext';

interface Params {
  page?: string;
  userId: string;
}

interface Props {
  isLoading: boolean;
  auth: AuthState;
  users: UserListState;
  posts: PostListState;
  getUser: IUsersGetAction;
  getPosts: IPostsGetByUserAction;
  showPost: IPostsShowPostAction;
  hidePost: IPostsHidePostAction;
  showUserEdit: () => UsersAction;
  hideUserEdit: () => UsersAction;
}

const UserProfile = ({
  isLoading,
  auth,
  users,
  posts,
  getUser,
  getPosts,
  showPost,
  hidePost,
  showUserEdit,
  hideUserEdit,
}: Props) => {
  const themeContext = useContext(ThemeContext);
  const params: Params = useParams() as Params;
  const navigate = useNavigate();

  useEffect(() => {
    if (params.userId) {
      getUser(params.userId);
      getPosts(params.userId, Number(params.page || 0) || 0, posts.pageSize);
    }
  }, [params.userId, params.page]);

  const PaginationHandler: PaginationHandlerType = (newPage, newSize) => {
    if (Number(params.page) !== newPage - 1) {
      navigate(`/user/profile/${params.userId}/page/${newPage - 1}`);
    } else if (posts.pageSize !== newSize) {
      getPosts(params.userId, newPage, newSize);
    }
  };

  const showHandler = (post: PostPreview) => {
    if (post.id) {
      showPost(post);
    }
  };

  return (
    <section className={`user-profile ${themeContext.darkTheme && 'user-profile_theme-dark'}`}>
      <Spin spinning={isLoading && isLoading}>
        {users.error && users.error.length > 0 ? (
          <Alert message={users.error} type="error" banner className="user_list__error" />
        ) : (
          <div className="user-profile__container">
            <Skeleton loading={isLoading && isLoading} active avatar paragraph={{ rows: 4 }}>
              <UserCard
                user={users.user}
                type="vertical"
                editHandler={auth.id === users.user.id ? showUserEdit : undefined}
                key={users.user.id}
              />
            </Skeleton>
          </div>
        )}
      </Spin>
      <Spin spinning={posts.isLoading}>
        {posts.error && posts.error.length > 0 ? (
          <Alert message={posts.error} type="error" banner className="user-profile__error" />
        ) : (
          <div className="user-profile__post">
            {posts.isLoading &&
              Array.from(Array(posts.pageSize).keys()).map((value) => (
                <div className="user-profile__show" key={value}>
                  <PostCard isLoading text="" picture="" userId="" />
                </div>
              ))}
            {posts &&
              Object.values(posts.posts).map((value: PostPreview) => (
                <button type="button" onClick={() => showHandler(value)} className="user-profile__show" key={value.id}>
                  <PostCard
                    isLoading={posts.isLoading}
                    text={value.text || ''}
                    picture={value.image || ''}
                    userId={value.owner.id}
                  />
                </button>
              ))}
          </div>
        )}
      </Spin>

      {posts.total > 0 && (
        <Pagination
          className="user-profile__pager"
          hideOnSinglePage
          current={Number(params.page || 0) + 1}
          pageSize={posts.pageSize}
          total={posts.total}
          onChange={PaginationHandler}
          responsive
          showSizeChanger
          showLessItems
        />
      )}
      {posts.post?.id && (
        <Modal isOpened closeCallBack={hidePost} key="modal_post">
          <PostInfo post={posts.post} />
        </Modal>
      )}
      {auth && users.user && users.user.id === auth.id && users.edit && (
        <Modal isOpened closeCallBack={hideUserEdit} key="modal_user">
          <UserEdit user={users.user} />
        </Modal>
      )}
    </section>
  );
};

export default connect(
  (state: State) => ({
    isLoading: state.users.isLoading,
    auth: state.auth,
    users: state.users,
    posts: state.posts,
  }),
  (dispatch) => ({
    getUser: bindActionCreators(usersGetAction, dispatch),
    getPosts: bindActionCreators(postsGetByUserAction, dispatch),
    showPost: bindActionCreators(postsShowPostAction, dispatch),
    hidePost: bindActionCreators(postsHidePostAction, dispatch),
    showUserEdit: bindActionCreators(usersShowEditorAction, dispatch),
    hideUserEdit: bindActionCreators(usersHideEditorAction, dispatch),
  }),
)(UserProfile);
