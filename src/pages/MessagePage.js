import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Massage from "../components/massage/Massage";
import MassageBox from "../components/massage/MassageBox";
import MassageHeader from "../components/massage/MassageHeader";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

let socket;

const MessagePage = () => {
  const user = useSelector((state) => state.user.user);
  const { roomName } = useParams();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState("");
  const room = roomName;
  const { nickname } = user;
  console.log(nickname);

  useEffect(() => {
    socket = io("localhost:5001");

    socket.emit("join", { nickname, room }, (err) => {
      if (err) alert(err);
    });
  }, [room]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = () => {
    if (message) socket.emit("send_message", message, () => setMessage(""));
  };

  return (
    <>
      <MessagePageWrap>
        <MassageHeader room={room} users={users} />
        <Massage messages={messages} {...user} />
        <MassageBox
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
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
