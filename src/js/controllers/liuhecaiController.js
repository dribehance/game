// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("liuhecaiController", function($scope, $route, $rootScope, $timeout, $interval, userServices, errorServices, toastServices, localStorageService, config) {
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
			$scope.reload_liuhecai_history();
		})
	}
	$scope.query_liuhecai();
	$scope.liuhecai_historys = [];
	$scope.page = {
		pn: 1,
		page_size: 20,
		message: "点击加载更多"
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_liuhecai_history($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if ($scope.is_reload) {
				$scope.liuhecai_historys = [];
				$scope.is_reload = false;
			}
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.liuhecai_historys = $scope.liuhecai_historys.concat(data.Result.XglhcDataList.list);
				$scope.no_more = $scope.liuhecai_historys.length == data.Result.XglhcDataList.totalRow ? true : false;
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
	$scope.reload_liuhecai_history = function() {
		$scope.page = {
			pn: 1,
			page_size: 20,
			message: "点击加载更多"
		}
		$scope.is_reload = true;
		$scope.no_more = false;
		$scope.loadMore();
	};
	// timer callback
	$scope.callbackTimer = {};
	$scope.callbackTimer.finished = function() {
		$scope.query_liuhecai();
	};
	$scope.refresh = function() {
		$route.reload();
	}
})