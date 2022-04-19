import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";
import { history } from "../configureStore";
import axios from "axios";
import { channelActions } from "./channel";
// import axios from "axios";

const BASE_URL = "BASE_URL";

const initialState = {
  oneChannel: {},
};

// 액션
// 채널 이름변경시 바로 적용되게 하기위해 만든 액션함수
const EDIT_NOW_CHANNEL_NAME = "EDIT_NOW_CHANNEL_NAME";

const GET_CONTENT = "GET_CONTENT";
const ADD_CONTENT = "ADD_CONTENT";
const EDIT_CONTENT = "EDIT_CONTENT";
const DELETE_CONTENT = "DELETE_CONTENT";

// 액션 생성함수
const editNowChannel = createAction(EDIT_NOW_CHANNEL_NAME, (channelName) => ({
  channelName,
}));

const getContent = createAction(GET_CONTENT, (contentList) => ({
  contentList,
}));
const addContent = createAction(ADD_CONTENT, (content) => ({
  content,
}));
const editContent = createAction(EDIT_CONTENT, (content) => ({
  content,
}));
const deleteContent = createAction(DELETE_CONTENT, (contentId) => ({
  contentId,
}));

const getContentList = (contentId) => {
  return function (dispatch, getState, { history }) {
    if (!contentId) return;
    const contentList = getState().channel.channelList.find(
      (l) => l.channelId === contentId
    );
    dispatch(getContent(contentList));
  };
};

const addContentDB = (channelId, channelName, content) => {
  return async function (dispatch, getState, { history }) {
    if (!content) return;

    // axios
    // await axios.post(`${BASE_URL}/${channelName}/content`).then((res) => {
    // console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    //   console.log(err.response);
    // })

    const { email, nickname, profileImg } = getState().user.user;

    let fakeResponseData = {
      channelId,
      channelName,
      contentId: new Date().getTime() + "",
      nickname: nickname,
      userId: email,
      profileImg,
      content,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      isEdit: false,
      commentList: [],
    };

    dispatch(addContent(fakeResponseData));
    // 여기서 채널 액션함수 호출
    dispatch(
      channelActions.addContent(fakeResponseData.channelId, fakeResponseData)
    );
  };
};

const editContentDB = (channelId, channelName, contentId, content) => {
  return async function (dispatch, getState, { history }) {
    if (!(channelName && contentId && content)) return;

    // axios
    // await axios.patch(`${BASE_URL}/${channelName}/${contentId}`, {contentId, content}).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    //   console.log(err.response);
    // })

    const nowContent = getState().content.oneChannel.contentList.find(
      (l) => l.contentId === contentId
    );
    const fakeResponseData = {
      ...nowContent,
      content,
      isEdit: true,
    };

    console.log(fakeResponseData);
    dispatch(editContent(fakeResponseData));
    // 여기서 채널 액션함수 호출
    dispatch(
      channelActions.editContent(channelId, contentId, fakeResponseData)
    );
  };
};

const deleteContentDB = (channelId, contentId) => {
  return async function (dispatch, getState, { history }) {
    if (!(channelId && contentId)) return;

    // axios
    // await axios.delete(`${BASE_URL}/${channelId}/${contentId}`).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    //   console.log(err.response);
    // })

    dispatch(deleteContent(contentId));
    dispatch(channelActions.deleteContent(channelId, contentId));
  };
};

// 리듀서
export default handleActions(
  {
    [EDIT_NOW_CHANNEL_NAME]: (state, action) =>
      produce(state, (draft) => {
        draft.oneChannel.channelName = action.payload.channelName;
      }),
    [GET_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.oneChannel = action.payload.contentList;
      }),
    [ADD_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.oneChannel.contentList.push(action.payload.content);
      }),
    [EDIT_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        const { content } = action.payload;

        let newArr = draft.oneChannel.contentList.filter(
          (c) => c.contentId !== content.contentId
        );
        newArr = [...newArr, content].sort(
          (a, b) =>
            new moment(a.createdAt).format("YYYYMMDDHHmm") -
            new moment(b.createdAt).format("YYYYMMDDHHmm")
        );
        draft.oneChannel.contentList = newArr;
      }),
    [DELETE_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        const { contentId } = action.payload;

        let newArr = draft.oneChannel.contentList.filter(
          (c) => c.contentId !== contentId
        );

        draft.oneChannel.contentList = newArr;
      }),
  },
  initialState
);

export const contentActions = {
  editNowChannel,
  getContentList,
  addContentDB,
  editContentDB,
  deleteContentDB,
};
