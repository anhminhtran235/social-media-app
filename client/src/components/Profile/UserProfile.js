import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserPosts } from '../../store/actions/postsAction';
import { loadAUser } from '../../store/actions/usersAction';
import Post from '../Post/Post';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {
  addFriend,
  cancelFriendRequest,
  unfriend,
} from '../../store/actions/usersAction';

class UserProfile extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.loadUserPosts(userId);
    this.props.loadAUser(userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const userId = this.props.match.params.id;
      this.props.loadUserPosts(userId);
      this.props.loadAUser(userId);
    }
  }

  render() {
    const userId = this.props.match.params.id;
    const user = this.props.user;
    const myUser = this.props.myUser;
    if (!user || !myUser) {
      return null;
    } else if (this.props.myUser._id === userId) {
      this.props.history.push('/users/me');
    }
    const { _id, userName, fullName, bio, age } = user;
    const isMyFriend = myUser.friends.includes(_id);
    const hasSentFriendRequest = myUser.sentFriendRequests.includes(_id);
    const hasSentMeFriendRequest = user.sentFriendRequests.includes(myUser._id);

    let addFriendButton = null;
    if (isMyFriend) {
      addFriendButton = (
        <Button
          className='btn-primary'
          onClick={() => this.props.unfriend(_id)}
        >
          Unfriend
        </Button>
      );
    } else if (hasSentFriendRequest) {
      addFriendButton = (
        <Button
          className='btn-primary'
          onClick={() => this.props.cancelFriendRequest(_id)}
        >
          Unsend friend request
        </Button>
      );
    } else if (hasSentMeFriendRequest) {
      addFriendButton = (
        <Button
          className='btn-success'
          onClick={() => this.props.addFriend(_id)}
        >
          Accept friend request
        </Button>
      );
    } else {
      addFriendButton = (
        <Button
          className='btn-success'
          onClick={() => this.props.addFriend(_id)}
        >
          Add friend
        </Button>
      );
    }

    const profile = (
      <form onSubmit={this.updateProfile} className='mb-4'>
        <div className='form-group row'>
          <label htmlFor='userName' className='col-sm-2 col-form-label'>
            User Name
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              value={userName}
              disabled
            />
          </div>
        </div>
        <div className='form-group row'>
          <label htmlFor='fullName' className='col-sm-2 col-form-label'>
            Full Name
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              value={fullName}
              disabled
            />
          </div>
        </div>
        <div className='form-group row'>
          <label htmlFor='age' className='col-sm-2 col-form-label'>
            Age
          </label>
          <div className='col-sm-10'>
            <input
              type='number'
              className='form-control'
              value={age}
              disabled
            />
          </div>
        </div>
        <div className='form-group row'>
          <label htmlFor='bio' className='col-sm-2 col-form-label'>
            Bio
          </label>
          <div className='col-sm-10'>
            <textarea
              type='text'
              className='form-control'
              value={bio}
              disabled
            />
          </div>
        </div>
        {addFriendButton}
      </form>
    );

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

const mapStateToProps = (state) => {
  return {
    myUser: state.users.myUser,
    user: state.users.currentlyViewingUser,
    userPosts: state.posts.currentPosts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (id) => dispatch(addFriend(id)),
    cancelFriendRequest: (id) => dispatch(cancelFriendRequest(id)),
    unfriend: (id) => dispatch(unfriend(id)),
    loadUserPosts: (userId) => dispatch(loadUserPosts(userId)),
    loadAUser: (userId) => dispatch(loadAUser(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserProfile));
