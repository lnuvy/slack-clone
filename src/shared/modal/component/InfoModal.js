import React from "react";
import styled from "styled-components";
import { ModalPortal } from "../portals";

const InfoModal = ({ onClose }) => {
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
          // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h1>
            죄송합니다! 이 기능은 <br />
            구현되지 않았습니다!
          </h1>
        </Content>
      </Background>
    </ModalPortal>
  );
};

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
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 205;
  height: 280px;
  max-width: 420px;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;

  position: relative;
  overflow: scroll;
`;

export default InfoModal;
