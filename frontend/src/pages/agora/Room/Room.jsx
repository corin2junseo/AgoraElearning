import React, { useEffect, useRef, useState } from 'react';
import './styles/room.css'; // CSS 파일 경로를 맞게 수정하세요

const Room = () => {
  const messagesContainerRef = useRef(null);
  const memberContainerRef = useRef(null);
  const chatContainerRef = useRef(null);
  const displayFrameRef = useRef(null);
  const [activeMemberContainer, setActiveMemberContainer] = useState(false);
  const [activeChatContainer, setActiveChatContainer] = useState(false);

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const memberContainer = memberContainerRef.current;
    const chatContainer = chatContainerRef.current;
    const displayFrame = displayFrameRef.current;

    const expandVideoFrame = (e) => {
      const child = displayFrame.children[0];
      if (child) {
        document.getElementById('streams__container').appendChild(child);
      }

      displayFrame.style.display = 'block';
      displayFrame.appendChild(e.currentTarget);
      const userIdInDisplayFrame = e.currentTarget.id;

      const videoFrames = document.getElementsByClassName('video__container');
      for (let i = 0; videoFrames.length > i; i++) {
        if (videoFrames[i].id !== userIdInDisplayFrame) {
          videoFrames[i].style.height = '100px';
          videoFrames[i].style.width = '100px';
        }
      }
    };

    const videoFrames = document.getElementsByClassName('video__container');
    for (let i = 0; videoFrames.length > i; i++) {
      videoFrames[i].addEventListener('click', expandVideoFrame);
    }

    const hideDisplayFrame = () => {
      displayFrame.style.display = 'none';
      const child = displayFrame.children[0];
      if (child) {
        document.getElementById('streams__container').appendChild(child);
      }
      for (let i = 0; videoFrames.length > i; i++) {
        videoFrames[i].style.height = '300px';
        videoFrames[i].style.width = '300px';
      }
    };

    displayFrame.addEventListener('click', hideDisplayFrame);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      for (let i = 0; videoFrames.length > i; i++) {
        videoFrames[i].removeEventListener('click', expandVideoFrame);
      }
      displayFrame.removeEventListener('click', hideDisplayFrame);
    };
  }, []);

  return (
    <div>
      <header id="nav">
        <div className="nav--list">
          <button id="members__button" onClick={() => setActiveMemberContainer(prev => !prev)}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
              <path d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z" fill="#ede0e0" />
            </svg>
          </button>
          <a href="lobby.html">
            <h3 id="logo">
              <span>INHA</span>
            </h3>
          </a>
        </div>

        <div id="nav__links">
          <button id="chat__button" onClick={() => setActiveChatContainer(prev => !prev)}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" fill="#ede0e0" clipRule="evenodd">
              <path d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-15.667-6l-5.333 4v-4h-3v-14.001l18 .001v14h-9.667zm-6.333-2h3v2l2.667-2h8.333v-10l-14-.001v10.001z" />
            </svg>
          </button>
          <a className="nav__link" id="create__room__btn" href="lobby.html">
            방 생성
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
            </svg>
          </a>
        </div>
      </header>

      <main className="container">
        <div id="room__container">
          <section id="members__container" ref={memberContainerRef} style={{ display: activeMemberContainer ? 'block' : 'none' }}>
            <div id="members__header">
              <p>참여자</p>
              <strong id="members__count">0</strong>
            </div>
            <div id="member__list"></div>
          </section>

          <section id="stream__container">
            <div id="stream__box" ref={displayFrameRef}></div>
            <div id="streams__container"></div>
            <div className="stream__actions">
              <button id="camera-btn" className="active">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" />
                </svg>
              </button>
              <button id="mic-btn" className="active">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z"/>
                </svg>
              </button>
              <button id="screen-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z"/>
                </svg>
              </button>
              <button id="leave-btn" style={{ backgroundColor: '#FF5050' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z"/>
                </svg>
              </button>
            </div>
          </section>

          <section id="messages__container" ref={chatContainerRef} style={{ display: activeChatContainer ? 'block' : 'none' }}>
            <div id="messages" ref={messagesContainerRef}></div>
            <form id="message__form">
              <input type="text" name="message" placeholder="메세지를 보내세요...." />
              <button type="submit">전송</button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Room;
