'use strict';
(function () {
    var AdminController = (function () {
        function AdminController(User) {
            // Use the User $resource to fetch all users
            this.users = User.query();
        }
        AdminController.prototype.delete = function (user) {
            user.$remove();
            this.users.splice(this.users.indexOf(user), 1);
        };
        return AdminController;
    }());
    angular.module('zoobirdApp.admin')
        .controller('AdminController', AdminController);
})();
//# sourceMappingURL=admin.controller.js.map