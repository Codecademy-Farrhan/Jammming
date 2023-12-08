import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spotify from './Spotify';

const CallbackHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Spotify.checkToken();
    console.log("CallbackHandler - Token before localStorage:", token);

    if (token) {
      localStorage.setItem("spotify_access_token", token);
      console.log("CallbackHandler - Token stored in localStorage");
      navigate('/dashboard');
    } else {
      console.log("CallbackHandler - No token, navigating to /login");
      navigate('/login');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default CallbackHandler;
