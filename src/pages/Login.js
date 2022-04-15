import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import LoginHeader from "../components/login/LoginHeader";
import LoginFooter from "../components/login/LoginFooter";
import { Button, Input, Text } from "../elements";
import { userActions } from "../redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [id]: value }));
  };

  const handleSubmit = () => {
    if (!inputs.email || !inputs.password) {
      alert("빈 값이 있습니다~");
      return;
    }

    console.log(inputs);
    dispatch(userActions.loginDB(inputs));
  };

  return (
    <>
      <LoginHeader />
      <LoginWrap className="flex-column">
        <InfoDiv>
          <H1Tag>이메일로 로그인해 보세요</H1Tag>
          <Text>
            <strong>직장에서 사용하는 이메일 주소</strong>로 로그인하는걸
            추천드려요.
          </Text>
        </InfoDiv>
        <InnerWrap className="flex-column">
          <Button borderColor="#4285f4" color="#4285f4">
            구글 계정으로 로그인
          </Button>
          <Button borderColor="#1d1c1d" margin="16px">
            깃허브 계정으로 로그인
          </Button>
          <div className="flex-row" style={{ margin: "24px 0" }}>
            <HrTag />
            <div style={{ fontSize: "15px", padding: "0 20px" }}>
              <Text size="15px">또는</Text>
            </div>
            <HrTag />
          </div>
          <Input
            id="email"
            onChange={handleChange}
            padding="11px 12px 13px"
            margin="0 0 20px"
            placeholder="name@work-email.com"
          />
          <Input
            id="password"
            type="password"
            onChange={handleChange}
            padding="11px 12px 13px"
            margin="0 0 20px"
            placeholder="Please enter your password"
            // &ordm;
          />
          <Button onClick={handleSubmit}>이메일로 로그인</Button>
        </InnerWrap>
      </LoginWrap>
      <LoginFooter />
    </>
  );
};

const LoginWrap = styled.div`
  flex-grow: 1;
  font-size: 18px;
`;

const InfoDiv = styled.div`
  margin-bottom: 32px;
  max-width: 700px;
`;

const H1Tag = styled.h1`
  font-size: 48px;
  font-weight: 700;
`;

const InnerWrap = styled.div`
  width: 400px;
`;

const HrTag = styled.hr`
  width: 166px;
  margin: 0;
`;

export default Login;
