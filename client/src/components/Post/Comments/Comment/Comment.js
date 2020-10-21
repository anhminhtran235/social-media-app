import React from 'react';
import { Component } from 'react';
import moment from 'moment';

class Comment extends Component {
  render() {
    const comment = this.props.comment;
    return (
      <div className='card mt-2'>
        <div class='card-body'>
          <div class='card-text d-flex justify-content-between align-items-center mb-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <img
                className='rounded-circle mr-3'
                width='45'
                src='https://picsum.photos/50/50'
                alt=''
              />
              <p className='card-text'>{comment.author}</p>
            </div>
            <div className='text-muted h7'>
              <i className='fa fa-clock-o'></i>{' '}
              {moment(comment.createdAt).fromNow()}
            </div>
          </div>
          <p class='card-text'>{comment.content}</p>
        </div>
      </div>
    );
  }
}

export default Comment;
