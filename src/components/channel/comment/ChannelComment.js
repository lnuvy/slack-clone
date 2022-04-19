import React, { useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Image, Text } from "../../../elements";
import moment from "moment";
import { history } from "../../../redux/configureStore";
import CommentBox from "./CommentBox";
import { commentActions } from "../../../redux/modules/comment";
import OneComment from "./OneComment";

const ChannelComment = (props) => {
  const dispatch = useDispatch();

  const { channelId, contentId } = props.match?.params;

  useEffect(() => {
    dispatch(commentActions.getCommentList(channelId, contentId));
  }, [contentId]);

  const nowContent = useSelector((state) => state.comment.oneContent);
  console.log(nowContent);

  const commentList = nowContent.commentList;

  const time = moment(nowContent.createdAt).format("M월 DD일, HH:MM");

  const isEdit = nowContent.isEdit;

  return (
    <>
      <CommentWrap>
        <CommentHeaderWrap>
          <ChatHeaderTextbox>
            스레드
            <ChannelName>#{nowContent.channelName}</ChannelName>
          </ChatHeaderTextbox>
          <IconBox>
            <BsXLg
              style={{ color: "gray", fontSize: "15px" }}
              onClick={() => {
                history.push(`/channel/${nowContent.channelId}`);
              }}
            />
          </IconBox>
        </CommentHeaderWrap>
        <ChatListWrap>
          <ChatListBox>
            <ChatListBoxInfo>
              <ChatListUserImageWrap>
                <Image
                  shape="ProfileImg"
                  src={
                    nowContent.profileImg ||
                    "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
                  }
                  margin="4px"
                />
              </ChatListUserImageWrap>
              <ChatListUserInfo>
                <NicknameBox>
                  <p>{nowContent.nickname}</p>
                  <span>{time}</span>
                </NicknameBox>
                <div>
                  {nowContent.content}&nbsp;
                  <Text fontWeight="400" color="#696969" size="15px">
                    {isEdit && "(편집됨)"}
                  </Text>
                </div>
              </ChatListUserInfo>
            </ChatListBoxInfo>
            <CommentCount>
              <p>{commentList?.length}개의 답글</p>
              <hr />
            </CommentCount>
            {commentList ? (
              commentList.map((c, i) => {
                return <OneComment key={i} {...c} channelId={channelId} />;
              })
            ) : (
              // 여긴 덕행님이 작성해두신 기본 뷰입니다
              <ChatListBoxInfo>
                <ChatListUserImageWrap>
                  <Image shape="ProfileImg" margin="4px" />
                </ChatListUserImageWrap>
                <ChatListUserInfo>
                  <NicknameBox>
                    <p>홍길동</p>
                    <span>12:00</span>
                  </NicknameBox>
                  <div>댓글 입니다.</div>
                </ChatListUserInfo>
              </ChatListBoxInfo>
            )}
            <CommentBox
              channelId={nowContent?.channelId}
              contentId={nowContent?.contentId}
            />
          </ChatListBox>
        </ChatListWrap>
      </CommentWrap>
    </>
  );
};

const CommentWrap = styled.div`
  width: 100%;
  // 여기 고치니까 아래쪽 괜찮아지네요
  height: calc(100vh - 44px);
  display: flex;
  flex-direction: column;
`;

const CommentHeaderWrap = styled.div`
  height: 49px;
  display: flex;
  padding: 10px 16px 10px 20px;
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  cursor: pointer;
  align-items: center;
`;

const ChatHeaderTextbox = styled.div`
  width: 100%;
  display: flex;
  flex: 1 1 0;
  font-size: 16px;
  font-weight: 700;
  align-items: center;
`;

const ChannelName = styled.div`
  font-size: 12px;
  color: gray;
  margin-left: 10px;
  font-weight: 500;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  border-radius: 4px;
  border: none;
  outline: none;
  padding: 5px;
  color: gray;
  fontsize: 15px;
  &:hover {
    background: rgba(29, 28, 29, 0.1);
  }
`;

const ChatListWrap = styled.div`
  height: 100vh;
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
`;
const ChatListUserImageWrap = styled.div`
  display: flex;
  // align-items: center;
  /* & > Image {
    shape: ProfileImg;
    src: {
      profileImg ||
      "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
    } */
`;

const ChatListUserInfo = styled.div`
  width: 100%;
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

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 30px 5px 14px;
  & > p {
    font-size: 12px;
    color: gray;
    margin-left: 10px;
    font-weight: 500;
  }
  & > hr {
    flex: auto;
    border: none;
    height: 1px;
    background: rgba(29, 28, 29, 0.3);
    margin-left: 10px;
  }
`;

export default ChannelComment;
