// by dribehance <dribehance.kksdapp.com>
angular.module("Game").factory("gameServices", function($rootScope, $http, apiServices, localStorageService, config) {
	return {
		// rsa encrypt
		query_banner: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/IndexBannerManage/homeBanner",
		}))
	}
});