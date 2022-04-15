import React from "react";
import styled from "styled-components";

import ChannelHeader from "../components/channel/ChannelHeader";
import ChannelMsgBox from "../components/channel/ChannelMsgBox";
import ChannelChat from "../components/channel/ChannelChat";

const Channel = () => {
  return (
    <>
      <ChannelsWrap>
        <ChannelHeader />
        <ChannelChat />
        <ChannelMsgBox />
      </ChannelsWrap>
    </>
  );
};

const ChannelsWrap = styled.div`
  width: 100%;
  height: calc(100vh - 38px);
  display: flex;
  flex-direction: column;
`;

export default Channel;
