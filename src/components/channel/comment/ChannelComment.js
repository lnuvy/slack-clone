import React, { useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Image, Text } from "../../../elements";
import moment from "moment";
import { history } from "../../../redux/configureStore";
import CommentBox from "./CommentBox";
import { channelActions } from "../../../redux/modules/channel";
import { commentActions } from "../../../redux/modules/comment";
import { contentActions } from "../../../redux/modules/content";
// import {CommentBox}

const ChannelComment = (props) => {
  const dispatch = useDispatch();

  const { channelName } = props.match?.params;

  const contentId = useParams().contentId;

  // const nowContent = useSelector((state) => state?.comment || []);
  const channelList = useSelector((state) => state?.channel.channelList || []);
  // console.log(channelList);

  useEffect(() => {
    // dispatch(channelActions.getChannel());
    // dispatch(contentActions.getContentList(channelName));
    dispatch(commentActions.getCommentList(channelName, contentId));
  }, []);

  // 클릭한 Content 입니다.
  const nowContent =
    channelList
      .filter((c) => c.channelName === channelName)[0]
      .contentList.filter((c) => c.contentId === contentId)[0] || [];
  console.log(nowContent);

  // 클릭한 Content의 Comment List입니다.
  const commentList = channelList
    .filter((c) => c.channelName === channelName)[0]
    .contentList.filter((c) => c.contentId === contentId)[0].commentList;

  // const commentList = nowContent.commentList;
  console.log(commentList);

  const time = moment(nowContent.createdAt).format("M월 DD일, HH:MM");
  console.log(time);

  return (
    <>
      <CommentWrap>
        <CommentHeaderWrap>
          <ChatHeaderTextbox>
            스레드
            <ChannelName>#{nowContent.channelName}</ChannelName>
          </ChatHeaderTextbox>
          <BsXLg
            style={{ color: "gray", fontSize: "15px" }}
            onClick={() => {
              history.push(`/channel/${nowContent.channelName}`);
            }}
          />
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
                <div>{nowContent.content}</div>
              </ChatListUserInfo>
            </ChatListBoxInfo>
            <CommentCount>
              <p>{commentList.length}개의 답글</p>
              <hr />
            </CommentCount>

            {commentList ? (
              commentList.map((c, i) => {
                const time = moment(c.createdAt).format("HH:mm");
                return (
                  <ChatListBoxInfo key={c.commentId}>
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
                      <div>{c.comment}</div>
                    </ChatListUserInfo>
                    <BsXLg
                      style={{
                        color: "gray",
                        fontSize: "15px",
                        display: "flex",
                        float: "right",
                      }}
                      onClick={() => {
                        dispatch(
                          commentActions.deleteCommentDB(
                            channelName,
                            contentId,
                            c.commentId
                          )
                        );
                      }}
                    />
                  </ChatListBoxInfo>
                );
              })
            ) : (
              // 여긴 덕행님이 작성해두신 기본 뷰입니다
              <ChatListBoxInfo>
                <ChatListUserImageWrap>
                  <Image
                    shape="ProfileImg"
                    src={
                      "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
                    }
                    margin="4px"
                  />
                </ChatListUserImageWrap>
                <ChatListUserInfo>
                  <NicknameBox>
                    <p>홍길동</p>
                    <span>{time}</span>
                  </NicknameBox>
                  <div>댓글 입니다.</div>
                </ChatListUserInfo>
              </ChatListBoxInfo>
            )}
            <CommentBox
              channelName={nowContent.channelName}
              contentId={nowContent.contentId}
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

// const

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
