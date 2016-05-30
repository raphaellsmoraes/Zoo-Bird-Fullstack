'use strict';

(function () {

  class ContactController {
    private mapHeight;
    private mapWidth;

    constructor($scope, Manifest, Pages, $http) {
      $scope.model = {};
      $scope.mail = {};

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

      $scope.sendMail = function (mail) {
        $http.get('/api/email/' + encodeURIComponent(mail.name) +
          '/' + encodeURIComponent(mail.email) +
          '/' + encodeURIComponent(mail.tel) +
          '/' + encodeURIComponent(mail.city) +
          '/' + encodeURIComponent(mail.subject) +
          '/' + encodeURIComponent(mail.msg))
          .then(function (response) {
            alert('Mensagem enviada com sucesso.');
          }, function (x) {
            alert('Não foi possível enviar sua mensagem.');
          });
      };
    }
  }

  angular.module('zoobirdApp.contact')
    .controller('ContactController', ContactController);
})();
