// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("signupController", function($scope, $rootScope, $timeout, $location, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.ajaxForm = function() {
		if ($scope.input.password_1 != $scope.input.password_2) {
			errorServices.autoHide("两次登录密码不一致");
			return;
		}
		if ($scope.input.password_3 != $scope.input.password_4) {
			errorServices.autoHide("两次提现密码不一致");
			return;
		}
		toastServices.show();
		userServices.signup({
			"nickname": $scope.input.nickname,
			"password": $scope.input.password_1,
			"name": $scope.input.realname,
			"telephone": $scope.input.telephone,
			"trade_password": $scope.input.password_3,
			"invited_code": $scope.input.code,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$rootScope.user = data.user;
				localStorageService.set("token", data.user.token);
				errorServices.autoHide(data.message);
				$timeout(function() {
					$location.path("index").replace();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})