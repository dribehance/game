// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("fillinorderLiuhecaiController", function($scope, $route, $timeout, $route, userServices, $interval, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.liuhecai = {}
	$scope.liuhecai.waiting = false;
	$scope.query_liuhecai = function() {
		userServices.query_liuhecai().then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.liuhecai = data;
			} else {
				errorServices.autoHide(data.message);
			}
			// interval call
			if ($scope.liuhecai.waiting) {
				$timeout(function() {
					$scope.liuhecai.day_seconds = "";
					$scope.query_liuhecai();
				}, 5000)
				return;
			}
		})
	}
	$scope.query_liuhecai();
	$scope.game_type = [{
		"label": "特码",
		"value": "1",
	}, {
		"label": "正码",
		"value": "2",
	}, {
		"label": "半波",
		"value": "3",
	}, {
		"label": "一肖/尾数",
		"value": "4",
	}, {
		"label": "特码生肖",
		"value": "5",
	}];
	$scope.input.game_type = $scope.game_type[0];
	$scope.$watch("input.game_type", function(n, o) {
		if (n) {
			$scope.query_liuhecai_peilv(n.value);
		}
	}, true);
	$scope.parse_code = function(codes) {
		return codes.split("，");
	}
	$scope.query_liuhecai_peilv = function(type) {
		toastServices.show();
		userServices.query_liuhecai_peilv({
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
		if ($scope.liuhecai.waiting) {
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
		$scope.query_liuhecai();
	};
	$scope.refresh = function() {
		$route.reload();
	};
	// reset form
	$scope.resetForm = function() {
		if ($scope.liuhecai.waiting) {
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
		if ($scope.liuhecai.waiting) {
			return;
		}
		var buy_infos = "",
			total_money = 0;
		angular.forEach($scope.games, function(game, index) {
			angular.forEach(game.oIndexBeans, function(g, i) {
				if (g.betted) {
					// var _index = index + 1;
					total_money += parseFloat(g.betting_money);
					buy_infos += $scope.input.game_type.value + "A" + g.name + "A" + g.betting_money + "A" + g.rate + "#";
				}
			})
		});
		buy_infos = buy_infos.substring(0, buy_infos.length - 1);
		toastServices.show();
		userServices.betting_liuhecai({
			"game_type": 4,
			"o_type": $scope.input.game_type.value,
			"total_money": total_money,
			"n_periods_next": $scope.liuhecai.qishu_str,
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