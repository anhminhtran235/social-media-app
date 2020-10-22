import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import MyProfile from './components/Profile/MyProfile';
import UserProfile from './components/Profile/UserProfile';
import Register from './components/Register/Register';
import withWebsocket from './hoc/withWebsocket';

import Websocket from './components/Websocket';
import Explore from './components/Explore/Explore';
import { getNotifications } from './store/actions/notificationsAction';
import Landing from './components/Landing/Landing';
import Inbox from './components/Inbox/Inbox';
import PrivateRoute from './components/routing/PrivateRoute';

import './index.css';
import { getFriendsWithMessages } from './store/actions/messagesAction';

class App extends Component {
  componentDidUpdate() {
    if (!this.props.notifications) {
      this.props.loadNotifications();
    }
    if (!this.props.friendsWithMessages) {
      this.props.loadFriendsWithMessages();
    }
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      if (!this.props.notifications) {
        this.props.loadNotifications();
      }
      if (!this.props.friendsWithMessages) {
        this.props.loadFriendsWithMessages();
      }
    }
  }

  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <Navbar />
            <Switch>
              <Route path='/' exact component={Landing} />
              <Route path='/register' exact component={Register} />
              <PrivateRoute path='/home' exact component={Home} />
              <PrivateRoute path='/explore' exact component={Explore} />
              <PrivateRoute path='/messages' exact component={Inbox} />
              <PrivateRoute path='/users/me' exact component={MyProfile} />
              <PrivateRoute path='/users/:id' exact component={UserProfile} />
            </Switch>
          </div>
        </div>
        <Websocket socket={this.props.socket} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.notifications,
    friendsWithMessages: state.messages.friendsWithMessages,
    isAuthenticated: state.auth.isAuthenticated,
    myUser: state.users.myUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFriendsWithMessages: () => dispatch(getFriendsWithMessages()),
    loadNotifications: () => dispatch(getNotifications()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
