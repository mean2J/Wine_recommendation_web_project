import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import WineInfo from "./components/wineInfo/WineInfo";
import MyPage from "./components/MyPage";
import PostMain from "./components/Community/PostMain";
import PostView from "./components/Community/PostView";
import SearchWine from "./components/SearchWine/SearchWine";
import SignUp from "./components/User/SignUp/SignUp";

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
        <Route exact path="/community/:postId" element={<PostView />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/search/:id" element={<SearchWine />} />
      </Routes>
    </Router>
  );
}

export default RouterFile;
