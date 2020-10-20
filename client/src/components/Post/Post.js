import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  commentOnPost,
  deletePost,
  likePost,
} from '../../store/actions/postsAction';
// import Comments from './Comments/Comments';

class Post extends Component {
  state = {
    comment: '',
    isCommentOn: false,
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
      // createdAt,
      _id,
    } = this.props.post;
    // const iDidLike = this.props.liked;
    // const isMine = this.props.isMine;
    return (
      <div className='mb-4'>
        <div className='card gedf-card'>
          <div className='card-header'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='mr-2'>
                  <img
                    className='rounded-circle'
                    width='45'
                    src='https://picsum.photos/50/50'
                    alt=''
                  />
                </div>
                <div className='ml-2'>
                  <div className='h7 text-muted'>{author}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='text-muted h7 mb-2'>
              {' '}
              <i className='fa fa-clock-o'></i> 10 min ago
            </div>
            <p className='card-text'>{content}</p>
          </div>
          <div className='card-footer'>
            <a
              className='card-link clickable'
              onClick={() => this.onToggleLike(_id, author)}
            >
              <i className='fa fa-gittip'></i> {'Like (' + likes.length + ')'}
            </a>
            <a className='card-link clickable'>
              <i className='fa fa-comment'></i>{' '}
              {'Comment (' + comments.length + ')'}
            </a>
          </div>
        </div>
        {/* 
        <input
          type='text'
          placeholder='Add a comment'
          value={this.state.comment}
          name='comment'
          onChange={this.onInputChange}
        />
        <button onClick={() => this.onCommentPost(_id, author)}>Comment</button>
        {isMine && (
          <button onClick={() => this.props.deletePost(_id)}>
            Delete Post
          </button>
        )}
        <Comments comments={comments} />
        <p>______________________________________________________</p> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    likePost: (postId, postOwnerId) => dispatch(likePost(postId, postOwnerId)),
    commentOnPost: (postId, postOwnerId, content) =>
      dispatch(commentOnPost(postId, postOwnerId, content)),
    deletePost: (postId) => dispatch(deletePost(postId)),
  };
};

export default connect(null, mapDispatchToProps)(Post);
