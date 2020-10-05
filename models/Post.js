const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      likes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
          required: true,
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
