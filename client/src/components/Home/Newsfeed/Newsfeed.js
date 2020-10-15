import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadNewsfeed } from '../../../store/actions/postsAction';
import Post from '../../Post/Post';

class Newsfeed extends Component {
  render() {
    if (!this.props.isAuthenticated || this.props.authLoading) {
      return null;
    }

    const myUser = this.props.myUser;
    const newsfeed = this.props.newsfeedPosts;
    if (!newsfeed) {
      this.props.loadNewsfeed();
    }
    return (
      <div>
        <h1>Newsfeed</h1>
        {myUser &&
          newsfeed &&
          newsfeed.map((post) => {
            const liked =
              post.likes.findIndex((likerId) => likerId === myUser._id) !== -1;
            const isMine = myUser.posts.find(
              (pId) => pId === post._id.toString()
            );
            return (
              <Post key={post._id} post={post} liked={liked} isMine={isMine} />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newsfeedPosts: state.posts.newsfeedPosts,
    myUser: state.users.myUser,
    isAuthenticated: state.auth.isAuthenticated,
    authLoading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadNewsfeed: (skip, limit) => dispatch(loadNewsfeed(skip, limit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);
