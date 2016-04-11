'use strict';
(function () {
    var MainController = (function () {
        function MainController($scope, Manifest, Pages) {
            $scope.slides = [];
            $scope.manifest = {};
            $scope.model = {};
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
            Pages.getPages(function (response) {
                console.log(response.data[0]);
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