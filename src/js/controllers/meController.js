// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("meController", function($scope, $rootScope, $location, userServices, gameExternalServices, errorServices, toastServices, localStorageService, config) {
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
	gameExternalServices.query_trend_by_type("单", 7).then(function(data) {
		console.log(data)
	})
	gameExternalServices.query_gains_from_time("2016-12-06 10:14:40", "北京赛车", "冠军", "单").then(function(data) {
		console.log(data)
	})
})