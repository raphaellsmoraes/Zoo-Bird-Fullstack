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
    },
    slider: [String]
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
    },
    top: {
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
    },
    top: {
      photo: String
    }
  },
  contato: {
    top: {
      photo: String
    }
  },
  viveiro: {
    top: {
      photo: String
    },
    birds: []
  },
  active: Boolean
});

export default mongoose.model('Pages', PagesSchema);
