import React, { useState } from "react";
import ModalPortal from "./ModalPortal";
import styled from "styled-components";

import { IoCloseOutline, IoCallOutline } from "react-icons/io5";
import { BsStar } from "react-icons/bs";
import { HiOutlineBell } from "react-icons/hi";
import { Button, Text } from "../../../elements";
import OnebtnModal from "../component/OnebtnModal";

// onClose= 모달을 닫는 함수, title= 모달 최상단의 타이틀, children= 모달의 내용(각각 커스텀)
const Modal = ({ onClose, title, children }) => {
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <>
      {/* 모달 안에 모달 넣기 */}
      <ModalPortal>
        {modalOn && (
          <OnebtnModal onClose={handleModal}>
            안녕하세요 이중 모달입니다
          </OnebtnModal>
        )}
      </ModalPortal>

      <ModalPortal>
        {/* 백그라운드는 모달 뒤의 기존 뷰들을 의미합니다 */}
        <Background
          className="flex-row"
          onClick={(e) => {
            e.stopPropagation();
            console.log("배경눌러도 닫혀라!");
            onClose();
          }}
        >
          <Content
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* 여기부터 실제 모달에 보여지는 컨텐츠 들입니다 */}
            <TopDiv>
              <TitleWrap className="flex-row">
                <div style={{ width: "100%", justifyContent: "start" }}>
                  <h1
                    style={{
                      textAlign: "left",
                      fontSize: "22px",
                      lineHeight: "1.36365",
                    }}
                  >
                    {title || "# 모달제목"}
                  </h1>
                </div>
                <CancelBtn
                  className="flex-row"
                  onClick={() => {
                    console.log("닫아!");
                    onClose();
                  }}
                >
                  <IoCloseOutline size={24} />
                </CancelBtn>
              </TitleWrap>
              <ButtonDiv>
                <Button width="40px" height="28px" margin="0 8px 0 0">
                  <BsStar size={15} />
                </Button>
                <Button height="28px" width="110px" margin="0 8px 0 0">
                  <div className="flex-row">
                    <HiOutlineBell size={15} />
                    <Text size="15px">알림 활성화</Text>
                  </div>
                </Button>
                <Button height="28px" width="98px" margin="0 8px 0 0">
                  <div className="flex-row">
                    <IoCallOutline size={15} />
                    <Text size="15px">통화 시작</Text>
                  </div>
                </Button>
              </ButtonDiv>
            </TopDiv>

            {/* 여기부터 상단 제목을 제외한 모달의 내용 */}
            <MiddleContent onClick={handleModal}>{children}</MiddleContent>
          </Content>
        </Background>
      </ModalPortal>
    </>
  );
};

const TopDiv = styled.div`
  height: 104px;
`;

const TitleWrap = styled.div`
  min-height: 0;
  padding-bottom: 0;
  padding: 20px 28px 0;
`;

const CancelBtn = styled.div`
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;

  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
`;

const ButtonDiv = styled.div`
  align-items: center;
  display: flex;
  margin: 12px 0 8px 28px;
`;

const MiddleContent = styled.div`
  height: calc(100% - 104px);
  background: rgba(29, 28, 29, 0.13);
`;

// 한울: 백그라운드랑 컨텐츠는 앞으로 모달에서 공통속성이라 가독성을 위해 가장 아래로 내렸습니다
const Background = styled.div`
  z-index: 205;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  z-index: 204;
  height: min(85vh, 820px);
  max-width: 580px;
  width: 80%;
  border-radius: 8px;
  background-color: #fff;

  position: relative;
  overflow: scroll;
`;

export default Modal;
