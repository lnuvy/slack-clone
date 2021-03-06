import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { shape, src, size, opacity, margin } = props;

  const styles = {
    src: src,
    size: size,
    opacity: opacity,
    margin: margin,
  };

  if (shape === "ProfileImg") {
    return <ProfileImg {...styles} />;
  }

  return (
    <>
      <ImageDefault {...styles} />
    </>
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
  margin: ${(props) => props.margin};
  cursor: pointer;
  &:hover {
    opacity: ${(props) => props.opacity};
  }
`;

export default Image;
