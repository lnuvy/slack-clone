import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Message from "../components/message/Message";
import MessageBox from "../components/message/MessageBox";
import MessageHeader from "../components/message/MessageHeader";

//리덕스
import { useSelector } from "react-redux";

//소켓
import io from "socket.io-client";

// export const socket = io.connect("ws://52.78.246.163:80/chat");
// export const [socket, setCurrentSocket] = useState();
export const socket = io.connect("localhost:5001");
// socket.emit("init", { name: "testName", user: user });

const MessagePage = () => {
  const user = useSelector((state) => state.user.user);
  const { nickname } = user;
  const { profileImg } = user;
  console.log(nickname);
  socket.emit("init", { user: user });
  // const room = "testroom";

  // socket.emit("init", { user: user });

  // useEffect(() => {});

  // socket.emit("join", { roomName: nickname, nickname: nickname }, (error) => {
  //   console.log("error");
  //   // 에러 처리
  //   if (error) {
  //     alert(error);
  //   }
  // });

  // socket.on("connection", (socket) => {
  //   socket.join("some room");
  // });
  // io.to("some room").emit("some event");
  // io.to("room1").to("room2").to("room3").emit("some event");

  return (
    <>
      <MessagePageWrap>
        <MessageHeader nickname={nickname} profileImg={profileImg} />
        <Message nickname={nickname} />
        <MessageBox nickname={nickname} profileImg={profileImg} />
      </MessagePageWrap>
    </>
  );
};

const MessagePageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 63px);
  display: flex;
  flex-direction: column;
`;

export default MessagePage;
