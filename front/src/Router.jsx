import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import WineInfo from "./components/wineInfo/WineInfo";
import MyPage from "./components/MyPage";
import PostMain from "./components/Community/PostMain";
import SearchWine from "./components/SearchWine/SearchWine";
import SignUp from "./components/User/SignUp/SignUp";
import PostForm from "./components/Community/PostForm";

function RouterFile() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/wine" element={<WineInfo />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/myPage/:tabId" element={<MyPage />} />
        <Route path="/community" element={<PostMain />} />
        <Route path="/community/newPost" element={<PostForm />}></Route>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/search/:id" element={<SearchWine />} />
      </Routes>
    </Router>
  );
}

export default RouterFile;
