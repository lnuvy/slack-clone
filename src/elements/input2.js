import React from "react";
import styled from "styled-components";

// import { Text, Grid } from "./index";
import Text2 from "./Text2";
import Grid2 from "./Grid2";

const Input2 = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    keyUp,
    keyPress,
    chatName,
  } = props;
  //플레이스홀더, 라벨속성 지정가능, onChange:_onChange로 지정
  if (multiLine) {
    return (
      <Grid2>
        {label && <Text2 margin="0px">{label}</Text2>}
        <ElTextarea
          rows={10}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid2>
    );
  }

  if (chatName) {
    return (
      <Grid2>
        <ElChatName placeholder={placeholder} onChange={_onChange} />
      </Grid2>
    );
  }

  return (
    <React.Fragment>
      <Grid2>
        {label && <Text2 margin="0px">{label}</Text2>}
        <ElInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          onKeyUp={keyUp}
          onKeyPress={keyPress}
        />
      </Grid2>
    </React.Fragment>
  );
};

Input2.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  _onChange: () => {},
  keyUp: () => {},
  keyPress: () => {},
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElChatName = styled.input`
  border: 1px solid #212121;
  width: 100px;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input2;
