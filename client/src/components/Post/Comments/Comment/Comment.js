import React from 'react';
import { Component } from 'react';

class Comment extends Component {
  render() {
    const comment = this.props.comment;
    return (
      <p>
        From {comment.author}: {comment.content} (at {comment.createdAt})
      </p>
    );
  }
}

export default Comment;
