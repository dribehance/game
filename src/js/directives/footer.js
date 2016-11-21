// by dribehance <dribehance.kksdapp.com>
angular.module("Game").directive('dribehanceFooter', function() {
	return {
		restrict: 'E',
		templateUrl: "templates/footer.html",
		scope: {
			active: "="
		},
		link: function(scope, element, attrs) {
			// function body
		}
	};
});