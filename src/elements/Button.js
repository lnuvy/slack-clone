import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { children, onClick, ...styles } = props;

  return (
    <DefaultBtn onClick={onClick} {...styles}>
      {children}
    </DefaultBtn>
  );
};

const DefaultBtn = styled.button`
  cursor: pointer;
  font-size: 18px;
  // min-width: 96px;
  border-radius: 4px;
  &:hover {
    box-shadow: 0 1px 4px rgb(0 0 0 / 30%);
    // rgba로 바꿔서 색깔만 투명도주는걸로 바꾸는게 좋을듯
    opacity: 0.9;
  }

  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "44px;")};
  ${({ borderColor }) =>
    borderColor ? `border: 2px solid ${borderColor};` : "border: none;"}
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

export default Button;
