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
const GET_CONTENT = "GET_CONTENT";
const ADD_CONTENT = "ADD_CONTENT";
const EDIT_CONTENT = "EDIT_CONTENT";
const DELETE_CONTENT = "DELETE_CONTENT";

// 액션 생성함수
// 한울 추가: 언더바는 사용해보니 좋은걸 잘 모르겠어서 빼버렸습니다!
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

const getContentList = (channelName) => {
  return async function (dispatch, getState, { history }) {
    // //form타입
    // await axios.get(`${BASE_URL}/user/signup`)
    //   .then((doc) => {
    //     const content = doc.data.board;
    //   })
    //   .catch((error) => {
    //     console.log("에러남", error);
    //   });

    const contentList = getState().channel.channelList.find(
      (l) => l.channelName === channelName
    );

    dispatch(getContent(contentList));
  };
};

const addContentDB = (channelName, content) => {
  return async function (dispatch, getState, { history }) {
    if (!content) return;

    // axios
    // await axios.post(`${BASE_URL}/${channelName}/content`).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    //   console.log(err.response);
    // })

    const { email, nickname, profileImg } = getState().user.user;

    let fakeResponseData = {
      channelName,
      contentId: new Date().getTime() + "",
      nickname: nickname,
      userId: email,
      profileImg,
      content,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      isEdit: false,
    };

    dispatch(addContent(fakeResponseData));
    // 여기서 채널 액션함수 호출
    dispatch(channelActions.addContent(channelName, fakeResponseData));
  };
};

const editContentDB = (channelName, contentId, content) => {
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
      channelActions.editContent(channelName, contentId, fakeResponseData)
    );
  };
};

// 리듀서
export default handleActions(
  {
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

        // draft.oneChannel.contentList.forEach((c) => {
        //   if (c.contentId === content.contentId) {
        //     return (c = content);
        //   }
        // });
        let newArr = draft.oneChannel.contentList.filter(
          (c) => c.contentId !== content.contentId
        );

        newArr = [...newArr, content];
        draft.oneChannel.contentList = newArr;
        // console.log(editChat);
      }),
    [DELETE_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
  },
  initialState
);

export const contentActions = { getContentList, addContentDB, editContentDB };
