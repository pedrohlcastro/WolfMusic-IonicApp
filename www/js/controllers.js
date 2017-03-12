angular.module('music.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('BrowseMusicCtrl', function($scope,SongsService){
  $scope.musics = [];
  SongsService.getSongs().then(songsCache => $scope.musics = songsCache);
})

.controller('PlaylistsCtrl', function($scope, PlaylistService,SongsService) {
  $scope.playlists = [];
  $scope.songs = [];
  $scope.newPlaylist = {
    songs: []
  }
  PlaylistService.getPlaylists().then(playlists => $scope.playlists = playlists);
  SongsService.getSongs().then(songsCache => $scope.songs = songsCache);


  $scope.addSong = function(song){
    if(song){
      let songNew = song.split('>')[0];
      songNew = parseInt(songNew,10);
      songNew = $scope.songs[songNew];
      delete songNew.$$hashKey;
      $scope.newPlaylist.songs.push(songNew);
    }
  };

  $scope.addPlaylist = function(newPlaylist){
    console.log($scope.newPlaylist);
    $scope.newPlaylist._id = '1';
    $scope.newPlaylist.creator._id = '1';
    PlaylistService.postPlaylist($scope.newPlaylist);

    $scope.newPlaylist = {};
  };
  // $scope.getPlaylist = (function(){
  //   $http.get('https://mah-music-api.herokuapp.com/playlists')
  //     .then(
  //       function(res){
  //         $scope.playlists = res.data;
  //       },
  //       function(err){
  //         console.log('ERRO AO ACESSAR API');
  //       }
  //     );
  // })();
})

.controller('PlaylistCtrl', function($scope, $stateParams,PlaylistService) {
  $scope.playlist = {};
  PlaylistService.getPlaylist($stateParams.playlistId).then((playlist)=> {
    $scope.playlist = playlist;
  });
  // console.log($scope.playlist);
});