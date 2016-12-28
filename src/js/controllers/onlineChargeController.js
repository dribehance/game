// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("onlineChargeController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.input.type = "1";
	toastServices.show();
	userServices.query_constant_info().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.charge_info = data.Constant;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.check = function(type) {
		$scope.input.type = type;
	}
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.charge({
			"charge_account": $scope.input.pay_account,
			"account_name": $scope.input.account,
			"money": $scope.input.money,
			"charge_type": $scope.input.type
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$scope.input.pay_account = "";
				$scope.input.account = "";
				$scope.input.money = "";
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})