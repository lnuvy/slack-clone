import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { BsPlus } from "react-icons/bs";

import { Image } from "../../elements/index";

const MassageList = () => {
  return (
    <>
      <ListWrap>
        <GridMenu>다이렉트 메시지</GridMenu>
        <UserWarp
          onClick={() => {
            history.replace("/main/dm");
          }}
        >
          <Image shape="ProfileImg" size="20" />
          <span style={{ margin: "4px" }}>홍길동</span>
        </UserWarp>
        <UserWarp
          onClick={() => {
            history.replace("/main/dm");
          }}
        >
          <Image shape="ProfileImg" size="20" />
          <span style={{ margin: "4px" }}>이름</span>
        </UserWarp>
        <UserAdd onClick={() => {}}>
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
          팀원 추가
        </UserAdd>
      </ListWrap>
    </>
  );
};

const ListWrap = styled.div`
  // margin: 15px 5px;
  text-align: left;
`;

const GridMenu = styled.div`
  height: 26px;
  padding: 5px 12px 5px 15px;
  width: 100%;
  margin: 10px 0px;
`;

const UserWarp = styled.div`
  cursor: pointer;
  display: flex;
  height: 26px;
  width: 100%;
  padding: 15px 12px 15px 15px;
  // margin: 5px -4px;
  align-items: center;
  &:hover {
    background: #340c35;
  }
`;

const UserAdd = styled.div`
  width: 100%;
  padding: 1px 12px 3px 15px;
  cursor: pointer;
  &:hover {
    background: #340c35;
  }
  display: flex;
  align-items: center;
`;

export default MassageList;
