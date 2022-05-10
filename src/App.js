import React, { useEffect } from "react";
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js'; 
import Player from './Player';
import { useDataLayerValue } from "./DataLayer"; 

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    let _token = hash.access_token;
    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({
        type: 'SET_TOKEN',
        token: _token
      });
      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',  
          user: user         
        });
      });
      
      spotify.getMyTopArtists().then((response) =>
      dispatch({
        type: "SET_TOP_ARTISTS",
        top_artists: response,
      })
    );

    dispatch({
      type: "SET_SPOTIFY",
      spotify: spotify,
    });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists
        })
      })
       spotify.getPlaylist("37i9dQZEVXcMrecaCxGuB5").then(response =>(
         dispatch({
           type: "SET_DISCOVER_WEEKLY",
           discover_weekly: response
         })
       ))
    }
  }, [token, dispatch])
  
  return <div>
    {token
      ? <Player spotify={spotify} />
      : <Login />
    }
  </div>
}

export default App;


