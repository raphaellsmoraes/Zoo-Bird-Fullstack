'use strict';

angular.module('zoobirdApp')
  .directive('footer', ['Manifest', function (Manifest) {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      link: function (scope, element) {
        Manifest.getManifest(function (response) {
          scope.manifest = response.data;
          element[0].style.backgroundImage = 'url(\'/assets/images/' + scope.manifest['fundo_cabecalho.png'] + ' \')';
          document.getElementById('wood-layer').style.backgroundImage = 'url(\'/assets/images/'
            + scope.manifest['madeira rodape.png'] + ' \')';
        });
        element.addClass('footer');
      }
    };
  }]);
