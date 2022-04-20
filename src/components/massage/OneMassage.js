import React from "react";
import styled from "styled-components";
import { Image, Text } from "../../elements/index";
import moment from "moment";
import "moment/locale/ko";

const OneMassage = (props) => {
  const { name, message, profileImg } = props;
  console.log(props);
  // console.log(profileImg.profileImg.profileImg);
  const time = moment().format("HH:mm");

  // const userProfileImg = profileImg.profileImg.profileImg;

  return (
    <div>
      <ChatListBoxInfo>
        <ChatListUserImageWrap>
          <Image
            shape="ProfileImg"
            // src={
            //   userProfileImg ||
            //   "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
            // }
          />
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
  text-align: start;
`;
const ChatListUserImageWrap = styled.div`
  display: flex;
`;

const ChatListUserInfo = styled.div`
  margin-left: 10px;
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
