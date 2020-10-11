import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Newsfeed from './components/Newsfeed/Newsfeed';
import Register from './components/Register/Register';
import withWebsocket from './hoc/withWebsocket';
import { setTokenFromLocalStorage } from './store/actions/authAction';
import { loadMyUser } from './store/actions/usersAction';
import { updateTokenAxios } from './utils/utils';

class App extends Component {
  componentDidMount() {
    this.props.setToken(localStorage.getItem('token'));
    this.props.loadMyUser();
  }

  render() {
    updateTokenAxios();
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/home' component={Newsfeed} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch(setTokenFromLocalStorage(token)),
    loadMyUser: () => dispatch(loadMyUser()),
  };
};

export default withWebsocket(connect(null, mapDispatchToProps)(App));
