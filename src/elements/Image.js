import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { shape, src, size } = props;

  const styles = {
    src: src,
    size: size,
  };

  if (shape === "ProfileImg") {
    return <ProfileImg {...styles} />;
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles} />
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: false,
  src: "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png",
  size: 36,
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ProfileImg = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: 5px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
  cursor: pointer;
`;

export default Image;
