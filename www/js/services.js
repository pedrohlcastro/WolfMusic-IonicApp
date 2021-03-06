angular.module('music.services',[])

.factory('PlaylistService',function($http,$q){
	let playlistCache = null;

	return {
		getPlaylists: function(){
			let deferred = $q.defer();
			if(!playlistCache){
				$http.get('https://mah-music-api.herokuapp.com/playlists')
					.success(function(data){
						playlistCache = data;
						deferred.resolve(playlistCache);
					})
					.error(function(err){
						reject(err);
					});
			}
			else{
				deferred.resolve(playlistCache);
			}
			return deferred.promise;
		},

		postPlaylist: function(newPlaylist){
			$http.post('https://mah-music-api.herokuapp.com/playlists',JSON.stringify(newPlaylist),{headers: {'Content-Type': 'application/json'}})
				.success(function(data){
					this.getPlaylists();
					console.log('Sucesso');
				})
				.error(function(err){
					console.log(err);
				});
		},

		getPlaylist: function(id){
			return this.getPlaylists().then(function(playlists){
				let deferred = $q.defer();
				let playlist = playlists.filter(function(d){
					return d._id === id;
				})[0];
				if(playlist)
					deferred.resolve(playlist);
				else
					deferred.reject('Playlist Errada');
				return deferred.promise;
			});
		},

		addSong: function(songId,playlistId){
			let postUrl = 'https://mah-music-api.herokuapp.com/playlists/'+playlistId+'/songs/'+songId;
			$http.post(postUrl)
				.success(function(){
					console.log("success");
				})
				.error(function(err){
					console.log(err);
				});
		},

		removeSong: function(songId,playlistId){
			let postUrl = 'https://mah-music-api.herokuapp.com/playlists/'+playlistId+'/songs/'+songId;
			$http.delete(postUrl)
				.success(function(){
					console.log("success");
				})
				.error(function(err){
					console.log(err);
			});

		}
	}
})

.factory('SongsService',function($http,$q){
	let songsCache = null;

	return {
		getSongs: function(){
			let deferred = $q.defer();
			if(!songsCache){
				$http.get('https://mah-music-api.herokuapp.com/songs')
					.success(function(data){
						songsCache = data;
						deferred.resolve(songsCache);
					})
					.error(function(err){
						deferred.reject(err);
					});
			}
			else{
				deferred.resolve(songsCache);
			}
			return deferred.promise;
		},
	}
})

;