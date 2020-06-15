import React, { useState, useEffect } from 'react';

import Stories from '../../containers/Stories';
import Loading from '../../components/Loading';

import Posts from '../../containers/Posts';

import './FeedRoute.scss';

const FeedRoute = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [usersFetched, setUsersFetched] = useState(0);

  const getUserPostById = (postUserId) => users.find(user => postUserId === user.id);

  useEffect(() => {
    let mounted = true; 

    fetch('https://5e7d0266a917d70016684219.mockapi.io/api/v1/users')
      .then((res) => res.json())
      .then(data => {
        if (mounted) setUsers(data)
      });

    return () => mounted = false;
  }, []);

  useEffect(() => {
    if (usersFetched === users.length) {
      return;
    }

    let mounted = true; 

    fetch(`https://5e7d0266a917d70016684219.mockapi.io/api/v1/users/${users[usersFetched].id}/posts`)
      .then((res) => res.json())
      .then(data => {
        if (mounted) {
          setPosts([...posts, ...data]);
          setUsersFetched(usersFetched + 1);
        }
      });

    return () => mounted = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, usersFetched]);

  useEffect(() => {
    let mounted = true; 

    fetch('https://5e7d0266a917d70016684219.mockapi.io/api/v1/stories')
      .then((res) => res.json())
      .then(data => {
        if (mounted) setStories(data);
      });

    return () => mounted = false;
  }, [users]);

  return (
    <div data-testid="feed-route">
      {(users.length > 0 && stories.length > 0) && (
        <Stories
          stories={stories}
          getUserHandler={getUserPostById}
        />
      )}

      {users.length !== usersFetched
        ? (<Loading />)
        : (
          <Posts
            posts={posts}
            getUserHandler={getUserPostById}
          />)
      }
    </div>
  );
};

export default FeedRoute;
