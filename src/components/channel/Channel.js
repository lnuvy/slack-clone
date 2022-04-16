import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { chaccelActions } from "../../redux/modules/channel";

const Channel = (props) => {
  //   const dispatch = useDispatch();
  //   const channel_list = useSelector((state) => state.channel.channel_list);
  //   console.log(channel_list);

  //   React.useEffect((props) => {
  //     dispatch(chaccelActions.getChannel());
  //   }, []);
  console.log(props);

  return (
    <>
      <Channnal
        onClick={() => {
          history.push("/main/channel");
        }}
      >
        <span style={{ margin: "0px 5px" }}># {Object.keys(props)[0]}</span>
      </Channnal>
    </>
  );
};

const Channnal = styled.span`
  width: 100%;
  padding: 4px 12px 4px 15px;
  cursor: pointer;
  &:hover {
    background-color: #340c35;
  }
`;

export default Channel;
