import React from "react";
import styled from "styled-components";
import { ModalPortal } from "../portals";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "../../../elements";

const LogoutModal = ({ onClose, onSubmit, children }) => {
  return (
    <ModalPortal>
      <Background
        className="flex-row"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Content
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
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
                  Slack 에서 로구아웃
                </h1>
              </div>
              <CancelBtn
                className="flex-row"
                onClick={() => {
                  onClose();
                }}
              >
                <IoCloseOutline size={24} />
              </CancelBtn>
            </TitleWrap>
          </TopDiv>
          <ModalBody>{children}</ModalBody>
        </Content>
      </Background>
    </ModalPortal>
  );
};

const TopDiv = styled.div`
  height: 70px;
`;

const ModalBody = styled.div`
  padding: 16px 28px;
  margin: 0;
  height: calc(100% - 104px);
  background: #f8f8f8;
`;

const TitleWrap = styled.div`
  min-height: 0;
  padding-bottom: 0;
  padding: 20px 20px 0;
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

const Background = styled.div`
  z-index: 206;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  z-index: 205;
  height: 280px;
  max-width: 420px;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;

  position: relative;
  overflow: scroll;
`;

export default LogoutModal;
