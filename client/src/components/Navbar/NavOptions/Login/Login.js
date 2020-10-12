import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../../store/actions/authAction';

class Login extends Component {
  state = {
    userName: '',
    password: '',
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = async (e) => {
    e.preventDefault();
    this.props.login(this.state.userName, this.state.password);
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.login}>
          <input
            type='text'
            placeholder={'Your username'}
            name='userName'
            onChange={this.onInputChange}
            value={this.state.userName}
            required={true}
          />
          <input
            type='password'
            placeholder={'Your password'}
            name='password'
            onChange={this.onInputChange}
            value={this.state.password}
            required={true}
          />
          <button type='submit'>Login</button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userName, password) => dispatch(login(userName, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
