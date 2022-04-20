import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { Dummy } from "../../shared/DummyData";
import moment from "moment";
import { contentActions } from "./content";
import { getToken } from "../../shared/token";

// const BASE_URL = "http://3.34.129.39";
const BASE_URL = "http://52.78.246.163";

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
const editChannelName = createAction(
  EDIT_CHANNEL_NAME,
  (channelId, channelName) => ({
    channelId,
    channelName,
  })
);
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
  (channelId, contentId, comment) => ({
    channelId,
    contentId,
    comment,
  })
);
const deleteComment = createAction(
  DELETE_COMMENTS,
  (channelId, contentId, commentId) => ({
    channelId,
    contentId,
    commentId,
  })
);

// api 응답 받는 미들웨어
const getChannelDB = () => {
  return async function (dispatch, getState, { history }) {
    const { email } = getState().user.user;
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/channel/${email}`, { headers: config })
      .then((res) => {
        console.log(res);
        const { channel, content, comment } = res.data;

        for (let i = 0; i < channel.length; i++) {
          let newContentList = [];
          if (channel[i].contentList.length !== 0) {
            newContentList = channel[i].contentList.map((id, i) => {
              let now = "";
              for (let j = 0; j < content.length; j++) {
                now = content[j];
                if (id === now.contentId) break;
              }
              return now;
            });
          }
          channel[i].contentList = newContentList;
        }
        console.log(channel);
        dispatch(getChannel(channel));
      })
      .catch((error) => {
        console.log("채널 데이터 안옴", error);
        console.log(error.response);
      });
    // 한울: 더미데이터를 받아와서 넣었습니당
    // dispatch(getChannel(Dummy));
  };
};

const addChannelDB = (channelName) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };

    const { nickname } = getState().user.user;

    const inputs = { channelName, nickname };

    await axios
      .post(`${BASE_URL}/channel/channel`, inputs, { headers: config })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(addChannel(res.data));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

const editChannelNameDB = (channelId, channelName) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };

    await axios
      .patch(
        `${BASE_URL}/channel/${channelId}`,
        { channelName },
        {
          headers: config,
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(editChannelName(channelId, channelName));
        dispatch(contentActions.editNowChannel(channelName));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

const deleteChannelDB = (channelId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .delete(`${BASE_URL}/channel/${channelId}`, {
        headers: config,
      })
      .then((res) => {
        console.log(res);
        // window.alert(res.msg)
        alert("삭제!");
        dispatch(deleteChannel(channelId));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
    // history.replace("/");
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
        const { channelId, channelName } = action.payload;
        draft.channelList.forEach((l) => {
          if (l.channelId === channelId) {
            l.channelName = channelName;
          }
        });
      }),
    [DELETE_CHANNEL]: (state, action) =>
      produce(state, (draft) => {
        const { channelId } = action.payload;
        let newArr = draft.channelList.filter((l) => l.channelId !== channelId);
        draft.channelList = newArr;
      }),

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
        const { channelId, contentId, comment } = action.payload;

        // 추가해줄 데이터 경로
        draft.channelList
          .filter((c) => c.channelId === channelId)[0]
          .contentList.forEach((l) => {
            if (l.contentId === contentId) l.commentList.push(comment);
          });
      }),

    [DELETE_COMMENTS]: (state, action) =>
      produce(state, (draft) => {
        const { channelId, contentId, commentId } = action.payload;

        console.log(channelId, contentId, commentId);

        // 컨텐츠 리스트 찾기
        let contentList = state.channelList.filter(
          (c) => c.channelId === channelId
        )[0].contentList;

        console.log(contentList);

        // 현재 컨텐츠 인덱스 찾기
        let index = contentList.findIndex((l) => l.contentId === contentId);

        console.log(index);

        // 현재 컨텐츠
        let nowContent = contentList[index];

        console.log(nowContent);

        // 삭제할 코멘트를 제외하고 나머지를 반환
        let commentList = nowContent.commentList.filter(
          (c) => c.commentId !== commentId
        );

        console.log(commentList);

        // 현재채널정보 갱신
        nowContent = { ...nowContent, commentList };

        draft.channelList.filter(
          (c) => c.channelId === channelId
        )[0].contentList[index] = nowContent;
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
  deleteComment,
  addComment,
  deleteContent,
};
