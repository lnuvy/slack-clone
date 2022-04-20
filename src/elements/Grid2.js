import React from "react";
import styled from "styled-components";

const Grid2 = (props) => {
  const {
    is_flex,
    margin_left,
    fixed,
    width,
    padding,
    margin,
    bg,
    top,
    onscroll,
    children,
    _onClick,
    align_self,
  } = props;

  const styles = {
    is_flex,
    margin_left,
    fixed,
    width,
    padding,
    margin,
    bg,
    top,
    onscroll,
    _onClick,
  };
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick} align_self={align_self}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid2.defaultProps = {
  children: null,
  is_flex: false,
  fixed: false,
  margin_left: false,
  _onClick: () => {},
  width: "100%",
  padding: false,
  margin: false,
  top: false,
  bg: false,
  align_self: false,
};
//그리드
//width, padding, margin, bg-color, is_flex(가로정렬), margin_left(왼쪽 오토 마진) value지정 가능
const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding:${props.padding}` : "")}
  ${(props) => (props.margin ? `margin:${props.margin}` : "")}
  ${(props) => (props.bg ? `background-color:${props.bg}` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content:space-between ;`
      : ""}
  ${(props) =>
    props.fixed
      ? `
      position: fixed; 
      top:0px; width:100%; 
      margin:20px;`
      : ""}
`;

export default Grid2;
