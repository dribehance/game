// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("ordersController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.show = function(order) {
		$scope.show_order = order;
		$scope.popup_state = "open";
	}
	$scope.close = function() {
		$scope.popup_state = "close";
	}
	$scope.orders = [];
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
		userServices.query_orders($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.orders = $scope.orders.concat(data.Result.BuyGameLogList.list);
				$scope.no_more = $scope.orders.length == data.Result.BuyGameLogList.totalRow ? true : false;
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
})