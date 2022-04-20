import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
import { Image, Text } from "../../../elements";
import { useDispatch, useSelector } from "react-redux";
import { commentActions } from "../../../redux/modules/comment";
import { BsXLg } from "react-icons/bs";
import { ModalPortal } from "../../../shared/modal/portals";
import TwobtnModal from "../../../shared/modal/component/TwobtnModal";

const OneComment = (props) => {
  const dispatch = useDispatch();

  const {
    contentId,
    profileImg,
    nickname,
    createdAt,
    channelId,
    comment,
    commentId,
  } = props;

  const userInfo = useSelector((state) => state.user.user);

  const [hoverUDIcon, sethoverUDIcon] = useState(false);

  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const deleteComment = () => {
    dispatch(commentActions.deleteCommentDB(channelId, contentId, commentId));
  };

  const time = moment(createdAt).format("HH:mm");
  // 삭제 모달때 보여지는 시간정보
  const deleteKo = moment(createdAt).calendar();

  return (
    <>
      <ChatListBoxInfo
        onMouseEnter={() => sethoverUDIcon(true)}
        onMouseLeave={() => sethoverUDIcon(false)}
      >
        <ChatListUserImageWrap>
          <Image
            shape="ProfileImg"
            src={
              profileImg ||
              "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
            }
            margin="4px"
          />
        </ChatListUserImageWrap>
        <ChatListUserInfo>
          <NicknameBox>
            <p>{nickname}</p>
            <span>{time}</span>
          </NicknameBox>
          <div style={{ fontSize: "15px" }}>{comment}</div>
        </ChatListUserInfo>
        <div
          className="flex-row"
          style={{
            justifyContent: "end",
            width: "100%",
            paddingRight: "10px",
          }}
        >
          {hoverUDIcon && userInfo.nickname === nickname && (
            <IconBox>
              <BsXLg onClick={handleModal} />
            </IconBox>
          )}
        </div>
      </ChatListBoxInfo>
      <ModalPortal>
        {modalOn && (
          <TwobtnModal
            onClose={handleModal}
            title="메시지 삭제"
            btnText="삭제"
            btnColor="#e01e5a"
            onSubmit={deleteComment}
          >
            <p
              style={{
                paddingRight: "53px",
                marginBottom: "15px",
                fontSize: "15px",
              }}
            >
              이 메세지를 삭제하시겠습니까? 이 작업은 실행 취소할 수 없습니다.
            </p>
            <ModalPreview>
              <ChatListUserImageWrap>
                <Image
                  shape="ProfileImg"
                  src={
                    profileImg ||
                    "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
                  }
                  margin="4px"
                />
              </ChatListUserImageWrap>
              <ModalCommentUser>
                <div className="flex-row" style={{ justifyContent: "start" }}>
                  <Text fontWeight="700" color="black" size="15px">
                    {nickname}
                  </Text>
                  <span>{deleteKo}</span>
                </div>
                <div>{comment}</div>
              </ModalCommentUser>
            </ModalPreview>
          </TwobtnModal>
        )}
      </ModalPortal>
    </>
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
  /* & > Image {
    shape: ProfileImg;
    src: {
      profileImg ||
      "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png"
    } */
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

// 삭제 모달 관련 CSS
const ModalPreview = styled.div`
  margin-top: 10px;
  display: flex;
  border: 1px solid rgba(29, 28, 29, 0.3);
  border-radius: 4px;

  padding: 8px 20px;
  flex-direction: rows;
  &:hover {
    background: rgba(221, 221, 221, 0.2);
  }
`;

const ModalCommentUser = styled.div`
  width: 100%;
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  & > div {
    display: flex;
    font-size: 15px;
  }
  & > div > span {
    font-size: 12px;
    display: flex;
    color: gray;
    margin-left: 4px;
  }
`;

export default OneComment;
