import React from "react";
import styled from "styled-components";

const LoginFooter = () => {
  return (
    <FooterWrap className="flex-column">
      <footer className="flex-row">
        <TagA href="https://www.notion.so/7cf89428eab0438abb8e85dab3e734b0">
          7조 클론프로젝트
        </TagA>
        <TagA href="https://github.com/lnuvy/slack-clone-front">FE 깃허브</TagA>
        <TagA href="https://github.com">BE 깃허브</TagA>
      </footer>
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  padding: 32px 0;
`;

const TagA = styled.a`
  font-size: 15px;
  margin: 0 16px 0 0;
  color: #696969;

  &:hover {
    text-decoration: underline;
    color: #0b4c8c;
  }
`;

export default LoginFooter;
