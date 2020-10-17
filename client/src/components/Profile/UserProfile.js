import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserPosts } from '../../store/actions/postsAction';
import { loadAUser } from '../../store/actions/usersAction';
import Post from '../Post/Post';

class UserProfile extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.loadUserPosts(userId);
    this.props.loadAUser(userId);
  }

  render() {
    const user = this.props.user;

    let profile = null;
    if (user) {
      profile = (
        <div>
          <p>User name: {user.userName}</p>
          <p>Full name: {user.fullName}</p>
          <p>Age: {user.age}</p>
          <p>Bio: {user.bio}</p>
        </div>
      );
    }

    const posts = this.props.userPosts ? this.props.userPosts : [];

    return (
      <Fragment>
        {profile}
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserPosts: (userId) => dispatch(loadUserPosts(userId)),
    loadAUser: (userId) => dispatch(loadAUser(userId)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.users.currentlyViewingUser,
    userPosts: state.posts.currentPosts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
