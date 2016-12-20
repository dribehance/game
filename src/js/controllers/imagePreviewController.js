// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("imagePreviewController", function($scope, $rootScope, $routeParams, errorServices, toastServices, localStorageService, config) {
	$scope.preview_image = $rootScope.staticImageUrl + $routeParams.name;
})