import React, { Component } from 'react';

class Post extends Component {
  render() {
    const {
      author,
      content,
      comments,
      likes,
      createdAt,
      _id,
    } = this.props.post;
    return (
      <div>
        <p>Author: {author}</p>
        <p>Content: {content}</p>
        <p>Comments: {comments.length}</p>
        <p>Likes: {likes.length}</p>
        <p>Date created: {createdAt}</p>
      </div>
    );
  }
}

export default Post;
