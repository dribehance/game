// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("fillinorderFeitingController", function($scope, $route, $timeout, $route, userServices, $interval, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.feiting = {}
	$scope.feiting.waiting = false;
	$scope.query_feiting = function() {
		userServices.query_feiting().then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.feiting = data;
			} else {
				errorServices.autoHide(data.message);
			}
			// interval call
			if ($scope.feiting.waiting) {
				$timeout(function() {
					$scope.feiting.day_seconds = "";
					$scope.query_feiting();
				}, 5000)
				return;
			}
		})
	}
	$scope.query_feiting();
	$scope.game_type = [{
		"label": "双面",
		"value": "1",
	}, {
		"label": "数字盘",
		"value": "2",
	}];
	$scope.input.game_type = $scope.game_type[0];
	$scope.$watch("input.game_type", function(n, o) {
		if (n) {
			// 1幸运飞艇 2北京赛车
			$scope.query_peilv(1);
		}
	}, true);
	$scope.query_peilv = function(type) {
		toastServices.show();
		userServices.query_peilv({
			g_type: type,
			o_type: $scope.input.game_type.value
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.games = data.Result.OddsBeans;
				angular.forEach($scope.games, function(game, index) {
					angular.forEach(game.oIndexBeans, function(g, i) {
						g.betting_money = 0;
						g.betted = false;
					})
				})
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
	// open popup
	$scope.show = function(cell, game) {
		if ($scope.feiting.waiting) {
			return;
		}
		if (cell.betted) {
			cell.betting_money = 0;
			cell.betted = false;
			return
		}
		$scope.popup_state = "open";
		$scope.input.selected_game_cell = cell;
		$scope.input.selected_game = game;
	}
	$scope.close = function() {
		$scope.popup_state = "close";
	};
	// betting
	$scope.betting = function() {
		var number_reg = /^[0-9]*$/;
		if (!$scope.input.betting_money || !number_reg.test($scope.input.betting_money)) {
			return;
		}
		$scope.input.selected_game_cell.betting_money = $scope.input.betting_money;
		$scope.input.selected_game_cell.betted = true;
		$scope.popup_state = "close";
	};
	// timer callback
	$scope.callbackTimer = {};
	$scope.callbackTimer.finished = function() {
		$scope.query_feiting();
	};
	$scope.refresh = function() {
		$route.reload();
	};
	// reset form
	$scope.resetForm = function() {
		if ($scope.feiting.waiting) {
			return;
		}
		angular.forEach($scope.games, function(game, index) {
			angular.forEach(game.oIndexBeans, function(g, i) {
				g.betting_money = 0;
				g.betted = false;
			})
		})
	};
	// ajax form
	$scope.ajaxForm = function() {
		if ($scope.feiting.waiting) {
			return;
		}
		var buy_infos = "",
			total_money = 0;
		angular.forEach($scope.games, function(game, index) {
			angular.forEach(game.oIndexBeans, function(g, i) {
				if (g.betted) {
					var _index = index + 1;
					total_money += parseFloat(g.betting_money);
					buy_infos += _index + "A" + g.name + "A" + g.betting_money + "A" + g.rate + "#";
				}
			})
		});
		buy_infos = buy_infos.substring(0, buy_infos.length - 1);
		toastServices.show();
		userServices.betting({
			"game_type": 1,
			"o_type": $scope.input.game_type.value,
			"total_money": total_money,
			"n_periods_next": $scope.feiting.qishu_str,
			"buy_infos": buy_infos,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$route.reload();
				}, 500)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})