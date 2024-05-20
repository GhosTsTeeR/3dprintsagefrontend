import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import { IconButton } from '@mui/material';
import {Close as CloseIcon, ArrowCircleDown } from '@mui/icons-material/';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const ENDPOINT = process.env.REACT_APP_API_SERVER_CHATBOT;
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [conversation, setConversations] = useState([]);
  const [socket, setSocket] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef(null);
  const [isThinking, setIsThinking] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(20);
  const [isCancelled, setIsCancelled] = useState(false);
  const conversationRef = useRef(null);
  const [showScrollToBottomIcon, setShowScrollToBottomIcon] = useState(false);

const handleScrollToBottom = () => {
  conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
};

  useEffect(() => {
    conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
  }, [conversation]);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
  
    newSocket.on('connect', () => {
      console.log('Conectado al servidor');
    });
  
    newSocket.on('chat message', (message) => {
      setIsThinking(true);
      setIsCancelled(false);
      typeMessage(message.content);
    });
  
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const typeMessage = (message) => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (!isCancelled) {
        setConversations((prevConversations) => {
          const lastMessage = prevConversations[prevConversations.length - 1];
          if (lastMessage && lastMessage.sender === 'Ghost') {
            return prevConversations.map((msg, i) =>
              i === prevConversations.length - 1 ? { ...msg, message: message.slice(0, index + 1) } : msg
            );
          } else {
            return [
              ...prevConversations,
              {
                id: prevConversations.length + 1,
                sender: 'Ghost',
                message: message.slice(0, index + 1),
                avatar: 'https://api.dicebear.com/7.x/bottts/png',
                seen: true,
              },
            ];
          }
        });
        index++;
        if (index === message.length) {
          clearInterval(intervalId);
          setIsThinking(false);
        }
      } else {
        clearInterval(intervalId);
        setIsThinking(false);
      }
    }, typingSpeed);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (isThinking) {
      setIsCancelled(true);
    } else if (socket && mensaje.trim() !== '') {
      setIsThinking(true);
      socket.emit('chat message', mensaje);
      setConversations((prevConversations) => [
        ...prevConversations,
        {
          id: prevConversations.length + 1,
          sender: 'You',
          message: mensaje,
          avatar: 'https://api.dicebear.com/6.x/pixel-art/svg',
          seen: true,
        },
      ]);
      setMensaje('');
    }
  };

  const onChangeMensaje = (e) => {
    setMensaje(e.target.value);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    if (socket && conversation.length === 0) {
      socket.emit('chat message', `solo responderas en ${language} `);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [mensaje]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      if (textareaRef.current.value === '') {
        textareaRef.current.style.height = '20px';
      } else {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = conversationRef.current;
    const isScrolledToBottom = scrollTop + clientHeight === scrollHeight;
    const isScrolledToTop = scrollTop === 0;
  
    if (!isScrolledToTop && !isScrolledToBottom) {
      setIsCancelled(true); // Detener la escritura si el usuario desplaza hacia arriba
    } else {
      setShowScrollToBottomIcon(false); // Ocultar el icono cuando el scroll está en la parte inferior
    }
  
    if (!isCancelled) {
      if (isScrolledToBottom) {
        setIsCancelled(false); // Reactivar la escritura si el usuario vuelve al final
        conversationRef.current.scrollTop = scrollHeight;
      }
    }
  };

  return (
    <React.Fragment>
      <div className={`GM__ChatBot__container${isOpen ? '-open' : ''}${isFullscreen ? '-fullscreen' : ''}`}>
        <div className="GM__ChatBot__container-header">
          <img src="https://api.dicebear.com/7.x/bottts/png" alt="Chatbot" />
          <h2>SpookyGPT4All</h2>
          <div className="header-buttons">
            <IconButton onClick={toggleFullscreen}>
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
            <IconButton onClick={toggleChat}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className="GM__ChatBot__container-conversation" ref={conversationRef} onScroll={handleScroll}>
          {conversation.length === 0 && (
            <div className="language-options">
              <button onClick={() => handleLanguageSelect('Español')}>Español</button>
              <button onClick={() => handleLanguageSelect('Inglés')}>Inglés</button>
            </div>
          )}
          {conversation.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'You' ? 'user-message' : 'chatbot-message'}`}
            >
              {message.sender === 'You' ? (
                <>
                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>
                  <img src={message.avatar} alt={message.sender} className="user-avatar" />
                </>
              ) : (
                <>
                  <img src={message.avatar} alt={message.sender} className="chatbot-avatar" />
                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>
                </>
              )}
            </div>
          ))}
            {showScrollToBottomIcon && (
            <div className="scroll-to-bottom-icon" onClick={handleScrollToBottom}>
              <ArrowCircleDown />
            </div>
          )}
        </div>
        <div className="GM__ChatBot__container-input">
          <div className="input-wrapper">
            {isThinking && <div className="thinking-message">Estoy pensando...</div>}
          </div>
          <textarea
            ref={textareaRef}
            value={mensaje}
            onChange={onChangeMensaje}
            onKeyPress={handleKeyPress}
            placeholder={isThinking ? "Indispuesto...": "Disponible c:"}
            disabled={isThinking}
          />
          <button onClick={handleSubmit} disabled={mensaje.trim() === ''}>
            {isThinking ? 'Cancelar' : 'Enviar'}
          </button>
        </div>
      </div>
      <div className="GM__ChatBot">
        <img onClick={toggleChat} src="https://api.dicebear.com/7.x/bottts/png" alt="chatbot" />
      </div>
    </React.Fragment>
  );
}
