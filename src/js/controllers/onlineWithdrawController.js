// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("onlineWithdrawController", function($scope, $rootScope, userServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	userServices.query_basicinfo().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$rootScope.user = angular.extend({}, $rootScope.user, data.Result.UserInfo);
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.withdraw({
			"charge_account": $scope.input.account,
			"account_name": $scope.input.pay_account,
			"money": $scope.input.money,
			"trade_password": $scope.input.password,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})