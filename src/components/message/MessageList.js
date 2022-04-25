import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { BsPlus } from "react-icons/bs";
import { Image } from "../../elements/index";
import { Modal, ModalPortal } from "../../shared/modal/portals";
import OnebtnModal from "../../shared/modal/component/OnebtnModal";
import { Input, Text } from "../../elements";

const MessageList = (props) => {
  const { socket } = props;
  const user = useSelector((state) => state.user.user);
  const { profileImg } = user;
  const { nickname } = user;

  // 채널 생성 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  // 채널 생성 Input state인데 여기서 받는게 맞는지 잘모르겠네요.. 더좋은방법이 있을거같은데
  const [roomName, setroomName] = useState("");

  const handleChange = (e) => {
    setroomName(e.target.value);
  };

  // 모달창에 있는 버튼과 연결하기위해 props onSubmit 으로 넘겨줍니다!
  const handleSubmit = () => {
    if (!roomName) return;
    socket.emit("join_room", roomName);
    setModalOn(false);
    history.push(`/dm/${roomName}`);
  };

  return (
    <>
      <ListWrap>
        <GridMenu>다이렉트 메시지zz</GridMenu>
        <UserWarp
          onClick={() => {
            // history.replace("/dm/{nickname}");
            // history.replace("/dm/홍길동");
          }}
        >
          <User>
            <Image shape="ProfileImg" size="20" src={profileImg} />
            <span style={{ margin: "4px" }}>{nickname}</span>
          </User>
        </UserWarp>
        {/* <UserWarp
          onClick={() => {
            history.replace("/dm/이름");
          }}
        >
          <Image shape="ProfileImg" size="20" />
          <span style={{ margin: "4px" }}>이름</span>
        </UserWarp> */}
        <UserAdd onClick={handleModal}>
          <BsPlus
            style={{
              color: "white",
              background: "rgb(80 37 80)",
              fontSize: "20px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              margin: "1px 7px 0px 4px",
            }}
          />
          팀원 추가
        </UserAdd>
      </ListWrap>
      {/* 채팅방 생성 모달 */}
      <ModalPortal>
        {modalOn && (
          <OnebtnModal
            title="채팅방 생성"
            onClose={handleModal}
            btnText="생성"
            onSubmit={handleSubmit}
          >
            <div style={{ textAlign: "start" }}>
              <Text size="15px" margin="0 0 24px">
                채탱방은 팀원과 소통하는 공간입니다.
              </Text>
            </div>

            <div style={{ textAlign: "start" }}>
              <label htmlFor="chatName">이름</label>
              {/* <NameCheck>{}</NameCheck> */}
              <div style={{ margin: "8px 0 20px" }}>
                <InputWrap>
                  {/* 여기에 # 이 placeholder에 포함되지않은채로 들어가는데 어떻게하는건지 잘모르겠네요ㅠㅠ */}
                  <Input
                    id="chatName"
                    placeholder="예: 플랜 예산"
                    size="18px"
                    padding="0 36px 0 38px"
                    margin="0 0 20px"
                    onChange={handleChange}
                    value={roomName}
                  />
                </InputWrap>
              </div>
            </div>
          </OnebtnModal>
        )}
      </ModalPortal>
    </>
  );
};

const ListWrap = styled.div`
  // // margin: 15px 5px;
  // text-align: left;
  text-align: left;
  width: 100%;
`;

const GridMenu = styled.div`
  height: 26px;
  padding: 17px 12px 17px 15px;
  width: 100%;
  margin: 0px 0px 10px;
`;

const UserWarp = styled.div`
  flex-direction: column;
  cursor: pointer;
  display: flex;
  width: 100%;
`;

const UserAdd = styled.div`
  width: 100%;
  padding: 4px 12px 4px 15px;
  cursor: pointer;
  &:hover {
    background: #340c35;
  }
  display: flex;
  align-items: center;
`;

const User = styled.span`
  width: 100%;
  padding: 4px 12px 4px 15px;
  cursor: pointer;
  &:hover {
    background-color: #340c35;
  }
  display: flex;
  align-items: center;
  margin-left: 4px;
`;

const InputWrap = styled.div``;

export default MessageList;
