// by dribehance <dribehance.kksdapp.com>
angular.module("Game").factory("gameExternalServices", function($http, userServices, apiServices, localStorageService, config) {
	return {
		// 配置 获取最佳投注游戏
		config: function() {
			var self = this;
			var games = ["北京赛车", "幸运飞艇"],
				types = ["冠军", "亚军", "季军"],
				betting_types = ["单", "双", "大", "小"];
			angular.forEach(games, function(g, g_index) {
				angular.forEach(types, function(t, t_index) {
					angular.forEach(betting_types, function(bt, bt_index) {
						self.query_trend_by_type();
					})
				})
			});
		},
		// 自动下单 从某一期开始的自动投注
		auto_betting: function(time, game, type, betting_type) {

		},
		// 查询从某一期开始,同一种游戏的收益,某一投注类型
		query_gains_from_time: function(time, game, type, betting_type) {

			return userServices.query_orders({
				pn: 1,
				page_size: 1000,
			}).then(function(data) {
				if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
					var orders = data.Result.BuyGameLogList.list;
					var gain = eval(orders.filter(function(order) {
						return order.game_name == game && order.type_name_01 == type && order.type_name_02 == betting_type && order.post_time > time;
					}).map(function(o) {
						return o.backmoney
					}).join("+"));
					return gain || 0;
				} else {
					errorServices.autoHide(data.message);
				}
			})
		},
		// 查询趋势,大小单双连续n次出现的次数
		query_trend_by_type: function(game, type, betting_type, repeat_time) {
			var statistics = [],
				counter = 0,
				temp = [],
				last, current,
				condition = {
					"单": " % 2 != 0",
					"双": " % 2 == 0",
					"大": " > 5",
					"小": " < 6"
				};
			// 获取趋势数据 赛车
			return userServices.query_saiche_history({
				pn: 1,
				page_size: 1000,
			}).then(function(data) {
				if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
					var trends = data.Result.BjpksDataList.list;
					angular.forEach(trends, function(trend, index) {
						current = trend;
						var condition_str = current.n_01 + condition[betting_type];
						if (eval(condition_str)) {
							current.open_type = betting_type
						}
						if (last && current.open_type && current.open_type == last.open_type) {
							temp.push(current);
							last = current
							return;
						}
						if (temp.length > 0) {
							statistics.push({
								name: "冠军连续" + betting_type,
								counter: temp.length,
								date: temp[temp.length - 1].datelinedate,
								span: temp[temp.length - 1].qishu + "-" + temp[0].qishu,
								data: temp
							});
						}
						last = current;
						temp = [current];
					});
					return statistics.filter(function(s) {
						return s.counter > repeat_time - 1;
					})

				} else {
					errorServices.autoHide(data.message);
				}
			})
		},

	}
});