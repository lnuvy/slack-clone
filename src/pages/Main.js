import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import styled from "styled-components";

import NavigationBar from "../components/NavigationBar";
import ChannelList from "../components/channel/ChannelList";
// import ChannelList from "../components/channel/ChannelList";
import MassageList from "../components/massage/MassageList";
import ChannelPage from "./ChannelPage";
import MessagePage from "./MessagePage";
import MainIndex from "./MainIndex";

import { MdOutlineLayers } from "react-icons/md";
import { history } from "../redux/configureStore";

// 처음 로그인 했을때, 주된 컨텐츠가 되는 부분 (슬랙에서 Slack Connect 부분)
const Main = () => {
  return (
    <>
      <NavigationBar />
      <MainWrap>
        {/* 화면넓이가 500px 이하일때 사이드바 없애기*/}
        <ChannelsWrap className="res-none">
          <Title>Slack</Title>
          <MenuScroll>
            <div>
              <SlackConnect>
                <MdOutlineLayers
                  style={{
                    transform: "rotate(90deg)",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    margin: "0px 4px 0px 0px",
                  }}
                />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push("/main");
                  }}
                >
                  Slack Connect
                </span>
              </SlackConnect>
              <ChannelList />
              <MassageList />
            </div>
          </MenuScroll>
        </ChannelsWrap>
        <ChatsWrap>
          <Switch>
            {/* 한울: Slack Connect 를 보여줄 라우터가 필요해보여서 page 추가했습니다 */}
            <Route path={["/main", "/"]} exact component={MainIndex} />
            {/* 해당 채널을 특정하기위해 파라미터를 넘겨줍니다 */}
            <Route
              path="/main/channel/:channelName"
              exact
              component={ChannelPage}
            />
            <Route path="/main/dm" exact component={MessagePage} />
          </Switch>
        </ChatsWrap>
      </MainWrap>
    </>
  );
};

const MainWrap = styled.div`
  display: flex;
  flex: 1;
`;

const ChannelsWrap = styled.nav`
  max-width: 260px;
  width: 100%;
  min-width: 200px;
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
  overflow: hidden;
  padding: 0 54px 0 16px;
  margin: 0;
  color: white;
  cursor: pointer;
`;

const SlackConnect = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  margin-top: 10px;
  padding: 5px 15px;
  &:hover {
    background: #340c35;
  }
`;

const MenuScroll = styled.div`
  height: calc(100vh - 38px);
  overflow-y: auto;
`;

const ChatsWrap = styled.div`
  flex: 1;
`;
export default Main;
