'use strict';
(function () {
    var ContactController = (function () {
        function ContactController($scope) {
            this.mapHeight = 450;
            this.mapWidth = 600;
        }
        return ContactController;
    }());
    angular.module('zoobirdApp.contact')
        .controller('ContactController', ContactController);
})();
//# sourceMappingURL=contact.controller.js.map