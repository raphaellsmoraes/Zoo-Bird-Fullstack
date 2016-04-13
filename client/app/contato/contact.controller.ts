'use strict';

(function () {

  class ContactController {
    private mapHeight;
    private mapWidth;

    constructor($scope, Manifest, Pages) {
      $scope.model = {};

      Manifest.getManifest(function (response) {
        $scope.manifest = response.data;
        document.getElementById('background-section').style.backgroundImage = 'url(\'/assets/images/'
          + $scope.manifest['fundo_default_section.png'] + ' \')';
      });
      Pages.getPages(function (response) {
        $scope.model.pages = response.data[0];
      });
      this.mapHeight = 450;
      this.mapWidth = 600;
    }
  }

  angular.module('zoobirdApp.contact')
    .controller('ContactController', ContactController);
})();
