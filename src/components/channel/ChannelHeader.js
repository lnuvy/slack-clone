import React, { useState } from "react";
import styled from "styled-components";
import { ModalPortal, Modal } from "../../shared/modal/portals";

const ChannelHeader = () => {
  const [modalOn, setModalOn] = useState(false);

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <>
      {/* 채널 헤더의 타이틀을 눌렀을때 나오는 모달창 */}
      <ModalPortal>
        {modalOn && (
          <Modal onClose={handleModal}>
            <ChannelInfo>안녕하세요</ChannelInfo>
          </Modal>
        )}
      </ModalPortal>

      <ChannelHeaderWrap>
        <ChatHeaderTextbox onClick={handleModal}># 홍길동2</ChatHeaderTextbox>

        <ModalBtn width="50px" height=""></ModalBtn>
      </ChannelHeaderWrap>
    </>
  );
};

const ChannelHeaderWrap = styled.div`
  height: 49px;
  display: flex;
  padding: 10px 16px 10px 20px;
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  cursor: pointer;
`;

const ChatHeaderTextbox = styled.div`
  display: flex;
  flex: 1 1 0;
  font-size: 16px;
  font-weight: 700;
  align-items: center;
`;

const ChannelName = styled.div`
  &:hover {
    background: rgba(221, 221, 221, 0.3);
  }
  border-radius: 4px;
  padding: 5px 10px;
`;

const ModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0;
  height: 30px;
  width: 30px;
  cursor: pointer;
  --saf-0: rgba(var(--sk_foreground_max, 29, 28, 29), 0.13);
  box-shadow: 0 0 0 1px var(--saf-0);
  border-radius: 4px;
  color: rgba(var(--sk_foreground_max, 29, 28, 29), 7);
  &:hover {
    background: rgba(221, 221, 221, 0.3);
  }
`;

//
// 아래부터 한울 작업
const ChannelInfo = styled.div`
  display: flex;
  border-radius: 12px;
  background: rgba(255, 255, 255, 1);
  padding: 16px 20px;
  margin: 16px 28px;
`;

export default ChannelHeader;
