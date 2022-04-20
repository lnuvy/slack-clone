import React from "react";
import styled from "styled-components";

const LoginButton = (props) => {
  // styles 에 오는것들 : width, height, bold, borderColor, bg, color, weight, padding, margin
  const { children, onClick, ...styles } = props;

  return (
    <LoginBtn onClick={onClick} {...styles}>
      {children}
    </LoginBtn>
  );
};

const LoginBtn = styled.button`
  cursor: pointer;
  font-size: 18px;
  // min-width: 96px;
  border-radius: 4px;
  &:hover {
    box-shadow: 0 1px 4px rgb(0 0 0 / 30%);
    opacity: 0.9;
  }

  max-width: ${({ width }) => (width ? `${width};` : `400px;`)};
  width: 100%;
  height: ${({ height }) => (height ? `${height};` : "44px;")};
  ${({ borderColor }) =>
    borderColor ? `border: 2px solid ${borderColor};` : "border: none;"};
  ${({ bg, borderColor }) =>
    borderColor
      ? bg
        ? `background: ${bg};`
        : "background: white;"
      : "background: #4a154b;"};
  ${({ color, borderColor }) =>
    borderColor
      ? color
        ? `color: ${color};`
        : "color: black;"
      : "color: white;"}
  ${({ weight }) => (weight ? `font-weight: ${weight};` : "font-weight: 700;")}
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
`;

export default LoginButton;
