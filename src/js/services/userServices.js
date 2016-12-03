// by dribehance <dribehance.kksdapp.com>
angular.module("Game").factory("userServices", function($rootScope, $http, apiServices, localStorageService, config) {
	return {
		// rsa encrypt
		rsa_key: apiServices._get(angular.extend({}, config.common_params, {
			url: "key/private_key.pem",
		})),
		// signin
		signin: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/Login",
		})),
		// signup
		signup: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/RegistTel",
		})),
		// forget password
		forget: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/ResetPassword",
		})),
		// modify password
		modify_password: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/SetPassword",
			token: localStorageService.get("token")
		})),
		// modify trade password
		modify_trade_password: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/setTradePassword",
			token: localStorageService.get("token")
		})),
		// reset password
		reset: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		get_smscode: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
		})),
		// query user basic information
		query_basicinfo: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/userBaseInfo",
			token: localStorageService.get("token")
		})),
		sync: function() {
			var self = this;
			self.query_basicinfo().then(function(data) {
				if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
					$rootScope.user = undefined;
					$rootScope.user = angular.extend({}, $rootScope.user, data.Result.UserInfo);
				} else {
					self.logout();
				}
			});
		},
		logout: function() {
			$rootScope.user = {};
			localStorageService.remove("token");
		},
		realname_authen: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
			token: localStorageService.get("token")
		})),
		phone_authen: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
			token: localStorageService.get("token")
		})),
		// 幸运飞艇
		query_feiting: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/XyftManage/xyftOut",
			token: localStorageService.get("token")
		})),
		query_feiting_history: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/XyftManage/xyftList",
			token: localStorageService.get("token")
		})),
		// 获取赔率接口
		query_peilv: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/XyftManage/oddsList",
		})),
		// 下注
		betting: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/XyftManage/buyGame",
			token: localStorageService.get("token")
		})),
		// 北京赛车
		query_saiche: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/BjpksManage/bjpksOut",
			token: localStorageService.get("token")
		})),
		query_saiche_history: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/BjpksManage/bjpksList",
			token: localStorageService.get("token")
		})),
		// 广东快乐10分
		// 六合彩
		// 消息列表
		query_messages: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
			token: localStorageService.get("token")
		})),
		// 消息详情
		query_message_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "api_url",
			token: localStorageService.get("token")
		})),
		// 充值账号信息
		query_constant_info: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/baseInfo",
			token: localStorageService.get("token")
		})),
		// 充值
		charge: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/ChargeLogs/chargeMoney",
			token: localStorageService.get("token")
		})),
		// 提现
		withdraw: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/ChargeLogs/getMoney",
			token: localStorageService.get("token")
		})),
		// 资金流水
		query_bills: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/fundList",
			token: localStorageService.get("token")
		})),
		// 推荐人信息列表
		query_recommandors: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/recommendList",
			token: localStorageService.get("token")
		})),
		// 注单查询
		query_orders: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/buyGameLogList",
			token: localStorageService.get("token")
		})),
	}
});