'use strict';

(function () {

  class AdminController {
    constructor($scope, Pages, $http, Upload, $uibModal, $log) {
      $scope.isCollapsed = false;
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
                url: result.url, //s3Url
                transformRequest: function (data, headersGetter) {
                  var headers = headersGetter();
                  delete headers.Authorization;
                  return data;
                },
                fields: result.fields, //credentials
                method: 'POST',
                file: files[0]
              })
                .success(function (data, status, headers, config) {
                  // file is uploaded successfully
                  let parser = new DOMParser();
                  var xmlDoc = parser.parseFromString(data, 'text/xml');

                  if (page === 'home') {
                    if (position === 'left') {
                      $scope.model.pages.home.left.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    } else if (position === 'center') {
                      $scope.model.pages.home.center.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    } else if (position === 'right') {
                      $scope.model.pages.home.right.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    } else if (position === 'slider') {
                      if ($scope.model.pages.home.slider.indexOf(
                          String(xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue)
                        ) === -1) {
                        $scope.model.pages.home.slider.push(String(xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue));
                      }
                    }
                  } else if (page === 'aboutus') {
                    if (position === 'left') {
                      $scope.model.pages.aboutus.left.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    } else if (position === 'center') {
                      $scope.model.pages.aboutus.center.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    } else if (position === 'right') {
                      $scope.model.pages.aboutus.right.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    } else {
                      $scope.model.pages.aboutus.top.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    }
                  } else if (page === 'diferencial') {
                    if (position === 'left') {
                      $scope.model.pages.diferencial.left.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    } else if (position === 'center') {
                      $scope.model.pages.diferencial.center.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    } else if (position === 'right') {
                      $scope.model.pages.diferencial.right.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    } else {
                      $scope.model.pages.diferencial.top.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    }
                  } else if (page === 'contato') {
                    if (position === 'slider') {
                      $scope.model.pages.contato.top.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    }
                  } else if (page === 'viveiro') {
                    if (position === 'top') {
                      $scope.model.pages.viveiro.top.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
                    }
                  } else if (page === 'noticias') {
                    if ($scope.model.pages.noticias.top === undefined) {
                      $scope.model.pages.noticias.top = {};
                    }
                    if (position === 'top') {
                      $scope.model.pages.noticias.top.photo = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
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

      $scope.animationsEnabled = true;
      $scope.open = function (size, nbird) {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myNewModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            bird: function () {
              return nbird;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          var index = $scope.model.pages.viveiro.birds.indexOf(selectedItem);
          if (index !== -1) {
            $scope.model.pages.viveiro.birds[index] = selectedItem;
          } else {
            if ($scope.model.pages.viveiro.birds.indexOf(selectedItem) === -1) {
              $scope.model.pages.viveiro.birds.push(selectedItem);
            }
          }
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };

      $scope.deleteSlider = function (img) {
        $scope.model.pages.home.slider.splice(img, 1);
      };

      $scope.openNews = function (size, nnews) {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myNewsModal.html',
          controller: 'NewsModalInstanceCtrl',
          size: size,
          resolve: {
            nnews: function () {
              return nnews;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          var index = $scope.model.pages.noticias.news.indexOf(selectedItem);
          let today = new Date();
          let dd = today.getDate();
          let mm = today.getMonth() + 1; //January is 0!
          let yyyy = today.getFullYear();

          if (dd < 10) {
            dd = '0' + dd;
          }

          if (mm < 10) {
            mm = '0' + mm;
          }

          if (index !== -1) {
            selectedItem.date = dd + '/' + mm + '/' + yyyy;
            $scope.model.pages.noticias.news[index] = selectedItem;
          } else {
            if ($scope.model.pages.noticias.news.indexOf(selectedItem) === -1) {
              selectedItem.date = dd + '/' + mm + '/' + yyyy;
              $scope.model.pages.noticias.news.push(selectedItem);
            }
          }
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      $scope.removeNews = function (index) {
        if (window.confirm('Você deseja remover esta notícia?')) {
          $scope.model.pages.noticias.news.splice(index, 1);
        }
      };

      $scope.removeViveiro = function (index) {
        if (window.confirm('Você deseja remover esta notícia?')) {
          $scope.model.pages.viveiro.birds.splice(index, 1);
        }
      };

    }
  }

  class ModalInstanceCtrl {
    constructor($scope, $uibModalInstance, bird, Upload, $http) {
      if (bird === undefined) {
        bird = {};
      }
      $scope.nbird = bird;
      $scope.removeInnerObject = function (index) {
        if (window.confirm('Você deseja remover esta imagem?')) {
          $scope.nbird.photos.splice(index, 1);
        }
      };
      $scope.countryList =
        [{name: 'Afghanistan', code: 'AF'}, {name: 'Åland Islands', code: 'AX'}, {
          name: 'Albania',
          'Code': 'AL'
        }, {name: 'Algeria', code: 'DZ'}, {name: 'American Samoa', code: 'AS'}, {
          name: 'Andorra',
          code: 'AD',
        }, {name: 'Angola', code: 'AO'}, {name: 'Anguilla', code: 'AI'}, {
          name: 'Antarctica',
          code: 'AQ',
        }, {name: 'Antigua and Barbuda', code: 'AG'}, {name: 'Argentina', code: 'AR'}, {
          name: 'Armenia',
          code: 'AM',
        }, {name: 'Aruba', code: 'AW'}, {name: 'Australia', code: 'AU'}, {
          name: 'Austria',
          code: 'AT',
        }, {name: 'Azerbaijan', code: 'AZ'}, {name: 'Bahamas', code: 'BS'}, {
          name: 'Bahrain',
          code: 'BH',
        }, {name: 'Bangladesh', code: 'BD'}, {name: 'Barbados', code: 'BB'}, {
          name: 'Belarus',
          code: 'BY',
        }, {name: 'Belgium', code: 'BE'}, {name: 'Belize', code: 'BZ'}, {
          name: 'Benin',
          code: 'BJ',
        }, {name: 'Bermuda', code: 'BM'}, {
          name: 'Bhutan',
          code: 'BT',
        }, {name: 'Bolivia, Plurinational State of', code: 'BO'}, {
          name: 'Bonaire, Sint Eustatius and Saba',
          code: 'BQ',
        }, {name: 'Bosnia and Herzegovina', code: 'BA'}, {
          name: 'Botswana',
          code: 'BW',
        }, {name: 'Bouvet Island', code: 'BV'}, {
          name: 'Brazil',
          code: 'BR',
        }, {name: 'British Indian Ocean Territory', code: 'IO'}, {
          name: 'Brunei Darussalam',
          code: 'BN',
        }, {name: 'Bulgaria', code: 'BG'}, {name: 'Burkina Faso', code: 'BF'}, {
          name: 'Burundi',
          code: 'BI',
        }, {name: 'Cambodia', code: 'KH'}, {name: 'Cameroon', code: 'CM'}, {
          name: 'Canada',
          code: 'CA',
        }, {name: 'Cape Verde', code: 'CV'}, {
          name: 'Cayman Islands',
          code: 'KY',
        }, {name: 'Central African Republic', code: 'CF'}, {name: 'Chad', code: 'TD'}, {
          name: 'Chile',
          code: 'CL',
        }, {name: 'China', code: 'CN'}, {
          name: 'Christmas Island',
          code: 'CX',
        }, {name: 'Cocos (Keeling) Islands', code: 'CC'}, {name: 'Colombia', code: 'CO'}, {
          name: 'Comoros',
          code: 'KM',
        }, {name: 'Congo', code: 'CG'}, {
          name: 'Congo, the Democratic Republic of the',
          code: 'CD',
        }, {name: 'Cook Islands', code: 'CK'}, {name: 'Costa Rica', code: 'CR'}, {
          name: 'Côte d\'Ivoire',
          code: 'CI',
        }, {name: 'Croatia', code: 'HR'}, {name: 'Cuba', code: 'CU'}, {
          name: 'Curaçao',
          code: 'CW',
        }, {name: 'Cyprus', code: 'CY'}, {name: 'Czech Republic', code: 'CZ'}, {
          name: 'Denmark',
          code: 'DK',
        }, {name: 'Djibouti', code: 'DJ'}, {name: 'Dominica', code: 'DM'}, {
          name: 'Dominican Republic',
          code: 'DO',
        }, {name: 'Ecuador', code: 'EC'}, {name: 'Egypt', code: 'EG'}, {
          name: 'El Salvador',
          code: 'SV',
        }, {name: 'Equatorial Guinea', code: 'GQ'}, {name: 'Eritrea', code: 'ER'}, {
          name: 'Estonia',
          code: 'EE',
        }, {name: 'Ethiopia', code: 'ET'}, {
          name: 'Falkland Islands (Malvinas)',
          code: 'FK',
        }, {name: 'Faroe Islands', code: 'FO'}, {name: 'Fiji', code: 'FJ'}, {
          name: 'Finland',
          code: 'FI',
        }, {name: 'France', code: 'FR'}, {name: 'French Guiana', code: 'GF'}, {
          name: 'French Polynesia',
          code: 'PF',
        }, {name: 'French Southern Territories', code: 'TF'}, {name: 'Gabon', code: 'GA'}, {
          name: 'Gambia',
          code: 'GM',
        }, {name: 'Georgia', code: 'GE'}, {name: 'Germany', code: 'DE'}, {
          name: 'Ghana',
          code: 'GH',
        }, {name: 'Gibraltar', code: 'GI'}, {name: 'Greece', code: 'GR'}, {
          name: 'Greenland',
          code: 'GL',
        }, {name: 'Grenada', code: 'GD'}, {name: 'Guadeloupe', code: 'GP'}, {
          name: 'Guam',
          code: 'GU',
        }, {name: 'Guatemala', code: 'GT'}, {name: 'Guernsey', code: 'GG'}, {
          name: 'Guinea',
          code: 'GN',
        }, {name: 'Guinea-Bissau', code: 'GW'}, {name: 'Guyana', code: 'GY'}, {
          name: 'Haiti',
          code: 'HT',
        }, {name: 'Heard Island and McDonald Islands', code: 'HM'}, {
          name: 'Holy See (Vatican City State)',
          code: 'VA',
        }, {name: 'Honduras', code: 'HN'}, {name: 'Hong Kong', code: 'HK'}, {
          name: 'Hungary',
          code: 'HU',
        }, {name: 'Iceland', code: 'IS'}, {name: 'India', code: 'IN'}, {
          name: 'Indonesia',
          code: 'ID',
        }, {name: 'Iran, Islamic Republic of', code: 'IR'}, {name: 'Iraq', code: 'IQ'}, {
          name: 'Ireland',
          code: 'IE',
        }, {name: 'Isle of Man', code: 'IM'}, {name: 'Israel', code: 'IL'}, {
          name: 'Italy',
          code: 'IT',
        }, {name: 'Jamaica', code: 'JM'}, {name: 'Japan', code: 'JP'}, {
          name: 'Jersey',
          code: 'JE',
        }, {name: 'Jordan', code: 'JO'}, {name: 'Kazakhstan', code: 'KZ'}, {
          name: 'Kenya',
          code: 'KE',
        }, {name: 'Kiribati', code: 'KI'}, {
          name: 'Korea, Democratic People\'s Republic of',
          code: 'KP',
        }, {name: 'Korea, Republic of', code: 'KR'}, {name: 'Kuwait', code: 'KW'}, {
          name: 'Kyrgyzstan',
          code: 'KG',
        }, {
          name: 'Lao People\'s Democratic Republic', code: 'LA'
        }, {
          name: 'Latvia',
          code: 'LV',
        }, {name: 'Lebanon', code: 'LB'}, {name: 'Lesotho', code: 'LS'}, {
          name: 'Liberia',
          code: 'LR',
        }, {name: 'Libya', code: 'LY'}, {name: 'Liechtenstein', code: 'LI'}, {
          name: 'Lithuania',
          code: 'LT',
        }, {name: 'Luxembourg', code: 'LU'}, {
          name: 'Macao',
          code: 'MO',
        }, {name: 'Macedonia, the Former Yugoslav Republic of', code: 'MK'}, {
          name: 'Madagascar',
          code: 'MG',
        }, {name: 'Malawi', code: 'MW'}, {name: 'Malaysia', code: 'MY'}, {
          name: 'Maldives',
          code: 'MV',
        }, {name: 'Mali', code: 'ML'}, {name: 'Malta', code: 'MT'}, {
          name: 'Marshall Islands',
          code: 'MH',
        }, {name: 'Martinique', code: 'MQ'}, {name: 'Mauritania', code: 'MR'}, {
          name: 'Mauritius',
          code: 'MU',
        }, {name: 'Mayotte', code: 'YT'}, {
          name: 'Mexico',
          code: 'MX',
        }, {name: 'Micronesia, Federated States of', code: 'FM'}, {
          name: 'Moldova, Republic of',
          code: 'MD',
        }, {name: 'Monaco', code: 'MC'}, {name: 'Mongolia', code: 'MN'}, {
          name: 'Montenegro',
          code: 'ME',
        }, {name: 'Montserrat', code: 'MS'}, {name: 'Morocco', code: 'MA'}, {
          name: 'Mozambique',
          code: 'MZ',
        }, {name: 'Myanmar', code: 'MM'}, {name: 'Namibia', code: 'NA'}, {
          name: 'Nauru',
          code: 'NR',
        }, {name: 'Nepal', code: 'NP'}, {name: 'Netherlands', code: 'NL'}, {
          name: 'New Caledonia',
          code: 'NC',
        }, {name: 'New Zealand', code: 'NZ'}, {name: 'Nicaragua', code: 'NI'}, {
          name: 'Niger',
          code: 'NE',
        }, {name: 'Nigeria', code: 'NG'}, {name: 'Niue', code: 'NU'}, {
          name: 'Norfolk Island',
          code: 'NF',
        }, {name: 'Northern Mariana Islands', code: 'MP'}, {name: 'Norway', code: 'NO'}, {
          name: 'Oman',
          code: 'OM',
        }, {name: 'Pakistan', code: 'PK'}, {name: 'Palau', code: 'PW'}, {
          name: 'Palestine, State of',
          code: 'PS',
        }, {name: 'Panama', code: 'PA'}, {name: 'Papua New Guinea', code: 'PG'}, {
          name: 'Paraguay',
          code: 'PY',
        }, {name: 'Peru', code: 'PE'}, {name: 'Philippines', code: 'PH'}, {
          name: 'Pitcairn',
          code: 'PN',
        }, {name: 'Poland', code: 'PL'}, {name: 'Portugal', code: 'PT'}, {
          name: 'Puerto Rico',
          code: 'PR',
        }, {name: 'Qatar', code: 'QA'}, {name: 'Réunion', code: 'RE'}, {
          name: 'Romania',
          code: 'RO',
        }, {name: 'Russian Federation', code: 'RU'}, {name: 'Rwanda', code: 'RW'}, {
          name: 'Saint Barthélemy',
          code: 'BL',
        }, {name: 'Saint Helena, Ascension and Tristan da Cunha', code: 'SH'}, {
          name: 'Saint Kitts and Nevis',
          code: 'KN',
        }, {name: 'Saint Lucia', code: 'LC'}, {
          name: 'Saint Martin (French part)',
          code: 'MF',
        }, {name: 'Saint Pierre and Miquelon', code: 'PM'}, {
          name: 'Saint Vincent and the Grenadines',
          code: 'VC',
        }, {name: 'Samoa', code: 'WS'}, {name: 'San Marino', code: 'SM'}, {
          name: 'Sao Tome and Principe',
          code: 'ST',
        }, {name: 'Saudi Arabia', code: 'SA'}, {name: 'Senegal', code: 'SN'}, {
          name: 'Serbia',
          code: 'RS',
        }, {name: 'Seychelles', code: 'SC'}, {name: 'Sierra Leone', code: 'SL'}, {
          name: 'Singapore',
          code: 'SG',
        }, {name: 'Sint Maarten (Dutch part)', code: 'SX'}, {name: 'Slovakia', code: 'SK'}, {
          name: 'Slovenia',
          code: 'SI',
        }, {name: 'Solomon Islands', code: 'SB'}, {name: 'Somalia', code: 'SO'}, {
          name: 'South Africa',
          code: 'ZA',
        }, {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, {
          name: 'South Sudan',
          code: 'SS',
        }, {name: 'Spain', code: 'ES'}, {name: 'Sri Lanka', code: 'LK'}, {
          name: 'Sudan',
          code: 'SD',
        }, {name: 'Suriname', code: 'SR'}, {name: 'Svalbard and Jan Mayen', code: 'SJ'}, {
          name: 'Swaziland',
          code: 'SZ',
        }, {name: 'Sweden', code: 'SE'}, {name: 'Switzerland', code: 'CH'}, {
          name: 'Syrian Arab Republic',
          code: 'SY',
        }, {name: 'Taiwan, Province of China', code: 'TW'}, {
          name: 'Tajikistan',
          code: 'TJ',
        }, {name: 'Tanzania, United Republic of', code: 'TZ'}, {
          name: 'Thailand',
          code: 'TH',
        }, {name: 'Timor-Leste', code: 'TL'}, {name: 'Togo', code: 'TG'}, {
          name: 'Tokelau',
          code: 'TK',
        }, {name: 'Tonga', code: 'TO'}, {name: 'Trinidad and Tobago', code: 'TT'}, {
          name: 'Tunisia',
          code: 'TN',
        }, {name: 'Turkey', code: 'TR'}, {
          name: 'Turkmenistan',
          code: 'TM',
        }, {name: 'Turks and Caicos Islands', code: 'TC'}, {name: 'Tuvalu', code: 'TV'}, {
          name: 'Uganda',
          code: 'UG',
        }, {name: 'Ukraine', code: 'UA'}, {name: 'United Arab Emirates', code: 'AE'}, {
          name: 'United Kingdom',
          code: 'GB',
        }, {name: 'United States', code: 'US'}, {
          name: 'United States Minor Outlying Islands',
          code: 'UM',
        }, {name: 'Uruguay', code: 'UY'}, {name: 'Uzbekistan', code: 'UZ'}, {
          name: 'Vanuatu',
          code: 'VU',
        }, {name: 'Venezuela, Bolivarian Republic of', code: 'VE'}, {
          name: 'Viet Nam',
          code: 'VN',
        }, {name: 'Virgin Islands, British', code: 'VG'}, {
          name: 'Virgin Islands, U.S.',
          code: 'VI',
        }, {name: 'Wallis and Futuna', code: 'WF'}, {name: 'Western Sahara', code: 'EH'},
          {
            name: 'Yemen', code: 'YE',
          }, {name: 'Zambia', code: 'ZM'}, {name: 'Zimbabwe', code: 'ZW'}];
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
                url: result.url, //s3Url
                transformRequest: function (data, headersGetter) {
                  var headers = headersGetter();
                  delete headers.Authorization;
                  return data;
                },
                fields: result.fields, //credentials
                method: 'POST',
                file: files[0]
              })
                .success(function (data, status, headers, config) {
                  // file is uploaded successfully
                  let parser = new DOMParser();
                  let xmlDoc = parser.parseFromString(data, 'text/xml');

                  if (page === 'modal') {
                    if ($scope.nbird.photos === undefined) {
                      $scope.nbird.photos = [];
                    }
                    if ($scope.nbird.photos.indexOf(
                        xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue) !== 0) {
                      $scope.nbird.photos.push(String(xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue));
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
      $scope.ok = function () {
        $uibModalInstance.close($scope.nbird);
      };
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
  }

  class NewsModalInstanceCtrl {
    constructor($scope, $uibModalInstance, nnews, Upload, $http) {
      if (nnews === undefined) {
        nnews = {};
      }
      $scope.nnews = nnews;
      $scope.removeInnerObject = function (index) {
        if (window.confirm('Você deseja remover esta imagem?')) {
          $scope.nnews.image = undefined;
        }
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
                url: result.url, //s3Url
                transformRequest: function (data, headersGetter) {
                  var headers = headersGetter();
                  delete headers.Authorization;
                  return data;
                },
                fields: result.fields, //credentials
                method: 'POST',
                file: files[0]
              })
                .success(function (data, status, headers, config) {
                  // file is uploaded successfully
                  let parser = new DOMParser();
                  let xmlDoc = parser.parseFromString(data, 'text/xml');

                  if (page === 'NewsModal') {
                    $scope.nnews.image = String(xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue);
                  }
                });
            })
            .error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
        }
      };
      $scope.ok = function () {
        $uibModalInstance.close($scope.nnews);
      };
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
  }

  angular.module('zoobirdApp.admin')
    .controller('AdminController', AdminController)
    .controller('ModalInstanceCtrl', ModalInstanceCtrl)
    .controller('NewsModalInstanceCtrl', NewsModalInstanceCtrl)
    .filter('trustThisUrl', ['$sce', function ($sce) {
      return function (val) {
        return $sce.trustAsResourceUrl(val);
      };
    }]);
})();
