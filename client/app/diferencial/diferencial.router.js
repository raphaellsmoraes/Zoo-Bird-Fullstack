'use strict';
angular.module('zoobirdApp.diferencial')
    .config(function ($routeProvider) {
    $routeProvider
        .when('/diferencial', {
        templateUrl: 'app/diferencial/diferencial.html',
        controller: 'DiffController',
        controllerAs: 'diferencial'
    });
});
//# sourceMappingURL=diferencial.router.js.map