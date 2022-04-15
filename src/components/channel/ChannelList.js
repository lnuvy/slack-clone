import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

const ChannelList = () => {
  return (
    <>
      <ListWrap>
        <GridMenu>
          {/* <button></button> */}
          <span>채널</span>
        </GridMenu>

        <UserWarp
          onClick={() => {
            history.push("/main/channel");
          }}
        >
          <span style={{ margin: "4px" }}># 홍길동</span>
        </UserWarp>
      </ListWrap>
    </>
  );
};

const ListWrap = styled.div`
  margin: 15px 5px;
`;

const GridMenu = styled.div`
  display: flex;
  align-items: center;
  height: 26px;
  padding: 0 12px 0 15px;
  width: 100%;
  margin-bottom: 5px;
`;

const UserWarp = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 26px;
  padding: 0 12px 0 15px;
  width: 100%;
`;

export default ChannelList;
