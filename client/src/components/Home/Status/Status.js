import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addNewPost } from '../../../store/actions/postsAction';

class Status extends Component {
  state = {
    post: '',
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = () => {
    this.props.addNewPost(this.state.post);
  };

  render() {
    if (!this.props.myUser) {
      return null;
    }

    return (
      <Fragment>
        <textarea
          name='post'
          id='post'
          cols='80'
          rows='10'
          placeholder={this.props.myUser.userName + ", what's on your mind?"}
          onChange={this.onInputChange}
          value={this.state.post}
        ></textarea>
        <button onClick={this.onSubmit}>Post</button>
      </Fragment>
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
    addNewPost: (post) => dispatch(addNewPost(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);
