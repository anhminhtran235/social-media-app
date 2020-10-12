import React, { Component } from 'react';
import { connect } from 'react-redux';
import { commentOnPost, likePost } from '../../store/actions/postsAction';

class Post extends Component {
  state = {
    comment: '',
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onToggleLike = (postId, postOwnerId) => {
    this.props.likePost(postId, postOwnerId);
  };

  onCommentPost = (postId, postOwnerId) => {
    this.props.commentOnPost(postId, postOwnerId, this.state.comment);
    this.setState({ comment: '' });
  };

  render() {
    const {
      author,
      content,
      comments,
      likes,
      createdAt,
      _id,
    } = this.props.post;
    const iDidLike = this.props.liked;
    return (
      <div>
        <p>Author: {author}</p>
        <p>Content: {content}</p>
        <p>Comments: {comments.length}</p>
        <p>Likes: {likes.length}</p>
        <p>Date created: {createdAt}</p>
        <button onClick={() => this.onToggleLike(_id, author)}>
          {iDidLike ? 'Unlike' : 'Like'}
        </button>
        <input
          type='text'
          placeholder='Add a comment'
          value={this.state.comment}
          name='comment'
          onChange={this.onInputChange}
        />
        <button onClick={() => this.onCommentPost(_id, author)}>Comment</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    likePost: (postId, postOwnerId) => dispatch(likePost(postId, postOwnerId)),
    commentOnPost: (postId, postOwnerId, content) =>
      dispatch(commentOnPost(postId, postOwnerId, content)),
  };
};

export default connect(null, mapDispatchToProps)(Post);
