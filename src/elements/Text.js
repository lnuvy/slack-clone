import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, ...styles } = props;

  return <TagP {...styles}>{children}</TagP>;
};

const TagP = styled.p`
  ${({ size }) => (size ? `font-size: ${size};` : `font-size: 18px;`)};
  ${({ color }) => (color ? `color: ${color};` : `color: #485460;`)}
  ${({ fontWeight }) =>
    fontWeight ? `font-weight: ${fontWeight};` : `font-weight: false;`}
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")}
`;

export default Text;
