import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import { getToken } from "../../shared/token";

// import axios from "axios";

const BASE_URL = "BASE_URL";

const initialState = {
  channel_list: [
    {
      channel1: {
        content: "asdfasdfasdf",
        content2: "asdfasdfasdfasdf",
        id: 1,
      },

      channel2: {
        content: "asdfasdfasdf",
        content2: "asdfasdfasdfasdf",
        id: 2,
      },
    },
  ],
};

const initialContent = {
  channelTitle: {
    content: "asdfasdfasdf",
    content2: "asdfasdfasdfasdf",
  },
};

// 액션
const GET_CHANNEL = "GET_CHANNEL";
const ADD_CHANNEL = "ADD_CHANNEL";
const EDIT_CHANNEL_NAME = "EDIT_CHANNEL_NAME";
const DELETE_CHANNEL = "DELETE_CHANNEL";

// 액션 생성함수
const getChannel = createAction(GET_CHANNEL, (channelData) => ({
  channelData,
}));
const addChannel = createAction(ADD_CHANNEL, (channelTitle) => ({
  channelTitle,
}));
const editChannelName = createAction(EDIT_CHANNEL_NAME, (channelTitle) => ({
  channelTitle,
}));
const deleteChannel = createAction(DELETE_CHANNEL, (channelTitle) => ({
  channelTitle,
}));

// api 응답 받는 미들웨어
const getChannelDB = (userId) => {
  return async function (dispatch, getState, { history }) {
    const channelData = [
      {
        channel1: {
          content: "asdfasdfasdf",
          content2: "asdfasdfasdfasdf",
          id: 1,
        },

        channel2: {
          content: "asdfasdfasdf",
          content2: "asdfasdfasdfasdf",
          id: 2,
        },
      },
    ];
    // await axios.get(`${BASE_URL}/channel/:${userId}`.then((res) => {
    //     const channelTitle = res.data.channelTitle;
    //     console.log(channelTitle)
    //     dispatch(getChannel(channelTitle))
    //   })
    //   .catch((error) => {
    //     console.log("체널 데이터 안옴", error);
    //   })
    dispatch(getChannel(...channelData));
  };
};

const addChannelDB = (channelData) => {
  return async function (dispatch, getState, { history }) {
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
        let NewArray = action.payload;
        draft = NewArray.map((c, i) => {
          console.log(c);
        });
        console.log(action.payload);
      }),
    [ADD_CHANNEL]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.channelTitle);
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

export const chaccelActions = {
  getChannel,
  addChannel,
  editChannelName,
  deleteChannel,
  getChannelDB,
  addChannelDB,
  editChannelNameDB,
  deleteChannelDB,
};
