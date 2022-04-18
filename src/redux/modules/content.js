import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";
import { history } from "../configureStore";
// import axios from "axios";

const BASE_URL = "BASE_URL";

const initialState = {
  list: [],
};

const initialContent = {
  contentId: "id",
  userNickname: "nick",
  profileImg:
    "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png",
  content: "content~~!",
  createdAt: "2022-04-15 13:33",
  isEdit: false,
};

// 액션
const GET_CONTENT = "GET_CONTENT";
const ADD_CONTENT = "ADD_CONTENT";
const DELETE_CONTENT = "DELETE_CONTENT";

// 액션 생성함수
// 한울 추가: 언더바는 사용해보니 좋은걸 잘 모르겠어서 빼버렸습니다!
const getContent = createAction(GET_CONTENT, (content) => ({ content }));
const addContent = createAction(ADD_CONTENT, (content, contentId) => ({
  content,
  contentId,
}));
const deleteContent = createAction(DELETE_CONTENT, (contentId) => ({
  contentId,
}));

// api 응답 받는 미들웨어
const getContentDB = () => {
  return async function (dispatch, getState, { history }) {
    // //form타입
    // await axios.get(`${BASE_URL}/user/signup`)
    //   .then((doc) => {
    //     const content = doc.data.board;
    //   })
    //   .catch((error) => {
    //     console.log("에러남", error);
    //   });
  };
};

// 리듀서
// export default handleActions(
//   {
//     [LOG_IN]: (state, action) =>
//       produce(state, (draft) => {
//         draft.user = action.payload.user;
//         draft.isLogin = true;
//       }),
//     [LOG_OUT]: (state) =>
//       produce(state, (draft) => {
//         draft.user = null;
//         draft.isLogin = false;
//       }),
//     [GET_USER]: (state, action) =>
//       produce(state, (draft) => {
//         draft.user = action.payload.user;
//         draft.isLogin = true;
//       }),
//   },
//   initialState
// );

export const contentActions = {};
