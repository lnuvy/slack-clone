import React, { useState } from "react";
import styled from "styled-components";
import LoginHeader from "../components/login/LoginHeader";
import { Button, Input, Text } from "../elements";

const SignUp = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [id]: value }));
  };

  const handleSubmit = () => {
    // 프론트 유효성검사 더 강화해야함
    if (!inputs.email || !inputs.password || !inputs.nickname) {
      alert("빈값이 있네요~");
      return;
    }
    console.log(inputs);
    // dispatch
  };

  return (
    <>
      <LoginHeader signUpNow />
      <SignUpWrap className="flex-column">
        <InfoDiv>
          <H1Tag>먼저 이메일부터 입력해 보세요</H1Tag>
          <Text>
            <strong>직장에서 사용하는 이메일 주소</strong>로 로그인하는걸
            추천드려요.
          </Text>
        </InfoDiv>
        <InnerWrap className="flex-column">
          <Input
            id="email"
            padding="11px 12px 13px"
            margin="0 0 20px"
            placeholder="name@work-email.com"
            onClick={handleChange}
          />

          <Input
            id="nickname"
            padding="11px 12px 13px"
            margin="0 0 20px"
            placeholder="Nickname"
            onClick={handleChange}
          />
          <Input
            id="password"
            type="password"
            padding="11px 12px 13px"
            margin="0 0 20px"
            placeholder="Please enter your password"
            onClick={handleChange}
          />
          <Input
            id="passwordCheck"
            type="password"
            padding="11px 12px 13px"
            margin="0 0 20px"
            placeholder="Please enter your password"
            onClick={handleChange}
          />
          <Button onClick={handleSubmit}>회원가입</Button>
        </InnerWrap>
      </SignUpWrap>
    </>
  );
};

const SignUpWrap = styled.div`
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

export default SignUp;
