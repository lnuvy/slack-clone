import React from "react";
import styled from "styled-components";
import Massage from "../components/massage/Massage";
import MassageBox from "../components/massage/MassageBox";
import MassageHeader from "../components/massage/MassageHeader";

const MessagePage = (props) => {
  const { dmId } = props.match.params;

  return (
    <>
      <MessagePageWrap>
        <MassageHeader />
        <Massage />
        <MassageBox />
      </MessagePageWrap>
    </>
  );
};

const MessagePageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 63px);
  display: flex;
  flex-direction: column;
`;

export default MessagePage;
