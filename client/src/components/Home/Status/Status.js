import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewPost } from '../../../store/actions/postsAction';

class Status extends Component {
  state = {
    post: '',
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = () => {
    this.props.addNewPost(this.state.post);
  };

  render() {
    if (!this.props.myUser) {
      return null;
    }

    return (
      <div className='my-5'>
        <div className='card gedf-card'>
          <div className='card-header'>
            <ul
              className='nav nav-tabs card-header-tabs'
              id='myTab'
              role='tablist'
            >
              <li className='nav-item'>
                <a
                  className='nav-link active'
                  id='posts-tab'
                  data-toggle='tab'
                  href='#posts'
                  role='tab'
                  aria-controls='posts'
                  aria-selected='true'
                >
                  Make a post
                </a>
              </li>
            </ul>
          </div>
          <div className='card-body'>
            <div className='tab-content' id='myTabContent'>
              <div
                className='tab-pane fade show active'
                id='posts'
                role='tabpanel'
                aria-labelledby='posts-tab'
              >
                <div className='form-group'>
                  <textarea
                    className='form-control'
                    id='message'
                    rows='3'
                    name='post'
                    placeholder={
                      this.props.myUser.userName + ', what are you thinking?'
                    }
                    onChange={this.onInputChange}
                    value={this.state.post}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className='btn-toolbar justify-content-between'>
              <div className='btn-group'>
                <button
                  type='submit'
                  className='btn btn-success'
                  onClick={this.onSubmit}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myUser: state.users.myUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPost: (post) => dispatch(addNewPost(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);
