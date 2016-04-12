'use strict';

import mongoose from 'mongoose';

var PagesSchema = new mongoose.Schema({
  home: {
    left: {
      text: String,
      photo: String
    },
    center: {
      text: String,
      photo: String
    },
    right: {
      text: String,
      photo: String
    }
  },
  aboutus: {
    left: {
      text: String,
      photo: String
    },
    center: {
      text: String,
      photo: String
    },
    right: {
      text: String,
      photo: String
    }
  },
  diferencial: {
    left: {
      text: String,
      photo: String
    },
    center: {
      text: String,
      photo: String
    },
    right: {
      text: String,
      photo: String
    }
  },
  active: Boolean
});

export default mongoose.model('Pages', PagesSchema);
