import React from "react";
import styled from "styled-components";
import { Image, Text } from "../../elements/index";
import moment from "moment";
import "moment/locale/ko";
import { useSelector } from "react-redux";

const OneMassage = (props) => {
  const { name, message } = props;

  const { nickname } = useSelector((state) => state.user.user);
  const isMe = nickname === name;

  const time = moment().format("HH:mm");
  console.log(isMe);

  if (isMe) {
    return (
      <div>
        <ChatListBoxInfo style={{ justifyContent: "end" }}>
          <ChatListUserInfo>
            <span>{time}</span>
            <Text fontWeight="700" color="black">
              {name}
            </Text>

            <div>{message}</div>
          </ChatListUserInfo>
          <ChatListUserImageWrap>
            <Image shape="ProfileImg" />
          </ChatListUserImageWrap>
        </ChatListBoxInfo>
      </div>
    );
  } else
    return (
      <div>
        <ChatListBoxInfo>
          <ChatListUserImageWrap>
            <Image shape="ProfileImg" />
          </ChatListUserImageWrap>
          <ChatListUserInfo>
            <Text fontWeight="700" color="black">
              {name}
            </Text>
            <span>{time}</span>
            <div>{message}</div>
          </ChatListUserInfo>
        </ChatListBoxInfo>
      </div>
    );
};

const ChatListBoxInfo = styled.div`
  display: flex;
  padding: 8px 20px;
  flex-direction: rows;
  &:hover {
    background: rgba(221, 221, 221, 0.2);
  }
  cursor: pointer;
`;
const ChatListUserImageWrap = styled.div`
  display: flex;
  /* align-items: center; */
`;

const ChatListUserInfo = styled.div`
  margin-left: 10px;
  text-align: start;
  & > p {
    font-size: 15px;
    display: inline;
  }
  & > span {
    font-size: 12px;
    margin: 0px 5px;
    color: gray;
  }
  & > div {
    display: flex;
    font-size: 15px;
  }
`;

export default OneMassage;
