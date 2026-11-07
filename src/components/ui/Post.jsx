import React, { useState, useEffect } from 'react';
import axios from '../../api/auth/axios';
import '../styles/post.css';
import PostCard from './PostCard';

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/post');
        setPosts(response.data.data || response.data);
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (message.trim() && error === 'Post cannot be empty') {
      setError('');
    }
  }, [message, error]);

  const submit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError('Post cannot be empty');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const response = await axios.post('/post', { message });
      const newPost = response.data.data || response.data;

      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setMessage('');
    } catch (err) {
      console.error('Failed to create post', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Network Error: Check if backend server is running'
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="post-container">
      <div className="post-form-container">
        <form onSubmit={submit}>
          <div className="post-header">
            <h2>Create Post</h2>
          </div>

          <div className="post-body">
            <textarea
              className="post-input"
              placeholder="What's on your mind?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={processing}
              rows={4}
            />
          </div>

          {error && (
            <div className="post-error" style={{ color: 'red', marginTop: '8px' }}>
              {error}
            </div>
          )}

          <div className="post-footer">
            <button
              type="submit"
              className="post-submit-btn"
              disabled={processing || !message.trim()}
            >
              {processing ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>

      <div className="post-feed-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id || Math.random()}
              post={post}
            />
          ))
        ) : (
          <div className="post-empty-state">
            No posts shared yet.
          </div>
        )}
      </div>
    </div>
  );
}