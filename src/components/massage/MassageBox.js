import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Button } from "../../elements";
import moment from "moment";
import "moment/locale/ko";

//소켓 import
import { socket } from "../../pages/MessagePage";

const MassageBox = ({ nickname, profileImg }) => {
  console.log(nickname);

  const [chat, setChat] = useState({ name: "", message: "" });

  const buttonHandler = useCallback(() => {
    const time = moment().format("YY-MM-DD HH:mm:ss");
    socket.emit("send message", {
      nickname: nickname,
      message: chat.message,
      createdAt: time,
    });
    //버튼을 클릭했을 때 send message이벤트 발생
  }, [chat]);

  console.log(chat);

  const changeMessage = useCallback(
    (e) => {
      setChat({ message: e.target.value });
    },

    [chat]
  );

  // const changeButton = (e) => {
  //   const { value } = e.target;
  //   setChat(value);
  // };
  const time = moment().format("HH:mm");

  return (
    <>
      <MassageBoxWrap>
        <InputBox>
          <InputText
            onChange={changeMessage}
            placeholder={"# 에게 메시지 보내기"}
            onKeyPress={(e) => {
              if (e.key === "Enter") buttonHandler();
            }}
          ></InputText>
          <IconBox>
            <IconBoxItem style={{ background: `${chat ? "#007a5a" : ""}` }}>
              <Button
                margin="0 5px 0 0"
                padding="0 1px 0 3px"
                style={{
                  border: "none",
                  background: `${chat ? "#007a5a" : ""}`,
                }}
                disabled={!chat}
                onClick={buttonHandler}
              >
                <IoSend
                  size={16}
                  style={{ color: `${chat ? "white" : "#b7b7b7"}` }}
                />
              </Button>
              <VerticalLine></VerticalLine>
              <Button
                style={{
                  border: "none",
                  background: `${chat ? "#007a5a" : ""}`,
                  color: `${chat ? "white" : "#b7b7b7"}`,
                }}
              >
                <RiArrowDropDownLine size={18} />
              </Button>
            </IconBoxItem>
          </IconBox>
        </InputBox>
      </MassageBoxWrap>
    </>
  );
};
const MassageBoxWrap = styled.div`
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

export default MassageBox;
