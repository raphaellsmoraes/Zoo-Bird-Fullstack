'use strict';

import mongoose from 'mongoose';

var PagesSchema = new mongoose.Schema({
  home: {
    left: {
      text: String,
      photo: Buffer
    },
    center: {
      text: String,
      photo: Buffer
    },
    right: {
      text: String,
      photo: Buffer
    }
  },
  aboutus: {
    left: {
      text: String,
      photo: Buffer
    },
    center: {
      text: String,
      photo: Buffer
    },
    right: {
      text: String,
      photo: Buffer
    }
  },
  diferencial: {
    left: {
      text: String,
      photo: Buffer
    },
    center: {
      text: String,
      photo: Buffer
    },
    right: {
      text: String,
      photo: Buffer
    }
  },
  active: Boolean
});

export default mongoose.model('Pages', PagesSchema);
