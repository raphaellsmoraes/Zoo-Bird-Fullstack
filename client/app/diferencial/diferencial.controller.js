'use strict';
(function () {
    var DiffController = (function () {
        function DiffController(Manifest, $scope, Pages) {
            $scope.model = {};
            Manifest.getManifest(function (response) {
                $scope.manifest = response.data;
                document.getElementById('background-section').style.backgroundImage = 'url(\'/assets/images/'
                    + $scope.manifest['fundo_default_section.png'] + ' \')';
            });
            Pages.getPages(function (response) {
                console.log(response.data[0]);
                $scope.model.pages = response.data[0];
            });
        }
        return DiffController;
    }());
    angular.module('zoobirdApp.diferencial')
        .controller('DiffController', DiffController);
})();
//# sourceMappingURL=diferencial.controller.js.map