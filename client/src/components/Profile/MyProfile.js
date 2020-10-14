import React, { Fragment } from 'react';
import { Component } from 'react';
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

  componentDidMount() {
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
    const profile = (
      <form onSubmit={this.updateProfile}>
        <label htmlFor='userName'>User name: </label>
        {this.state.userName}
        <br />
        <br />
        <label htmlFor='fullName'>Full name </label>
        <input
          type='text'
          placeholder='Enter your full name'
          id='fullName'
          name='fullName'
          value={this.state.fullName}
          onChange={this.onInputChange}
          required={true}
        />
        <br />
        <br />
        <label htmlFor='age'>Age </label>
        <input
          type='number'
          placeholder='Enter your age'
          id='age'
          name='age'
          value={this.state.age}
          onChange={this.onInputChange}
        />
        <br />
        <br />
        <label htmlFor='bio'>Bio </label>
        <textarea
          type='text'
          placeholder='Enter a short bio'
          id='bio'
          name='bio'
          rows={5}
          cols={30}
          value={this.state.bio}
          onChange={this.onInputChange}
        />
        <br />
        <br />
        <button type='submit'>Update Profile</button>
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
