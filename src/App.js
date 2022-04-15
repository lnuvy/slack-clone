import React, { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { history } from "./redux/configureStore";
import "./App.css";
import { Main, Login, SignUp, Channel, MessagePage } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "./shared/token";
import { userActions } from "./redux/modules/user";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  // 로컬 스토리지에 토큰이 있는지 검사 후, 있다면 해당 토큰으로 user정보를 반환해옵니다
  useEffect(() => {
    if (!isLogin) {
      const token = getToken();
      if (token) {
        dispatch(userActions.getUserInfo(token));
      }
    }
  }, [isLogin]);

  if (isLogin) {
    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <Switch>
            <Route path={["/main"]} component={Main} />
            <Route path="/user/login" exact component={Login} />
            <Route path="/user/signup" exact component={SignUp} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  } else {
    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <Switch>
            <Route path={["/", "/user/login"]} exact component={Login} />
            <Route path="/user/signup" exact component={SignUp} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
