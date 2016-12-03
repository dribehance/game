// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("indexController", function($scope, $rootScope, $timeout, $location, userServices, errorServices, gameServices, toastServices, localStorageService, config) {
	toastServices.show();
	gameServices.query_banner().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.banners = data.Result.homeBanner;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.go = function(path) {
		if (!localStorageService.get("token")) {
			errorServices.autoHide("请先登录");
			$timeout(function() {
				$location.path("signin");
			}, 3000)
			return;
		}
		$location.path(path);
	}
})