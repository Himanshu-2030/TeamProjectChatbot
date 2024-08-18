// app/components/googleSignIn.js

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Modular imports
import { auth } from '../lib/firebase'; // Import auth from your firebase configuration

const GoogleSignIn = ({ onSuccess }) => {
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <button onClick={handleSignIn}>Sign in with Google</button>
  );
};

export default GoogleSignIn;



