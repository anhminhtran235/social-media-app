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
        return <PeopleCard key={user._id} person={user} />;
      });
    }
    return (
      <Fragment>
        <h1>Let's add some new friends!</h1>
        {users}
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
