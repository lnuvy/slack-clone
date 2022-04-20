import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";
import { history } from "../configureStore";
import axios from "axios";
import { channelActions } from "./channel";
import { getToken } from "../../shared/token";
// import axios from "axios";

const BASE_URL = "http://52.78.246.163";

const initialState = {
  oneContent: {},
};

// 액션
const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

// 액션 생성함수
// 한울 추가: 언더바는 사용해보니 좋은걸 잘 모르겠어서 빼버렸습니다!

const getComment = createAction(GET_COMMENT, (nowContent) => ({
  nowContent,
}));
const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));

const getCommentList = (channelId, contentId) => {
  return async function (dispatch, getState, { history }) {
    // const nowChannel = getState().channel.channelList.find(
    //   (l) => l.channelId === channelId
    // );
    // console.log(nowChannel);
    // const nowContent = nowChannel.contentList.find(
    //   (l) => l.contentId === contentId
    // );
    // dispatch(getComment(nowContent));
    // const contentList = getState().channel.channelList.find(
    //   (l) => l.channelName === channelName
    // );
    // console.log(contentList);
    // dispatch(getComment(contentList));
  };
};

const addCommentDB = (channelId, contentId, comment) => {
  return async function (dispatch, getState, { history }) {
    if (!comment) return;
    const { email } = getState().user.user;
    const config = { Authorization: `Bearer ${getToken()}` };

    console.log(channelId, contentId, comment);

    await axios
      .post(
        `${BASE_URL}/${channelId}/${contentId}/comment`,
        { comment },
        { headers: config }
      )
      .then((res) => {
        console.log(res);
        let resData = res.data;
        console.log(resData);

        let newDic = {
          ...resData,
          // userId: email,
        };
        console.log(newDic);

        // dispatch(addComment(newDic));
        dispatch(channelActions.addComment(channelId, contentId, newDic));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });

    // let fakeResponseData = {
    //   comment: comment,
    //   commentId: new Date().getTime() + "",
    //   contentId: contentId,
    //   createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    //   nickname: nickname,
    //   userId: email,
    //   profileImg,
    // };

    // dispatch(addComment(fakeResponseData));
    // // 여기서 채널 액션함수 호출
    // dispatch(channelActions.addComment(channelId, contentId, fakeResponseData));
  };
};

const deleteCommentDB = (channelId, contentId, commentId) => {
  return async function (dispatch, getState, { history }) {
    // axios
    // await axios.delete(`${BASE_URL}/${channelName}/${contentId}/${contentId}`).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    //   console.log(err.response);
    // })

    console.log(channelId, contentId, commentId);
    dispatch(deleteComment(commentId));
    dispatch(channelActions.deleteComment(channelId, contentId, commentId));
  };
};

// 리듀서
export default handleActions(
  {
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.oneContent = action.payload.nowContent;
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // draft.oneContent.commentList.push(action.payload.comment);
        console.log(state.oneContent);
      }),

    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const { commentId } = action.payload;

        let newArr = draft.oneContent.commentList.filter(
          (c) => c.commentId !== commentId
        );
        draft.oneContent.commentList = newArr;
      }),
  },
  initialState
);

export const commentActions = {
  getComment,
  addCommentDB,
  deleteCommentDB,
  getCommentList,
};
