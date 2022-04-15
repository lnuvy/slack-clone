import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// 로컬스토리지 token 작업 임포트
import { getToken, insertToken, removeToken } from "../../shared/token";

const BASE_URL = "BASE_URL";

const initialState = {
  user: null,
  isLogin: false,
};

// 액션
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// 액션 생성함수
const login = createAction(LOG_IN, (token, user) => ({ token, user }));
const logOut = createAction(LOG_OUT);
const getUser = createAction(GET_USER, (user) => ({ user }));

// 미들웨어
const userLogout = () => {
  return async function (dispatch, getState, { history }) {
    dispatch(logOut());
    history.replace("/login");
  };
};

// 여기부터 api 응답 받는 미들웨어
// /user/signup
const signUpDB = (inputs) => {
  return async function (dispatch, getState, { history }) {
    const { email, password, nickname } = inputs;
    let fakeResponse = {
      email,
      password,
      nickname,
    };
    console.log("회원가입 됐다치고", fakeResponse);
    // axios
    // await axios.post(`${BASE_URL}/user/signup`, inputs).then((res) => {
    //   console.log(res);
    //   // ...
    // }).catch((err) => {
    //   console.log(err);
    //   console.log(err.response);
    // })
  };
};

// /user/login
const loginDB = (inputs) => {
  return async function (dispatch, getState, { history }) {
    // axios
    // await axios
    //   .post(`${BASE_URL}/user/login`, inputs)
    //   .then((res) => {
    //     console.log(res);
    //     const token = res.data;
    //     insertToken(res.data.token);
    //     history.push("/main");
    //

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });

    // 서버 열리면 이 아래로 다 지워버리면 됩니다!
    console.log("로그인 성공했다 치고");
    const { email, password } = inputs;

    // /user/getuser axios 요청 또 해야되나?
    let fakeResponseData = { email, nickname: "닉네임", profileImg: "" };
    let fakeResponseToken = "토큰입니다";

    insertToken(fakeResponseToken);
    console.log("로컬 스토리지에 토큰을 넣었습니다");
    dispatch(login(fakeResponseToken, fakeResponseData));
    history.push("/main");
  };
};

// /user/getuser
const getUserInfo = (token) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${token}` };
    console.log("토큰 헤더로 넘겼다 치고~ ", config);

    let fakeResposeUser = {
      email: "asdf@gmail.com",
      nickname: "닉네임~",
      profileImg: "",
    };

    if (getToken()) {
      dispatch(getUser(fakeResposeUser));
    }
    // await axios
    //   .get(`${BASE_URL}/user/getuser`, { headers: config })
    //   .then((res) => {
    //     console.log(res);
    //     // getUser(res.data.받아온형식);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
  };
};

// 리듀서
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
    [LOG_OUT]: (state) =>
      produce(state, (draft) => {
        removeToken();
        draft.user = null;
        draft.isLogin = false;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
  },
  initialState
);

export const userActions = {
  signUpDB,
  loginDB,
  getUserInfo,
  userLogout,
};
