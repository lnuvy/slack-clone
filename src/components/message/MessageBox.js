import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Button } from "../../elements";
import moment from "moment";
import "moment/locale/ko";

//소켓 import
import { socket } from "../../pages/MessagePage";

const MessageBox = ({ nickname, profileImg, props }) => {
  // console.log(nickname);
  // console.log(profileImg);
  // const { roomname } = props.match?.params;
  // console.log(roomname);

  const [chat, setChat] = useState({ name: "", message: "" });

  console.log(chat.message);
  // const [nowMessage, setNowMessage] = useState(chat.message);
  const nowMessage = chat.message;
  console.log(nowMessage);
  // console.log(Object.values(chat);

  console.log(chat.message);
  console.log(nickname);

  const buttonHandler = useCallback(() => {
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    socket.emit("send message", {
      nickname: nickname,
      message: chat.message,
      createdAt: time,
      profileImg: profileImg,
    });
    //버튼을 클릭했을 때 send message이벤트 발생
  }, [chat]);

  // const nowMassage = Object.values(chat);

  // console.log(nowMassage);

  const changeMessage = useCallback(
    (e) => {
      setChat({ message: e.target.value });
    },

    [chat]
  );

  const deleteChat = () => {
    // setNowMessage("");
  };

  return (
    <>
      <MessageBoxWrap>
        <InputBox>
          <InputText
            onChange={changeMessage}
            placeholder={"# 에게 메시지 보내기"}
            onKeyPress={(e) => {
              if (e.key === "Enter") buttonHandler();
              deleteChat();
            }}
            value={nowMessage}
          ></InputText>
          <IconBox>
            <IconBoxItem
              style={{ background: `${nowMessage ? "#007a5a" : ""}` }}
            >
              <Button
                margin="0 5px 0 0"
                padding="0 1px 0 3px"
                style={{
                  border: "none",
                  background: `${nowMessage ? "#007a5a" : ""}`,
                }}
                disabled={!nowMessage}
                onClick={() => {
                  deleteChat();
                  buttonHandler();
                }}
              >
                <IoSend
                  size={16}
                  style={{ color: `${nowMessage ? "white" : "#b7b7b7"}` }}
                />
              </Button>
              <VerticalLine></VerticalLine>
              <Button
                style={{
                  border: "none",
                  background: `${nowMessage ? "#007a5a" : ""}`,
                  color: `${nowMessage ? "white" : "#b7b7b7"}`,
                }}
              >
                <RiArrowDropDownLine size={18} />
              </Button>
            </IconBoxItem>
          </IconBox>
        </InputBox>
      </MessageBoxWrap>
    </>
  );
};
const MessageBoxWrap = styled.div`
  width: 100%;
`;
const InputBox = styled.div`
  border: 1px solid rgba(29, 28, 29, 0.3);
  border-radius: 4px;
  height: 79px;
  display: grid;
  margin: 0px 20px 0 20px;
  grid-template-rows: 35px 44px;
`;
const InputText = styled.input`
  margin: 0 15px;
  width: 95%;
  border: none;
  outline: none;
`;

const IconBox = styled.div`
  position: relative;
  right: 13px;
  top: 10px;
`;
const IconBoxItem = styled.div`
  float: right;
  padding: 0px 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  &:hover {
    background: rgba(221, 221, 221, 0.3);
  }
`;

const VerticalLine = styled.div`
  width: 1px;
  background: rgba(221, 221, 221, 0.3);
  content: "";
  position: absolute;
  height: 18px;
  right: 24px;
`;

export default MessageBox;
