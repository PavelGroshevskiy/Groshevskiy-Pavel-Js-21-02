import React from 'react';
import './Comment.css';

interface Props {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
  addLike?: () => void;
  removeLike?: () => void;
  className?: string;
}

interface State {
  liked: boolean
}

export default class Comment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.state = { liked: false };
  }

  componentWillUnmount(): void {
    console.log('Комментарий размонтирован');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleLike(e: any) {
    !this.state.liked
      ? this.props.addLike && this.props.addLike()
      : this.props.removeLike && this.props.removeLike();
    this.setState({
      liked: !this.state.liked,
    });
  }

  render() {
    return (
      <div className={`comment ${this.props.className}`}>
        <div className="form-picture">
          <img src={this.props.picture} alt="" />
        </div>
        <span>{`${this.props.title}. `}</span>
        <span>{`${this.props.firstName}`}</span>
        <span>{`${this.props.lastName}`}</span>
      </div>
    );
  }
}
