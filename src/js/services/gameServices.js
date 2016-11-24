// by dribehance <dribehance.kksdapp.com>
angular.module("Game").factory("gameServices", function($rootScope, $http, apiServices, localStorageService, config) {
	return {
		// rsa encrypt
		rsa_key: apiServices._get(angular.extend({}, config.common_params, {
			url: "key/private_key.pem",
		}))
	}
});