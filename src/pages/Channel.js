import React from "react";
import styled from "styled-components";

import ChannelHeader from "../components/channel/ChannelHeader";
import ChannelMsgBox from "../components/channel/ChannelMsgBox";
import ChannelMsg from "../components/channel/ChannelMsg";

const Channel = () => {
  return (
    <>
      <ChannelsWrap>
        <ChannelHeader />
        <ChannelMsg />
        <ChannelMsgBox />
      </ChannelsWrap>
    </>
  );
};

const ChannelsWrap = styled.div`
  width: 100%;
  height: calc(100vh - 10px);
  display: flex;
  flex-direction: column;
`;

export default Channel;
