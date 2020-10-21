import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../store/actions/usersAction';
import PeopleCard from './PeopleCard/PeopleCard';

class Explore extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }
  render() {
    let users = null;
    if (this.props.users) {
      users = this.props.users.map((user) => {
        if (user._id === this.props.myUser._id) {
          return null;
        }
        const hasSentMeFriendRequest = user.sentFriendRequests.includes(
          this.props.myUser._id
        );
        return (
          <PeopleCard
            key={user._id}
            person={user}
            hasSentMeFriendRequest={hasSentMeFriendRequest}
          />
        );
      });
    }
    return (
      <Fragment>
        <h1 className='mb-4 text-primary'>
          Let's take a look at other people's profiles
        </h1>
        <div className='d-flex flex-wrap'>{users}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myUser: state.users.myUser,
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: (skip, limit) => dispatch(loadUsers(skip, limit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
