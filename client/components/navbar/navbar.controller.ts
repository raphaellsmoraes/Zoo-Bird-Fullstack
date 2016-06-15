'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'HOME',
    'link': '/'
  },
    {
      'title': 'QUEM SOMOS',
      'link': '/aboutus'
    },
    {
      'title': 'NOTÍCIAS',
      'link': '/noticias'
    },
    {
      'title': 'VIVEIRO',
      'link': '/viveiro'
    },
    {
      'title': 'PRODUTOS',
      'link': '/produtos'
    },
    {
      'title': 'DIFERENCIAL',
      'link': '/diferencial'
    },
    {
      'title': 'CONTATO',
      'link': '/contato'
    }];

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth, Manifest, $scope) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    Manifest.getManifest(function (response) {
      $scope.manifest = response.data;
      document.getElementById('navbar').style.backgroundImage = 'url(\'/assets/images/'
        + $scope.manifest['fundo_cabecalho.png'] + ' \')';
    });
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('zoobirdApp')
  .controller('NavbarController', NavbarController);
