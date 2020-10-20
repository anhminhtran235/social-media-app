import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Landing.css';
import LandingImage from '../../assets/images/working-at-living-room.svg';

class Landing extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/home' />;
    }
    return (
      <div className='landing d-flex '>
        <img className='landing-image w-50' src={LandingImage} alt='landing ' />
        <div className='w-50 d-flex flex-column justify-content-center align-items-center text-justify'>
          <h1 className='text-primary'>Connect with the world</h1>
          <h1 className='text-primary'>Right now!</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Landing);
