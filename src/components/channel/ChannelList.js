import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { channelActions } from "../../redux/modules/channel";
import { Modal, ModalPortal } from "../../shared/modal/portals";
import OnebtnModal from "../../shared/modal/component/OnebtnModal";
import { Input, Text } from "../../elements";
// import Channel from "./Channel";

const ChannelList = (props) => {
  const dispatch = useDispatch();
  // 리덕스에 넣은 더미데이터 형식으로 뿌렸습니다
  const channel = useSelector((state) => state.channel.channelList);

  useEffect(() => {
    dispatch(channelActions.getChannelDB());
  }, []);

  // 채널 생성 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  // 채널 생성 Input state인데 여기서 받는게 맞는지 잘모르겠네요.. 더좋은방법이 있을거같은데
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [id]: value }));
  };

  // 버튼을 눌렀을때 dispatch 해서 가짜데이터가 일단 들어갑니다
  // 모달창에 있는 버튼과 연결하기위해 props onSubmit 으로 넘겨줍니다!
  const handleSubmit = () => {
    dispatch(channelActions.addChannelDB(inputs.channelName));
    setModalOn(false);
  };

  return (
    <>
      <ListWrap>
        <GridMenu>채널</GridMenu>
        <ChannelWarp>
          {channel.map((c, i) => {
            return (
              <Channnal
                key={c.channelId}
                {...c}
                onClick={() => {
                  // 여기에서 해당 채널에 대한 뷰를 변경해줍니다
                  history.push(`/channel/${c.channelId}`);
                }}
              >
                <span style={{ margin: "0px 5px" }}># {c.channelName}</span>
              </Channnal>
            );
          })}
          <ChannnalAdd onClick={handleModal}>
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
            채널 추가
          </ChannnalAdd>
        </ChannelWarp>
      </ListWrap>

      {/* channel 생성 모달 */}
      <ModalPortal>
        {modalOn && (
          <OnebtnModal
            title="채널 생성"
            onClose={handleModal}
            btnText="생성"
            onSubmit={handleSubmit}
          >
            <div style={{ textAlign: "start" }}>
              {/* <p style={{ fontSize: "15px" }}>
                채널은 팀이 소통하는 공간입니다. 채널은 주제(예: 마케팅)를
                중심으로 구성 하는 것이 가장 좋습니다.
              </p> */}
              <Text size="15px" margin="0 0 24px">
                채널은 팀이 소통하는 공간입니다. 채널은 주제(예: 마케팅)를
                중심으로 구성 하는 것이 가장 좋습니다.
              </Text>
            </div>

            <div style={{ textAlign: "start" }}>
              <label htmlFor="channelName">이름</label>
              {/* <NameCheck>{}</NameCheck> */}
              <div style={{ margin: "8px 0 20px" }}>
                <InputWrap>
                  {/* 여기에 # 이 placeholder에 포함되지않은채로 들어가는데 어떻게하는건지 잘모르겠네요ㅠㅠ */}
                  <Input
                    id="channelName"
                    placeholder="예: 플랜 예산"
                    size="18px"
                    padding="0 36px 0 38px"
                    margin="0 0 20px"
                    onChange={handleChange}
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
  text-align: left;
  width: 100%;
`;

const GridMenu = styled.div`
  height: 26px;
  padding: 17px 12px 17px 15px;
  width: 100%;
  margin: 0px 0px 10px;
`;

const ChannelWarp = styled.div`
  flex-direction: column;
  cursor: pointer;
  display: flex;
  width: 100%;
`;

const ChannnalAdd = styled.p`
  width: 100%;
  padding: 4px 12px 4px 15px;
  cursor: pointer;
  &:hover {
    background: #340c35;
  }
  display: flex;
  align-items: center;
`;

const Channnal = styled.span`
  width: 100%;
  padding: 4px 12px 4px 15px;
  cursor: pointer;
  &:hover {
    background-color: #340c35;
  }
`;

// 모달 관련 CSS
const InputWrap = styled.div``;

export default ChannelList;
