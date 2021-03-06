import React from "react";
import styled from "styled-components";
import { MdLightbulbOutline } from "react-icons/md";
import main_img from "../shared/images/main_img.png";
import main_img2 from "../shared/images/main_img2.png";

const MainIndex = () => {
  return (
    <>
      <div style={{ background: "#f8f8f8" }}>
        <BuildingDiv>
          <InfoWrap>
            <LeftInfo>
              <div>
                <h1>Slack 외부의 누구나와 협업하는 쉬운 방법입니다.</h1>
              </div>
              <div>
                Slack Connect는 자신의 팀과 협업하듯이 클라이언트, 벤더 및
                파트너와도 쾌적하고 안전하게 협업할 수 있도록 해줍니다.
              </div>
              <RadiusBtn>
                <MdLightbulbOutline size={16} />
                <strong>Slack Connect의 작동 방법을 확인해보세요</strong>
              </RadiusBtn>
            </LeftInfo>
            <RightImg className="res-none-img">
              <img src={main_img} alt="빌딩사진" />
            </RightImg>
          </InfoWrap>

          <HowCoordinate>
            <BgImg>
              <img
                style={{ width: "118px", height: "84px" }}
                src={main_img2}
                alt="사람사진"
              />
            </BgImg>
          </HowCoordinate>
        </BuildingDiv>
      </div>
    </>
  );
};

const BuildingDiv = styled.div`
  width: 100%;
  background-color: #e0eee7;
  height: 400px;
  padding: 0 40px;
  min-height: 0%;
`;

const InfoWrap = styled.div`
  max-width: 1000px;
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  height: 100%;
`;

const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
`;

const RadiusBtn = styled.button`
  cursor: pointer;
  display: flex;
  text-align: center;
  border-radius: 30px;
  padding: 8px 16px;
  margin-top: 20px;
  width: fit-content;
  align-items: center;
  font-size: 13px;
  border: 1px solid rgba(224, 238, 231, 0.1);

  &:hover {
    background-color: white;
    & > MdLightbulbOutline {
      color: yellow;
    }
  }
`;

const RightImg = styled.div`
  display: flex;
  width: 300px;
  height: 300px;
  flex: 0 1 auto;

  background-repeat: no-repeat;
  /* background-position: 50%; */
  background-size: contain;
`;

const HowCoordinate = styled.div`
  margin: 20px auto;
`;

const BgImg = styled.div`
  /* background: green; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export default MainIndex;
