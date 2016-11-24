// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("ordersController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.show = function() {
		$scope.popup_state = "open";
	}
	$scope.close = function() {
		$scope.popup_state = "close";
	}
})