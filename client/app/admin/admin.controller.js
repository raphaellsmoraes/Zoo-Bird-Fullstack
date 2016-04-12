'use strict';
(function () {
    var AdminController = (function () {
        function AdminController($scope, Pages, $http, Upload) {
            $scope.model = {
                name: 'Tabs'
            };
            Pages.getPages(function (response) {
                $scope.model.pages = response.data[0];
            });
            $scope.update = function () {
                $http.put('/api/pages/' + $scope.model.pages._id, $scope.model.pages)
                    .then(function (response) {
                    console.log(response);
                });
            };
            $scope.onFileSelect = function (files, page, position) {
                if (files.length > 0) {
                    var filename = files[0].name;
                    var type = files[0].type;
                    var query = {
                        filename: filename,
                        type: type
                    };
                    $http.post('/api/signing', query)
                        .success(function (result) {
                        Upload.upload({
                            url: result.url,
                            transformRequest: function (data, headersGetter) {
                                var headers = headersGetter();
                                delete headers.Authorization;
                                return data;
                            },
                            fields: result.fields,
                            method: 'POST',
                            file: files[0]
                        })
                            .success(function (data, status, headers, config) {
                            // file is uploaded successfully
                            var parser = new DOMParser();
                            var xmlDoc = parser.parseFromString(data, 'text/xml');
                            if (page === 'home') {
                                if (position === 'left') {
                                    $scope.model.pages.home.left.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                                }
                                else if (position === 'center') {
                                    $scope.model.pages.home.center.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                                }
                                else {
                                    $scope.model.pages.home.right.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                                }
                            }
                            else if (page === 'aboutus') {
                                if (position === 'left') {
                                    $scope.model.pages.aboutus.left.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                                }
                                else if (position === 'center') {
                                    $scope.model.pages.aboutus.center.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                                }
                                else {
                                    $scope.model.pages.aboutus.right.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                                }
                            }
                            else if (page === 'diferencial') {
                                if (position === 'left') {
                                    $scope.model.pages.diferencial.left.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                                }
                                else if (position === 'center') {
                                    $scope.model.pages.diferencial.center.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                                }
                                else {
                                    $scope.model.pages.diferencial.right.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                                }
                            }
                        });
                    })
                        .error(function (data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                }
            };
        }
        return AdminController;
    }());
    angular.module('zoobirdApp.admin')
        .controller('AdminController', AdminController);
})();
//# sourceMappingURL=admin.controller.js.map