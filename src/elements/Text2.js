import React from "react";
import styled from "styled-components";

const Text2 = (props) => {
  const { bold, color, size, children, textIndent, _onClick } = props;
  const styles = { bold, color, size, textIndent, _onClick };
  return (
    <React.Fragment>
      <Textbox {...styles}>{children}</Textbox>
    </React.Fragment>
  );
};

Text.defaultProps = {
  bold: false,
  color: "#222831",
  size: "16px",
  textIndent: false,
  _onClick: () => {},
};
//텍스트박스:color, font-size, bold value 지정 가능
const Textbox = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
  text-indent: ${(props) => props.textIndent};
`;

export default Text2;
