import React from 'react';
import { Component } from 'react';
import Comment from './Comment/Comment';

class Comments extends Component {
  render() {
    const comments = this.props.comments;
    return comments.map((comment) => {
      return <Comment key={comment._id} comment={comment} />;
    });
  }
}

export default Comments;
