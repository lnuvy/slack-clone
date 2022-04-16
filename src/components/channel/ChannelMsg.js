import React from "react";
import styled from "styled-components";

import { Image, Text } from "../../elements/index";

const ChannelMsg = () => {
  return (
    <>
      <ChatListWrap>
        <ChatListBox>
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
        </ChatListBox>
      </ChatListWrap>
    </>
  );
};

const ChatListWrap = styled.div`
  height: 100vh;
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
`;
const ChatListUserImageWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ChatListUserInfo = styled.div`
  margin-left: 10px;
  & > p {
    font-size: 15px;
    display: inline;
  }
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

export default ChannelMsg;
