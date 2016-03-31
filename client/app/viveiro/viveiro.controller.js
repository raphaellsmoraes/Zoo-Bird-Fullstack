'use strict';
(function () {
    var ViveiroController = (function () {
        function ViveiroController($scope) {
            $scope.images = [];
            for (var i = 0; i < 64; i++) {
                var text = "This is fun: " + i;
                $scope.images.push({ image: i, text: text });
            }
        }
        return ViveiroController;
    }());
    angular.module('zoobirdApp.viveiro')
        .controller('ViveiroController', ViveiroController);
})();
//# sourceMappingURL=viveiro.controller.js.map