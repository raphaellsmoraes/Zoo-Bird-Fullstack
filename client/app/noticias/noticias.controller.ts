'use strict';

(function () {

  class NoticiasController {
    constructor(Manifest, $scope, Pages) {
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
  angular.module('zoobirdApp.noticias')
    .controller('NoticiasController', NoticiasController);
})();
