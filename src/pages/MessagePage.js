import React from "react";
import styled from "styled-components";
import Massage from "../components/massage/Massage";
import MassageBox from "../components/massage/MassageBox";
import MassageHeader from "../components/massage/MassageHeader";

//리덕스
import { useSelector } from "react-redux";

//소켓
import io from "socket.io-client";

export const socket = io.connect("ws://52.78.246.163:80");
socket.emit("init", { name: "testName" });

const MessagePage = () => {
  const userNickname = useSelector((state) => state.user.user.nickname);
  console.log(userNickname);

  return (
    <>
      <MessagePageWrap>
        <MassageHeader />
        <Massage />
        <MassageBox userNickname={userNickname} />
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
