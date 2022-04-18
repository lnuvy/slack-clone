import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import axios from "axios";

import { Dummy } from "../../shared/DummyData";
import moment from "moment";

const BASE_URL = "BASE_URL";

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

// 코멘트 추가 액션
const ADD_COMMENTS = "ADD_COMMENTS";
const DELETE_COMMENTS = "DELETE_COMMENTS";

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
const deleteChannel = createAction(DELETE_CHANNEL, (channelId) => ({
  channelId,
}));

// 컨텐츠 추가부분
// channelName 대신 channelId 로 로직 다 수정
const addContent = createAction(ADD_CONTENTS, (channelId, content) => ({
  channelId,
  content,
}));
const editContent = createAction(
  EDIT_CONTENTS,
  (channelId, contentId, content) => ({ channelId, contentId, content })
);

const deleteContent = createAction(DELETE_CONTENTS, (channelId, contentId) => ({
  channelId,
  contentId,
}));

// 코멘트 추가부분
const addComment = createAction(
  ADD_COMMENTS,
  (channelName, contentId, comment) => ({
    channelName,
    contentId,
    comment,
  })
);
const deleteComment = createAction(
  ADD_COMMENTS,
  (channelName, contentId, commentId) => ({
    channelName,
    contentId,
    commentId,
  })
);

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
      channelId: new Date().getTime() + "",
      channelName: channelData.channelName,
      createdAt: moment().format("YYYY-MM-DD HH:mm"),
      channelHost: nickname,
      contentList: [],
    };
    dispatch(addChannel(fakeResponseData));
  };
};

const editChannelNameDB = (channelId, changeName) => {
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
        const { channelId, content } = action.payload;
        draft.channelList.forEach((l) => {
          if (l.channelId === channelId) l.contentList.push(content);
        });
      }),
    [EDIT_CONTENTS]: (state, action) =>
      produce(state, (draft) => {
        const { channelId, contentId, content } = action.payload;
        let nowChannel = draft.channelList.find(
          (l) => l.channelId === channelId
        );

        // 현재채널 인덱스 찾기
        let index = draft.channelList.findIndex(
          (l) => l.channelId === channelId
        );
        console.log(index);

        // 수정된 게시글을 제외한 나머지를 배열로 반환
        let contentList = nowChannel.contentList.filter(
          (c) => c.contentId !== contentId
        );

        // 수정한 컨텐츠 합치기 , 시간 순으로 재정렬
        let newArr = [...contentList, content].sort(
          (a, b) =>
            new moment(a.createdAt).format("YYYYMMDDHHmm") -
            new moment(b.createdAt).format("YYYYMMDDHHmm")
        );

        console.log(newArr);

        // 현재채널정보 갱신
        nowChannel = { ...nowChannel, contentList: newArr };

        draft.channelList[index] = nowChannel;
      }),
    [DELETE_CONTENTS]: (state, action) =>
      produce(state, (draft) => {
        const { channelId, contentId } = action.payload;

        // 현재채널 인덱스 찾기
        let index = draft.channelList.findIndex(
          (l) => l.channelId === channelId
        );

        let nowChannel = draft.channelList[index];

        // 삭제할 게시글을 제외하고 나머지를 반환
        let contentList = nowChannel.contentList.filter(
          (c) => c.contentId !== contentId
        );

        // 현재채널정보 갱신
        nowChannel = { ...nowChannel, contentList };

        draft.channelList[index] = nowChannel;
      }),

    // 코멘트 리듀서
    [ADD_COMMENTS]: (state, action) =>
      produce(state, (draft) => {
        const { channelName, contentId, comment } = action.payload;
        draft.channelList
          .filter((c) => c.channelName === channelName)[0]
          .contentList.forEach((l) => {
            if (l.contentId === contentId) l.commentList.push(comment);
          });
      }),

    // [DELETE_COMMENTS]: (state, action) =>
    //   produce(state, (draft) => {
    //     const { channelName, contentId, commentId } = action.payload;
    //     draft.channelList
    //       .filter((c) => c.channelName === channelName)[0]
    //       .contentList.forEach((l) => {
    //         if (l.contentId === contentId) l.commentList.push(commentId);
    //       });
    //   }),
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
  deleteComment,
  addComment,
};
