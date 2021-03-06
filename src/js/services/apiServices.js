// by dribehance <dribehance.kksdapp.com>
angular.module("Game").factory("apiServices", function($http, localStorageService) {
	return {
		_get: function(request) {
			return function(input) {
				if (request.token !== undefined) {
					request.token = localStorageService.get("token")
				}
				return $http({
					// by dribehance <dribehance.kksdapp.com>
					url: request.url,
					method: "GET",
					cache: request.cache || false,
					params: angular.extend({}, request, input)
				}).then(function(data) {
					return data.data;
				});
			}
		},
		_post: function(request) {
			return function(input) {
				if (request.token !== undefined) {
					request.token = localStorageService.get("token")
				}
				return $http({
					// by dribehance <dribehance.kksdapp.com>
					url: request.url,
					method: "POST",
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					transformRequest: function(obj) {
						var str = [];
						for (var p in obj)
							str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						return str.join("&");
					},
					data: angular.extend({}, request, input)
				}).then(function(data) {
					return data.data;
				});
			}
		}
	}
});