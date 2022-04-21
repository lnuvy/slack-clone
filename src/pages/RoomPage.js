import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../elements";
import { history } from "../redux/configureStore";
import { socket } from "./Main";

const RoomPage = () => {
  const userInfo = useSelector((state) => state.user.user);
  const { nickname } = userInfo;
  const [roomName, setRoomName] = useState("");

  const enterRoom = () => {
    if (!roomName) {
      alert("안됨");
      return;
    }
    history.push(`/dm/room/${roomName}`);
    // socket.emit("enter_room", roomName, history.push);
    setRoomName("");
  };
  return (
    <>
      <h1>Room Page</h1>
      <div id="welcome">
        <input
          placeholder="room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
          type="text"
        />
        <Button margin="0" padding="20px" onClick={enterRoom}>
          Enter Room
        </Button>
      </div>
    </>
  );
};

export default RoomPage;
