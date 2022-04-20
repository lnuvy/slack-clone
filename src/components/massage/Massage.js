import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Image, Text } from "../../elements/index";

import OneMassage from "./OneMassage";

import { useSelector } from "react-redux";
//소켓
import { socket } from "../../pages/MessagePage";

const Massage = (nickname, profileImg) => {
  const [chatArr, setChatArr] = useState([]);
  // console.log(profileImg);
  // const userProfileImg = profileImg;
  // console.log(userProfileImg);
  console.log(nickname);
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("receive message", (message) => {
      console.log(message);
      setChatArr((chatArr) => chatArr.concat(message));
    }); //receive message이벤트에 대한 콜백을 등록해줌
  }, []);

  // 스크롤
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatArr]);

  return (
    <>
      <ChatListWrap>
        <ChatListBox>
          {chatArr ? (
            chatArr.map((ele, idx) => <OneMassage key={idx} {...ele} />)
          ) : (
            <ChatListBoxInfo>
              <ChatListUserImageWrap>
                <Image shape="ProfileImg" />
              </ChatListUserImageWrap>
              <ChatListUserInfo>
                <Text fontWeight="700" color="black">
                  홍길동
                </Text>
                <span>12:00</span>
                <div>내용</div>
              </ChatListUserInfo>
            </ChatListBoxInfo>
          )}
          <div ref={messagesEndRef} />
        </ChatListBox>
      </ChatListWrap>
    </>
  );
};

const ChatListWrap = styled.div`
  // 여기 높이를 좀 줄이니까 메인 스크롤바가 안생기네요
  height: 73vh;
  padding: 8px 0px;
  flex-direction: rows;
  overflow-y: scroll;
`;
const ChatListBox = styled.div`
  margin-bottom: 16px;
`;
const ChatListBoxInfo = styled.div`
  display: flex;
  padding: 8px 20px;
  flex-direction: rows;
  &:hover {
    background: rgba(221, 221, 221, 0.2);
  }
  cursor: pointer;
  min-height: 100px;
`;
const ChatListUserImageWrap = styled.div`
  display: flex;
`;

const ChatListUserInfo = styled.div`
  margin-left: 10px;
  & > span {
    font-size: 12px;
    margin: 0px 5px;
    color: gray;
  }
  & > div {
    display: flex;
    font-size: 15px;
  }
`;

export default Massage;
