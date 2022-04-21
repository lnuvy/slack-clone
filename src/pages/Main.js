import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

import NavigationBar from "../components/NavigationBar";
import ChannelList from "../components/channel/ChannelList";
// import ChannelList from "../components/channel/ChannelList";
import MassageList from "../components/massage/MassageList";
import ChannelPage from "./ChannelPage";
import MessagePage from "./MessagePage";
import MainIndex from "./MainIndex";
import ChannelComment from "../components/channel/comment/ChannelComment";

import { MdOutlineLayers } from "react-icons/md";
import { history } from "../redux/configureStore";
import RoomPage from "./RoomPage";

// export const socket = io("localhost:5001");
// export const socket = io.connect("ws://52.78.246.163:80");

const Main = () => {
  return (
    <>
      <NavigationBar />
      <MainWrap>
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
                    history.push("/");
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
            <Route path="/" exact component={MainIndex} />
            <Route path="/channel/:channelId" exact component={ChannelPage} />
            <Route
              path="/channel/:channelId/:contentId"
              exact
              component={ChannelComment}
            />
            <Route path="/dm/room/:roomName" exact component={MessagePage} />
            <Route path="/dm/room" exact component={RoomPage} />
          </Switch>
        </ChatsWrap>
      </MainWrap>
    </>
  );
};

const MainWrap = styled.div`
  display: flex;
  height: calc(100vh - 44px);
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
