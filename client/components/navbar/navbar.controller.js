'use strict';
var NavbarController = (function () {
    //end-non-standard
    function NavbarController($location, Auth) {
        //start-non-standard
        this.menu = [{
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
        this.isCollapsed = true;
        this.$location = $location;
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
    }
    NavbarController.prototype.isActive = function (route) {
        return route === this.$location.path();
    };
    return NavbarController;
}());
angular.module('zoobirdApp')
    .controller('NavbarController', NavbarController);
//# sourceMappingURL=navbar.controller.js.map