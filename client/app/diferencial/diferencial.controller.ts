'use strict';

(function () {

  class DiffController {
    constructor(Manifest, $scope) {
      Manifest.getManifest(function (response) {
        $scope.manifest = response.data;
        document.getElementById('background-section').style.backgroundImage = 'url(\'/assets/images/'
          + $scope.manifest['fundo_default_section.png'] + ' \')';
      });
    }

  }

  angular.module('zoobirdApp.diferencial')
    .controller('DiffController', DiffController);
})();
