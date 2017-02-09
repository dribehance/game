angular.module("Game")
	.directive('scroll', function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs, ctrl) {

				$timeout(function() {
					$(element).css({
						height: $(element).parent().height()
					})
				}, 1000)
			}
		};
	});