// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("kuaileController", function($scope, $route, $rootScope, $timeout, $interval, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.kuaile = {}
	$scope.kuaile.waiting = false;
	userServices.query_constant_info().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.charge_info = data.Constant;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.query_kuaile = function() {
		userServices.query_kuaile().then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.kuaile = data;
				$scope.total_betting_money = 0;
				angular.forEach($scope.kuaile.Result.XyftBjpkLogs, function(v, k) {
					$scope.total_betting_money += parseFloat(v.money);
				});
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
			$scope.reload_kuaile_history();
		})
	}
	$scope.query_kuaile();
	$scope.kuaile_historys = [];
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
		userServices.query_kuaile_history($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if ($scope.is_reload) {
				$scope.kuaile_historys = [];
				$scope.is_reload = false;
			}
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.kuaile_historys = $scope.kuaile_historys.concat(data.Result.Gdkl10DataList.list);
				$scope.no_more = $scope.kuaile_historys.length == data.Result.Gdkl10DataList.totalRow ? true : false;
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
	$scope.reload_kuaile_history = function() {
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
		$scope.query_kuaile();
	};
	$scope.refresh = function() {
		$route.reload();
	}
})