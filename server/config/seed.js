/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Pages from '../api/pages/pages.model';

Pages.find({}).remove()
  .then((result) => {
  if (result.length === 0) {
    Pages.create({
      home: {
        left: {text: ""},
        center: {text: ""},
        right: {text: ""},
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

User.find({}).remove()
  .then(() => {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      })
      .then(() => {
        console.log('finished populating users');
      });
  });
