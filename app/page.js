

"use client"; // Add this line

import { useRouter } from 'next/navigation';
import GoogleSignIn from './components/googleSignIn'; // Adjust import path as necessary

export default function LandingPage() {
  const router = useRouter();

  const handleTryNow = async () => {
    // Redirect to chat page after user signs in
    router.push('/chat');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Chatbot</h1>
      <p style={styles.description}>Sign in to start chatting with our AI assistant.</p>
      <GoogleSignIn onSuccess={handleTryNow} />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: '#ffffff',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.5rem',
    marginBottom: '40px',
  }
};
