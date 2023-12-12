const clientId = "015db15f271c4c6799f2d61e2b130e19";
const redirectUri = "http://localhost:3000/callback";
const scopes = ["playlist-modify-public"]; // Add other scopes as needed
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

export default {
  checkToken,
  redirectToSpotifyLogin,
  getUserProfile,
};
