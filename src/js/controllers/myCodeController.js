// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("myCodeController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	userServices.sync();
	toastServices.show();
	userServices.query_constant_info().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.constant_info = data.Constant;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})