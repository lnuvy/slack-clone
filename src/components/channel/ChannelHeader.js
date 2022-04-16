import React from "react";
import styled from "styled-components";
import { Image } from "../../elements/index";

const ChannelHeader = (props) => {
  return (
    <>
      <ChannelHeaderWrap>
        <ChatHeaderTextbox>
          <ChannelName># 채널 1</ChannelName>
        </ChatHeaderTextbox>
        <ModalBtn width="50px">
          <Image size="22" />
        </ModalBtn>
      </ChannelHeaderWrap>
    </>
  );
};

const ChannelHeaderWrap = styled.div`
  height: 49px;
  display: flex;
  padding: 10px 16px 10px 20px;
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  cursor: pointer;
`;

const ChatHeaderTextbox = styled.div`
  display: flex;
  flex: 1 1 0;
  font-size: 16px;
  font-weight: 700;
  align-items: center;
`;

const ChannelName = styled.div`
  &:hover {
    background: rgba(221, 221, 221, 0.3);
  }
  border-radius: 4px;
  padding: 5px 10px;
`;

const ModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0;
  height: 30px;
  width: 30px;
  cursor: pointer;
  --saf-0: rgba(var(--sk_foreground_max, 29, 28, 29), 0.13);
  box-shadow: 0 0 0 1px var(--saf-0);
  border-radius: 4px;
  color: rgba(var(--sk_foreground_max, 29, 28, 29), 7);
  &:hover {
    background: rgba(221, 221, 221, 0.3);
  }
`;

export default ChannelHeader;
