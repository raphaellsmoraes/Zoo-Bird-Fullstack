'use strict';
var SettingsController = (function () {
    function SettingsController(Auth) {
        this.errors = {};
        this.submitted = false;
        this.Auth = Auth;
    }
    SettingsController.prototype.changePassword = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.$valid) {
            this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
                .then(function () {
                _this.message = 'Password successfully changed.';
            })
                .catch(function () {
                form.password.$setValidity('mongoose', false);
                _this.errors.other = 'Incorrect password';
                _this.message = '';
            });
        }
    };
    return SettingsController;
}());
angular.module('zoobirdApp')
    .controller('SettingsController', SettingsController);
//# sourceMappingURL=settings.controller.js.map