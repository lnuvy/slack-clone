import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const Tooltip = ({ children, message }) => {
  return (
    <Container>
      {children}
      <Content className="tooltip">{message}</Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  &:hover > .tooltip,
  &:hover > .tooltip::after {
    display: block;
  }
`;

const Content = styled.div`
  width: fit-content;
  font-size: 13px;
  background: black;
  color: white;
  display: none;
  position: absolute;
  z-index: 200;
  padding: 5px 8px;
  border-radius: 8px;
`;

export default Tooltip;
