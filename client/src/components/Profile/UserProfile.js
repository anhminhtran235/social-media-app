import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserPosts } from '../../store/actions/postsAction';
import { loadAUser } from '../../store/actions/usersAction';
import Post from '../Post/Post';
import { withRouter } from 'react-router-dom';

class UserProfile extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.loadUserPosts(userId);
    this.props.loadAUser(userId);
  }

  render() {
    const user = this.props.user;
    if (!user) {
      return null;
    } else if (this.props.myUser._id === user._id) {
      this.props.history.push('/users/me');
    }

    const profile = (
      <form onSubmit={this.updateProfile} className='mb-4'>
        <div className='form-group row'>
          <label for='userName' className='col-sm-2 col-form-label'>
            User Name
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              value={user.userName}
              disabled
            />
          </div>
        </div>
        <div className='form-group row'>
          <label for='fullName' className='col-sm-2 col-form-label'>
            Full Name
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              value={user.fullName}
              disabled
            />
          </div>
        </div>
        <div className='form-group row'>
          <label for='age' className='col-sm-2 col-form-label'>
            Age
          </label>
          <div className='col-sm-10'>
            <input
              type='number'
              className='form-control'
              value={user.age}
              disabled
            />
          </div>
        </div>
        <div className='form-group row'>
          <label for='bio' className='col-sm-2 col-form-label'>
            Bio
          </label>
          <div className='col-sm-10'>
            <textarea
              type='text'
              className='form-control'
              value={user.bio}
              disabled
            />
          </div>
        </div>
      </form>
    );

    // if (user) {
    //   profile = (
    //     <div>
    //       <p>User name: {user.userName}</p>
    //       <p>Full name: {user.fullName}</p>
    //       <p>Age: {user.age}</p>
    //       <p>Bio: {user.bio}</p>
    //     </div>
    //   );
    // }

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
    myUser: state.users.myUser,
    user: state.users.currentlyViewingUser,
    userPosts: state.posts.currentPosts,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserProfile));
