'use strict';

(function () {

  class MainController {

    constructor($scope, Manifest) {
      $scope.slides = [];
      $scope.manifest = {};

      Manifest.getManifest(function (response) {
        $scope.manifest = response.data;
        $scope.slides.push({
          image: '/assets/images/' + $scope.manifest['home_slider.png'],
          text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][$scope.slides.length % 4],
          id: 0
        });
        document.getElementById('background-section').style.backgroundImage = 'url(\'/assets/images/'
          + $scope.manifest['fundo_default_section.png'] + ' \')';
      });
    }
  }
  angular.module('zoobirdApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
