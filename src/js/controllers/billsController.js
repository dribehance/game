// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("billsController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.bills = [];
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
		userServices.query_bills($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.bills = $scope.bills.concat(data.Result.FundLogList.list);
				$scope.no_more = $scope.bills.length == data.Result.FundLogList.totalRow ? true : false;
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
	$scope.type = ["", "存款", "提现", "投注", "中奖", "推荐收入"];
	$scope.get_type = function(type) {
		return $scope.type[type];
	}
})