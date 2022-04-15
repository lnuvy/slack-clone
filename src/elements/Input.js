import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    type = "text",
    children,
    onChange,
    id,
    placeholder,
    ...styles
  } = props;

  return (
    <TagInput
      type={type}
      placeholder={placeholder}
      id={id}
      onChange={onChange}
      {...styles}
    />
  );
};

const TagInput = styled.input`
  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "44px;")};
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
  border-radius: 4px;
  border: 1px solid rgba(29, 28, 29, 0.3);
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px #1264a3, 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
  text-align: ${({ text_align }) => (text_align ? `${text_align};` : "false")};
  background-color: ${({ bg }) => (bg ? `${bg};` : "false")};
  // opacity: ${({ opacity }) => (opacity ? `${opacity};` : "false")};
`;

export default Input;
