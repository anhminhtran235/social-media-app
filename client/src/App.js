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
import { setTokenFromLocalStorage } from './store/actions/authAction';
import { loadMyUser } from './store/actions/usersAction';
import { CLEAR_DATA_WHEN_RELOAD } from './store/actionTypes';
import { updateTokenAxios } from './utils/utils';
import Websocket from './components/Websocket';
import Explore from './components/Explore/Explore';
import { getNotifications } from './store/actions/notificationsAction';

class App extends Component {
  componentDidMount() {
    this.props.clearData();
    this.props.setToken(localStorage.getItem('token'));
    this.props.loadMyUser();
    this.props.getNotifications();
  }

  render() {
    updateTokenAxios();
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path='/register' exact component={Register} />
          <Route path='/home' exact component={Home} />
          <Route path='/explore' exact component={Explore} />
          <Route path='/users/me' exact component={MyProfile} />
          <Route path='/users/:id' exact component={UserProfile} />
        </Switch>
        <Websocket socket={this.props.socket} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch(setTokenFromLocalStorage(token)),
    loadMyUser: () => dispatch(loadMyUser()),
    clearData: () => dispatch({ type: CLEAR_DATA_WHEN_RELOAD }),
    getNotifications: () => dispatch(getNotifications()),
  };
};

export default withWebsocket(connect(null, mapDispatchToProps)(App));
