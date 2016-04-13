'use strict';

(function () {

  class MainController {

    constructor($scope, Manifest, Pages) {
      $scope.manifest = {};
      $scope.model = {};
      Manifest.getManifest(function (response) {
        $scope.manifest = response.data;
        document.getElementById('background-section').style.backgroundImage = 'url(\'/assets/images/'
          + $scope.manifest['fundo_default_section.png'] + ' \')';
      });
      Pages.getPages(function (response) {
        $scope.model.pages = response.data[0];
      });
    }
  }
  angular.module('zoobirdApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
