import React, { useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ChannelList from "./ChannelList";
import ChannelPage from "../../pages/ChannelPage";
import { channelActions } from "../../redux/modules/channel";
import { useParams } from "react-router-dom";
import { Image, Text } from "../../elements/index";
import moment from "moment";
import { history } from "../../redux/configureStore";

const ChannelComment = (props) => {
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(channelActions.getChannelDB());
  //   }, []);

  const { channelName } = props.match?.params;

  const contentId = useParams().contentId;

  const channel = useSelector((state) => state.channel.channelList);
  console.log(channel);

  // 여기서 데이터를 정리해서 props로 주는게 더 깔끔할거같아서 일단 이렇게 했습니다
  const channelList = useSelector((state) => state.channel.channelList);
  console.log(channelList);
  // filter 로 똑같은 채널이름을 검사했을때 무조건 하나만 나오므로 뒤에 [0]을 붙였습니다
  const nowChannel =
    channelList.filter((c) => c.channelName === channelName)[0] || [];
  console.log(nowChannel);

  const contentList = nowChannel.contentList;
  console.log(contentList);

  const nowContent =
    contentList.filter((c) => c.contentId === contentId)[0] || [];
  console.log(nowContent);

  const commentList = nowContent.commentList;
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
                  </ChatListBoxInfo>
                );
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
