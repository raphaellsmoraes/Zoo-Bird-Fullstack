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
      'title': 'VIVEIRO',
      'link': '/viveiro'
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

  constructor($location, Auth) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('zoobirdApp')
  .controller('NavbarController', NavbarController);
