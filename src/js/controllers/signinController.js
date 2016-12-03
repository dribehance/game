// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("signinController", function($scope, $rootScope, $timeout, $location, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.signin({
			nickname: $scope.input.nickname,
			password: $scope.input.password
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