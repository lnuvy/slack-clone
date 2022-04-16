import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";
import { history } from "../configureStore";
import { getToken } from "../../shared/token";

import axios from "axios";

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
const getContent = createAction(GET_CONTENT, (_content) => ({ _content }));
const addContent = createAction(ADD_CONTENT, (_content, contentId) => ({
  _content,
  contentId,
}));
const deleteContent = createAction(DELETE_CONTENT, (contentId) => ({
  contentId,
}));

// api 응답 받는 미들웨어
// const getContentDB = () => {
//   return async function (dispatch, getState, { history }) {
//     //form타입
//     await axios.get(`${BASE_URL}/user/signup`
//       method: "get",
//       url: "BASE_URL",
//     })
//       .then((doc) => {
//         const _content = doc.data.board;
//       })
//       .catch((error) => {
//         console.log("에러남", error);
//       });
//   };
// };

// // 여기부터 api 응답 받는 미들웨어
// // /user/signup
// const signUpDB = (inputs) => {
//   return async function (dispatch, getState, { history }) {
//     const { email, password, nickname } = inputs;
//     let fakeResponse = {
//       email,
//       password,
//       nickname,
//     };
//     console.log("회원가입 됐다치고", fakeResponse);
//     // axios
//     // await axios.post(`${BASE_URL}/user/signup`, inputs).then((res) => {
//     //   console.log(res);
//     //   // ...
//     // }).catch((err) => {
//     //   console.log(err);
//     //   console.log(err.response);
//     // })
//   };
// };

// // /user/login
// const loginDB = (inputs) => {
//   return async function (dispatch, getState, { history }) {
//     // axios
//     // await axios
//     //   .post(`${BASE_URL}/user/login`, inputs)
//     //   .then((res) => {
//     //     console.log(res);
//     //     const token = res.data;
//     //     insertToken(res.data.token);
//     //     history.push("/main");
//     //

//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //     console.log(err.response);
//     //   });

//     // 서버 열리면 이 아래로 다 지워버리면 됩니다!
//     console.log("로그인 성공했다 치고");
//     const { email, password } = inputs;

//     // /user/getuser axios 요청 또 해야되나?
//     let fakeResponseData = { email, nickname: "닉네임", profileImg: "" };
//     let fakeResponseToken = "토큰입니다";

//     insertToken(fakeResponseToken);
//     console.log("로컬 스토리지에 토큰을 넣었습니다");
//     dispatch(login(fakeResponseToken, fakeResponseData));
//     history.push("/main");
//   };
// };

// // /user/getuser
// const getUserInfo = (token) => {
//   return async function (dispatch, getState, { history }) {
//     const config = { Authorization: `Bearer ${token}` };
//     console.log("토큰 헤더로 넘겼다 치고~ ", config);

//     let fakeResposeUser = {
//       email: "asdf@gmail.com",
//       nickname: "닉네임~",
//       profileImg: "",
//     };

//     if (getToken()) {
//       dispatch(getUser(fakeResposeUser));
//     }
//     // await axios
//     //   .get(`${BASE_URL}/user/getuser`, { headers: config })
//     //   .then((res) => {
//     //     console.log(res);
//     //     // getUser(res.data.받아온형식);
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //     console.log(err.response);
//     //   });
//   };
// };

// // 리듀서
// export default handleActions(
//   {
//     [LOG_IN]: (state, action) =>
//       produce(state, (draft) => {
//         draft.user = action.payload.user;
//         draft.isLogin = true;
//       }),
//     [LOG_OUT]: (state) =>
//       produce(state, (draft) => {
//         removeToken();
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

// export const userActions = {
//   signUpDB,
//   loginDB,
//   getUserInfo,
//   userLogout,
// };
