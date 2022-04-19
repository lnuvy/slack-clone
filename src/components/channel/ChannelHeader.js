import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ModalPortal, Modal } from "../../shared/modal/portals";
import { Text } from "../../elements";
import Tooltip from "../../shared/Tooltip";
import { useSelector } from "react-redux";

const ChannelHeader = ({ nowChannel }) => {
  const { channelName, channelId } = nowChannel;

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
          <Modal data={nowChannel} onClose={handleModal}>
            <ChannelInfo>
              <div
                className="flex-row"
                style={{ justifyContent: "space-between", width: "100%" }}
              >
                <Text size="15px" fontWeight="700">
                  채널 이름
                </Text>
                <TagP>편집</TagP>
              </div>
              <Text size="15px"># {channelName}</Text>
            </ChannelInfo>
          </Modal>
        )}
      </ModalPortal>

      <ChannelHeaderWrap>
        <ChatHeaderTextbox onClick={handleModal}>
          <Tooltip message="채널 세부정보 받기">
            <ChannelName># {channelName}</ChannelName>
          </Tooltip>
        </ChatHeaderTextbox>
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
    background: rgba(29, 28, 29, 0.13);
  }
`;

//
// 아래부터 한울 작업
const ChannelInfo = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 12px;
  border: 1px solid rgba(29, 28, 29, 0.13);
  background: rgba(255, 255, 255, 1);
  width: 100%;
  padding: 16px 20px;
  &:hover {
    background: #f8f8f8;
  }
`;

const TagP = styled.p`
  font-weight: 600;
  text-align: end;
  color: #1264a3;
  font-size: 13px;
  &:hover {
    text-decoration: underline;
    color: #0b4c8c;
  }
`;

export default ChannelHeader;
