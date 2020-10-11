import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadNewsfeed } from '../../store/actions/postsAction';
import Post from './Post/Post';

class Newsfeed extends Component {
  render() {
    const newsfeed = this.props.newsfeedPosts;
    if (!newsfeed) {
      this.props.loadNewsfeed();
    }
    return (
      <div>
        <h1>Newsfeed route</h1>
        {newsfeed &&
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadNewsfeed: (skip, limit) => dispatch(loadNewsfeed(skip, limit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);
