'use strict';
(function () {
    var MainController = (function () {
        function MainController($scope, Manifest, Pages) {
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
        return MainController;
    }());
    angular.module('zoobirdApp')
        .component('main', {
        templateUrl: 'app/main/main.html',
        controller: MainController
    });
})();
//# sourceMappingURL=main.controller.js.map