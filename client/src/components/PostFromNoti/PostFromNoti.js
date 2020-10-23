import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAPost } from '../../store/actions/postsAction';
import Post from '../Post/Post';

class PostFromNoti extends Component {
  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.loadCurrentPost(postId);
  }

  componentDidUpdate(prevProps) {
    const postId = this.props.match.params.id;
    if (postId !== prevProps.match.params.id) {
      this.props.loadCurrentPost(postId);
    }
  }

  render() {
    console.log(this.props);
    const post = this.props.currentPost;
    if (!post) {
      return null;
    }
    return <Post key={post._id} post={post} enableComment />;
  }
}

const mapStateToProps = (state) => {
  return {
    currentPost: state.posts.currentPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCurrentPost: (id) => dispatch(loadAPost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostFromNoti);
