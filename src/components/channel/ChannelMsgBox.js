import React, { useState } from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Button } from "../../elements";
import { useDispatch } from "react-redux";
import { contentActions } from "../../redux/modules/content";
const ChannelMsgBox = ({ title, channelId }) => {
  const dispatch = useDispatch();
  const [chat, setChat] = useState("");
  const submitChat = () => {
    dispatch(contentActions.addContentDB(channelId, title, chat));
    setChat("");
  };
  return (
    <>
      <ChannelMsgBoxWrap>
        <InputBox>
          <InputText
            onChange={(e) => {
              const { value } = e.target;
              setChat(value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") submitChat();
            }}
            value={chat}
            placeholder={`# ${title}에 메세지 보내기`}
          ></InputText>
          <IconBox>
            <IconBoxItem style={{ background: `${chat ? "#007A5A" : ""}` }}>
              <Button
                margin="0 5px 0 0"
                padding="0 1px 0 3px"
                style={{
                  border: "none",
                  background: `${chat ? "#007A5A" : ""}`,
                }}
                disabled={!chat}
                onClick={submitChat}
              >
                <IoSend
                  size={16}
                  style={{ color: `${chat ? "white" : "#B7B7B7"}` }}
                />
              </Button>
              <VerticalLine></VerticalLine>
              <Button
                style={{
                  border: "none",
                  background: `${chat ? "#007A5A" : ""}`,
                  color: `${chat ? "white" : "#B7B7B7"}`,
                }}
              >
                <RiArrowDropDownLine size={18} />
              </Button>
            </IconBoxItem>
          </IconBox>
        </InputBox>
      </ChannelMsgBoxWrap>
    </>
  );
};
const ChannelMsgBoxWrap = styled.div`
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
  outline: none;
`;
const IconBox = styled.div`
  position: relative;
  right: 13px;
  top: 10px;
`;
const IconBoxItem = styled.div`
  float: right;
  padding: 0px 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  &:hover {
    background: rgba(221, 221, 221, 0.3);
  }
`;
const VerticalLine = styled.div`
  width: 1px;
  background: rgba(221, 221, 221, 0.3);
  content: "";
  position: absolute;
  height: 18px;
  right: 24px;
`;
export default ChannelMsgBox;
