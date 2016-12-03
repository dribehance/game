// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("modifyTradePasswordController", function($scope, $rootScope, $location, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.ajaxForm = function() {
		if ($scope.password_1 != $scope.password_2) {
			errorServices.autoHide("两次密码不一致")
			return;
		}
		toastServices.show();
		userServices.modify_trade_password({
			"old_trade_password": $scope.input.password,
			"new_trade_password": $scope.input.password_1,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					// $location.path("signin").replace();
					$rootScope.back();
				}, 3000)
			} else {
				$scope.input.password = "";
				$scope.input.password_1 = "";
				$scope.input.password_2 = "";
				errorServices.autoHide(data.message);
			}
		})
	}
})