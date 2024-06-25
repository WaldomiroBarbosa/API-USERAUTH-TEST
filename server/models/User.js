const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  usertype: { type: String, enum: ['common', 'pecial', 'admin'], default: 'common' },
  email: { type: String, required: true },
  userpwd: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);