import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import axios from "axios";

// 한울: 명세당시에 데이터형식을 너무 대충작성한거같네요 ㅠㅠ
// 석일님과 협의 후 데이터 형식 정리했습니다! 임시로 더미데이터 넣어놨어요~
import { Dummy } from "../../shared/DummyData";
import moment from "moment";

const BASE_URL = "BASE_URL";

// 한울: 언더바나 - 대쉬 보다는 카멜케이스를 선호해서 바꿨습니다!
const initialState = {
  channelList: [],
};

// 액션
const GET_CHANNEL = "GET_CHANNEL";
const ADD_CHANNEL = "ADD_CHANNEL";
const EDIT_CHANNEL_NAME = "EDIT_CHANNEL_NAME";
const DELETE_CHANNEL = "DELETE_CHANNEL";

// 액션 생성함수

// 한울: channelData 보다 initialState 에 선언하신 channelList 로 통일하는게 좋을거같아서 바꿨습니다
// 채널은 석일님이랑 얘기해서 channelName 자체를 고유한 아이디처럼 사용하기로 해서 나머지도 모두 변수명을 바꿨습니다
const getChannel = createAction(GET_CHANNEL, (channelList) => ({
  channelList,
}));
// 여기는 channelName 만 받지말고 Response 로 받은 채널 데이터 딕셔너리를 넘겼습니다
const addChannel = createAction(ADD_CHANNEL, (channel) => ({
  channel,
}));
const editChannelName = createAction(EDIT_CHANNEL_NAME, (channelName) => ({
  channelName,
}));
const deleteChannel = createAction(DELETE_CHANNEL, (channelName) => ({
  channelName,
}));

// api 응답 받는 미들웨어
const getChannelDB = (userId) => {
  return async function (dispatch, getState, { history }) {
    // await axios.get(`${BASE_URL}/channel/:${userId}`.then((res) => {
    //     const channelTitle = res.data.channelTitle;
    //     console.log(channelTitle)
    //     dispatch(getChannel(channelTitle))
    //   })
    //   .catch((error) => {
    //     console.log("체널 데이터 안옴", error);
    //   })

    // 한울: 더미데이터를 받아와서 넣었습니당
    dispatch(getChannel(Dummy));
  };
};

const addChannelDB = (channelData) => {
  return async function (dispatch, getState, { history }) {
    console.log("미들웨어:", channelData);
    //     await axios.post(`${BASE_URL}/channel/channel${id}`, channeldata);
    //     axios({
    //       method: "post",
    //       url: `${BASE_URL}/channel/channel`,
    //       data: channelData,
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${getCookie("token")}`,
    //       },
    //     })
    //       .then((res) => {
    //         console.log(res);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         console.log(err.response);
    //       });

    // 연결되면 버리면됩니당~
    const { nickname } = getState().user.user;

    const fakeResponseData = {
      channelName: channelData.channelName,
      createdAt: moment().format("YYYY-MM-DD HH:mm"),
      channelHost: nickname,
      contentList: [],
    };
    dispatch(addChannel(fakeResponseData));
  };
};

const editChannelNameDB = (channelName, id) => {
  return async function (dispatch, getState, { history }) {
    // await axios.post(`${BASE_URL}/channel/channel${id}`, channeldata)
    //   axios({
    //       method: "patch",
    //       url: `${BASE_URL}/channel/channel${id}`,
    //       data: channelName,
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${getCookie("token")}`,
    //       },
    //     })
    //   .then((res) => {
    //     console.log(res);
    //     window.alert(res.msg)
    //   }).catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   })
  };
};

const deleteChannelDB = (id) => {
  return async function (dispatch, getState, { history }) {
    // await axios.post(`${BASE_URL}/channel/channel${id}`, channeldata)
    //   axios({
    //       method: "delete",
    //       url: `${BASE_URL}/channel/channel${id}`,
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${getCookie("token")}`,
    //       },
    //     })
    //   .then((res) => {
    //     console.log(res);
    //     window.alert(res.msg)
    //   }).catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   })
  };
};

//리듀서;
export default handleActions(
  {
    [GET_CHANNEL]: (state, action) =>
      produce(state, (draft) => {
        draft.channelList = action.payload.channelList;
      }),
    [ADD_CHANNEL]: (state, action) =>
      produce(state, (draft) => {
        draft.channelList.push(action.payload.channel);
      }),
    [EDIT_CHANNEL_NAME]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (channel) => channel.channelTitle === action.payload.channelTitle
        ); //인덱스 반환 => 딱 위치만 찾는 함수
        console.log(action);
        draft.list[idx] = {
          ...draft.list[idx],
          ...action.payload.channelTitle,
        };
      }),
  },
  initialState
);

export const channelActions = {
  getChannel,
  addChannel,
  editChannelName,
  deleteChannel,
  getChannelDB,
  addChannelDB,
  editChannelNameDB,
  deleteChannelDB,
};
