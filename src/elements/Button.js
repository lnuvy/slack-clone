import React from "react";
import styled from "styled-components";

const Button = (props) => {
  // styles 에 오는것들 : width, height, bold, borderColor, bg, color, weight, padding, margin
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
  border: 1px solid rgba(29, 28, 29, 0.3);

  &:hover {
    background: rgba(248, 248, 248, 0.2);
  }

  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "100%;")};
  ${({ bg }) => (bg ? `background: ${bg};` : "background: white;")};
  ${({ color }) => (color ? `color: ${color};` : "color: black;")}
  ${({ weight }) => (weight ? `font-weight: ${weight};` : "font-weight: 400;")}
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
`;

export default Button;
