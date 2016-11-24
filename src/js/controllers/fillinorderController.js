// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("fillinorderController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.show = function() {
		$scope.popup_state = "open";
	}
	$scope.close = function() {
		$scope.popup_state = "close";
	}
	$scope.input.game = "特码";
})