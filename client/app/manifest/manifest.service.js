'use strict';
(function () {
    function ManifestService($http) {
        var getManifest = function (callbackFn) {
            return $http.get('/assets/rev-manifest.json', { cache: true })
                .then(function (response) {
                callbackFn(response);
            });
        };
        return {
            getManifest: getManifest,
            assetPath: '/assets/images/'
        };
    }
    angular.module('zoobirdApp')
        .factory('Manifest', ManifestService);
})();
//# sourceMappingURL=manifest.service.js.map