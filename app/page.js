"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { auth, firestore } from './lib/firebase'; // Import auth from your Firebase configuration
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import GoogleAuthProvider and signInWithPopup
import HeroShapes from './components/heroShapes';
import GreenShapes from './components/heroShapeGreen';
import styles from '../styles/LandingPage.module.css'; // Import your CSS module
import '../styles/globals.css'

const LandingPage = () => {
  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.push('/chat'); // Redirect to chat page if the user is already signed in
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, [router]);

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
    <div className={styles.container}>
      <GreenShapes />
      <h1 className={styles.title}>Welcome to Our App</h1>
      <p className={styles.description}>Sign in to start chatting with our bot.</p>
      <HeroShapes />
      <button onClick={handleSignIn} className={styles.button}>Sign In with Google</button>
    </div>
  );
};

export default LandingPage;
