import React, { Fragment } from 'react';
import { Component } from 'react';
import axios from 'axios';

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
    try {
      const res = await axios.post('/users', this.state);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Fragment>
        <h1>Register Page!</h1>
        <form onSubmit={this.register}>
          <label htmlFor='userName'>User name* </label>
          <input
            type='text'
            placeholder='Enter your user name'
            id='userName'
            name='userName'
            value={this.state.userName}
            onChange={this.onInputChange}
            required={true}
          />
          <br />
          <br />
          <label htmlFor='fullName'>Full name* </label>
          <input
            type='text'
            placeholder='Enter your full name'
            id='fullName'
            name='fullName'
            value={this.state.fullName}
            onChange={this.onInputChange}
            required={true}
          />
          <br />
          <br />
          <label htmlFor='password'>Password* </label>
          <input
            type='password'
            placeholder='Enter your password'
            id='password'
            name='password'
            value={this.state.password}
            onChange={this.onInputChange}
            required={true}
          />
          <br />
          <br />
          <label htmlFor='age'>Age </label>
          <input
            type='number'
            placeholder='Enter your age'
            id='age'
            name='age'
            value={this.state.age}
            onChange={this.onInputChange}
          />
          <br />
          <br />
          <label htmlFor='bio'>Bio </label>
          <textarea
            type='text'
            placeholder='Enter a short bio'
            id='bio'
            name='bio'
            rows={5}
            cols={30}
            value={this.state.bio}
            onChange={this.onInputChange}
          />
          <br />
          <br />
          <button type='submit'>Register</button>
        </form>
      </Fragment>
    );
  }
}

export default Register;
