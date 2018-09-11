0 Authorize my account w Spotify login 


[`GET /v1/me/tracks`](https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-tracks/) 
1 Provide a list of songs 
1a Provide a list of songs that aren’t currently in any of my playlists

[`GET /v1/me/playlists`](https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/)
2 Provide a list of my playlists

[`GET /v1/playlists/{playlist_id}/images`](https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist-cover/)
2a Show playlist cover
2b based on the vibe of the playlist, provide random images that are determine to fit vi an algo

3 Allow me to add songs to one of my playlists
3a Allow me to drag & drop my songs into playlists
3b Inform me if I’m adding a dupe 
3c Allow me to create a new playlist on the spot
