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

.controller('PlaylistsCtrl', function($scope, PlaylistService,SongsService,$state) {
  $scope.playlists = [];
  $scope.songs = [];
  $scope.newPlaylist = {
    songs: []
  };
  $scope.doRefresh = function(){
    PlaylistService.getPlaylists().then(playlists => $scope.playlists = playlists);  
  };    
  $scope.goToAddSong = function(i){
    let playlistId = $scope.playlists[i]._id;
    $state.go('app.addSong',{playlistId: playlistId});
  };

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
    //$scope.newPlaylist.creator._id = '1';
    console.log($scope.newPlaylist);
    PlaylistService.postPlaylist($scope.newPlaylist);

    $scope.newPlaylist = {};
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams,PlaylistService,SongsService) {
  $scope.playlist = {};
  $scope.musics = [];
  $scope.id = $stateParams.playlistId;

  $scope.doRefresh = function(){
    PlaylistService.getPlaylist($stateParams.playlistId).then((playlist)=> {
      $scope.playlist = playlist;
    });    
  }

  PlaylistService.getPlaylist($stateParams.playlistId).then((playlist)=> {
    $scope.playlist = playlist;
  });
  SongsService.getSongs().then(songsCache => $scope.musics = songsCache);
  
  $scope.removeSong = function(id){
    PlaylistService.removeSong(id,$stateParams.playlistId);
  }
  $scope.addSong = function(id){
    //console.log($scope.playlist);
    PlaylistService.addSong(id,$stateParams.playlistId);
  };
});