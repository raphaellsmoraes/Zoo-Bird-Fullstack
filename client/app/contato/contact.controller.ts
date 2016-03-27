'use strict';

(function () {

  class ContactController {
    constructor($scope) {
      this.mapHeight = 450;
      this.mapWidth = 600;
    }
  }

  angular.module('zoobirdApp.contact')
    .controller('ContactController', ContactController);
})();
