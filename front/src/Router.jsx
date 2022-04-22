import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import MyPage from "./components/MyPage";

function RouterFile() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default RouterFile;
