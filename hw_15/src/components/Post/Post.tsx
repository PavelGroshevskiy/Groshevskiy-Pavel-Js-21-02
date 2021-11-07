/* eslint-disabled */

import React from 'react';
import './Post.css';

interface Props {
  text: string;
  className?: string;
}

export default class Post extends React.Component<Props> {
  // ------------------------------Этап монтирования----------------------------------
  constructor(props: Props) { // Выполняется первым при монтировании компонента
    super(props);
  }

  render() { // Выполняется вторым при монтировании компонента. Выполняется вторым при обновлении (если shouldComponentUpdate вернул true)
    return (
      <div className={`post ${this.props.className}`}>
        <div className="post__text">
          {this.props.text}
        </div>
        <div className="post__like" />
      </div>
    );
  }
}
