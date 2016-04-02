'use strict';

(function () {

  class ViveiroController {
    constructor($scope) {
      $scope.rows = [];
      this.rowsIndex = 0;

      for (let i = 0; i < 13; i++) {
        if ($scope.rows[i] === undefined) {
          $scope.rows[i] = [];
        }
        for (let j = 0; j < 4; j++) {
          $scope.rows[i][j] = {name: 'bla', id: this.rowsIndex};
          this.rowsIndex++;
        }
        this.rowsIndex++;
      }
    }
  }
  angular.module('zoobirdApp.viveiro')
    .controller('ViveiroController', ViveiroController);
})();
