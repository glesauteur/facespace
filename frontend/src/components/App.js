import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import HomeFeed from "./HomeFeed";
import SignInPage from "./SignInPage";
import ProfilePage from "./ProfilePage";
import Logout from "./Logout";
import FriendRquests from "./FriendRequests";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const App = () => {
  const [currentUser, setCurrentUser] = useLocalStorage("current-user", null);

  return (
    <Router>
      <GlobalStyles />
      <GlobalContainer>
        <Header>
          <div>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <PageTitle>FACESPACE</PageTitle>
            </Link>
          </div>
          <LoginWrapper>
            <Link
              style={{ textDecoration: "none" }}
              to={currentUser ? `/profile/${currentUser.id}` : "/signin"}
            >
              <SignInBtn>
                {currentUser ? currentUser.name : "Sign In"}
              </SignInBtn>
            </Link>
            {currentUser && (
              <Link style={{ textDecoration: "none" }} to={`/friend-requests/`}>
                <FriendRequests>See my friend requests</FriendRequests>
              </Link>
            )}
            <div>
              {currentUser && <Logout setCurrentUser={setCurrentUser} />}
            </div>
          </LoginWrapper>
        </Header>

        <div>
          <Routes>
            <Route
              path="/"
              exact
              element={<HomeFeed currentUser={currentUser} />}
            ></Route>
            <Route
              path="/signin"
              element={<SignInPage setCurrentUser={setCurrentUser} />}
            ></Route>
            <Route
              path="/profile/:id"
              element={
                <ProfilePage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="/friend-requests"
              element={
                <FriendRquests
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
          </Routes>
        </div>
      </GlobalContainer>
    </Router>
  );
};

const FriendRequests = styled.h3`
  margin-right: 50px;
  cursor: pointer;
`;

const LoginWrapper = styled.div`
  display: flex;
  margin: 0 50px;
`;
const GlobalContainer = styled.div``;
const PageTitle = styled.h2`
  margin: 0 50px;
`;

const SignInBtn = styled.h3`
  margin: 0 50px;
  cursor: pointer;
`;
const Header = styled.div`
  background-color: #efefef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;
export default App;
