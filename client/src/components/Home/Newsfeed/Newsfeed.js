import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadNewsfeed } from '../../../store/actions/postsAction';
import Post from '../../Post/Post';

class Newsfeed extends Component {
  componentDidUpdate() {
    if (this.props.isAuthenticated && !this.props.newsfeedPosts) {
      this.props.loadNewsfeed();
    }
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.loadNewsfeed();
    }
  }

  render() {
    if (!this.props.isAuthenticated || !this.props.newsfeedPosts) {
      return null;
    }

    const myUser = this.props.myUser;
    const newsfeed = this.props.newsfeedPosts;

    return (
      <div>
        <h1 className='text-primary mb-4'>Newsfeed</h1>
        {myUser &&
          newsfeed &&
          newsfeed.map((post) => {
            return <Post key={post._id} post={post} />;
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
