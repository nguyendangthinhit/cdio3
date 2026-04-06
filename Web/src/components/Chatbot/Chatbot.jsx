import React, { useState } from 'react';
import styles from './Chatbot.module.scss';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Xin chào! 👋 Tôi có thể giúp gì cho bạn?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // 👉 gửi message lên n8n
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };

    // hiển thị message user ngay
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://cdio3.app.n8n.cloud/webhook-test/cdio3', { // link n8n
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const result = Array.isArray(data) ? data[0] : data;

      const botMessage = {
        type: 'bot',
        text: result.reply || 'Không có phản hồi'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { type: 'bot', text: 'Lỗi kết nối server 😢' }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
        
        {/* HEADER */}
        <div className={styles.chatHeader}>
          <h4>Chat Hỗ Trợ</h4>
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>

        {/* BODY */}
        <div className={styles.chatBody}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.type === 'bot'
                  ? styles.messageRowBot
                  : styles.messageRowUser
              }
            >
              {msg.type === 'bot' && (
                <div className={styles.avatarBot}>🤖</div>
              )}

              <div
                className={
                  msg.type === 'bot'
                    ? styles.bubbleBot
                    : styles.bubbleUser
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className={styles.messageRowBot}>
              <div className={styles.avatarBot}>🤖</div>
              <div className={styles.bubbleBot}>Đang trả lời...</div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className={styles.chatFooter}>
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            className={styles.chatInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className={styles.sendBtn} onClick={sendMessage}>
            Gửi
          </button>
        </div>
      </div>

      {/* FLOATING BUTTON */}
      <button
        className={styles.floatingBtn}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <span className={styles.closeIcon}>&times;</span>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={styles.chatIcon}
          >
            <path d="M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;