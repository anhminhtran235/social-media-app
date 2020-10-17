import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/esm/Button';
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
        <form className='form-inline' onSubmit={this.login}>
          <div>
            <input
              type='text'
              placeholder={'Your username'}
              name='userName'
              onChange={this.onInputChange}
              value={this.state.userName}
              required={true}
              className='form-control  mr-1'
            />
          </div>
          <div>
            <input
              type='password'
              placeholder={'Your password'}
              name='password'
              onChange={this.onInputChange}
              value={this.state.password}
              required={true}
              className='form-control  mr-1'
            />
          </div>

          <Button className='btn-success mr-1' type='submit'>
            Login
          </Button>
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
