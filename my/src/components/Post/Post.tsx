import React from 'react';
import './Post.css';
import { EMPTY_STRING } from '../../constants/common';

interface Props {
  id: string,
  text: string,
  image: string,
  likes?: number,
  tags?: Array<string>,
  publishDate: string,
  owner: object,
  className?: string,
}

const Post = ({
  id,
  text,
  image,
  publishDate,
  owner,
  className,
  likes,
  tags,
}: Props) => (
  <div className={`post ${className}`}>
    <img alt="Kartinka" className="post-picture" src={image} />
    <span className="post-text">{text}</span>
    <span className="post-publishDate">{publishDate}</span>
    <span className="post-owner">{owner}</span>
    <span className="post-id">{id}</span>
    <span className="post-likes">{likes}</span>
    <span className="post-tags">{tags}</span>

  </div>
);

Post.defaultProps = {
  className: EMPTY_STRING,
  likes: null,
  tags: [],
};

export default Post;
