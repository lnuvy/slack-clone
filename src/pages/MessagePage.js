import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Message from "../components/message/Message";
import MessageBox from "../components/message/MessageBox";
import MessageHeader from "../components/message/MessageHeader";

//리덕스
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// export const socket = io.connect("ws://52.78.246.163:80/chat");

const MessagePage = (props) => {
  const { socket } = props;

  const user = useSelector((state) => state.user.user);
  const { nickname, profileImg } = user;
  console.log(nickname);
  const room = useParams().dmId;

  return (
    <>
      <MessagePageWrap>
        <MessageHeader
          socket={socket}
          nickname={nickname}
          profileImg={profileImg}
        />
        <Message profileImg={profileImg} socket={socket} nickname={nickname} />
        <MessageBox
          socket={socket}
          nickname={nickname}
          profileImg={profileImg}
          room={room}
        />
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
