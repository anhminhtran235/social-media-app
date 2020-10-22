import React from 'react';
import { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class Comment extends Component {
  goToUserPage = (id) => {
    this.props.history.push('/users/' + id);
  };

  render() {
    const comment = this.props.comment;
    return (
      <div className='card mt-2'>
        <div className='card-body'>
          <div className='card-text d-flex justify-content-between align-items-center mb-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <img
                className='rounded-circle mr-3'
                width='45'
                src='https://picsum.photos/50/50'
                alt=''
              />
              <a
                className='card-text clickable'
                onClick={() => this.goToUserPage(comment.author)}
              >
                {comment.authorName}
              </a>
            </div>
            <div className='text-muted h7'>
              <i className='fa fa-clock-o'></i>{' '}
              {moment(comment.createdAt).fromNow()}
            </div>
          </div>
          <p className='card-text'>{comment.content}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Comment);
