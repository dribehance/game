// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("saicheController", function($scope, $route, $rootScope, $timeout, $interval, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.saiche = {}
	$scope.saiche.waiting = false;
	$scope.query_saiche = function() {
		userServices.query_saiche().then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.saiche = data;
			} else {
				errorServices.autoHide(data.message);
			}
			// interval call
			if ($scope.saiche.waiting) {
				$timeout(function() {
					$scope.saiche.day_seconds = "";
					$scope.query_saiche();
				}, 5000)
				return;
			}
			$scope.reload_saiche_history();
		})
	}
	$scope.query_saiche();
	$scope.saiche_historys = [];
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
		userServices.query_saiche_history($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if ($scope.is_reload) {
				$scope.saiche_historys = [];
				$scope.is_reload = false;
			}
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.saiche_historys = $scope.saiche_historys.concat(data.Result.BjpksDataList.list);
				$scope.no_more = $scope.saiche_historys.length == data.Result.BjpksDataList.totalRow ? true : false;
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
	$scope.reload_saiche_history = function() {
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
		$scope.query_saiche();
	};
	$scope.refresh = function() {
		$route.reload();
	}
})