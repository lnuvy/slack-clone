import React from "react";
import styled from "styled-components";
import { ModalPortal } from "../portals";

const OnebtnModal = ({ children, onClose }) => {
  return (
    <ModalPortal>
      <Background
        className="flex-row"
        onClick={(e) => {
          e.stopPropagation();
          console.log("배경눌러도 닫혀라!");
          onClose();
        }}
      >
        <Content>{children}</Content>
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
  z-index: 205;
  height: min(60vh, 400px);
  max-width: 580px;
  width: 40%;
  border-radius: 8px;
  background-color: #fff;

  position: relative;
  overflow: scroll;
`;

export default OnebtnModal;
