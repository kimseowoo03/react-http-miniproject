import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import Home from "./pages/Home";
import UsersSignUp from "./pages/UsersSignUp";
import ReviewHome from "./pages/ReviewHome";

import Header from "./components/UI/Header";
import UsersForm from "./components/UsersForm";
import MyReviewList from "./components/MyReviewList";
import { userActions } from "./store/user-slice";


function App() {
  const userToggle = useSelector((state) => state.user.userToggle);
  const dispatch = useDispatch();

  const auth = getAuth();

  // 현재 로그인 사용자 관찰자
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //사용자가 인증 || 로그인
        const currentUser = {
          name: user.displayName,
          uid: user.uid,
        };
        console.log("[App/onAuthStateChanged] Login" + user.uid);
        dispatch(userActions.CurrentLoggedInUser(currentUser));
      } else {
        console.log("[App/onAuthStateChanged] Log out");
      }
    });
  }, [auth, dispatch]);

  return (
    <>
      <Header />
      <Routes>
        {!userToggle && <Route path="/signup" element={<UsersSignUp />} />}
        <Route path="/" element={<Home />} />
        <Route path="review" element={<ReviewHome />}>
          <Route path="myreview" element={<MyReviewList />} />
        </Route>
        <Route path="write" element={<UsersForm />} />
      </Routes>
    </>
  );
}

export default App;
