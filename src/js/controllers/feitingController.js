// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("feitingController", function($scope, $route, $rootScope, $timeout, $interval, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.feiting = {}
	$scope.feiting.waiting = false;
	userServices.query_constant_info().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.charge_info = data.Constant;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.query_feiting = function() {
		userServices.query_feiting().then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.feiting = data;
				$scope.total_betting_money = 0;
				angular.forEach($scope.feiting.Result.XyftBjpkLogs, function(v, k) {
					$scope.total_betting_money += parseFloat(v.money);
				});
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
			$scope.reload_feiting_history();
		})
	}
	$scope.query_feiting();
	$scope.feiting_historys = [];
	$scope.page = {
		pn: 1,
		page_size: 5,
		message: "点击加载更多"
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_feiting_history($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if ($scope.is_reload) {
				$scope.feiting_historys = [];
				$scope.is_reload = false;
			}
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.feiting_historys = $scope.feiting_historys.concat(data.Result.XyftDataList.list);
				$scope.no_more = $scope.feiting_historys.length == data.Result.XyftDataList.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "没有了";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
	$scope.reload_feiting_history = function() {
		$scope.page = {
			pn: 1,
			page_size: 5,
			message: "点击加载更多"
		}
		$scope.is_reload = true;
		$scope.no_more = false;
		$scope.loadMore();
	};
	// timer callback
	$scope.callbackTimer = {};
	$scope.callbackTimer.finished = function() {
		$scope.query_feiting();
	};
	$scope.refresh = function() {
		$route.reload();
	}
})