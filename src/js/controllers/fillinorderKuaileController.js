// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("fillinorderKuaileController", function($scope, $route, $timeout, $route, userServices, $interval, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.kuaile = {}
	$scope.kuaile.waiting = false;
	$scope.query_kuaile = function() {
		userServices.query_kuaile().then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.kuaile = data;
			} else {
				errorServices.autoHide(data.message);
			}
			// interval call
			if ($scope.kuaile.waiting) {
				$timeout(function() {
					$scope.kuaile.day_seconds = "";
					$scope.query_kuaile();
				}, 5000)
				return;
			}
		})
	}
	$scope.query_kuaile();
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
			// 3 广东快乐10分 4 六合彩
			$scope.query_kuaile_peilv(3);
		}
	}, true);
	$scope.query_kuaile_peilv = function(type) {
		toastServices.show();
		userServices.query_kuaile_peilv({
			g_type: type,
			o_type: $scope.input.game_type.value
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.games = data.Result.OddsGdkl10Beans;
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
		if ($scope.kuaile.waiting) {
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
		$scope.query_kuaile();
	};
	$scope.refresh = function() {
		$route.reload();
	};
	// reset form
	$scope.resetForm = function() {
		if ($scope.kuaile.waiting) {
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
		if ($scope.kuaile.waiting) {
			return;
		}
		var buy_infos = "",
			total_money = 0,
			delta = $scope.input.game_type.value == "1" ? "0" : "1";
		angular.forEach($scope.games, function(game, index) {
			angular.forEach(game.oIndexBeans, function(g, i) {
				if (g.betted) {
					var _index = parseFloat(index) + parseFloat(delta);
					total_money += parseFloat(g.betting_money);
					buy_infos += _index + "A" + g.name + "A" + g.betting_money + "A" + g.rate + "#";
				}
			})
		});
		buy_infos = buy_infos.substring(0, buy_infos.length - 1);
		toastServices.show();
		userServices.betting_kuaile({
			"game_type": 3,
			"o_type": $scope.input.game_type.value,
			"total_money": total_money,
			"n_periods_next": $scope.kuaile.qishu_str,
			"buy_infos": buy_infos,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				// $timeout(function() {
				// 	$route.reload();
				// }, 500)
				$scope.resetForm();
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})