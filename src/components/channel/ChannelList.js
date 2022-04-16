import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { chaccelActions } from "../../redux/modules/channel";
// import Channel from "./Channel";

const ChannelList = (props) => {
  const dispatch = useDispatch();
  const channel = useSelector((state) => state.channel.channel_list);
  console.log(channel);
  const channel_list = Object.keys(channel);
  console.log(channel_list);

  React.useEffect(() => {
    dispatch(chaccelActions.getChannelDB());
  }, []);

  return (
    <>
      <ListWrap>
        <GridMenu>채널</GridMenu>
        <ChannelWarp>
          {channel.map((channel, i) => {
            console.log(channel);
            console.log(Object.keys(channel));
            return (
              <Channnal
                key={i}
                {...channel}
                onClick={() => {
                  history.push("/main/channel");
                }}
              >
                <span style={{ margin: "0px 5px" }}>
                  # {Object.keys(channel)}
                </span>
              </Channnal>
            );
          })}
          <ChannnalAdd onClick={() => {}}>
            <BsPlus
              style={{
                color: "white",
                background: "rgb(80 37 80)",
                fontSize: "20px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                margin: "1px 7px 0px 4px",
              }}
            />
            채널 추가
          </ChannnalAdd>
        </ChannelWarp>
      </ListWrap>
    </>
  );
};

const ListWrap = styled.div`
  text-align: left;
  width: 100%;
`;

const GridMenu = styled.div`
  height: 26px;
  padding: 17px 12px 17px 15px;
  width: 100%;
  margin: 0px 0px 10px 0px;
`;

const ChannelWarp = styled.div`
  flex-direction: column;
  cursor: pointer;
  display: flex;
  width: 100%;
`;

const ChannnalAdd = styled.p`
  width: 100%;
  padding: 4px 12px 4px 15px;
  cursor: pointer;
  &:hover {
    background: #340c35;
  }
  display: flex;
  align-items: center;
`;

const Channnal = styled.span`
  width: 100%;
  padding: 4px 12px 4px 15px;
  cursor: pointer;
  &:hover {
    background-color: #340c35;
  }
`;

export default ChannelList;
