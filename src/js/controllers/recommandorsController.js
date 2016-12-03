// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("recommandorsController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	userServices.sync();
	$scope.recommandors = [];
	$scope.page = {
		pn: 1,
		page_size: 1,
		message: "点击加载更多"
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_recommandors($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.recommandors = $scope.recommandors.concat(data.Result.RecommendList.list);
				$scope.no_more = $scope.recommandors.length == data.Result.RecommendList.totalRow ? true : false;
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