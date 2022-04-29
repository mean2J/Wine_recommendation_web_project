import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
<<<<<<< HEAD
import WineInfo from "./components/wineInfo/WineInfo";
=======
import MyPage from "./components/MyPage";
import SignUp from "./components/User/SignUp/SignUp";
>>>>>>> 271d2337b2c9c7058a17f176374c448478370a2a

function RouterFile() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
<<<<<<< HEAD
        <Route path="/wine" element={<WineInfo />} />
=======
        <Route path="/myPage" element={<MyPage/>} />
        <Route path="/SignUp" element={<SignUp />} />
>>>>>>> 271d2337b2c9c7058a17f176374c448478370a2a
      </Routes>
    </Router>
  );
}

export default RouterFile;
