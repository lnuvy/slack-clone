import moment from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "../Dropdown";
import { history } from "../../redux/configureStore";

import { Image, Text } from "../../elements/index";
import OneChat from "./OneChat";

const ChannelMsg = (props) => {
  // ChannelPage 에서 받은 채널 정보의 contentList
  const { contentList } = props?.nowChannel || [];
  console.log(contentList);

  const [hoverComment, setHoverComment] = useState(true);

  // const handleComment = () => {
  //   setHoverComment(true);
  // };

  return (
    <>
      <ChatListWrap>
        <ChatListBox>
          {/* 새로고침 시에 에러나지 않게 막아놨습니다 */}
          {contentList ? (
            contentList.map((c, i) => {
              const time = moment(c.createdAt).format("HH:mm");
              return (
                <ChatListBoxInfo key={c.contentId}>
                  <ChatListUserImageWrap>
                    <Image
                      shape="ProfileImg"
                      src={
                        c.profileImg ||
                        "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
                      }
                      margin="4px"
                    />
                  </ChatListUserImageWrap>
                  <ChatListUserInfo>
                    <NicknameBox>
                      <p>{c.nickname}</p>
                      <span>{time}</span>
                    </NicknameBox>
                    <div>{c.content}</div>
                    <CommentBox
                      onClick={() => {
                        // 여기에서 해당 채널에 대한 뷰를 변경해줍니다
                        history.push(
                          `/main/channel/${c.channelName}/${c.contentId}`
                        );
                      }}
                      onMouseEnter={() => setHoverComment(false)}
                      onMouseLeave={() => setHoverComment(true)}
                    >
                      <Image
                        shape="ProfileImg"
                        src={
                          c.profileImg ||
                          "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
                        }
                        size="24"
                        margin="0px 4px 0px 0px"
                      />

                      {hoverComment ? (
                        <p>{c.commentList.length}개의 답글</p>
                      ) : (
                        <p>
                          {c.commentList.length}개의 답글{" "}
                          <span>스레드 보기</span>
                        </p>
                      )}
                    </CommentBox>
                  </ChatListUserInfo>
                </ChatListBoxInfo>
              );
              return <OneChat key={c.contentId} {...c} />;
            })
          ) : (
            // 여긴 덕행님이 작성해두신 기본 뷰입니다
            <ChatListBoxInfo>
              <ChatListUserImageWrap>
                <Image shape="ProfileImg" />
              </ChatListUserImageWrap>
              <ChatListUserInfo>
                <Text fontWeight="700" color="black">
                  홍길동
                </Text>
                <span>12:00</span>
                <div>내용</div>
              </ChatListUserInfo>
            </ChatListBoxInfo>
          )}
        </ChatListBox>
      </ChatListWrap>
    </>
  );
};

const ChatListWrap = styled.div`
  height: 76vh;
  padding: 8px 0px;
  flex-direction: rows;
  overflow-y: scroll;
`;
const ChatListBox = styled.div`
  margin-bottom: 16px;
`;
const ChatListBoxInfo = styled.div`
  display: flex;
  padding: 8px 20px;
  flex-direction: rows;
  &:hover {
    background: rgba(221, 221, 221, 0.2);
  }
  cursor: pointer;
  min-height: 100px;
`;
const ChatListUserImageWrap = styled.div`
  display: flex;
  // align-items: center;
  & > Image {
    shape: ProfileImg;
    src: {
      c.profileImg ||
      "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
    }
`;

const ChatListUserInfo = styled.div`
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  & > div {
    display: flex;
  }
`;

const NicknameBox = styled.div`
  align-items: center;
  & > p {
    font-size: 15px;
    float: left;
    display: flex;
    font-weight: 700;
  }
  & > span {
    font-size: 12px;
    display: flex;
    color: gray;
    margin-left: 4px;
  }
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  width: 50vw;
  margin: 6px 0px 0px;
  padding: 5px 5px 5px 5px;
  border-radius: 4px;
  &:hover {
    background: #fff;
    border: 1px solid rgba(29, 28, 29, 0.3);
  }
  & > p {
    font-size: 14px;
    display: inline;
    float: left;
    font-weight: 600;
    color: #1264a3;
  }

  & > p > span {
    font-size: 14px;
    color: gray;
    font-weight: 500;
    margin-left: 4px;
  }
  cursor: pointer;
`;

export default ChannelMsg;
