import React, { Fragment } from 'react';
import { Component } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { connect } from 'react-redux';
import { loadUserPosts } from '../../store/actions/postsAction';
import { updateMyProfile } from '../../store/actions/usersAction';
import Post from '../Post/Post';

class MyProfile extends Component {
  state = {
    userName: '',
    fullName: '',
    age: '',
    bio: '',
  };

  componentDidUpdate() {
    if (!this.props.myPosts && this.props.myUser) {
      this.props.loadMyPosts(this.props.myUser._id);
    }
    if (this.props.myUser && this.state.userName === '') {
      let { userName, fullName, age, bio } = this.props.myUser;
      if (!age) age = '';
      if (!bio) bio = '';

      this.setState({
        userName,
        fullName,
        age,
        bio,
      });
    }
  }

  componentDidMount() {
    if (!this.props.myUser) {
      return;
    }
    this.props.loadMyPosts(this.props.myUser._id);
    let { userName, fullName, age, bio } = this.props.myUser;
    if (!age) age = '';
    if (!bio) bio = '';

    this.setState({
      userName,
      fullName,
      age,
      bio,
    });
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateProfile = async (e) => {
    e.preventDefault();
    const { fullName, age, bio } = this.state;
    this.props.updateProfile(fullName, age, bio);
  };

  render() {
    if (!this.props.myUser) {
      return null;
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
              id='userName'
              name='userName'
              placeholder='Enter your user name'
              value={this.state.userName}
              onChange={this.onInputChange}
              required={true}
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
              id='fullName'
              name='fullName'
              placeholder='Enter your full name'
              value={this.state.fullName}
              onChange={this.onInputChange}
              required={true}
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
              id='age'
              name='age'
              placeholder='Enter your age'
              value={this.state.age}
              onChange={this.onInputChange}
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
              id='bio'
              name='bio'
              placeholder='Enter your bio'
              value={this.state.bio}
              onChange={this.onInputChange}
            />
          </div>
        </div>
        <Button className='btn-success' type='submit'>
          Update profile
        </Button>
      </form>
    );

    const posts = this.props.myPosts ? this.props.myPosts : [];

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
    updateProfile: (fullName, age, bio) =>
      dispatch(updateMyProfile(fullName, age, bio)),
    loadMyPosts: (myId) => dispatch(loadUserPosts(myId)),
  };
};

const mapStateToProps = (state) => {
  return {
    myUser: state.users.myUser,
    myPosts: state.posts.currentPosts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
