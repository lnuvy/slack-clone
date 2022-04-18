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

// 컨턴츠 추가 액션
const ADD_CONTENTS = "ADD_CONTENTS";
const EDIT_CONTENTS = "EDIT_CONTENTS";
const DELETE_CONTENTS = "DELETE_CONTENTS";

// 액션 생성함수
const getChannel = createAction(GET_CHANNEL, (channelList) => ({
  channelList,
}));
const addChannel = createAction(ADD_CHANNEL, (channel) => ({
  channel,
}));
const editChannelName = createAction(EDIT_CHANNEL_NAME, (channelName) => ({
  channelName,
}));
const deleteChannel = createAction(DELETE_CHANNEL, (channelName) => ({
  channelName,
}));

// 컨텐츠 추가부분
const addContent = createAction(ADD_CONTENTS, (channelName, content) => ({
  channelName,
  content,
}));
const editContent = createAction(
  EDIT_CONTENTS,
  (channelName, contentId, content) => ({ channelName, contentId, content })
);
// const deleteContent = createAction();

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
    [EDIT_CHANNEL_NAME]: (state, action) => produce(state, (draft) => {}),
    [DELETE_CHANNEL]: (state, action) => produce(state, (draft) => {}),

    // 컨텐츠 리듀서
    [ADD_CONTENTS]: (state, action) =>
      produce(state, (draft) => {
        const { channelName, content } = action.payload;
        draft.channelList.forEach((l) => {
          if (l.channelName === channelName) l.contentList.push(content);
        });
        console.log(state.channelList);
      }),
    [EDIT_CONTENTS]: (state, action) =>
      produce(state, (draft) => {
        const { channelName, contentId, content } = action.payload;
        let nowChannel = draft.channelList.find(
          (l) => l.channelName === channelName
        );

        // 현재채널 인덱스 찾기
        let index = draft.channelList.findIndex(
          (l) => l.channelName === channelName
        );
        console.log(index);

        // 수정된 게시글을 제외한 나머지를 배열로 반환
        let contentList = nowChannel.contentList.filter(
          (c) => c.contentId !== contentId
        );

        // 수정한 컨텐츠 합치기
        contentList = [...contentList, content];

        // 현재채널정보 갱신
        nowChannel = { ...nowChannel, contentList };

        draft.channelList[index] = nowChannel;

        console.log(nowChannel);

        // draft.channelList.forEach((l) => {
        //   if (l.channelName === channelName) {
        //     let newArr = l.contentList.filter((c) => c.contentId !== contentId);
        //     draft.channelList.l.contentList = [...newArr, content];
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
  addContent,
  editContent,
  // deleteContent,
};
