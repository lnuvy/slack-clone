import React, { useEffect } from "react";
import styled from "styled-components";

import ChannelHeader from "../components/channel/ChannelHeader";
import ChannelMsgBox from "../components/channel/ChannelMsgBox";
import ChannelMsg from "../components/channel/ChannelMsg";
import { useDispatch, useSelector } from "react-redux";
import { contentActions } from "../redux/modules/content";
import ChannelComment from "../components/channel/comment/ChannelComment";
import { channelActions } from "../redux/modules/channel";
import { history } from "../redux/configureStore";

const ChannelPage = (props) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(channelActions.getChannelDB())
  // }, [])
  const { channelId } = props.match?.params;

  // 여기서 데이터를 정리해서 props로 주는게 더 깔끔할거같아서 일단 이렇게 했습니다
  const oneChannel = useSelector((state) => state.channel.channelList).find(
    (l) => l.channelId === channelId
  );

  useEffect(() => {
    dispatch(contentActions.getContentList(channelId));
  }, [oneChannel]);

  // const contentRedux = useSelector((state) => state.content.oneChannel);
  // 주소창에서 파라미터값을 받아오기

  return (
    <>
      <ChannelsWrap>
        <ChannelHeader nowChannel={oneChannel || []} />
        <ChannelMsg nowChannel={oneChannel || []} />
        <ChannelMsgBox channelId={channelId} title={oneChannel?.channelName} />
      </ChannelsWrap>
    </>
  );
};

const ChannelsWrap = styled.div`
  width: 100%;
  height: calc(100vh - 44px);
  display: flex;
  flex-direction: column;
`;

export default ChannelPage;
