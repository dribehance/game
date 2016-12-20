// by dribehance <dribehance.kksdapp.com>
angular.module("Game").controller("imageGroupController", function($scope, gameServices, errorServices, toastServices, localStorageService, config) {
	$scope.image_group = [];
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
		gameServices.query_image_group($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.image_group = $scope.image_group.concat(data.Result.ColorImageList.list);
				$scope.no_more = $scope.image_group.length == data.Result.ColorImageList.totalRow ? true : false;
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
	$scope.parse_time = function(entry) {
		var time = entry.post_time.split(" ")[0];
		return time.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, "$1年$2月$3日") + " 第" + entry.qishu + "期";
	}
})