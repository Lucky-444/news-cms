const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  website_logo: {
    type: String,
    
  },
  website_description: {
    type: String,
    required: true,
  },
  website_title: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Settings', settingsSchema);

