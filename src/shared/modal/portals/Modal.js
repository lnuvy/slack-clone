import React, { useState } from "react";
import ModalPortal from "./ModalPortal";
import styled from "styled-components";
import moment from "moment";
import { IoCloseOutline, IoCallOutline } from "react-icons/io5";
import { BsStar } from "react-icons/bs";
import { HiOutlineBell } from "react-icons/hi";
import { Button, Input, Text } from "../../../elements";
import TwobtnModal from "../component/TwobtnModal";
import InfoModal from "../component/InfoModal";
import { useDispatch, useSelector } from "react-redux";
import { channelActions } from "../../../redux/modules/channel";

// 채널 이름 수정 , 채널 나가기 에서 사용되는 모달입니다
const Modal = ({ onClose, data, children }) => {
  const dispatch = useDispatch();
  const channel = useSelector((state) => state.channel.channelList);
  const { channelId, channelName, createdAt, channelHost } = data;

  // 채널 이름 변경 input
  const [changeName, setChangeName] = useState(channelName);

  const handleChange = (e) => {
    const { value } = e.target;
    setChangeName(value);
  };

  // 변경사항 저장 버튼 누를때 실행되는 함수
  const handleSubmit = () => {
    // 채널명 중복인지 검사 (백 연결되면 필요없을거같음) (지울때 17번라인도 지우면 좋을거같습니다)
    const validCheck = channel.find((l) => l.channelName === changeName);
    if (validCheck) {
      alert("이미 존재하는 채널명입니다!");
      return;
    }
    dispatch(channelActions.editChannelNameDB(channelId, changeName));
    onClose();
  };

  const [modalOn, setModalOn] = useState(false);
  // 주제 눌렀을때 나오는 모달
  const [infoModal, setInfoModal] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const handleInfoModal = () => {
    setInfoModal(!infoModal);
  };

  return (
    <>
      <ModalPortal>
        {/* 백그라운드는 모달 뒤의 기존 뷰들을 의미합니다 */}
        <Background
          className="flex-row"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <Content
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* 여기부터 실제 모달에 보여지는 컨텐츠 들입니다 */}
            <TopDiv>
              <TitleWrap className="flex-row">
                <div style={{ width: "100%", justifyContent: "start" }}>
                  <h1
                    style={{
                      textAlign: "left",
                      fontSize: "22px",
                      lineHeight: "1.36365",
                    }}
                  >
                    {`# ${channelName}`}
                  </h1>
                </div>
                <CancelBtn
                  className="flex-row"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <IoCloseOutline size={24} />
                </CancelBtn>
              </TitleWrap>

              <ButtonDiv>
                <Button width="40px" height="28px" margin="0 8px 0 0">
                  <BsStar size={15} />
                </Button>
                <Button height="28px" width="110px" margin="0 8px 0 0">
                  <div className="flex-row">
                    <HiOutlineBell size={15} />
                    <Text size="15px">알림 활성화</Text>
                  </div>
                </Button>
                <Button height="28px" width="98px" margin="0 8px 0 0">
                  <div className="flex-row">
                    <IoCallOutline size={15} />
                    <Text size="15px">통화 시작</Text>
                  </div>
                </Button>
              </ButtonDiv>
            </TopDiv>

            {/* 여기부터 상단 제목을 제외한 모달의 내용 */}
            <ModalBody>
              <MiddleContent onClick={handleModal}>{children}</MiddleContent>

              {/* 만든 사람이랑 채널나가기 부분 */}
              <DescriptionInfo onClick={handleInfoModal}>
                <div
                  className="flex-row"
                  style={{ justifyContent: "space-between", width: "100%" }}
                >
                  <Text size="15px" fontWeight="700">
                    주제
                  </Text>
                  <TagP>편집</TagP>
                </div>
                <Text size="15px">주제 추가</Text>
              </DescriptionInfo>
              <MakeChannelInfo>
                <Text size="15px" fontWeight="700">
                  만든 사람
                </Text>
                <Text size="15px">
                  작성자: {channelHost} 작성 날짜:{" "}
                  {moment(createdAt).format("YYYY년 MM월 DD일")}
                </Text>
              </MakeChannelInfo>
              <OutChannelInfo
                onClick={() => {
                  console.log("삭제");
                  dispatch(channelActions.deleteChannelDB(channelId));
                }}
              >
                <Text color="#e01e5a" size="15px" fontWeight="700">
                  채널에서 나가기
                </Text>
              </OutChannelInfo>
            </ModalBody>
          </Content>
        </Background>
      </ModalPortal>

      {/* 모달 안에 모달 넣기 */}
      <ModalPortal>
        {modalOn && (
          <TwobtnModal
            onClose={handleModal}
            title="이 채널 이름 변경"
            btnText="변경사항 저장"
            btnColor="#007a5a"
            onSubmit={handleSubmit}
          >
            <div style={{ textAlign: "start" }}>
              <label htmlFor="changeName">이름</label>

              <div style={{ margin: "8px 0 20px" }}>
                <div>
                  {/* 여기에 # 이 placeholder에 포함되지않은채로 들어가는데 어떻게하는건지 잘모르겠네요ㅠㅠ */}
                  <Input
                    id="changeName"
                    placeholder="예: 플랜 예산"
                    size="18px"
                    padding="0 36px 0 38px"
                    margin="0 0 20px"
                    onChange={handleChange}
                    value={changeName}
                  />
                </div>
              </div>
            </div>
          </TwobtnModal>
        )}
      </ModalPortal>
      <ModalPortal>
        {infoModal && <InfoModal onClose={handleInfoModal} />}
      </ModalPortal>
    </>
  );
};

