/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Pages from '../api/pages/pages.model';

Pages.find({}).then((result) => {
  if (result.length === 0) {
    Pages.create({
      home: {
        left: {text: "", photo: ""},
        center: {text: "", photo: ""},
        right: {text: "", photo: ""},
        slider: []
      },
      aboutus: {
        left: {text: ""},
        center: {text: ""},
        right: {text: ""},
        top: {photo: ""}
      },
      diferencial: {
        left: {text: ""},
        center: {text: ""},
        right: {text: ""},
        top: {photo: ""}
      },
      contato: {
        top: {photo: ""}
      },
      viveiro: {
        top: {photo: ""},
        birds: []
      }
    });
  }
});
