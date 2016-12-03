// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("forgetController", function($scope, $location, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.ajaxForm = function() {
		if ($scope.password_1 != $scope.password_2) {
			errorServices.autoHide("两次密码不一致")
			return;
		}
		toastServices.show();
		userServices.forget({
			"nickname": $scope.input.nickname,
			"telephone": $scope.input.telephone,
			"password": $scope.input.password_1,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$location.path("signin").replace();
				}, 3000)
			} else {
				$scope.input.nickname = "";
				$scope.input.telephone = "";
				$scope.input.password_1 = "";
				$scope.input.password_2 = "";
				errorServices.autoHide(data.message);
			}
		})
	}
})