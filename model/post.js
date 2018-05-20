const mongoose = require('mongoose');
const moment = require('moment');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
   
    title: {
      type: String,
      required: true
    },
    creator: {
      type: ObjectId,
      ref: "User"
    },
    description: {
      type: String,
      default: "No description provided."
    },
  
    createdAt: {
      type: String,
      default: moment(new Date()).format("MMM DD, YYYY") // "Sun, 3PM"
    }
  });
  
  var Post = mongoose.model('Post', PostSchema);
  module.exports = Post;