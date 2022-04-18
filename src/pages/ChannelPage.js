import React from "react";
import styled from "styled-components";

import ChannelHeader from "../components/channel/ChannelHeader";
import ChannelMsgBox from "../components/channel/ChannelMsgBox";
import ChannelMsg from "../components/channel/ChannelMsg";
import { useSelector } from "react-redux";

const ChannelPage = (props) => {
  // 주소창에서 파라미터값을 받아오기
  const { channelName } = props.match?.params;
  console.log(channelName);

  // 여기서 데이터를 정리해서 props로 주는게 더 깔끔할거같아서 일단 이렇게 했습니다
  const channelList = useSelector((state) => state.channel.channelList);

  // filter 로 똑같은 채널이름을 검사했을때 무조건 하나만 나오므로 뒤에 [0]을 붙였습니다
  const nowChannel =
    channelList.filter((c) => c.channelName === channelName)[0] || [];
  console.log(nowChannel);

  return (
    <>
      <ChannelsWrap>
        <ChannelHeader title={channelName} />
        <ChannelMsg nowChannel={nowChannel} />
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

export default ChannelPage;
