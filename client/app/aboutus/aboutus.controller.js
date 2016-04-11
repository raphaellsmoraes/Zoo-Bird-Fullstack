'use strict';
(function () {
    var AboutUsController = (function () {
        function AboutUsController(Manifest, $scope, Pages) {
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
        return AboutUsController;
    }());
    angular.module('zoobirdApp.aboutus')
        .controller('AboutUsController', AboutUsController);
})();
//# sourceMappingURL=aboutus.controller.js.map