'use strict';

(function () {

  class ViveiroController {
    constructor($scope) {
      $scope.images = [];
      for (let i = 0; i < 64; i++) {
        let text = "This is fun: " + i;
        $scope.images.push({image: i, text: text});
      }
    }
  }
  angular.module('zoobirdApp.viveiro')
    .controller('ViveiroController', ViveiroController);
})();
