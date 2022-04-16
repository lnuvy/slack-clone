import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { BsPlus } from "react-icons/bs";

const ChannelList = () => {
  return (
    <>
      <ListWrap>
        <GridMenu>
          <span>채널</span>
        </GridMenu>
        <ChannelWarp>
          <Channnal
            onClick={() => {
              history.push("/main/channel");
            }}
          >
            <p style={{ margin: "0px 5px" }}># 채널 1</p>
          </Channnal>
          <Channnal
            onClick={() => {
              history.push("/main/channel");
            }}
          >
            <p style={{ margin: "0px 5px" }}># 채널 2</p>
          </Channnal>
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
            <p>채널 추가</p>
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

const Channnal = styled.span`
  width: 100%;
  padding: 4px 12px 4px 15px;
  cursor: pointer;
  &:hover {
    background-color: #340c35;
  }
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

export default ChannelList;
