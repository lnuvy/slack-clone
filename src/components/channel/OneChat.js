import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Button, Image, Text } from "../../elements";
import { useDispatch } from "react-redux";
import { contentActions } from "../../redux/modules/content";
import { history } from "../../redux/configureStore";

const OneChat = (props) => {
  const dispatch = useDispatch();

  const {
    contentId,
    profileImg,
    nickname,
    isEdit,
    createdAt,
    content,
    channelName,
    commentList,
    channelId,
  } = props;

  // useEffect(() => {}, [commentList]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editText, setEditText] = useState(content);

  const [hoverComment, setHoverComment] = useState(true);

  const editChat = () => {
    dispatch(
      contentActions.editContentDB(channelId, channelName, contentId, editText)
    );
    setIsEditMode(false);
  };

  const time = moment(createdAt).format("HH:mm");

  if (isEditMode) {
    return (
      <EditBox>
        <EditImage>
          <Image
            shape="ProfileImg"
            src={
              profileImg ||
              "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
            }
          />
        </EditImage>
        <InputBox>
          <InputText
            onChange={(e) => {
              const { value } = e.target;
              setEditText(value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") editChat();
            }}
            value={editText}
            placeholder="메시지 편집"
          />
          <div className="flex-row" style={{ justifyContent: "end" }}>
            <Button
              width="56px"
              height="28px"
              fontSize="13px"
              margin="5px 8px 5px 0"
              onClick={() => setIsEditMode(false)}
            >
              취소
            </Button>
            <Button
              width="56px"
              height="28px"
              bg="#007a5a"
              color="#fff"
              fontSize="13px"
              margin="5px 8px 5px 0"
              onClick={editChat}
            >
              저장
            </Button>
          </div>
        </InputBox>
      </EditBox>
    );
  } else
    return (
      <ChatListBoxInfo>
        <ChatListUserImageWrap>
          <Image
            shape="ProfileImg"
            src={
              profileImg ||
              "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
            }
          />
        </ChatListUserImageWrap>
        <ChatListUserInfo>
          <div className="flex-row" style={{ justifyContent: "start" }}>
            <Text fontWeight="700" color="black">
              {nickname}
            </Text>
            <span>{time}</span>
          </div>

          <ContentWrap>
            {content}&nbsp;
            <Text fontWeight="400" color="#696969">
              {isEdit && "(편집됨)"}
            </Text>
          </ContentWrap>
          {commentList?.length && (
            <>
              <CommentBox
                onClick={() => {
                  // 여기에서 해당 채널에 대한 뷰를 변경해줍니다
                  history.push(`/channel/${channelName}/${contentId}`);
                }}
                onMouseEnter={() => setHoverComment(false)}
                onMouseLeave={() => setHoverComment(true)}
              >
                <Image
                  shape="ProfileImg"
                  src={
                    profileImg ||
                    "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
                  }
                  size="24"
                  margin="0px 4px 0px 0px"
                />
                {hoverComment ? (
                  <p>{commentList?.length}개의 답글</p>
                ) : (
                  <p>
                    {commentList?.length}개의 답글 <span>스레드 보기</span>
                  </p>
                )}
              </CommentBox>
            </>
          )}

          <button
            onClick={() => {
              dispatch(contentActions.deleteContentDB(channelId, contentId));
            }}
          >
            삭제
          </button>
          <button
            onClick={() => {
              console.log("수정");
              setIsEditMode(true);
            }}
          >
            수정
          </button>
        </ChatListUserInfo>
      </ChatListBoxInfo>
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
  // align-items: center;
`;

const ChatListUserInfo = styled.div`
  margin-left: 10px;

  & p {
    font-size: 15px;
    display: inline;
  }
  & span {
    font-size: 12px;
    margin: 0px 5px;
    color: gray;
  }
`;
const ContentWrap = styled.div`
  display: flex;
  font-size: 15px;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  width: 50vw;
  margin: 6px 0px 0px;
  padding: 5px 5px 5px 5px;
  border-radius: 4px;
  border: 1px solid transparent;
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

// 편집모드
const EditBox = styled.div`
  display: flex;
  padding: 8px 20px;
  flex-direction: rows;
  background-color: #fcf4da;
`;

const EditImage = styled.div`
  display: flex;
`;

const InputBox = styled.div`
  border: 1px solid rgba(29, 28, 29, 0.3);
  border-radius: 4px;
  height: 79px;
  display: grid;
  margin: 0px 20px 0 20px;
  grid-template-rows: 35px 44px;
  width: 100%;
  background: #ffffff;
`;

const InputText = styled.input`
  margin: 0 15px;
  width: 95%;
  border: none;
  outline: none;
  background: #fff;
`;

export default OneChat;
