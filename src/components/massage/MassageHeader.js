import React from "react";
import styled from "styled-components";
import { Image } from "../../elements/index";

const MassageHeader = () => {
  return (
    <>
      <MsgHeaderWrap>
        <MsgHeaderTextbox>
          <ChatUser>
            <Image size="22" />
            <ChannelName>홍길동</ChannelName>
          </ChatUser>
        </MsgHeaderTextbox>
      </MsgHeaderWrap>
    </>
  );
};

const MsgHeaderWrap = styled.div`
  height: 49px;
  display: flex;
  padding: 10px 16px 10px 20px;
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  cursor: pointer;
`;

const MsgHeaderTextbox = styled.div`
  display: flex;
  flex: 1 1 0;
  font-size: 16px;
  font-weight: 700;
  align-items: center;
`;

const ChatUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: rgba(221, 221, 221, 0.3);
  }
  border-radius: 4px;
  padding: 5px 5px;
`;

const ChannelName = styled.div`
  padding: 0px 0px 0px 10px;
`;

export default MassageHeader;
