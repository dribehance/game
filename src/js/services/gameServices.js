// by dribehance <dribehance.kksdapp.com>
angular.module("Game").factory("gameServices", function($rootScope, $http, apiServices, localStorageService, config) {
	return {
		query_banner: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/IndexBannerManage/homeBanner",
			cache: true
		})),
		query_banner_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/IndexBannerManage/indexBannerDetail",
			cache: true
		})),
		query_image_group: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/IndexBannerManage/colorImageList",
			cache: true
		}))
	}
});