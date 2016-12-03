// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("meController", function($scope, $rootScope, $location, userServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	userServices.query_basicinfo().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$rootScope.user = angular.extend({}, $rootScope.user, data.Result.UserInfo);
		} else {
			errorServices.autoHide(data.message);
		}
	});
	$scope.logout = function() {
		$rootScope.user = {};
		localStorageService.remove("token");
		$location.path("index").replace();
	}
})