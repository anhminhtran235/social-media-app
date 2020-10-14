import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  addFriend,
  cancelFriendRequest,
} from '../../../store/actions/usersAction';
import history from '../../../utils/history';

class PeopleCard extends Component {
  navigateToTheirPage = (id) => {
    history.push('/users/' + id);
  };

  render() {
    const myUser = this.props.myUser;
    if (!myUser) return null;

    const { _id, userName, fullName, bio, age } = this.props.person;
    const isMyFriend = myUser.friends.includes(_id);
    const hasSentFriendRequest = myUser.sentFriendRequests.includes(_id);

    let addFriendButton = null;
    if (isMyFriend) {
      addFriendButton = <button disabled>You two are friends</button>;
    } else if (hasSentFriendRequest) {
      addFriendButton = (
        <button onClick={() => this.props.cancelFriendRequest(_id)}>
          Unsend friend request
        </button>
      );
    } else {
      addFriendButton = (
        <button onClick={() => this.props.addFriend(_id)}>Add friend</button>
      );
    }

    return (
      <Fragment>
        <p>User Name: {userName}</p>
        <p>Full Name: {fullName}</p>
        {bio && <p>Bio: {bio}</p>}
        {age && <p>Age: {age}</p>}
        {addFriendButton}
        <button onClick={() => this.navigateToTheirPage(_id)}>
          Go to their page
        </button>
        <p>_______________________________________________</p>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleCard);
