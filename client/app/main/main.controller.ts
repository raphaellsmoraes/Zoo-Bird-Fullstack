'use strict';

(function () {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      this.slides = $scope.slides = [];
      this.currIndex = 0;
      this.noWrapSlides = false;

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('thing');
      });
    }

    $onInit() {
      this.$http.get('/api/things').then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });

      this.addSlide();
      this.addSlide();
      this.addSlide();
      this.addSlide();
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {name: this.newThing});
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }

    addSlide() {
      var newWidth = this.width + this.slides.length + 1;
      this.slides.push({
        image: 'http://lorempixel.com/' + newWidth + '/' + 350,
        text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][this.slides.length % 4],
        id: this.currIndex++
      })
    }
  }

  angular.module('zoobirdApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
