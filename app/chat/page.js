"use client";

import { useState, useEffect } from 'react';
import { auth, firestore } from '../lib/firebase';
import GoogleSignIn from '../components/googleSignIn';
import axios from 'axios';
import { collection, doc, query, orderBy, onSnapshot, addDoc, deleteDoc, getDocs } from 'firebase/firestore';
import styles from '../../styles/ChatPage.module.css'; // Import the CSS module
import '../../styles/globals.css'
const ChatPage = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const messagesRef = collection(doc(firestore, 'users', user.uid), 'messages');
      const q = query(messagesRef, orderBy('createdAt'));
      const unsubscribe = onSnapshot(q, snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleSendMessage = async () => {
    if (message) {
      const messagesRef = collection(doc(firestore, 'users', user.uid), 'messages');
      await addDoc(messagesRef, {
        text: message,
        createdAt: new Date(),
      });
      setMessage('');

      // Chatbot functionality
      const newChat = [...chat, { role: "user", content: message }];
      setChat(newChat);

      try {
        const response = await axios.post('/api/chat', { message });
        setChat([...newChat, { role: "assistant", content: response.data.response }]);
      } catch (error) {
        console.error("Error communicating with the API:", error);
        setChat([...newChat, { role: "assistant", content: "Error communicating with the API." }]);
      }
    }
  };

  const handleDeleteMessage = async (messageId) => {
    const messagesRef = doc(firestore, 'users', user.uid, 'messages', messageId);
    await deleteDoc(messagesRef);
  };

  const handleClearChatHistory = async () => {
    if (user) {
      const messagesRef = collection(doc(firestore, 'users', user.uid), 'messages');
      const snapshot = await getDocs(messagesRef);
      snapshot.forEach(doc => deleteDoc(doc.ref)); // Delete all messages
      setMessages([]);
      setChat([]);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      {!user ? (
        <GoogleSignIn />
      ) : (
        <div className={styles.chatContainer}>
          <div className={styles.header}>
            <div className={styles.welcome}>Welcome, {user.displayName}</div>
            <div className={styles.options}>
              <button onClick={handleClearChatHistory} className={styles.optionButton}>Clear History</button>
              <button onClick={handleLogout} className={styles.optionButton}>Logout</button>
            </div>
          </div>
          <div className={styles.chatBox}>
            {chat.map((msg, index) => (
              <div key={index} className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.botMessage}`}>
                <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
              </div>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className={styles.input}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage} className={styles.sendButton}>
              <img src="/s" alt="Send" className={styles.sendIcon} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
