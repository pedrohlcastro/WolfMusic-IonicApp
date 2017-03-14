angular.module('music.directives',[])

.directive("musicTag",function(){
	return {
		restrict:'E',
		templateUrl: "templates/music.html",
		controller: "BrowseMusicCtrl"
	};
})


.directive("tabPlaylist",function(){
	return {
		restrict: 'E',
		scope: {
			home: "="
		},
		templateUrl: "templates/tabPlaylist.html",
		controller:"PlaylistsCtrl"
	};
})



