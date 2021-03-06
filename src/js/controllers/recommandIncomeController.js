// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("recommandIncomeController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	userServices.sync();
	$scope.recommand_incomes = [];
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
		userServices.query_recommand_income($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.recommand_incomes = $scope.recommand_incomes.concat(data.Result.RecommendList.list);
				$scope.no_more = $scope.recommand_incomes.length == data.Result.RecommendList.totalRow ? true : false;
				$scope.total_money = data.total_money;
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