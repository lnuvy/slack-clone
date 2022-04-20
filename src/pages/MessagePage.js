import React from "react";
import styled from "styled-components";
import Massage from "../components/massage/Massage";
import MassageBox from "../components/massage/MassageBox";
import MassageHeader from "../components/massage/MassageHeader";

//리덕스
import { useSelector } from "react-redux";

//소켓
import io from "socket.io-client";
export const socket = io.connect("ws://localhost:5001");

const MessagePage = () => {
  const userInfo = useSelector((state) => state.user.user);

  socket.emit("init", { user: userInfo });

  return (
    <>
      <MessagePageWrap>
        <MassageHeader />
        <Massage profileImg={userInfo.profileImg} />
        <MassageBox userInfo={userInfo} />
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
