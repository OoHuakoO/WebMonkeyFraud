// import package and file
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { auth } from "./user/Frontfirebase";
import Home from "./user/pages/index";
import Contractus from "./user/pages/contractus";
import Createpost from "./user/pages/createpost";
import Login from "./user/pages/login";
import Post from "./user/pages/post";
import Forgetpass from "./user/pages/forgetpass";
import Signup from "./user/pages/signup";
import Prevent from "./user/pages/prevent";
import Helpnew from "./user/pages/helpnew";
import Rank from "./user/pages/ranking";
import Editpost from "./user/pages/editpost";
import History from "./user/pages/history";
import Mypost from "./user/pages/mypost";
import Linkruleshow from "./user/pages/linkruleshow";
import Profile from "./user/pages/profile";
import Editprofile from "./user/pages/editprofile";
import Changepass from "./user/pages/changpass";
import SeepostAdmin from "./admin/pages/seepost";
import Managepost from "./admin/pages/managepost";
import Report from "./admin/pages/report";
import usercontext from "./user/context/usercontext";
import Findthief from "./user/pages/findthief";
import Entersearch from "./user/pages/entersearch";
import AdminFindthief from "./admin/pages/findthief";
import AdminEntersearch from "./admin/pages/entersearch";
import AdminDashboard from "./admin/pages/dashboard";
import PostFacebook from "./user/pages/postfacebook";
import PostLine from "./user/pages/postline";
import PostTwitter from "./user/pages/posttwitter";
import PostInstragram from "./user/pages/postinstragram";
import PostOther from "./user/pages/postother";
import "./app.css";
// ที่รวม Routh ต่างๆ
const App = () => {
  const [user, setUser] = useState();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === "Bm4bg6z0KAavVlnCijLzIxjXN9y2") {
          setAdmin(true);
        }
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    });
  }, []);
  return loadingAuth ? (
    ""
  ) : admin ? (
    <Router>
      <usercontext.Provider value={{ user, setUser }}>
        <Switch>
          <Route path="/" exact>
            <Managepost />
          </Route>
          <Route restricted={false} path="/report" exact>
            <Report />
          </Route>
          <Route restricted={false} path="/post/:uid" exact>
            <SeepostAdmin />
          </Route>
          <Route restricted={false} path="/admin/thief/post/:uid" exact>
            <AdminFindthief />
          </Route>
          <Route restricted={false} path="/adminentersearch" exact>
            <AdminEntersearch />
          </Route>
          <Route restricted={false} path="/dashboard" exact>
            <AdminDashboard />
          </Route>
        </Switch>
      </usercontext.Provider>
    </Router>
  ) : (
    <Router>
      <usercontext.Provider value={{ user, setUser }}>
        <Switch>
          <Route restricted={false} path="/" exact>
            <Home />
          </Route>
          <Route restricted={false} path="/post/history" exact>
            <History />
          </Route>
          <Route restricted={false} path="/post/create" exact>
            <Createpost />
          </Route>
          <Route restricted={false} path="/post/edit/:uid" exact>
            <Editpost />
          </Route>
          <Route restricted={false} path="/post/:uid" exact>
            <Post />
          </Route>
          <Route restricted={false} path="/ranking" exact>
            <Rank />
          </Route>
          <Route restricted={false} path="/login" exact>
            <Login />
          </Route>
          <Route restricted={false} path="/signup" exact>
            <Signup />
          </Route>
          <Route restricted={false} path="/forgetpass" exact>
            <Forgetpass />
          </Route>
          <Route restricted={false} path="/prevent" exact>
            <Prevent />
          </Route>
          <Route restricted={false} path="/help" exact>
            <Helpnew />
          </Route>
          <Route restricted={false} path="/contractus" exact>
            <Contractus />
          </Route>
          <Route restricted={false} path="/mypost/:uid" exact>
            <Mypost />
          </Route>
          <Route restricted={false} path="/post" exact>
            <Post />
          </Route>
          <Route restricted={false} path="/postfacebook" exact>
            <PostFacebook />
          </Route>
          <Route restricted={false} path="/postline" exact>
            <PostLine />
          </Route>
          <Route restricted={false} path="/posttwitter" exact>
            <PostTwitter />
          </Route>
          <Route restricted={false} path="/postinstragram" exact>
            <PostInstragram />
          </Route>
          <Route restricted={false} path="/postother" exact>
            <PostOther />
          </Route>
          <Route restricted={false} path="/linkruleshow" exact>
            {user ? (
              <Linkruleshow />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  search: "?login = false", // query string
                  state: {
                    // location state
                    login: false,
                  },
                }}
              />
            )}
          </Route>
          <Route restricted={false} path="/profile/:uid" exact>
            <Profile />
          </Route>
          <Route restricted={false} path="/profile/edit/:uid" exact>
            <Editprofile />
          </Route>
          <Route restricted={false} path="/changepass" exact>
            <Changepass />
          </Route>
          <Route restricted={false} path="/thief/post/:uid" exact>
            <Findthief />
          </Route>
          <Route restricted={false} path="/entersearch" exact>
            <Entersearch />
          </Route>
        </Switch>
      </usercontext.Provider>
    </Router>
  );
};
export default App;
