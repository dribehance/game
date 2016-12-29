// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("messagesController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.messages = [];
	$scope.page = {
		pn: 1,
		page_size: 20,
		user_type: 1,
		message: "点击加载更多"
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_messages($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.messages = $scope.messages.concat(data.Result.MyInformationList.list);
				$scope.no_more = $scope.messages.length == data.Result.MyInformationList.totalRow ? true : false;
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