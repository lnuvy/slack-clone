import React, { useCallback, useEffect, useState } from "react";
import "../shared/Chat.css";
import io from "socket.io-client";
// import { Box, Button, Grid, Input } from "../elements";
import Button2 from "../elements/Button2";
import Input2 from "../elements/input2";

import { useSelector, useDispatch } from "react-redux";

// import { actionCreators as userActions } from "../redux/modules/user";
import { $CombinedState } from "redux";

const socket = io.connect("ws://52.78.246.163:80");

socket.emit("init", { name: "jaehoon" });

const Chat = (props) => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user.user.nickname);
  console.log(user_id);
  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState({ name: "", message: "" });

  console.log(chat);

  // React.useEffect(() => {
  //   dispatch(userActions.getUserDB());
  // }, []);

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("receive message", (message) => {
      console.log(message.name);
      setChatArr((chatArr) => chatArr.concat(message));
    }); //receive message이벤트에 대한 콜백을 등록해줌
  }, []);

  const buttonHandler = useCallback(() => {
    socket.emit("send message", { name: user_id, message: chat.message });
    //버튼을 클릭했을 때 send message이벤트 발생
  }, [chat]);

  const changeMessage = useCallback(
    (e) => {
      setChat({ message: e.target.value });
    },
    [chat]
  );
  console.log(chatArr);
  return (
    <div className="chat_wrap">
      <div className="header">CHAT</div>
      <div className="chat">
        <ul>
          {chatArr.map((ele, idx) => (
            <div
              className="sender"
              key={idx}
              style={{ display: "flex", margin: "10px" }}
            >
              <div style={{ margin: "0 10px" }}>닉네임: {ele.name}</div>
              <div className="message">내용: {ele.message}</div>
            </div>
          ))}
        </ul>
      </div>
      <div class="input-div">
        <Input2 placeholder="  내용" _onChange={changeMessage}></Input2>
        <Button2 _onClick={buttonHandler} width="130px">
          등록
        </Button2>
      </div>
      <div class="chat format">
        <ul>
          <li>
            <div class="sender">
              <span></span>
            </div>
            <div class="message">
              <span></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Chat;
