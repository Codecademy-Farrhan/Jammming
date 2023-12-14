const clientId = "015db15f271c4c6799f2d61e2b130e19";
const redirectUri = "http://localhost:3000/callback";
const scopes = ["playlist-modify-public"];
const stateKey = "spotify_auth_state";

const generateRandomString = (length) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const redirectToSpotifyLogin = () => {
  const state = generateRandomString(16);
  localStorage.setItem(stateKey, state);
  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.append("response_type", "token");
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("scope", scopes.join(" "));
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("state", state);

  window.location = url.toString();
}

const checkToken = () => {
  const storedToken = localStorage.getItem("spotify_access_token");
  // console.log("Spotify.js storedToken:", storedToken); // token check

  if (storedToken) {
    return storedToken;
  }

  const urlParams = new URLSearchParams(window.location.hash.substring(1));
  const urlAccessToken = urlParams.get("access_token");
  // console.log("URL Access Token:", urlAccessToken); // token check
  const urlExpiresIn = urlParams.get("expires_in");
  const urlState = urlParams.get("state");
  const storedState = localStorage.getItem(stateKey);

  if (urlAccessToken && urlState === storedState) {
    const expiresIn = Number(urlExpiresIn);
    const expiryTime = new Date().getTime() + expiresIn * 1000;

    localStorage.setItem("spotify_access_token", urlAccessToken);
    localStorage.setItem("spotify_token_expiry", expiryTime.toString());
    localStorage.removeItem(stateKey);

    return urlAccessToken;
  } else if (urlState && urlState !== storedState) {
    console.error("Spotify authentication error: State mismatch");
    return null;
  }
};

// getUserProfile function definition
const getUserProfile = async (token) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching userProfile:", error.message);
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_token_expiry");
    localStorage.removeItem("spotify_auth_state");
    window.location.href = "/login";
  }
};

export const createPlaylist = async (playlistName, token, userId) => {
  const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: playlistName,
      public: true
    }),
  });

  const data = await response.json();
  return data.id;
};

export const updatePlaylistName = async (playlistId, token, newName) => {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const addTracksToPlaylist = async (playlistId, token, trackUris) => {
  // Ensure trackUris is an array of track URIs
  if (!Array.isArray(trackUris)) {
    console.error("trackUris must be an array");
    return;
  }

  const payload = {
    uris: trackUris // This should be an array of track URIs
  };

  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload) // Convert the payload to a JSON string
  });
};

export const removeTrackFromPlaylist = async (playlistId, token, trackUri) => {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tracks: [{ uri: trackUri }]
    }),
  });
  return response.json();
};


export default {
  addTracksToPlaylist,
  checkToken,
  createPlaylist,
  getUserProfile,
  redirectToSpotifyLogin,  
  removeTrackFromPlaylist,
  updatePlaylistName
};
