import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import LoginFooter from "../components/login/LoginFooter";
import LoginHeader from "../components/login/LoginHeader";
import { LoginButton, Input, Text } from "../elements";
import { userActions } from "../redux/modules/user";

const SignUp = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const { id } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [id]: value }));
  };

  const handleSubmit = () => {
    // 프론트 유효성검사 더 강화해야함
    if (!inputs.email || !inputs.password || !inputs.nickname) {
      alert("빈값이 있네요~");
      return;
    }
    console.log(inputs);
    dispatch(userActions.signUpDB(inputs));
  };

  return (
    <>
      <div className="flex-column">
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
              onChange={handleChange}
              value={inputs.email}
            />

            <Input
              id="nickname"
              padding="11px 12px 13px"
              margin="0 0 20px"
              placeholder="Nickname"
              onChange={handleChange}
              value={inputs.nickname}
            />
            <Input
              id="password"
              type="password"
              padding="11px 12px 13px"
              margin="0 0 20px"
              placeholder="Please enter your password"
              onChange={handleChange}
              value={inputs.password}
            />
            <Input
              id="passwordCheck"
              type="password"
              padding="11px 12px 13px"
              margin="0 0 20px"
              placeholder="Please enter your password"
              onChange={handleChange}
              value={inputs.passwordCheck}
            />
            <Input
              id="profileImg"
              padding="11px 12px 13px"
              margin="0 0 20px"
              placeholder="Please Enter your Profile Img URL (Options)"
              onChange={handleChange}
              value={inputs.profileImg}
            />
            <LoginButton onClick={handleSubmit}>회원가입</LoginButton>
          </InnerWrap>
        </SignUpWrap>
        <LoginFooter />
      </div>
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