const TopDiv = styled.div`
  height: 104px;
`;

const TitleWrap = styled.div`
  min-height: 0;
  padding-bottom: 0;
  padding: 20px 28px 0;
`;

const CancelBtn = styled.div`
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;

  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
`;

const ButtonDiv = styled.div`
  align-items: center;
  display: flex;
  margin: 12px 0 8px 28px;
`;

const ModalBody = styled.div`
  padding: 16px 28px;
  margin: 0;
  height: calc(100% - 104px);
  background: #f8f8f8;
`;

const MiddleContent = styled.div``;

const DescriptionInfo = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 12px 12px 0 0;
  border: 1px solid rgba(29, 28, 29, 0.13);
  background: rgba(255, 255, 255, 1);
  width: 100%;
  padding: 16px 20px;
  margin-top: 20px;
  &:hover {
    background: #f8f8f8;
  }
`;

const TagP = styled.p`
  font-weight: 600;
  text-align: end;
  color: #1264a3;
  font-size: 13px;
  &:hover {
    text-decoration: underline;
    color: #0b4c8c;
  }
`;

const MakeChannelInfo = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-left: 1px solid rgba(29, 28, 29, 0.13);
  border-right: 1px solid rgba(29, 28, 29, 0.13);
  border-bottom: 1px solid rgba(29, 28, 29, 0.13);
  background: rgba(255, 255, 255, 1);
  width: 100%;
  padding: 16px 20px;
  &:hover {
    background: #f8f8f8;
  }
`;

const OutChannelInfo = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 0 0 12px 12px;
  border-left: 1px solid rgba(29, 28, 29, 0.13);
  border-right: 1px solid rgba(29, 28, 29, 0.13);
  border-bottom: 1px solid rgba(29, 28, 29, 0.13);
  background: rgba(255, 255, 255, 1);
  width: 100%;
  padding: 16px 20px;
  &:hover {
    background: #f8f8f8;
  }
`;

// 한울: 백그라운드랑 컨텐츠는 앞으로 모달에서 공통속성이라 가독성을 위해 가장 아래로 내렸습니다
const Background = styled.div`
  z-index: 205;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  z-index: 204;
  height: min(85vh, 820px);
  max-width: 580px;
  width: 80%;
  border-radius: 8px;
  background-color: #fff;

  position: relative;
  overflow: scroll;
`;

export default Modal;
