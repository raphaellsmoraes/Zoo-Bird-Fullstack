'use strict';
(function () {
    var DiffController = (function () {
        function DiffController(Manifest, $scope) {
            Manifest.getManifest(function (response) {
                $scope.manifest = response.data;
                document.getElementById('background-section').style.backgroundImage = 'url(\'/assets/images/'
                    + $scope.manifest['fundo_default_section.png'] + ' \')';
            });
        }
        return DiffController;
    }());
    angular.module('zoobirdApp.diferencial')
        .controller('DiffController', DiffController);
})();
//# sourceMappingURL=diferencial.controller.js.map