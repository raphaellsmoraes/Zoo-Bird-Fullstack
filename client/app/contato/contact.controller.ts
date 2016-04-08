'use strict';

(function () {

  class ContactController {
    private mapHeight;
    private mapWidth;
    constructor($scope, Manifest) {
      Manifest.getManifest(function (response) {
        $scope.manifest = response.data;
        document.getElementById('background-section').style.backgroundImage = 'url(\'/assets/images/'
          + $scope.manifest['fundo_default_section.png'] + ' \')';
      });
      this.mapHeight = 450;
      this.mapWidth = 600;
    }
  }

  angular.module('zoobirdApp.contact')
    .controller('ContactController', ContactController);
})();
