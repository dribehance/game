// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("chargeController", function($scope, $rootScope, userServices, errorServices, toastServices, localStorageService, config) {
	userServices.sync();
})