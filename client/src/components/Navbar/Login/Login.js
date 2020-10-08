import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { SET_TOKEN } from '../../../store/actionTypes';

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
    try {
      const res = await axios.post('auth/login', {
        userName: this.state.userName,
        password: this.state.password,
      });
      this.props.setToken(res.data.token);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const token = this.props.token;
    return (
      <Fragment>
        {token}
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
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch({ type: SET_TOKEN, payload: token }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
