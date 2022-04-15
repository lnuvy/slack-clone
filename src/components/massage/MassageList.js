import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

import { Image } from "../../elements/index";

const MassageList = () => {
  return (
    <>
      <ListWrap>
        <GridMenu>
          {/* <button></button> */}
          <span>다이렉트 메시지</span>
        </GridMenu>
        <UserWarp
          onClick={() => {
            history.replace("/main/dm");
          }}
        >
          <Image shape="ProfileImg" size="20" />
          <span style={{ margin: "4px" }}>홍길동</span>
        </UserWarp>
      </ListWrap>
    </>
  );
};

// export const CollapseButton = styled.button`
//   background: transparent;
//   border: none;
//   width: 28px;
//   height: 28px;
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   margin-left: 10px;
//   cursor: pointer;
// `;

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

export default MassageList;
