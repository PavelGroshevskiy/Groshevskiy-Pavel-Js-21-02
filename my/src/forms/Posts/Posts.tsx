import React, { useEffect, useState } from 'react';
import Post from '../../components/Post/Post';
import { PostResponseType } from '../../types/dumMyApiResponses';
import { getPostList } from '../../api/dumMyApi';

const renderPosts = (showPosts: boolean, postsLoaded: boolean, posts: Array<PostResponseType>, darkTheme?: boolean) => (
  <div>
    {showPosts && (postsLoaded ? (
      <div className="posts-form">
        {posts.length !== 0
          ? posts.map((elem: PostResponseType, index: number) => (
            <Post
              id={elem.id}
              text={elem.text}
              publishDate={elem.publishDate}
              owner={elem.owner}
              image={elem.image}
              key={index}
              className={darkTheme ? 'comment_dark' : ''}
            />
          ))
          : 'Идёт загрузка'}
      </div>
    ) : 'Идёт загрузка')}
  </div>
);

const Posts = () => {
  const [posts, setPosts] = useState([] as Array<PostResponseType>);
  // const [post, setPost] = useState(EMPTY_STRING);
  const [postsLoaded, setPostsLoaded] = useState(true);
  const [showPosts] = useState(true);

  const loadPosts = (page: number, limit: number) => {
    getPostList(
      page,
      limit,
      (resp: Array<PostResponseType>) => {
        setPosts(resp);
        setPostsLoaded(true);
      },
      () => setPostsLoaded(true),
    );
  };

  // const loadPost = () => {
  //   getFishText(setPost);
  // };

  useEffect(() => {
    loadPosts(0, 5);
    // loadPost();
  }, []);

  return (

    <div className="comments-form">
      {/* {renderPost(post)} */}
      {renderPosts(showPosts, postsLoaded, posts)}
      {/* Подтверждение ухода со страницы */}
    </div>

  );
};

export default Posts;
