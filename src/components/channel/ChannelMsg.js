import moment from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "../Dropdown";
import { history } from "../../redux/configureStore";

import { Image, Text } from "../../elements/index";
import OneChat from "./OneChat";

const ChannelMsg = (props) => {
  // ChannelPage 에서 받은 채널 정보의 contentList
  const { contentList } = props?.nowChannel || [];

  console.log("리덕스컨텐츠:", contentList);
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
  // 여기 높이를 좀 줄이니까 메인 스크롤바가 안생기네요
  height: calc(100vh - 190px);
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
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  & > div {
    display: flex;
  }
`;

export default ChannelMsg;
