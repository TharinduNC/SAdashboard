app.controller('mapAll', function($scope, $firebaseArray) {
	$scope.world = 'mosalah';
	var firebaseRefMap = firebase.database().ref("map");
	
	var list = $firebaseArray(firebaseRefMap);
	//read map
	$scope.maps = list;
	
	$scope.mapChecked = {
		maps: []
	};
});

app.directive('filterList', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            
            var li = Array.prototype.slice.call(element[0].children);
            
            function filterBy(value) {
                li.forEach(function(el) {
                    el.className = el.textContent.toLowerCase().indexOf(value.toLowerCase()) !== -1 ? '' : 'ng-hide';
                });
            }
            
            scope.$watch(attrs.filterList, function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    filterBy(newVal);
                }
            });
        }
    };
});

app.filter('htmlToPlaintext', function() {
      return function(text) {
         return String(text).replace(/<[^>]+>/gm, '');
      };
   }
);