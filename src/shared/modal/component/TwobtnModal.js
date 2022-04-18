import React from "react";
import styled from "styled-components";
import { ModalPortal } from "../portals";
import { IoCloseOutline } from "react-icons/io5";
import { Button, Text } from "../../../elements";
import { useDispatch } from "react-redux";

const TwobtnModal = ({ children, onClose, title, btnText, onSubmit }) => {
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
          <Title>
            <h1 style={{ fontSize: "28px" }}>{title}</h1>
          </Title>
          <CancelBtn
            className="flex-row"
            onClick={() => {
              onClose();
            }}
          >
            <IoCloseOutline size={24} />
          </CancelBtn>
          <ModalBody>{children}</ModalBody>

          {/* footer 버튼크기 조절을 어떻게 해야할지 잘 모르겠네유... */}
          <ModalFooter>
            <div style={{ marginLeft: "auto", display: "flex" }}>
              <Button
                width="80px"
                height="36px"
                fontSize="15px"
                margin="0 12px 0 0"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                취소
              </Button>
              <Button
                padding="0 12px 1px"
                width="fit-content"
                height="36px"
                fontSize="15px"
                bg="#007a5a"
                color="white"
                onClick={(e) => {
                  e.stopPropagation();
                  onSubmit();
                }}
              >
                {btnText}
              </Button>
            </div>
          </ModalFooter>
        </Content>
      </Background>
    </ModalPortal>
  );
};

const Title = styled.div`
  display: flex;
  align-items: center;
  min-height: 70px;
  padding: 20px 28px;
  width: 100%;
`;

const CancelBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;

  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
`;

const ModalBody = styled.div`
  padding: 0 28px;
`;

const ModalFooter = styled.div`
  display: flex;

  align-items: center;
  flex-shrink: 0;
  padding: 24px 28px;
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
  justify-content: start;
  z-index: 205;
  height: 518px;
  max-width: 520px;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;

  position: relative;
  overflow: scroll;
`;

export default TwobtnModal;
