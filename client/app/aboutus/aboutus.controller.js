'use strict';
(function () {
    var AboutUsController = (function () {
        function AboutUsController(Manifest, $scope) {
            Manifest.getManifest(function (response) {
                $scope.manifest = response.data;
                document.getElementById('background-section').style.backgroundImage = 'url(\'/assets/images/'
                    + $scope.manifest['fundo_default_section.png'] + ' \')';
            });
        }
        return AboutUsController;
    }());
    angular.module('zoobirdApp.aboutus')
        .controller('AboutUsController', AboutUsController);
})();
//# sourceMappingURL=aboutus.controller.js.map