// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("exchangeController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.input.province = "广东省";
	$scope.input.city = "深圳市";
	$scope.input.district = "宝安区";
})