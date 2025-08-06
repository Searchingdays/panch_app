const mongoose = require('mongoose');

// the schema how posts are stored 

const postSchema = new mongoose.Schema({
  name: { type: String, required: false},               // name is not sent if the post is anonymous
  content: { type: String, required: true, unique: true },
  supportcount: {type: Number, default: 0}
  
}, {timestamps:true});

module.exports = mongoose.model('Post', postSchema);