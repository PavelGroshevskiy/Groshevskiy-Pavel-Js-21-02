import React from 'react';
import './Comments.css';
import Comment from '../../components/Comment/Comment';
import { CommentType } from '../../types/dumMyApiResponses';
import ComponentWithHelper from '../../wrappers/ComponentWithHelper';
import Post from '../../components/Post/Post';
import { getCommentsList } from '../../api/dumMyApi';
import { ThemeContextConsumer, ThemeContextState } from '../../contexts/ThemeContext';

interface State {
  comments: Array<CommentType>;
  countOfLikes: number;
  showComments: boolean;
}

const initialState = {
  comments: [],
  countOfLikes: 0,
  showComments: true,
};

export default class Comments extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
    this.handleShowCommentButton = this.handleShowCommentButton.bind(this);
    this.loadComments = this.loadComments.bind(this);
  }

  componentDidMount(): void {
    this.loadComments(0, 10);
  }

  handleShowCommentButton() {
    this.setState({ showComments: !this.state.showComments });
  }

  loadComments(page: number, limit: number) {
    getCommentsList(page, limit, (resp: Array<CommentType>) => this.setState({ comments: resp }));
  }

  addLike() {
    this.setState({ countOfLikes: this.state.countOfLikes + 1 });
  }

  removeLike() {
    this.setState({ countOfLikes: this.state.countOfLikes - 1 });
  }

  render() {
    return (
      <ThemeContextConsumer>
        {
        (context: Partial<ThemeContextState>) => (
          <div className="comments-form">
            <div className="comments-form__post">
              <h1>
                <Post
                  text="Пользователи"
                  className={context.darkTheme ? 'comment_dark' : ''}
                />
              </h1>
            </div>
            {this.state.showComments && (
            <div className="comments-form__comments">
              {this.state.comments.length !== 0
                ? this.state.comments.map((elem: CommentType, index: number) => (
                  <ComponentWithHelper comment={elem.id} key={index}>
                    {/* Компонент ниже попадёт в props.children компонента ComponentWithHelper */}
                    <Comment
                      id={elem.id}
                      firstName={elem.firstName}
                      lastName={elem.lastName}
                      picture={elem.picture}
                      title={elem.title}
                      className={context.darkTheme ? 'comment_dark' : ''}
                    />
                  </ComponentWithHelper>
                ))
                : 'При загрузке произошла ошибка'}
            </div>
            )}
          </div>
        )
}
      </ThemeContextConsumer>
    );
  }
}
