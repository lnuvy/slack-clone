import React from "react";
import styled from "styled-components";
import { Button } from "../../elements";

const ChannelHeader = () => {
  return (
    <>
      <ChannelHeaderWrap>
        <ChatHeaderTextbox># 홍길동</ChatHeaderTextbox>
        <Wrap>
          <ModalBtn width="50px" height=""></ModalBtn>
        </Wrap>
      </ChannelHeaderWrap>
    </>
  );
};

const ChannelHeaderWrap = styled.div`
  // z-index: 202;
  height: 49px;
  display: flex;
  // box-shadow: 0 1px 0 0 var(--saf-0);
  // flex-shrink: 0;
  // box-sizing: inherit;
  padding: 10px 16px 10px 20px;
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  cursor: pointer;
`;

const ChatHeaderTextbox = styled.div`
  display: flex;
  flex: 1 1 0;
  // align-items: baseline;
  font-size: 16px;
  // line-height: 2.5;
  font-weight: 700;
  align-items: center;
`;

const Wrap = styled.div`
  // display: flex;
  // flex: 0 0 1;
  // margin-left: auto
  // align-items: center;
  // z-index: 0;
`;

const ModalBtn = styled.button`
  background: none;
  border: 0;
  height: 30px;
  width: 44px;
  cursor: pointer;
  --saf-0: rgba(var(--sk_foreground_max, 29, 28, 29), 0.13);
  box-shadow: 0 0 0 1px var(--saf-0);
  border-radius: 4px;
  color: rgba(var(--sk_foreground_max, 29, 28, 29), 7);
`;

export default ChannelHeader;
