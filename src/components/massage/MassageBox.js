import React from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";

const MassageBox = ({ chat, onChangeChat, placeholder, onSubmitForm }) => {
  return (
    <>
      <MassageBoxWrap>
        <InputBox>
          <InputText
            onChange={onChangeChat}
            value={chat}
            placeholder={placeholder || `# 에게 메시지 보내기`}
          ></InputText>
          <IconBox>
            <IconBoxItem>
              <IoSend style={{ color: "#b7b7b7" }} />
            </IconBoxItem>
          </IconBox>
        </InputBox>
      </MassageBoxWrap>
    </>
  );
};
const MassageBoxWrap = styled.div`
  width: 100%;
`;
const InputBox = styled.div`
  border: 1px solid rgba(29, 28, 29, 0.3);
  border-radius: 4px;
  height: 79px;
  display: grid;
  margin: 0px 20px 0 20px;
  grid-template-rows: 35px 44px;
`;
const InputText = styled.input`
  margin: 0 15px;
  width: 95%;
  border: none;
`;

const IconBox = styled.div`
  position: relative;
  right: 13px;
  top: 10px;
`;
const IconBoxItem = styled.div`
  float: right;
  padding: 0px 5px;
  &:hover {
    background: rgba(221, 221, 221, 0.3);
  }
`;

export default MassageBox;
