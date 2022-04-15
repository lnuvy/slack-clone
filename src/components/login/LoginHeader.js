import React from "react";
import slackLogo from "../../shared/images/slackLogo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LoginHeader = (props) => {
  const { signUpNow } = props;

  return (
    <Header>
      <div></div>
      <div>
        <Link to="/user/login">
          <img alt="Slack" src={slackLogo} height="34px" />
        </Link>
      </div>
      {signUpNow ? null : (
        <SignupDiv className="flex-column">
          <div className="res-none">
            <p>Slack을 처음 이용하시나요?</p>
            <Link to="/user/signup">
              <p style={{ fontWeight: "600", textAlign: "end" }}>계정 생성</p>
            </Link>
          </div>
        </SignupDiv>
      )}
    </Header>
  );
};

// 슬랙 공식 CSS 를 그대로 따라했습니다
const Header = styled.div`
  padding: 48px 0 40px;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
`;

const SignupDiv = styled.div`
  align-items: flex-end;
  padding-right: 40px;
  font-size: 13px;
`;

export default LoginHeader;
