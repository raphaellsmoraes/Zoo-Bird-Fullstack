'use strict';

(function () {

  class MainController {

    constructor($http, $scope, socket, RevManifest) {
      $scope.revManifest = RevManifest;
      $scope.revManifest.getManifest().then(function (data) {
        $scope.manifest = data;
        console.log($scope.revManifest.path + $scope.manifest["Selo.png"]);
      });
      this.width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      this.slides = $scope.slides = [];
      this.noWrapSlides = false;
    }

    $onInit() {
      this.addSlide();
    }

    addSlide() {
      //var newWidth = this.width + this.slides.length + 1;
      this.slides.push({
        image: '../../assets/images/home_slider.png', /*'http://lorempixel.com/' + newWidth + '/' + 350,*/
        text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][this.slides.length % 4],
        id: this.currIndex++
      });
    }
  }

  angular.module('zoobirdApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
