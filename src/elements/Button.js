import React from "react";
import styled from "styled-components";

const Button = (props) => {
  // styles 에 오는것들 : width, height, bold, borderColor, bg, color, weight, padding, margin
  const { children, onClick, disabled = false, ...styles } = props;

  return (
    <DefaultBtn onClick={onClick} disabled={disabled} {...styles}>
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
    ${({ bg }) =>
      bg
        ? `box-shadow: 0 1px 4px rgb(0 0 0 / 30%);`
        : "background: rgba(248, 248, 248, 0.2);"}
  }

  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "100%;")};
  ${({ bg }) => (bg ? `background: ${bg};` : "background: white;")};
  ${({ color }) => (color ? `color: ${color};` : "color: black;")}
  ${({ weight }) => (weight ? `font-weight: ${weight};` : "font-weight: 400;")}
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
  ${({ fontSize }) => (fontSize ? `font-size: ${fontSize};` : null)};
`;

export default Button;
