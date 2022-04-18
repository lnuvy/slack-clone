import moment from "moment";
import React, { useState } from "react";
import styled from "styled-components";

import { Image, Text } from "../../elements/index";
import OneChat from "./OneChat";

const ChannelMsg = (props) => {
  // ChannelPage 에서 받은 채널 정보의 contentList
  const { contentList } = props?.nowChannel || [];

  return (
    <>
      <ChatListWrap>
        <ChatListBox>
          {/* 새로고침 시에 에러나지 않게 막아놨습니다 */}
          {contentList ? (
            contentList.map((c, i) => {
              return <OneChat key={c.contentId} {...c} />;
            })
          ) : (
            // 여긴 덕행님이 작성해두신 기본 뷰입니다
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
        </ChatListBox>
      </ChatListWrap>
    </>
  );
};

const ChatListWrap = styled.div`
  height: 76vh;
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

  & p {
    font-size: 15px;
    display: inline;
  }
  & span {
    font-size: 12px;
    margin: 0px 5px;
    color: gray;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  font-size: 15px;
`;

export default ChannelMsg;
