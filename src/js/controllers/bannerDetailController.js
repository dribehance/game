// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("bannerDetailController", function($scope, $sce, $routeParams, gameServices, errorServices, toastServices, localStorageService, config) {
	var outer_url = "http://120.76.41.192:8055/app/IndexBannerManage/indexBannerDetail?index_banner_id=" + $routeParams.id;
	$scope.trust_resource = $sce.trustAsResourceUrl(outer_url);
})