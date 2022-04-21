import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Image, Text } from "../../elements/index";

import OneMassage from "./OneMassage";

const Massage = ({ messages, nickname }) => {
  console.log(messages, nickname);
  return (
    <>
      <ChatListWrap>
        <ChatListBox>
          {messages.map((m, i) => (
            <OneMassage key={i} {...m} nickname={nickname} />
          ))}
          {/* <ChatListBoxInfo>
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
             </ChatListBoxInfo> */}
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
