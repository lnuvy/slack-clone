import React from "react";
import styled from "styled-components";

const Button2 = (props) => {
  const {
    text,
    _onClick,
    is_float,
    is_delete,
    children,
    margin,
    width,
    padding,
    border,
    right,
  } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }
  if (is_delete) {
    return (
      <React.Fragment>
        <DeleteButton onClick={_onClick}>{text ? text : children}</DeleteButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    border: border,
    right: right,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button2.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
  border: false,
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #ffe05d;
  color: #212121;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: #525e75 solid 1px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.right ? `float: right` : "")}
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #ffe05d;
  color: #525e75;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: #525e75;
  border-radius: 50px;
`;

const DeleteButton = styled.button`
  width: 40px;
  height: 20px;
  background-color: #ffe05d;
  color: #525e75;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 800;
  position: fixed;
  bottom: 50vh;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: #525e75;
  border-radius: 50x;
`;

export default Button2;
