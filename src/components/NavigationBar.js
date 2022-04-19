import React, { useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Input, Image, Text } from "../elements";
import { userActions } from "../redux/modules/user";
import LogoutModal from "../shared/modal/component/LogoutModal";
import { ModalPortal } from "../shared/modal/portals";

// 내비게이션 바
const NavigationBar = () => {
  const dispatch = useDispatch();
  const { profileImg, email, nickname } = useSelector(
    (state) => state.user.user
  );

  // 로그아웃 추가
  const [modalOn, setModalOn] = useState(false);

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <>
      <div>
        <NavigationBarWarp>
          <IoTimeOutline style={{ fontSize: "20px" }} />
          <Input
            placeholder="Slack 검색"
            width="584px"
            height="26px"
            margin="20px"
            text_align="center"
            opacity="0.2"
            color="white"
            bg="rgb(207,195,207)"
          />
          <div
            onClick={handleModal}
            style={{ borderRadius: "4px", background: "#fff", opacity: ".9" }}
          >
            <Image
              src={profileImg}
              shape="ProfileImg"
              size="26"
              opacity="0.9"
            />
          </div>
        </NavigationBarWarp>
      </div>

      <ModalPortal>
        {modalOn && (
          <LogoutModal onClose={handleModal}>
            <ChannelInfo>
              <div
                className="flex-row"
                style={{ justifyContent: "space-between", width: "100%" }}
              >
                <Text size="15px" fontWeight="700">
                  아이디: {email}
                </Text>
              </div>
              <Text size="15px">닉네임: {nickname}</Text>
            </ChannelInfo>
            <LogoutInfo
              onClick={() => {
                dispatch(userActions.userLogout());
              }}
            >
              <Text color="#e01e5a" size="15px" fontWeight="700">
                로그아웃 하기
              </Text>
            </LogoutInfo>
          </LogoutModal>
        )}
      </ModalPortal>
    </>
  );
};

const NavigationBarWarp = styled.header`
  height: 44px;
  background: #350d36;
  color: #ffffff;
  // box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  // position: relative;
  z-index: 203;
  text-align: center;
`;

const ProfileModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 76px;
  padding: 20px 0px;
  border: 1px solid gray;
  box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  background-color: rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);
  max-width: 360px;
  min-width: 200px;
  z-index: 1012;
  max-height: calc(100vh - 20px);
  border-radius: 6px;
  color: rgb(29, 28, 29);
  position: absolute;
  top: 38px;
  right: 16px;
  & img {
    display: inline-flex;
    width: 36px;
    height: 36px;
  }
  & > div {
    display: flex;
    margin: "0";
    padding: 0px 20px 0px 24px;
  }
  & > div > div {
    display: inline-flex;
    flex-direction: column;
    width: 80%;
    margin-left: 12px;
  }
  & #profile-name {
    font-weight: bold;
    // display: inline-flex;
  }
  & #profile-active {
    font-size: 13px;
    padding: 4px 0;
    // display: inline-flex;
  }
`;

const LogOutButton = styled.button`
  border: none;
  width: 100%;
  background: transparent;
  display: block;
  height: 28px;
  padding: 5px 24px 5px 24px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #1363a3;
    color: #fff;
  }
`;

const ChannelInfo = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 12px 12px 0 0;
  border: 1px solid rgba(29, 28, 29, 0.13);
  background: rgba(255, 255, 255, 1);
  width: 100%;
  padding: 16px 20px;
  &:hover {
    background: #f8f8f8;
  }
`;

const LogoutInfo = styled.div`
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

export default NavigationBar;
