import React, { Fragment } from 'react';
import { Component } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../store/actions/authAction';

class Register extends Component {
  state = {
    userName: '',
    fullName: '',
    password: '',
    age: '',
    bio: '',
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  register = async (e) => {
    e.preventDefault();
    const { userName, fullName, password, age, bio } = this.state;
    const user = { userName, fullName, password, age, bio };
    this.props.register(user);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={'/home'} />;
    }
    return (
      <div className='d-flex flex-column align-items-center'>
        <h1 className='mb-4 mt-2'>Register Now!</h1>

        <form onSubmit={this.register} className='w-75'>
          <div className='form-group row'>
            <label for='userName' className='col-sm-2 col-form-label'>
              User Name*
            </label>
            <div className='col-sm-10'>
              <input
                type='text'
                className='form-control'
                id='userName'
                name='userName'
                placeholder='Enter your user name'
                value={this.state.userName}
                onChange={this.onInputChange}
                required={true}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label for='fullName' className='col-sm-2 col-form-label'>
              Full Name*
            </label>
            <div className='col-sm-10'>
              <input
                type='text'
                className='form-control'
                id='fullName'
                name='fullName'
                placeholder='Enter your full name'
                value={this.state.fullName}
                onChange={this.onInputChange}
                required={true}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label for='password' className='col-sm-2 col-form-label'>
              Password*
            </label>
            <div className='col-sm-10'>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                placeholder='Enter your password'
                value={this.state.password}
                onChange={this.onInputChange}
                required={true}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label for='age' className='col-sm-2 col-form-label'>
              Age
            </label>
            <div className='col-sm-10'>
              <input
                type='number'
                className='form-control'
                id='age'
                name='age'
                placeholder='Enter your age'
                value={this.state.age}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label for='bio' className='col-sm-2 col-form-label'>
              Bio
            </label>
            <div className='col-sm-10'>
              <textarea
                type='text'
                className='form-control'
                id='bio'
                name='bio'
                placeholder='Enter your bio'
                value={this.state.bio}
                onChange={this.onInputChange}
              />
            </div>
          </div>

          <Button className='btn-success' type='submit'>
            Register
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => dispatch(register(user)),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
