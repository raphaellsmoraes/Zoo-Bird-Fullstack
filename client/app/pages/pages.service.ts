'use strict';

(function () {

  function PagesService($http) {
    var getPages = function (callbackFn) {
      return $http.get('/api/pages/', {cache: true})
        .then(function (response) {
          callbackFn(response);
        });
    };

    return {
      getPages: getPages
    };
  }

  angular.module('zoobirdApp')
    .factory('Pages', PagesService);

})();
