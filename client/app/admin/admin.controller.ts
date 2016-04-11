'use strict';

(function () {

  class AdminController {
    constructor($scope, Pages, $http, Upload) {
      $scope.model = {
        name: 'Tabs'
      };
      Pages.getPages(function (response) {
        $scope.model.pages = response.data[0];
      });
      $scope.update = function () {
        $http.put('/api/pages/' + $scope.model.pages._id, $scope.model.pages)
          .then(function (response) {
            console.log(response);
          });
      };
    }
  }
  angular.module('zoobirdApp.admin')
    .controller('AdminController', AdminController);

})();
