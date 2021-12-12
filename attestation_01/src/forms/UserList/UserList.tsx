// Компонент отрисовывающий форму списка пользователей
import './UserList.scss';
import React, { useContext, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Alert, Pagination, Spin } from 'antd';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import UserCard from '../../components/UserCard/UserCard';
import { State, UserListState } from '../../redux/types/state';
import { IUsersLoadAction } from '../../redux/types/actions';
import { usersLoadAction } from '../../redux/actions/users';
import { PaginationHandlerType } from '../../types/pagination';
import { ThemeContext } from '../../contexts/ThemeContext';
import { PAGE_SIZES } from '../../types/api/dumMyApiResponses';
import { getDefaultPageSize } from '../../api/utils';
import { USER_URL } from '../../constants/api/dumMyApi';

interface Params {
  page: string;
}

interface Props {
  users: UserListState;
  getUsers: IUsersLoadAction;
}

const UserList = ({ users, getUsers }: Props) => {
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
      navigate(`/user/list/page/${newPage - 1}`);
    } else if (users.pageSize !== newSize) {
      getUsers(newPage, newSize);
    }
  };

  useEffect(() => {
    if (users.total > 0 && !checkPageLimits(users.total, Number(params.page), users.pageSize)) {
      return;
    }
    getUsers(Number(params.page), users.pageSize || undefined);
  }, [params]);

  return (
    <Spin spinning={users.isLoading}>
      <section className={`user-list ${themeContext.darkTheme && 'user-list_theme-dark'}`}>
        {users.error && users.error.length > 0 ? (
          <Alert message={users.error} type="error" banner className="user-list__error" />
        ) : (
          <div className="user-list__container">
            {users &&
              users.users.map((value) => (
                <Link to={`/user/profile/${value.id}`} key={`link_${value.id}`} className="user-list__show">
                  <UserCard isLoading={users.isLoading} user={value} key={value.id} />
                </Link>
              ))}
            {users.isLoading &&
              Array.from(Array(users.pageSize).keys()).map((value) => <UserCard isLoading user={{}} key={value} />)}
          </div>
        )}

        {users && !users.error && (
          <Pagination
            className="user-list__pager"
            current={Number(params.page || 0) + 1}
            pageSizeOptions={PAGE_SIZES}
            pageSize={users.pageSize || getDefaultPageSize(USER_URL)}
            total={users.total || 0}
            onChange={PaginationHandler}
            responsive
            showSizeChanger
            showLessItems
          />
        )}
      </section>
    </Spin>
  );
};

export default connect(
  (state: State) => ({
    users: state.users,
  }),
  (dispatch) => ({
    getUsers: bindActionCreators(usersLoadAction, dispatch),
  }),
)(UserList);
