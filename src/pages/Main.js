import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import styled from "styled-components";

import NavigationBar from "../components/NavigationBar";
import ChannelList from "../components/channel/ChannelList";
// import ChannelList from "../components/channel/ChannelList";
import MassageList from "../components/massage/MassageList";
import Channel from "./Channel";
import MessagePage from "./MessagePage";
import { BrowserRouter } from "react-router-dom";

// 처음 로그인 했을때, 주된 컨텐츠가 되는 부분 (슬랙에서 Slack Connect 부분)
const Main = () => {
  return (
    <>
      <NavigationBar />
      <MainWrap>
        <ChannelsWrap>
          <Title>Slack</Title>
          <MenuScroll>
            <ChannelList />
            <MassageList />
          </MenuScroll>
        </ChannelsWrap>
        <ChatsWrap>
          <Switch>
            <Route path="/main/channel" exact component={Channel} />
            <Route path="/main/dm" exact component={MessagePage} />
          </Switch>
        </ChatsWrap>
      </MainWrap>
    </>
  );
};

const MainWrap = styled.div`
  display: flex;
  // flex: 1;
`;

const ChannelsWrap = styled.nav`
  width: 260px;
  display: inline-flex;
  flex-direction: column;
  background: #3f0e40;
  color: rgb(188, 171, 188);
  vertical-align: top;
`;

const Title = styled.button`
  width: 100%;
  height: 49px;
  text-align: left;
  border: none;
  border-top: 1px solid rgb(82, 38, 83);
  border-bottom: 1px solid rgb(82, 38, 83);
  font-weight: 500;
  font-size: 18px;
  background: transparent;
  // text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 54px 0 16px;
  margin: 0;
  color: white;
  cursor: pointer;
`;

const MenuScroll = styled.div`
  height: calc(100vh - 38px);
  // overflow-y: auto;
`;

const ChatsWrap = styled.div`
  flex: 1;
`;
export default Main;
