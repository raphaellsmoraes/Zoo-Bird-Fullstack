'use strict';
(function () {
    var ViveiroController = (function () {
        function ViveiroController($scope) {
            $scope.rows = [];
            this.rowsIndex = 0;
            for (var i = 0; i < 13; i++) {
                if ($scope.rows[i] === undefined) {
                    $scope.rows[i] = [];
                }
                for (var j = 0; j < 4; j++) {
                    $scope.rows[i][j] = { name: 'bla', id: this.rowsIndex };
                    this.rowsIndex++;
                }
                this.rowsIndex++;
            }
        }
        return ViveiroController;
    }());
    angular.module('zoobirdApp.viveiro')
        .controller('ViveiroController', ViveiroController);
})();
//# sourceMappingURL=viveiro.controller.js.map