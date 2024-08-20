// components/chatShapes.js

import styles from '../../styles/chatShape.module.css';

const chatShapes = () => {
  return (
    <div className={styles.chatShape}>
      <div className={styles.chat1}></div>
      <div className={styles.chat2}></div>
      <div className={styles.chat3}></div>
    </div>
  );
};

export default chatShapes;
