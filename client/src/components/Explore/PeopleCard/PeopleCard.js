import React, { Fragment } from 'react';
import { Component } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { connect } from 'react-redux';
import {
  addFriend,
  cancelFriendRequest,
  unfriend,
} from '../../../store/actions/usersAction';
import history from '../../../utils/history';

class PeopleCard extends Component {
  navigateToTheirPage = (id) => {
    history.push('/users/me');
  };

  render() {
    const myUser = this.props.myUser;
    if (!myUser) return null;

    const { _id, userName, fullName, bio, age } = this.props.person;
    const isMyFriend = myUser.friends.includes(_id);
    const hasSentFriendRequest = myUser.sentFriendRequests.includes(_id);

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

    return (
      <Fragment>
        <div className='card bg-light mb-3 mr-3 w-25'>
          <a className='card-header text-primary clickable'>@{userName}</a>
          <div className='card-body'>
            <h5 className='card-title text-info'>{fullName}</h5>
            <p className='card-text'>Age: {age ? age : '(empty)'}</p>
            <p className='card-text'>Bio: {bio ? bio : '(empty)'}</p>
            {addFriendButton}
          </div>
        </div>
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
    addFriend: (id) => dispatch(addFriend(id)),
    cancelFriendRequest: (id) => dispatch(cancelFriendRequest(id)),
    unfriend: (id) => dispatch(unfriend(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleCard);
