import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa'; // Import the Google icon from react-icons
import styles from '../../styles/LandingPage.module.css';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase'; // Ensure this is correctly imported

const GoogleSignIn = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/chat'); // Redirect to chat page after successful sign-in
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <button className={styles.button} onClick={handleSignIn}>
      <div className={styles.icon}>
        <FaGoogle size={24} /> {/* Render the Google icon */}
      </div>
      Sign In with Google
    </button>
  );
};

export default GoogleSignIn;
