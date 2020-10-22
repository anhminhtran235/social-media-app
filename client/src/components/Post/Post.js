import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  commentOnPost,
  deletePost,
  likePost,
} from '../../store/actions/postsAction';
import Comments from './Comments/Comments';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class Post extends Component {
  state = {
    comment: '',
    isCommentOn: false,
    reRender: null,
  };

  componentDidMount() {
    if (this.props.enableComment) {
      this.setState({ isCommentOn: true });
    }
    const reRenderEvery20Seconds = 20 * 1000;
    this.interval = setInterval(() => {
      this.setState({ reRender: Date.now() });
    }, reRenderEvery20Seconds);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onToggleLike = (postId, postOwnerId) => {
    this.props.likePost(postId, postOwnerId);
  };

  onToggleComment = () => {
    const commentOn = this.state.isCommentOn;
    this.setState({
      isCommentOn: !commentOn,
    });
  };

  onCommentPost = (postId, postOwnerId) => {
    this.props.commentOnPost(postId, postOwnerId, this.state.comment);
    this.setState({ comment: '' });
  };

  goToUserPage = (id) => {
    this.props.history.push('/users/' + id);
  };

  goToPostPage = (postId) => {
    this.props.history.push('/post/' + postId);
  };

  render() {
    const {
      author,
      authorName,
      content,
      comments,
      likes,
      createdAt,
      _id,
    } = this.props.post;

    const post = this.props.post;
    const myUser = this.props.myUser;
    const iDidLike =
      post.likes.findIndex((likerId) => likerId === myUser._id) !== -1;
    const isMine = myUser.posts.find((pId) => pId === post._id.toString());

    let commentSection = null;
    if (this.state.isCommentOn) {
      commentSection = (
        <div className='mt-3'>
          <div className='form-inline'>
            <input
              type='text'
              className='form-control w-50 mr-1'
              placeholder='Add a comment'
              value={this.state.comment}
              name='comment'
              onChange={this.onInputChange}
            />
            <Button
              className='btn-success'
              onClick={() => this.onCommentPost(_id, author)}
            >
              Comment
            </Button>
          </div>

          <Comments comments={comments} />
        </div>
      );
    }
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
                  <a
                    className='h7 text-muted clickable'
                    onClick={() => this.goToUserPage(author)}
                  >
                    {authorName}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='mb-3'>
              <a
                className='text-muted h7 clickable'
                onClick={() => this.goToPostPage(post._id)}
              >
                {' '}
                <i className='fa fa-clock-o'></i> {moment(createdAt).fromNow()}
              </a>
            </div>
            <p className='card-text'>{content}</p>
          </div>
          <div className='card-footer'>
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <a
                  className='card-link clickable'
                  onClick={() => this.onToggleLike(_id, author)}
                >
                  <i className='fa fa-gittip'></i>{' '}
                  {'Like (' + likes.length + ')'}
                </a>
                <a
                  className='card-link clickable'
                  onClick={this.onToggleComment}
                >
                  <i className='fa fa-comment'></i>{' '}
                  {'Comment (' + comments.length + ')'}
                </a>
              </div>
              {isMine && (
                <Button onClick={() => this.props.deletePost(_id)}>
                  Delete Post
                </Button>
              )}
            </div>

            {commentSection}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myUser: state.users.myUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    likePost: (postId, postOwnerId) => dispatch(likePost(postId, postOwnerId)),
    commentOnPost: (postId, postOwnerId, content) =>
      dispatch(commentOnPost(postId, postOwnerId, content)),
    deletePost: (postId) => dispatch(deletePost(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
