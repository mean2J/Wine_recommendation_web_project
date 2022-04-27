import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import SignUp from "./components/User/SignUp/SignUp";

function RouterFile() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
         <Route path="/signUp" exact element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default RouterFile;
