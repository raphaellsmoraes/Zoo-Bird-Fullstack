'use strict';

(function () {

  class AboutUsController {
    constructor() {
      this.message = 'Hello';
    }

  }

  angular.module('zoobirdApp.aboutus')
    .controller('AboutUsController', AboutUsController);
})();
