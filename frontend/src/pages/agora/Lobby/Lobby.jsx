import React, { useEffect, useState } from "react";
import "./styles/lobby.css"; // CSS 파일 경로를 맞게 수정하세요

const Lobby = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    // 세션 스토리지에서 사용자 이름 가져오기
    const displayName = sessionStorage.getItem("display_name");
    if (displayName) {
      setUsername(displayName);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // 세션 스토리지에 사용자 이름 저장
    sessionStorage.setItem("display_name", username);

    // 방 이름 가져오기
    let inviteCode = roomName;
    if (!inviteCode) {
      inviteCode = String(Math.floor(Math.random() * 10000)); // 랜덤 방 코드 생성
    }

    // 방으로 이동 (정확한 파일 경로로 이동)
    window.location.href = `file:///C:/Users/%ED%95%A8%EC%A4%80%EC%84%9C/Desktop/test/Mern-Elearning/frontend/src/room.html?room=${inviteCode}`;
  };

  return (
    <div>
      <header id="nav">
        <div className="nav--list">
          <a href="lobby.html">
            <h3 id="logo">
              <span>INHA</span>
            </h3>
          </a>
        </div>

        <div id="nav__links">
          <a className="nav__link" href="/">
            로비
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24">
              <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z" />
            </svg>
          </a>
          <a className="nav__link" id="create__room__btn" href="lobby.html">
            방 생성
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
            </svg>
          </a>
        </div>
      </header>

      <main id="room__lobby__container">
        <div id="form__container">
          <div id="form__container__header">
            <p>👋 방을 만들거나 참여해보세요</p>
          </div>

          <form id="lobby__form" onSubmit={handleSubmit}>
            <div className="form__field__wrapper">
              <label>사용자명</label>
              <input
                type="text"
                name="name"
                required
                placeholder="사용자 명을 적어주세요..."
                value={username}
                onChange={(e) => setUsername(e.target.value)} // 상태 업데이트
              />
            </div>

            <div className="form__field__wrapper">
              <label>방 이름</label>
              <input
                type="text"
                name="room"
                placeholder="들어갈 방 이름을 적어주세요..."
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)} // 상태 업데이트
              />
            </div>

            <div className="form__field__wrapper">
              <button type="submit">
                방 입장
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Lobby;
